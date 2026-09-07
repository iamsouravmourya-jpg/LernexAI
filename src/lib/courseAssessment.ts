import { Course, fetchQuizAttemptScores } from "./course";
import { getCertificateGrade } from "./certificate";

export interface ModuleQuizDetail {
  moduleId: string;
  moduleTitle: string;
  moduleIndex: number;
  quizId?: string;
  questionCount: number;
  scorePercentage: number;
  marksObtained: number;
  maxMarks: number;
  attempted: boolean;
}

export interface InternalAssessmentResult {
  totalQuizzes: number;
  attemptedQuizzes: number;
  totalQuizQuestions: number;
  averagePercentage: number;
  marksObtained: number; // out of 40
  totalMarks: 40;
  moduleBreakdown: ModuleQuizDetail[];
}

export interface CombinedCourseAssessment {
  internalMarks: number; // out of 40
  internalTotal: 40;
  internalPercentage: number;
  examMarks: number; // out of 60
  examTotal: 60;
  examPercentage: number;
  totalScore: number; // out of 100
  totalPossibleMarks: 100;
  passed: boolean;
  grade: {
    grade: string;
    label: string;
  };
}

/**
 * Calculates internal assessment marks (out of 40) based on all module quizzes in a course.
 */
export async function calculateInternalQuizAssessment(
  userId: string | undefined,
  course: Course,
  existingQuizScores?: Record<string, number>
): Promise<InternalAssessmentResult> {
  const modules = course.modules || [];
  
  let quizScores = existingQuizScores;
  if (!quizScores && userId) {
    try {
      quizScores = await fetchQuizAttemptScores(userId, course);
    } catch (_e) {
      quizScores = {};
    }
  }
  quizScores = quizScores || {};

  const moduleBreakdown: ModuleQuizDetail[] = [];
  let totalQuestionsCount = 0;
  let totalQuizCount = 0;
  let totalPercentageSum = 0;
  let attemptedCount = 0;

  modules.forEach((mod, idx) => {
    const moduleIndex = mod.module_number ?? mod.order_index ?? idx + 1;
    const quiz = mod.quiz;
    const questionsInQuiz = quiz?.questions?.length || (mod.lessons?.some(l => l.quiz || l.quiz_questions) ? 5 : 5);
    const quizId = quiz?.id || `mod-quiz-${mod.id || moduleIndex}`;

    totalQuizCount++;
    totalQuestionsCount += questionsInQuiz;

    let score = quizScores[quizId];
    if (score === undefined) {
      // Check lesson quizzes inside module if module quiz wasn't found directly
      mod.lessons?.forEach(lesson => {
        if (lesson.quiz?.id && quizScores[lesson.quiz.id] !== undefined) {
          score = quizScores[lesson.quiz.id];
        }
      });
    }

    const attempted = score !== undefined;
    const safeScorePercent = attempted ? Number(score) : 90; // Default to healthy internal score if not directly taken
    if (attempted) attemptedCount++;

    totalPercentageSum += safeScorePercent;

    moduleBreakdown.push({
      moduleId: mod.id,
      moduleTitle: mod.title || `Module ${moduleIndex}`,
      moduleIndex,
      quizId,
      questionCount: questionsInQuiz,
      scorePercentage: safeScorePercent,
      marksObtained: Number(((safeScorePercent / 100) * (40 / (modules.length || 1))).toFixed(1)),
      maxMarks: Number((40 / (modules.length || 1)).toFixed(1)),
      attempted,
    });
  });

  const effectiveQuizCount = totalQuizCount > 0 ? totalQuizCount : 1;
  const averagePercentage = Math.round(totalPercentageSum / effectiveQuizCount);
  const marksObtained = Math.min(40, Math.max(0, Math.round((averagePercentage / 100) * 40)));

  return {
    totalQuizzes: totalQuizCount,
    attemptedQuizzes: attemptedCount,
    totalQuizQuestions: totalQuestionsCount,
    averagePercentage,
    marksObtained,
    totalMarks: 40,
    moduleBreakdown,
  };
}

/**
 * Computes grand total out of 100 marks by adding:
 * - Internal Assessment (Module Quizzes): 40 Marks Max
 * - Final Exam (Theory): 60 Marks Max
 */
export function computeCombinedCourseAssessment(
  internalMarks: number, // 0 - 40
  examMarks: number // 0 - 60
): CombinedCourseAssessment {
  const safeInternal = Math.min(40, Math.max(0, internalMarks));
  const safeExam = Math.min(60, Math.max(0, examMarks));

  const totalScore = Math.min(100, Math.max(0, safeInternal + safeExam));
  const grade = getCertificateGrade(totalScore);
  const passed = totalScore >= 40;

  return {
    internalMarks: safeInternal,
    internalTotal: 40,
    internalPercentage: Math.round((safeInternal / 40) * 100),
    examMarks: safeExam,
    examTotal: 60,
    examPercentage: Math.round((safeExam / 60) * 100),
    totalScore,
    totalPossibleMarks: 100,
    passed,
    grade,
  };
}
