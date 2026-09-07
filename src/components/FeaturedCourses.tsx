import { Star, Clock, Users, ArrowRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { featuredCourses } from '../data';
import { Reveal, TextFill, MagneticButton } from './anim';

export default function FeaturedCourses() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <section className="relative bg-slate-50 dark:bg-ink-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Featured Courses</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Learn from <span className="bg-gradient-to-r from-[#FF671F] via-[#0437F2] to-[#046A38] bg-clip-text text-transparent font-black">India's</span> best
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Hand-picked, project-driven courses taught by industry veterans.
            </p>
          </div>
          <MagneticButton
            primary={false}
            onClick={() => setLocation(user ? '/browse' : '/auth')}
          >
            View All Courses
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </Reveal>
      </div>

      {/* Horizontal scroll track */}
      <div
        className="no-scrollbar flex gap-6 overflow-x-auto px-6 pb-6"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="hidden md:block md:w-[calc((100vw-7.5rem)/2-1.5rem)] shrink-0" />
        {featuredCourses.map((course, i) => (
          <Reveal
            key={course.title}
            delay={i * 80}
            className="shrink-0"
          >
            <div
              className="card-scale w-[300px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900/50 shadow-md dark:shadow-none sm:w-[340px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Card header */}
              <div className={`relative h-32 bg-gradient-to-br ${course.color} p-5`}>
                <course.icon className="absolute right-4 top-4 h-16 w-16 text-white/20" />
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  {course.level}
                </span>
                <div className="absolute bottom-4 left-5 flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white bg-black/30 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                    Interactive AI Course
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">{course.title}</h3>
                <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{course.instructor}</p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-100 dark:bg-white/5 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {course.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{course.price}</span>
                    <span className="text-sm text-slate-400 dark:text-slate-500 line-through">{course.originalPrice}</span>
                  </div>
                  <button
                    onClick={() => setLocation(user ? ((course as any).id ? `/learning/${(course as any).id}` : '/browse') : '/auth')}
                    className="rounded-full bg-cyan-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-cyan-500 cursor-pointer"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
        <div className="hidden md:block md:w-6 shrink-0" />
      </div>
    </section>
  );
}
