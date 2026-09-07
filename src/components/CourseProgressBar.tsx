import { Home, Clock3, Sparkles, Sidebar, Bot, Award } from "lucide-react";
import type { Course } from "@/lib/course";
import { Link } from "wouter";

interface CourseProgressBarProps {
  course: Course;
  completedCount: number;
  totalCount: number;
  onDashboard: () => void;
  showAiPanel?: boolean;
  onToggleAiPanel?: () => void;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

function formatDuration(minutes: number) {
  if (minutes <= 0) return "Self-paced";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (!hours) return `${remainingMinutes} min`;
  if (!remainingMinutes) return `${hours} hr`;
  return `${hours} hr ${remainingMinutes} min`;
}

export default function CourseProgressBar({
  course,
  completedCount,
  totalCount,
  onDashboard,
  showAiPanel = true,
  onToggleAiPanel,
  sidebarCollapsed = false,
  onToggleSidebar,
}: CourseProgressBarProps) {
  const safeTotal = Math.max(0, totalCount);
  const safeCompleted = Math.min(Math.max(0, completedCount), safeTotal);
  const percent = safeTotal === 0 ? 0 : Math.round((safeCompleted / safeTotal) * 100);
  
  const lessonDurationMinutes = (course.modules ?? []).reduce(
    (moduleTotal, module) =>
      moduleTotal +
      (module.lessons ?? []).reduce(
        (lessonTotal, lesson) => lessonTotal + (lesson.duration_minutes ?? 0),
        0
      ),
    0
  );
  const estimatedMinutes = lessonDurationMinutes || Math.round((course.estimated_hours || 0) * 60);

  return (
    <header className="shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 py-2.5 sm:px-6 sticky top-0 z-30 shadow-sm">
      <div className="mx-auto flex max-w-[1700px] items-center justify-between gap-3">
        
        {/* LEFT: HOME BUTTON & SIDEBAR TOGGLE */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onDashboard}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-teal-700 text-white px-3.5 py-2 text-xs font-black transition cursor-pointer shadow-xs active:scale-95"
            aria-label="Go to Home"
            title="Return to Home Dashboard"
          >
            <Home className="h-4 w-4 text-amber-300" />
            <span>Home</span>
          </button>

          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                sidebarCollapsed 
                  ? "bg-teal-50 text-teal-800 border-teal-300" 
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900"
              }`}
              title={sidebarCollapsed ? "Expand Modules Drawer" : "Collapse Modules Drawer"}
            >
              <Sidebar className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* CENTER: TITLE & BREADCRUMB TRAIL & PROGRESS */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-xl mx-auto min-w-0">
          {/* Breadcrumb trail */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 max-w-full overflow-hidden truncate">
            <Link href="/app/courses" className="hover:text-teal-600 transition truncate shrink-0">Catalog</Link>
            <span>/</span>
            <span className="text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-md font-black uppercase text-[9px] shrink-0">
              {course.category}
            </span>
            <span>/</span>
            <span className="text-slate-900 font-extrabold truncate max-w-[200px] sm:max-w-[280px]">
              {course.title}
            </span>
          </div>

          {/* PROGRESS BAR */}
          <div className="flex items-center gap-3 w-full max-w-sm mt-1">
            <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-[11px] font-black text-cyan-700 shrink-0">
              {percent}% ({safeCompleted}/{safeTotal})
            </span>
          </div>
        </div>

        {/* RIGHT: AI TUTOR TOGGLE & ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:flex items-center gap-1 text-[11px] text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-xl">
            <Clock3 className="h-3.5 w-3.5 text-amber-500" />
            {formatDuration(estimatedMinutes)}
          </span>

          {onToggleAiPanel && (
            <button
              type="button"
              onClick={onToggleAiPanel}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                showAiPanel
                  ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black border-transparent shadow-md shadow-cyan-500/20"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              <Bot className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">AI Mentor</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
