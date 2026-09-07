import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Compass, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Award,
  Terminal,
  Code2,
  Bell,
  Send,
  Zap,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AiBuilderModal from "@/components/AiBuilderModal";

export default function AiBuilder() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [requestedTopic, setRequestedTopic] = useState("");
  const [level, setLevel] = useState<"Beginner" | "Beginner to Advanced">("Beginner to Advanced");
  const [email, setEmail] = useState(user?.email || "");
  const [subscribed, setSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const goalParam = urlParams.get("goal");
    if (goalParam) {
      setRequestedTopic(goalParam);
    }
  }, []);

  const handleRequestCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Valid Email Needed",
        description: "Please enter your email to receive priority release access.",
        variant: "destructive",
      });
      return;
    }
    setSubscribed(true);
    toast({
      title: "Waitlist Confirmed! 🚀",
      description: "You're registered for the public release of the AI Course Architect Engine.",
    });
  };

  const trendingRequests = [
    "Modern JavaScript & DOM (ES6+)",
    "Data Structures & Algorithms (DSA)",
    "React 19 & Next.js Full-Stack",
    "SQL & PostgreSQL Database Mastery",
    "C++ Zero to Hero with Sandboxes"
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Top Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-teal-200/80 dark:border-teal-800/50 bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              Engine Lab · Private Beta Upgrade
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              AI Course Architect Engine
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We are elevating on-demand course generation. Our upcoming release introduces 
              <strong> comprehensive multi-module curricula</strong>, <strong>real-time browser code sandboxes</strong>, and 
              <strong> rigorous interactive assessments</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setLocation("/browse")}
                className="px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-teal-500/30 transition cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Live Masterclasses</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setLocation("/support?tab=request")}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>Request a Specific Course</span>
              </button>
            </div>
          </div>

          {/* Abstract Glow circles */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Comprehensive In-Depth Modules
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No superficial overviews. Every course spans foundational concepts to enterprise architecture with structured lessons, projects, and assessments.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full-Depth Guaranteed</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Zero-Config Live Sandboxes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                An integrated in-browser code execution runtime allowing students to write, run, and test code directly with instant compiler feedback.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>In-Browser Compilation</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Tamper-Proof Verification
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Earn officially verifiable certificates backed by a unique credential ID, public verification portal, and tamper-proof cryptographic signatures.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>LinkedIn & Resume Ready</span>
            </div>
          </div>
        </div>

        {/* Demand a Course Box */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              Student Demand Pipeline
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Request Any Topic or Technology
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              If your desired language, library, or framework isn't in our catalog yet, submit a request. Our curriculum engineering team prioritizes and launches high-demand masterclasses with live sandboxes.
            </p>
          </div>

          <form onSubmit={handleRequestCourse} className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={requestedTopic}
                onChange={(e) => setRequestedTopic(e.target.value)}
                placeholder="e.g. Modern JavaScript ES6+, Full-Stack MERN, or Rust"
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Beginner">Beginner Only</option>
                <option value="Beginner to Advanced">Beginner to Advanced (Full)</option>
              </select>

              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Request Course</span>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-semibold">Popular requests:</span>
              {trendingRequests.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setRequestedTopic(topic)}
                  className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 hover:text-teal-600 dark:hover:text-teal-400 text-slate-600 dark:text-slate-300 text-xs font-medium transition cursor-pointer"
                >
                  + {topic}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Priority Waitlist bar */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Want instant AI Course Generation when public?
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Join the priority beta invite list.
              </div>
            </div>
          </div>

          {subscribed ? (
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Priority Invitation Confirmed</span>
            </div>
          ) : (
            <form onSubmit={handleNotifyMe} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer shrink-0"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>
      </div>

      <AiBuilderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialTopic={requestedTopic} 
      />
    </DashboardLayout>
  );
}
