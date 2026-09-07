import { useState } from "react";
import { Link } from "wouter";
import { 
  User, 
  Mail, 
  Code, 
  Heart, 
  Target, 
  Zap, 
  GraduationCap, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Compass, 
  Lightbulb, 
  Rocket,
  ArrowLeft,
  Terminal,
  Cpu,
  Flame,
  Linkedin,
  Github,
  Twitter
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

export default function AboutFounder() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("iamsouravmaurya@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                <span>Founder & Platform Story</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Profile Card */}
          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
                {/* Avatar with cyan/emerald glowing ring */}
                <div className="relative group shrink-0">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-60 blur-md group-hover:opacity-100 transition duration-500" />
                  <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-3xl bg-slate-900 border-2 border-white shadow-2xl overflow-hidden">
                    <span className="text-5xl sm:text-6xl font-black bg-gradient-to-br from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                      S
                    </span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-500/30 text-cyan-700 text-xs font-semibold mb-3">
                    <Award className="h-3.5 w-3.5 text-cyan-600" />
                    <span>Independent Developer & Entrepreneur</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-2">
                    Sourav <GradientText text="Maurya" />
                  </h1>
                  <p className="text-cyan-600 text-base sm:text-lg font-semibold mb-4">
                    Founder & Chief Architect, LernexAI
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                    19-year-old self-taught full-stack developer and AI builder pursuing BCA at IGNOU. On a personal mission to replace passive tutorial hell with hands-on, live sandbox learning and accessible AI mentorship for every student in India.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <button
                      onClick={copyEmail}
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 px-5 py-2.5 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition-all shadow-sm"
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Email Copied!" : "iamsouravmaurya@gmail.com"}
                    </button>
                    <Link href="/contact">
                      <MagneticButton className="text-xs">
                        <Mail className="h-4 w-4" />
                        Send a Direct Note
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Story & Philosophy Grid */}
        <section className="mx-auto max-w-7xl px-6 space-y-8">
          {/* Why LernexAI Was Built */}
          <Reveal variant="up" delay={150}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-cyan-500/40 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                  <Flame className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">The Genesis: Death to Passive Watching</h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    "Like thousands of students preparing for tech jobs in tier-2 and tier-3 cities, I spent hundreds of hours watching 40-hour video playlists on YouTube. But the moment I opened an empty VS Code editor, I froze. Watching someone code is NOT learning to code. LernexAI was born out of frustration: every single concept must be accompanied by an instant live sandbox and an AI tutor that explains errors without giving away the full answer."
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Three Pillars */}
          <Reveal variant="up" delay={200}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-4 border border-cyan-200">
                  <Terminal className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Zero Setup Sandboxes</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No installing Node, Docker, or compilers. Students can write, run, and break real code directly in the browser on desktop or phone.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-200">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Socratic AI Mentorship</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our AI Tutor doesn't dump copied solutions. It asks guiding questions, highlights syntax misconceptions, and speaks fluent Hinglish and Hindi.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-4 border border-purple-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Merit-Based Credentials</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No attendance certificates. You earn credentials solely by cracking rigorous, anti-cheat assessments with public QR verification for recruiters.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Founder Principles & Tech Stack */}
          <Reveal variant="up" delay={250}>
            <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-50/80 via-white to-emerald-50/80 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-cyan-600" />
                <h2 className="text-lg font-bold text-slate-900">Built by an Engineer, for Future Engineers</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                LernexAI is engineered with modern full-stack TypeScript, React 18, Tailwind CSS, Supabase PostgreSQL, and Google Gemini Pro intelligence. It is crafted with love, immense discipline, and zero bloated venture fluff.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                {[
                  { label: "Founded By", val: "Sourav Maurya (Age 19)" },
                  { label: "Location", val: "Delhi, India / Remote" },
                  { label: "Curriculum", val: "100% Practical Sandboxes" },
                  { label: "Community", val: "Active AI Builders" }
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider">{stat.label}</span>
                    <p className="mt-1 text-sm font-bold text-slate-900">{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
