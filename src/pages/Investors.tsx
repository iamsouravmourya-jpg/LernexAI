import { Link } from "wouter";
import { 
  TrendingUp, 
  Sparkles, 
  ArrowLeft,
  Mail
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

export default function Investors() {
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
                <span>Investor Relations & Growth</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Banner Card */}
          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-xl text-ink-950">
                  <TrendingUp className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    High-Margin AI EdTech
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Disrupting Indian <GradientText text="Technical Education" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Zero customer acquisition burn, 92% course completion rates, and an AI-native product built from the ground up for 4.2 million college coders.
                  </p>
                </div>
                <div className="shrink-0">
                  <Link href="/contact?subject=Investor Relations Inquiry">
                    <MagneticButton className="text-xs">
                      <Mail className="h-4 w-4" />
                      Connect with Founder
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Key Metrics */}
        <section className="mx-auto max-w-7xl px-6 mb-12">
          <Reveal variant="up" delay={150}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Active Learners", val: "50,000+", sub: "Organic growth across 280+ colleges" },
                { label: "Completion Rate", val: "92.4%", sub: "Compared to 6% industry edtech average" },
                { label: "Sandboxes Executed", val: "1.4M+", sub: "Zero-latency in-browser runs" },
                { label: "Gross Margin", val: "88%", sub: "Highly efficient WebAssembly architecture" },
              ].map((m, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{m.label}</span>
                  <div className="text-3xl font-black text-slate-900 mt-2 mb-1 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                    {m.val}
                  </div>
                  <p className="text-[11px] text-slate-500">{m.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Investment Thesis */}
        <section className="mx-auto max-w-7xl px-6 space-y-8">
          <Reveal variant="up" delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">The Investment Thesis: Post-Byju's Reality</h2>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  The first generation of Indian EdTech failed because it relied on high-pressure telecalling sales teams selling ₹50,000 pre-recorded video packages that had a 4% completion rate.
                </p>
                <p>
                  LernexAI takes the exact opposite approach: ultra-affordable micro-pricing (₹99 - ₹499), self-serve product-led viral loops, and 100% interactive coding sandboxes where students learn by doing.
                </p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
