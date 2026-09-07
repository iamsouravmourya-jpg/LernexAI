import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Flame, 
  Search, 
  Sparkles, 
  Play,
  ChevronRight,
  Target
} from "lucide-react";
import { Link, useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";
import { fetchEnrolledCourses, fetchCourses, EnrolledCourse, Course } from "@/lib/course";
import AiBuilderModal from "@/components/AiBuilderModal";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const [promptInput, setPromptInput] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [liveCourses, setLiveCourses] = useState<Course[]>([]);
  const [isBuilderModalOpen, setIsBuilderModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const available = await fetchCourses();
        if (active) {
          setLiveCourses(available);
        }

        if (user?.id) {
          const enrolled = await fetchEnrolledCourses(user.id);
          if (active) {
            setEnrolledCourses(enrolled);
          }
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    }

    void loadData();
    return () => {
      active = false;
    };
  }, [user?.id]);

  const handleCreateCourse = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (promptInput.trim()) {
      setSelectedTopic(promptInput.trim());
    }
    setIsBuilderModalOpen(true);
  };

  const samplePrompts = [
    "Modern JavaScript ES6+",
    "Data Structures & Algorithms",
    "React 19 Frontend Mastery"
  ];

  // Current formatted date
  const todayDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const displayName = user?.name || "Demo Student";

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        
        {/* TOP WELCOME HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-teal-700 tracking-wide mb-1">
              {todayDate}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Welcome back, {displayName}.
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Keep your momentum going. You're closer than you think.
            </p>
          </div>

          <Link href="/browse">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:border-teal-500 hover:text-teal-700 transition cursor-pointer">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Find something to learn</span>
            </button>
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 1. HERO AI STUDIO PROMPT BANNER (TEAL GRADIENT WITH ABSTRACT CIRCLES) */}
        {/* ========================================================================= */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 p-8 sm:p-10 lg:p-12 text-white shadow-lg">
          {/* Abstract background curved circles */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 overflow-hidden">
            <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full border-8 border-white/30" />
            <div className="absolute right-12 top-8 w-80 h-80 rounded-full border-8 border-white/20" />
            <div className="absolute -right-8 bottom-0 w-64 h-64 rounded-full border-8 border-white/25" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-teal-100 uppercase tracking-wider">
              <Search className="w-3.5 h-3.5" />
              <span>INSTANT CATALOG SEARCH</span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                What do you want to master next?
              </h2>
              <p className="text-sm sm:text-base text-teal-100 font-normal leading-relaxed max-w-2xl">
                Search across all 6 live industry masterclasses, interactive coding sandboxes, and module quizzes!
              </p>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleCreateCourse} className="pt-2">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-white rounded-2xl shadow-xl">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="e.g., Master Full-Stack React 19, Python for AI, or Data Structures"
                  className="w-full px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition cursor-pointer shadow-md"
                >
                  <Search className="w-4 h-4 text-teal-400" />
                  <span>Search Courses</span>
                </button>
              </div>
            </form>

            {/* Try Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-teal-100">
              <span className="font-semibold text-teal-200">Try:</span>
              {samplePrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPromptInput(p);
                    setSelectedTopic(p);
                    setIsBuilderModalOpen(true);
                  }}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. STATS ROW (CURRENT STREAK, IN PROGRESS, LEARNED THIS MONTH) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {/* Card 1: Streak */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 fill-teal-500 text-teal-500" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">12 days</div>
              <div className="text-xs font-semibold text-slate-500">Current streak</div>
            </div>
          </div>

          {/* Card 2: In Progress */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">
                {enrolledCourses.length}
              </div>
              <div className="text-xs font-semibold text-slate-500">Courses in progress</div>
            </div>
          </div>

          {/* Card 3: Time Spent */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">8.5h</div>
              <div className="text-xs font-semibold text-slate-500">Learned this month</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIVE DATABASE MASTERCLASSES SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-900">
                Live Masterclasses
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Connected directly to Supabase database
              </p>
            </div>
            <Link href="/browse" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition">
              <span>View catalog</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveCourses.map((c) => (
              <div 
                key={c.id} 
                className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col justify-between gap-4 hover:border-teal-300 transition-all group"
              >
                <div className="flex items-start gap-4">
                  {c.thumbnail_url ? (
                    <img 
                      src={c.thumbnail_url} 
                      alt={c.title} 
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Target className="w-7 h-7" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                        {c.total_modules === 1 ? "⚡ RAPID SPRINT" : (c.category || "TECHNOLOGY")}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {c.difficulty || "Beginner"}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1.5 line-clamp-1 group-hover:text-teal-700 transition">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {c.description}
                    </p>
                    <div className="text-[11px] text-slate-400 mt-2 font-medium">
                      {c.total_modules || 10} Modules • {c.estimated_hours || 24} Hours
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600">
                    Free Masterclass
                  </span>
                  <Link href={`/learning/${c.id}`}>
                    <button className="px-4 py-2 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm">
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Learning</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CONTINUE LEARNING SECTION (IF ENROLLED) */}
        {/* ========================================================================= */}
        {enrolledCourses.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                In Progress
              </h2>
              <Link href="/my-learning" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition">
                <span>My Courses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {enrolledCourses.slice(0, 3).map((c) => (
                <div 
                  key={c.id} 
                  className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-teal-300 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-teal-700">
                        {c.category || "TECHNOLOGY"}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {c.title}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {Math.round(c.enrollment_progress || 0)}% completed
                      </div>
                    </div>
                  </div>

                  <Link href={`/learning/${c.id}`}>
                    <button className="px-5 py-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm">
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <AiBuilderModal
        isOpen={isBuilderModalOpen}
        onClose={() => setIsBuilderModalOpen(false)}
        initialTopic={selectedTopic}
      />
    </DashboardLayout>
  );
}

