import { useState } from "react";
import { Link } from "wouter";
import { 
  Users, 
  Sparkles, 
  MessageSquare, 
  ArrowLeft,
  Flame,
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

export default function Community() {
  const [activeChannel, setActiveChannel] = useState("general");

  const discussions = [
    {
      id: 1,
      title: "How I cracked a remote frontend internship at 20 using LernexAI projects",
      author: "Aditya V.",
      college: "KIIT Bhubaneswar",
      replies: 42,
      upvotes: 188,
      channel: "showcase",
      tag: "Career Win"
    },
    {
      id: 2,
      title: "Weekend Hackathon #14: Build an AI Code Reviewer in 36 Hours",
      author: "Sourav Maurya (Founder)",
      college: "LernexAI Team",
      replies: 95,
      upvotes: 312,
      channel: "hackathons",
      tag: "Live Challenge"
    },
    {
      id: 3,
      title: "Need feedback on my custom SQL query builder in Python Lesson 8",
      author: "Sneha Roy",
      college: "VIT Vellore",
      replies: 19,
      upvotes: 64,
      channel: "help",
      tag: "Code Review"
    },
    {
      id: 4,
      title: "Tips for passing the Python Certification assessment with 90%+ score",
      author: "Rohan K.",
      college: "DTU Delhi",
      replies: 28,
      upvotes: 140,
      channel: "general",
      tag: "Exam Prep"
    },
  ];

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
                <span>50,000+ Active Indian Coders</span>
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
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Lernex Developer Collective
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Community & <GradientText text="Hackathons" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Collaborate with passionate peers, join weekly build hackathons, review code, and share real job opportunities.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col gap-3">
                  <a href="https://discord.gg" target="_blank" rel="noreferrer">
                    <MagneticButton className="text-xs">
                      Join Discord Server
                      <ExternalLink className="h-3.5 w-3.5" />
                    </MagneticButton>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Live Discussion Feed */}
        <section className="mx-auto max-w-7xl px-6 space-y-6">
          <Reveal variant="up" delay={150}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500" />
                <h2 className="text-xl font-bold text-slate-900">Trending Discussions</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {["general", "showcase", "hackathons", "help"].map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setActiveChannel(ch)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                      activeChannel === ch
                        ? "bg-cyan-100 text-cyan-800 border border-cyan-300 shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm"
                    }`}
                  >
                    #{ch}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {discussions.map((d, i) => (
              <Reveal key={d.id} variant="up" delay={150 + i * 50}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="rounded-md border border-cyan-500/20 bg-cyan-50 px-2 py-0.5 text-[10px] font-bold text-cyan-700">
                        {d.tag}
                      </span>
                      <span className="text-xs text-slate-600 font-semibold">{d.author}</span>
                      <span className="text-xs text-slate-400">• {d.college}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-cyan-600 transition-colors cursor-pointer">
                      {d.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5 text-cyan-600" />
                      {d.replies} replies
                    </span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                      ▲ {d.upvotes}
                    </span>
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
