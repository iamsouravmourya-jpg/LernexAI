import { supabase } from "./supabase";

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export interface AITutorUsage {
  count: number;
  limit: number;
  isFreePlan: boolean;
}

interface StoredAIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

interface HistoryResponse {
  messages?: StoredAIChatMessage[];
  usage?: AITutorUsage;
}

interface AskResponse {
  answer?: string;
  message?: StoredAIChatMessage;
  usage?: AITutorUsage;
}

async function functionErrorMessage(error: unknown, fallback: string) {
  const context = (error as { context?: Response } | null)?.context;
  if (context) {
    try {
      const body = await context.clone().json() as { error?: string };
      if (body.error) return body.error;
    } catch {
      // Fall back to the SDK error below when the response is not JSON.
    }
  }

  return error instanceof Error && error.message ? error.message : fallback;
}

function normalizeMessage(message: StoredAIChatMessage): AIChatMessage {
  return {
    id: message.id,
    role: message.role,
    content: message.content,
    createdAt: message.created_at,
  };
}

export async function fetchAIChatHistory(lessonId: string, isPro = false) {
  const fallbackLimit = isPro ? 50 : 10;
  try {
    const res = await fetch("/api/ai-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "history", lessonId, planType: isPro ? "pro" : "free", isPro }),
    });

    if (res.ok) {
      const data = await res.json() as HistoryResponse;
      return {
        messages: (data?.messages || []).map(normalizeMessage),
        usage: data?.usage || { count: 0, limit: fallbackLimit, isFreePlan: !isPro },
      };
    }
  } catch (err) {
    console.warn("Local API tutor history call failed:", err);
  }

  // If local server unreachable, try Supabase functions safely
  try {
    const { data, error } = await supabase.functions.invoke<HistoryResponse>("ai-tutor", {
      body: { action: "history", lessonId, planType: isPro ? "pro" : "free", isPro },
    });

    if (!error && data?.messages) {
      return {
        messages: data.messages.map(normalizeMessage),
        usage: data.usage || { count: 0, limit: fallbackLimit, isFreePlan: !isPro },
      };
    }
  } catch (supabaseErr) {
    console.warn("Supabase AI tutor history fallback unavailable:", supabaseErr);
  }

  return {
    messages: [],
    usage: { count: 0, limit: fallbackLimit, isFreePlan: !isPro },
  };
}

export async function askAITutor(
  lessonId: string, 
  question: string,
  lessonContext?: { 
    courseTitle?: string; 
    moduleTitle?: string; 
    lessonTitle?: string; 
    lessonContent?: string;
    isPro?: boolean;
    planType?: string;
  }
) {
  const isPro = lessonContext?.isPro ?? (lessonContext?.planType === "pro");
  const fallbackLimit = isPro ? 50 : 10;
  const endpoints = ["/api/ai-tutor", "/api/course/chat-assistant"];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          action: "ask",
          lessonId,
          message: question,
          userMessage: question,
          courseTitle: lessonContext?.courseTitle,
          moduleTitle: lessonContext?.moduleTitle,
          lessonTitle: lessonContext?.lessonTitle,
          lessonContent: lessonContext?.lessonContent,
          planType: isPro ? "pro" : "free",
          isPro,
        }),
      });

      if (res.ok) {
        const data = await res.json() as AskResponse;
        const answerText = data?.answer || (data as any)?.response || (data as any)?.reply;
        
        if (answerText) {
          return {
            message: data.message
              ? normalizeMessage(data.message)
              : {
                  id: crypto.randomUUID(),
                  role: "assistant" as const,
                  content: answerText,
                },
            usage: data.usage || { count: 1, limit: fallbackLimit, isFreePlan: !isPro },
          };
        }
      }
    } catch (err) {
      console.warn(`[AI Tutor] Endpoint ${endpoint} call failed:`, err);
    }
  }

  // Fallback to Supabase functions if local server endpoint fails
  try {
    const { data, error } = await supabase.functions.invoke<AskResponse>("ai-tutor", {
      body: { action: "ask", lessonId, message: question, planType: isPro ? "pro" : "free", isPro },
    });

    if (!error && data?.answer) {
      return {
        message: data.message
          ? normalizeMessage(data.message)
          : {
              id: crypto.randomUUID(),
              role: "assistant" as const,
              content: data.answer,
            },
        usage: data.usage || { count: 1, limit: fallbackLimit, isFreePlan: !isPro },
      };
    }
  } catch (supabaseErr) {
    console.warn("Supabase AI tutor fallback error:", supabaseErr);
  }

  // If endpoint calls fail, throw error so UI displays error rather than fake fallback
  throw new Error("Unable to connect to AI Tutor server right now. Please try again in a moment.");
}
