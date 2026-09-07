import { howItWorks } from '../data';
import { Reveal, TextFill } from './anim';

export default function HowItWorks() {
  return (
    <section id="how" className="relative bg-slate-100/70 dark:bg-ink-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">How It Works</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            From zero to <TextFill text="certified" className="font-extrabold" />
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Four steps. No fluff. Just results.
          </p>
        </Reveal>

        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent lg:block" />

          {howItWorks.map((step, i) => (
            <Reveal key={step.step} variant="scale" delay={i * 120}>
              <div className="relative text-center">
                <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/10" />
                  <div className="absolute inset-2 rounded-full border-2 border-cyan-500/20" />
                  <step.icon className="relative h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 text-xs font-extrabold text-ink-950 shadow-md">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
