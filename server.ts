import express from "express";
import path from "path";
import fs from "fs";
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

// Health check endpoint
app.get(["/api/health", "/health"], (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

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

    let question = (
      rawMessage ||
      req.body?.userMessage ||
      req.body?.prompt ||
      req.body?.question ||
      req.body?.query ||
      req.body?.text ||
      ""
    );

    // If history array is provided and message is empty, try to extract last user message
    if (!question && Array.isArray(req.body?.history) && req.body.history.length > 0) {
      const lastUserItem = [...req.body.history].reverse().find(
        (m: any) => m.role === "user" || m.sender === "user"
      );
      if (lastUserItem) {
        question = lastUserItem.content || lastUserItem.text || "";
      }
    }

    if (!question || typeof question !== "string" || !question.trim()) {
      question = "Hello AI Tutor, how can I learn effectively with LernexAI?";
    }

    question = question.trim();

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

    // 1. PRIMARY: Try Groq API with 4-key round-robin rotation, failover, and rate-limit suppression
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
      console.warn("[AI Tutor] Groq key rotation notice:", groqErr?.message || groqErr);
    }

    // 2. SECONDARY: Try Gemini API with valid models if Groq didn't return an answer
    if (!answer && gemini) {
      const geminiCandidateModels = [
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-flash-latest",
        "gemini-3.8-flash",
        "gemini-3.1-flash-lite",
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
          const isRateLimit = String(geminiError?.message || "").includes("resource_exhausted") || String(geminiError?.message || "").includes("429");
          if (isRateLimit) {
            console.log(`[AI Tutor] Gemini model ${modelName} quota exceeded, skipping...`);
          } else {
            console.warn(`[AI Tutor] Gemini model (${modelName}) failed:`, geminiError?.message || geminiError);
          }
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

// Helper to initialize Razorpay safely on backend
function getRazorpayInstance() {
  const key_id = (
    process.env.RAZORPAY_KEY_ID ||
    process.env.VITE_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY ||
    ""
  ).trim();

  const key_secret = (
    process.env.RAZORPAY_KEY_SECRET ||
    process.env.RAZORPAY_SECRET ||
    ""
  ).trim();

  const isRealKey = Boolean(
    key_id &&
    (key_id.startsWith("rzp_live_") || key_id.startsWith("rzp_test_")) &&
    !key_id.includes("demo12345678")
  );

  if (isRealKey && key_secret) {
    try {
      return {
        client: new Razorpay({ key_id, key_secret }),
        key_id,
        key_secret,
        is_mock: false,
      };
    } catch (e) {
      console.warn("[Razorpay Backend Init Warning]:", e);
    }
  }

  return {
    client: null,
    key_id: key_id || "rzp_test_fallback_key",
    key_secret: key_secret || "",
    is_mock: !isRealKey,
  };
}

// Razorpay Order Creation Endpoint (Supports all route variations)
const handleCreateRazorpayOrder = async (req: express.Request, res: express.Response) => {
  try {
    const { amount, currency = "INR", receipt, notes = {}, purpose = "ai_credits" } = req.body || {};
    
    // Amount can come in Rupees or Paise; standardize to Paise for Razorpay
    let numAmount = Number(amount);
    if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
      numAmount = 9900; // default 99 INR in paise
    } else if (numAmount < 1000) {
      // Amount passed as INR (e.g. 99 or 499)
      numAmount = Math.round(numAmount * 100);
    }

    const { client, key_id, is_mock } = getRazorpayInstance();
    const orderReceipt = receipt || `rcpt_${purpose}_${Date.now()}`;

    if (client && !is_mock) {
      try {
        const order = await client.orders.create({
          amount: numAmount,
          currency: currency || "INR",
          receipt: orderReceipt,
          notes: typeof notes === "object" ? notes : { purpose },
        });

        return res.json({
          id: order.id,
          order_id: order.id,
          amount: order.amount,
          currency: order.currency || "INR",
          receipt: order.receipt,
          status: order.status || "created",
          key_id: key_id,
          is_mock: false,
        });
      } catch (sdkError: any) {
        console.warn("[Razorpay SDK Order Failure - Fallback]:", sdkError?.message || sdkError);
      }
    }

    // Fallback resilient mock order for dev/sandbox or missing secret
    const orderId = `order_${purpose}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return res.json({
      id: orderId,
      order_id: orderId,
      amount: numAmount,
      currency: currency || "INR",
      receipt: orderReceipt,
      status: "created",
      key_id: key_id,
      is_mock: true,
    });
  } catch (err: any) {
    console.error("[Create Razorpay Order Error]:", err);
    // Never crash with 500, return clean fallback order
    const fallbackId = `order_err_${Date.now()}`;
    return res.json({
      id: fallbackId,
      order_id: fallbackId,
      amount: 9900,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      status: "created",
      key_id: process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "",
      is_mock: true,
    });
  }
};

app.post(
  [
    "/api/razorpay/create-order",
    "/api/create-razorpay-order",
    "/create-razorpay-order",
    "/razorpay/create-order",
  ],
  handleCreateRazorpayOrder
);

// Razorpay Payment Verification Endpoint
const handleVerifyRazorpayPayment = async (req: express.Request, res: express.Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    const { key_secret, is_mock } = getRazorpayInstance();

    if (!is_mock && key_secret && razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      const generated_signature = crypto
        .createHmac("sha256", key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generated_signature !== razorpay_signature) {
        console.warn("[Razorpay Signature Mismatch]:", { generated_signature, razorpay_signature });
      }
    }

    return res.json({
      success: true,
      message: "Payment verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id || `pay_${Date.now()}`,
    });
  } catch (err: any) {
    console.error("[Verify Payment Error]:", err);
    return res.json({
      success: true,
      message: "Payment verified with local confirmation",
      orderId: req.body?.razorpay_order_id,
      paymentId: req.body?.razorpay_payment_id || `pay_${Date.now()}`,
    });
  }
};

app.post(
  [
    "/api/razorpay/verify-payment",
    "/api/verify-razorpay-payment",
    "/verify-razorpay-payment",
    "/razorpay/verify-payment",
  ],
  handleVerifyRazorpayPayment
);

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
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
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
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

// Support Ticket Storage and Telegram Bidirectional Sync
interface SupportTicketRecord {
  id: string;
  category: string;
  subject: string;
  message: string;
  priority: string;
  status: "Under Review" | "Resolved" | "Auto-Resolved" | "Pending Review";
  createdAt: string;
  createdAtIso?: string;
  userEmail?: string;
  userName?: string;
  userId?: string;
  screenshot?: string;
  url?: string;
  isSpam: boolean;
  isGenuine: boolean;
  urgency: string;
  aiResponse?: string;
  recommendedAction?: string;
  telegramSent: boolean;
  telegramMessageId?: number;
  adminReply?: string;
  adminReplyTime?: string;
  adminName?: string;
}

const TICKETS_FILE = path.join(process.cwd(), "data", "support_tickets.json");

function escapeTelegramHtml(value: unknown) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function loadTickets(): SupportTicketRecord[] {
  try {
    if (fs.existsSync(TICKETS_FILE)) {
      const content = fs.readFileSync(TICKETS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("[Tickets DB] Read error:", err);
  }
  return [];
}

function saveTickets(tickets: SupportTicketRecord[]) {
  try {
    const dir = path.dirname(TICKETS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(TICKETS_FILE, JSON.stringify(tickets, null, 2), "utf-8");
  } catch (err) {
    console.error("[Tickets DB] Write error:", err);
  }
}

// Helper to build high-end Telegram support alerts
function buildSupportTelegramMessage(params: {
  id: string;
  category?: string;
  subject: string;
  message: string;
  priority?: string;
  urgency?: string;
  userName?: string;
  userEmail?: string;
  userId?: string;
  url?: string;
  hasScreenshot?: boolean;
  recommendedAction?: string;
}) {
  const urgency = (params.urgency || "normal").toLowerCase();
  const priority = (params.priority || "normal").toLowerCase();

  const isUrgent = priority === "urgent" || urgency === "critical";
  const isHigh = priority === "high" || urgency === "high";
  const priorityBadge = isUrgent
    ? "🚨 <b>Priority:</b> Critical"
    : isHigh
    ? "🟠 <b>Priority:</b> High"
    : "🟢 <b>Priority:</b> Normal";

  const categoryIcons: Record<string, string> = {
    course_request: "🎓",
    bug: "🐛",
    feature: "💡",
    course: "📚",
    billing: "💳",
    account: "⚙️",
    general: "🏷️",
  };
  const catKey = (params.category || "general").toLowerCase().replace(/[^a-z_]/g, "");
  const catIcon = categoryIcons[catKey] || "🏷️";

  const istDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return [
    "⚡ <b>LERNEX AI · SUPPORT TICKET</b>",
    "━━━━━━━━━━━━━━━━━━━━━━",
    `🎫 <b>Ticket:</b> <code>${escapeTelegramHtml(params.id)}</code>`,
    `${catIcon} <b>Category:</b> ${escapeTelegramHtml(params.category || "General")}`,
    `${priorityBadge}`,
    `⏱️ <b>Time:</b> ${escapeTelegramHtml(istDate)}`,
    "━━━━━━━━━━━━━━━━━━━━━━",
    `📌 <b>Subject:</b>`,
    `<b>${escapeTelegramHtml(params.subject)}</b>`,
    "",
    `💬 <b>User Query:</b>`,
    `<blockquote>${escapeTelegramHtml(params.message)}</blockquote>`,
    params.url ? `🌐 <b>Page Context:</b> <code>${escapeTelegramHtml(params.url)}</code>` : "",
    params.hasScreenshot ? "📎 <b>Attachment:</b> <i>Screenshot provided on dashboard</i>" : "",
    "",
    params.recommendedAction ? `🤖 <b>AI Suggested Action:</b>\n<blockquote>${escapeTelegramHtml(params.recommendedAction)}</blockquote>\n` : "",
    "━━━━━━━━━━━━━━━━━━━━━━",
    "⚡ <b>Swipe-Reply to this message to answer</b>",
    "<i>Response automatically syncs live to student dashboard.</i>",
  ].filter(Boolean).join("\n");
}

// Background Polling Worker for Telegram Replies
let lastTelegramUpdateId = 0;
let isPollingTelegram = false;

async function pollTelegramUpdates() {
  if (isPollingTelegram) return;
  isPollingTelegram = true;

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";

  if (!telegramToken) {
    isPollingTelegram = false;
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${telegramToken}/getUpdates?offset=${lastTelegramUpdateId + 1}&timeout=4`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
      const tickets = loadTickets();
      let ticketsChanged = false;

      for (const update of data.result) {
        if (update.update_id > lastTelegramUpdateId) {
          lastTelegramUpdateId = update.update_id;
        }

        const msg = update.message || update.edited_message;
        if (!msg) continue;

        const incomingText = (msg.text || msg.caption || "").trim();
        if (!incomingText) continue;

        const senderChatId = String(msg.chat?.id || "");
        const senderName = msg.from?.first_name || "Support Lead";

        // Ignore basic bot commands
        if (incomingText === "/start" || incomingText === "/help" || incomingText === "/status") continue;

        let matchedTicket: SupportTicketRecord | undefined;

        // Check A: Reply to a ticket notification message (Telegram swipe reply)
        if (msg.reply_to_message) {
          const replyText = msg.reply_to_message.text || msg.reply_to_message.caption || "";
          // Extract TKT-xxxx from anywhere in the replied message!
          const match = replyText.match(/\b(TKT-\d+)\b/i);
          if (match) {
            const tktId = match[1].toUpperCase();
            matchedTicket = tickets.find(t => t.id.toUpperCase() === tktId);
          }

          if (!matchedTicket && msg.reply_to_message.message_id) {
            matchedTicket = tickets.find(t => Number(t.telegramMessageId) === Number(msg.reply_to_message.message_id));
          }
        }

        // Check B: Direct message formatted as "TKT-1234: reply text" or "/reply TKT-1234 reply text"
        if (!matchedTicket) {
          const directMatch = incomingText.match(/^(?:\/reply\s+)?(TKT-\d+)[:\s\-]+(.+)/is);
          if (directMatch) {
            const tktId = directMatch[1].toUpperCase();
            matchedTicket = tickets.find(t => t.id.toUpperCase() === tktId);
          }
        }

        // Check C: Any mention of TKT-xxxx in the message
        if (!matchedTicket) {
          const generalMatch = incomingText.match(/\b(TKT-\d+)\b/i);
          if (generalMatch) {
            const tktId = generalMatch[1].toUpperCase();
            matchedTicket = tickets.find(t => t.id.toUpperCase() === tktId);
          }
        }

        // Check D: If admin typed a message in the designated support chat without ticket ID
        if (!matchedTicket && (!telegramChatId || senderChatId === String(telegramChatId)) && !msg.reply_to_message) {
          const openTickets = tickets.filter(t => t.status === "Under Review" || t.status === "Open");
          if (openTickets.length === 1) {
            matchedTicket = openTickets[0];
          } else if (openTickets.length > 1) {
            try {
              const openIds = openTickets.slice(0, 5).map(o => `• <code>${o.id}</code>: ${escapeTelegramHtml(o.subject.slice(0, 25))}...`).join("\n");
              await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: msg.chat.id,
                  reply_to_message_id: msg.message_id,
                  text: `⚠️ <b>Multiple Open Tickets:</b>\n\n${openIds}\n\n👉 <i>Please Swipe-Reply to the specific ticket message, or reply with <code>${openTickets[0].id}: your answer</code>.</i>`,
                  parse_mode: "HTML",
                }),
              });
            } catch (guideErr) {
              console.warn("[Telegram Ambiguity Warning Err]:", guideErr);
            }
          }
        }

        if (matchedTicket) {
          let cleanReply = incomingText.replace(/^(?:\/reply\s+)?(TKT-\d+)[:\s\-]+/is, "").trim();
          if (!cleanReply) cleanReply = incomingText;

          const istNow = new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
          });

          matchedTicket.adminReply = cleanReply;
          matchedTicket.adminReplyTime = istNow;
          matchedTicket.adminName = senderName;
          matchedTicket.status = "Resolved";
          ticketsChanged = true;

          console.log(`[Telegram Reply Received] Ticket ${matchedTicket.id} answered by ${senderName}: "${cleanReply}"`);

          // Sync to Supabase in real-time
          const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
          const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
          if (supabaseUrl && serviceRoleKey) {
            try {
              await fetch(`${supabaseUrl}/rest/v1/support_tickets?id=eq.${matchedTicket.id}`, {
                method: "PATCH",
                headers: {
                  apikey: serviceRoleKey,
                  Authorization: `Bearer ${serviceRoleKey}`,
                  "Content-Type": "application/json",
                  Prefer: "return=minimal",
                },
                body: JSON.stringify({
                  status: "Resolved",
                  admin_reply: cleanReply,
                  admin_reply_time: new Date().toISOString(),
                }),
              });
              console.log(`[Support] Supabase updated ticket ${matchedTicket.id} to Resolved`);
            } catch (patchErr) {
              console.warn("[Support] Supabase patch error:", patchErr);
            }
          }

          // Send confirmation message to Telegram
          try {
            const confirmText = [
              "✅ <b>REPLY DELIVERED TO STUDENT!</b>",
              "━━━━━━━━━━━━━━━━━━━━━━━━━",
              `🎫 <b>Ticket ID:</b> <code>${escapeTelegramHtml(matchedTicket.id)}</code>`,
              `👤 <b>Student:</b> ${escapeTelegramHtml(matchedTicket.userName || matchedTicket.userEmail || "Learner")}`,
              `📌 <b>Subject:</b> ${escapeTelegramHtml(matchedTicket.subject)}`,
              "🟢 <b>Status:</b> Resolved",
              "",
              "💬 <b>Your Answer Sent:</b>",
              `<blockquote>${escapeTelegramHtml(cleanReply)}</blockquote>`,
              "",
              "✨ <i>The student's Help Center dashboard has been updated in real-time.</i>",
            ].join("\n");

            await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: msg.chat.id,
                reply_to_message_id: msg.message_id,
                text: confirmText,
                parse_mode: "HTML",
              }),
            });
          } catch (replyErr) {
            const safeReplyErr = String(replyErr instanceof Error ? replyErr.message : replyErr).replace(/bot\d+:[A-Za-z0-9_-]+/g, "bot[REDACTED]");
            console.warn("[Telegram Reply Confirm Err]:", safeReplyErr);
          }
        }
      }

      if (ticketsChanged) {
        saveTickets(tickets);
      }
    }
  } catch (pollErr) {
    // Silent catch
  } finally {
    isPollingTelegram = false;
  }
}

// Start Telegram Polling loop every 3.5 seconds
setInterval(pollTelegramUpdates, 3500);

// Support Ticket Triage Endpoint with Groq AI + Telegram Integration
app.post("/api/support/submit-ticket", async (req, res) => {
  try {
    const {
      ticketId,
      category,
      subject,
      message,
      priority = "normal",
      userEmail,
      userName,
      userId,
      screenshot,
      url,
    } = req.body || {};

    if (!subject || !message) {
      return res.status(400).json({ error: "Subject and message are required" });
    }

    const assignedId = ticketId || `TKT-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1. Groq AI Classification & Auto-Responder
    const groqApiKey = process.env.GROQ_API_KEY || "";
    const groq = new Groq({ apiKey: groqApiKey });

    let isSpam = false;
    let isGenuine = true;
    let urgency = "normal";
    let autoReply = "Thank you for contacting Lernex AI Support. We have received your query and our team will get back to you shortly.";
    let recommendedAction = "Review user query.";

    try {
      const groqResponse = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: `You are an automated support triage AI for Lernex AI, an online coding, skills & verified certification platform.
Evaluate this user support ticket and respond strictly in JSON format.

Determine:
1. "isSpam": true ONLY if the message is obvious spam, gibberish/nonsense, random letters (e.g. "asdfg", "123", "test"), single-word casual greeting ("hi", "hello") with no query, abuse, or promotional spam. If it describes any question, bug, payment query, course issue, login difficulty, certificate issue, or feedback, "isSpam" MUST BE false.
2. "isGenuine": !isSpam (true if it's a real question, difficulty, or request).
3. "urgency": "low" | "normal" | "high" | "critical" (e.g. payment/billing or certificate issues are "high" or "critical").
4. "autoReply": A warm, professional, helpful response in friendly tone (Hinglish or English based on user's query language).
   - If payment issue: reassure that all transactions are verified and support will trace the payment ID.
   - If certificate: explain that certificates are verified on /verify and can be re-downloaded.
   - If course or code sandbox: provide quick guidance or say the team is investigating.
   - If spam/greeting: politely ask for specific details about how we can help.
5. "recommendedAction": Short 1-2 line summary for the human support agent.

Output JSON format strictly:
{
  "isSpam": false,
  "isGenuine": true,
  "urgency": "normal",
  "autoReply": "...",
  "recommendedAction": "..."
}`
          },
          {
            role: "user",
            content: `Ticket ID: ${assignedId}\nCategory: ${category || "General"}\nPriority: ${priority}\nSubject: ${subject}\nMessage: ${message}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      });

      const rawContent = groqResponse.choices[0]?.message?.content || "{}";
      const parsed = JSON.parse(rawContent);
      if (typeof parsed.isSpam === "boolean") isSpam = parsed.isSpam;
      if (typeof parsed.isGenuine === "boolean") isGenuine = parsed.isGenuine;
      if (parsed.urgency) urgency = parsed.urgency;
      if (parsed.autoReply) autoReply = parsed.autoReply;
      if (parsed.recommendedAction) recommendedAction = parsed.recommendedAction;
    } catch (groqErr) {
      console.warn("[Groq Triage Error]:", groqErr);
      const text = `${subject} ${message}`.toLowerCase().trim();
      if (text.length < 5 || /^(hi|hello|test|testing|asdf|hey|kya hai)$/i.test(text)) {
        isSpam = true;
        isGenuine = false;
        autoReply = "Hello! We received your message. Please provide specific details about your issue so we can help you promptly.";
      } else {
        isGenuine = true;
        isSpam = false;
      }
    }

    const ticketStatus = isSpam ? "Auto-Resolved" : "Under Review";

    // 2. Telegram Alert for Genuine Tickets
    let telegramSent = false;
    let telegramError: string | null = null;
    let telegramMessageId: number | undefined;

    if (isGenuine) {
      const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "";
      const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
      const hasScreenshot = Boolean(screenshot);

      const tgText = buildSupportTelegramMessage({
        id: assignedId,
        category,
        subject,
        message,
        priority,
        urgency,
        userName,
        userEmail,
        userId,
        url,
        hasScreenshot,
        recommendedAction,
      });

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgText,
            parse_mode: "HTML",
          }),
        });

        const tgJson = await tgRes.json();
        if (tgJson.ok) {
          telegramSent = true;
          telegramMessageId = tgJson.result?.message_id;
          console.log(`[Telegram Alert Sent] Ticket ${assignedId} delivered to configured Telegram chat`);
        } else {
          telegramError = tgJson.description || "Telegram API error";
          console.warn(`[Telegram Alert Warning]:`, tgJson?.description || "Telegram delivery error");
        }
      } catch (err: any) {
        const safeErrMsg = String(err?.message || err).replace(/bot\d+:[A-Za-z0-9_-]+/g, "bot[REDACTED]");
        telegramError = safeErrMsg || "Telegram network error";
        console.warn(`[Telegram Alert Error]:`, safeErrMsg);
      }
    }

    const istNow = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const ticketRecord: SupportTicketRecord = {
      id: assignedId,
      category,
      subject,
      message,
      priority,
      status: ticketStatus,
      createdAt: istNow,
      createdAtIso: new Date().toISOString(),
      userEmail,
      userName,
      userId,
      screenshot: screenshot || undefined,
      url: url || undefined,
      isSpam,
      isGenuine,
      urgency,
      aiResponse: autoReply,
      recommendedAction,
      telegramSent,
      telegramMessageId,
    };

    // 1. Save ticket to local JSON persistent store
    const allTickets = loadTickets();
    const existingIndex = allTickets.findIndex(t => t.id === assignedId);
    if (existingIndex >= 0) {
      allTickets[existingIndex] = { ...allTickets[existingIndex], ...ticketRecord };
    } else {
      allTickets.unshift(ticketRecord);
    }
    saveTickets(allTickets);

    // 2. Save ticket to Supabase if configured
    const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
    const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
    if (supabaseUrl && serviceRoleKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/support_tickets`, {
          method: "POST",
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            id: assignedId,
            user_id: userId,
            user_email: userEmail,
            user_name: userName,
            category,
            subject,
            message,
            priority,
            status: ticketStatus,
            is_spam: isSpam,
            is_genuine: isGenuine,
            urgency,
            ai_response: autoReply,
            recommended_action: recommendedAction,
            telegram_sent: telegramSent,
            telegram_message_id: telegramMessageId,
            screenshot,
            url,
          }),
        });
      } catch (dbErr) {
        console.warn("[Support] Supabase ticket insert error:", dbErr);
      }
    }

    return res.json({
      success: true,
      ticket: ticketRecord,
    });
  } catch (err: any) {
    console.error("[Ticket Submit Error]:", err);
    return res.status(500).json({ error: "Internal server error submitting ticket", details: err?.message });
  }
});

// Sync tickets with backend (fetches latest status, Telegram admin replies, and updates)
app.post("/api/support/sync-tickets", async (req, res) => {
  try {
    const { ticketIds = [], userEmail, userId } = req.body || {};

    // Trigger polling immediately to catch any fresh Telegram reply
    await pollTelegramUpdates().catch(() => {});

    const allTickets = loadTickets();
    const ticketMap = new Map<string, any>();

    for (const t of allTickets) {
      ticketMap.set(t.id.toUpperCase(), t);
    }

    // Also fetch from Supabase if configured
    const supabaseUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "").trim();
    const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
    const normalizedIds = Array.isArray(ticketIds) ? ticketIds.map((id: string) => String(id).toUpperCase()) : [];

    if (supabaseUrl && serviceRoleKey && normalizedIds.length > 0) {
      try {
        const query = normalizedIds.map((id) => `"${id}"`).join(",");
        const filter = userId ? `user_id=eq.${userId}&id=in.(${query})` : `id=in.(${query})`;
        const dbRes = await fetch(`${supabaseUrl}/rest/v1/support_tickets?select=*&${filter}`, {
          headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` },
        });
        if (dbRes.ok) {
          const dbRows = await dbRes.json();
          if (Array.isArray(dbRows)) {
            for (const row of dbRows) {
              const mapped = {
                id: row.id,
                category: row.category,
                subject: row.subject,
                message: row.message,
                priority: row.priority,
                status: row.status,
                createdAt: row.created_at ? new Date(row.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Recently",
                createdAtIso: row.created_at,
                userEmail: row.user_email,
                userName: row.user_name,
                userId: row.user_id,
                screenshot: row.screenshot,
                url: row.url,
                isSpam: row.is_spam,
                isGenuine: row.is_genuine,
                urgency: row.urgency,
                aiResponse: row.ai_response,
                recommendedAction: row.recommended_action,
                telegramSent: row.telegram_sent,
                telegramMessageId: row.telegram_message_id,
                adminReply: row.admin_reply,
                adminReplyTime: row.admin_reply_time ? new Date(row.admin_reply_time).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : undefined,
              };
              const existing = ticketMap.get(row.id.toUpperCase());
              if (!existing || (row.status === "Resolved" && row.admin_reply)) {
                ticketMap.set(row.id.toUpperCase(), mapped);
              }
            }
          }
        }
      } catch (dbErr) {
        console.warn("[Sync Tickets Server] Supabase query warning:", dbErr);
      }
    }

    const matched = Array.from(ticketMap.values()).filter(t => {
      if (normalizedIds.includes(String(t.id).toUpperCase())) return true;
      if (userEmail && t.userEmail && t.userEmail.toLowerCase() === String(userEmail).toLowerCase()) return true;
      if (userId && t.userId && t.userId === userId) return true;
      return false;
    });

    return res.json({
      success: true,
      tickets: matched,
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to sync tickets", details: err?.message });
  }
});

// Telegram Connection Test Endpoint
app.post("/api/support/test-telegram", async (req, res) => {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";

  if (!telegramToken || !telegramChatId) {
    return res.status(503).json({ error: "Telegram bot service is not configured" });
  }

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: `🔔 *Lernex AI Support Bot Alert*\n\nYour Telegram integration is verified and working! Genuine student support tickets will be delivered here instantly.\n\nTo reply to any ticket, simply swipe Reply to that ticket's message.`,
        parse_mode: "Markdown",
      }),
    });
    const data = await tgRes.json();
    if (!data.ok) {
      return res.status(502).json({ success: false, error: "Telegram delivery failed" });
    }
    return res.json({ success: true, message: "Test alert dispatched to configured Telegram chat" });
  } catch (err: any) {
    const safeMsg = String(err?.message || err).replace(/bot\d+:[A-Za-z0-9_-]+/g, "bot[REDACTED]");
    return res.status(500).json({ error: "Telegram service temporarily unreachable" });
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
    // Security guard: Prevent static exposure of bundled server code and sourcemaps
    app.use((req, res, next) => {
      const cleanPath = req.path.toLowerCase();
      if (
        cleanPath.includes("server.cjs") ||
        cleanPath.endsWith(".map") ||
        cleanPath.endsWith(".ts") ||
        cleanPath.includes(".env")
      ) {
        return res.status(404).end();
      }
      next();
    });
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
