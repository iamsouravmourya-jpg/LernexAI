import testQuick from '../../Courses/test-quick.json';
import test1 from '../../Courses/test-1.json';
import test2 from '../../Courses/test-2.json';
import test3 from '../../Courses/test-3.json';
import test4 from '../../Courses/test-4.json';
import test5 from '../../Courses/test-5.json';
import test6 from '../../Courses/test-6.json';
import test7 from '../../Courses/test-7.json';
import type { Course } from '../lib/course';

export const TEST_COURSES: Course[] = [
  testQuick as unknown as Course,
  test7 as unknown as Course,
  test1 as unknown as Course,
  test2 as unknown as Course,
  test3 as unknown as Course,
  test4 as unknown as Course,
  test5 as unknown as Course,
  test6 as unknown as Course,
];

export const TEST_COURSES_RECORD: Record<string, Course> = {
  [testQuick.id]: testQuick as unknown as Course,
  "course-quick-test": testQuick as unknown as Course,
  "quick-test": testQuick as unknown as Course,
  "test-quick": testQuick as unknown as Course,
  [test1.id]: test1 as unknown as Course,
  [test2.id]: test2 as unknown as Course,
  [test3.id]: test3 as unknown as Course,
  [test4.id]: test4 as unknown as Course,
  [test5.id]: test5 as unknown as Course,
  [test6.id]: test6 as unknown as Course,
  [test7.id]: test7 as unknown as Course,
  "test-1": test1 as unknown as Course,
  "test-2": test2 as unknown as Course,
  "test-3": test3 as unknown as Course,
  "test-4": test4 as unknown as Course,
  "test-5": test5 as unknown as Course,
  "test-6": test6 as unknown as Course,
  "test-7": test7 as unknown as Course,
  "Test 1": test1 as unknown as Course,
  "Test 2": test2 as unknown as Course,
  "Test 3": test3 as unknown as Course,
  "Test 4": test4 as unknown as Course,
  "Test 5": test5 as unknown as Course,
  "Test 6": test6 as unknown as Course,
  "Test 7": test7 as unknown as Course,
  "Python Programming Masterclass": test1 as unknown as Course,
  "Complete Python Programming Masterclass": test1 as unknown as Course,
  "Complete Core Java & OOP Masterclass": test2 as unknown as Course,
  "Mastering C Programming & Systems Architecture": test3 as unknown as Course,
  "Mastering Modern C++ & Object-Oriented Architecture": test4 as unknown as Course,
  "Modern Responsive Web Design: HTML5 & CSS3 Masterclass": test5 as unknown as Course,
  "Mastering SQL & Relational Database Architecture": test6 as unknown as Course,
  "Fast-Track Python & Web Sprint": test7 as unknown as Course,
};

export default TEST_COURSES;
