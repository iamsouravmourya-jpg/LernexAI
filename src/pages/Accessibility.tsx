import { Link } from "wouter";
import { Eye, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText 
} from "@/components/anim";

export default function Accessibility() {
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
                <span>WCAG 2.1 AA Standards</span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                  <Eye className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                    Accessibility <GradientText text="Statement" />
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">Our commitment to inclusive, barrier-free coding education</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                LernexAI is engineered to ensure every prospective developer—regardless of physical, sensory, or cognitive differences—can learn, write code, and earn verified credentials without technical impediment.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-slate-600 text-sm leading-relaxed">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Screen Reader Support
                  </h3>
                  <p className="text-xs text-slate-500">All interactive elements are tagged with standard ARIA roles, landmarks, and live annunciators for terminal errors.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Full Keyboard Navigability
                  </h3>
                  <p className="text-xs text-slate-500">Complete tab focus traversal through code editor panes, execution controls, quiz answers, and home navigation links.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> High-Contrast Visual Mode
                  </h3>
                  <p className="text-xs text-slate-500">Code themes adhere to 4.5:1 minimum contrast ratios for supreme readability under strained lighting conditions.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Bilingual Audio Explanations
                  </h3>
                  <p className="text-xs text-slate-500">Our AI Tutor generates speech synthesized breakdowns of complex bugs in clear Hindi and English.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
