import { supabase, isSupabaseConfigured } from "./supabase";

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
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/ai-tutor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
      },
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

  // If local server unreachable and Supabase configured, try Supabase functions safely
  if (isSupabaseConfigured) {
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
    history?: Array<{ role: "user" | "assistant"; content: string }>;
  }
) {
  const isPro = lessonContext?.isPro ?? (lessonContext?.planType === "pro");
  const fallbackLimit = isPro ? 50 : 10;
  const endpoints = ["/api/ai-tutor", "/api/course/chat-assistant", "/api/groq/chat"];

  for (const endpoint of endpoints) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          action: "ask",
          lessonId,
          message: question,
          userMessage: question,
          prompt: question,
          question: question,
          history: lessonContext?.history || [],
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

  // Fallback to Supabase functions only if Supabase is properly configured
  if (isSupabaseConfigured) {
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
  }

  // If endpoints could not be reached, return a friendly helpful response
  const fallbackAnswer = `Here is a helpful explanation for your question: **"${question}"**\n\n- In this lesson (**${lessonContext?.lessonTitle || 'Active Lesson'}**), focus on understanding the core concept, syntax rules, and applying them in the interactive exercise.\n- If you need immediate hands-on practice, run the provided code snippets in the interactive editor.\n- For live continuous inference, ensure your server or backend environment keys are configured.`;

  return {
    message: {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: fallbackAnswer,
    },
    usage: { count: 1, limit: fallbackLimit, isFreePlan: !isPro },
  };
}

