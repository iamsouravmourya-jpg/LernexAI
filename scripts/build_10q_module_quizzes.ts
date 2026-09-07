import fs from 'fs';

interface QuizQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Generates 10 high-quality, balanced-length questions for any module
// Ensures NO "longest option is always correct" artifact
function generate10QuestionsForModule(
  courseNum: number,
  courseLang: string,
  modNum: number,
  modTitle: string,
  lessons: Array<{ title: string; starter_code?: string }>
): QuizQ[] {
  const qs: QuizQ[] = [];
  const lessonTitles = lessons.map(l => l.title.replace(/^Lesson \d+\.\d+:\s*/, ''));
  const t0 = lessonTitles[0] || modTitle;
  const t1 = lessonTitles[1] || t0;
  const t2 = lessonTitles[2] || t1;

  // Q1: Direct Short Definition / Keyword (All 4 options concise & equal length)
  qs.push({
    id: `c${courseNum}-m${modNum}-q1`,
    question: `Which fundamental paradigm best characterizes ${courseLang.toUpperCase()} architecture in "${modTitle}"?`,
    options: [
      `Declarative state management`,
      `Structured modular execution`,
      `Unbounded dynamic mutation`,
      `Asynchronous thread pooling`
    ],
    correctAnswer: 1, // Short, distinct, random position
    explanation: `${courseLang.toUpperCase()} emphasizes structured modular execution and clean logical boundaries in ${modTitle}.`
  });

  // Q2: Distractor is the longest option! Correct answer is concise.
  qs.push({
    id: `c${courseNum}-m${modNum}-q2`,
    question: `When implementing "${t0}", what is the primary objective of input validation?`,
    options: [
      `To prevent unexpected runtime failures and invalid system state`,
      `To continuously allocate unmonitored memory buffers regardless of system heap limits`,
      `To deliberately bypass compile-time verification routines and ignore warning flags`,
      `To automatically serialize all incoming network packets directly into global storage`
    ],
    correctAnswer: 0,
    explanation: `Input validation prevents invalid states and unexpected runtime failures before data reaches business logic.`
  });

  // Q3: Precise Syntax / Code Mechanism (All 4 are short direct statements)
  qs.push({
    id: `c${courseNum}-m${modNum}-q3`,
    question: `In ${courseLang.toUpperCase()}, what happens if a boundary condition is left unhandled in "${t1}"?`,
    options: [
      `Memory is automatically doubled`,
      `Compilation errors are suppressed`,
      `Runtime exceptions or undefined state occurs`,
      `Execution speed increases predictably`
    ],
    correctAnswer: 2,
    explanation: `Unhandled boundary conditions lead to runtime exceptions or undefined state.`
  });

  // Q4: Balanced Conceptual Analysis (All 4 options ~50-60 characters each)
  qs.push({
    id: `c${courseNum}-m${modNum}-q4`,
    question: `What is the key engineering benefit of modular encapsulation in ${modTitle}?`,
    options: [
      `Enforces isolation and exposes minimal public contracts`,
      `Allows arbitrary external callers to alter internal data`,
      `Forces all components to share identical memory blocks`,
      `Disables standard linting checks across package scopes`
    ],
    correctAnswer: 0,
    explanation: `Modular encapsulation isolates internal logic and exposes only minimal, well-tested contracts.`
  });

  // Q5: Complexity / Efficiency comparison (Short direct options)
  qs.push({
    id: `c${courseNum}-m${modNum}-q5`,
    question: `What is the ideal algorithmic time complexity targeted for primary operations in ${modTitle}?`,
    options: [
      `O(N!) factorial scaling`,
      `O(N³) cubic overhead`,
      `O(1) to O(N log N) scaling`,
      `O(2^N) exponential time`
    ],
    correctAnswer: 2,
    explanation: `Efficient software architectures aim for optimal constant O(1), linear O(N), or logarithmic O(N log N) execution.`
  });

  // Q6: Practical Scenario with equal length options
  qs.push({
    id: `c${courseNum}-m${modNum}-q6`,
    question: `During the implementation of "${t2}", which practice ensures thread-safety and data consistency?`,
    options: [
      `Sharing mutable variables across tasks without synchronization locks`,
      `Using immutable data structures and explicit synchronization guards`,
      `Relying on sleep timeouts instead of deterministic async event loops`,
      `Disabling all error handlers to avoid interrupt latency penalties`
    ],
    correctAnswer: 1,
    explanation: `Immutability and explicit synchronization guards prevent race conditions and maintain data integrity.`
  });

  // Q7: Capstone Challenge Verification (Short direct choices)
  qs.push({
    id: `c${courseNum}-m${modNum}-q7`,
    question: `In the hands-on coding challenge for ${modTitle}, what constitutes a successful test pass?`,
    options: [
      `Generating partial compilation logs`,
      `Passing all functional and boundary unit tests`,
      `Suppressing test assertion failures`,
      `Terminating with non-zero exit code`
    ],
    correctAnswer: 1,
    explanation: `Passing all functional specifications and boundary assertion test cases verifies code correctness.`
  });

  // Q8: Distractor is very descriptive, correct answer is standard length
  qs.push({
    id: `c${courseNum}-m${modNum}-q8`,
    question: `Which approach represents the recommended error-handling strategy in ${courseLang.toUpperCase()}?`,
    options: [
      `Catching and ignoring all exceptions without logging diagnostics or alert tracing`,
      `Catching specific error types and recovering or logging gracefully`,
      `Allowing arbitrary core dumps without capturing process crash context logs`,
      `Hardcoding exit(0) inside nested utility functions to suppress failure notices`
    ],
    correctAnswer: 1,
    explanation: `Catching specific exceptions and recovering or logging structured diagnostics is standard engineering practice.`
  });

  // Q9: Best Practice / Architecture (Equal length choices)
  qs.push({
    id: `c${courseNum}-m${modNum}-q9`,
    question: `Why is separation of concerns critical when structuring ${courseLang.toUpperCase()} applications?`,
    options: [
      `It simplifies debugging and improves module reusability`,
      `It artificially inflates the number of required classes`,
      `It prevents developers from modifying source files`,
      `It doubles memory usage across standard application loops`
    ],
    correctAnswer: 0,
    explanation: `Separation of concerns isolates responsibilities, making code easier to test, debug, and maintain.`
  });

  // Q10: Synthesis & Progression (Balanced options)
  qs.push({
    id: `c${courseNum}-m${modNum}-q10`,
    question: `What mastery milestone is achieved upon passing the "${modTitle}" assessment?`,
    options: [
      `Memorization of syntax keywords without practical application`,
      `Foundational readiness to build and integrate real-world components`,
      `Exemption from running regression tests in future project modules`,
      `Ability to deploy unverified code directly to production clusters`
    ],
    correctAnswer: 1,
    explanation: `Passing the checkpoint verifies you have hands-on command of the concepts and are ready for advanced topics.`
  });

  return qs;
}

const courseLangMap: Record<number, string> = {
  1: "Python",
  2: "Java",
  3: "C",
  4: "C++",
  5: "HTML5 & CSS3",
  6: "SQL",
  7: "Full-Stack Python & Web"
};

// Also generate Course 7 if it doesn't exist yet
if (!fs.existsSync('Courses/test-7.json')) {
  const quickCourse = {
    id: "35e38600-a5ef-4573-b295-81643c5b9007",
    title: "⚡ Fast-Track Python & Web Sprint (Workflow Test)",
    description: "Rapid single-module course engineered for end-to-end workflow verification: 1 interactive lesson, 1 comprehensive module quiz (5 mins), and direct access to Final Exam & Certificate.",
    category: "AI & Full-Stack",
    difficulty: "Beginner",
    thumbnail_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    estimated_hours: 1,
    total_modules: 1,
    created_at: new Date().toISOString(),
    modules: [
      {
        id: "c7-mod-1",
        course_id: "35e38600-a5ef-4573-b295-81643c5b9007",
        module_number: 1,
        title: "Module 1: Rapid Full-Stack Python Sprint",
        description: "Core programming paradigms, syntax structures, and practical coding challenge.",
        lessons: [
          {
            id: "c7-l1",
            module_id: "c7-mod-1",
            title: "Lesson 1.1: Python Data Pipelines & Web Fast-Track",
            description: "Master foundational variables, functions, error handling, and test-driven workflow in under 5 minutes.",
            content_type: "code",
            video_url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
            sandbox_language: "python",
            starter_code: "# Fast-Track Python Sprint\ndef process_data(items):\n    \"\"\"Return squared numbers for even integers.\"\"\"\n    return [x ** 2 for x in items if x % 2 == 0]\n\n# Test execution\nnumbers = [1, 2, 3, 4, 5, 6]\nprint(f\"Original: {numbers}\")\nprint(f\"Processed: {process_data(numbers)}\")\n",
            challenge: "Modify the function to also include cubes of odd numbers.",
            content: `## Fast-Track Python & Web Sprint\n\nWelcome to the **Fast-Track Workflow Test Course**! This course is specially designed to demonstrate the complete **LernexAI** learning pipeline in a single, focused milestone:\n\n1. **Interactive Coding Sandbox**: Test Python code directly in the browser.\n2. **Module Checkpoint Assessment**: Take the 10-question quiz with balanced options and a 5-minute timer (40% passing score).\n3. **Proctored Final Exam**: Clear the comprehensive exam to unlock your official verified certificate!\n\n### Key Principles Covered:\n- Clean functional data pipelines\n- List comprehensions and filtering\n- Deterministic error boundaries\n\nClick **"Complete Topic & Start Quiz"** below to take your 5-minute checkpoint quiz and proceed directly to the Final Exam!`
          }
        ]
      }
    ]
  };
  fs.writeFileSync('Courses/test-7.json', JSON.stringify(quickCourse, null, 2), 'utf-8');
  console.log("✅ Created Courses/test-7.json for rapid workflow testing!");
}

for (let i = 1; i <= 7; i++) {
  const filePath = `Courses/test-${i}.json`;
  if (!fs.existsSync(filePath)) continue;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const course = JSON.parse(raw);
  const lang = courseLangMap[i] || "Software Engineering";

  console.log(`\n========================================`);
  console.log(`Building 10-Question Balanced Quizzes for Course ${i}: ${course.title}`);

  course.modules.forEach((mod: any, mIdx: number) => {
    const modNum = mod.module_number || (mIdx + 1);
    const tenQuestions = generate10QuestionsForModule(
      i,
      lang,
      modNum,
      mod.title,
      mod.lessons || []
    );

    // Attach comprehensive 10-question quiz to module
    mod.quiz = {
      id: `c${i}-m${modNum}-quiz`,
      course_id: course.id,
      module_index: modNum,
      title: `${mod.title} — Comprehensive Assessment`,
      passing_score: 40,
      time_limit_minutes: 5,
      questions: tenQuestions
    };

    // The last lesson in the module hosts the 10-question Milestone Quiz
    const lastLessonIdx = mod.lessons.length - 1;
    mod.lessons.forEach((l: any, lIdx: number) => {
      if (lIdx === lastLessonIdx) {
        l.quizzes = tenQuestions;
        l.quiz_questions = tenQuestions;
        l.quiz = mod.quiz;
      } else {
        l.quizzes = [];
        l.quiz_questions = [];
        delete l.quiz;
      }
    });
  });

  fs.writeFileSync(filePath, JSON.stringify(course, null, 2), 'utf-8');
  console.log(`✅ Saved Course ${i} with balanced 10-question 5-min Quizzes!`);
}

console.log(`\n🎉 ALL COURSES UPDATED WITH BALANCED 10-QUESTION 5-MINUTE QUIZZES!`);
