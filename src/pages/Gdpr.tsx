import { Link } from "wouter";
import { ShieldCheck, Sparkles, ArrowLeft, Lock, UserX, Database } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText 
} from "@/components/anim";

export default function Gdpr() {
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
                <span>EU GDPR & India DPDP Act 2023</span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                    GDPR & Data <GradientText text="Protection" />
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">Complete sovereignty and cryptographic protection over your personal data</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you access LernexAI from Germany, India, or the United States, we honor universal data rights: total privacy, right to data export, and irreversible right to be forgotten.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-slate-600 text-sm leading-relaxed">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Lock className="h-5 w-5 text-cyan-600 mb-2" />
                  <h3 className="font-bold text-slate-900 mb-1">Right to Access & Export</h3>
                  <p className="text-xs text-slate-500">Export your code solutions, assessment scores, and profile records in machine-readable JSON anytime.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <UserX className="h-5 w-5 text-purple-600 mb-2" />
                  <h3 className="font-bold text-slate-900 mb-1">Right to Deletion</h3>
                  <p className="text-xs text-slate-500">Trigger irreversible account erasure with one click in Account Settings. All database rows are expunged.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Database className="h-5 w-5 text-emerald-600 mb-2" />
                  <h3 className="font-bold text-slate-900 mb-1">Zero Data Brokerage</h3>
                  <p className="text-xs text-slate-500">We never monetize learner telemetry or sell contact information to recruitment spam farms.</p>
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
