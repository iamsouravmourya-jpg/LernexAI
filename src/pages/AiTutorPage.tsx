import { useState } from "react";
import { Link } from "wouter";
import { 
  Bot, 
  Sparkles, 
  Send, 
  ArrowLeft, 
  MessageSquare, 
  Cpu, 
  CheckCircle2, 
  Flame, 
  Zap,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText, 
  MagneticButton 
} from "@/components/anim";
import { askAITutor } from "@/lib/aiTutor";

export default function AiTutorPage() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "Namaste! I am your 24/7 Lernex Socratic AI Mentor. Instead of spoonfeeding full answers, I'll guide you step-by-step through any tricky concept or syntax bug in English or Hinglish. What are we building today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const samplePrompts = [
    "Explain recursion simply in Hinglish with real-world analogies",
    "Why does JavaScript treat 0.1 + 0.2 as 0.30000000000000004?",
    "How does a hash map guarantee O(1) average lookup time?",
    "What is the difference between SQL JOIN and UNION?",
  ];

  const handleSend = async (textToSend?: string) => {
    const question = textToSend || input;
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: question }]);
    if (!textToSend) setInput("");
    setIsThinking(true);

    try {
      const res = await askAITutor("socratic-mentor-page", question, {
        isPro: true,
        planType: "pro",
        lessonTitle: "24/7 Socratic Mentor",
        moduleTitle: "Computer Science & AI Mentorship",
      });

      const responseText = res?.message?.content;
      if (responseText) {
        setMessages((prev) => [...prev, { sender: "ai", text: responseText }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: `Great question on ${question}! The fundamental mental model to keep in mind is separating state from side-effects. In Lernex sandboxes, you can test this right now in live memory. Would you like me to walk you through an interactive 3-step coding drill for this?`,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Great question on ${question}! Focus on identifying your base conditions and expected outputs. Try running a minimal test case in the sandbox!`,
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-700 font-sans relative overflow-hidden">
      <PageEffects />
      <ScrollProgress />
      <Navbar />

      <main className="relative pt-28 pb-20">
        <MeshGradientBackground />

        {/* Top Header & Breadcrumb */}
        <section className="relative mx-auto max-w-7xl px-6 py-12">
          <Reveal variant="up">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/">
                <button className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-500/60 hover:text-cyan-600">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </button>
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 px-3.5 py-1 text-xs font-semibold text-cyan-700">
                <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
                <span>24/7 Socratic Learning Mentor</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Banner Card */}
          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-xl text-white">
                  <Bot className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Powered by Google Gemini Pro
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Personalized <GradientText text="AI Mentor" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Never get blocked on an error again. Our AI Tutor explains syntax traps, guides you through tricky bugs in Hinglish, and strengthens your engineering fundamentals.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Live Interactive Chat Sandbox */}
        <section className="mx-auto max-w-4xl px-6">
          <Reveal variant="up" delay={150}>
            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden flex flex-col h-[520px]">
              {/* Header */}
              <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold text-slate-900">Lernex Socratic AI Agent</span>
                  <span className="rounded-md border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] font-bold text-cyan-700">
                    Bilingual Hinglish / English
                  </span>
                </div>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-lg rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        m.sender === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold shadow-sm"
                          : "border border-slate-200 bg-white text-slate-800 shadow-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-2.5 text-xs text-cyan-700 animate-pulse">
                      Analyzing concept heuristics...
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Quick Questions */}
              <div className="px-6 py-2.5 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto no-scrollbar">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p)}
                    className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600 hover:border-cyan-500 hover:text-cyan-700 hover:bg-cyan-50/50 whitespace-nowrap transition cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-4 border-t border-slate-200 bg-white flex items-center gap-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask any programming doubt or paste an error message..."
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-500 focus:bg-white transition"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 p-3 text-slate-950 hover:scale-105 active:scale-95 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
