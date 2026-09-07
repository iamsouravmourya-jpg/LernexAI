import { useState } from "react";
import { Link } from "wouter";
import { 
  Megaphone, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  ArrowLeft,
  FileText,
  Image,
  ShieldCheck
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

export default function Press() {
  const [copiedBio, setCopiedBio] = useState(false);

  const bioText = "LernexAI is an AI-powered interactive learning platform built for Indian engineering students. Founded by 19-year-old developer Sourav Maurya, LernexAI replaces passive video playlists with zero-setup browser sandboxes and real-time Socratic AI tutoring.";

  const copyBio = () => {
    navigator.clipboard.writeText(bioText);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
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
                <span>Media & Press Resources</span>
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
                  <Megaphone className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Brand & Press Kit
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Press & <GradientText text="Media Kit" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Official logos, high-resolution brand assets, founder bio, and factual background on LernexAI for journalists and creators.
                  </p>
                </div>
                <div className="shrink-0">
                  <Link href="/contact?subject=Press Inquiry">
                    <MagneticButton className="text-xs">
                      Media Inquiries
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Quick Facts & Official Bio */}
        <section className="mx-auto max-w-7xl px-6 space-y-8">
          <Reveal variant="up" delay={150}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-bold text-slate-900">Official Company Bio</h2>
                <button
                  onClick={copyBio}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 px-4 py-1.5 text-xs font-bold text-cyan-700 hover:bg-cyan-100"
                >
                  {copiedBio ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedBio ? "Bio Copied" : "Copy Paragraph"}
                </button>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono text-xs">
                "{bioText}"
              </p>
            </div>
          </Reveal>

          {/* Brand Assets */}
          <Reveal variant="up" delay={200}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-4 border border-cyan-200">
                  <Image className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Vector Logo & Mark</h3>
                <p className="text-xs text-slate-500 mb-4">Official SVG and transparent PNGs in dark and light versions.</p>
                <div className="rounded-xl bg-slate-100 p-6 flex items-center justify-center border border-slate-200 mb-4">
                  <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                    LERNEX<span className="text-slate-900">AI</span>
                  </span>
                </div>
                <button 
                  onClick={copyBio}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Logos (.ZIP)
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-200">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Brand Guidelines</h3>
                <p className="text-xs text-slate-500 mb-4">Color hex codes, spacing rules, font pairs, and usage do's and don'ts.</p>
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 mb-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Primary Saffron</span>
                    <span className="font-mono text-orange-600 font-bold">#FF671F</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Ashoka Blue</span>
                    <span className="font-mono text-blue-600 font-bold">#0437F2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">India Green</span>
                    <span className="font-mono text-green-700 font-bold">#046A38</span>
                  </div>
                </div>
                <button 
                  onClick={copyBio}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Stylebook (PDF)
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-4 border border-purple-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Founder Headshots</h3>
                <p className="text-xs text-slate-500 mb-4">High-resolution portrait photography of Sourav Maurya for editorial print.</p>
                <div className="rounded-xl bg-slate-100 p-6 flex items-center justify-center border border-slate-200 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 flex items-center justify-center font-bold text-xl text-white shadow-sm">
                    SM
                  </div>
                </div>
                <button 
                  onClick={copyBio}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Photography
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
