import { useState } from "react";
import { 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  Code2, 
  FileText, 
  HelpCircle, 
  PlayCircle, 
  ArrowRight,
  Layers,
  Check
} from "lucide-react";
import { useLocation } from "wouter";
import { Module, Lesson } from "@/lib/course";

type LessonWithType = Lesson & { content_type?: string };

interface ModuleListProps {
  modules: Module[];
  currentModuleId?: string;
  currentLessonId?: string;
  completedLessons?: Set<string>;
  onModuleSelect?: (moduleId: string) => void;
  onLessonSelect?: (lessonId: string) => void;
  courseId?: string;
  isEnrolled?: boolean;
}

export default function ModuleList({
  modules,
  currentModuleId,
  currentLessonId,
  completedLessons = new Set(),
  onModuleSelect,
  onLessonSelect,
  courseId,
  isEnrolled = true,
}: ModuleListProps) {
  const [, setLocation] = useLocation();

  // Expand all by default for first module
  const [expandedModules, setExpandedModules] = useState<Set<string>>(() => {
    if (currentModuleId) return new Set([currentModuleId]);
    if (modules.length > 0) return new Set([modules[0].id]);
    return new Set();
  });

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
    if (onModuleSelect) {
      onModuleSelect(moduleId);
    }
  };

  const expandAll = () => {
    setExpandedModules(new Set(modules.map((m) => m.id)));
  };

  const collapseAll = () => {
    setExpandedModules(new Set());
  };

  const getModuleProgress = (module: Module) => {
    if (!module.lessons || module.lessons.length === 0) return 0;
    const completed = module.lessons.filter((l) => completedLessons.has(l.id)).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  const handleLessonClick = (lessonId: string) => {
    if (onLessonSelect) {
      onLessonSelect(lessonId);
    } else if (courseId) {
      setLocation(`/learning/${courseId}`);
    }
  };

  const getLessonIcon = (lesson: LessonWithType) => {
    const type = lesson.content_type?.toLowerCase();
    if (type === "video" || lesson.video_url) {
      return <PlayCircle className="w-4 h-4 text-teal-600" />;
    }
    if (type === "code" || type === "coding") {
      return <Code2 className="w-4 h-4 text-teal-700" />;
    }
    if (type === "quiz") {
      return <HelpCircle className="w-4 h-4 text-amber-600" />;
    }
    return <FileText className="w-4 h-4 text-slate-600" />;
  };

  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  const totalCompleted = modules.reduce((acc, m) => acc + (m.lessons?.filter(l => completedLessons.has(l.id)).length || 0), 0);

  return (
    <div className="space-y-4">
      {/* MODULE CONTROLS & OVERVIEW BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 shadow-sm">
        <div className="flex items-center gap-3 font-medium">
          <span className="flex items-center gap-1.5 text-slate-900 font-bold">
            <Layers className="w-4 h-4 text-teal-600" />
            <strong className="text-teal-700 font-extrabold">{modules.length}</strong> Modules
          </span>
          <span className="text-slate-300">•</span>
          <span>
            <strong className="text-slate-900 font-bold">{totalLessons}</strong> Hands-on Units
          </span>
          {completedLessons.size > 0 && (
            <>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {totalCompleted}/{totalLessons} Completed
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* MODULE ACCORDION LIST */}
      <div className="space-y-3">
        {modules.map((module, index) => {
          const isExpanded = expandedModules.has(module.id);
          const isCurrentModule = currentModuleId === module.id;
          const progress = getModuleProgress(module);
          const hasLessons = Boolean(module.lessons?.length);
          const isComplete = hasLessons && progress === 100;
          const lessonsCount = module.lessons?.length || 0;
          const completedCount = module.lessons?.filter(l => completedLessons.has(l.id)).length || 0;

          return (
            <div
              key={module.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white shadow-sm ${
                isCurrentModule
                  ? "border-teal-500 bg-teal-50/30 ring-1 ring-teal-500/20"
                  : isComplete
                  ? "border-emerald-200 bg-emerald-50/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* MODULE HEADER */}
              <div
                className="p-4 sm:p-5 cursor-pointer hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  {/* Module Index Badge */}
                  <div className={`w-9 h-9 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 transition-colors ${
                    isComplete
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : isCurrentModule
                      ? "bg-teal-700 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}>
                    {isComplete ? <Check className="w-4 h-4 stroke-[3] text-emerald-700" /> : String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Module {index + 1}
                      </span>
                      {isComplete && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                      {module.title}
                    </h3>
                  </div>
                </div>

                {/* Right Module Stats & Expand Icon */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex flex-col items-end text-xs">
                    <span className="font-bold text-slate-700">
                      {lessonsCount} {lessonsCount === 1 ? "Unit" : "Units"}
                    </span>
                    {hasLessons && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {completedCount}/{lessonsCount} ({progress}%)
                      </span>
                    )}
                  </div>

                  {/* Progress Pill */}
                  {hasLessons && (
                    <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200 hidden md:block">
                      <div
                        className="bg-teal-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}

                  {/* Chevron Icon */}
                  <div className={`w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center transition-transform duration-200 border border-slate-200 ${
                    isExpanded ? "rotate-180 bg-teal-100 text-teal-800 border-teal-300" : ""
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* EXPANDED LESSONS LIST */}
              {isExpanded && module.lessons && (
                <div className="border-t border-slate-200 bg-slate-50/60 p-3 sm:p-4 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                    Interactive Lessons in this Unit
                  </div>

                  <div className="space-y-1.5">
                    {module.lessons.map((lesson, lessonIdx) => {
                      const typedLesson = lesson as LessonWithType;
                      const isCompleted = completedLessons.has(lesson.id);
                      const isCurrentLesson = currentLessonId === lesson.id;

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson.id)}
                          className={`group p-3 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                            isCurrentLesson
                              ? "bg-teal-50 border-teal-300 text-slate-900 shadow-sm"
                              : isCompleted
                              ? "bg-emerald-50/50 border-emerald-200 text-slate-800 hover:border-emerald-300"
                              : "bg-white border-slate-200 text-slate-800 hover:border-teal-400 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {/* Status or Type Icon */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isCurrentLesson
                                ? "bg-teal-100 text-teal-800 border border-teal-300"
                                : isCompleted
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-slate-100 text-slate-500 group-hover:text-teal-700"
                            }`}>
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                getLessonIcon(typedLesson)
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[11px] font-bold ${isCurrentLesson ? "text-teal-800" : "text-slate-400"}`}>
                                  {index + 1}.{lessonIdx + 1}
                                </span>
                                <h4 className={`text-xs sm:text-sm font-bold truncate ${
                                  isCurrentLesson ? "text-teal-800 font-extrabold" : "text-slate-900 group-hover:text-teal-700"
                                }`}>
                                  {lesson.title}
                                </h4>
                              </div>
                            </div>
                          </div>

                          {/* Right Controls: Duration & Action Button */}
                          <div className="flex items-center gap-2 shrink-0">
                            {lesson.duration_minutes && (
                              <span className={`text-[11px] font-medium flex items-center gap-1 ${
                                isCurrentLesson ? "text-teal-800" : "text-slate-400"
                              }`}>
                                <Clock className="w-3 h-3" />
                                {lesson.duration_minutes}m
                              </span>
                            )}

                            <button
                              type="button"
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                                isCurrentLesson
                                  ? "bg-teal-700 text-white shadow-sm"
                                  : isCompleted
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                                  : "bg-slate-100 text-slate-800 hover:bg-teal-700 hover:text-white"
                              }`}
                            >
                              <span>{isCompleted ? "Review" : "Launch"}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
