import { certificateFeatures } from '../data';
import { Reveal, TiltCard, GradientText } from './anim';
import { QrCode, GraduationCap } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Certificate() {
  const [, setLocation] = useLocation();
  return (
    <section className="relative bg-slate-50 dark:bg-ink-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: certificate mockup */}
          <Reveal variant="left">
            <TiltCard maxTilt={10} className="relative">
              <div className="overflow-hidden rounded-2xl border-2 border-amber-500/30 dark:border-amber-500/20 bg-gradient-to-br from-amber-50/90 via-white to-amber-100/60 dark:from-ink-900 dark:to-ink-800 p-8 shadow-xl dark:shadow-2xl">
                {/* Certificate header */}
                <div className="mb-6 flex items-center justify-between border-b border-amber-500/20 dark:border-amber-500/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-md">
                      <GraduationCap className="h-5 w-5 text-ink-950" />
                    </div>
                    <span className="font-serif-certificate text-lg font-bold text-slate-900 dark:text-white">LernexAI</span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 dark:text-amber-400">Certificate of Completion</span>
                </div>

                {/* Certificate body */}
                <div className="text-center">
                  <p className="font-serif-certificate text-sm text-slate-600 dark:text-slate-400">This certifies that</p>
                  <p className="font-serif-certificate my-2 text-2xl font-bold text-slate-900 dark:text-white">Arjun Mehta</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">has successfully completed</p>
                  <p className="font-serif-certificate my-2 text-xl font-bold text-amber-700 dark:text-amber-400">Full-Stack MERN Development</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">with distinction · 14 weeks · score 94%</p>
                </div>

                {/* Certificate footer */}
                <div className="mt-6 flex items-end justify-between border-t border-amber-500/20 dark:border-amber-500/10 pt-4">
                  <div>
                    <p className="font-serif-certificate text-sm italic text-slate-700 dark:text-slate-400">Aman Khanna</p>
                    <p className="text-xs text-slate-500">Lead Instructor</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-amber-500/30 dark:border-amber-500/20 bg-amber-500/10 dark:bg-amber-500/5">
                      <QrCode className="h-12 w-12 text-amber-700 dark:text-amber-400" />
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500">Scan to verify</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif-certificate text-sm italic text-slate-700 dark:text-slate-400">LernexAI</p>
                    <p className="text-xs text-slate-500">Issued 2024</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Right: description */}
          <div>
            <Reveal variant="right">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Certificates That Matter</p>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Proof of <GradientText>real skill completion</GradientText>
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Every certificate is cryptographically signed, QR-verifiable, and linked to a public
                page. When you walk into an interview, your skills are provable.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {certificateFeatures.map((feature, i) => (
                <Reveal key={feature.text} delay={i * 100} variant="right">
                  <div className="card-scale flex items-center gap-4 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 p-4 shadow-sm dark:shadow-none">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                      <feature.icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{feature.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal variant="right" delay={400} className="mt-6">
              <button
                onClick={() => setLocation('/verify')}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-xs font-bold text-amber-700 dark:text-amber-300 transition-colors hover:bg-amber-500/20"
              >
                <QrCode className="h-4 w-4" />
                Verify Certificate Portal
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
