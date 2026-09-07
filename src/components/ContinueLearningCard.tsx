import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, RotateCw, Trophy } from "lucide-react";
import { Link, useLocation } from "wouter";
import { fetchEnrolledCourses } from "@/lib/course";
import type { EnrolledCourse } from "@/lib/course";

interface ContinueLearningCardProps {
  userId: string;
  onContinueClick: (courseId: string) => void;
}

export default function ContinueLearningCard({
  userId,
  onContinueClick,
}: ContinueLearningCardProps) {
  const [, setLocation] = useLocation();
  const [course, setCourse] = useState<EnrolledCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadEnrollment() {
      setLoading(true);
      setError(null);

      try {
        const enrollments = await fetchEnrolledCourses(userId);
        if (active) setCourse(enrollments[0] ?? null);
      } catch (caughtError) {
        if (active) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Unable to load your enrolled courses."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadEnrollment();
    return () => {
      active = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-ink-900/50 p-6" aria-label="Loading latest course">
        <div className="h-40 rounded-2xl bg-white/5" />
        <div className="mt-5 h-5 w-2/3 rounded bg-white/10" />
        <div className="mt-3 h-3 w-full rounded bg-white/5" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center backdrop-blur-md">
        <RotateCw className="mx-auto h-7 w-7 text-red-400" aria-hidden="true" />
        <h3 className="mt-3 font-bold text-red-300">Could not load your active course</h3>
        <p className="mt-1 text-xs text-red-400/80">{error}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="rounded-3xl border border-dashed border-cyan-500/30 bg-cyan-950/20 p-8 text-center backdrop-blur-md">
        <BookOpen className="mx-auto h-9 w-9 text-cyan-400" aria-hidden="true" />
        <h3 className="mt-3 text-base sm:text-lg font-bold text-white">Start Your First Practical Sandbox</h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Explore our interactive tracks. Write real code in live browser runtimes with zero manual installation.
        </p>
        <Link href="/browse" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-5 py-2.5 text-xs font-black text-ink-950 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all cursor-pointer">
          <span>Browse Course Library</span>
          <ArrowRight className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const progress = Math.min(100, Math.max(0, course.enrollment_progress ?? 0));
  const isCompleted = progress >= 100;

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900/70 shadow-xl hover:border-cyan-500/40 transition-all backdrop-blur-md">
      <div className="grid sm:grid-cols-[14rem_1fr]">
        <div className="relative h-48 bg-ink-950 sm:h-full overflow-hidden">
          {course.thumbnail_url ? (
            <img src={course.thumbnail_url} alt="" className="h-full w-full object-cover opacity-85" />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl" aria-hidden="true">💻</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-transparent to-ink-900/70" />
        </div>

        <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Active Learning Track
            </span>
            {isCompleted && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                100% Complete
              </span>
            )}
          </div>

          <div>
            <h3 className="truncate text-lg sm:text-xl font-black text-white">{course.title}</h3>
            <p className="mt-0.5 text-xs text-slate-400">{course.modules?.length ?? 0} interactive units • {course.category || "Technology"}</p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Overall Progression</span>
              <span className="font-bold text-cyan-300">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5 border border-white/5" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted ? "bg-emerald-400" : "bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onContinueClick(course.id)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-4 py-2.5 text-xs font-black text-ink-950 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>{isCompleted ? "Review Live Sandboxes" : "Continue In Sandbox"}</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setLocation(`/final-exam/${course.id}`)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition cursor-pointer"
            >
              <Trophy className="h-3.5 w-3.5 text-amber-400" />
              <span>Final Exam & QR Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
