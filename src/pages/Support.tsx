import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { 
  Send, 
  HelpCircle, 
  AlertCircle, 
  CreditCard, 
  BookOpen, 
  User, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  LifeBuoy, 
  Sparkles, 
  Copy, 
  Check, 
  Bug, 
  Lightbulb, 
  MessageSquare, 
  Paperclip, 
  Clock, 
  ShieldCheck, 
  UploadCloud, 
  Image as ImageIcon, 
  X,
  RefreshCw
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase, isSupabaseConfigured, isValidUuid } from "@/lib/supabase";

interface Ticket {
  id: string;
  category: string;
  subject: string;
  message: string;
  priority: "low" | "normal" | "high" | "urgent";
  status: "In Progress" | "Resolved" | "Pending Review" | "Under Review" | "Auto-Resolved";
  createdAt: string;
  createdAtIso?: string;
  url?: string;
  screenshot?: string;
  aiResponse?: string;
  recommendedAction?: string;
  isSpam?: boolean;
  isGenuine?: boolean;
  urgency?: string;
  telegramSent?: boolean;
  adminReply?: string;
  adminReplyTime?: string;
  adminName?: string;
}

type IssueType = "bug" | "feature" | "course" | "course_request" | "billing" | "general";

export default function Support() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"submit" | "faq" | "tickets">("submit");
  const [issueType, setIssueType] = useState<IssueType>("course_request");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [priority, setPriority] = useState<"low" | "normal" | "high" | "urgent">("normal");
  
  // File upload state for screenshot
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File Type",
        description: "Please select a valid image file (PNG, JPG, WEBP).",
        variant: "destructive",
      });
      return;
    }
    setScreenshotFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncingTickets, setIsSyncingTickets] = useState(false);
  const [copied, setCopied] = useState(false);

  // Search state for FAQs
  const [faqQuery, setFaqQuery] = useState("");
  const [selectedFaqCategory, setSelectedFaqCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // URL query parameter synchronization
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    const topicParam = params.get("topic");
    const levelParam = params.get("level");

    if (tabParam === "request" || tabParam === "course_request") {
      setActiveTab("submit");
      setIssueType("course_request");
      if (topicParam) {
        setSubject(`Course Request: ${topicParam} (${levelParam || "Beginner to Advanced"})`);
        setMessage(`I would love to have a complete interactive Masterclass on "${topicParam}".\n\nTarget Depth: ${levelParam || "Beginner to Advanced"}\nSpecific topics or hands-on projects I want included: `);
      } else {
        setSubject("Course Request: ");
        setMessage("Topic / Language: \nTarget Level: Beginner to Advanced\nConcepts to cover: ");
      }
    } else if (tabParam === "faq") {
      setActiveTab("faq");
    } else if (tabParam === "tickets") {
      setActiveTab("tickets");
    }
  }, []);

  // List of user tickets (persisted locally and synced with backend)
  const [userTickets, setUserTickets] = useState<Ticket[]>(() => {
    try {
      const raw = localStorage.getItem("lernex_user_tickets");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });

  // Sync tickets with backend to fetch Telegram replies and live status updates
  const syncTicketsWithServer = useCallback(async (showIndicator = false) => {
    if (showIndicator) setIsSyncingTickets(true);
    try {
      const raw = localStorage.getItem("lernex_user_tickets");
      const currentList: Ticket[] = raw ? JSON.parse(raw) : userTickets;
      const ticketIds = currentList.map((t) => t.id);

      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/support/sync-tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({
          ticketIds,
          userEmail: user?.email || undefined,
          userId: user?.id || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.tickets)) {
          const serverMap = new Map<string, any>(data.tickets.map((t: any) => [t.id.toUpperCase(), t]));
          
          let hasChange = false;
          const merged = currentList.map((localTkt) => {
            const serverTkt = serverMap.get(localTkt.id.toUpperCase());
            if (serverTkt) {
              if (serverTkt.status !== localTkt.status || serverTkt.adminReply !== localTkt.adminReply) {
                hasChange = true;
              }
              return { ...localTkt, ...serverTkt };
            }
            return localTkt;
          });

          data.tickets.forEach((st: any) => {
            if (!merged.some((m) => m.id.toUpperCase() === st.id.toUpperCase())) {
              merged.unshift(st);
              hasChange = true;
            }
          });

          if (hasChange || currentList.length !== merged.length) {
            setUserTickets(merged);
            localStorage.setItem("lernex_user_tickets", JSON.stringify(merged));
          }
        }
      }
    } catch (err) {
      console.warn("Tickets sync error:", err);
    } finally {
      if (showIndicator) setIsSyncingTickets(false);
    }
  }, [user?.email, user?.id, userTickets]);

  useEffect(() => {
    syncTicketsWithServer();
    const interval = setInterval(() => {
      syncTicketsWithServer();
    }, 4500);
    return () => clearInterval(interval);
  }, [syncTicketsWithServer]);

  const categories = [
    { 
      id: "course_request", 
      label: "Request a Course", 
      icon: Sparkles, 
      desc: "Vote or request a specific language, library, or framework course" 
    },
    { 
      id: "bug", 
      label: "Report a Bug", 
      icon: Bug, 
      desc: "System errors, sandbox glitches, or broken links" 
    },
    { 
      id: "feature", 
      label: "Suggest a Feature", 
      icon: Lightbulb, 
      desc: "Ideas for new tools, UI improvements, or sandbox enhancements" 
    },
    { 
      id: "course", 
      label: "Course & AI Tutor", 
      icon: BookOpen, 
      desc: "Questions about lesson content, quizzes, or AI responses" 
    },
    { 
      id: "billing", 
      label: "Billing & Certificates", 
      icon: CreditCard, 
      desc: "Invoices, certificate downloads, or refund queries" 
    },
    { 
      id: "general", 
      label: "General Inquiry", 
      icon: HelpCircle, 
      desc: "Partnerships, accounts, or other general feedback" 
    },
  ];

  const faqItems = useMemo(() => [
    {
      id: 1,
      category: "Courses",
      question: "Can I request a custom programming course or framework?",
      answer: "Yes! Use the 'Request a Course' option above. We actively build comprehensive masterclass curriculums with live browser sandboxes for high-demand topics within 24-48 hours.",
    },
    {
      id: 2,
      category: "AI Builder",
      question: "When will on-demand AI course generation launch publicly?",
      answer: "The AI Course Architect is currently in Private Beta while we upgrade it to generate comprehensive multi-module depth and instant in-browser code execution. In the meantime, all masterclasses can be requested here.",
    },
    {
      id: 3,
      category: "Certificates",
      question: "How do I earn an official verified certificate for my course?",
      answer: "Complete all interactive coding modules and score 40% or higher on the timed final assessment. Once cleared, your certificate is instantly generated with a unique QR code and tamper-proof hash verifiable on /verify.",
    },
    {
      id: 4,
      category: "Sandboxes",
      question: "Do I need to install Python, Node.js, or Docker on my computer?",
      answer: "No! LernexAI runs 100% in the cloud. Every course provides an interactive in-browser sandbox with real terminals, preview windows, and instant execution without installing local runtimes.",
    },
    {
      id: 5,
      category: "AI Tutor",
      question: "How does the AI Tutor help me during exercises?",
      answer: "The AI Tutor appears alongside your code editor. It inspects your syntax in real-time, explains compiler errors, and guides you through tricky logic in English, Hindi, or Hinglish without giving away the full answer.",
    },
    {
      id: 6,
      category: "Billing",
      question: "What is your refund policy?",
      answer: "We offer an unconditional 7-day money-back guarantee on all Pro memberships. If you are not completely satisfied, submit a refund ticket or email hello@lernex.ai for an immediate reversal.",
    },
    {
      id: 7,
      category: "Account",
      question: "Can I access my learning roadmap on mobile?",
      answer: "Yes! LernexAI is fully responsive and optimized for mobile browsers. You can review flashcards, test code snippets, and chat with the AI Tutor on any smartphone.",
    },
  ], []);

  const filteredFaqs = useMemo(() => {
    return faqItems.filter((faq) => {
      const matchesCategory = selectedFaqCategory === "all" || faq.category.toLowerCase() === selectedFaqCategory.toLowerCase();
      const matchesQuery = faq.question.toLowerCase().includes(faqQuery.toLowerCase()) || faq.answer.toLowerCase().includes(faqQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [faqItems, faqQuery, selectedFaqCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Incomplete Form",
        description: "Please enter both a subject line and a detailed description.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const categoryObj = categories.find(c => c.id === issueType);
    const categoryName = categoryObj ? categoryObj.label : "General";
    const generatedId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      if (issueType === "course_request" && isSupabaseConfigured) {
        try {
          await supabase.from("course_requests").insert({
            user_id: user?.id && isValidUuid(user.id) ? user.id : null,
            course_topic: subject.trim(),
            details: message.trim(),
            votes: 1,
            status: "pending"
          });
        } catch (dbErr) {
          console.warn("Course request DB insert error:", dbErr);
        }
      }

      let createdTicket: Ticket = {
        id: generatedId,
        category: categoryName,
        subject: subject.trim(),
        message: message.trim(),
        priority,
        status: "Pending Review",
        createdAt: "Just now",
        url: urlLink.trim() || undefined,
        screenshot: screenshotPreview || undefined,
      };

      try {
        const { data: { session } } = await supabase.auth.getSession();
        const response = await fetch("/api/support/submit-ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
          },
          body: JSON.stringify({
            ticketId: generatedId,
            category: categoryName,
            subject: subject.trim(),
            message: message.trim(),
            priority,
            userEmail: user?.email || undefined,
            userName: user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Learner",
            userId: user?.id || undefined,
            screenshot: screenshotPreview || undefined,
            url: urlLink.trim() || undefined,
          }),
        });

        if (response.status === 401) {
          throw new Error("Please sign in before submitting a support ticket.");
        }

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.ticket) {
            createdTicket = data.ticket;
          }
        }
      } catch (apiErr) {
        console.warn("API support submit failed, using client fallback:", apiErr);
      }

      const updated = [createdTicket, ...userTickets];
      setUserTickets(updated);
      try {
        localStorage.setItem("lernex_user_tickets", JSON.stringify(updated));
      } catch {}

      setSubject("");
      setMessage("");
      setUrlLink("");
      handleRemoveFile();
      setIsSubmitting(false);

      if (createdTicket.status === "Auto-Resolved") {
        toast({
          title: "AI Instant Guidance Provided 💡",
          description: `Ticket ${createdTicket.id} was reviewed by our automated assistant. See response below.`,
        });
      } else if (issueType === "course_request") {
        toast({
          title: "Course Request Received! 🎓",
          description: `Your request (${createdTicket.id}) has been added to our live curriculum backlog and escalated to the academic team!`,
        });
      } else {
        toast({
          title: "Ticket Logged & Alert Dispatched 🚀",
          description: `Ticket ${createdTicket.id} marked as Under Review. Our support lead has received your alert!`,
        });
      }

      setActiveTab("tickets");
    } catch {
      setIsSubmitting(false);
    }
  };

  const copySupportEmail = () => {
    navigator.clipboard.writeText("hello@lernex.ai");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl">

        {/* TOP HEADER BANNER */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider">
                <LifeBuoy className="w-3.5 h-3.5" />
                <span>Help Center & Support Hub</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                How can we help you today?
              </h1>
              <p className="text-sm text-slate-500 max-w-2xl font-normal leading-relaxed">
                Report platform bugs, submit feature requests, or explore our interactive knowledge base.
              </p>
            </div>

            <button
              onClick={copySupportEmail}
              className="px-4 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 transition cursor-pointer shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copied ? "Copied Email!" : "hello@lernex.ai"}</span>
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: "submit", label: "Submit Report / Suggestion", icon: MessageSquare },
            { id: "faq", label: "Knowledge Base & FAQs", icon: HelpCircle, count: faqItems.length },
            { id: "tickets", label: "My Submitted Tickets", icon: Clock, count: userTickets.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: REPORT BUG / SUGGEST FEATURE FORM */}
        {activeTab === "submit" && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              
              {/* Category Selector Cards */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Feedback Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = issueType === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setIssueType(cat.id as any)}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-3 ${
                          isSelected
                            ? "border-teal-500 bg-teal-50/60 shadow-sm"
                            : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-xl ${
                            isSelected ? "bg-teal-700 text-white" : "bg-slate-200 text-slate-600"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-700" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{cat.label}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{cat.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subject Line */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Subject Title
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={
                    issueType === "course_request"
                      ? "e.g., Course Request: Full-Stack React 19 & Next.js 15 (Beginner to Advanced)"
                      : issueType === "bug" 
                      ? "e.g., Code compiler error in Lesson 2 terminal" 
                      : issueType === "feature"
                      ? "e.g., Suggestion: Add Python & FastAPI track"
                      : "Brief summary of your query or issue..."
                  }
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              {/* Priority & Optional URL */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-teal-500"
                  >
                    <option value="low">Low - Minor suggestion or question</option>
                    <option value="normal">Normal - Standard feedback or inquiry</option>
                    <option value="high">High - Blocking issue or error</option>
                    <option value="urgent">Urgent - Account/Payment emergency</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                    <span>Attach Screenshot / Image (Optional)</span>
                    <span className="text-[10px] text-slate-400 lowercase font-normal">PNG, JPG, WEBP up to 10MB</span>
                  </label>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />

                  {screenshotPreview ? (
                    <div className="relative rounded-2xl border border-teal-200 bg-teal-50/50 p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={screenshotPreview}
                          alt="Screenshot Preview"
                          className="w-12 h-12 rounded-xl object-cover border border-teal-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {screenshotFile?.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {screenshotFile ? (screenshotFile.size / 1024).toFixed(1) + " KB" : ""}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1.5 rounded-xl bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 transition border border-slate-200 shrink-0 cursor-pointer"
                        title="Remove Screenshot"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`rounded-2xl border-2 border-dashed p-3.5 text-center transition cursor-pointer flex items-center justify-center gap-3 ${
                        isDragging
                          ? "border-teal-500 bg-teal-50/70"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-600 shadow-sm shrink-0">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-800">
                          Drag & drop screenshot, or <span className="text-teal-600 underline">browse gallery</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Direct upload from device album or desktop
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Detailed Message & Feedback
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    issueType === "course_request"
                      ? "Tell us what key concepts, modules, or real-world projects you'd like this course to cover (e.g., Beginner to Advanced, practical sandboxes, state management)..."
                      : issueType === "bug"
                      ? "Please describe the issue, what steps caused it, and any browser console error you noticed..."
                      : issueType === "feature"
                      ? "Describe your feature suggestion, why it would be helpful, and how you envision it working..."
                      : "Type your detailed query or message here..."
                  }
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-500 font-medium leading-relaxed resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline-block">
                  🔒 Responses are logged to your account activity tab.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer disabled:opacity-50 ml-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting Ticket..." : "Submit Ticket / Feedback"}</span>
                </button>
              </div>

            </div>
          </form>
        )}

        {/* TAB 2: KNOWLEDGE BASE FAQS */}
        {activeTab === "faq" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={faqQuery}
                  onChange={(e) => setFaqQuery(e.target.value)}
                  placeholder="Search questions (e.g. certificates, sandboxes, AI tutor)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {["all", "certificates", "sandboxes", "ai tutor", "billing", "account"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFaqCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                      selectedFaqCategory === cat
                        ? "bg-teal-700 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion Questions */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-teal-700" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MY SUBMITTED TICKETS */}
        {activeTab === "tickets" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Your Activity History ({userTickets.length} Tickets)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Sync Active
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => syncTicketsWithServer(true)}
                  disabled={isSyncingTickets}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                  title="Check for new replies"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingTickets ? "animate-spin text-teal-600" : "text-slate-500"}`} />
                  <span>{isSyncingTickets ? "Syncing..." : "Refresh"}</span>
                </button>
                {userTickets.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to clear your local ticket history?")) {
                        setUserTickets([]);
                        localStorage.removeItem("lernex_user_tickets");
                        toast({ title: "History Cleared", description: "Your local support tickets have been cleared." });
                      }
                    }}
                    className="text-[11px] font-semibold text-slate-400 hover:text-red-600 transition cursor-pointer"
                  >
                    Clear History
                  </button>
                )}
              </div>
            </div>

            {userTickets.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No Support Tickets Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  You haven't submitted any inquiries or course requests yet. Any bug reports, feedback, or curriculum suggestions you submit will appear here.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("submit")}
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition cursor-pointer"
                >
                  Submit a Report or Request
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {userTickets.map((tkt) => {
                  const isResolved = tkt.status === "Resolved";
                  const isAutoResolved = tkt.status === "Auto-Resolved";
                  const isUnderReview = tkt.status === "Under Review";

                  return (
                    <div
                      key={tkt.id}
                      className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 transition hover:border-slate-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200 font-mono">
                            {tkt.id}
                          </span>
                          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                            {tkt.category}
                          </span>
                          {tkt.priority && (
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                              tkt.priority === "urgent" || tkt.priority === "high"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-slate-100 text-slate-500"
                            }`}>
                              {tkt.priority}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                            isResolved
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : isAutoResolved
                              ? "bg-teal-50 text-teal-700 border border-teal-200"
                              : isUnderReview
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            {isResolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            {tkt.status}
                          </span>
                          <span className="text-slate-400 text-[11px]">{tkt.createdAtIso ? new Date(tkt.createdAtIso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : tkt.createdAt}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{tkt.subject}</h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed whitespace-pre-line">{tkt.message}</p>
                        
                        {tkt.screenshot && (
                          <div className="mt-3">
                            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1.5">
                              Attached Screenshot
                            </span>
                            <img
                              src={tkt.screenshot}
                              alt="Attachment"
                              className="max-h-48 rounded-xl border border-slate-200 object-cover bg-slate-50 hover:opacity-90 transition cursor-pointer"
                              onClick={() => {
                                const w = window.open("");
                                if (w) {
                                  w.document.write(`<img src="${tkt.screenshot}" style="max-width:100%;height:auto;display:block;margin:auto;" />`);
                                }
                              }}
                            />
                          </div>
                        )}

                        {tkt.url && (
                          <div className="mt-2 text-[11px] text-teal-700 flex items-center gap-1 font-mono">
                            <Paperclip className="w-3.5 h-3.5" />
                            <span className="truncate max-w-sm">{tkt.url}</span>
                          </div>
                        )}
                      </div>

                      {/* Official Human Response from Support */}
                      {tkt.adminReply && (
                        <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs space-y-2.5 shadow-xs">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <div className="flex items-center gap-2 font-bold text-emerald-950">
                              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-emerald-900">
                                Official Response from Lernex AI Support Team
                              </span>
                            </div>
                            {tkt.adminReplyTime && (
                              <span className="text-[11px] text-emerald-700 font-medium">{tkt.adminReplyTime}</span>
                            )}
                          </div>
                          <div className="bg-white/90 rounded-xl p-3.5 border border-emerald-100/90 text-slate-800 leading-relaxed text-xs sm:text-[13px] font-medium whitespace-pre-line">
                            {tkt.adminReply}
                          </div>
                        </div>
                      )}

                      {/* AI Instant Guidance / Auto-Response */}
                      {tkt.aiResponse && (
                        <div>
                          <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100/80 text-xs text-slate-700 flex items-start gap-2.5">
                            <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <div className="space-y-1 w-full">
                              <div className="font-bold text-teal-900 flex items-center justify-between">
                                <span>Lernex AI Assistant Resolution & Guidance</span>
                                {tkt.telegramSent && (
                                  <span className="text-[10px] font-semibold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                                    Escalated to Support Desk
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-700 leading-relaxed text-[12px]">{tkt.aiResponse}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
