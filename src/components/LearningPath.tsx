import { learningPathSteps } from '../data';
import { Reveal, TextFill, TiltCard } from './anim';

export default function LearningPath() {
  return (
    <section className="relative bg-slate-100/70 dark:bg-ink-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Your Journey</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            A structured <TextFill text="path to mastery" className="font-extrabold" />
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Move from foundations to practice, assessment, and certificate verification in a clear course flow.
          </p>
        </Reveal>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[3.5rem] hidden h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent lg:block" />

          {learningPathSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 120}>
              <TiltCard maxTilt={5} className="h-full">
                <div className="h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent p-7 shadow-sm dark:shadow-none">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-md`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full bg-slate-100 dark:bg-white/5 px-3 py-1 text-xs font-bold text-slate-600 dark:text-slate-400">
                      {step.week}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{step.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
