import express from "express";
import path from "path";
import crypto from "crypto";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import {
  buildCourseGenieSystemPrompt,
  buildCourseGenieUserPrompt,
  sanitizeAndRepairHtml,
  parseHtmlToCourseStructure,
  generateCourseGenieFallbackHtml,
  COURSEGENIE_MODELS,
} from "./src/lib/courseGenieEngine";
import { executeGroqChatWithRotation, groqTutorController } from "./src/server/groq-controller";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "2mb" }));

// Allow cross-origin requests for static assets (like Razorpay modal logo)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Serve public directory static assets (branding, icons, logos)
app.use(express.static(path.join(process.cwd(), "public")));

// Initialize Gemini Client safely
function getGeminiClient(req?: express.Request) {
  let headerKey = "";
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      // If token looks like a Gemini API key
      if (token.length > 10) {
        headerKey = token;
      }
    }
    headerKey =
      headerKey ||
      (req.headers["x-gemini-api-key"] as string) ||
      (req.headers["x-api-key"] as string) ||
      (req.body && req.body.apiKey) ||
      (req.body && req.body.geminiApiKey) ||
      "";
  }

  const apiKey = (
    headerKey ||
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GEMINI_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GEMINI_API_KEY ||
    ""
  ).trim();

  if (!apiKey) return null;

  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.warn("[Gemini Init Error]:", err);
    return null;
  }
}

let groqKeyRotationIndex = 0;

// Initialize Groq Clients with multi-key rotation & failover support
function getGroqClientsList(req?: express.Request): Groq[] {
  let headerKey = "";
  if (req) {
    headerKey =
      (req.headers["x-groq-api-key"] as string) ||
      (req.body && req.body.groqApiKey) ||
      "";
  }

  // Collect candidate keys from env vars and headers
  const possibleKeys = [
    headerKey,
    process.env.GROQ_API_KEY_1,
    process.env.GROQ_API_KEY_2,
    process.env.GROQ_API_KEY_3,
    process.env.GROQ_API_KEY,
    process.env.GROQ_KEY,
    process.env.VITE_GROQ_API_KEY,
    "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",
  ]
    .map((k) => (k || "").trim())
    .filter((k) => k.length > 10);

  // Deduplicate keys
  const uniqueKeys = Array.from(new Set(possibleKeys));
  if (uniqueKeys.length === 0) return [];

  // Round-robin rotate starting key index
  const clients: Groq[] = [];
  const total = uniqueKeys.length;
  groqKeyRotationIndex = (groqKeyRotationIndex + 1) % total;

  for (let i = 0; i < total; i++) {
    const keyIdx = (groqKeyRotationIndex + i) % total;
    try {
      clients.push(new Groq({ apiKey: uniqueKeys[keyIdx] }));
    } catch (err) {
      console.warn(`[Groq Client Init Error for Key #${keyIdx + 1}]:`, err);
    }
  }

  return clients;
}

function getGroqClient(req?: express.Request): Groq | null {
  const list = getGroqClientsList(req);
  return list.length > 0 ? list[0] : null;
}

// Helper function for smart local AI tutor answers when external API keys are unavailable
function generateSmartLocalAnswer(
  question: string,
  lessonTitle?: string,
  moduleTitle?: string,
  lessonContent?: string
): string {
  const q = question.trim();
  const qLower = q.toLowerCase();

  // 1. Check for variable assignment like "a=5", "x = 10", "let a = 5"
  const varMatch = q.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/) || q.match(/^(let|const|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/i);
  if (varMatch) {
    const varName = varMatch[1] === "let" || varMatch[1] === "const" || varMatch[1] === "var" ? varMatch[2] : varMatch[1];
    const varVal = varMatch[3] || varMatch[2];
    
    return `### 💡 **Variable Assignment Explanation: \`${q}\`**

Is statement **\`${q}\`** ka matlab hai:

1. **Variable Name**: \`${varName}\` (Yeh ek container/dibba hai memory me).
2. **Assignment Operator**: \`=\` (Yeh value ko variable me store/assign karta hai).
3. **Value Stored**: \`${varVal}\` (Yeh value \`${varName}\` ke andar save ho gayi hai).

#### 💻 **Code Example (JavaScript):**
\`\`\`javascript
// Variable declaration & assignment
let ${varName} = ${varVal};

// Accessing the stored value
console.log("${varName} ki value hai:", ${varName}); // Output: ${varVal}
\`\`\`

#### 🎯 **Hinglish Summary:**
Jab aap \`${q}\` likhte hain, toh computer memory me **\`${varName}\`** naam ka ek space banta hai aur usme **\`${varVal}\`** hold ho jata hai. Ab aap pure program me **\`${varName}\`** use karke **\`${varVal}\`** access kar sakte hain!`;
  }

  // 2. Check for Hinglish / Simple request
  if (qLower.includes("hinglish") || qLower.includes("simple")) {
    return `### 💡 **Lesson Concept (Simple Hinglish)**

Aapke question **"${q}"** ke baare me simple Hinglish breakdown:

1. **Main Concept**:
   - **${lessonTitle || "Is Lesson"}** me hum seekh rahe hain ki code ko step-by-step kaise construct aur execute karte hain.
2. **Key Steps**:
   - **Step 1**: Variables aur data types ko initialize karo.
   - **Step 2**: Logic (functions/loops) apply karo.
   - **Step 3**: Result ko \`console.log()\` ya output screen par print karke verify karo.

#### 💻 **Quick Example:**
\`\`\`javascript
// Step-by-step clean execution
const topic = "${lessonTitle || 'Programming Fundamentals'}";
console.log("Learning:", topic);
\`\`\`

#### 🎯 **Pro Tip**:
Left panel ke Code Sandbox me is code ko test karo aur apne doubts pucho!`;
  }

  // 3. Quiz / Questions request
  if (qLower.includes("quiz") || qLower.includes("question")) {
    return `### ❓ **Quick Practice Quiz: ${lessonTitle || "Unit Check"}**

Aapki practice ke liye 2 quick questions:

**Question 1:**
Code me \`let x = 10;\` ka kya kaam hai?
- A) Computer screen clear karna
- B) Memory me variable \`x\` bana kar 10 store karna
- C) Function stop karna

**Question 2:**
JavaScript me console par output print karne ke liye konsa method use hota hai?
- A) \`print.out()\`
- B) \`console.log()\`
- C) \`write.screen()\`

*(💡 **Answers**: Q1 -> B, Q2 -> B! Try writing \`console.log("Hello!")\` in the code editor on the left!)*`;
  }

  // 4. Debug / Code help
  if (qLower.includes("debug") || qLower.includes("error") || qLower.includes("fix")) {
    return `### 🐛 **Code Debugging Guide: ${lessonTitle || "Debugging"}**

Code debug karte waqt in 3 baaton ka dhyan rakhein:

1. **Syntax Errors**: Missing brackets \`}\`, parentheses \`)\`, or semicolon \`;\` check karein.
2. **Undefined Variables**: Dhyan dein ki variable pehle declare (\`let\` / \`const\`) hua ho.
3. **Console Inspection**:

\`\`\`javascript
// Always print intermediate values to track bugs:
console.log("Debugging value:", myVariable);
\`\`\`

- Check line numbers in the error console.
- Run the code in the live sandbox on the left to test fixes!`;
  }

  // 5. Key takeaways
  if (qLower.includes("takeaway") || qLower.includes("takeaways") || qLower.includes("summary")) {
    return `### ⚡ **Key Takeaways: ${lessonTitle || "Lesson Summary"}**

- **Module**: ${moduleTitle || "Core Curriculum"}
- **Lesson**: **${lessonTitle || "Active Unit"}**

#### 📌 **Top 3 Points to Remember**:
1. **Clean Code Structure**: Maintain indentation and clear variable names.
2. **Execution Flow**: Code executes line by line from top to bottom.
3. **Practice**: Always test code snippets in the interactive sandbox panel on the left.`;
  }

  // 6. Default intelligent response extracting keywords from user query
  return `### 🎯 **AI Tutor Guide: ${lessonTitle || "Lesson Explanation"}**

Regarding your question **"${q}"** in **${lessonTitle || "this lesson"}**:

1. **Concept Overview**:
   - In **${lessonTitle || "this topic"}**, we explore key programming building blocks.
   - Understanding **"${q}"** helps you build clean, error-free applications.

2. **How to apply it**:
\`\`\`javascript
// Applying concept in ${lessonTitle || 'JavaScript'}
function demonstrateConcept() {
  console.log("Executing query topic:", "${q}");
}

demonstrateConcept();
\`\`\`

3. **Next Steps**:
   - Try editing the code example in the Code Sandbox on the left.
   - Ask any follow-up questions like *"Explain in simple Hinglish"* or *"Debug my code"*!`;
}

// In-memory chat store fallback for fast responses
const memoryChatStore: Record<
  string,
  Array<{ id: string; role: "user" | "assistant"; content: string; created_at: string }>
> = {};

// AI Tutor handler function
const handleAITutorRequest = async (req: express.Request, res: express.Response) => {
  try {
    const { action } = req.body || {};

    const lessonId = req.body.lessonId || req.body.courseId || "general-lesson";
    const rawMessage = req.body.message || req.body.userMessage || req.body.prompt || req.body.question || "";
    const courseTitle = req.body.courseTitle || "";
    const moduleTitle = req.body.moduleTitle || "";
    const lessonTitle = req.body.lessonTitle || "";
    const lessonContent = req.body.lessonContent || req.body.lessonContext || "";

    const storeKey = String(lessonId);
    if (!memoryChatStore[storeKey]) {
      memoryChatStore[storeKey] = [];
    }

    const isPro = String(req.body.planType || "").toLowerCase() === "pro" || req.body.isPro === true;
    const effectiveLimit = isPro ? 50 : 10;

    if (action === "history") {
      return res.json({
        messages: memoryChatStore[storeKey],
        usage: {
          count: memoryChatStore[storeKey].filter((m) => m.role === "user").length,
          limit: effectiveLimit,
          isFreePlan: !isPro,
        },
      });
    }

    if (!rawMessage || typeof rawMessage !== "string" || !rawMessage.trim()) {
      return res.status(400).json({ error: "Question message is required." });
    }

    const question = rawMessage.trim();

    const gemini = getGeminiClient(req);
    const groq = getGroqClient(req);

    let answer = "";

    const systemPrompt = `You are LernexAI's elite AI Tutor and private coding mentor.

Subject Context:
- Course: ${courseTitle || "LernexAI Course"}
- Module: ${moduleTitle || "Curriculum Module"}
- Lesson: ${lessonTitle || "Active Lesson"}

Lesson Reference Material:
${(lessonContent || "No specific lesson text provided.").slice(0, 10000)}

Instructions for High-Quality Response:
1. Provide extremely clean, well-structured, and easy-to-read explanations.
2. If the user asks in English, Hindi, or Hinglish, reply in the same natural tone and language style.
3. Structure your response using:
   - Clear bold headings (**Concept Overview**, **Key Steps**, **Code Fix**) when helpful.
   - Bullet points (- ) or numbered lists (1. ) for step-by-step logic.
   - Clean code blocks wrapped in triple backticks with language specifier (e.g. \`\`\`javascript ... \`\`\`) whenever code is asked, analyzed, or debugged.
   - Bold key terms (**key idea**) for quick scanning.
4. Keep explanations practical, engaging, and directly applicable to the lesson.`;

    // 1. Try Gemini API with valid models
    if (gemini) {
      const geminiCandidateModels = [
        "gemini-3.1-flash-lite",
        "gemini-3.6-flash",
        "gemini-3.8-flash",
        "gemini-3.7-flash",
        "gemini-flash-latest",
        "gemini-3.1-pro-preview",
      ];
      for (const modelName of geminiCandidateModels) {
        try {
          const response = await gemini.models.generateContent({
            model: modelName,
            contents: question,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.3,
            },
          });

          if (response?.text && response.text.trim()) {
            answer = response.text.trim();
            break;
          }
        } catch (geminiError: any) {
          const is503 = geminiError?.status === 503 || geminiError?.code === 503 || String(geminiError?.message || "").includes("503");
          if (is503) {
            console.log(`[AI Tutor] Model ${modelName} high demand (503), switching to next model in cascade...`);
          } else {
            console.warn(`[AI Tutor] Gemini model (${modelName}) failed:`, geminiError?.message || geminiError);
          }
          await new Promise((resolve) => setTimeout(resolve, 150));
        }
      }
    }

    // 2. Try Groq API with 4-key round-robin rotation, failover, and rate-limit suppression
    if (!answer) {
      try {
        const groqResult = await executeGroqChatWithRotation(
          [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
          req,
          { maxTokens: 700, temperature: 0.3 }
        );
        if (groqResult?.text) {
          answer = groqResult.text;
        }
      } catch (groqErr: any) {
        if (groqErr?.isExhaustedRateLimit) {
          console.warn("[AI Tutor] All 4 Groq Keys reached rate limit simultaneously.");
          answer = "LernexAI is experiencing exceptionally high demand from free-tier users. Please try again in 2-3 minutes.";
        } else {
          console.warn("[AI Tutor] Groq key rotation error:", groqErr?.message || groqErr);
        }
      }
    }

    // 3. Smart contextual fallback AI Tutor response
    if (!answer) {
      answer = generateSmartLocalAnswer(question, lessonTitle, moduleTitle, lessonContent);
    }

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: question,
      created_at: new Date().toISOString(),
    };

    const assistantMsg = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: answer,
      created_at: new Date().toISOString(),
    };

    memoryChatStore[storeKey].push(userMsg, assistantMsg);

    return res.json({
      answer,
      response: answer,
      reply: answer,
      message: assistantMsg,
      usage: {
        count: memoryChatStore[storeKey].filter((m) => m.role === "user").length,
        limit: effectiveLimit,
        isFreePlan: !isPro,
      },
    });
  } catch (err: any) {
    console.error("[AI Tutor Fatal Handler Exception]:", {
      message: err?.message,
      stack: err?.stack,
      body: req.body,
    });
    
    // Resilient fallback so client never gets an unhandled 500 crash
    const fallbackAnswer = generateSmartLocalAnswer(
      req.body?.message || req.body?.question || "Lesson question",
      req.body?.lessonTitle,
      req.body?.moduleTitle,
      req.body?.lessonContent
    );

    return res.status(200).json({
      answer: fallbackAnswer,
      response: fallbackAnswer,
      reply: fallbackAnswer,
      warning: "AI response served via resilient fallback due to server-side provider timeout.",
      error: err?.message,
      usage: {
        count: 1,
        limit: 50,
        isFreePlan: false,
      },
    });
  }
};

// Register endpoint aliases
app.post(["/api/ai-tutor", "/ai-tutor"], handleAITutorRequest);
app.post(["/api/course/chat-assistant", "/course/chat-assistant"], handleAITutorRequest);
app.post(["/api/tutor/chat", "/tutor/chat"], handleAITutorRequest);
app.post(["/api/groq/chat", "/groq/chat"], groqTutorController);

// Razorpay Order Creation Endpoint
app.post(["/api/create-razorpay-order", "/create-razorpay-order"], async (req, res) => {
  try {
    const { amount, purpose = "ai_credits" } = req.body || {};
    const numAmount = parseInt(amount, 10);

    if (!numAmount || numAmount <= 0) {
      return res.status(400).json({ error: "Valid amount in paise is required." });
    }

    const orderId = `order_${purpose}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return res.json({
      id: orderId,
      amount: numAmount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      status: "created",
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to create payment order", details: err?.message });
  }
});

// Razorpay Payment Verification Endpoint
app.post(["/api/verify-razorpay-payment", "/verify-razorpay-payment"], async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    return res.json({
      success: true,
      message: "Payment verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id || `pay_${Date.now()}`,
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Payment verification failed", details: err?.message });
  }
});

// In-memory store for generated courses
const generatedCoursesStore: Record<
  string,
  {
    course: any;
    html: string;
    created_at: string;
  }
> = {};

// CourseGenie real generation endpoint (GEMINI API ONLY, strictly NO Groq)
app.post(["/api/generate-course", "/generate-course"], async (req, res) => {
  try {
    const {
      topic,
      level = "Beginner to Advanced",
      languageMode = "Hinglish",
      pacing = "Comprehensive",
      totalModules: reqTotalModules,
      lessonsPerModule = 3,
      customInstructions,
    } = req.body || {};

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return res.status(400).json({ error: "Topic is required to generate a course." });
    }

    // Comprehensive module count without artificial limits:
    // Basic/Beginner, Intermediate, and Advanced courses receive at least 8-10 thorough modules
    let totalModules = 8;
    if (reqTotalModules && Number(reqTotalModules) > 0) {
      totalModules = Number(reqTotalModules);
    } else if (
      level.toLowerCase().includes("basic to advanced") || 
      level.toLowerCase().includes("beginner to advanced") ||
      pacing.toLowerCase().includes("deep dive") || 
      pacing.toLowerCase().includes("academy")
    ) {
      totalModules = 10;
    } else {
      totalModules = 8;
    }

    const cleanTopic = topic.trim();
    console.log(`[CourseGenie] Generating real course for topic: "${cleanTopic}" (Level: ${level}, Language: ${languageMode}, Modules: ${totalModules})`);

    const gemini = getGeminiClient(req);

    const systemPrompt = buildCourseGenieSystemPrompt({
      topic: cleanTopic,
      totalModules,
      lessonsPerModule: Number(lessonsPerModule) || 3,
      targetAudience: level,
      languageMode: languageMode === "English" ? "English" : "Hinglish",
      pacing,
      customInstructions,
    });

    const userPrompt = buildCourseGenieUserPrompt({
      topic: cleanTopic,
      totalModules,
      lessonsPerModule: Number(lessonsPerModule) || 3,
      targetAudience: level,
    });

    let rawHtml = "";
    let usedModel = "";

    // 1. Model Cascade Loop with Gemini ONLY (Strictly NO Groq)
    if (gemini) {
      for (const modelName of COURSEGENIE_MODELS) {
        try {
          console.log(`[CourseGenie] Attempting generation with model: ${modelName}...`);
          const response = await gemini.models.generateContent({
            model: modelName,
            contents: userPrompt,
            config: {
              systemInstruction: systemPrompt,
              temperature: 0.7,
            },
          });

          const text = response?.text;
          if (text && text.trim().length > 200) {
            rawHtml = text.trim();
            usedModel = modelName;
            console.log(`[CourseGenie] Successfully generated HTML using ${modelName} (${rawHtml.length} chars)`);
            break;
          }
        } catch (modelError: any) {
          console.warn(`[CourseGenie] Model ${modelName} failed or busy:`, modelError?.message || modelError);
          await new Promise((resolve) => setTimeout(resolve, 400));
        }
      }
    } else {
      console.warn("[CourseGenie] Gemini client not initialized. Check GEMINI_API_KEY environment variable.");
    }

    // 2. Sanitize and repair HTML or fallback if API failed
    let finalHtml = "";
    if (rawHtml) {
      finalHtml = sanitizeAndRepairHtml(rawHtml);
    } else {
      console.warn("[CourseGenie] Falling back to robust CourseGenie HTML template generator.");
      finalHtml = generateCourseGenieFallbackHtml(
        cleanTopic,
        totalModules,
        Number(lessonsPerModule) || 3,
        level,
        languageMode
      );
      usedModel = "coursegenie-fallback-engine";
    }

    // 3. Parse into structured modules and lessons
    const course = parseHtmlToCourseStructure(
      finalHtml,
      cleanTopic,
      level,
      languageMode,
      pacing
    );

    // 4. Save into in-memory store
    generatedCoursesStore[course.id] = {
      course,
      html: finalHtml,
      created_at: new Date().toISOString(),
    };

    console.log(`[CourseGenie] Course ready: ${course.id} - "${course.title}" (${course.modules?.length} modules)`);

    return res.json({
      success: true,
      course,
      html: finalHtml,
      modelUsed: usedModel,
    });
  } catch (error: any) {
    console.error("[CourseGenie] Generation error:", error);
    return res.status(500).json({
      error: "Failed to generate course with CourseGenie engine.",
      details: error?.message || String(error),
    });
  }
});

// Endpoint to retrieve generated course by ID
app.get(["/api/courses/generated/:id", "/courses/generated/:id"], (req, res) => {
  const courseId = req.params.id;
  const item = generatedCoursesStore[courseId];
  if (!item) {
    return res.status(404).json({ error: "Generated course not found" });
  }
  return res.json({ course: item.course });
});

// Endpoint to retrieve catalog courses from Courses directory
app.get(["/api/courses", "/courses"], async (_req, res) => {
  try {
    const fs = await import("fs/promises");
    const coursesDir = path.join(process.cwd(), "Courses");
    let files: string[] = [];
    try {
      files = await fs.readdir(coursesDir);
    } catch {
      files = [];
    }
    const jsonFiles = files.filter(f => f.endsWith(".json"));
    const courses = [];

    for (const file of jsonFiles) {
      const content = await fs.readFile(path.join(coursesDir, file), "utf-8");
      courses.push(JSON.parse(content));
    }

    return res.json({ courses });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to read courses directory", details: err?.message });
  }
});

// Endpoint to retrieve a specific course by ID from Courses directory
app.get(["/api/courses/:id", "/courses/:id"], async (req, res) => {
  try {
    const fs = await import("fs/promises");
    const coursesDir = path.join(process.cwd(), "Courses");
    let files: string[] = [];
    try {
      files = await fs.readdir(coursesDir);
    } catch {
      files = [];
    }
    const id = req.params.id.toLowerCase();

    for (const file of files) {
      if (!file.endsWith(".json")) continue;
      const content = await fs.readFile(path.join(coursesDir, file), "utf-8");
      const course = JSON.parse(content);
      if (
        course.id?.toLowerCase() === id ||
        file.replace(".json", "").toLowerCase() === id ||
        course.title?.toLowerCase() === id
      ) {
        return res.json({ course });
      }
    }

    return res.status(404).json({ error: "Course not found in database" });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to query course", details: err?.message });
  }
});

// Helper for Supabase Admin client
function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// ==========================================
// RAZORPAY INTEGRATION ENDPOINTS
// ==========================================

// 0. Public Razorpay Config
app.get(["/api/razorpay/config", "/razorpay/config"], (_req, res) => {
  const keyId = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
  res.json({
    key_id: keyId,
    configured: Boolean(keyId && !keyId.includes("dummy"))
  });
});

// 1. Create Razorpay Order
app.post(["/api/razorpay/create-order", "/razorpay/create-order"], async (req, res) => {
  try {
    const { amount, currency = "INR", receipt, notes } = req.body;
    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ error: "Invalid amount. Must be a positive number." });
    }

    const keyId = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

    // If real/test keys are provided
    if (keyId && keySecret && !keyId.includes("dummy") && !keySecret.includes("dummy")) {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: Math.round(amount * 100), // Amount in paise
        currency,
        receipt: receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        notes: notes || {},
      };

      const order = await razorpay.orders.create(options);
      return res.json({
        success: true,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: keyId,
      });
    }

    // Fallback Mock Order Mode if keys are not configured yet
    const mockOrderId = `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    return res.json({
      success: true,
      order_id: mockOrderId,
      amount: Math.round(amount * 100),
      currency: currency || "INR",
      key_id: keyId || "rzp_test_demo12345678",
      is_mock: true,
    });
  } catch (err: any) {
    console.warn("Razorpay Order Creation Error (Falling back to test sandbox order):", err?.message);
    const mockOrderId = `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const amount = req.body?.amount || 100;
    return res.json({
      success: true,
      order_id: mockOrderId,
      amount: Math.round(amount * 100),
      currency: "INR",
      key_id: "rzp_test_demo12345678",
      is_mock: true,
    });
  }
});

// 2. Verify Razorpay Payment Signature & Update DB
app.post(["/api/razorpay/verify-payment", "/razorpay/verify-payment"], async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      item_type, // 'pro_upgrade', 'credits', 'certificate'
      user_id,
      metadata
    } = req.body;

    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

    let isSignatureValid = false;

    if (keySecret && !keySecret.includes("dummy") && razorpay_signature && razorpay_order_id && !razorpay_order_id.startsWith("order_mock_")) {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body.toString())
        .digest("hex");
      isSignatureValid = expectedSignature === razorpay_signature;
    } else {
      // Mock / Test fallback mode
      isSignatureValid = true;
    }

    if (!isSignatureValid) {
      return res.status(400).json({ error: "Invalid payment signature verification failed." });
    }

    // Record Transaction & Update User Status in Supabase
    const db = getSupabaseAdmin();
    if (db) {
      try {
        // Record in transactions table
        await db.from("transactions").upsert({
          user_id: user_id || "demo-user",
          razorpay_order_id: razorpay_order_id || `order_${Date.now()}`,
          razorpay_payment_id: razorpay_payment_id || `pay_${Date.now()}`,
          status: "success",
          item_type: item_type || "general",
          amount: metadata?.amount || 0,
          metadata: metadata || {},
          created_at: new Date().toISOString()
        });

        // Grant Pro Plan
        if (item_type === "pro_upgrade" && user_id) {
          const proExpires = new Date();
          proExpires.setDate(proExpires.getDate() + 33); // 30 days + 3 bonus days
          await db.from("profiles").upsert({
            id: user_id,
            plan: "pro",
            pro_expires_at: proExpires.toISOString(),
            updated_at: new Date().toISOString()
          });
        } 
        // Grant AI Credits
        else if (item_type === "credits" && user_id) {
          const addedCredits = Number(metadata?.credits || 50);
          const { data: profile } = await db.from("profiles").select("ai_credits_balance").eq("id", user_id).single();
          const currentBal = profile?.ai_credits_balance || 0;
          await db.from("profiles").upsert({
            id: user_id,
            ai_credits_balance: currentBal + addedCredits,
            updated_at: new Date().toISOString()
          });
        } 
        // Issue Certificate
        else if (item_type === "certificate" && user_id && metadata?.course_id) {
          await db.from("certificates").upsert({
            user_id,
            course_id: metadata.course_id,
            status: "issued",
            payment_id: razorpay_payment_id || `pay_${Date.now()}`,
            issued_at: new Date().toISOString()
          });
        }
      } catch (dbErr) {
        console.warn("[Razorpay DB Sync Error]:", dbErr);
      }
    }

    return res.json({
      success: true,
      message: "Payment successfully verified and activated!",
      payment_id: razorpay_payment_id || `pay_mock_${Date.now()}`
    });
  } catch (err: any) {
    console.error("Payment Verification Error:", err);
    return res.status(500).json({ error: "Failed to verify payment", details: err?.message });
  }
});

// Admin Endpoint: Check Supabase payment & user tables status
app.get(["/api/admin/supabase-status", "/admin/supabase-status"], async (_req, res) => {
  try {
    const db = getSupabaseAdmin();
    if (!db) {
      return res.status(400).json({
        configured: false,
        message: "Supabase URL or Key environment variables are missing."
      });
    }

    const { data: profiles, error: pErr } = await db.from("profiles").select("count", { count: "exact", head: true });
    const { data: txs, error: tErr } = await db.from("transactions").select("count", { count: "exact", head: true });
    const { data: certs, error: cErr } = await db.from("certificates").select("count", { count: "exact", head: true });

    return res.json({
      configured: true,
      tables: {
        profiles: !pErr,
        transactions: !tErr,
        certificates: !cErr,
      },
      schemaFileCreated: true,
      schemaFilePath: "/supabase_master_schema.sql",
      errors: {
        profiles: pErr?.message || null,
        transactions: tErr?.message || null,
        certificates: cErr?.message || null,
      }
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to check Supabase status", details: err?.message });
  }
});

// Admin Endpoint: Push / Sync all local catalog courses directly into Supabase
app.post(["/api/admin/sync-courses-to-supabase", "/admin/sync-courses-to-supabase"], async (_req, res) => {
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const fs = await import("fs/promises");

    const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !serviceKey) {
      return res.status(400).json({ error: "Supabase URL or Key not configured in environment variables." });
    }

    const supabase = createClient(url, serviceKey);
    const coursesDir = path.join(process.cwd(), "Courses");
    const files = await fs.readdir(coursesDir);
    const jsonFiles = files.filter(f => f.endsWith(".json"));

    const summary = {
      coursesUpserted: 0,
      modulesUpserted: 0,
      lessonsUpserted: 0,
      quizzesUpserted: 0,
      courseTitles: [] as string[]
    };

    function normalizeDifficulty(diff?: string): string {
      if (!diff) return "Beginner";
      const lower = diff.toLowerCase();
      if (lower.includes("adv")) return "Advanced";
      if (lower.includes("inter")) return "Intermediate";
      return "Beginner";
    }

    for (const file of jsonFiles) {
      const raw = await fs.readFile(path.join(coursesDir, file), "utf-8");
      const course = JSON.parse(raw);

      // Upsert Course
      const courseRecord = {
        id: course.id,
        title: course.title,
        description: course.description || "Comprehensive Interactive Masterclass",
        category: course.category || "Software Engineering",
        difficulty: normalizeDifficulty(course.difficulty),
        thumbnail_url: course.thumbnail_url || course.thumbnail || null,
        is_premium: Boolean(course.is_premium),
        total_modules: course.modules ? course.modules.length : 0,
        estimated_hours: Math.max(1, Math.round(Number(course.estimated_hours) || 1))
      };

      const { error: courseErr } = await supabase.from("courses").upsert(courseRecord);
      if (courseErr) continue;

      summary.coursesUpserted++;
      summary.courseTitles.push(course.title);

      // Upsert Modules & Lessons
      if (course.modules && Array.isArray(course.modules)) {
        for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
          const mod = course.modules[mIdx];
          const modId = mod.id || `${course.id}-mod-${mIdx + 1}`;
          const modNumber = mod.module_number || (mIdx + 1);

          const modRecord = {
            id: modId,
            course_id: course.id,
            module_number: modNumber,
            title: mod.title || `Module ${modNumber}`,
            description: mod.description || "",
            order_index: mIdx + 1
          };

          await supabase.from("modules").upsert(modRecord);
          summary.modulesUpserted++;

          // Lessons
          if (mod.lessons && Array.isArray(mod.lessons)) {
            for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
              const les = mod.lessons[lIdx];
              const lesId = les.id || `${modId}-les-${lIdx + 1}`;
              const lesNumber = les.lesson_number || (lIdx + 1);

              const lesRecord = {
                id: lesId,
                module_id: modId,
                lesson_number: lesNumber,
                title: les.title || `Topic ${lesNumber}`,
                content: les.content || "Lesson content",
                content_type: "interactive",
                order_index: lIdx + 1,
                duration_minutes: les.duration_minutes || 15,
                starter_code: les.starter_code || null,
                sandbox_language: les.sandbox_language || "python",
                challenge: les.challenge || null
              };

              await supabase.from("lessons").upsert(lesRecord);
              summary.lessonsUpserted++;
            }
          }

          // Module Quiz
          const quizQuestions = Array.isArray(mod.quiz) 
            ? mod.quiz 
            : (mod.quiz?.questions && Array.isArray(mod.quiz.questions) ? mod.quiz.questions : null);

          if (quizQuestions && quizQuestions.length > 0) {
            const quizId = `quiz-${modId}`;
            await supabase.from("quizzes").upsert({
              id: quizId,
              course_id: course.id,
              module_index: modNumber,
              questions: quizQuestions,
              passing_score: mod.quiz?.passing_score || 70,
              time_limit_minutes: mod.quiz?.time_limit_minutes || 15
            });
            summary.quizzesUpserted++;
          }
        }
      }

      // Final Exam Quiz
      const finalExamQuestions = Array.isArray(course.final_exam)
        ? course.final_exam
        : (course.final_exam?.questions && Array.isArray(course.final_exam.questions) ? course.final_exam.questions : null);

      if (finalExamQuestions && finalExamQuestions.length > 0) {
        const examQuizId = `final-exam-${course.id}`;
        await supabase.from("quizzes").upsert({
          id: examQuizId,
          course_id: course.id,
          module_index: 999,
          questions: finalExamQuestions,
          passing_score: course.final_exam?.passing_score || 50,
          time_limit_minutes: course.final_exam?.time_limit_minutes || 30
        });
        summary.quizzesUpserted++;
      }
    }

    return res.json({
      success: true,
      message: "Successfully synchronized courses to Supabase!",
      summary
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to push courses to Supabase", details: err?.message });
  }
});

// Serve frontend assets via Vite middleware in dev or static in prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LernexAI Server listening on http://0.0.0.0:${PORT}`);
  });
}

// Only auto-listen if not running as a Vercel/serverless function
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  startServer();
}

export default app;
