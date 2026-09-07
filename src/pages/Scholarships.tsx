import { useState } from "react";
import { Link } from "wouter";
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  Send
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

export default function Scholarships() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [story, setStory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                <span>100% Financial Aid Initiative</span>
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
                  <GraduationCap className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    No Ambitious Student Left Behind
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    LernexAI <GradientText text="Scholarship Fund" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    If you genuinely cannot afford our ₹99 certification fees or course enrollments due to financial hardship, we will grant you 100% free access. No questions asked.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Application Form */}
        <section className="mx-auto max-w-3xl px-6">
          <Reveal variant="up" delay={150}>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Application Received!</h2>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you {name}. Our founder Sourav Maurya reviews every scholarship application personally. You will receive an access code in your email within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aman Sharma"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aman@gmail.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">College / Institution *</label>
                    <input
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. Government Engineering College, Jabalpur"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Tell us briefly why you want to learn on LernexAI *</label>
                    <textarea
                      required
                      rows={4}
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      placeholder="Share your goals, what course you want to master, or why you need this grant..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                    />
                  </div>

                  <MagneticButton className="w-full justify-center">
                    <Send className="h-4 w-4" />
                    Submit 100% Scholarship Request
                  </MagneticButton>
                </form>
              )}
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
