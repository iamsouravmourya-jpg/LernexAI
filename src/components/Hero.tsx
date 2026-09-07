import { useEffect, useState } from 'react';
import { Sparkles, Play, ArrowRight, Star, Code2, Terminal, Compass } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { StaggeredHeadline, MagneticButton, MeshGradientBackground, Marquee } from './anim';
import { trustBadges, aiDemoSteps } from '../data';

export default function Hero() {
  const [demoStep, setDemoStep] = useState(0);
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % (aiDemoSteps.length + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-ink-950 pt-24 text-slate-900 dark:text-white">
      <MeshGradientBackground />
      <div className="absolute inset-0 tech-grid opacity-30" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: headline + CTAs */}
          <div className="hero-expand" style={{ animationDelay: '0.3s' }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">Live In-Depth Masterclasses · Interactive Browser Sandboxes</span>
            </div>

            <StaggeredHeadline
              text="Master Practical Skills with Interactive AI"
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
            />

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              No boring 20-hour video dumps. Learn by doing with in-depth interactive curriculums, live browser terminals, instant AI doubt solving, and verified QR certificates.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton onClick={() => setLocation(user ? '/dashboard' : '/auth?mode=signup')}>
                Start Learning Free
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                primary={false}
                onClick={() => setLocation('/browse')}
              >
                <Compass className="h-4 w-4" />
                Explore Masterclasses
              </MagneticButton>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                {['bg-cyan-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'].map((c, i) => (
                  <div key={i} className={`h-9 w-9 rounded-full border-2 border-white dark:border-ink-950 ${c}`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">AI-Powered Practical Learning</p>
              </div>
            </div>
          </div>

          {/* Right: live AI demo card */}
          <div className="hero-expand" style={{ animationDelay: '0.6s' }}>
            <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-ink-900/60 p-1 backdrop-blur-xl shadow-xl dark:shadow-2xl">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <div className="ml-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Terminal className="h-3.5 w-3.5" />
                  lernex-ai-tutor · live
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">AI Online</span>
                </div>
              </div>

              {/* Chat area */}
              <div className="space-y-3 px-4 pb-4">
                {aiDemoSteps.slice(0, demoStep).map((step, i) => (
                  <div
                    key={i}
                    className={`flex ${step.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                        step.type === 'user'
                          ? 'bg-cyan-600 text-white'
                          : step.type === 'code'
                          ? 'bg-slate-900 dark:bg-ink-950 font-mono text-xs text-emerald-300 border border-slate-800 dark:border-white/10'
                          : 'bg-slate-100 dark:bg-ink-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {step.type === 'code' ? (
                        <pre className="whitespace-pre-wrap">{step.text}</pre>
                      ) : (
                        <p>{step.text}</p>
                      )}
                    </div>
                  </div>
                ))}
                {demoStep <= aiDemoSteps.length && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 dark:bg-slate-500" style={{ animationDelay: '300ms' }} />
                    </div>
                    AI is typing...
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 border-t border-slate-200 dark:border-white/10 px-4 py-3">
                <Code2 className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <div className="flex-1 rounded-lg bg-slate-100 dark:bg-ink-700 px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
                  Ask anything in Hindi, English, or Hinglish...
                </div>
                <div className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-bold text-white">
                  Send
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust marquee */}
        <div className="mt-20 border-t border-slate-200 dark:border-white/5 pt-8">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
            Trusted & Accredited
          </p>
          <Marquee items={trustBadges} />
        </div>
      </div>
    </section>
  );
}
