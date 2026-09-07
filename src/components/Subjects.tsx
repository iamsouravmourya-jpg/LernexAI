import { subjects } from '../data';
import { Reveal, SpotlightGrid, GradientText } from './anim';
import { ArrowUpRight } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Subjects() {
  const [, setLocation] = useLocation();

  return (
    <section id="subjects" className="relative bg-slate-100/70 dark:bg-ink-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Explore Subjects</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Find your <GradientText>thing</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            AI-curated learning paths across core technology tracks. Every course project-driven and AI-tutored.
          </p>
        </Reveal>

        <SpotlightGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject, i) => (
            <Reveal key={subject.name} variant="scale" delay={i * 70}>
              <button
                type="button"
                onClick={() => setLocation('/browse')}
                className="card-scale group flex w-full items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-5 text-left shadow-sm dark:shadow-none transition-all hover:border-cyan-500/40"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${subject.color}`}>
                  <subject.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{subject.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Practical Sandboxes</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-400 dark:text-slate-500 transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
              </button>
            </Reveal>
          ))}
        </SpotlightGrid>
      </div>
    </section>
  );
}
