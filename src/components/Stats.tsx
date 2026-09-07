import { stats } from '../data';
import { Reveal, Counter } from './anim';

export default function Stats() {
  return (
    <section className="relative bg-white dark:bg-ink-950 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100} variant="scale">
              <div className="card-scale rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/5 p-6 text-center backdrop-blur-sm shadow-sm dark:shadow-none">
                <stat.icon className="mx-auto mb-3 h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
