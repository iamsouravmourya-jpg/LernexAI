import { useState } from "react";
import { Link } from "wouter";
import { 
  CheckCircle, 
  Scale, 
  Gavel, 
  Users, 
  Sparkles, 
  ArrowLeft,
  Cpu,
  BadgeCheck,
  CreditCard,
  Ban
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

export default function Terms() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const termsSections = [
    {
      id: "accounts",
      icon: Users,
      title: "1. Learner Accounts & Security",
      desc: "To access sandboxes, courses, and certifications, you must create a verified LernexAI account. You agree to safeguard your credentials and remain responsible for activities on your account.",
      points: [
        "One account per individual; sharing credentials violates academic integrity standards.",
        "You must provide accurate and verifiable legal names for official certificates.",
        "Suspicious automated login attempts will trigger multi-factor security verifications."
      ]
    },
    {
      id: "ip",
      icon: Cpu,
      title: "2. Intellectual Property & Sandbox Code",
      desc: "LernexAI courses, curriculum designs, video walkthroughs, and proprietary AI prompts are owned exclusively by LernexAI. All code authored by you in sandboxes remains 100% your own property.",
      points: [
        "Your code is yours: You retain full ownership and copyright of code written during exercises.",
        "Platform assets: You may not scrape, re-host, mirror, or reverse engineer LernexAI content.",
        "Commercial usage: You may showcase your completed projects in portfolios and commercial resumes."
      ]
    },
    {
      id: "certificates",
      icon: BadgeCheck,
      title: "3. Certificate Issuance & Examination Rules",
      desc: "Official blockchain-verifiable credentials require scoring 80% or higher on timed, anti-cheating comprehensive final assessments.",
      points: [
        "Strict anti-plagiarism heuristics monitor automated copy-pasting during final assessments.",
        "Verified digital certificates feature unique public hashes verifiable by recruiters worldwide.",
        "Certificates found to be obtained through fraudulent means will be immediately revoked."
      ]
    },
    {
      id: "payments",
      icon: CreditCard,
      title: "4. Billing, Subscriptions & Refund Guarantee",
      desc: "We provide transparent, flat-rate pricing with no hidden charges. All Pro and Lifetime plans come with a hassle-free 7-day money-back guarantee.",
      points: [
        "Subscription fees are billed periodically according to the selected plan schedule.",
        "Refund requests within 7 days of purchase are processed immediately with no questions asked.",
        "Price changes, if any, will be announced at least 30 days in advance with grandfathered options."
      ]
    },
    {
      id: "conduct",
      icon: Ban,
      title: "5. Code of Conduct & Prohibited Usage",
      desc: "Our interactive learning community thrives on mutual respect, academic honesty, and constructive collaboration.",
      points: [
        "No harassment, hate speech, or offensive content in public forums or community chat.",
        "Sandbox environments must not be used for crypto mining, denial-of-service, or malware distribution.",
        "Violations will result in immediate suspension or permanent blacklisting without refund."
      ]
    }
  ];

  const filteredSections = activeTab === "all" 
    ? termsSections 
    : termsSections.filter(s => s.id === activeTab);

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
                <span>Effective Date: September 2026</span>
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
                  <Scale className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Fair & Transparent Agreement
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Terms of <GradientText text="Service" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Clear, human-readable guidelines governing your access to LernexAI courses, interactive sandbox runtimes, and verified credentials.
                  </p>
                </div>
                <div className="shrink-0">
                  <Link href="/support">
                    <MagneticButton className="text-xs">
                      <Gavel className="h-4 w-4" />
                      Ask Legal Team
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Interactive Filter Pills */}
        <section className="mx-auto max-w-7xl px-6 mb-8">
          <Reveal variant="up" delay={150}>
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
              {[
                { id: "all", label: "All Terms" },
                { id: "accounts", label: "Accounts" },
                { id: "ip", label: "Your Code & IP" },
                { id: "certificates", label: "Certifications" },
                { id: "payments", label: "Refunds & Billing" },
                { id: "conduct", label: "Code of Conduct" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>
        </section>

        {/* Sections List */}
        <section className="mx-auto max-w-7xl px-6 space-y-6">
          {filteredSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Reveal key={sec.id} variant="up" delay={150 + idx * 50}>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-cyan-500/40 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">{sec.title}</h2>
                      <p className="text-sm text-slate-600 leading-relaxed">{sec.desc}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5 rounded-xl border border-slate-100 bg-slate-50 p-5">
                    {sec.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* Governing Law & Contact */}
          <Reveal variant="up" delay={400}>
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/50 p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">6. Dispute Resolution & Governing Law</h3>
                  <p className="text-sm text-slate-600 max-w-2xl">
                    These Terms shall be governed and construed in accordance with the laws of Bengaluru, Karnataka, India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Bengaluru.
                  </p>
                </div>
                <Link href="/contact">
                  <button className="whitespace-nowrap rounded-full border border-cyan-300 bg-white px-6 py-3 text-xs font-bold text-cyan-700 hover:bg-cyan-50 shadow-sm transition-all cursor-pointer">
                    Contact Legal Support
                  </button>
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
