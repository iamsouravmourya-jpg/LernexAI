import { problems } from '../data';
import { Reveal, TextFill } from './anim';
import { X } from 'lucide-react';

export default function Problem() {
  return (
    <section className="relative bg-slate-100/70 dark:bg-ink-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400">The Problem</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Traditional learning is <TextFill text="broken" className="font-extrabold" />
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            You've been there. We've been there. Everyone has. Here's what the old way looks like.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, i) => (
            <Reveal key={p.title} variant="up" delay={i * 100}>
              <div className="card-scale h-full rounded-2xl border border-rose-500/20 bg-rose-50/80 dark:bg-rose-500/5 p-6 shadow-sm dark:shadow-none">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                    <p.icon className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                  </div>
                  <X className="h-4 w-4 text-rose-500/60 dark:text-rose-500/40" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
