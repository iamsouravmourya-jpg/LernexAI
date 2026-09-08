import { useState } from "react";
import { Link } from "wouter";
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  CheckCircle, 
  Sparkles, 
  UserCheck, 
  Download, 
  ArrowLeft,
  Server,
  KeyRound,
  Globe2
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

export default function Privacy() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadNotice = () => {
    setDownloaded(true);
    const content = "LernexAI Technologies Pvt. Ltd. - Data Privacy & Protection Policy (v2.4)\nLast Updated: September 2026\n\n1. Radical Transparency: We never sell or monetize learner personal data.\n2. Data Collected: Account credentials, learning progress, quiz records, and certificate hashes.\n3. Protection: AES-256 in transit and at rest with strict zero-trust IAM roles.\n4. Support Contact: privacy@lernex.ai";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "LernexAI-Privacy-Policy.txt";
    a.click();
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-700 font-sans relative overflow-hidden">
      <PageEffects />
      <ScrollProgress />
      <Navbar />

      <main className="relative pt-28 pb-20">
        <MeshGradientBackground />

        {/* Hero Section */}
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
                <span>Last Updated: September 2026 • Policy v2.4</span>
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
                  <Shield className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Radical Transparency
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Privacy <GradientText text="Policy" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Your learning data, project code, and identity are protected with zero compromise. We never sell or monetize student data.
                  </p>
                </div>
                <div className="shrink-0">
                  <MagneticButton onClick={handleDownloadNotice} className="text-xs">
                    <Download className="h-4 w-4" />
                    {downloaded ? "Downloaded!" : "Download Policy PDF"}
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Content Body */}
        <section className="mx-auto max-w-7xl px-6 space-y-10">
          {/* Principle Overview */}
          <Reveal variant="up" delay={150}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-cyan-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Our Core Privacy Commitment</h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    At LernexAI, your trust is paramount. Whether you run code inside our live sandbox, ask questions to our AI Tutor, or use certificate verification, we limit data use to the learning and support features you access.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 1. What Information We Collect */}
          <Reveal variant="up" delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">1. Information We Collect</h2>
                  <p className="text-xs text-slate-500">Strictly limited to what empowers your learning journey</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Account & Profile", desc: "Your full name, email address, and authentication tokens via Google or Supabase Auth." },
                  { title: "Course Progress & Sandboxes", desc: "Code edits, lesson completion timestamps, quiz results, and verified project milestone snapshots." },
                  { title: "AI Tutor Interactions", desc: "Questions asked to the AI assistant to tailor real-time hints and improve explanation accuracy." },
                  { title: "Certificate Registry", desc: "Certificate IDs, course details, assessment results, and issue dates used by the public verification page." },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 bg-slate-50 p-4 hover:border-slate-200 transition-all">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 2. How We Use Information */}
          <Reveal variant="up" delay={250}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">2. How We Use Your Information</h2>
                  <p className="text-xs text-slate-500">Purpose-driven data processing</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { num: "01", title: "Personalized Roadmap", desc: "Dynamically adapt practice drills and video recommendations based on your mastery." },
                  { num: "02", title: "Instant Doubt Resolution", desc: "Feed query context to our AI engine to generate code corrections in milliseconds." },
                  { num: "03", title: "Public Credential Verification", desc: "Render QR verification portals for recruiters and university registrars." },
                  { num: "04", title: "Platform Security", desc: "Detect unauthorized login attempts, session hijacking, and DDoS abuse automatically." },
                ].map((col) => (
                  <div key={col.num} className="rounded-xl border border-slate-100 bg-slate-50 p-5 hover:border-cyan-400 transition-all">
                    <span className="text-xs font-mono font-bold text-cyan-600">{col.num}</span>
                    <h3 className="mt-2 text-sm font-bold text-slate-900">{col.title}</h3>
                    <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{col.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 3. Your Rights & Global Standards */}
          <Reveal variant="up" delay={300}>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-200">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Right to Access & Portability</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Export all your project files, submissions, exam scores, and profile records in standard JSON or ZIP format at any time.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-4 border border-cyan-200">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Right to Erasure</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Request permanent deletion of your account and related sandbox containers. Once initiated, all personal tokens are wiped within 72 hours.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 mb-4 border border-teal-200">
                  <Globe2 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">GDPR & DPDP Compliance</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fully aligned with India's Digital Personal Data Protection (DPDP) Act and EU General Data Protection Regulation (GDPR).
                </p>
              </div>
            </div>
          </Reveal>

          {/* 4. Security Infrastructure */}
          <Reveal variant="up" delay={350}>
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Server className="h-6 w-6 text-cyan-600" />
                <h2 className="text-lg font-bold text-slate-900">Enterprise Security Architecture</h2>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                All data in transit is encrypted using TLS 1.3 with SHA-256 signatures. At rest, databases are encrypted with AES-256 keys managed in secure cloud vaults.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                {["TLS 1.3 High Encryption", "Zero-Knowledge Cloud Isolation", "Continuous Security Scanning", "Automated Daily Backups"].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-slate-700 shadow-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
