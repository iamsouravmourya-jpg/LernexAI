import dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import test1 from "../Courses/test-1.json";
import test2 from "../Courses/test-2.json";
import test3 from "../Courses/test-3.json";
import test4 from "../Courses/test-4.json";
import test5 from "../Courses/test-5.json";
import test6 from "../Courses/test-6.json";

function normalizeDifficulty(diff?: string): string {
  if (!diff) return "Beginner";
  const lower = diff.toLowerCase();
  if (lower.includes("adv")) return "Advanced";
  if (lower.includes("inter")) return "Intermediate";
  return "Beginner";
}

async function main() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    console.error("Missing SUPABASE URL or SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);

  // Push verified masterclasses: test1 (Python), test2 (Java), test3 (C), test4 (C++), test5 (HTML/CSS), test6 (SQL)
  const coursesList = [test1, test2, test3, test4, test5, test6];
  console.log(`\n🚀 Starting push of ${coursesList.length} verified masterclasses to Supabase...\n`);

  for (const course of coursesList as any[]) {
    console.log(`\n========================================`);
    console.log(`📦 Processing Course: ${course.title} (ID: ${course.id})`);
    console.log(`========================================`);

    // 1. Upsert Course
    const courseRecord = {
      id: course.id,
      title: course.title,
      description: course.description || "Comprehensive Interactive Masterclass",
      category: course.category || "Software Engineering",
      difficulty: normalizeDifficulty(course.difficulty),
      thumbnail_url: course.thumbnail_url || course.thumbnail || null,
      is_premium: Boolean(course.is_premium),
      total_modules: course.modules ? course.modules.length : 0,
      estimated_hours: Math.max(1, Math.round(Number(course.estimated_hours) || 1))
    };

    const { error: courseErr } = await supabase.from("courses").upsert(courseRecord);
    if (courseErr) {
      console.error(`❌ Course ${course.id} error:`, courseErr.message);
      continue;
    }
    console.log(`✅ Upserted Course: "${course.title}"`);

    // 2. Upsert Modules & Lessons
    if (course.modules && Array.isArray(course.modules)) {
      for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
        const mod = course.modules[mIdx];
        const modId = mod.id || `${course.id}-mod-${mIdx + 1}`;
        const modNumber = mod.module_number || (mIdx + 1);

        const modRecord = {
          id: modId,
          course_id: course.id,
          module_number: modNumber,
          title: mod.title || `Module ${modNumber}`,
          description: mod.description || "",
          order_index: mIdx + 1
        };

        const { error: modErr } = await supabase.from("modules").upsert(modRecord);
        if (modErr) {
          console.error(`  ❌ Module ${modId} error:`, modErr.message);
          continue;
        }

        // Upsert Lessons for this module
        if (mod.lessons && Array.isArray(mod.lessons)) {
          for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
            const les = mod.lessons[lIdx];
            const lesId = les.id || `${modId}-les-${lIdx + 1}`;
            const lesNumber = les.lesson_number || (lIdx + 1);

            const lesRecord = {
              id: lesId,
              module_id: modId,
              lesson_number: lesNumber,
              title: les.title || `Topic ${lesNumber}`,
              content: les.content || "Lesson content",
              content_type: "interactive",
              order_index: lIdx + 1,
              duration_minutes: les.duration_minutes || 15,
              starter_code: les.starter_code || null,
              sandbox_language: les.sandbox_language || "python",
              challenge: les.challenge || null
            };

            const { error: lesErr } = await supabase.from("lessons").upsert(lesRecord);
            if (lesErr) {
              console.error(`    ❌ Lesson ${lesId} error:`, lesErr.message);
            }
          }
          console.log(`  ✅ Upserted Module ${modNumber}: "${mod.title}" (${mod.lessons.length} topics)`);
        }

        // Module Checkpoint Quiz
        const quizQuestions = Array.isArray(mod.quiz) 
          ? mod.quiz 
          : (mod.quiz?.questions && Array.isArray(mod.quiz.questions) ? mod.quiz.questions : null);

        if (quizQuestions && quizQuestions.length > 0) {
          const quizId = `quiz-${modId}`;
          const quizRecord = {
            id: quizId,
            course_id: course.id,
            module_index: modNumber,
            questions: quizQuestions,
            passing_score: mod.quiz?.passing_score || 70,
            time_limit_minutes: mod.quiz?.time_limit_minutes || 15
          };
          const { error: qErr } = await supabase.from("quizzes").upsert(quizRecord);
          if (qErr) {
            console.error(`    ❌ Quiz for module ${modNumber} error:`, qErr.message);
          } else {
            console.log(`    🎯 Module ${modNumber} Checkpoint Quiz upserted (${quizQuestions.length} questions)`);
          }
        }
      }
    }

    // Final Exam Assessment
    const finalExamQuestions = Array.isArray(course.final_exam)
      ? course.final_exam
      : (course.final_exam?.questions && Array.isArray(course.final_exam.questions) ? course.final_exam.questions : null);

    if (finalExamQuestions && finalExamQuestions.length > 0) {
      const examQuizId = `final-exam-${course.id}`;
      const examRecord = {
        id: examQuizId,
        course_id: course.id,
        module_index: 999,
        questions: finalExamQuestions,
        passing_score: course.final_exam?.passing_score || 50,
        time_limit_minutes: course.final_exam?.time_limit_minutes || 30
      };
      const { error: exErr } = await supabase.from("quizzes").upsert(examRecord);
      if (exErr) {
        console.error(`  ❌ Final Exam for ${course.id} error:`, exErr.message);
      } else {
        console.log(`  🏆 Final Exam Assessment Quiz upserted (${finalExamQuestions.length} questions)`);
      }
    }
  }

  // Summary verification
  console.log("\n========================================");
  console.log("📊 SUPABASE POPULATION VERIFICATION");
  console.log("========================================");

  const { data: currentCourses, count: coursesCount } = await supabase.from("courses").select("id, title", { count: "exact" });
  const { count: modulesCount } = await supabase.from("modules").select("*", { count: "exact", head: true });
  const { count: lessonsCount } = await supabase.from("lessons").select("*", { count: "exact", head: true });
  const { count: quizzesCount } = await supabase.from("quizzes").select("*", { count: "exact", head: true });

  console.log(`Total Courses in Supabase:  ${coursesCount}`);
  if (currentCourses) {
    currentCourses.forEach((c, idx) => console.log(`  ${idx + 1}. [${c.id}] ${c.title}`));
  }
  console.log(`Total Modules in Supabase:  ${modulesCount}`);
  console.log(`Total Lessons in Supabase:  ${lessonsCount}`);
  console.log(`Total Quizzes in Supabase:  ${quizzesCount}`);
  console.log("\n🎉 ONLY TEST 1 & TEST 2 HAVE BEEN PUSHED DIRECTLY TO SUPABASE!");
}

main().catch(console.error);
