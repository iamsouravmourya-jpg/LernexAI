import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "wouter";
import AIChatPanel from "@/components/AIChatPanel";
import CourseProgressBar from "@/components/CourseProgressBar";
import LessonContent from "@/components/LessonContent";
import ModuleSidebar from "@/components/ModuleSidebar";
import { useAuth } from "@/context/AuthContext";
import {
  Course,
  fetchCourseWithModules,
  fetchQuizAttemptScores,
  fetchUserProgress,
  saveQuizAttempt,
  updateEnrollmentProgress,
  updateLessonProgress,
} from "@/lib/course";

export default function Learning() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLessonId, setActiveLessonId] = useState("");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [quizScoresById, setQuizScoresById] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadLearningPage() {
      if (!courseId || !user?.id) return;
      setLoading(true);
      setError(null);

      const loadedCourse = await fetchCourseWithModules(courseId);
      if (!active) return;
      if (!loadedCourse) {
        setCourse(null);
        setLoading(false);
        return;
      }

      const [progress, persistedQuizScores] = await Promise.all([
        fetchUserProgress(courseId, user.id, loadedCourse),
        fetchQuizAttemptScores(user.id, loadedCourse),
      ]);
      if (!active) return;

      const orderedLessons = loadedCourse.modules?.flatMap(module =>
        module.lessons?.map(lesson => ({ moduleId: module.id, lesson })) || []
      ) || [];
      const firstLesson = orderedLessons.find(item => !progress.completedLessonIds.has(item.lesson.id))
        || orderedLessons[0];

      setCourse(loadedCourse);
      setCompletedLessons(progress.completedLessonIds);
      setQuizScoresById(persistedQuizScores);
      setActiveLessonId(firstLesson?.lesson.id || "");
      setLoading(false);
    }

    void loadLearningPage();
    return () => {
      active = false;
    };
  }, [courseId, user?.id]);

  const orderedLessons = useMemo(() => (
    course?.modules?.flatMap(module =>
      module.lessons?.map(lesson => ({ module, lesson })) || []
    ) || []
  ), [course]);

  const allLessonsComplete = orderedLessons.length > 0 && completedLessons.size === orderedLessons.length;
  const activeIndex = orderedLessons.findIndex(item => item.lesson.id === activeLessonId);
  const activeItem = activeIndex >= 0 ? orderedLessons[activeIndex] : null;
  const activeModuleComplete = Boolean(
    activeItem?.module.lessons?.length &&
    activeItem.module.lessons.every((lesson) => completedLessons.has(lesson.id))
  );

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < orderedLessons.length - 1;

  // Auto-collapse left curriculum sidebar on medium viewports or when lesson has sandbox to give maximum coding space
  useEffect(() => {
    if (!activeItem) return;
    const isMediumViewport = window.innerWidth < 1280;
    const hasSandbox = Boolean(
      activeItem.lesson?.sandbox_code ||
      activeItem.lesson?.content_type === "interactive_sandbox" ||
      (activeItem.lesson?.content && activeItem.lesson.content.includes("sandbox"))
    );

    if (isMediumViewport || hasSandbox) {
      setSidebarCollapsed(true);
    }
  }, [activeLessonId, activeItem]);

  const selectLessonAt = (index: number) => {
    const item = orderedLessons[index];
    if (!item) return;
    setActiveLessonId(item.lesson.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleComplete = async () => {
    if (!user?.id || !courseId || !activeItem || saving) return;
    const wasCompleted = completedLessons.has(activeItem.lesson.id);
    setSaving(true);
    setError(null);

    try {
      const success = await updateLessonProgress(
        user.id,
        activeItem.lesson.id,
        !wasCompleted
      );
      if (!success) {
        setError("Could not save lesson progress. Please try again.");
        return;
      }

      const nextCompleted = new Set(completedLessons);
      if (wasCompleted) nextCompleted.delete(activeItem.lesson.id);
      else nextCompleted.add(activeItem.lesson.id);
      setCompletedLessons(nextCompleted);

      const percentage = orderedLessons.length === 0
        ? 0
        : Math.round((nextCompleted.size / orderedLessons.length) * 100);
      await updateEnrollmentProgress(user.id, courseId, percentage);
    } finally {
      setSaving(false);
    }
  };

  const handleQuizComplete = async (quizId: string, score: number, answers: Record<string, number>) => {
    if (!user?.id || !quizId) return;

    try {
      await saveQuizAttempt(user.id, quizId, score, answers);
      setQuizScoresById(current => ({ ...current, [quizId]: score }));
    } catch (quizError) {
      setError(quizError instanceof Error ? quizError.message : "Quiz score could not be saved.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-500" />
          <p className="text-sm font-semibold text-slate-600">Initializing your interactive workspace…</p>
        </div>
      </div>
    );
  }

  if (!course || !activeItem) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-center text-slate-900">
        <div className="max-w-md p-8 rounded-3xl bg-white border border-slate-200 shadow-xl">
          <div className="text-5xl">📚</div>
          <h1 className="mt-4 text-2xl font-black text-slate-900">Course modules are being compiled</h1>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">This course curriculum is currently undergoing final verification checks.</p>
          <button onClick={() => setLocation("/browse")} className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-2.5 text-xs font-black text-slate-950 hover:scale-105 transition cursor-pointer shadow-md shadow-cyan-500/20">Explore Catalog</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-slate-50 text-slate-900 overflow-hidden select-none">
      <CourseProgressBar
        course={course}
        completedCount={completedLessons.size}
        totalCount={orderedLessons.length}
        onDashboard={() => setLocation("/dashboard")}
        showAiPanel={showAiPanel}
        onToggleAiPanel={() => setShowAiPanel(prev => !prev)}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(prev => !prev)}
      />

      {error && <div className="shrink-0 border-b border-red-200 bg-red-50 px-5 py-2 text-center text-xs font-bold text-red-700">{error}</div>}

      {allLessonsComplete && (
        <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-200 bg-cyan-50 px-5 py-2.5 text-xs text-slate-900 shadow-sm">
          <span className="font-extrabold flex items-center gap-2">
            <span className="text-base">🎉</span>
            <span className="text-slate-800">All curriculum lessons completed! Clear the proctored assessment to claim your certificate.</span>
          </span>
          <button onClick={() => setLocation(`/final-exam/${courseId}`)} className="shrink-0 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-4 py-1.5 text-xs font-black text-slate-950 transition shadow-md cursor-pointer">
            Take Final Exam
          </button>
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[1700px] flex-1 min-h-0 flex-col lg:flex-row lg:overflow-hidden overflow-y-auto">
        <ModuleSidebar
          modules={course.modules || []}
          completedLessons={completedLessons}
          activeLessonId={activeLessonId}
          courseId={courseId}
          quizScoresById={quizScoresById}
          onSelectLesson={(_moduleId, lessonId) => {
            setActiveLessonId(lessonId);
            window.scrollTo(0, 0);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((current) => !current)}
        />
        <LessonContent
          course={course}
          module={activeItem.module}
          lesson={activeItem.lesson}
          isCompleted={completedLessons.has(activeItem.lesson.id)}
          isModuleComplete={activeModuleComplete}
          onToggleComplete={handleToggleComplete}
          saving={saving}
          onPrevious={() => selectLessonAt(activeIndex - 1)}
          onNext={() => selectLessonAt(activeIndex + 1)}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          quizScoresById={quizScoresById}
          onQuizComplete={handleQuizComplete}
        />
        {showAiPanel && (
          <AIChatPanel
            key={activeItem.lesson.id}
            lesson={activeItem.lesson}
            courseTitle={course?.title}
            moduleTitle={activeItem.module?.title}
            planType={user?.plan_type}
          />
        )}
      </div>
    </div>
  );

}
