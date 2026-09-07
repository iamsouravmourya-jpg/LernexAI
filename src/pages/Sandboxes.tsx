import { useState } from "react";
import { Link } from "wouter";
import { 
  Terminal, 
  Sparkles, 
  Play, 
  RotateCcw, 
  ArrowLeft,
  Copy,
  Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText 
} from "@/components/anim";

export default function Sandboxes() {
  const [activeLang, setActiveLang] = useState<"python" | "javascript" | "c" | "java" | "sql">("c");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('Click "Run Code" to compile in the cloud sandbox...');
  const [copied, setCopied] = useState(false);

  const snippets = {
    c: `// Low-Level C (GCC 13.2 System Architecture Sandbox)
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

int main() {
    printf("⚡ Direct Hardware & RAM Pointer Manipulation\\n");
    int *heapArray = (int *)malloc(3 * sizeof(int));
    heapArray[0] = 101;
    heapArray[1] = 202;
    heapArray[2] = 303;

    for (int i = 0; i < 3; i++) {
        printf("  [RAM Pointer *(arr + %d)]: %d\\n", i, *(heapArray + i));
    }

    free(heapArray);
    printf("✅ Heap memory safely deallocated.\\n");
    return 0;
}`,

    python: `# Python 3.12 Live WebAssembly Sandbox
def calculate_learning_velocity(drills_completed, days_active):
    velocity = (drills_completed * 1.5) / max(days_active, 1)
    return round(velocity, 2)

student = "Aman Sharma"
score = calculate_learning_velocity(42, 14)

print(f"🚀 Student: {student}")
print(f"⚡ Mastery Velocity: {score} drills/day")
print("🔥 Status: 14-Day Streak Unbroken!")`,

    java: `// Complete Core Java OOP Sandbox
public class SystemMetrics {
    public static void main(String[] args) {
        System.out.println("☕ Java Virtual Machine (JVM 21 LTS)");
        String platform = "Lernex Academy";
        int completedLessons = 76;
        double passRate = 98.4;

        System.out.println("Platform: " + platform);
        System.out.println("Active Topics: " + completedLessons);
        System.out.println("Pass Rate: " + passRate + "%");
    }
}`,

    javascript: `// Modern TypeScript / JavaScript Sandbox
const courses = [
  { title: "C Systems Architecture", learners: 12400 },
  { title: "Python AI Masterclass", learners: 18400 },
  { title: "Core Java & OOP", learners: 14200 }
];

const totalLearners = courses.reduce((acc, c) => acc + c.learners, 0);

console.log("📊 Active Lernex Platform Metrics:");
courses.forEach(c => console.log(\`  - \${c.title}: \${c.learners.toLocaleString()} students\`));
console.log(\`\\n🎯 Total Community Size: \${totalLearners.toLocaleString()} ambitious builders\`);`,

    sql: `-- High-Performance PostgreSQL Sandbox
SELECT 
    users.full_name,
    courses.course_title,
    cert.grade,
    cert.issued_at
FROM certificates cert
JOIN users ON cert.user_id = users.id
JOIN courses ON cert.course_id = courses.id
WHERE cert.grade = 'O (Outstanding)'
ORDER BY cert.issued_at DESC
LIMIT 3;`
  };

  const outputs = {
    c: `⚡ Direct Hardware & RAM Pointer Manipulation\n  [RAM Pointer *(arr + 0)]: 101\n  [RAM Pointer *(arr + 1)]: 202\n  [RAM Pointer *(arr + 2)]: 303\n✅ Heap memory safely deallocated.\n\n[GCC 13.2.0 | Execution Time: 8ms | Return Code: 0]`,
    python: `🚀 Student: Aman Sharma\n⚡ Mastery Velocity: 4.5 drills/day\n🔥 Status: 14-Day Streak Unbroken!\n\n[Finished in 42ms | Memory: 14.2MB]`,
    java: `☕ Java Virtual Machine (JVM 21 LTS)\nPlatform: Lernex Academy\nActive Topics: 76\nPass Rate: 98.4%\n\n[OpenJDK 21.0.2 | Execution Time: 24ms]`,
    javascript: `📊 Active Lernex Platform Metrics:\n  - C Systems Architecture: 12,400 students\n  - Python AI Masterclass: 18,400 students\n  - Core Java & OOP: 14,200 students\n\n🎯 Total Community Size: 45,000 ambitious builders\n\n[Finished in 18ms | V8 JIT Engine]`,
    sql: `| full_name     | course_title            | grade           | issued_at            |\n|---------------|-------------------------|-----------------|----------------------|\n| Sourav Maurya | C Systems Programming   | O (Outstanding) | 2026-08-16 11:15:00  |\n| Sneha Roy     | Python & AI Engineering | O (Outstanding) | 2026-08-15 10:30:00  |\n| Aditya V.     | Core Java & OOP Master  | O (Outstanding) | 2026-08-14 14:05:45  |\n\n(3 rows returned in 12ms)`
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput("Compiling source tree into isolated WebAssembly container...");
    setTimeout(() => {
      setIsRunning(false);
      setOutput(outputs[activeLang]);
    }, 600);
  };

  const handleReset = () => {
    setOutput('Click "Run Code" to compile in the cloud sandbox...');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                <span>Zero-Latency Browser Containers</span>
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
                  <Terminal className="h-10 w-10" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Interactive In-Browser Cloud
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Live Code <GradientText text="Sandboxes" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Write, compile, and debug real code in milliseconds without installing compilers or configuring environmental paths.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Live Interactive Code Playground */}
        <section className="mx-auto max-w-7xl px-6">
          <Reveal variant="up" delay={150}>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
              {/* Editor Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/80 px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 font-mono text-xs text-slate-400">
                    {activeLang === "c" ? "main.c" : activeLang === "java" ? "Main.java" : activeLang === "python" ? "script.py" : activeLang === "javascript" ? "app.ts" : "query.sql"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {(["c", "python", "java", "javascript", "sql"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLang(lang);
                        setOutput('Click "Run Code" to compile in the cloud sandbox...');
                      }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                        activeLang === lang
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                          : "border border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyCode}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-700"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                  <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-1.5 text-xs font-black text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-slate-950" />
                    {isRunning ? "Compiling..." : "Run Code"}
                  </button>
                </div>
              </div>

              {/* Editor Code Pane */}
              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                <div className="p-6 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto min-h-[320px]">
                  <pre className="leading-relaxed whitespace-pre-wrap">{snippets[activeLang]}</pre>
                </div>

                {/* Output Console Pane */}
                <div className="p-6 bg-slate-900 font-mono text-xs flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3 border-b border-slate-800 pb-2">
                      <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Console Output Stream</span>
                    </div>
                    <pre className="text-emerald-400 leading-relaxed whitespace-pre-wrap">{output}</pre>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>WebAssembly Sandbox v2.4</span>
                    <Link href="/browse">
                      <span className="text-cyan-400 font-bold hover:underline cursor-pointer">
                        Enroll in Courses with Sandboxes →
                      </span>
                    </Link>
                  </div>
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
