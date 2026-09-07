import { useEffect, useRef, useState, useCallback } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock3, 
  ShieldQuestion, 
  Trophy, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  AlertTriangle,
  Award
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizSectionProps {
  questions: QuizQuestion[];
  passingScore?: number;
  previousScore?: number;
  timeLimitMinutes?: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: (score: number, answers: Record<string, number>) => void;
  onPassed: (score: number) => void;
  onReviewLesson?: () => void;
  onProceedNext?: () => void;
  proceedLabel?: string;
  moduleTitle?: string;
  hideInlineCard?: boolean;
}

function formatClock(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const DEFAULT_PASS_PERCENTAGE = 40; // 4 out of 10 questions = 40% minimum passing requirement
const DEFAULT_TIME_LIMIT_MINUTES = 5; // 5-minute timer for 10 questions
const MAX_QUESTIONS = 10;

// Fisher-Yates array shuffling
function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Randomizes question order AND shuffles option positions so neither can be memorized
function prepareQuizQuestions(rawQuestions: QuizQuestion[], count = MAX_QUESTIONS): QuizQuestion[] {
  if (!rawQuestions || rawQuestions.length === 0) return [];
  
  // 1. Thoroughly shuffle question order (e.g. Q1 moves to position 5)
  const shuffledQuestions = shuffleArray(rawQuestions);
  const selected = shuffledQuestions.slice(0, count);

  // 2. Also shuffle options inside each question, re-calculating the correct answer index
  return selected.map((q) => {
    const originalOptionsWithMeta = q.options.map((optionText, idx) => ({
      text: optionText,
      isCorrect: idx === q.correctAnswer,
    }));

    const shuffledOptions = shuffleArray(originalOptionsWithMeta);
    const newCorrectAnswerIndex = shuffledOptions.findIndex((item) => item.isCorrect);

    return {
      ...q,
      options: shuffledOptions.map((item) => item.text),
      correctAnswer: newCorrectAnswerIndex >= 0 ? newCorrectAnswerIndex : q.correctAnswer,
    };
  });
}

export default function QuizSection({
  questions,
  passingScore = DEFAULT_PASS_PERCENTAGE,
  previousScore,
  timeLimitMinutes = DEFAULT_TIME_LIMIT_MINUTES,
  isOpen,
  onOpenChange,
  onComplete,
  onPassed,
  onReviewLesson,
  onProceedNext,
  proceedLabel,
  moduleTitle,
  hideInlineCard = false,
}: QuizSectionProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const dialogOpen = isOpen !== undefined ? isOpen : internalOpen;

  const setDialogOpen = useCallback((open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalOpen(open);
    }
  }, [onOpenChange]);

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() => 
    prepareQuizQuestions(questions, MAX_QUESTIONS)
  );
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const deadlineRef = useRef<number | null>(null);

  const currentQuestion = activeQuestions[currentIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isAnswered = selectedAnswer !== undefined;
  const isCurrentCorrect = isAnswered && selectedAnswer === currentQuestion.correctAnswer;
  
  const correctCount = activeQuestions.filter(
    (question) => answers[question.id] === question.correctAnswer
  ).length;
  
  const score = finalScore ?? (
    activeQuestions.length === 0 ? 0 : Math.round((correctCount / activeQuestions.length) * 100)
  );

  // User passes if score is >= passingScore (or at least 60% of questions)
  const passRequirement = activeQuestions.length === 1 ? 1 : Math.ceil(activeQuestions.length * (passingScore / 100));
  const passed = score >= passingScore || correctCount >= passRequirement;

  function selectAnswer(optionIndex: number) {
    if (!currentQuestion || isAnswered) return;
    setAnswers((current) => ({ ...current, [currentQuestion.id]: optionIndex }));
  }

  const computeAndFinish = useCallback((finalAnswers: Record<string, number>) => {
    const finalCorrectCount = activeQuestions.filter(
      (question) => finalAnswers[question.id] === question.correctAnswer
    ).length;
    const calculatedScore = activeQuestions.length === 0 
      ? 0 
      : Math.round((finalCorrectCount / activeQuestions.length) * 100);

    const requiredToPass = activeQuestions.length === 1 ? 1 : Math.ceil(activeQuestions.length * (passingScore / 100));
    setFinalScore(calculatedScore);
    setSubmitted(true);
    onComplete?.(calculatedScore, finalAnswers);

    if (calculatedScore >= passingScore || finalCorrectCount >= requiredToPass) {
      onPassed(calculatedScore);
    }
  }, [activeQuestions, onComplete, onPassed, passingScore]);

  function finishQuiz() {
    if (!currentQuestion || selectedAnswer === undefined) return;
    computeAndFinish(answers);
  }

  // Resets quiz state and completely re-randomizes question order & options
  const startNewQuizAttempt = useCallback(() => {
    const freshRandomized = prepareQuizQuestions(questions, MAX_QUESTIONS);
    setActiveQuestions(freshRandomized);
    setAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
    setFinalScore(null);
    deadlineRef.current = Date.now() + timeLimitMinutes * 60 * 1000;
    setRemainingSeconds(timeLimitMinutes * 60);
  }, [questions, timeLimitMinutes]);

  function openQuiz() {
    startNewQuizAttempt();
    setDialogOpen(true);
  }

  // When dialog opens externally, initialize attempt with fresh random questions and timer
  useEffect(() => {
    if (dialogOpen && !submitted && deadlineRef.current === null) {
      startNewQuizAttempt();
    }
  }, [dialogOpen, submitted, startNewQuizAttempt]);

  // 5-Minute Countdown Timer Loop
  useEffect(() => {
    if (!dialogOpen || submitted || !timeLimitMinutes) return;

    if (deadlineRef.current === null) {
      deadlineRef.current = Date.now() + timeLimitMinutes * 60 * 1000;
      setRemainingSeconds(timeLimitMinutes * 60);
    }

    const tick = () => {
      const secondsLeft = Math.max(0, Math.round((deadlineRef.current! - Date.now()) / 1000));
      setRemainingSeconds(secondsLeft);
      if (secondsLeft <= 0) {
        computeAndFinish(answers);
      }
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [dialogOpen, submitted, timeLimitMinutes, computeAndFinish, answers]);

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <>
      {/* INLINE TRIGGER CARD (Visible directly on the lesson page) */}
      {!hideInlineCard && (
        <section className="rounded-3xl border-2 border-indigo-200/90 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 p-6 sm:p-8 shadow-xs text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 mb-3">
            <Award className="w-6 h-6" />
          </div>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Module Assessment Quiz
          </span>

          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            {moduleTitle ? `${moduleTitle} Checkpoint` : "Test Your Knowledge"}
          </h2>
          
          <p className="mt-1.5 text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            Answer <strong>{activeQuestions.length === 1 ? "1 question" : `${activeQuestions.length} randomized MCQs`}</strong> in <strong>{timeLimitMinutes} minutes</strong>. Solve at least {passRequirement} correctly ({passingScore}%) to pass and advance!
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              <Clock3 className="w-3.5 h-3.5 text-slate-500" /> {timeLimitMinutes} Minutes Timer
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pass: {passRequirement} / {activeQuestions.length} ({passingScore}%)
            </span>
            {previousScore !== undefined && (
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700">
                Best score: {previousScore}%
              </span>
            )}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={openQuiz}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-7 py-3 text-sm font-black text-white transition shadow-lg shadow-indigo-600/25 cursor-pointer"
            >
              <span>{previousScore !== undefined ? "Retake Module Quiz" : "Start Quiz Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* FULL-SCREEN PROMINENT QUIZ MODAL */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          onInteractOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => event.preventDefault()}
          className="max-h-[80vh] h-[80vh] w-full max-w-2xl flex flex-col p-0 overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl z-50"
        >
          {submitted ? (
            /* RESULT SCREEN */
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-center space-y-5">
              <div className={`mx-auto w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg ${
                passed 
                ? "bg-emerald-500 text-white shadow-emerald-500/30" 
                : "bg-amber-500 text-white shadow-amber-500/30"
              }`}>
                {passed ? <Trophy className="w-9 h-9" /> : <AlertTriangle className="w-9 h-9" />}
              </div>

              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  passed ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {passed ? "Assessment Passed 🎉" : "Assessment Incomplete ⚠️"}
                </span>

                <DialogTitle className="mt-2 text-4xl font-black tracking-tight text-slate-900">
                  {score}%
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm font-medium text-slate-600">
                  You answered <strong className="text-slate-900">{correctCount}</strong> of <strong className="text-slate-900">{activeQuestions.length}</strong> questions correctly.
                </DialogDescription>
              </div>

              {/* Status Banner */}
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed text-left ${
                passed 
                  ? "bg-emerald-50/80 border-emerald-200 text-emerald-950" 
                  : "bg-amber-50/80 border-amber-200 text-amber-950"
              }`}>
                {passed ? (
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-emerald-900 text-sm">Congratulations! Module Completed!</strong>
                      You have passed the checkpoint quiz and proven solid grasp over the module concepts. You are ready to advance!
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 text-sm">Passing Score is {passingScore}% ({activeQuestions.length === 1 ? "1/1 Question" : `${passRequirement}/${activeQuestions.length} Questions`})</strong>
                      You scored {score}%. Don't worry — review the concepts in the lesson or retake the quiz with a fresh set of randomized questions!
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                {passed ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setDialogOpen(false);
                        onProceedNext?.();
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] px-7 py-3.5 text-sm font-black text-white transition shadow-lg shadow-emerald-600/25 cursor-pointer"
                    >
                      <span>{proceedLabel || "Proceed to Next Lesson"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={startNewQuizAttempt}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-5 py-3 text-xs font-bold text-slate-700 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>Retake Quiz for Practice</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={startNewQuizAttempt}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] px-6 py-3.5 text-sm font-black text-white transition shadow-lg shadow-indigo-600/25 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Retake Quiz Now (New Questions)</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setDialogOpen(false);
                        onReviewLesson?.();
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 px-5 py-3 text-xs font-bold text-slate-700 transition cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-slate-500" />
                      <span>Re-read Lesson & Review</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* ACTIVE QUIZ QUESTION SCREEN WITH FLEX-1 BODY & FIXED FOOTER */
            <div className="flex flex-col h-full overflow-hidden min-h-0">
              {/* SCROLLABLE INNER BODY */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-5">
                {/* QUIZ TOP BAR */}
                <DialogHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black uppercase tracking-wider">
                        Question {currentIndex + 1} of {activeQuestions.length}
                      </span>
                      <span className="hidden sm:inline text-xs font-semibold text-slate-400">
                        Pass: {passRequirement} / {activeQuestions.length} ({passingScore}%)
                      </span>
                    </div>

                    {/* 5-Minute Timer Pill */}
                    {remainingSeconds !== null && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black shadow-xs transition-colors ${
                        remainingSeconds <= 60 
                          ? "bg-red-100 text-red-700 border border-red-300 animate-pulse" 
                          : remainingSeconds <= 120 
                            ? "bg-amber-100 text-amber-800 border border-amber-300" 
                            : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      }`}>
                        <Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{formatClock(remainingSeconds)} left</span>
                      </span>
                    )}
                  </div>

                  {/* Question Text */}
                  <DialogTitle className="text-base sm:text-lg font-black leading-snug text-slate-900 pt-1 text-left">
                    {currentQuestion?.question}
                  </DialogTitle>
                </DialogHeader>

                {/* Dynamic Progress Bar */}
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                  />
                </div>

                {/* 4 Options Grid */}
                <fieldset className="min-w-0">
                  <legend className="sr-only">Choose the correct answer</legend>
                  <div className="grid gap-3">
                    {currentQuestion?.options.map((optionText, optionIndex) => {
                      const isSelected = selectedAnswer === optionIndex;
                      const isCorrectOption = optionIndex === currentQuestion.correctAnswer;
                      
                      let cardStyles = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-slate-800 bg-white";
                      let letterStyles = "bg-slate-100 text-slate-600 border-slate-200";

                      if (!isAnswered && isSelected) {
                        cardStyles = "border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/20";
                        letterStyles = "bg-indigo-600 text-white border-indigo-600";
                      } else if (isAnswered) {
                        if (isCorrectOption) {
                          cardStyles = "border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20";
                          letterStyles = "bg-emerald-600 text-white border-emerald-600";
                        } else if (isSelected && !isCorrectOption) {
                          cardStyles = "border-red-400 bg-red-50 text-red-950 ring-2 ring-red-400/20";
                          letterStyles = "bg-red-600 text-white border-red-600";
                        } else {
                          cardStyles = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                          letterStyles = "bg-slate-100 text-slate-400 border-slate-200";
                        }
                      }

                      return (
                        <label 
                          key={optionIndex}
                          className={`flex items-center gap-3.5 rounded-2xl border-2 p-3.5 sm:p-4 text-sm font-bold transition duration-150 cursor-pointer select-none ${cardStyles} ${
                            isAnswered ? "cursor-default" : ""
                          }`}
                        >
                          <input 
                            type="radio"
                            name={`quiz-${currentQuestion.id}`}
                            checked={isSelected}
                            disabled={isAnswered}
                            onChange={() => selectAnswer(optionIndex)}
                            className="sr-only"
                          />
                          
                          <span className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-black shrink-0 transition ${letterStyles}`}>
                            {optionLetters[optionIndex]}
                          </span>

                          <span className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                            {optionText}
                          </span>

                          {isAnswered && isCorrectOption && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isAnswered && isSelected && !isCorrectOption && (
                            <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Immediate Feedback Card */}
                {isAnswered && (
                  <div 
                    className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                      isCurrentCorrect 
                        ? "border-emerald-200 bg-emerald-50/90 text-emerald-900" 
                        : "border-red-200 bg-red-50/90 text-red-900"
                    }`}
                    role="status"
                  >
                    <div className="flex items-center gap-1.5 font-black text-sm mb-1">
                      {isCurrentCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct Answer!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Not quite right</span>
                        </>
                      )}
                    </div>
                    {currentQuestion?.explanation && (
                      <p className="opacity-95">{currentQuestion.explanation}</p>
                    )}
                  </div>
                )}
              </div>

              {/* FIXED BOTTOM ACTION BAR */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0 z-10 rounded-b-3xl">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentIndex < activeQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((idx) => idx + 1)}
                    disabled={!isAnswered}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 text-xs font-black text-white transition shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finishQuiz}
                    disabled={!isAnswered}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed px-6 py-2.5 text-xs font-black text-white transition shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <span>Finish Quiz & See Score</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
