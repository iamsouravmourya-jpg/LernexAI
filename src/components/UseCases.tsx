import { useCases } from '../data';
import { Reveal, SpotlightGrid, GradientText } from './anim';
import { ArrowUpRight } from 'lucide-react';

export default function UseCases() {
  return (
    <section className="relative bg-slate-50 dark:bg-ink-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Who Is It For</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Built for <GradientText>every learner</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Whether you're starting out, switching careers, or upskilling your team — LernexAI adapts to you.
          </p>
        </Reveal>

        <SpotlightGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc, i) => (
            <Reveal key={uc.title} variant="scale" delay={i * 100}>
              <div className="card-scale group h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent p-7 shadow-sm dark:shadow-none">
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${uc.accent} shadow-md`}>
                  <uc.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{uc.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{uc.desc}</p>
                <div className="flex items-center gap-2 border-t border-slate-100 dark:border-white/5 pt-4">
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{uc.stat}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-cyan-600/60 dark:text-cyan-400/60 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </Reveal>
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}
