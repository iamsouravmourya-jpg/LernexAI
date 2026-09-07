import { useState } from "react";
import { Link } from "wouter";
import { 
  Code2, 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  ArrowLeft,
  Key,
  ShieldCheck,
  Zap,
  ExternalLink
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

export default function ApiDocs() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const curlVerify = `curl -X GET "https://api.lernex.ai/v1/certificates/verify?id=LXAI-2026-EXCEL-98" \\
  -H "Authorization: Bearer lxai_live_8932408923049"`;

  const jsonResponse = `{
  "valid": true,
  "certificate_id": "LXAI-2026-EXCEL-98",
  "recipient_name": "Sourav Maurya",
  "course": "Master Advanced Python & AI",
  "score": 96.5,
  "grade": "O (Outstanding)",
  "issued_at": "2026-08-15T10:30:00Z",
  "hash": "0x4f8832a884bf72910c"
}`;

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
                <span>REST API Reference • v1.4</span>
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
                  <Code2 className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Developer Platform
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    LernexAI <GradientText text="API Documentation" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Integrate program completion verification, retrieve learner progression milestones, and query course catalogs programmatically.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Endpoints Documentation */}
        <section className="mx-auto max-w-7xl px-6 space-y-8">
          {/* Certificate Verification Endpoint */}
          <Reveal variant="up" delay={150}>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700 border border-cyan-200">
                  GET
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-slate-900">/v1/certificates/verify</span>
              </div>
              <p className="text-sm text-slate-600">
                Verifies if a specific credential ID is authentic and returns the cryptographically signed ledger payload.
              </p>

              {/* cURL Request Box */}
              <div>
                <div className="flex items-center justify-between px-4 py-2 rounded-t-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  <span>Example Request (cURL)</span>
                  <button
                    onClick={() => copyCode(curlVerify, "curl")}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    {copied === "curl" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === "curl" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="p-4 rounded-b-xl bg-slate-950 border-x border-b border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                  {curlVerify}
                </pre>
              </div>

              {/* JSON Response Box */}
              <div>
                <div className="flex items-center justify-between px-4 py-2 rounded-t-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  <span>Response (200 OK)</span>
                  <button
                    onClick={() => copyCode(jsonResponse, "json")}
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                  >
                    {copied === "json" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === "json" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="p-4 rounded-b-xl bg-slate-950 border-x border-b border-slate-800 text-xs font-mono text-emerald-400 overflow-x-auto">
                  {jsonResponse}
                </pre>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
