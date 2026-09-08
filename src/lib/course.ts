import { supabase, isSupabaseConfigured } from './supabase';
import { DEFAULT_COURSES } from './defaultCourses';
import { TEST_COURSES, TEST_COURSES_RECORD } from '@/courses';

export function isValidUuid(id?: string | null): boolean {
  if (!id || typeof id !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail_url?: string;
  is_premium?: boolean;
  total_modules?: number;
  estimated_hours?: number;
  created_at: string;
  modules?: Module[];
  html_content?: string;
}

export function getCustomCourses(): Course[] {
  try {
    localStorage.removeItem("lernex_custom_courses");
  } catch {}
  return [];
}

export function saveCustomCourse(_course: Course) {
  // Purge legacy storage
  try {
    localStorage.removeItem("lernex_custom_courses");
  } catch {}
}

// Save custom course to Supabase user_courses table
export async function saveCustomCourseToDb(course: Course, userId: string): Promise<boolean> {
  // Always cache locally first
  saveCustomCourse(course);

  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const { error } = await supabase
        .from('user_courses')
        .upsert({
          id: course.id,
          user_id: userId,
          title: course.title,
          description: course.description,
          category: course.category || 'AI & Software',
          difficulty: course.difficulty,
          course_data: course,
          is_custom: true,
          status: 'pending_approval'
        });

      if (!error) {
        console.log("Successfully saved custom course to Supabase user_courses:", course.id);
        return true;
      }
      console.warn("Failed to save course to Supabase:", error);
    } catch (e) {
      console.warn("Supabase saveCustomCourseToDb exception:", e);
    }
  }
  return false;
}

export interface EnrolledCourse extends Course {
  enrollment_progress: number;
  enrolled_at?: string;
}

export interface ProgressData {
  completedLessonIds: Set<string>;
  completedCount: number;
  totalLessons: number;
  percentage: number;
}

export type ModuleQuizScores = Record<number, number>;

export interface QuizQuestionData {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface CourseQuiz {
  id: string;
  course_id: string;
  module_index: number;
  lesson_id?: string | null;
  questions: QuizQuestionData[];
  passing_score: number;
  time_limit_minutes?: number;
}

export interface Module {
  id: string;
  course_id: string;
  module_number?: number;
  title: string;
  description?: string;
  order_index: number;
  lessons?: Lesson[];
  quiz?: CourseQuiz;
}

export interface Lesson {
  id: string;
  module_id: string;
  lesson_number?: number;
  title: string;
  content: string;
  content_type?: 'text' | 'video' | 'code' | 'quiz' | string;
  video_url?: string;
  order_index: number;
  duration_minutes?: number;
  starter_code?: string;
  sandbox_language?: 'javascript' | 'python' | 'html' | 'java' | 'c';
  challenge?: {
    task: string;
    hint?: string;
    expected_output?: string;
    solution?: string;
  };
  quiz?: CourseQuiz;
  quiz_questions?: QuizQuestionData[];
}

export interface UserEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  progress_percentage: number;
  completed_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
  completed_at?: string;
}

function normalizeDifficulty(value: unknown): Course['difficulty'] {
  const difficulty = String(value || '').toLowerCase();
  if (difficulty === 'intermediate') return 'Intermediate';
  if (difficulty === 'advanced') return 'Advanced';
  return 'Beginner';
}

function normalizeCourse(course: Record<string, unknown>): Course {
  return {
    ...course,
    difficulty: normalizeDifficulty(course.difficulty),
  } as Course;
}

// Fetch all courses directly from database
export async function fetchCourses(category?: string): Promise<Course[]> {
  // Purge any legacy cached courses from localStorage
  try {
    localStorage.removeItem("lernex_custom_courses");
  } catch {}

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*, modules(id)')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const normalized = data.map(course => normalizeCourse(course));
        return category && category !== 'All'
          ? normalized.filter(c => c.category?.toLowerCase() === category.toLowerCase())
          : normalized;
      }
    } catch (e) {
      console.warn('Supabase fetchCourses failed, falling back to verified courses:', e);
    }
  }

  // Fallback to verified courses ONLY if Supabase is offline
  const allDefaults = [...TEST_COURSES];
  if (category && category !== 'All') {
    return allDefaults.filter(c => c.category?.toLowerCase() === category.toLowerCase());
  }
  return allDefaults;
}

// Fetch single course with modules and lessons
export async function fetchCourseById(courseId: string): Promise<Course | null> {
  // 1. Check local custom generated courses first
  const customCourses = getCustomCourses();
  const foundCustom = customCourses.find((c) => c.id === courseId);
  if (foundCustom) return foundCustom;

  // 2. If it's a generated course ID, try to fetch from Supabase user_courses first
  if (isSupabaseConfigured) {
    try {
      const { data: userCourse, error: userCourseError } = await supabase
        .from('user_courses')
        .select('*')
        .eq('id', courseId)
        .maybeSingle();

      if (!userCourseError && userCourse) {
        const parsed: Course = {
          ...(userCourse.course_data || {}),
          id: userCourse.id,
          title: userCourse.title,
          description: userCourse.description,
          category: userCourse.category,
          difficulty: normalizeDifficulty(userCourse.difficulty),
          is_custom: true,
          status: userCourse.status,
          created_at: userCourse.created_at,
        };
        saveCustomCourse(parsed); // Cache locally
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to fetch generated course from Supabase:", e);
    }
  }

  // 3. If it's a generated course ID and not in DB, try to fetch from /api/courses/generated/:id API
  if (courseId.startsWith("course-gen-")) {
    try {
      const res = await fetch(`/api/courses/generated/${encodeURIComponent(courseId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.course) {
          saveCustomCourse(data.course);
          return data.course;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch generated course from API:", e);
    }
  }

  if (isSupabaseConfigured) {
    try {
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (!courseError && course) {
        // Fetch modules for this course
        const { data: modules } = await supabase
          .from('modules')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true });

        const { data: quizzes } = await supabase
          .from('quizzes')
          .select('id, course_id, module_index, lesson_id, questions, passing_score, time_limit_minutes')
          .eq('course_id', courseId);

        const normalizedQuizzes: CourseQuiz[] = (quizzes || []).map((quiz) => ({
          ...quiz,
          lesson_id: quiz.lesson_id ?? null,
          time_limit_minutes: quiz.time_limit_minutes ?? undefined,
          questions: Array.isArray(quiz.questions)
            ? quiz.questions.map((question: Record<string, unknown>, index: number) => ({
                id: String(question.id || `${quiz.id}-${index}`),
                question: String(question.question || ''),
                options: Array.isArray(question.options) ? question.options.map(String) : [],
                correctAnswer: Number(question.correctAnswer ?? question.correct_answer ?? 0),
                explanation: question.explanation ? String(question.explanation) : undefined,
              }))
            : [],
        }));

        const moduleQuizByIndex = new Map<number, CourseQuiz>();
        const lessonQuizById = new Map<string, CourseQuiz>();

        normalizedQuizzes.forEach((quiz) => {
          if (quiz.lesson_id) {
            lessonQuizById.set(quiz.lesson_id, quiz);
            return;
          }

          if (!moduleQuizByIndex.has(quiz.module_index)) {
            moduleQuizByIndex.set(quiz.module_index, quiz);
          }
        });

        // Fetch lessons for each module
        const modulesWithLessons = await Promise.all(
          (modules || []).map(async (module) => {
            const { data: lessons } = await supabase
              .from('lessons')
              .select('*')
              .eq('module_id', module.id)
              .order('order_index', { ascending: true });

            const moduleIndex = module.module_number ?? module.order_index;
            const lessonsWithQuizzes = (lessons || []).map((lesson) => ({
              ...lesson,
              quiz: lessonQuizById.get(lesson.id),
            }));

            return {
              ...module,
              lessons: lessonsWithQuizzes,
              quiz: moduleQuizByIndex.get(moduleIndex),
            };
          })
        );

        return { ...normalizeCourse(course), modules: modulesWithLessons };
      }
    } catch (e) {
      console.warn('Supabase fetchCourseById failed, falling back:', e);
    }
  }

  // Fallback to local verified test courses if found
  if (TEST_COURSES_RECORD[courseId]) {
    return TEST_COURSES_RECORD[courseId];
  }
  return null;
}

export async function fetchCourseWithModules(courseId: string): Promise<Course | null> {
  return fetchCourseById(courseId);
}

export async function fetchEnrolledCourses(userId: string): Promise<EnrolledCourse[]> {
  const enrollments = await fetchUserEnrollments(userId);

  const enrolledCourses: Array<EnrolledCourse | null> = await Promise.all(
    enrollments.map(async (enrollment) => {
      const course = await fetchCourseWithModules(enrollment.course_id);
      if (!course) return null;

      const progress = await fetchUserProgress(enrollment.course_id, userId, course);
      return {
        ...course,
        enrollment_progress: progress.percentage,
        enrolled_at: enrollment.enrolled_at,
      };
    })
  );

  return enrolledCourses.filter((course): course is EnrolledCourse => course !== null);
}

// Fetch user's enrolled courses
export async function fetchUserEnrollments(userId: string): Promise<UserEnrollment[]> {
  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const { data, error } = await supabase
        .from('user_enrollments')
        .select('*')
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchUserEnrollments failed, using local storage:', e);
    }
  }

  // Local storage demo fallback
  try {
    const raw = localStorage.getItem(`lernex_enrollments_${userId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Clean out any stale fake demo courses if present
      const cleaned = (Array.isArray(parsed) ? parsed : []).filter(
        (e: any) => e.course_id !== "excel-beginners-masterclass" && !e.course_id?.startsWith("demo-")
      );
      return cleaned;
    }
  } catch {}

  // No enrollments yet
  return [];
}

// Enroll user in a course
export async function enrollInCourse(userId: string, courseId: string): Promise<boolean> {
  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const { data: { user: authenticatedUser } } = await supabase.auth.getUser();
      if (authenticatedUser && authenticatedUser.id === userId) {
        await supabase
          .from('user_enrollments')
          .upsert({
            user_id: userId,
            course_id: courseId,
            progress_percentage: 0,
          }, {
            onConflict: 'user_id,course_id',
            ignoreDuplicates: true,
          });
        return true;
      }
    } catch (e) {
      console.warn('Supabase enrollInCourse error, using local demo fallback:', e);
    }
  }

  // Local demo enrollment fallback
  try {
    const raw = localStorage.getItem(`lernex_enrollments_${userId}`);
    const enrollments: UserEnrollment[] = raw ? JSON.parse(raw) : [];
    if (!enrollments.some(e => e.course_id === courseId)) {
      enrollments.push({
        id: `enrollment-${Date.now()}`,
        user_id: userId,
        course_id: courseId,
        enrolled_at: new Date().toISOString(),
        progress_percentage: 0,
      });
      localStorage.setItem(`lernex_enrollments_${userId}`, JSON.stringify(enrollments));
    }
  } catch {}

  return true;
}

// Fetch completed lesson IDs restricted to the current course's lessons
export async function fetchCompletedLessonIds(
  userId: string,
  courseLessonIds: string[]
): Promise<Set<string>> {
  if (courseLessonIds.length === 0) return new Set();

  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const courseLessonIdSet = new Set(courseLessonIds);
      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', userId)
        .eq('is_completed', true)
        .in('lesson_id', courseLessonIds);

      if (!error && data) {
        return new Set(
          data
            .map(progress => progress.lesson_id)
            .filter(lessonId => courseLessonIdSet.has(lessonId))
        );
      }
    } catch (e) {
      console.warn('Supabase fetchCompletedLessonIds failed, using local storage:', e);
    }
  }

  // Local demo completed lessons fallback
  try {
    const raw = localStorage.getItem(`lernex_completed_lessons_${userId}`);
    if (raw) {
      const completedList: string[] = JSON.parse(raw);
      return new Set(completedList.filter(id => courseLessonIds.includes(id)));
    }
  } catch {}

  return new Set();
}

export async function fetchUserProgress(
  courseId: string,
  userId: string,
  loadedCourse?: Course | null
): Promise<ProgressData> {
  const course = loadedCourse ?? await fetchCourseWithModules(courseId);
  const lessonIds = course?.modules?.flatMap(module =>
    module.lessons?.map(lesson => lesson.id) || []
  ) || [];
  const completedLessonIds = await fetchCompletedLessonIds(userId, lessonIds);
  const totalLessons = lessonIds.length;
  const completedCount = completedLessonIds.size;

  return {
    completedLessonIds,
    completedCount,
    totalLessons,
    percentage: totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100),
  };
}

export async function fetchQuizAttemptScores(
  userId: string,
  course: Course
): Promise<Record<string, number>> {
  const quizIds = (course.modules || [])
    .flatMap(module => [
      module.quiz?.id,
      ...(module.lessons || []).map(lesson => lesson.quiz?.id).filter((id): id is string => Boolean(id)),
    ])
    .filter((id): id is string => Boolean(id));

  if (quizIds.length === 0) return {};

  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('quiz_id, score')
        .eq('user_id', userId)
        .in('quiz_id', quizIds);

      if (!error && data) {
        return data.reduce<Record<string, number>>((scores, attempt) => {
          scores[attempt.quiz_id] = attempt.score;
          return scores;
        }, {});
      }
    } catch (e) {
      console.warn('Supabase fetchQuizAttemptScores failed, using local storage:', e);
    }
  }

  // Local demo fallback
  try {
    const raw = localStorage.getItem(`lernex_quizzes_${userId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}

  return {};
}

export async function fetchModuleQuizScores(
  userId: string,
  course: Course
): Promise<ModuleQuizScores> {
  const quizScores = await fetchQuizAttemptScores(userId, course);
  const scores: ModuleQuizScores = {};

  (course.modules || []).forEach((module) => {
    const moduleIndex = module.module_number ?? module.order_index;
    const moduleQuizId = module.quiz?.id;
    if (!moduleQuizId) return;
    const score = quizScores[moduleQuizId];
    if (score !== undefined) scores[moduleIndex] = score;
  });

  return scores;
}

export async function saveQuizAttempt(
  userId: string,
  quizId: string,
  score: number,
  answers: Record<string, number>
): Promise<void> {
  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      await supabase
        .from('quiz_attempts')
        .upsert({
          user_id: userId,
          quiz_id: quizId,
          score,
          answers,
          completed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,quiz_id',
        });
      return;
    } catch (e) {
      console.warn('Supabase saveQuizAttempt failed, saving to local storage:', e);
    }
  }

  // Local demo save quiz attempt
  try {
    const raw = localStorage.getItem(`lernex_quizzes_${userId}`);
    const existing = raw ? JSON.parse(raw) : {};
    existing[quizId] = score;
    localStorage.setItem(`lernex_quizzes_${userId}`, JSON.stringify(existing));
  } catch {}
}

// Update lesson progress
export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  isCompleted: boolean
): Promise<boolean> {
  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          lesson_id: lessonId,
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        }, {
          onConflict: 'user_id,lesson_id',
        });
      return true;
    } catch (e) {
      console.warn('Supabase updateLessonProgress failed, saving to local storage:', e);
    }
  }

  // Local demo save lesson progress
  try {
    const raw = localStorage.getItem(`lernex_completed_lessons_${userId}`);
    const currentList: string[] = raw ? JSON.parse(raw) : [];
    const set = new Set(currentList);
    if (isCompleted) {
      set.add(lessonId);
    } else {
      set.delete(lessonId);
    }
    localStorage.setItem(`lernex_completed_lessons_${userId}`, JSON.stringify(Array.from(set)));
  } catch {}

  return true;
}

// Get user progress for a course
export async function getUserProgress(userId: string, courseId: string): Promise<number> {
  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      // Get all lessons for the course
      const { data: modules, error: modulesError } = await supabase
        .from('modules')
        .select('id')
        .eq('course_id', courseId);

      if (!modulesError && modules && modules.length > 0) {
        const moduleIds = modules.map(m => m.id);

        // Get all lesson IDs
        const { data: lessons, error: lessonsError } = await supabase
          .from('lessons')
          .select('id')
          .in('module_id', moduleIds);

        if (!lessonsError && lessons && lessons.length > 0) {
          const lessonIds = lessons.map(l => l.id);

          // Get completed lessons
          const { data: progress, error: progressError } = await supabase
            .from('user_progress')
            .select('lesson_id')
            .eq('user_id', userId)
            .eq('is_completed', true)
            .in('lesson_id', lessonIds);

          if (!progressError && progress) {
            const totalLessons = lessons.length;
            const completedLessons = progress.length;
            if (totalLessons > 0) {
              return Math.round((completedLessons / totalLessons) * 100);
            }
          }
        }
      }
    } catch (e) {
      console.warn('Supabase getUserProgress failed, fallback to local storage:', e);
    }
  }

  try {
    const raw = localStorage.getItem(`lernex_completed_lessons_${userId}`);
    if (raw) {
      const completed: string[] = JSON.parse(raw);
      const course = await fetchCourseById(courseId);
      const totalLessons = course?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
      if (totalLessons > 0) {
        return Math.round((completed.length / totalLessons) * 100);
      }
    }
  } catch {}

  return 0;
}

// Update enrollment progress percentage
export async function updateEnrollmentProgress(
  userId: string,
  courseId: string,
  progress: number
): Promise<boolean> {
  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const { error } = await supabase
        .from('user_enrollments')
        .update({ progress_percentage: progress })
        .eq('user_id', userId)
        .eq('course_id', courseId);

      if (error) {
        console.warn('Supabase updateEnrollmentProgress failed, updating local storage:', error);
      } else {
        return true;
      }
    } catch (e) {
      console.warn('Supabase updateEnrollmentProgress exception:', e);
    }
  }

  // Update in local storage
  try {
    const raw = localStorage.getItem(`lernex_enrollments_${userId}`);
    if (raw) {
      const enrollments: UserEnrollment[] = JSON.parse(raw);
      const updated = enrollments.map(e =>
        e.course_id === courseId ? { ...e, progress_percentage: progress } : e
      );
      localStorage.setItem(`lernex_enrollments_${userId}`, JSON.stringify(updated));
    }
  } catch {}

  return true;
}

export interface UserLearningStats {
  streakDays: number;
  coursesInProgress: number;
  hoursLearned: string;
}

export async function fetchUserLearningStats(userId: string): Promise<UserLearningStats> {
  let completedCount = 0;
  let enrolledCount = 0;

  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const [progressRes, enrollRes] = await Promise.all([
        supabase
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('is_completed', true),
        supabase
          .from('user_enrollments')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId),
      ]);

      completedCount = progressRes.count || 0;
      enrolledCount = enrollRes.count || 0;
    } catch (e) {
      console.warn("fetchUserLearningStats DB error:", e);
    }
  }

  // Fallback check
  if (completedCount === 0 && typeof localStorage !== "undefined") {
    try {
      const raw = localStorage.getItem(`lernex_progress_${userId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          completedCount = parsed.filter((p: any) => p.is_completed).length;
        }
      }
    } catch {}
  }

  const hours = ((completedCount * 15) / 60).toFixed(1);
  const streak = completedCount > 0 ? 1 : 0;

  return {
    streakDays: streak,
    coursesInProgress: enrolledCount,
    hoursLearned: `${hours}h`,
  };
}
