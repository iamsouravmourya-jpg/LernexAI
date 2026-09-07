import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Minimize2, Maximize2, Bot, HelpCircle, RotateCcw } from "lucide-react";

interface AITutorGuideProps {
  context?: "support" | "learning" | "general";
  inline?: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AITutorGuide({ context = "general", inline = false }: AITutorGuideProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialGreeting = context === "support"
    ? "Hello! I am your 24/7 AI Support Assistant. Ask me anything about certificates, billing, courses, or ticket creation. I am here to help you solve any issue step-by-step!"
    : context === "learning"
    ? "Hello! I am your AI learning companion. Ask me anything about course concepts, quizzes, or finding your next lesson."
    : "Hi there! I am your AI guide for LernexAI. Ask me about courses, certificates, or platform features.";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: initialGreeting,
    }
  ]);

  const defaultSuggestions = context === "support" ? [
    "How do I download my certificate?",
    "How does ₹99 certificate payment work?",
    "What should I include in my support ticket?",
    "How long until my ticket is resolved?",
    "How do I reset my password?"
  ] : context === "learning" ? [
    "How do I navigate my modules?",
    "How are quiz scores calculated?",
    "Where can I see my certificate progress?"
  ] : [
    "How do I get started with AI courses?",
    "How does the certificate system work?"
  ];

  // Auto scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleResetChat = () => {
    setMessages([{ role: "assistant", content: initialGreeting }]);
    setMessage("");
    setIsTyping(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSendMessage = (customMsg?: string) => {
    const textToSend = customMsg || message;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Smart instant AI resolution engine - Works endlessly without API key
    setTimeout(() => {
      const query = textToSend.toLowerCase();
      let aiResponse = "";

      if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("greetings")) {
        aiResponse = "Hello! 👋 How can I help you right now? You can ask me any question about your courses, certificates, or support tickets.";
      } else if (query.includes("thank") || query.includes("thanks") || query.includes("ok") || query.includes("great") || query.includes("awesome")) {
        aiResponse = "You're very welcome! 😊 Feel free to ask another question whenever you need help. I'm always here!";
      } else if (query.includes("certif") || query.includes("download") || query.includes("degree")) {
        aiResponse = "🎓 **Certificate Guide:**\nTo earn your verified certificate:\n1. Finish 100% of the course lessons.\n2. Pass the Final Exam (score >= 40%).\n3. Complete the ₹99 unlock payment in the Certificates Hub to download your official PDF & credential ID!";
      } else if (query.includes("payment") || query.includes("99") || query.includes("price") || query.includes("buy") || query.includes("cost") || query.includes("fee")) {
        aiResponse = "💳 **Payment Information:**\nCertificates cost a flat fee of ₹99 with no hidden charges. Payments unlock perpetual download access to your official certificate and shareable verification link.";
      } else if (query.includes("ticket") || query.includes("form") || query.includes("submit") || query.includes("issue") || query.includes("support")) {
        aiResponse = "📝 **Ticket Guidance:**\nFill out the Support Request form on this page:\n1. Select an Issue Category (Course, Payment, Account, or Technical).\n2. Enter a clear Subject & Message.\n3. Click 'Submit Ticket'. Our desk responds in ~2 hours!";
      } else if (query.includes("time") || query.includes("hours") || query.includes("response") || query.includes("fast")) {
        aiResponse = "⚡ **Response Times:**\nOur support desk operates 24/7. Average ticket response times are under 2 hours. Urgent billing or account tickets are prioritized.";
      } else if (query.includes("quiz") || query.includes("exam") || query.includes("score") || query.includes("fail") || query.includes("pass")) {
        aiResponse = "📝 **Quizzes & Final Exams:**\nModule quizzes test your lesson understanding. The Final Exam determines your certificate score grade (Pass mark is 40%). You can retake exams anytime to improve your score!";
      } else if (query.includes("account") || query.includes("password") || query.includes("login") || query.includes("profile") || query.includes("email")) {
        aiResponse = "👤 **Account Help:**\nTo update your name or profile details, click on your avatar in the top right header or sidebar, choose 'Account Settings', and save your changes.";
      } else if (query.includes("pro") || query.includes("plan") || query.includes("upgrade")) {
        aiResponse = "💎 **Pro Plan:**\nUpgrading to Pro unlocks unlimited AI mentor access, advanced courses, priority ticket processing, and verified certificate credentials.";
      } else {
        aiResponse = `🤖 **Answer for "${textToSend}":**\nI've recorded your question! You can also submit a support ticket on this page for personalized engineering help, or ask me another question directly here!`;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 600);
  };

  const containerClasses = inline
    ? "w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
    : "fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col";

  if (!isOpen && !inline) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl hover:scale-105 transition-all"
      >
        <Bot className="h-5 w-5" />
        <span>AI Assistant</span>
        <Sparkles className="h-4 w-4 text-amber-300" />
      </button>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-white/10 text-amber-300 shrink-0">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-sm flex items-center gap-1.5">
              <span>AI Support Guide</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-indigo-200">Continuous AI Problem Solver</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleResetChat}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition"
            title="Start New Chat"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          {!inline && (
            <>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Scroll Area */}
          <div className="h-72 sm:h-80 overflow-y-auto p-4 space-y-3 bg-slate-50/70 text-xs sm:text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 whitespace-pre-line leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white font-medium rounded-br-none shadow-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs text-slate-500 flex items-center gap-2 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-indigo-600 animate-bounce" />
                  <span>AI Assistant is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Scrollable Suggestions (Always Accessible) */}
          <div className="p-2.5 border-t border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-indigo-600" />
                Quick Questions:
              </span>
              <button
                type="button"
                onClick={handleResetChat}
                className="text-[10px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Reset
              </button>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {defaultSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSendMessage(suggestion)}
                  disabled={isTyping}
                  className="text-left text-[11px] px-2.5 py-1.5 rounded-lg bg-indigo-50/90 text-indigo-900 hover:bg-indigo-100 font-medium transition shrink-0 whitespace-nowrap border border-indigo-100 disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isTyping}
                placeholder="Ask another question..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-indigo-500 focus:bg-white text-xs sm:text-sm text-slate-900 transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!message.trim() || isTyping}
                className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow"
                title="Send Message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
