import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { fetchCompletedLessonIds, fetchCourseById, enrollInCourse, fetchUserEnrollments } from "@/lib/course";
import { Course } from "@/lib/course";
import ModuleList from "@/components/ModuleList";
import DashboardLayout from "@/components/DashboardLayout";
import { GradientText } from "@/components/anim";
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Compass, 
  FileText, 
  Flame, 
  GraduationCap, 
  HelpCircle, 
  Layers, 
  Lock, 
  Play, 
  PlayCircle, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Trophy, 
  Zap,
  Terminal,
  Bot
} from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"modules" | "outcomes" | "certificate" | "instructor">("modules");

  useEffect(() => {
    if (id) {
      loadCourse(id);
      checkEnrollment(id);
    }
  }, [id, user?.id]);

  const loadCourse = async (courseId: string) => {
    setLoading(true);
    const data = await fetchCourseById(courseId);
    setCourse(data);

    if (user?.id && data) {
      const courseLessonIds = data.modules?.flatMap(module =>
        module.lessons?.map(lesson => lesson.id) || []
      ) || [];
      const persistedCompletedLessons = await fetchCompletedLessonIds(user.id, courseLessonIds);
      setCompletedLessons(persistedCompletedLessons);
      setProgress(
        courseLessonIds.length === 0
          ? 0
          : Math.round((persistedCompletedLessons.size / courseLessonIds.length) * 100)
      );
    } else {
      setCompletedLessons(new Set());
      setProgress(0);
    }

    setLoading(false);
  };

  const checkEnrollment = async (courseId: string) => {
    if (!user?.id) return;
    const enrollments = await fetchUserEnrollments(user.id);
    const isEnrolled = enrollments.some(e => e.course_id === courseId);
    setEnrolled(isEnrolled);
  };

  const handleEnroll = async () => {
    if (!user?.id || !id || enrolling) return;
    if (course?.is_premium && user.plan_type !== "pro") {
      setLocation("/upgrade");
      return;
    }

    setEnrolling(true);
    setEnrollmentError(null);
    try {
      await enrollInCourse(user.id, id);
      setEnrolled(true);
      setLocation(`/learning/${id}`);
    } catch (error) {
      setEnrollmentError(error instanceof Error ? error.message : "Enrollment failed. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  const handleStartLearning = () => {
    if (id) {
      setLocation(`/learning/${id}`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Loading Track..." subtitle="Preparing live sandbox curriculum">
        <div className="max-w-7xl mx-auto py-16 text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-cyan-400 border-t-transparent mx-auto" />
          <p className="text-slate-400 font-medium text-xs">Initializing course architecture...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout title="Track Not Found" subtitle="The requested curriculum could not be located">
        <div className="max-w-xl mx-auto my-12 p-8 bg-ink-900/80 rounded-3xl border border-white/10 text-center space-y-4 shadow-xl backdrop-blur-xl">
          <div className="text-5xl">💻</div>
          <h2 className="text-2xl font-black text-white">Track Not Found</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            This course might have been archived or is temporarily undergoing curriculum upgrade.
          </p>
          <Link href="/browse">
            <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-ink-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition cursor-pointer">
              Explore Available Tracks →
            </button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const totalLessons = course.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const totalHours = course.estimated_hours || Math.ceil(totalLessons * 0.5) || 4;
  const isPremiumLocked = course.is_premium && user?.plan_type !== "pro";

  return (
    <DashboardLayout 
      title={course.title}
      subtitle={`${course.category} • ${course.difficulty} Level Track`}
    >
      <div className="max-w-7xl mx-auto space-y-8">

        {/* BREADCRUMB HEADER */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link href="/browse" className="hover:text-cyan-600 transition flex items-center gap-1 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> Catalog
          </Link>
          <span>/</span>
          <span className="text-cyan-600">{course.category}</span>
          <span>/</span>
          <span className="text-slate-900 truncate max-w-xs">{course.title}</span>
        </div>

        {/* TOP HERO BANNER CARD (LIGHT THEME) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-10 text-slate-900 shadow-xl border border-slate-200"
        >
          {/* Top highlight bar */}
          <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-black border border-cyan-200 uppercase tracking-wider">
                  {course.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                  course.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  course.difficulty === 'Intermediate' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' :
                  'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {course.difficulty} Level
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  course.is_premium ? "bg-amber-50 text-amber-800 border border-amber-300" : "bg-emerald-50 text-emerald-800 border border-emerald-300"
                }`}>
                  {course.is_premium ? "Pro Pass" : "Free Track"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {course.description}
              </p>

              {/* STATS STRIP */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-1.5 text-teal-700 font-bold bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
                  <Terminal className="w-4 h-4 text-teal-600" />
                  <span>100% Practical AI Sandbox</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-600" />
                  <span>{course.modules?.length || 0} Modules</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  <span>{totalLessons} Hands-on Units</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>~{totalHours} Hours</span>
                </div>
              </div>
            </div>

            {/* Right Action Box Card */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 text-slate-900 space-y-5 shadow-md">
              {enrolled ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-cyan-700">Active Progression</span>
                      <span className="text-emerald-600 font-black">{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={handleStartLearning}
                    className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-teal-600/20 hover:scale-[1.02] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white text-white" />
                    <span>{progress > 0 ? "Continue Live Sandbox" : "Launch First Unit"}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-black text-slate-900">
                      {isPremiumLocked ? "Pro Pass Required" : "100% Free Track"}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {isPremiumLocked ? "Upgrade to Pro to unlock unlimited sandbox units and final verified exam." : "Enroll in 1-click to start hands-on interactive code practice."}
                    </p>
                  </div>

                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-teal-600/20 hover:scale-[1.02] transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isPremiumLocked ? "Upgrade to Pro →" : enrolling ? "Enrolling..." : "Enroll in Track Free"}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  {enrollmentError && (
                    <p className="text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200">
                      {enrollmentError}
                    </p>
                  )}
                </div>
              )}

              {/* PERKS LIST */}
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive browser sandbox (zero installs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Real-time AI Mentor with instant hints</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Official QR shareable certificate</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* TABS NAVIGATION BAR */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "modules", label: "Course Content & Sandbox Units", icon: Layers, count: course.modules?.length },
            { id: "outcomes", label: "What You Will Master", icon: CheckCircle2 },
            { id: "certificate", label: "Verified Credentials", icon: Trophy },
            { id: "instructor", label: "AI Engine Architecture", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 rounded-2xl font-black text-xs transition flex items-center gap-2 shrink-0 border-b-2 -mb-[1px] cursor-pointer ${
                  isActive
                    ? "border-cyan-500 text-cyan-700 bg-cyan-50"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-cyan-700 text-[10px] font-black">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: COURSE CONTENT & MODULES */}
        {activeTab === "modules" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-600" />
                  Course Content & Sandbox Units
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Expand any module to launch hands-on coding sandboxes directly in your browser.
                </p>
              </div>

              {enrolled && (
                <button
                  onClick={handleStartLearning}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Resume Workspace</span>
                </button>
              )}
            </div>

            {course.modules && course.modules.length > 0 ? (
              <ModuleList
                modules={course.modules}
                completedLessons={completedLessons}
                courseId={course.id}
                isEnrolled={enrolled}
                onLessonSelect={(lessonId) => setLocation(`/learning/${course.id}`)}
              />
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-sm">
                <div className="text-4xl">📝</div>
                <h3 className="font-extrabold text-slate-900 text-base">Curriculum Initializing</h3>
                <p className="text-xs text-slate-500">Sandbox curriculum material is currently synchronizing for this track.</p>
              </div>
            )}
          </section>
        )}

        {/* TAB 2: WHAT YOU WILL LEARN */}
        {activeTab === "outcomes" && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-black text-slate-900">Key Learning Outcomes</h2>
              <p className="text-xs text-slate-500 mt-1">Skills and competencies you will master upon completing this curriculum.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Gain practical hands-on experience through step-by-step coding sandboxes.",
                "Understand core architectural principles and production-grade best practices.",
                "Build real-world portfolio projects to demonstrate verified skill proficiency.",
                "Receive AI-assisted instant code feedback and error resolution in seconds.",
                "Prepare for technical interview challenges and live coding assessments.",
                "Earn an official verified certificate with a tamper-proof QR credential ID."
              ].map((outcome, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:border-cyan-500 transition">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: VERIFIED CERTIFICATE DETAILS */}
        {activeTab === "certificate" && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-black inline-block mb-2 uppercase tracking-wider">
                  🏆 Verified Skill Credentials
                </span>
                <h2 className="text-xl font-black text-slate-900">Official LernexAI Certificate</h2>
                <p className="text-xs text-slate-500 mt-1">Complete all course modules & clear the final exam to unlock.</p>
              </div>

              <Link
                href="/certificate"
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition text-center shrink-0 cursor-pointer"
              >
                Learn About Certification
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-slate-900 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-base font-black text-amber-700">Unique Credential ID</div>
                  <div className="text-[11px] text-slate-500 mt-1">Tamper-proof online QR verification</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-base font-black text-cyan-700">LinkedIn & PDF</div>
                  <div className="text-[11px] text-slate-500 mt-1">1-click vector export & social badge</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="text-base font-black text-emerald-700">Nominal ₹99 Fee</div>
                  <div className="text-[11px] text-slate-500 mt-1">Affordable official verification</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: AI INSTRUCTOR & CURRICULUM */}
        {activeTab === "instructor" && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">LernexAI Curriculum Architecture</h2>
                <p className="text-xs text-slate-500">Next-gen interactive coding sandboxes optimized for muscle memory</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Every course on LernexAI is structured around direct execution. Instead of passive video watching, you write real code in a sandboxed environment with automated unit tests, instant hints, and contextual assistance at every step.
            </p>
          </section>
        )}

      </div>
    </DashboardLayout>
  );
}
