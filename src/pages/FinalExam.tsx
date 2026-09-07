import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useLocation } from "wouter";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Bookmark,
  CheckCircle2,
  Clock3,
  FileCheck2,
  GraduationCap,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
  XCircle,
  EyeOff,
  Camera,
  BookOpen,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useAuth } from "@/context/AuthContext";
import { fetchCourseWithModules, type Course } from "@/lib/course";
import {
  fetchFinalExamStatus,
  startFinalExam,
  submitFinalExam,
  type FinalExamAttemptSummary,
  type FinalExamQuestion,
  type FinalExamResult,
} from "@/lib/finalExam";
import { getCertificateGrade } from "@/lib/certificate";
import {
  calculateInternalQuizAssessment,
  computeCombinedCourseAssessment,
  type InternalAssessmentResult,
} from "@/lib/courseAssessment";

type Stage = "loading" | "intro" | "in_progress" | "submitting" | "result" | "error";

function formatClock(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function FinalExam() {
  const { courseId } = useParams<{ courseId: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  const [stage, setStage] = useState<Stage>("loading");
  const [course, setCourse] = useState<Course | null>(null);
  const [lastAttempt, setLastAttempt] = useState<FinalExamAttemptSummary | null>(null);
  const [internalAssessment, setInternalAssessment] = useState<InternalAssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<FinalExamQuestion[]>([]);
  const [, setPassingScore] = useState(40);
  const [, setTotalMarks] = useState(60);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [result, setResult] = useState<FinalExamResult | null>(null);

  // Anti-cheating states
  const [screenshotBlocked, setScreenshotBlocked] = useState(false);
  const [, setTabSwitchDetected] = useState(false);
  const [strikes, setStrikes] = useState(0);
  const [strikeWarningModal, setStrikeWarningModal] = useState<{
    show: boolean;
    reason: string;
    strikeNumber: number;
  } | null>(null);

  const strikesRef = useRef(0);
  const lastViolationTimeRef = useRef(0);
  const submittingRef = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  // Load course and exam status
  useEffect(() => {
    let active = true;

    async function load() {
      if (!courseId) return;
      try {
        const [loadedCourse, attempt] = await Promise.all([
          fetchCourseWithModules(courseId),
          fetchFinalExamStatus(courseId),
        ]);
        if (!active) return;
        setCourse(loadedCourse);
        setLastAttempt(attempt);

        if (loadedCourse) {
          const internal = await calculateInternalQuizAssessment(user?.id, loadedCourse);
          if (active) setInternalAssessment(internal);
        }

        setStage("intro");
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Could not load the final exam.");
        setStage("error");
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [courseId, user?.id]);

  const submitExam = useCallback(
    async (finalAnswers: Record<string, number>, options?: { reason?: "manual" | "tab_switch" | "timeout" }) => {
      if (!courseId || !attemptId || submittingRef.current) return;
      submittingRef.current = true;
      setShowSubmitModal(false);
      setStage("submitting");
      setError(null);

      try {
        const examResult = await submitFinalExam(courseId, attemptId, finalAnswers, options);
        setResult(examResult);
        setStage("result");

        // Fire celebration confetti if passed
        if (examResult.passed || examResult.score >= 40) {
          try {
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#6366f1", "#f59e0b", "#10b981", "#3b82f6"],
            });
          } catch {
            // ignore confetti error
          }
        }
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : "Could not submit the final exam.");
        setStage("error");
      } finally {
        submittingRef.current = false;
      }
    },
    [courseId, attemptId]
  );

  // Unified Proctoring Violation Handler (2-Strike System)
  const registerViolation = useCallback(
    (reason: string) => {
      if (stage !== "in_progress" || submittingRef.current) return;
      const now = Date.now();
      // Debounce events firing simultaneously (e.g. blur + visibilitychange) within 2 seconds
      if (now - lastViolationTimeRef.current < 2000) return;
      lastViolationTimeRef.current = now;

      const newStrikes = strikesRef.current + 1;
      strikesRef.current = newStrikes;
      setStrikes(newStrikes);

      if (newStrikes >= 2) {
        setStrikeWarningModal(null);
        setTabSwitchDetected(true);
        void submitExam(answersRef.current, { reason: "tab_switch" });
      } else {
        setStrikeWarningModal({
          show: true,
          reason,
          strikeNumber: newStrikes,
        });
      }
    },
    [stage, submitExam]
  );

  // Anti-cheating 1: Tab switch & Window Blur detection (Strike 1 warning, Strike 2 auto-submit)
  useEffect(() => {
    if (stage !== "in_progress") return;

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        registerViolation("Tab switch or browser minimization detected.");
      }
    };

    const handleWindowBlur = () => {
      registerViolation("Window focus lost (Alt+Tab, dual-monitor click, or split-screen).");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [stage, registerViolation]);

  // Anti-cheating 2: DevTools, Keyboard Shortcuts, Copy/Paste & Screenshot Protection
  useEffect(() => {
    if (stage !== "in_progress") return;

    const triggerScreenshotProtection = () => {
      setScreenshotBlocked(true);
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("Screenshots are strictly prohibited during proctored exams.");
        }
      } catch {
        // ignore clipboard error
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isPrintScreen = e.key === "PrintScreen" || e.code === "PrintScreen";
      const isMacScreenshot = e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key);
      const isSnippingTool = (e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "s" || e.key === "S");
      const isPrint = (e.metaKey || e.ctrlKey) && (e.key === "p" || e.key === "P");

      // DevTools shortcuts: F12, Ctrl+Shift+I/J/C, Ctrl+U
      const isF12 = e.key === "F12" || e.code === "F12";
      const isInspect = (e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "I", "j", "J", "c", "C"].includes(e.key);
      const isViewSource = (e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U");

      // Copy/Paste on exam questions
      const isCopyPaste = (e.ctrlKey || e.metaKey) && ["c", "C", "v", "V", "a", "A"].includes(e.key);

      if (isPrintScreen || isMacScreenshot || isSnippingTool || isPrint) {
        e.preventDefault();
        e.stopPropagation();
        triggerScreenshotProtection();
        registerViolation("Screenshot or screen-capture attempt detected.");
        return;
      }

      if (isF12 || isInspect || isViewSource) {
        e.preventDefault();
        e.stopPropagation();
        registerViolation("Developer tools / source code inspection attempt detected.");
        return;
      }

      if (isCopyPaste) {
        e.preventDefault();
        e.stopPropagation();
        registerViolation("Copying or pasting content during exam is prohibited.");
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        triggerScreenshotProtection();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
    };
  }, [stage, registerViolation]);

  // Timer countdown
  useEffect(() => {
    if (stage !== "in_progress" || deadline === null) return;

    const tick = () => {
      const secondsLeft = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setRemainingSeconds(secondsLeft);
      if (secondsLeft <= 0) {
        void submitExam(answersRef.current, { reason: "timeout" });
      }
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [stage, deadline, submitExam]);

  async function handleStart() {
    if (!courseId) return;
    setError(null);
    try {
      const start = await startFinalExam(courseId);
      setAttemptId(start.attemptId);
      setQuestions(start.questions);
      setPassingScore(start.passingScore || 40);
      setTotalMarks(start.totalMarks || 60);
      setAnswers({});
      setFlagged({});
      setStrikes(0);
      strikesRef.current = 0;
      setStrikeWarningModal(null);
      setCurrentIndex(0);
      // 30 minutes duration
      setDeadline(new Date(start.startedAt).getTime() + (start.timeLimitMinutes || 30) * 60 * 1000);
      setStage("in_progress");
    } catch (startError) {
      setError(startError instanceof Error ? startError.message : "Could not start the final exam.");
    }
  }

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const flaggedCount = useMemo(() => Object.values(flagged).filter(Boolean).length, [flagged]);
  const currentQuestion = questions[currentIndex];
  const lowTime = remainingSeconds <= 120; // 2 minutes or less

  // Dynamic marks per question
  const marksPerQuestion = useMemo(() => {
    const totalQ = questions.length || 1;
    return Number((60 / totalQ).toFixed(1));
  }, [questions.length]);

  // 1. LOADING STAGE
  if (stage === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-slate-900">
        <div className="relative mb-6">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
          </div>
        </div>
        <h2 className="text-xl font-black text-slate-900">Preparing Proctored Final Exam</h2>
        <p className="mt-2 text-xs text-slate-500 font-medium">Configuring 60-Marks rubric, 40-minute proctor timer, and 30 curated questions...</p>
      </div>
    );
  }

  // 2. SUBMITTING STAGE
  if (stage === "submitting") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-slate-900">
        <div className="relative mb-6">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FileCheck2 className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <h2 className="text-xl font-black text-slate-900">Submitting & Evaluating Answers</h2>
        <p className="mt-2 text-xs text-slate-500 font-medium">Calculating official score (out of 60 marks) and preparing certificate validation...</p>
      </div>
    );
  }

  // 3. ERROR STAGE
  if (stage === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center">
        <div className="max-w-md rounded-3xl border border-red-200 bg-white p-8 shadow-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertTriangle className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-xl font-black text-slate-900">Unable to Load Final Exam</h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">{error || "An unexpected error occurred while connecting to the exam system."}</p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => setLocation(`/learning/${courseId}`)}
              className="w-full rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700 cursor-pointer"
            >
              Back to Course Topics
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 cursor-pointer"
            >
              Reload Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. INTRO STAGE
  if (stage === "intro") {
    const alreadyPassed = lastAttempt?.passed === true || (lastAttempt?.score !== null && (lastAttempt?.score ?? 0) >= 40);
    const pastScore = lastAttempt?.score ?? null;
    const pastGrade = pastScore !== null ? getCertificateGrade(pastScore) : null;
    const pastMarks = pastScore !== null ? Math.round((pastScore / 100) * 60) : null;

    const internalMarksEarned = internalAssessment?.marksObtained ?? 36;
    const internalQuizCount = internalAssessment?.totalQuizzes || (course?.modules?.length || 10);
    const internalQuestionsCount = internalAssessment?.totalQuizQuestions || (internalQuizCount * 5);

    const isTestCourse =
      course?.id?.startsWith("course-quick-") ||
      course?.id?.startsWith("course-test-") ||
      course?.id?.startsWith("test-") ||
      (course?.modules?.length === 1 && course.modules[0].lessons?.length === 1);

    const questionCount = isTestCourse ? 1 : 30;
    const examTimeMinutes = isTestCourse ? 10 : 40;

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          
          {/* Top Navigation & Status */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setLocation(courseId ? `/learning/${courseId}` : "/dashboard")}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Course Topics</span>
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-indigo-700">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" /> Proctored Academic Exam
            </span>
          </div>

          {/* Main Intro Card */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 space-y-8">
            
            {/* Header Details */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-indigo-700 border border-indigo-100">
                  {course?.category || "Technology"}
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700">
                  {course?.difficulty || "Comprehensive"} Level
                </span>
                <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[10px] font-black text-amber-800 border border-amber-200">
                  60 Marks Theory Test
                </span>
                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-800 border border-emerald-200">
                  100 Marks Total Grading Rubric
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                {course?.title || "Course"} — Final Assessment Exam
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Demonstrate mastery across all curriculum modules. Your final course certificate is evaluated on a <strong>100-Mark Scale</strong>: <strong>40 Marks</strong> from your completed module quizzes + <strong>60 Marks</strong> from this timed final proctored exam.
              </p>
            </div>

            {/* 100-Mark Dual Weightage Banner */}
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/70 via-slate-50 to-emerald-50/70 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-indigo-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-950">
                    Official 100-Mark Evaluation Structure
                  </span>
                </div>
                <span className="text-xs font-extrabold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                  Total: 100 Marks
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-emerald-600" />
                      Internal Quizzes (All Modules)
                    </span>
                    <span className="font-black text-emerald-700">40 Marks</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Based on {internalQuizCount} module quizzes (~{internalQuestionsCount} questions).
                  </div>
                  <div className="text-xs font-black text-emerald-800 pt-1 flex items-center justify-between border-t border-slate-100">
                    <span>Your Internal Score:</span>
                    <span className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {internalMarksEarned} / 40 Marks ({internalAssessment?.averagePercentage ?? 90}%)
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-indigo-600" />
                      Final Theory Examination
                    </span>
                    <span className="font-black text-indigo-700">60 Marks</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Proctored assessment with {questionCount} questions in {examTimeMinutes} minutes.
                  </div>
                  <div className="text-xs font-black text-indigo-800 pt-1 flex items-center justify-between border-t border-slate-100">
                    <span>Exam Weightage:</span>
                    <span className="bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                      60 Marks ({examTimeMinutes} Min Timer)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Official Exam Parameters Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Exam Marks</div>
                <div className="mt-1 text-2xl font-black text-indigo-700">60 Marks</div>
                <div className="mt-0.5 text-[10px] text-slate-500">{questionCount} questions total</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Time Limit</div>
                <div className="mt-1 text-2xl font-black text-amber-600">{examTimeMinutes} Min</div>
                <div className="mt-0.5 text-[10px] text-slate-500">Auto-submits on timeout</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Grand Total</div>
                <div className="mt-1 text-2xl font-black text-emerald-600">100 Marks</div>
                <div className="mt-0.5 text-[10px] text-slate-500">40 Quizzes + 60 Exam</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Passing Mark</div>
                <div className="mt-1 text-2xl font-black text-emerald-700">40%</div>
                <div className="mt-0.5 text-[10px] text-slate-500">24/60 Marks Min.</div>
              </div>
            </div>

            {/* Previous Attempt Banner */}
            {lastAttempt && (
              <div
                className={`rounded-2xl border p-5 ${
                  alreadyPassed
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-amber-200 bg-amber-50 text-amber-900"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${alreadyPassed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {alreadyPassed ? <Trophy className="h-6 w-6" /> : <RotateCcw className="h-6 w-6" />}
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider">
                        {alreadyPassed ? "Previous Examination Passed" : "Previous Attempt Recorded"}
                      </div>
                      <div className="text-sm font-extrabold mt-0.5">
                        Exam Score: {pastMarks} / 60 Marks ({pastScore}%) {pastGrade && `• Grade: ${pastGrade.grade}`}
                      </div>
                    </div>
                  </div>

                  {alreadyPassed && (
                    <button
                      onClick={() => setLocation(`/certificate/${courseId}?fromExam=true`)}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-black text-white hover:bg-emerald-800 transition shadow-xs cursor-pointer"
                    >
                      <Award className="h-4 w-4" /> Claim Certificate (₹199)
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Strict Proctoring & Anti-Cheating Instructions */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-black text-xs uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4 text-indigo-600" />
                <span>Strict Proctoring Rules & Academic Integrity</span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>60 Marks Theory:</strong> Weighted across questions for a 60-mark final test score.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>{examTimeMinutes} Minutes Limit:</strong> Countdown begins immediately and auto-submits on expiry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>2-Strike Proctoring:</strong> Tab switch, window blur, or devtools trigger Strike 1 warning. Strike 2 auto-submits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <EyeOff className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span><strong>Email Watermark & Security:</strong> Screen displays dynamic email watermark; screenshot and devtools are blocked.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleStart}
                className="flex-1 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-4 text-sm font-black shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{lastAttempt ? "Retake 60-Mark Final Exam" : "Start 60-Mark Final Exam Now"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setLocation(courseId ? `/learning/${courseId}` : "/dashboard")}
                className="rounded-2xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 px-6 py-4 text-xs font-bold transition cursor-pointer"
              >
                Review Topics First
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // 5. RESULT STAGE
  if (stage === "result" && result) {
    const totalExamMarks = result.totalMarks || 60;
    const scoredExamMarks = result.obtainedMarks !== undefined ? result.obtainedMarks : Math.round((result.score / 100) * totalExamMarks);
    
    // Combined 100-mark assessment
    const internalMarks = internalAssessment?.marksObtained ?? 36;
    const combined = computeCombinedCourseAssessment(internalMarks, scoredExamMarks);
    const isPassing = combined.passed;
    const grandGrade = combined.grade;

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setLocation(courseId ? `/learning/${courseId}` : "/dashboard")}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Course Home</span>
            </button>

            <span className="text-xs font-black text-indigo-600">
              Exam ID: {attemptId || "COMPLETED"}
            </span>
          </div>

          {/* Auto-submission Banner if triggered by tab-switch */}
          {(result.autoSubmitted || result.submissionReason === "tab_switch") && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
              <div className="text-xs">
                <strong className="font-black">Auto-Submitted by Proctor (2 Strikes Reached):</strong> Consecutive window blur, tab-switching, or prohibited shortcut was detected. Your exam was submitted automatically with recorded answers.
              </div>
            </div>
          )}

          {/* Main Result Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* Header Showcase */}
            <div className="text-center space-y-3">
              <div className="mx-auto inline-flex items-center justify-center p-4 rounded-3xl bg-slate-50 border border-slate-200 shadow-inner">
                {isPassing ? (
                  <Trophy className="h-14 w-14 text-amber-500 animate-bounce" />
                ) : (
                  <AlertTriangle className="h-14 w-14 text-amber-500" />
                )}
              </div>

              <div>
                <span
                  className={`inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isPassing
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {isPassing ? "🎉 Comprehensive Assessment Passed" : "Assessment Completed"}
                </span>

                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
                  {combined.totalScore} / 100 Marks
                </h1>
                <div className="text-xs text-slate-500 font-bold mt-1">
                  Overall Performance: {combined.totalScore}% (40 Marks Quizzes + 60 Marks Final Exam)
                </div>

                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs text-slate-500 font-bold uppercase">Official Certificate Grade:</span>
                  <span className="px-3 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-black">
                    Grade {grandGrade.grade} ({grandGrade.label})
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {isPassing
                    ? "Congratulations! Your combined scores from module quizzes and the final theory exam qualify you for the verifiable certificate."
                    : "You completed the test. Review question explanations below and retake the final exam when you feel ready."}
                </p>
              </div>
            </div>

            {/* 100-Mark Dual Score Breakdown Card */}
            <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/50 via-white to-emerald-50/50 p-5 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="h-4 w-4 text-indigo-600" />
                  Consolidated 100-Marks Scorecard
                </span>
                <span className="font-extrabold text-indigo-700 bg-white border border-indigo-200 px-3 py-1 rounded-full shadow-2xs">
                  Grand Total: {combined.totalScore} / 100 Marks
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-200 bg-white p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4 text-emerald-600" />
                      Module Quizzes Score
                    </span>
                    <span className="text-sm font-black text-emerald-700">
                      {internalMarks} / 40 Marks
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Aggregated across all completed module quizzes ({internalAssessment?.averagePercentage ?? 90}% avg).
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${Math.min(100, Math.round((internalMarks / 40) * 100))}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-indigo-200 bg-white p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <GraduationCap className="h-4 w-4 text-indigo-600" />
                      Final Theory Exam Score
                    </span>
                    <span className="text-sm font-black text-indigo-700">
                      {scoredExamMarks} / 60 Marks
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Achieved {result.correctCount} / {result.total} questions correct in proctored session ({result.score}%).
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${Math.min(100, Math.round((scoredExamMarks / 60) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Performance Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Exam Marks</div>
                <div className="text-xl font-black text-slate-900 mt-1">{scoredExamMarks} / 60</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{result.correctCount}/{result.total} Correct</div>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Quiz Marks</div>
                <div className="text-xl font-black text-emerald-700 mt-1">{internalMarks} / 40</div>
                <div className="text-[10px] text-emerald-600 mt-0.5">Module Quizzes</div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-center">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Grand Total</div>
                <div className="mt-1 text-xl font-black text-slate-900">{combined.totalScore} / 100</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Overall Marks</div>
              </div>

              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 text-center">
                <div className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider">Grade</div>
                <div className="text-xl font-black text-indigo-700 mt-1">Grade {grandGrade.grade}</div>
                <div className="text-[10px] text-indigo-600 mt-0.5">{grandGrade.label}</div>
              </div>
            </div>

            {/* CERTIFICATE CLAIM CARD & ACTION BUTTONS */}
            {isPassing ? (
              <div className="space-y-4">
                <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-indigo-50/40 to-emerald-50 p-6 sm:p-8 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                        Next Step • Certification Unlocked
                      </span>
                      <h3 className="text-xl font-black text-slate-900">Claim Your Verified Certificate</h3>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
                        Enter your legal name as you wish it to appear on your credential, preview live with your combined score ({combined.totalScore}/100 • Grade {grandGrade.grade}), and download your verified PDF certificate (₹199 Incl. GST).
                      </p>
                    </div>

                    <button
                      onClick={() => setLocation(`/certificate/${courseId}?fromExam=true`)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-7 py-4 text-sm font-black text-slate-950 shadow-md hover:shadow-lg transition-all hover:scale-105 hover:from-amber-300 hover:to-amber-400 shrink-0 cursor-pointer"
                    >
                      <Award className="h-5 w-5" />
                      <span>Proceed to Certificate & Pay ₹199</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Secondary Actions: Retake Test or Return to Topics */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={handleStart}
                    className="flex-1 rounded-2xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-3 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Retake Final Exam (Practice / Improve Score)</span>
                  </button>
                  <button
                    onClick={() => setLocation(courseId ? `/learning/${courseId}` : "/dashboard")}
                    className="rounded-2xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 px-6 py-3 text-xs font-bold transition cursor-pointer"
                  >
                    Back to Course Topics
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setLocation(courseId ? `/learning/${courseId}` : "/dashboard")}
                  className="flex-1 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200 text-center cursor-pointer"
                >
                  Back to Course Topics
                </button>
                <button
                  onClick={handleStart}
                  className="flex-1 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-black text-white shadow-sm transition hover:bg-indigo-700 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" /> Retake 60-Mark Final Exam
                </button>
              </div>
            )}

            {/* ACCORDION: REVIEW ANSWERS BREAKDOWN */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-indigo-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Question-by-Question Marks Breakdown ({result.breakdown.length})
                  </h3>
                </div>
                <button
                  onClick={() => setShowBreakdown((prev) => !prev)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition cursor-pointer"
                >
                  {showBreakdown ? "Hide Question Details ▲" : "Show Question Details ▼"}
                </button>
              </div>

              {showBreakdown && (
                <div className="space-y-3 pt-2">
                  {result.breakdown.map((item, index) => (
                    <div
                      key={item.questionId || index}
                      className={`rounded-2xl border p-4 text-xs transition ${
                        item.isCorrect
                          ? "border-emerald-200 bg-emerald-50/50 text-slate-800"
                          : "border-red-200 bg-red-50/50 text-slate-800"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {item.isCorrect ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-900">
                              {index + 1}. {item.question}
                            </span>
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 ${
                                item.isCorrect
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.isCorrect ? `+${item.marksAwarded ?? marksPerQuestion} Marks` : "0 Marks"}
                            </span>
                          </div>

                          {item.explanation && (
                            <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 mt-2">
                              <span className="font-bold text-slate-800">Explanation: </span>
                              {item.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    );
  }

  // 6. IN-PROGRESS ACTIVE EXAM STAGE
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isFlagged = currentQuestion ? Boolean(flagged[currentQuestion.id]) : false;
  const isLastQuestion = currentIndex === questions.length - 1;

  return (
    <div
      className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col select-none relative ${
        screenshotBlocked || strikeWarningModal?.show ? "overflow-hidden" : ""
      }`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* SECTION 1: PROCTORING DYNAMIC EMAIL WATERMARK OVERLAY */}
      <div
        className="pointer-events-none fixed inset-0 z-10 overflow-hidden select-none opacity-[0.05] flex flex-wrap gap-x-24 gap-y-20 p-8 items-center justify-around -rotate-12"
        aria-hidden="true"
      >
        {Array.from({ length: 48 }).map((_, idx) => (
          <span
            key={idx}
            className="text-xs sm:text-sm font-mono font-bold tracking-widest text-slate-900 uppercase whitespace-nowrap"
          >
            {user?.email || "student@lernexai.com"}
          </span>
        ))}
      </div>

      {/* SCREENSHOT BLOCKED FULLSCREEN OVERLAY */}
      {screenshotBlocked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-3xl animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-red-300 bg-white p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <Camera className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Screenshot Attempt Blocked</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Screen capture and screenshot tools are strictly forbidden during the proctored examination. The screen has been blurred to protect exam integrity.
            </p>
            <button
              type="button"
              onClick={() => setScreenshotBlocked(false)}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition cursor-pointer shadow-sm"
            >
              I Understand • Return to Exam
            </button>
          </div>
        </div>
      )}

      {/* ACADEMIC INTEGRITY WARNING MODAL (STRIKE 1) */}
      {strikeWarningModal?.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border-2 border-amber-300 bg-white p-6 shadow-2xl text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-inner">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-200">
                Academic Integrity Warning • Strike {strikeWarningModal.strikeNumber} of 2
              </span>
              <h3 className="text-lg font-black text-slate-900">
                Proctoring Violation Detected
              </h3>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 font-semibold text-left space-y-1">
              <div><strong>Detected Event:</strong> {strikeWarningModal.reason}</div>
              <div className="text-[11px] text-amber-800 font-normal">
                During this proctored examination, switching tabs, minimizing windows, dual-monitor clicks, or inspecting devtools is strictly monitored.
              </div>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-800 text-left font-medium leading-relaxed">
              <strong>Strict 2-Strike Rule:</strong> You have been issued Strike 1. On Strike 2, your examination will be <strong>instantly auto-submitted</strong> with your current recorded answers!
            </div>
            <button
              type="button"
              onClick={() => setStrikeWarningModal(null)}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
            >
              I Understand • Return to Exam
            </button>
          </div>
        </div>
      )}

      {/* STICKY EXAM TOP HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 py-3.5 sm:px-6 shadow-xs">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
          
          {/* Left info */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                {course?.title || "Final Exam"}
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Question <span className="text-slate-900 font-bold">{currentIndex + 1}</span> of {questions.length} • {answeredCount} answered • <strong>60 Marks Total</strong>
              </p>
            </div>
          </div>

          {/* Right Timer, Strikes & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Integrity Strikes Meter */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl font-mono text-xs font-black border transition-all ${
                strikes === 0
                  ? "bg-slate-100 text-slate-700 border-slate-200"
                  : "bg-amber-100 text-amber-900 border-amber-300 animate-pulse"
              }`}
            >
              <ShieldAlert className={`h-3.5 w-3.5 ${strikes > 0 ? "text-amber-600" : "text-slate-500"}`} />
              <span>Strikes: {strikes}/2</span>
            </div>

            {/* Live 30-Min Timer Pill */}
            <div
              className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-black transition-all ${
                lowTime
                  ? "bg-red-600 text-white animate-pulse shadow-md"
                  : "bg-slate-900 text-amber-300"
              }`}
            >
              <Clock3 className="h-4 w-4" />
              <span>{formatClock(remainingSeconds)}</span>
            </div>

            {/* Finish & Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-3 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Submit Exam
            </button>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100 mt-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-amber-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      {/* MAIN EXAM WORKSPACE */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 sm:px-6 grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        
        {/* LEFT COLUMN: ACTIVE QUESTION CARD */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm relative">
            
            {/* Question Top Tags */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-100">
                  Question {currentIndex + 1}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-black border border-amber-200">
                  +{marksPerQuestion} Marks
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] capitalize">
                  {currentQuestion?.difficulty || "medium"}
                </span>
              </div>

              {/* Bookmark Toggle */}
              <button
                type="button"
                onClick={() => currentQuestion && toggleFlag(currentQuestion.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isFlagged
                    ? "bg-amber-400 text-slate-950 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>{isFlagged ? "Flagged for Review" : "Flag Question"}</span>
              </button>
            </div>

            {/* Question Heading */}
            <h3 className="mt-6 text-base sm:text-xl font-bold leading-relaxed text-slate-900">
              {currentQuestion?.question}
            </h3>

            {/* Options List */}
            <div className="mt-6 space-y-3">
              {currentQuestion?.options.map((option, optionIdx) => {
                const isSelected = selectedAnswer === optionIdx;
                const letter = String.fromCharCode(65 + optionIdx);

                return (
                  <label
                    key={optionIdx}
                    onClick={() => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIdx }))}
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50/60"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                        isSelected
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold leading-relaxed flex-1">
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Navigation Bottom Controls */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>

              <div className="flex items-center gap-2">
                {selectedAnswer !== undefined && currentQuestion && (
                  <button
                    type="button"
                    onClick={() => {
                      setAnswers((prev) => {
                        const next = { ...prev };
                        delete next[currentQuestion.id];
                        return next;
                      });
                    }}
                    className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1 cursor-pointer"
                  >
                    Clear Selection
                  </button>
                )}

                {isLastQuestion ? (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-2.5 text-xs font-black text-white shadow-sm transition cursor-pointer"
                  >
                    <span>Finish & Submit</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((idx) => Math.min(questions.length - 1, idx + 1))}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-xs font-black text-white shadow-sm transition cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: QUESTION MATRIX & QUICK NAVIGATOR PALETTE */}
        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Question Palette</h4>
            <span className="text-[11px] text-indigo-600 font-bold">
              {answeredCount}/{questions.length} Answered
            </span>
          </div>

          {/* Color Legend */}
          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-md bg-emerald-600" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-md bg-amber-400" />
              <span>Flagged</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-md bg-slate-200 border border-slate-300" />
              <span>Unanswered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-md bg-indigo-600" />
              <span>Current</span>
            </div>
          </div>

          {/* Matrix Buttons Grid */}
          <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto no-scrollbar pt-1">
            {questions.map((q, qIndex) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentIndex === qIndex;
              const isQuestionFlagged = Boolean(flagged[q.id]);

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIndex(qIndex)}
                  className={`h-10 rounded-xl text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ${
                    isCurrent
                      ? "bg-indigo-600 text-white ring-2 ring-indigo-300 shadow-xs scale-105"
                      : isQuestionFlagged
                      ? "bg-amber-400 text-slate-950 font-black"
                      : isAnswered
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{qIndex + 1}</span>
                  {isQuestionFlagged && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Final Submit CTA */}
          <div className="pt-2">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Submit Entire Exam</span>
            </button>
          </div>
        </aside>

      </main>

      {/* CONFIRMATION MODAL BEFORE SUBMITTING */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-700">
                <ShieldAlert className="h-5 w-5" />
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">Confirm Exam Submission</h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to submit your final exam? Your score out of <strong>60 Marks</strong> will be computed immediately.
            </p>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center text-xs">
              <div>
                <div className="text-emerald-700 font-black text-base">{answeredCount}</div>
                <div className="text-[10px] text-slate-500">Answered</div>
              </div>
              <div>
                <div className="text-amber-700 font-black text-base">{flaggedCount}</div>
                <div className="text-[10px] text-slate-500">Flagged</div>
              </div>
              <div>
                <div className="text-slate-600 font-black text-base">{questions.length - answeredCount}</div>
                <div className="text-[10px] text-slate-400">Unanswered</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Continue Exam
              </button>
              <button
                type="button"
                onClick={() => void submitExam(answers, { reason: "manual" })}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-xs transition cursor-pointer"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BAR */}
      <footer className="border-t border-slate-200 bg-white py-3 px-4 text-center text-[11px] text-slate-500 font-medium">
        LernexAI Proctored Examination Engine • All responses securely recorded
      </footer>
    </div>
  );
}
