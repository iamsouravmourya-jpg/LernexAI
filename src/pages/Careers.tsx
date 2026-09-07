import { useState } from "react";
import { Link } from "wouter";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Users, 
  ArrowLeft,
  DollarSign,
  Coffee
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

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState("all");

  const openings = [
    {
      id: "eng-01",
      title: "Senior Full-Stack AI Engineer",
      dept: "engineering",
      type: "Full-Time",
      location: "Delhi NCR (Hybrid / Remote)",
      salary: "₹24L – ₹38L + Equity",
      desc: "Architect scalable sandboxes with WebAssembly and WebContainers, integrate LLM prompt chaining for real-time debugging.",
      tags: ["React 18", "Node.js", "WebAssembly", "Docker", "Gemini API"]
    },
    {
      id: "cur-02",
      title: "Lead Curriculum Architect (Python & AI/ML)",
      dept: "content",
      type: "Full-Time",
      location: "Remote (India)",
      salary: "₹18L – ₹28L",
      desc: "Design problem-driven, zero-bullshit interactive coding exercises, micro-projects, and bilingual Hinglish explanations.",
      tags: ["Python", "PyTorch", "Pedagogy", "Hinglish Tech"]
    },
    {
      id: "prod-03",
      title: "Product Designer (UI / UX)",
      dept: "design",
      type: "Full-Time",
      location: "Delhi NCR (Hybrid)",
      salary: "₹16L – ₹25L",
      desc: "Craft high-conversion, distraction-free IDE layouts, gamified mastery streaks, and micro-interactions.",
      tags: ["Figma", "Design Systems", "Prototyping", "Tailwind"]
    },
    {
      id: "dev-04",
      title: "Developer Advocate & Campus Lead",
      dept: "growth",
      type: "Full-Time",
      location: "Delhi NCR / Remote",
      salary: "₹12L – ₹18L + Performance Bonus",
      desc: "Lead student developer hackathons across tier-1, 2, and 3 engineering colleges, nurture the Discord & Telegram community.",
      tags: ["Community", "Public Speaking", "Hackathons", "Tech Content"]
    },
  ];

  const filteredJobs = selectedDept === "all" 
    ? openings 
    : openings.filter(j => j.dept === selectedDept);

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
                <span>We are Hiring • 4 Open Roles</span>
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
                  <Briefcase className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Join the Mission
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Build the Future of <GradientText text="Learning" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Help us democratize elite engineering education. We are a small, intense, high-autonomy team building tools that impact millions of ambitious students.
                  </p>
                </div>
                <div className="shrink-0">
                  <a href="#openings">
                    <MagneticButton className="text-xs">
                      View Openings
                      <ArrowRight className="h-4 w-4" />
                    </MagneticButton>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Perks Grid */}
        <section className="mx-auto max-w-7xl px-6 mb-16">
          <Reveal variant="up" delay={150}>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { icon: Zap, title: "High Autonomy", desc: "No micromanagement. You own your features from technical RFC to production deploy." },
                { icon: DollarSign, title: "Top of Market Pay", desc: "Competitive base salary with transparent equity grants for high performers." },
                { icon: Coffee, title: "Remote-First Flexibility", desc: "Work from our Bengaluru hub or anywhere in India with high-speed internet stipends." },
                { icon: Users, title: "Massive Impact", desc: "Your code runs in live sandboxes used by 50,000+ active student learners every day." },
              ].map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 mb-4 border border-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{perk.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{perk.desc}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* Job Listings Section */}
        <section id="openings" className="mx-auto max-w-7xl px-6 space-y-6">
          <Reveal variant="up" delay={200}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Current Open Positions</h2>
                <p className="text-xs text-slate-500">Direct application to founders • Fast 3-stage evaluation</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["all", "engineering", "content", "design", "growth"].map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-all ${
                      selectedDept === dept
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job, idx) => (
              <Reveal key={job.id} variant="up" delay={200 + idx * 50}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:border-cyan-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-md border border-cyan-500/30 bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold text-cyan-700 uppercase tracking-wider">
                        {job.dept}
                      </span>
                      <span className="text-xs text-emerald-600 font-bold">{job.salary}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed mb-4">{job.desc}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-cyan-600" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-emerald-600" />
                        {job.type}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.tags.map((t, i) => (
                        <span key={i} className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link href={`/contact?subject=Job Application: ${job.title}`}>
                      <MagneticButton className="text-xs">
                        Apply for Role
                        <ArrowRight className="h-3.5 w-3.5" />
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
