import { techStack, partnerLogos } from '../data';
import { Reveal, Marquee, GradientText } from './anim';

export default function TechStack() {
  return (
    <section className="relative bg-slate-100/70 dark:bg-ink-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Industry-Standard Tools</p>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Explore the <GradientText>learning stack</GradientText>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            These are the technologies used across the LernexAI app and its interactive learning workflows.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {techStack.map((tech, i) => (
            <Reveal key={tech.name} variant="scale" delay={i * 60}>
              <div className="card-scale flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 shadow-sm dark:shadow-none">
                <tech.icon className={`h-6 w-6 ${tech.color}`} />
                <span className="text-sm font-bold text-slate-900 dark:text-white">{tech.name}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Technologies marquee */}
        <div className="mt-16 border-t border-slate-200 dark:border-white/5 pt-10">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-slate-500">
            Technologies used in this app
          </p>
          <Marquee items={['React.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Git & GitHub', 'Next.js', 'REST APIs', 'Data Structures', 'SQL']} speed="slow" />
        </div>
      </div>
    </section>
  );
}
