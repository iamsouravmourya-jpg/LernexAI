import { pricingPlans } from '../data';
import { Reveal, MagneticButton, SpotlightGrid, GradientText } from './anim';
import { Check, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

export default function Pricing() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  return (
    <section id="pricing" className="relative bg-slate-100/70 dark:bg-ink-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Pricing</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Invest in <GradientText>yourself</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Start free. Upgrade when you're ready with one-time manual renewals.
          </p>
        </Reveal>

        <SpotlightGrid className="grid gap-6 max-w-4xl mx-auto lg:grid-cols-2">
          {pricingPlans.filter(p => p.name !== 'AI Chat Credits').map((plan, i) => (
            <Reveal key={plan.name} variant="scale" delay={i * 120}>
              <div
                className={`card-scale relative h-full rounded-2xl border p-8 shadow-sm dark:shadow-none ${
                  plan.popular
                    ? 'border-cyan-500/50 bg-cyan-50/80 dark:bg-gradient-to-b dark:from-cyan-500/10 dark:to-transparent ring-2 ring-cyan-500/20'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-1 text-xs font-bold text-ink-950 shadow-md">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{plan.desc}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">/{plan.period.replace('per ', '')}</span>
                </div>

                <div className="mt-6">
                  <MagneticButton
                    primary={plan.popular}
                    className="w-full"
                    onClick={() => {
                      if (plan.name === 'Free Plan') {
                        setLocation(user ? '/dashboard' : '/auth?mode=signup');
                      } else {
                        setLocation(user ? '/upgrade' : '/auth?mode=signup');
                      }
                    }}
                  >
                    {plan.cta}
                  </MagneticButton>
                </div>

                <div className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                        <Check className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </SpotlightGrid>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            One-time secure payments via Razorpay · Zero auto-debits · 3 bonus free days included on Pro
          </p>
        </Reveal>
      </div>
    </section>
  );
}
