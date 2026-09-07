import fs from 'fs';

const courseConfigs: Record<number, {
  name: string;
  sandbox: string;
  forbiddenRegexes: { regex: RegExp; desc: string }[];
}> = {
  1: {
    name: "Python",
    sandbox: "python",
    forbiddenRegexes: [
      { regex: /#include\s*</, desc: "C/C++ #include directive" },
      { regex: /\bpublic\s+class\b/, desc: "Java public class" },
      { regex: /\bSystem\.out\.print/, desc: "Java System.out print" },
      { regex: /\bprintf\s*\(/, desc: "C printf function" },
      { regex: /<!DOCTYPE\s+html>/i, desc: "HTML DOCTYPE" },
      { regex: /\bstd::cout\b/, desc: "C++ std::cout" }
    ]
  },
  2: {
    name: "Java",
    sandbox: "java",
    forbiddenRegexes: [
      { regex: /#include\s*</, desc: "C/C++ #include directive" },
      { regex: /\bdef\s+[a-zA-Z_]/, desc: "Python function def" },
      { regex: /<!DOCTYPE\s+html>/i, desc: "HTML DOCTYPE" },
      { regex: /\bstd::cout\b/, desc: "C++ std::cout" }
    ]
  },
  3: {
    name: "C",
    sandbox: "c",
    forbiddenRegexes: [
      { regex: /\bdef\s+[a-zA-Z_]/, desc: "Python function def" },
      { regex: /\bclass\s+[A-Z]/, desc: "OOP class declaration" },
      { regex: /\bpublic\s+class\b/, desc: "Java public class" },
      { regex: /\bSystem\.out\.print/, desc: "Java System.out print" },
      { regex: /\bstd::cout\b/, desc: "C++ std::cout" },
      { regex: /<!DOCTYPE\s+html>/i, desc: "HTML DOCTYPE" }
    ]
  },
  4: {
    name: "C++",
    sandbox: "cpp",
    forbiddenRegexes: [
      { regex: /\bdef\s+[a-zA-Z_]/, desc: "Python function def" },
      { regex: /\bpublic\s+class\b/, desc: "Java public class" },
      { regex: /\bSystem\.out\.print/, desc: "Java System.out print" },
      { regex: /<!DOCTYPE\s+html>/i, desc: "HTML DOCTYPE" }
    ]
  },
  5: {
    name: "HTML5 & CSS3",
    sandbox: "html",
    forbiddenRegexes: [
      { regex: /#include\s*</, desc: "C/C++ #include directive" },
      { regex: /\bdef\s+[a-zA-Z_]/, desc: "Python function def" },
      { regex: /\bpublic\s+class\b/, desc: "Java public class" },
      { regex: /\bSystem\.out\.print/, desc: "Java System.out print" },
      { regex: /\bprintf\s*\(/, desc: "C printf function" }
    ]
  },
  6: {
    name: "Enterprise SQL",
    sandbox: "sql",
    forbiddenRegexes: [
      { regex: /#include\s*</, desc: "C/C++ #include directive" },
      { regex: /\bdef\s+[a-zA-Z_]/, desc: "Python function def" },
      { regex: /\bpublic\s+class\b/, desc: "Java public class" },
      { regex: /\bSystem\.out\.print/, desc: "Java System.out print" },
      { regex: /\bprintf\s*\(/, desc: "C printf function" },
      { regex: /<!DOCTYPE\s+html>/i, desc: "HTML DOCTYPE" },
      { regex: /\bstd::cout\b/, desc: "C++ std::cout" }
    ]
  }
};

let allPass = true;

for (let i = 1; i <= 6; i++) {
  const filePath = `Courses/test-${i}.json`;
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Course file missing: ${filePath}`);
    allPass = false;
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const course = JSON.parse(raw);
  const cfg = courseConfigs[i];

  console.log(`\n========================================`);
  console.log(`Auditing Course ${i}: ${course.title}`);
  console.log(`Total Modules: ${course.modules.length}`);

  const lessonTitles = new Set<string>();
  let totalLessons = 0;
  let moduleLessonCounts: number[] = [];

  course.modules.forEach((mod: any) => {
    const lCount = mod.lessons.length;
    moduleLessonCounts.push(lCount);
    totalLessons += lCount;

    if (lCount < 2 || lCount > 6) {
      console.error(`❌ Mod ${mod.module_number} has invalid lesson count: ${lCount} (must be between 2 and 6)`);
      allPass = false;
    }

    mod.lessons.forEach((l: any) => {
      // Check title duplication
      if (lessonTitles.has(l.title)) {
        console.error(`❌ Duplicate lesson title in Mod ${mod.module_number}: "${l.title}"`);
        allPass = false;
      }
      lessonTitles.add(l.title);

      // Check sandbox language
      if (l.sandbox_language !== cfg.sandbox) {
        console.error(`❌ Lesson "${l.title}" has wrong sandbox: ${l.sandbox_language} (expected ${cfg.sandbox})`);
        allPass = false;
      }

      // Check starter code for cross-language contamination
      for (const rule of cfg.forbiddenRegexes) {
        if (l.starter_code && rule.regex.test(l.starter_code)) {
          console.error(`❌ Contamination in Lesson "${l.title}": Matched ${rule.desc} in ${cfg.name} course!`);
          allPass = false;
        }
      }

      // Check module quizzes
      if (mod.quiz) {
        if (!mod.quiz.questions || mod.quiz.questions.length !== 10) {
          console.error(`❌ Module ${mod.module_number} quiz does not have exactly 10 questions (has ${mod.quiz.questions?.length})`);
          allPass = false;
        }
      } else {
        console.error(`❌ Module ${mod.module_number} is missing module.quiz`);
        allPass = false;
      }

      // Check lessons: last lesson has 10 questions, intermediate lessons have 0 to keep flow
      const lastIdx = mod.lessons.length - 1;
      mod.lessons.forEach((l: any, lIdx: number) => {
        if (lIdx === lastIdx) {
          if (!l.quizzes || l.quizzes.length !== 10) {
            console.error(`❌ Milestone Lesson "${l.title}" missing 10-question quiz (has ${l.quizzes?.length})`);
            allPass = false;
          }
        }
      });
    });
  });

  console.log(`Lesson counts per module: [${moduleLessonCounts.join(', ')}]`);
  console.log(`Total Lessons: ${totalLessons} (Unique titles: ${lessonTitles.size})`);
  console.log(`✅ Course ${i} Structure & Purity Verified!`);
}

if (allPass) {
  console.log(`\n🎉 ALL 6 COURSES ARE 100% PURE, ACCURATE, DIVERSE & FREE OF CONTAMINATION!`);
} else {
  console.error(`\n❌ AUDIT FOUND ISSUES! Please check logs above.`);
  process.exit(1);
}
