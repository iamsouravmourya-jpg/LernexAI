import { comparisonData } from '../data';
import { Reveal, GradientText } from './anim';
import { Check, X } from 'lucide-react';

export default function ComparisonSection() {
  return (
    <section id="compare" className="relative bg-white dark:bg-ink-950 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Why Switch</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            LernexAI vs <GradientText>everything else</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            The old way of learning is broken. Here's what changes when you switch.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* LernexAI column */}
          <Reveal variant="left">
            <div className="h-full rounded-2xl border border-cyan-500/30 bg-cyan-50/70 dark:bg-cyan-500/10 p-8 shadow-sm dark:shadow-none">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-md">
                  <span className="text-xs font-extrabold text-ink-950">LX</span>
                </div>
                <h3 className="text-xl font-extrabold text-cyan-700 dark:text-cyan-400">{comparisonData.lernex.name}</h3>
              </div>
              <div className="space-y-4">
                {comparisonData.lernex.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                      <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Others column */}
          <Reveal variant="right">
            <div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 p-8 shadow-sm dark:shadow-none">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-700">
                  <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400">??</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-700 dark:text-slate-400">{comparisonData.others.name}</h3>
              </div>
              <div className="space-y-4">
                {comparisonData.others.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                      <X className="h-3 w-3 text-rose-500 dark:text-rose-400/60" />
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
