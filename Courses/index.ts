import test1 from './test-1.json';
import test2 from './test-2.json';
import test3 from './test-3.json';
import test4 from './test-4.json';
import test5 from './test-5.json';
import test6 from './test-6.json';

export interface Lesson {
  id: string;
  module_id: string;
  lesson_number: number;
  title: string;
  order_index: number;
  duration_minutes: number;
  content_type: 'text' | 'html';
  content: string;
  starter_code?: string;
  sandbox_language?: 'javascript' | 'html' | 'python' | 'java' | 'c' | 'cpp' | 'sql';
  challenge?: {
    task: string;
    hint?: string;
    expected_output?: string;
  };
}

export interface Module {
  id: string;
  course_id: string;
  module_number: number;
  title: string;
  description: string;
  order_index: number;
  lessons: Lesson[];
  quiz?: any;
}

export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail_url?: string;
  is_premium?: boolean;
  total_modules: number;
  estimated_hours: number;
  created_at: string;
  modules: Module[];
}

export const TEST_COURSES_DB: Course[] = [
  test1 as unknown as Course,
  test2 as unknown as Course,
  test3 as unknown as Course,
  test4 as unknown as Course,
  test5 as unknown as Course,
  test6 as unknown as Course,
];

export const TEST_COURSES_MAP: Record<string, Course> = {
  [test1.id]: test1 as unknown as Course,
  [test2.id]: test2 as unknown as Course,
  [test3.id]: test3 as unknown as Course,
  [test4.id]: test4 as unknown as Course,
  [test5.id]: test5 as unknown as Course,
  [test6.id]: test6 as unknown as Course,
  "test-1": test1 as unknown as Course,
  "test-2": test2 as unknown as Course,
  "test-3": test3 as unknown as Course,
  "test-4": test4 as unknown as Course,
  "test-5": test5 as unknown as Course,
  "test-6": test6 as unknown as Course,
  "Test 1": test1 as unknown as Course,
  "Test 2": test2 as unknown as Course,
  "Test 3": test3 as unknown as Course,
  "Test 4": test4 as unknown as Course,
  "Test 5": test5 as unknown as Course,
  "Test 6": test6 as unknown as Course,
  "Python Programming Masterclass": test1 as unknown as Course,
  "Complete Python Programming Masterclass": test1 as unknown as Course,
  "Complete Core Java & OOP Masterclass": test2 as unknown as Course,
  "Mastering C Programming & Systems Architecture": test3 as unknown as Course,
  "Mastering Modern C++ & Object-Oriented Architecture": test4 as unknown as Course,
  "Modern Responsive Web Design: HTML5 & CSS3 Masterclass": test5 as unknown as Course,
  "Mastering SQL & Relational Database Architecture": test6 as unknown as Course,
};

export default TEST_COURSES_DB;
