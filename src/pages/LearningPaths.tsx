import { Link } from "wouter";
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Clock, 
  Code2, 
  Cpu, 
  Database
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText, 
  MagneticButton 
} from "@/components/anim";

export default function LearningPaths() {
  const paths = [
    {
      id: "fullstack",
      title: "Full-Stack Web & SaaS Architect",
      icon: Code2,
      duration: "14 Weeks • 95 Sandboxes",
      level: "Beginner to Production",
      desc: "Go from HTML/CSS primitives to building production-grade Next.js, Express, and PostgreSQL web platforms with user auth and Stripe payments.",
      skills: ["React 18", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Docker"],
      projects: ["Real-time Chat App", "Micro-SaaS Billing Engine", "Interactive Code Sandbox"]
    },
    {
      id: "ai-engineer",
      title: "Generative AI & Python Master",
      icon: Cpu,
      duration: "12 Weeks • 80 Sandboxes",
      level: "Intermediate",
      desc: "Learn Python from the ground up, master vector embeddings, build RAG pipelines with LangChain and Google Gemini, and deploy LLM applications.",
      skills: ["Python 3.12", "FastAPI", "Gemini API", "Vector DBs", "Prompt Chaining", "PyTorch"],
      projects: ["Socratic Code Tutor", "Multi-Document Q&A Bot", "Automated GitHub PR Reviewer"]
    },
    {
      id: "data-science",
      title: "Data Science & Algorithmic Insights",
      icon: Database,
      duration: "10 Weeks • 65 Sandboxes",
      level: "Beginner to Advanced",
      desc: "Master data cleaning, exploratory analysis with Pandas, complex statistical modeling, and interactive visualization dashboards.",
      skills: ["NumPy", "Pandas", "Matplotlib", "Scikit-Learn", "SQL Joins", "Data Storytelling"],
      projects: ["Crypto Market Predictor", "E-Commerce Churn Analysis", "Automated PDF Report Engine"]
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-700 font-sans relative overflow-hidden">
      <PageEffects />
      <ScrollProgress />
      <Navbar />

      <main className="relative pt-28 pb-20">
        <MeshGradientBackground />

        {/* Top Header & Breadcrumb */}
        <section className="relative mx-auto max-w-7xl px-6 py-12">
          <Reveal variant="up">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/">
                <button className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-500/60 hover:text-cyan-600">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </button>
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 px-3.5 py-1 text-xs font-semibold text-cyan-700">
                <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
                <span>Zero-To-Offer Curriculums</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Banner Card */}
          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-xl text-white">
                  <Compass className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Structured Roadmaps
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Guided <GradientText text="Learning Paths" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Stop wandering between disconnected tutorials. Follow step-by-step career tracks designed to build comprehensive proof-of-work engineering portfolios.
                  </p>
                </div>
                <div className="shrink-0">
                  <Link href="/browse">
                    <MagneticButton className="text-xs">
                      Explore All Courses
                      <ArrowRight className="h-3.5 w-3.5" />
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Career Paths Grid */}
        <section className="mx-auto max-w-7xl px-6 space-y-8">
          {paths.map((path, idx) => {
            const Icon = path.icon;
            return (
              <Reveal key={path.id} variant="up" delay={150 + idx * 60}>
                <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm hover:border-cyan-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-md border border-cyan-500/30 bg-cyan-50 px-2.5 py-0.5 text-xs font-bold text-cyan-700">
                        {path.level}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {path.duration}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 mb-2">{path.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mb-6">{path.desc}</p>

                    <div className="grid gap-4 sm:grid-cols-2 text-xs">
                      <div>
                        <span className="font-bold text-slate-900 block mb-2">Core Tech Stack:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {path.skills.map((s, i) => (
                            <span key={i} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-slate-900 block mb-2">Portfolio Capstone Projects:</span>
                        <ul className="space-y-1 text-slate-600">
                          {path.projects.map((p, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link href="/browse">
                      <MagneticButton className="text-xs w-full lg:w-auto">
                        Start Path Curriculum
                        <ArrowRight className="h-4 w-4" />
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
