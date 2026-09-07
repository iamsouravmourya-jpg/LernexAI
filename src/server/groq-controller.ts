import type { Request, Response } from "express";
import Groq from "groq-sdk";

export interface GroqTutorChatPayload {
  message?: string;
  question?: string;
  courseTitle?: string;
  moduleTitle?: string;
  lessonTitle?: string;
  lessonContent?: string;
  groqApiKey?: string;
}

export interface GroqTutorChatResult {
  success: boolean;
  reply: string;
  rateLimited?: boolean;
  keyIndexUsed?: number;
  modelUsed?: string;
  error?: string;
  timestamp: string;
}

/**
 * 1. Environment Key Management (4 Distributed Groq Accounts)
 * Loaded from process.env with fallback safety defaults.
 */
function getActiveGroqKeyPool(req?: Request): string[] {
  const headerKey = (
    (req?.headers?.["x-groq-api-key"] as string) ||
    req?.body?.groqApiKey ||
    ""
  ).trim();

  const candidateKeys = [
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

  // De-duplicate while preserving configuration priority
  const uniquePool = Array.from(new Set(candidateKeys));
  return uniquePool.length > 0
    ? uniquePool
    : ["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"];
}

/**
 * 2. Automated Round-Robin Atomic Index Pointer
 * Guarantees uniform token dispersion across Key 1 -> Key 2 -> Key 3 -> Key 4.
 */
let globalKeyPointer = 0;
const groqClientInstances = new Map<string, Groq>();

function getOrCreateGroqClient(apiKey: string): Groq {
  let client = groqClientInstances.get(apiKey);
  if (!client) {
    client = new Groq({ apiKey });
    groqClientInstances.set(apiKey, client);
  }
  return client;
}

/**
 * Supported Groq Production Candidate Models (Fast & High TPM Limits)
 */
export const GROQ_PRODUCTION_MODELS = [
  process.env.GROQ_MODEL,
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "qwen-2.5-coder-32b",
  "mixtral-8x7b-32768",
  "gemma2-9b-it",
].filter(Boolean) as string[];

/**
 * 3. Failover Wrapper Guarantee & Multi-Key Try-Catch Matrix
 */
export async function executeGroqChatWithRotation(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  req?: Request,
  options?: { maxTokens?: number; temperature?: number }
): Promise<{ text: string; keyIndex: number; model: string }> {
  const keyPool = getActiveGroqKeyPool(req);
  const totalKeys = keyPool.length;

  // Increment atomic round-robin pointer for request entry
  const startPointer = globalKeyPointer;
  globalKeyPointer = (globalKeyPointer + 1) % totalKeys;

  let allKeysRateLimited = true;

  // Cycle through all keys starting from current round-robin offset
  for (let offset = 0; offset < totalKeys; offset++) {
    const currentKeyIndex = (startPointer + offset) % totalKeys;
    const apiKey = keyPool[currentKeyIndex];
    const client = getOrCreateGroqClient(apiKey);

    for (const modelName of GROQ_PRODUCTION_MODELS) {
      try {
        const response = await client.chat.completions.create({
          messages,
          model: modelName,
          temperature: options?.temperature ?? 0.3,
          max_tokens: options?.maxTokens ?? 700,
        });

        const reply = response.choices?.[0]?.message?.content?.trim();
        if (reply) {
          return {
            text: reply,
            keyIndex: currentKeyIndex + 1,
            model: modelName,
          };
        }
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        const isRateLimit =
          errorMsg.includes("429") ||
          errorMsg.includes("rate_limit") ||
          errorMsg.includes("tokens per minute") ||
          errorMsg.includes("TPM");

        if (isRateLimit) {
          // Suppress 429 from user logs and auto-switch to next available index
          console.info(
            `[Groq Controller] Key #${currentKeyIndex + 1} hit 429 token boundary on (${modelName}). Silently failing over to next account key...`
          );
          // Break model loop to advance immediately to next API Key in pool
          break;
        } else {
          allKeysRateLimited = false;
          console.warn(
            `[Groq Controller] Key #${currentKeyIndex + 1} model (${modelName}) error:`,
            errorMsg
          );
        }
      }
    }
  }

  // 4. Graceful Worst-Case Fallback (All 4 Accounts Exhausted)
  const exhaustionError = new Error(
    allKeysRateLimited
      ? "LernexAI is experiencing exceptionally high demand from free-tier users. Please try again in 2-3 minutes."
      : "Temporary inference service delay. Please try again shortly."
  );
  (exhaustionError as unknown as { isExhaustedRateLimit: boolean }).isExhaustedRateLimit = allKeysRateLimited;
  throw exhaustionError;
}

/**
 * Express Controller Endpoint Handler
 * Directly mountable to app.post("/api/ai-tutor") or "/api/groq/chat"
 */
export async function groqTutorController(req: Request, res: Response) {
  try {
    const body: GroqTutorChatPayload = req.body || {};
    const question = (body.question || body.message || "").trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question or message text is required.",
        timestamp: new Date().toISOString(),
      });
    }

    const systemPrompt = `You are LernexAI's elite AI Tutor and real-time private coding mentor.

Context:
- Course: ${body.courseTitle || "LernexAI Technical Course"}
- Module: ${body.moduleTitle || "Curriculum Unit"}
- Lesson: ${body.lessonTitle || "Active Lesson"}

Lesson Excerpt:
${(body.lessonContent || "General technical curriculum.").slice(0, 10000)}

Instructions:
1. Provide extremely clear, friendly, and structured explanations.
2. If the student asks in Hinglish or Hindi, answer naturally in the same friendly tone.
3. Use markdown headings, bullet points, and code blocks whenever appropriate.
4. Keep explanations concise, practical, and directly applicable.`;

    const messages: Array<{ role: "system" | "user"; content: string }> = [
      { role: "system", content: systemPrompt },
      { role: "user", content: question },
    ];

    const result = await executeGroqChatWithRotation(messages, req, {
      maxTokens: 700,
      temperature: 0.3,
    });

    return res.json({
      success: true,
      reply: result.text,
      answer: result.text,
      response: result.text,
      keyIndexUsed: result.keyIndex,
      modelUsed: result.model,
      rateLimited: false,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const isExhausted = (error as { isExhaustedRateLimit?: boolean })?.isExhaustedRateLimit;
    const clientMessage =
      error instanceof Error
        ? error.message
        : "LernexAI is experiencing exceptionally high demand from free-tier users. Please try again in 2-3 minutes.";

    return res.status(isExhausted ? 429 : 503).json({
      success: false,
      rateLimited: !!isExhausted,
      reply: clientMessage,
      answer: clientMessage,
      response: clientMessage,
      error: clientMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
