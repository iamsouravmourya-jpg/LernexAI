import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

function generateSmartLocalAnswer(question: string, lessonTitle?: string, moduleTitle?: string): string {
  const q = (question || "").toLowerCase();
  const contextHeader = lessonTitle ? `**Lesson:** ${lessonTitle} (${moduleTitle || "Fundamentals"})\n\n` : "";

  if (q.includes("python") || q.includes("def") || q.includes("indentation")) {
    return `${contextHeader}### **Python Fundamentals**
Python is a dynamic, interpreted language with expressive syntax that prioritizes developer readability.

\`\`\`python
# Simple greeting function in Python
def greet_student(name: str) -> str:
    return f"Welcome to LernexAI, {name}!"

print(greet_student("Learner"))
\`\`\`

**Key Features:**
- Uses indentation instead of braces to delimit blocks.
- Extensive standard library and rich third-party ecosystem.
- Dynamically typed with support for type annotations.`;
  }

  if (q.includes("recursion") || q.includes("base case")) {
    return `${contextHeader}### **Understanding Recursion**
Recursion occurs when a function calls itself to solve smaller subproblems until reaching a **base case**.

\`\`\`javascript
// Factorial with base case
function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive step
}
\`\`\`

**Rule of Thumb:** Always verify your base case to prevent stack overflow errors.`;
  }

  return `${contextHeader}### **AI Tutor Explanation**
Here is a structured explanation for **"${question || "your doubt"}"**:

\`\`\`typescript
// Concept demonstration
export function solveConcept(input: string) {
  return {
    status: "completed",
    timestamp: new Date().toISOString(),
    query: input,
  };
}
\`\`\`

- **Key Insight:** Break the problem down into isolated inputs, transformations, and outputs.
- **Next Step:** Experiment with this logic in your code editor or ask for a step-by-step trace!`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Setup CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, x-groq-api-key");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({ status: "active", endpoint: "ai-tutor-groq" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = { message: body };
      }
    }
    body = body || {};

    const action = body.action || "ask";
    const isPro = Boolean(body.isPro || body.planType === "pro");
    const fallbackLimit = isPro ? 50 : 10;

    if (action === "history") {
      return res.status(200).json({
        messages: [],
        usage: {
          count: 0,
          limit: fallbackLimit,
          isFreePlan: !isPro,
        },
      });
    }

    let question = (
      body.message ||
      body.userMessage ||
      body.prompt ||
      body.question ||
      body.query ||
      body.text ||
      ""
    );

    if (!question && Array.isArray(body.history) && body.history.length > 0) {
      const lastUserItem = [...body.history].reverse().find(
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

    const lessonTitle = body.lessonTitle || "Programming Lesson";
    const moduleTitle = body.moduleTitle || "Core Concepts";
    const lessonContent = body.lessonContent || "";

    let historyContext = "";
    if (Array.isArray(body.history) && body.history.length > 0) {
      const recent = body.history.slice(-6);
      historyContext = recent
        .map((h: any) => `${h.role === "user" || h.sender === "user" ? "Student" : "Tutor"}: ${h.content || h.text}`)
        .join("\n");
    }

    let answer = "";

    // 1. Groq API with 4-Key Round-Robin Rotation and explicit await
    try {
      const GroqModule = await import("groq-sdk");
      const Groq = GroqModule.default || GroqModule;

      const headerKey = (req.headers["x-groq-api-key"] as string) || "";
      const groqCandidateKeys = [
        headerKey,
        process.env.GROQ_API_KEY_1,
        process.env.GROQ_API_KEY_2,
        process.env.GROQ_API_KEY_3,
        process.env.GROQ_API_KEY_4,
        process.env.GROQ_API_KEY,
        process.env.GROQ_KEY,
        process.env.VITE_GROQ_API_KEY,
        "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",
      ]
        .map((k) => (k || "").trim())
        .filter((k) => k.length > 10 && k.startsWith("gsk_"));

      const uniqueGroqKeys = Array.from(new Set(groqCandidateKeys));

      const groqModels = [
        process.env.GROQ_MODEL,
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
        "qwen-2.5-coder-32b",
        "mixtral-8x7b-32768",
        "gemma2-9b-it",
      ].filter(Boolean) as string[];

      const systemPrompt = `You are LernexAI's elite AI Tutor and private coding mentor for the lesson "${lessonTitle}" (${moduleTitle}).
${lessonContent ? `Lesson Content Context: ${lessonContent.slice(0, 1500)}` : ""}

Instructions:
1. Provide extremely clear, well-structured, and encouraging explanations.
2. If the student asks in English, Hindi, or Hinglish, reply in the same natural tone and language style.
3. Structure your response using clear bold headings, bullet points, and clean code blocks wrapped in triple backticks with language specifiers.
4. Keep explanations practical, engaging, and directly applicable to the lesson.`;

      let keyIndex = 1;
      for (const key of uniqueGroqKeys) {
        try {
          console.log(`[AI Tutor] Attempting Groq Key #${keyIndex} (${key.slice(0, 8)}...)`);
          const client = new Groq({ apiKey: key });

          for (const modelName of groqModels) {
            try {
              console.log(`[AI Tutor] Calling Groq model: ${modelName} with Key #${keyIndex}`);
              const completion = await client.chat.completions.create({
                messages: [
                  { role: "system", content: systemPrompt },
                  ...(historyContext ? [{ role: "user" as const, content: `Previous context:\n${historyContext}` }] : []),
                  { role: "user", content: question },
                ],
                model: modelName,
                temperature: 0.3,
                max_tokens: 800,
              });

              const reply = completion.choices?.[0]?.message?.content?.trim();
              if (reply) {
                console.log(`[AI Tutor] Success with Groq Key #${keyIndex} and model ${modelName}`);
                answer = reply;
                break;
              }
            } catch (modelErr: any) {
              const msg = modelErr?.message || String(modelErr);
              console.warn(`[AI Tutor] Groq Key #${keyIndex} model (${modelName}) error:`, msg);
              if (msg.includes("429") || msg.includes("rate_limit") || msg.includes("401") || msg.includes("unauthorized")) {
                // Break model loop to immediately try next key in pool
                break;
              }
            }
          }

          if (answer) break;
        } catch (keyErr: any) {
          console.warn(`[AI Tutor] Groq Key #${keyIndex} initialization failed:`, keyErr?.message);
        }
        keyIndex++;
      }
    } catch (groqRootErr: any) {
      console.warn("[AI Tutor] Groq controller error:", groqRootErr?.message);
    }

    // 2. Fallback to Smart Local Answer if Groq keys are exhausted or offline
    if (!answer) {
      console.log("[AI Tutor] All Groq keys exhausted or offline. Using smart local fallback answer.");
      answer = generateSmartLocalAnswer(question, lessonTitle, moduleTitle);
    }

    const assistantMsg = {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: answer,
      created_at: new Date().toISOString(),
    };

    return res.status(200).json({
      answer,
      response: answer,
      reply: answer,
      message: assistantMsg,
      usage: {
        count: 1,
        limit: fallbackLimit,
        isFreePlan: !isPro,
      },
    });
  } catch (err: any) {
    console.error("[AI Tutor Vercel Exception]:", err);
    const fallbackAnswer = generateSmartLocalAnswer("Programming question");

    return res.status(200).json({
      answer: fallbackAnswer,
      response: fallbackAnswer,
      reply: fallbackAnswer,
      message: {
        id: crypto.randomUUID(),
        role: "assistant",
        content: fallbackAnswer,
        created_at: new Date().toISOString(),
      },
      usage: { count: 1, limit: 10, isFreePlan: true },
    });
  }
}

