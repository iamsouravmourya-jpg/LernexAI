import { useEffect, useMemo, useState } from "react";
import { 
  ArrowRight, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  Trophy, 
  Search, 
  Download, 
  Check, 
  Copy, 
  Eye
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { fetchEnrolledCourses, type EnrolledCourse } from "@/lib/course";
import { fetchFinalExamStatus } from "@/lib/finalExam";
import { getCertificateGrade } from "@/lib/certificate";
import { fetchCertificatePurchaseByCourse } from "@/lib/certificates";
import DashboardLayout from "@/components/DashboardLayout";

interface CertificateCourse extends EnrolledCourse {
  examScore: number | null;
  examPassed: boolean;
  certificatePurchased: boolean;
}

export default function Certificates() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [courses, setCourses] = useState<CertificateCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Interactive UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "ready" | "purchased" | "progress">("all");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadCertificates() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const enrolledCourses = await fetchEnrolledCourses(user.id);
        if (!active) return;

        const results: CertificateCourse[] = await Promise.all(
          enrolledCourses.map(async (c) => {
            let examScore: number | null = null;
            let examPassed = false;
            let certificatePurchased = false;

            try {
              const examStatus = await fetchFinalExamStatus(user.id, c.id);
              if (examStatus) {
                examScore = examStatus.score;
                examPassed = examStatus.passed;
              }
            } catch (err) {
              console.warn(`Could not load exam status for ${c.id}:`, err);
            }

            try {
              const purchase = await fetchCertificatePurchaseByCourse(user.id, c.id);
              certificatePurchased = !!purchase;
            } catch (err) {
              console.warn(`Could not load purchase for ${c.id}:`, err);
            }

            return {
              ...c,
              examScore,
              examPassed,
              certificatePurchased,
            };
          })
        );

        if (active) {
          setCourses(results);
          if (results.length > 0 && !selectedCourseId) {
            setSelectedCourseId(results[0].id);
          }
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load certificates");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadCertificates();
    return () => {
      active = false;
    };
  }, [user?.id]);

  const summary = useMemo(() => {
    const purchased = courses.filter((c) => c.certificatePurchased).length;
    const readyToPay = courses.filter((c) => c.examPassed && c.examScore !== null && c.examScore >= 40 && !c.certificatePurchased).length;
    const inProgress = courses.filter((c) => !c.certificatePurchased && !(c.examPassed && c.examScore !== null && c.examScore >= 40)).length;
    return { purchased, readyToPay, inProgress };
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const isReadyToBuy = course.examPassed && course.examScore !== null && course.examScore >= 40 && !course.certificatePurchased;

      if (activeTab === "ready") return matchesSearch && isReadyToBuy;
      if (activeTab === "purchased") return matchesSearch && course.certificatePurchased;
      if (activeTab === "progress") return matchesSearch && (!isReadyToBuy && !course.certificatePurchased);
      return matchesSearch;
    });
  }, [courses, searchQuery, activeTab]);

  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.id === selectedCourseId) || courses[0] || null;
  }, [courses, selectedCourseId]);

  const handleShareClick = () => {
    if (!selectedCourse) return;
    const text = `🎉 I earned my verified certificate in "${selectedCourse.title}" from LernexAI Academy! Verify my credential ID online.`;
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl">
        
        {/* TOP HEADER SECTION */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-teal-600" />
            <span>Verified Credentials & Digital Badges</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Verifiable Achievement Portfolio
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl font-normal leading-relaxed">
            Unlock industry credentials with unique credential IDs, tamper-proof QR verification links, and instant shareable certificates.
          </p>
        </div>

        {/* THREE VALUE CARDS */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-teal-50 text-teal-700 shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">1. Pass Exam</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Score 40%+ on final assessment to qualify</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">2. Claim Certificate</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Flat ₹199 unlocks lifetime QR verification (Incl. GST)</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">3. Share & Verify</h4>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Instant public URL & LinkedIn credentials</p>
            </div>
          </div>
        </div>

        {/* SEARCH AND TAB FILTER BAR */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {[
              { id: "all", label: "All Tracks", count: courses.length },
              { id: "ready", label: "Ready to Claim", count: summary.readyToPay },
              { id: "purchased", label: "Unlocked Certs", count: summary.purchased },
              { id: "progress", label: "In Progress", count: summary.inProgress },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "all" | "ready" | "purchased" | "progress")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-teal-700 text-white font-bold shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative md:w-64 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search credentials..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-teal-500 text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>

        {/* MAIN SIDE-BY-SIDE LAYOUT: CARDS GRID + SIDEBAR INSPECTOR DRAWER */}
        {loading ? (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-slate-100 dark:bg-ink-900/50 rounded-3xl p-6 border border-slate-200 dark:border-white/10 h-36" />
              ))}
            </div>
            <div className="animate-pulse bg-slate-100 dark:bg-ink-900/50 rounded-3xl p-6 border border-slate-200 dark:border-white/10 h-96" />
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 p-8 text-center text-red-700 dark:text-red-300">
            <Award className="mx-auto h-10 w-10 text-red-500 mb-2" />
            <h3 className="text-base font-bold">Could not load certificates</h3>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 dark:border-cyan-500/30 bg-white dark:bg-ink-900/60 p-12 text-center shadow-sm space-y-4">
            <BookOpen className="mx-auto h-12 w-12 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No tracks enrolled yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Start learning from our interactive curriculum, complete sandbox units, and claim verified certificates.
            </p>
            <Link 
              href="/browse" 
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 dark:bg-gradient-to-r dark:from-cyan-400 dark:to-emerald-400 text-white dark:text-ink-950 text-xs font-black shadow-sm hover:scale-105 transition cursor-pointer"
            >
              Explore Course Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            
            {/* LEFT 2 COLUMNS: CERTIFICATE LIST CARDS */}
            <div className="lg:col-span-2 space-y-4">
              {filteredCourses.length === 0 ? (
                <div className="bg-white dark:bg-ink-900/60 rounded-3xl border border-slate-200 dark:border-white/10 p-8 text-center text-slate-500 dark:text-slate-400">
                  <Filter className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="font-bold text-slate-900 dark:text-white text-sm">No matching certificates found</p>
                  <p className="text-xs text-slate-500 mt-1">Try selecting a different filter tab or clearing search.</p>
                </div>
              ) : (
                filteredCourses.map((course) => {
                  const progress = Math.min(100, Math.max(0, course.enrollment_progress || 0));
                  const isCompleted = course.certificatePurchased || progress >= 100;
                  const isReadyToBuy = course.examPassed && course.examScore !== null && course.examScore >= 40 && !course.certificatePurchased;
                  const isSelected = selectedCourseId === course.id;
                  const grade = course.examScore !== null ? getCertificateGrade(course.examScore) : null;

                  return (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourseId(course.id)}
                      className={`cursor-pointer rounded-3xl border transition-all duration-200 p-5 relative overflow-hidden bg-white dark:bg-ink-900/70 shadow-sm dark:shadow-xl ${
                        isSelected
                          ? "border-cyan-500 ring-2 ring-cyan-500/20 shadow-md bg-cyan-50/20 dark:bg-ink-900/90"
                          : "border-slate-200 dark:border-white/10 hover:border-cyan-500/40"
                      }`}
                    >
                      {/* Top Accent Stripe */}
                      <div className={`absolute top-0 left-0 right-0 h-1 ${
                        course.certificatePurchased
                          ? "bg-emerald-500"
                          : isReadyToBuy
                          ? "bg-amber-500"
                          : "bg-cyan-500"
                      }`} />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-800 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-200 dark:border-cyan-500/30 px-2 py-0.5 rounded-md">
                              {course.category}
                            </span>
                            {course.certificatePurchased ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Unlocked & Verified
                              </span>
                            ) : isReadyToBuy ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 px-2.5 py-0.5 rounded-full">
                                <Trophy className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Ready to Claim (₹199)
                              </span>
                            ) : (
                              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-2.5 py-0.5 rounded-full">
                                {course.certificatePurchased ? "Course Complete" : isCompleted ? "Exam Pending" : "In Progress"}
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                            {course.title}
                          </h3>

                          {/* Progress bar and Grade info */}
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                            <div className="flex items-center gap-2 flex-1 max-w-xs">
                              <span className="font-medium">Progress: {Math.round(progress)}%</span>
                              <div className="h-1.5 flex-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200 dark:border-white/5">
                                <div 
                                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" 
                                  style={{ width: `${progress}%` }} 
                                />
                              </div>
                            </div>
                            {course.examScore !== null && (
                              <span className="font-black text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-white/5 border border-cyan-200 dark:border-white/5 px-2.5 py-0.5 rounded-md">
                                Score: {course.examScore}% ({grade?.grade})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-white/5">
                          {course.certificatePurchased ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocation(`/certificate/${course.id}?score=${course.examScore ?? ""}&purchased=true`);
                              }}
                              className="px-3.5 py-2 rounded-xl bg-emerald-500 text-white font-black text-xs shadow-sm hover:bg-emerald-600 transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </button>
                          ) : isReadyToBuy ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocation(`/certificate/${course.id}?score=${course.examScore ?? ""}`);
                              }}
                              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>Claim ₹199</span>
                            </button>
                          ) : isCompleted ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocation(`/final-exam/${course.id}`);
                              }}
                              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-black text-xs shadow-sm hover:scale-105 transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <Trophy className="w-3.5 h-3.5" />
                              <span>Take Exam</span>
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLocation(`/learning/${course.id}`);
                              }}
                              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Continue</span>
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedCourseId(course.id)}
                            className={`p-2 rounded-xl transition cursor-pointer border ${
                              isSelected ? "bg-cyan-500 text-white border-cyan-500" : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-cyan-600"
                            }`}
                            title="Inspect Certificate Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* RIGHT COLUMN: CERTIFICATE SIDEBAR INSPECTOR PANEL */}
            {selectedCourse && (
              <div className="bg-white dark:bg-ink-900/80 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl p-6 space-y-6 sticky top-24">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">Certificate Inspector</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Live preview & verification engine</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-md">
                    Verified Engine
                  </span>
                </div>

                {/* MINI LIVE CERTIFICATE PREVIEW CARD */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/80 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 text-white shadow-xl">
                  {/* Decorative Corner Ornaments */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400" />

                  <div className="text-center space-y-2">
                    <div className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-300">
                      LernexAI Academy
                    </div>
                    <div className="text-xs font-semibold text-slate-300 italic">
                      Certificate of Completion
                    </div>

                    <div className="my-2 py-1 border-y border-amber-400/30">
                      <div className="text-base font-black text-amber-200 tracking-tight">
                        {user?.name || "Student Name"}
                      </div>
                    </div>

                    <div className="text-[11px] font-medium text-slate-200 line-clamp-1">
                      {selectedCourse.title}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10">
                      <span>Grade: <strong className="text-emerald-400">{selectedCourse.examScore ? `${selectedCourse.examScore}%` : "Pending"}</strong></span>
                      <span className="font-mono text-[9px] text-amber-300">LXAI-2026-X892</span>
                    </div>
                  </div>
                </div>

                {/* COURSE & CERTIFICATE DETAILS BREAKDOWN */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Certificate Details
                  </div>

                  <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4 border border-slate-200 dark:border-white/5 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Recipient Name:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{user?.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Track Title:</span>
                      <span className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{selectedCourse.title}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Exam Score:</span>
                      <span className="font-black text-cyan-700 dark:text-cyan-300">{selectedCourse.examScore ? `${selectedCourse.examScore}%` : "Not attempted"}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Status:</span>
                      <span className={`font-black ${
                        selectedCourse.certificatePurchased 
                          ? "text-emerald-600 dark:text-emerald-400" 
                          : selectedCourse.examPassed 
                          ? "text-amber-600 dark:text-amber-400" 
                          : "text-slate-500 dark:text-slate-400"
                      }`}>
                        {selectedCourse.certificatePurchased ? "Verified & Issued" : selectedCourse.examPassed ? "Ready to Claim" : "Exam Required"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TRACKER STEPS */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Milestone Progress
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>1. Course Sandbox Units</span>
                    </div>
                    <div className={`flex items-center gap-2 font-medium ${selectedCourse.examPassed ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                      {selectedCourse.examPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-white/20 shrink-0" />
                      )}
                      <span>2. Final Assessment Score 40%+</span>
                    </div>
                    <div className={`flex items-center gap-2 font-medium ${selectedCourse.certificatePurchased ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                      {selectedCourse.certificatePurchased ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-white/20 shrink-0" />
                      )}
                      <span>3. ₹199 Certificate Issuance (Incl. GST)</span>
                    </div>
                  </div>
                </div>

                {/* PRIMARY ACTIONS IN SIDEBAR */}
                <div className="space-y-2 pt-2">
                  {selectedCourse.certificatePurchased ? (
                    <>
                      <button
                        onClick={() => setLocation(`/certificate/${selectedCourse.id}?score=${selectedCourse.examScore ?? ""}&purchased=true`)}
                        className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 text-white font-black text-xs shadow-sm hover:bg-emerald-600 transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>View & Download Certificate PDF</span>
                      </button>

                      <button
                        onClick={handleShareClick}
                        className="w-full py-2.5 px-4 rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />}
                        <span>{copiedLink ? "Credential Message Copied!" : "Copy Credential Message"}</span>
                      </button>
                    </>
                  ) : selectedCourse.examPassed && selectedCourse.examScore !== null && selectedCourse.examScore >= 40 ? (
                    <button
                      onClick={() => setLocation(`/certificate/${selectedCourse.id}?score=${selectedCourse.examScore ?? ""}`)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Claim Verified Certificate (₹199 Incl. GST)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setLocation(`/final-exam/${selectedCourse.id}`)}
                      className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-black text-xs shadow-sm hover:scale-[1.02] transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Trophy className="w-4 h-4" />
                      <span>Take Final Exam to Unlock</span>
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
