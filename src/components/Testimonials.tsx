import { testimonials } from '../data';
import { Reveal, TextFill, GradientText } from './anim';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-white dark:bg-ink-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Platform Highlights</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            See what you can <TextFill text="do here." className="font-extrabold" />
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            A clear view of the learning tools and workflows currently available in LernexAI.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} variant="up" delay={(i % 3) * 100}>
              <div className="card-scale h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6 shadow-sm dark:shadow-none">
                <Quote className="mb-4 h-8 w-8 text-cyan-600/30 dark:text-cyan-500/30" />

                <div className="mb-4 flex gap-1">
                  {t.rating > 0 ? [...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  )) : <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">Available in the platform</span>}
                </div>

                <p className="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">"{t.text}"</p>

                <div className="flex items-center gap-3 border-t border-slate-200 dark:border-white/5 pt-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full ${t.color} text-sm font-bold text-white shadow-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Explore the <GradientText className="font-bold">available workflows</GradientText> and start with a course.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
