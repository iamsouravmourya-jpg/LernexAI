import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronsLeft, ChevronsRight, Code2, FileText, HelpCircle, PlayCircle, Award, Trophy, Layers, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import type { Lesson, Module } from "@/lib/course";

type LessonWithType = Lesson & { content_type?: string };

interface ModuleSidebarProps {
  modules: Module[];
  completedLessons: Set<string>;
  activeLessonId: string;
  courseId?: string;
  quizScoresById?: Record<string, number>;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

function LessonTypeIcon({ lesson, isActive }: { lesson: LessonWithType; isActive: boolean }) {
  const type = lesson.content_type?.toLowerCase();
  const className = `h-4 w-4 shrink-0 ${isActive ? "text-white" : ""}`;

  if (type === "video" || lesson.video_url) return <PlayCircle className={`${className} ${!isActive ? "text-indigo-600" : ""}`} aria-hidden="true" />;
  if (type === "code" || type === "coding") return <Code2 className={`${className} ${!isActive ? "text-emerald-600" : ""}`} aria-hidden="true" />;
  if (type === "quiz") return <HelpCircle className={`${className} ${!isActive ? "text-amber-600" : ""}`} aria-hidden="true" />;
  return <FileText className={`${className} ${!isActive ? "text-blue-600" : ""}`} aria-hidden="true" />;
}

export default function ModuleSidebar({
  modules,
  completedLessons,
  activeLessonId,
  courseId,
  quizScoresById = {},
  onSelectLesson,
  collapsed,
  onToggleCollapse,
}: ModuleSidebarProps) {
  const activeModuleId = modules.find((module) =>
    module.lessons?.some((lesson) => lesson.id === activeLessonId)
  )?.id;

  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  const completedCount = completedLessons.size;
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const targetCourseId = courseId || modules[0]?.course_id || "";
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    () => new Set(activeModuleId ? [activeModuleId] : modules[0] ? [modules[0].id] : [])
  );

  useEffect(() => {
    if (!activeModuleId) return;
    setExpandedModules((current) => {
      if (current.has(activeModuleId)) return current;
      const next = new Set(current);
      next.add(activeModuleId);
      return next;
    });
  }, [activeModuleId]);

  function toggleModule(moduleId: string) {
    setExpandedModules((current) => {
      const next = new Set(current);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  }

  function expandFromRail(moduleId: string) {
    onToggleCollapse();
    setExpandedModules((current) => new Set(current).add(moduleId));
  }

  return (
    <>
      <aside className={`flex-col border-r border-slate-200/80 bg-white select-none shrink-0 h-full w-full lg:w-80 ${collapsed ? "hidden lg:hidden" : "flex"}`}>
        
        {/* SIDEBAR TOP HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 bg-slate-50">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-teal-700" />
            <h2 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">Course Curriculum</h2>
          </div>
          
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden shrink-0 items-center justify-center rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-800 transition lg:inline-flex cursor-pointer"
            aria-label="Collapse course content"
            title="Collapse sidebar"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        </div>

        {/* MODULE ACCORDIONS CONTAINER */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {modules.map((module, moduleIndex) => {
            const lessons = module.lessons ?? [];
            const completed = lessons.filter((lesson) => completedLessons.has(lesson.id)).length;
            const progress = lessons.length === 0 ? 0 : Math.round((completed / lessons.length) * 100);
            const isExpanded = expandedModules.has(module.id);
            const isCurrentModule = activeModuleId === module.id;
            const quizScore = module.quiz?.id ? quizScoresById[module.quiz.id] : undefined;
            const isComplete = lessons.length > 0 && progress === 100;

            return (
              <section key={module.id} className="bg-white">
                <button
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  className={`flex w-full items-center gap-3 p-3.5 text-left transition hover:bg-slate-50 cursor-pointer ${
                    isCurrentModule ? "bg-teal-50/50" : ""
                  }`}
                  aria-expanded={isExpanded}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black transition ${
                    isComplete
                      ? "bg-emerald-600 text-white"
                      : isCurrentModule
                      ? "bg-teal-700 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}>
                    {isComplete ? <Check className="h-4 w-4 stroke-[3]" /> : moduleIndex + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="min-w-0 flex-1 truncate text-xs font-extrabold text-slate-900">
                        {module.title}
                      </span>
                      {quizScore !== undefined && (
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${
                          quizScore >= (module.quiz?.passing_score ?? 80) ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          Quiz {quizScore}%
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                      <span>{completed}/{lessons.length} lessons</span>
                      <span className="font-extrabold text-slate-700">{progress}%</span>
                    </div>

                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100 border border-slate-200">
                      <div className="h-full rounded-full bg-teal-600 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180 text-teal-700" : ""}`} />
                </button>

                {/* LESSON ITEMS LIST */}
                {isExpanded && (
                  <ul className="space-y-1 bg-slate-50/70 p-2 border-t border-slate-100">
                    {lessons.map((lesson) => {
                      const typedLesson = lesson as LessonWithType;
                      const isActive = lesson.id === activeLessonId;
                      const isCompleted = completedLessons.has(lesson.id);

                      return (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            onClick={() => onSelectLesson(module.id, lesson.id)}
                            className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? "bg-teal-700 text-white shadow-sm"
                                : isCompleted
                                ? "text-slate-800 hover:bg-slate-200/70"
                                : "text-slate-700 hover:bg-teal-50 hover:text-teal-800"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-emerald-600"}`} />
                            ) : (
                              <LessonTypeIcon lesson={typedLesson} isActive={isActive} />
                            )}

                            <span className="min-w-0 flex-1 truncate">{lesson.title}</span>

                            {lesson.duration_minutes != null && (
                              <span className={`shrink-0 text-[10px] ${isActive ? "text-teal-200" : "text-slate-400"}`}>
                                {lesson.duration_minutes}m
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}

                    {lessons.length === 0 && (
                      <li className="p-3 text-center text-xs text-slate-400">No lessons inside this module</li>
                    )}
                  </ul>
                )}
              </section>
            );
          })}
        </div>

        {/* CERTIFICATE MILESTONE FOOTER WIDGET */}
        <div className="p-3.5 border-t border-slate-200 bg-gradient-to-b from-slate-50 to-indigo-50/50 mt-auto">
          <div className="rounded-2xl border border-indigo-100 bg-white p-3 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-700">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Certificate Goal
              </span>
              <span className="text-xs font-black text-slate-900">{overallProgress}%</span>
            </div>

            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 transition-all duration-300" 
                style={{ width: `${overallProgress}%` }}
              />
            </div>

            {overallProgress >= 100 ? (
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-bold text-emerald-700 leading-tight">
                  🎉 All modules finished! Clear final exam for certificate.
                </p>
                {targetCourseId && (
                  <Link
                    href={`/final-exam/${targetCourseId}`}
                    className="w-full py-2 px-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow hover:bg-amber-300 transition-all"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Take Final Exam</span>
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-[10px] text-slate-500 font-medium leading-tight">
                Complete 100% curriculum to unlock final verified exam.
              </p>
            )}
          </div>
        </div>

      </aside>

      {/* COLLAPSED RAIL SIDEBAR */}
      {collapsed && (
        <aside className="hidden shrink-0 flex-col items-center gap-2 border-r border-slate-200 bg-white py-4 lg:flex lg:h-full lg:w-14 lg:overflow-y-auto">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
            title="Expand sidebar"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
          
          <div className="mt-2 flex flex-col items-center gap-2">
            {modules.map((module, moduleIndex) => {
              const lessons = module.lessons ?? [];
              const completed = lessons.filter((lesson) => completedLessons.has(lesson.id)).length;
              const isModuleComplete = lessons.length > 0 && completed === lessons.length;
              const isActiveModule = activeModuleId === module.id;
              
              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => expandFromRail(module.id)}
                  title={module.title}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition ${
                    isActiveModule
                      ? "bg-indigo-600 text-white shadow-sm"
                      : isModuleComplete
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  {isModuleComplete ? <Check className="h-4 w-4 stroke-[3]" /> : moduleIndex + 1}
                </button>
              );
            })}
          </div>
        </aside>
      )}
    </>
  );
}
