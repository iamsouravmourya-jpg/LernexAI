import { metricsROI } from '../data';
import { Reveal, Counter, SpotlightGrid, GradientText } from './anim';

export default function MetricsROI() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-ink-950 py-24">
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Real Impact</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Numbers that <GradientText>matter</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            We don't just teach. We transform careers. Here's the proof.
          </p>
        </Reveal>

        <SpotlightGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metricsROI.map((metric, i) => (
            <Reveal key={metric.label} variant="scale" delay={i * 100}>
              <div className="card-scale h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent p-7 text-center shadow-sm dark:shadow-none">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                  <metric.icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>
                <div className="mt-1 text-sm font-bold text-cyan-600 dark:text-cyan-400">{metric.label}</div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{metric.desc}</p>
              </div>
            </Reveal>
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}
