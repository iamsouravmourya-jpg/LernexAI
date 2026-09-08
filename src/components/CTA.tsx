import { Reveal, MagneticButton, MeshGradientBackground, GradientText } from './anim';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';

export default function CTA() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <section className="relative overflow-hidden bg-slate-100/80 dark:bg-ink-950 py-24">
      <MeshGradientBackground />
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal variant="scale">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">Start your journey today</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Your future is one <br />
            <GradientText className="text-4xl sm:text-5xl lg:text-6xl">click away</GradientText>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Start learning by doing with interactive sandboxes. Start free — no credit card required.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton onClick={() => setLocation(user ? '/dashboard' : '/auth?mode=signup')}>
              Start Learning Free
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              primary={false}
              onClick={() => setLocation(user ? '/contact' : '/auth?next=/support')}
            >
              Talk to Sales
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
