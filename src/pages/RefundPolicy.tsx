import { Link } from "wouter";
import { DollarSign, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText 
} from "@/components/anim";

export default function RefundPolicy() {
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
                <span>7-Day Unconditional Guarantee</span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <DollarSign className="h-7 w-7" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                    Refund <GradientText text="Policy" />
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500">Simple, student-friendly 100% money back guarantee</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                At LernexAI, we stand behind the quality of our interactive curriculum. If you purchase any Pro subscription or verified certificate and are not 100% satisfied, we will issue a full refund.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={150}>
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm text-slate-600 text-sm leading-relaxed">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">7-Day No-Questions-Asked Refund Window</h3>
                  <p className="text-xs text-emerald-800">
                    Submit a refund ticket through <Link href="/support" className="underline font-bold text-emerald-900">Help Center</Link> within 7 days of purchase. Your UPI / card transaction will be reversed within 3-5 business days.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">1. Certificate Purchase Guarantees</h2>
                <p>If you purchase a certificate upgrade and fail the assessment, you receive 3 free re-examination attempts. If you still choose not to continue, you are eligible for an immediate refund prior to final credential issuance.</p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">2. Processing Time & Channels</h2>
                <p>Refunds are initiated via Razorpay or Stripe directly back to your original payment method (Google Pay, PhonePe, Paytm, Debit/Credit card).</p>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
