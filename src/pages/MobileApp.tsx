import { Link } from "wouter";
import { 
  Smartphone, 
  Sparkles, 
  Download, 
  ArrowLeft, 
  WifiOff, 
  Zap, 
  Bell
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

export default function MobileApp() {
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
                <span>Learn Code On The Go</span>
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
                  <Smartphone className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Progressive Web App & Native Android
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    LernexAI on <GradientText text="Your Phone" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Practice micro-drills on your metro commute, review flashcards offline, and get streak reminders straight to your lock screen.
                  </p>
                </div>
                <div className="shrink-0">
                  <button 
                    onClick={() => alert("Install prompt opened. Add to Home Screen via browser menu!")}
                    className="cursor-pointer"
                  >
                    <MagneticButton className="text-xs">
                      <Download className="h-4 w-4" />
                      Install Web App (PWA)
                    </MagneticButton>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Mobile Features Grid */}
        <section className="mx-auto max-w-7xl px-6 space-y-8">
          <Reveal variant="up" delay={150}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-4 border border-cyan-200">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Thumb-Friendly Coding Editor</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Specialized keyboard extensions for brackets, semicolons, and indentation symbols so you can write real code without finger cramps.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-200">
                  <WifiOff className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Offline Reading Cache</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Downloaded modules and cheat-sheets stay accessible even in bad underground train networks with zero data connection.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-4 border border-purple-200">
                  <Bell className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Streak Protection Alerts</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gentle daily reminders before midnight so you never break your active coding habit or lose your leaderboard standing.
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
