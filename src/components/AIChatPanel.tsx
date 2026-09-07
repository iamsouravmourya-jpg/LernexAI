import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { 
  Bot, 
  Check, 
  Clipboard, 
  LoaderCircle, 
  LockKeyhole, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Code2, 
  Copy,
  Lightbulb,
  HelpCircle,
  Zap,
  Plus
} from "lucide-react";
import { askAITutor, fetchAIChatHistory, type AIChatMessage, type AITutorUsage } from "@/lib/aiTutor";
import type { Lesson } from "@/lib/course";
import { useAuth } from "@/context/AuthContext";
import { getDailyChatStatus, incrementChatUsage, subscribeToCredits } from "@/lib/credits";
import BuyCreditsModal from "@/components/BuyCreditsModal";

interface AIChatPanelProps {
  lesson: Lesson;
  courseTitle?: string;
  moduleTitle?: string;
  planType?: string;
}

function welcomeMessage(lesson: Lesson): AIChatMessage {
  return {
    id: `welcome-${lesson.id}`,
    role: "assistant",
    content: `Hi! I’m your AI Tutor for **“${lesson.title}”**.\n\nYou can ask me questions in **English**, **Hindi**, or **Hinglish**. How can I help you master this unit?`,
  };
}

function isEmptyResponse(value: string) {
  return value.trim().length === 0;
}

// Clean helper to render message content with bold, bullet lists, and code blocks
function FormattedMessage({ content }: { content: string }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = async (codeText: string, index: number) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // fallback
    }
  };

  // Split content by code blocks ```lang ... ```
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const parts: Array<{ type: "text" | "code"; content: string; lang?: string }> = [];
  
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: content.slice(lastIndex, match.index) });
    }
    parts.push({
      type: "code",
      lang: match[1] || "code",
      content: match[2].trim()
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", content: content.slice(lastIndex) });
  }

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
      {parts.map((part, idx) => {
        if (part.type === "code") {
          return (
            <div key={idx} className="my-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-100 overflow-hidden font-mono text-xs">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-bold">
                <span className="flex items-center gap-1 text-teal-400">
                  <Code2 className="w-3 h-3" />
                  <span className="uppercase">{part.lang}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(part.content, idx)}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 overflow-x-auto text-teal-100 whitespace-pre-wrap leading-normal font-mono">
                {part.content}
              </pre>
            </div>
          );
        }

        // Render plain formatted markdown text (bold **text**, bullets)
        const lines = part.content.split("\n");

        return (
          <div key={idx} className="space-y-1">
            {lines.map((line, lineIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={lineIdx} className="h-1" />;

              // Bullet points
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const bulletText = trimmed.slice(2);
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-1">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{parseInlineFormatting(bulletText)}</span>
                  </div>
                );
              }

              // Headings ## or ###
              if (trimmed.startsWith("#")) {
                const headingText = trimmed.replace(/^#+\s*/, "");
                return (
                  <h4 key={lineIdx} className="font-extrabold text-slate-900 pt-1 pb-0.5 text-xs sm:text-sm">
                    {parseInlineFormatting(headingText)}
                  </h4>
                );
              }

              return <p key={lineIdx}>{parseInlineFormatting(line)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

// Inline helper for **bold** and `code`
function parseInlineFormatting(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-extrabold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-teal-800 font-mono text-[11px] font-bold">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function AIChatPanel({ lesson, courseTitle, moduleTitle, planType = "free" }: AIChatPanelProps) {
  const { user } = useAuth();
  const isPro = user?.plan_type === "pro" || planType.toLowerCase() === "pro";
  
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<AIChatMessage[]>([welcomeMessage(lesson)]);
  const [chatStatus, setChatStatus] = useState(() => getDailyChatStatus(user?.id, isPro));
  const [showBuyCreditsModal, setShowBuyCreditsModal] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Sync and subscribe to credit updates
  useEffect(() => {
    setChatStatus(getDailyChatStatus(user?.id, isPro));
    const unsubscribe = subscribeToCredits(() => {
      setChatStatus(getDailyChatStatus(user?.id, isPro));
    });
    return unsubscribe;
  }, [user?.id, isPro]);

  const hasReachedLimit = chatStatus.isExhausted;

  const suggestions = useMemo(
    () => [
      "💡 Explain in simple Hinglish",
      "⚡ Key takeaways",
      "🐛 Debug my code",
      "❓ Ask 2 quick quiz questions",
    ],
    [],
  );

  useEffect(() => {
    let active = true;

    async function loadHistory() {
      setLoadingHistory(true);
      setError(null);

      try {
        const result = await fetchAIChatHistory(lesson.id, isPro);
        if (!active) return;
        setMessages(result.messages.length > 0 ? result.messages : [welcomeMessage(lesson)]);
      } catch (historyError) {
        if (!active) return;
        setError(historyError instanceof Error ? historyError.message : "Could not load AI tutor history.");
      } finally {
        if (active) setLoadingHistory(false);
      }
    }

    void loadHistory();
    return () => {
      active = false;
    };
  }, [lesson.id, isPro]);

  useEffect(() => {
    // Scroll only the internal chat box container, NEVER scroll window or outer page body
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const handleSpeech = (text: string, id: string) => {
    if (!("speechSynthesis" in window)) {
      setError("Audio speech synthesis is not supported in this browser.");
      return;
    }

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Clean text before reading out loud (remove code backticks and markdown symbols)
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "Code block provided in response.")
      .replace(/[*#`]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  async function copyMessage(content: string, id: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(id);
      window.setTimeout(() => setCopiedMessageId((current) => (current === id ? null : current)), 1500);
    } catch {
      setError("Could not copy the message.");
    }
  }

  async function sendMessage(question: string) {
    const trimmed = question.trim();
    if (isEmptyResponse(trimmed) || loadingHistory || sending) return;

    // If chat limit exhausted, trigger the full-page Buy Credits modal immediately
    if (chatStatus.isExhausted) {
      setShowBuyCreditsModal(true);
      return;
    }

    const optimisticId = crypto.randomUUID();
    setMessages((current) => [...current, { id: optimisticId, role: "user", content: trimmed }]);
    setInput("");
    setError(null);
    setSending(true);

    try {
      const result = await askAITutor(lesson.id, trimmed, {
        courseTitle,
        moduleTitle,
        lessonTitle: lesson.title,
        lessonContent: lesson.content,
        isPro,
        planType: isPro ? "pro" : "free",
      });
      setMessages((current) => [...current, result.message]);
      
      // Increment daily usage counter locally and reactively
      const updatedStatus = incrementChatUsage(user?.id, isPro);
      setChatStatus(updatedStatus);

      // If user hit the exact limit on this message, open the modal to prompt credits
      if (updatedStatus.isExhausted) {
        setShowBuyCreditsModal(true);
      }
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "The AI tutor could not answer right now.");
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      <aside className="flex min-h-[32rem] w-full flex-col overflow-hidden border-l border-slate-200 bg-white shadow-sm lg:h-full lg:w-[380px] lg:shrink-0">
        <header className="border-b border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-sm">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">AI Tutor Mentor</h2>
                <p className="text-xs text-slate-500">Ask doubts, debug code, or request examples</p>
              </div>
            </div>

            <div className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-800 border border-teal-200" title={lesson.title}>
              <span className="inline-flex max-w-36 items-center gap-1 truncate align-middle">
                <Sparkles className="h-3 w-3 shrink-0 text-teal-600" aria-hidden="true" />
                <span className="truncate">{lesson.title}</span>
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-600 bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700">
                {isPro ? "Pro Daily Chats:" : "Free Daily Chats:"}
              </span>
              <span className={`font-black px-1.5 py-0.5 rounded-md text-[11px] ${
                chatStatus.isExhausted 
                  ? "bg-rose-100 text-rose-800" 
                  : "bg-teal-100 text-teal-900"
              }`}>
                {chatStatus.usedToday}/{chatStatus.dailyLimit}
              </span>
              {chatStatus.extraCredits > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]" title="Extra purchased credits balance">
                  +{chatStatus.extraCredits} Credits
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowBuyCreditsModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-extrabold shadow-xs transition cursor-pointer"
            >
              <Zap className="w-3 h-3 text-amber-300" />
              <span>Buy Credits</span>
            </button>
          </div>
        </header>

        <div ref={messagesContainerRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50/70 p-4" aria-live="polite">
          {loadingHistory ? (
            <div className="flex h-full min-h-[14rem] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm text-slate-500">
              <LoaderCircle className="h-4 w-4 animate-spin text-teal-600" aria-hidden="true" /> Loading chat…
            </div>
          ) : (
            <>
              {messages.map((message) => {
                const isUser = message.role === "user";
                const copied = copiedMessageId === message.id;
                const isSpeaking = speakingMessageId === message.id;

                return (
                  <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isUser
                          ? "rounded-br-md bg-teal-700 text-white font-medium"
                          : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                      }`}
                    >
                      <div className="mb-1.5 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-wider opacity-80 border-b border-slate-100 pb-1">
                        <span className="flex items-center gap-1">
                          {!isUser && <Sparkles className="w-3 h-3 text-teal-600" />}
                          <span>{isUser ? "You" : "AI Tutor"}</span>
                        </span>

                        {!isUser && (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleSpeech(message.content, message.id)}
                              className={`p-1 rounded-md transition cursor-pointer ${
                                isSpeaking ? "bg-teal-100 text-teal-800 animate-pulse" : "hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                              }`}
                              title={isSpeaking ? "Stop Voice" : "Listen Voice Explanation"}
                            >
                              {isSpeaking ? <VolumeX className="h-3.5 w-3.5 text-teal-700" /> : <Volume2 className="h-3.5 w-3.5" />}
                            </button>

                            <button
                              type="button"
                              onClick={() => void copyMessage(message.content, message.id)}
                              className="p-1 rounded-md transition hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                              aria-label="Copy message"
                              title="Copy text"
                            >
                              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Clipboard className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                        )}
                      </div>

                      <FormattedMessage content={message.content} />
                    </div>
                  </div>
                );
              })}

              {sending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500 shadow-xs">
                    <LoaderCircle className="h-4 w-4 animate-spin text-teal-600" aria-hidden="true" /> 
                    <span>AI Tutor is analyzing lesson & generating answer…</span>
                  </div>
                </div>
              )}

              <div ref={messageEndRef} />
            </>
          )}
        </div>

        <div className="border-t border-slate-200 bg-white p-3 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void sendMessage(suggestion)}
                disabled={loadingHistory || sending || hasReachedLimit}
                className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-800 transition hover:bg-teal-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
              {error}
            </p>
          )}

          {hasReachedLimit ? (
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 p-3.5 text-xs text-amber-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <LockKeyhole className="h-4 w-4 text-amber-600 shrink-0" aria-hidden="true" />
                  <span>Daily Chat Limit Reached ({chatStatus.dailyLimit}/{chatStatus.dailyLimit})</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-black text-[10px]">
                  0 Remaining
                </span>
              </div>
              
              <p className="text-[11px] text-slate-600 leading-relaxed">
                You’ve used all your {chatStatus.dailyLimit} daily AI mentor chats. Buy instant top-up credits (20, 50, 100, 200) to keep asking questions right away!
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowBuyCreditsModal(true)}
                  className="flex-1 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Buy Credits Now →</span>
                </button>
                
                <a
                  href="/upgrade"
                  className="px-3 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs transition text-center"
                >
                  View Plans
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 pt-1">
              <label htmlFor={`ai-question-${lesson.id}`} className="sr-only">
                Ask about this lesson
              </label>
              <input
                id={`ai-question-${lesson.id}`}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={2000}
                disabled={loadingHistory || sending}
                placeholder="Ask in English, Hindi, or Hinglish…"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loadingHistory || sending}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-700 hover:bg-teal-800 text-white transition disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                aria-label="Send message"
              >
                {sending ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              </button>
            </form>
          )}
        </div>
      </aside>

      {/* Full-Page Buy Credits & Limit Popup with Close/Cut Option */}
      <BuyCreditsModal
        isOpen={showBuyCreditsModal}
        onClose={() => setShowBuyCreditsModal(false)}
        limitExhausted={chatStatus.isExhausted}
      />
    </>
  );
}
