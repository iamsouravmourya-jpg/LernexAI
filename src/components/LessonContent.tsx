import { useState, useRef, useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Clock3, 
  Code2, 
  Copy, 
  FileText, 
  HelpCircle, 
  Loader2, 
  PlayCircle, 
  Sparkles,
  Award,
  Video
} from "lucide-react";
import type { Course, Lesson, Module } from "@/lib/course";
import QuizSection from "@/components/QuizSection";
import InteractiveSandbox from "@/components/InteractiveSandbox";

type LessonWithType = Lesson & { content_type?: string };

interface LessonContentProps {
  course: Course;
  module: Module;
  lesson: Lesson;
  isCompleted: boolean;
  isModuleComplete: boolean;
  onToggleComplete: () => void;
  saving: boolean;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  quizScoresById?: Record<string, number>;
  onQuizComplete: (quizId: string, score: number, answers: Record<string, number>) => void;
}

function CodeBlockWithCopy({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative my-5 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-xl group">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-bold text-slate-300">Code Snippet</span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy Code"}</span>
        </button>
      </div>

      <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-indigo-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded-md bg-indigo-50 px-1.5 py-0.5 font-mono text-xs font-bold text-indigo-700 border border-indigo-100">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-black text-slate-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderContent(content: string) {
  if (content.includes("<div") || content.includes("<p>") || content.includes("<table") || content.includes("class=")) {
    return (
      <div 
        className="coursegenie-lesson-html prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const lines = content.split("\n");
  const elements: ReactNode[] = [];
  let codeLines: string[] | null = null;
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={`list-${elements.length}`} className="my-4 space-y-2 text-slate-700 text-xs sm:text-sm">
        {listItems.map((item, index) => (
          <li key={index} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex];

    if (line.trim().startsWith("|") && lines[lineIndex + 1]?.trim().match(/^\|?[\s:|-]+\|?$/)) {
      flushList();
      const headers = line.split("|").map(cell => cell.trim()).filter(Boolean);
      const rows: string[][] = [];
      lineIndex += 2;
      while (lineIndex < lines.length && lines[lineIndex].trim().startsWith("|")) {
        rows.push(lines[lineIndex].split("|").map(cell => cell.trim()).filter(Boolean));
        lineIndex += 1;
      }
      lineIndex -= 1;
      elements.push(
        <div key={`table-${lineIndex}`} className="my-5 overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 font-bold text-slate-900">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-4 py-3">{renderInline(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50/50">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 text-slate-700">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.trim().startsWith("```")) {
      flushList();
      if (codeLines === null) {
        codeLines = [];
      } else {
        elements.push(<CodeBlockWithCopy key={`code-${lineIndex}`} code={codeLines.join("\n")} />);
        codeLines = null;
      }
      continue;
    }

    if (codeLines !== null) {
      codeLines.push(line);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      listItems.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }
    flushList();

    if (line.startsWith("### ")) {
      elements.push(<h3 key={lineIndex} className="mb-2 mt-6 text-base sm:text-lg font-black text-slate-900">{renderInline(line.slice(4))}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={lineIndex} className="mb-3 mt-8 text-lg sm:text-xl font-black text-slate-900 border-b border-slate-100 pb-2">{renderInline(line.slice(3))}</h2>);
    } else if (line.startsWith("# ")) {
      elements.push(<h1 key={lineIndex} className="mb-3 mt-8 text-xl sm:text-2xl font-black text-slate-900">{renderInline(line.slice(2))}</h1>);
    } else if (line.trim()) {
      elements.push(<p key={lineIndex} className="my-3 leading-relaxed text-xs sm:text-sm text-slate-700 font-medium">{renderInline(line)}</p>);
    }
  }

  flushList();
  if (codeLines !== null) {
    elements.push(<CodeBlockWithCopy key="code-final" code={codeLines.join("\n")} />);
  }
  return elements;
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");
    let videoId = "";
    if (host === "youtu.be") videoId = parsed.pathname.slice(1).split("/")[0];
    if (host === "youtube.com" || host === "m.youtube.com") {
      videoId = parsed.pathname.startsWith("/shorts/")
        ? parsed.pathname.split("/")[2]
        : parsed.searchParams.get("v") ?? "";
    }
    return videoId ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` : null;
  } catch {
    return null;
  }
}

function extractCodeSnippet(content: string, courseTitle?: string): string | null {
  if (!content) return null;
  
  // Match <pre class="starter-code"><code>...</code></pre>
  const starterMatch = content.match(/<pre[^>]*class="[^"]*starter-code[^"]*"[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);
  if (starterMatch && starterMatch[1]) {
    return cleanHtmlEntities(starterMatch[1]);
  }

  // Match code-editor code block
  const editorMatch = content.match(/<div[^>]*class="[^"]*code-editor[^"]*"[^>]*>[\s\S]*?<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);
  if (editorMatch && editorMatch[1]) {
    return cleanHtmlEntities(editorMatch[1]);
  }

  // Match any pre code block
  const preMatch = content.match(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);
  if (preMatch && preMatch[1]) {
    return cleanHtmlEntities(preMatch[1]);
  }

  // Fallback if markdown fenced block
  const fenceMatch = content.match(/```(?:[a-z]+)?\n([\s\S]*?)```/i);
  if (fenceMatch && fenceMatch[1]) {
    return fenceMatch[1].trim();
  }

  return null;
}

function cleanHtmlEntities(str: string): string {
  return str
    .replace(/<span[^>]*>/gi, "")
    .replace(/<\/span>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractChallengeSnippet(content: string) {
  if (!content) return undefined;
  
  const challengeBlockMatch = content.match(/<div[^>]*class="[^"]*sandbox-challenge[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    || content.match(/<div[^>]*class="[^"]*practice[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  
  if (!challengeBlockMatch) return undefined;

  const raw = challengeBlockMatch[1];
  const taskMatch = raw.match(/<p[^>]*class="[^"]*challenge-task[^"]*"[^>]*>([\s\S]*?)<\/p>/i)
    || raw.match(/<p>([\s\S]*?)<\/p>/i);
  const hintMatch = raw.match(/<p[^>]*class="[^"]*challenge-hint[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
  const expectedMatch = raw.match(/<p[^>]*class="[^"]*challenge-expected[^"]*"[^>]*>([\s\S]*?)<\/p>/i);

  return {
    task: taskMatch ? cleanHtmlEntities(taskMatch[1]) : "Apply this lesson's concept in the interactive editor.",
    hint: hintMatch ? cleanHtmlEntities(hintMatch[1]).replace(/^Hint:\s*/i, "") : undefined,
    expected_output: expectedMatch ? cleanHtmlEntities(expectedMatch[1]).replace(/^Expected Output:\s*/i, "") : undefined,
  };
}

function detectLanguage(courseTitle: string, lessonTitle: string, code?: string | null): "javascript" | "python" | "html" | "java" | "c" {
  const text = `${courseTitle} ${lessonTitle} ${code || ""}`.toLowerCase();
  if (text.includes("python") || text.includes("pandas") || text.includes("numpy") || (code && (code.includes("def ") || code.includes("print(")))) {
    return "python";
  }
  if (text.includes("java") || (code && (code.includes("System.out.println") || code.includes("public static void main")))) {
    return "java";
  }
  if (text.includes(" c ") || text.includes("c language") || text.includes("c programming") || (code && (code.includes("#include <stdio.h>") || code.includes("printf(")))) {
    return "c";
  }
  if (text.includes("html") || text.includes("css") || (code && (code.includes("<!doctype") || code.includes("<html") || code.includes("<div")))) {
    return "html";
  }
  return "javascript";
}

export default function LessonContent({
  course,
  module,
  lesson,
  isCompleted,
  isModuleComplete,
  onToggleComplete,
  saving,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  quizScoresById = {},
  onQuizComplete,
}: LessonContentProps) {
  const [moduleQuizModalOpen, setModuleQuizModalOpen] = useState(false);
  const [, setLocation] = useLocation();
  const mainContainerRef = useRef<HTMLElement>(null);

  // Reset scroll position to top whenever lesson changes
  useEffect(() => {
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [lesson?.id]);

  if (!lesson || !module || !course) {
    return (
      <main className="min-w-0 flex-1 bg-slate-50 p-6 flex items-center justify-center">
        <p className="text-sm font-semibold text-slate-500">Loading lesson content...</p>
      </main>
    );
  }

  const typedLesson = lesson as LessonWithType;
  const youtubeEmbed = lesson.video_url ? getYouTubeEmbedUrl(lesson.video_url) : null;
  const isCodeLesson = ["code", "coding"].includes(typedLesson.content_type?.toLowerCase() ?? "");
  const lastLessonId = module.lessons && module.lessons.length > 0 ? module.lessons[module.lessons.length - 1].id : null;
  const isLastLessonInModule = lastLessonId === lesson.id;

  const resolvedStarterCode = typedLesson.starter_code || extractCodeSnippet(typedLesson.content || "", course.title) || undefined;
  const resolvedLanguage = typedLesson.sandbox_language || detectLanguage(course.title || "", lesson.title || "", resolvedStarterCode);
  const resolvedChallenge = typedLesson.challenge || extractChallengeSnippet(typedLesson.content || "") || undefined;
  const moduleQuiz = module.quiz;
  const lessonQuiz = lesson.quiz;
  const moduleQuizQuestions = moduleQuiz?.questions || [];
  const lessonQuizQuestions = lessonQuiz?.questions || lesson.quiz_questions || [];
  const moduleQuizScore = moduleQuiz?.id ? quizScoresById[moduleQuiz.id] : undefined;
  const lessonQuizScore = lessonQuiz?.id ? quizScoresById[lessonQuiz.id] : undefined;
  const isModuleOrLessonCompleted = isCompleted || isModuleComplete;
  const canShowModuleQuiz = isLastLessonInModule && moduleQuizQuestions.length > 0;

  const handleCompleteToggle = async () => {
    const willBeCompleted = !isCompleted;
    await onToggleComplete();
    // When user marks the final lesson of a module complete, immediately open the quiz modal on screen!
    if (willBeCompleted && isLastLessonInModule && moduleQuizQuestions.length > 0) {
      setModuleQuizModalOpen(true);
    }
  };

  const passingScore = moduleQuiz?.passing_score || 40;
  const isQuizPassed = moduleQuizScore !== undefined && moduleQuizScore >= passingScore;

  const handleNextClick = () => {
    // If on the last lesson of module and quiz isn't passed, prompt the quiz modal and prevent skipping
    if (isLastLessonInModule && moduleQuizQuestions.length > 0 && !isQuizPassed) {
      setModuleQuizModalOpen(true);
      return;
    }
    onNext();
  };

  return (
    <main ref={mainContainerRef} className="min-w-0 flex-1 bg-slate-50/70 p-4 sm:p-6 h-full overflow-y-auto">
      <article className="mx-auto max-w-4xl space-y-6">

        {/* TOP LESSON CARD CONTAINER */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-8 shadow-xs space-y-6">
          
          {/* BREADCRUMB TRAIL */}
          <nav className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
            <span className="text-slate-400 truncate max-w-[120px] sm:max-w-none">{course.title}</span>
            <span>/</span>
            <span className="text-slate-600 truncate max-w-[120px] sm:max-w-none">{module.title}</span>
            <span>/</span>
            <span className="text-teal-700 font-extrabold truncate max-w-[160px] sm:max-w-none">{lesson.title}</span>
          </nav>

          {/* LESSON TITLE & BADGES */}
          <div className="border-b border-slate-100 pb-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-extrabold border border-teal-200 flex items-center gap-1">
                  {isCodeLesson ? <Code2 className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                  <span className="capitalize">{typedLesson.content_type || (lesson.video_url ? "Video Lesson" : "Interactive Guide")}</span>
                </span>

                <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200/80 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Bite-Sized Sprint
                </span>

                {lesson.duration_minutes && (
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1">
                    <Clock3 className="w-3.5 h-3.5 text-slate-500" />
                    {lesson.duration_minutes} Minutes
                  </span>
                )}
              </div>

              {/* Status Badge */}
              {isCompleted && (
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Completed
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight bg-gradient-to-r from-teal-700 via-indigo-700 to-slate-900 bg-clip-text text-transparent">
              {lesson.title}
            </h1>
          </div>

          {/* EMBEDDED VIDEO CONTAINER */}
          {lesson.video_url && (
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-lg">
              {youtubeEmbed ? (
                <iframe
                  src={youtubeEmbed}
                  title={`${lesson.title} video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={lesson.video_url} controls className="h-full w-full" preload="metadata">
                  Your browser does not support video streaming.
                </video>
              )}
            </div>
          )}

          {/* MAIN LESSON TEXT / CONTENT AREA */}
          <div className="pt-2">
            {isCodeLesson ? (
              <InteractiveSandbox 
                initialCode={resolvedStarterCode || lesson.content} 
                defaultLanguage={resolvedLanguage}
                challenge={resolvedChallenge}
                lessonTitle={lesson.title} 
              />
            ) : (
              <>
                {renderContent(lesson.content)}

                {/* DEDICATED HANDS-ON SANDBOX SECTION */}
                <div className="pt-8 border-t border-slate-100 mt-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-200/60">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          Interactive Coding Sandbox & Playground
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Execute, test, and master this lesson's concept with real-time feedback.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                      {resolvedLanguage.toUpperCase()} RUNTIME
                    </span>
                  </div>

                  <InteractiveSandbox 
                    initialCode={resolvedStarterCode || undefined}
                    defaultLanguage={resolvedLanguage}
                    challenge={resolvedChallenge}
                    lessonTitle={lesson.title}
                  />
                </div>
              </>
            )}
          </div>

          {/* LESSON CHECKPOINT QUIZ (Only if individual lesson quiz exists and not last lesson) */}
          {lessonQuizQuestions.length > 0 && !isLastLessonInModule && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-950 space-y-1">
                <div className="flex items-center gap-2 font-black text-sm text-indigo-900">
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  Lesson Checkpoint Quiz
                </div>
                <p className="text-xs text-indigo-700/80">Test your knowledge on this lesson's key concepts.</p>
              </div>

              <QuizSection
                questions={lessonQuizQuestions}
                passingScore={lessonQuiz?.passing_score}
                previousScore={lessonQuizScore}
                timeLimitMinutes={lessonQuiz?.time_limit_minutes || 10}
                onComplete={(score, answers) => {
                  if (lessonQuiz?.id) onQuizComplete(lessonQuiz.id, score, answers);
                }}
                onPassed={() => {
                  if (!isCompleted) onToggleComplete();
                }}
              />
            </div>
          )}

          {/* MODULE QUIZ (MODAL ONLY ON DEMAND - INLINE CARD HIDDEN) */}
          {canShowModuleQuiz && (
            <QuizSection
              questions={moduleQuizQuestions}
              passingScore={moduleQuiz?.passing_score || 40}
              previousScore={moduleQuizScore}
              timeLimitMinutes={moduleQuiz?.time_limit_minutes || 10}
              isOpen={moduleQuizModalOpen}
              onOpenChange={setModuleQuizModalOpen}
              moduleTitle={module.title}
              hideInlineCard={true}
              onComplete={(score, answers) => {
                if (moduleQuiz?.id) onQuizComplete(moduleQuiz.id, score, answers);
              }}
              onPassed={() => {
                if (!isCompleted) onToggleComplete();
              }}
              onReviewLesson={() => {
                setModuleQuizModalOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              proceedLabel={!hasNext ? "Proceed to Final Exam" : "Proceed to Next Lesson"}
              onProceedNext={() => {
                setModuleQuizModalOpen(false);
                if (hasNext) {
                  onNext();
                } else {
                  setLocation(`/final-exam/${course.id}`);
                }
              }}
            />
          )}

        </div>

        {/* LESSON PROGRESSION & ACTION CARD (HIGH CONTRAST & CLEAR VISIBILITY) */}
        <div className="mt-8 rounded-3xl border-2 border-slate-900/10 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-5 sm:p-7 shadow-2xl shadow-slate-950/20 space-y-4">
          
          {/* Header & Status Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl border ${
                isCompleted 
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" 
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Clock3 className="w-5 h-5 text-slate-400" />}
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-white">
                  {isCompleted ? "Lesson Completed!" : "Lesson In Progress"}
                </h4>
                <p className="text-xs text-slate-400 font-medium">
                  {isCompleted 
                    ? "Your progress is saved. You can retake quizzes or continue to the next section."
                    : "Read through the material above, then click the green button to mark this topic complete."}
                </p>
              </div>
            </div>

            {isCompleted && (
              <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Completed
              </span>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            
            {/* Prominent Mark as Complete Button */}
            <button
              type="button"
              onClick={handleCompleteToggle}
              disabled={saving}
              className={`py-3.5 px-6 rounded-2xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 shrink-0 ${
                isCompleted
                  ? "bg-slate-800 hover:bg-slate-700 text-emerald-300 border-2 border-emerald-500/50 shadow-inner"
                  : "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/30"
              }`}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin text-current" />
              ) : (
                <Check className={`w-4 h-4 stroke-[3] ${isCompleted ? "text-emerald-400" : "text-slate-950"}`} />
              )}
              <span>
                {saving
                  ? "Saving Progress..."
                  : isCompleted
                    ? (isLastLessonInModule && moduleQuizQuestions.length > 0 ? "✓ Completed • Retake Quiz" : "✓ Completed (Click to Undo)")
                    : (isLastLessonInModule && moduleQuizQuestions.length > 0 ? "✓ Mark Complete & Open Quiz" : "✓ Mark Topic as Complete")}
              </span>
            </button>

            {/* Navigation Controls: Previous / Next / Final Exam */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onPrevious}
                disabled={!hasPrevious}
                className="flex-1 sm:flex-initial py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              {hasNext ? (
                <button
                  type="button"
                  onClick={handleNextClick}
                  className={`flex-1 sm:flex-initial py-3.5 px-5 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${
                    isLastLessonInModule && moduleQuizQuestions.length > 0 && !isQuizPassed
                      ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-indigo-500/30"
                      : "bg-white hover:bg-slate-100 text-slate-950"
                  }`}
                >
                  <span>
                    {isLastLessonInModule && moduleQuizQuestions.length > 0 && !isQuizPassed
                      ? "Take Checkpoint Quiz"
                      : "Next Lesson"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const passScore = moduleQuiz?.passing_score || 40;
                    const passed = moduleQuizScore !== undefined && moduleQuizScore >= passScore;
                    if (canShowModuleQuiz && !passed) {
                      setModuleQuizModalOpen(true);
                      return;
                    }
                    setLocation(`/final-exam/${course.id}`);
                  }}
                  className="flex-1 sm:flex-initial py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 cursor-pointer active:scale-95"
                >
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>Go to Final Exam</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>

      </article>
    </main>
  );
}

