import { features } from '../data';
import { Reveal, TextFill, TiltCard, GradientText } from './anim';
import { Check } from 'lucide-react';

export default function Features() {
  return (
    <section id="features" className="relative bg-slate-50 dark:bg-ink-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Core Features</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Built for <TextFill text="real learning" className="font-extrabold" />
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Not just another video platform. Every feature is designed to make you learn faster.
          </p>
        </Reveal>

        {/* Sticky section reveal: left column stays fixed, right side scrolls */}
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1fr]">
          {/* Sticky left column */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal variant="left">
              <div className="gradient-border p-8 shadow-sm dark:shadow-none border border-slate-200 dark:border-transparent">
                <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                  The <GradientText>LernexAI</GradientText> difference
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Four technologies working together to create a learning experience that feels
                  like it was built for you — because it was. The AI adapts, the sandboxes execute,
                  the tutor explains, and the certificate verifies.
                </p>
                <div className="space-y-3">
                  {features.map((f) => (
                    <div key={f.title} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20">
                        <f.icon className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{f.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Scrolling right column */}
          <div className="space-y-8">
            {features.map((feature, i) => (
              <Reveal key={feature.title} variant="right" delay={i * 100}>
                <TiltCard maxTilt={5} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 shadow-sm dark:shadow-none">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-md">
                    <feature.icon className="h-7 w-7 text-ink-950" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{feature.desc}</p>
                  <div className="space-y-2">
                    {feature.points.map((point) => (
                      <div key={point} className="flex items-center gap-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20">
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-sm text-slate-700 dark:text-slate-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
