import { keyBenefits } from '../data';
import { Reveal, SpotlightGrid, GradientText } from './anim';

export default function KeyBenefits() {
  return (
    <section className="relative bg-slate-50 dark:bg-ink-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Why LernexAI</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Learning that actually <GradientText>sticks</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Four pillars that make us fundamentally different from every other platform.
          </p>
        </Reveal>

        <SpotlightGrid className="grid gap-6 md:grid-cols-2">
          {keyBenefits.map((benefit, i) => (
            <Reveal key={benefit.title} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 120}>
              <div className="card-scale group h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-white/5 dark:to-transparent p-8 shadow-sm dark:shadow-none">
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${benefit.accent} shadow-md`}>
                  <benefit.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{benefit.desc}</p>
              </div>
            </Reveal>
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}
