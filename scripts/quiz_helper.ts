import fs from 'fs';
import path from 'path';
import { makeLesson } from './helpers';

// Helper to make quiz
export function makeQuiz(id: string, moduleId: string, title: string, questions: Array<{ id: string; question: string; options: string[]; correct_answer: number; explanation: string }>) {
  return {
    id,
    module_id: moduleId,
    title,
    description: "Checkpoint assessment to test your conceptual mastery before moving to the next module.",
    passing_score: 75,
    questions
  };
}
