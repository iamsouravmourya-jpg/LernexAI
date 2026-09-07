import { useState } from "react";
import { Link } from "wouter";
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  User, 
  ArrowRight, 
  Search, 
  ArrowLeft,
  Calendar,
  Tag,
  Share2,
  TrendingUp
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

export default function Blog() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const posts = [
    {
      id: "why-passive-video-tutorials-fail",
      title: "Why 40-Hour Video Playlists Fail (And How Live Sandboxes Fix Learning)",
      excerpt: "The cognitive illusion of competence: why watching someone else code leads to immediate paralysis when facing an empty terminal.",
      category: "Pedagogy",
      readTime: "6 min read",
      date: "Aug 28, 2026",
      author: "Sourav Maurya",
      featured: true,
      tag: "Deep Dive"
    },
    {
      id: "building-real-time-ai-tutors-with-gemini",
      title: "Architecting a Socratic AI Tutor: Prompt Chaining & Error Heuristics",
      excerpt: "How we tuned our AI model to guide students through syntax errors in Hinglish without spoiling the exact solution code.",
      category: "Engineering",
      readTime: "8 min read",
      date: "Aug 20, 2026",
      author: "Engineering Team",
      featured: false,
      tag: "AI Architecture"
    },
    {
      id: "cracking-first-developer-internship-tier-3",
      title: "The Zero-To-Offer Blueprint for Tier-3 College Engineering Students",
      excerpt: "A tactical roadmap on building proof-of-work repositories, landing remote internships, and skipping generic certificate traps.",
      category: "Careers",
      readTime: "10 min read",
      date: "Aug 12, 2026",
      author: "Sourav Maurya",
      featured: false,
      tag: "Career Guide"
    },
    {
      id: "webassembly-in-browser-code-execution",
      title: "Running Full Python & Node.js Containers Inside the Browser via Wasm",
      excerpt: "Zero-server latency: How WebContainers and WebAssembly allow instant sandboxing on desktop and low-spec smartphones.",
      category: "Engineering",
      readTime: "7 min read",
      date: "Jul 30, 2026",
      author: "Infrastructure Team",
      featured: false,
      tag: "Systems"
    },
    {
      id: "learning-react-18-by-building-mini-projects",
      title: "Stop Memorizing Hooks: Master React 18 through 12 Micro-Drills",
      excerpt: "Deconstructing useEffect dependency traps, state synchronization, and concurrent rendering by breaking isolated sandboxes.",
      category: "Tutorials",
      readTime: "5 min read",
      date: "Jul 15, 2026",
      author: "Curriculum Team",
      featured: false,
      tag: "Frontend"
    },
  ];

  const filteredPosts = posts.filter((p) => {
    const matchCat = selectedCategory === "all" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchQuery = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQuery;
  });

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
                <span>Engineering & Learning Dispatch</span>
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
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    LernexAI Engineering Blog
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Insights on <GradientText text="Code & Learning" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Engineering architectures, learning science breakdowns, and brutal career roadmaps from the makers of LernexAI.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Search & Filter Bar */}
        <section className="mx-auto max-w-7xl px-6 mb-8">
          <Reveal variant="up" delay={150}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-600" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles and guides..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 shadow-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {["all", "pedagogy", "engineering", "careers", "tutorials"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-bold capitalize transition-all ${
                      selectedCategory === cat
                        ? "bg-cyan-600 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Articles Grid */}
        <section className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, idx) => (
              <Reveal key={post.id} variant="up" delay={150 + idx * 50}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-cyan-500/40 transition-all group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="rounded-md border border-cyan-500/30 bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold text-cyan-700 uppercase">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{post.author}</span>
                    <span className="text-cyan-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                      Read Post <ArrowRight className="h-3 w-3" />
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
