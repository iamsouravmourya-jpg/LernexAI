import { Link } from "wouter";
import { 
  Activity, 
  CheckCircle2, 
  ArrowLeft
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText 
} from "@/components/anim";

export default function StatusPage() {
  const systems = [
    { name: "Live Sandbox Compiler Fleet (WebAssembly)", status: "Operational", uptime: "99.98%" },
    { name: "Socratic AI Tutor Engine (Gemini Pro)", status: "Operational", uptime: "99.95%" },
    { name: "Public Certificate Registry & QR Hash", status: "Operational", uptime: "100.0%" },
    { name: "User Auth & Profile Synchronization", status: "Operational", uptime: "99.99%" },
    { name: "Video CDN & Interactive Assets", status: "Operational", uptime: "99.94%" },
    { name: "Payment Gateway & Automated Invoicing", status: "Operational", uptime: "100.0%" },
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
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Fully Operational</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Banner Card */}
          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-xl text-white">
                  <Activity className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 mb-3">
                    Real-Time Infrastructure Telemetry
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    LernexAI <GradientText text="System Status" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Live uptime, cluster response latencies, and service health across our globally distributed sandbox nodes.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Systems Grid */}
        <section className="mx-auto max-w-7xl px-6 space-y-4">
          {systems.map((sys, idx) => (
            <Reveal key={idx} variant="up" delay={150 + idx * 40}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{sys.name}</h3>
                    <span className="text-xs text-slate-500">90-Day Uptime: {sys.uptime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {sys.status}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
