import { useState } from 'react';
import { faqs } from '../data';
import { Reveal, TextFill } from './anim';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-slate-100/70 dark:bg-ink-900 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">FAQ</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Got <TextFill text="questions?" className="font-extrabold" />
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            We've got answers. If we missed something, our AI tutor is always available.
          </p>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 50} variant="up">
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm dark:shadow-none transition-colors hover:border-cyan-500/30">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{faq.q}</span>
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                    {open === i ? (
                      <Minus className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    ) : (
                      <Plus className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    )}
                  </div>
                </button>
                <div
                  className="grid transition-all duration-500 ease-in-out"
                  style={{
                    gridTemplateRows: open === i ? '1fr' : '0fr',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
