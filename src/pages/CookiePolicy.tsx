import { Link } from "wouter";
import { Cookie, Sparkles, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText 
} from "@/components/anim";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-700 font-sans relative overflow-hidden">
      <PageEffects />
      <ScrollProgress />
      <Navbar />

      <main className="relative pt-28 pb-20">
        <MeshGradientBackground />

        <section className="relative mx-auto max-w-5xl px-6 py-12">
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
                <span>Last Updated: August 2026</span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                  <Cookie className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                    Cookie <GradientText text="Policy" />
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">Transparent disclosures on how we preserve your session state</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                We believe in zero ad-tech tracking. LernexAI only utilizes functional authentication tokens and sandbox storage strictly required to run your in-browser code editor and track your quiz progress.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-slate-600 text-sm leading-relaxed">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">1. Essential Authentication Cookies</h2>
                <p>These secure JWT tokens ensure your login credentials remain valid as you navigate between sandbox chapters and lesson views.</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">2. Local Storage Code Cache</h2>
                <p>We use browser IndexedDB and LocalStorage to save uncommitted code snippets locally so you never lose work if your internet connection drops.</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">3. Zero Third-Party Advertising Trackers</h2>
                <p>LernexAI does NOT sell your data, partner with predatory ad brokers, or install tracking pixels from third-party social networks.</p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
