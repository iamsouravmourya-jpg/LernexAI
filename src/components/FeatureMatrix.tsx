import { featureMatrix } from '../data';
import { Reveal, TextFill } from './anim';
import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';

function MatrixCell({ value }: { value: boolean | 'partial' }) {
  if (value === true)
    return <CheckCircle2 className="mx-auto h-5 w-5 text-cyan-600 dark:text-cyan-400" />;
  if (value === 'partial')
    return <MinusCircle className="mx-auto h-5 w-5 text-amber-500/80 dark:text-amber-400/60" />;
  return <XCircle className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />;
}

export default function FeatureMatrix() {
  return (
    <section className="relative bg-slate-100/70 dark:bg-ink-900 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Feature Comparison</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            See the <TextFill text="difference" className="font-extrabold" />
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            A side-by-side breakdown of what LernexAI offers versus the competition.
          </p>
        </Reveal>

        <Reveal variant="scale">
          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-800/50 shadow-md dark:shadow-none backdrop-blur-sm">
            {/* Header row */}
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-2 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-6 py-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Feature</span>
              <span className="text-center text-sm font-extrabold text-cyan-600 dark:text-cyan-400">LernexAI</span>
              <span className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400">Udemy</span>
              <span className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400">Coursera</span>
              <span className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400">YouTube</span>
            </div>

            {/* Data rows */}
            {featureMatrix.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] items-center gap-2 px-6 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50/50 dark:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <row.icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{row.feature}</span>
                </div>
                <div className="text-center">
                  <MatrixCell value={row.lernex} />
                </div>
                <div className="text-center">
                  <MatrixCell value={row.udemy} />
                </div>
                <div className="text-center">
                  <MatrixCell value={row.coursera} />
                </div>
                <div className="text-center">
                  <MatrixCell value={row.youtube} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
