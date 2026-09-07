import * as fs from 'fs';
import * as path from 'path';

const cCourse = {
  id: "course-test-3-c",
  title: "Mastering C Programming & Systems Architecture",
  subtitle: "From Silicon to Software — Memory, Pointers, Low-Level Control & Dynamic Data Structures",
  description: "The definitive systems programming masterclass in C. Master the GCC compilation pipeline, memory management, pointers, pointer arithmetic, memory alignment, malloc/free heap mechanics, bitwise algorithms, structs, file I/O, and data structure implementations.",
  category: "Technology",
  difficulty: "Intermediate",
  thumbnail_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 12,
  estimated_hours: 42,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    {
      id: "test3-mod-1",
      course_id: "course-test-3-c",
      module_number: 1,
      title: "Module 1: Introduction to C & The Compilation Pipeline",
      description: "Understand how C interacts with bare-metal hardware. Learn the 4 stages of compilation (Preprocessor, Compiler, Assembler, Linker), standard headers, and your first C program.",
      order_index: 1,
      lessons: [
        {
          id: "test3-l-1-1",
          module_id: "test3-mod-1",
          lesson_number: 1,
          title: "Lesson 1.1: The Genesis of C & The Compilation Pipeline",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, Systems World! 🚀\\n\");\n    printf(\"C gives you direct power over memory and CPU.\\n\");\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a program that prints 'C Language Masterclass' on line 1 and 'Compiled with GCC' on line 2.",
            hint: "Use printf(\"C Language Masterclass\\n\"); followed by printf(\"Compiled with GCC\\n\");",
            expected_output: "C Language Masterclass\nCompiled with GCC"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>C is the mother of modern computing!</strong> Operating systems like Linux, Windows kernel, database engines (PostgreSQL, Redis), and gaming engines are written in C because it offers zero-overhead speed and total hardware control.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">Stage 01 • Preprocessing</span>
    <div class="pipeline-title">🔍 Text Expansion</div>
    <p class="pipeline-desc">Removes comments, expands <code>#include</code> header files, and replaces <code>#define</code> macros.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">Stage 02 • Compilation</span>
    <div class="pipeline-title">⚙️ Assembly Code</div>
    <p class="pipeline-desc">Translates C code into processor-specific Assembly instructions (e.g. x86-64, ARM).</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#ede9fe; color:#6d28d9;">Stage 03 • Assembly</span>
    <div class="pipeline-title">💾 Machine Code (.o)</div>
    <p class="pipeline-desc">Converts assembly mnemonics into raw binary object code consisting of 0s and 1s.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">Stage 04 • Linking</span>
    <div class="pipeline-title">🔗 Executable (.exe)</div>
    <p class="pipeline-desc">Combines your object files with standard C library binaries (libc) into a single runnable executable.</p>
  </div>
</div>

<div class="code-editor">
  <div class="code-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="filename">main.c</span>
  </div>
  <pre><code><span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span> <span class="cmt">// Standard I/O library header</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="str">"Welcome to Bare-Metal C!\\n"</span>);
    <span class="kw">return</span> <span class="num">0</span>; <span class="cmt">// 0 indicates success to the OS</span>
}</code></pre>
</div>
<p class="caption">Figure 1.1: Basic structure of a standard C program. Every C executable begins execution at the main() entry point.</p>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ Semicolon (;) is Mandatory!</div>
  <p>In C, every statement must end with a semicolon. Missing a semicolon is the #1 syntax error for beginners!</p>
</div>

<div class="pro-tip">
  <div class="pro-tip-title">💡 Pro-Tip: Return Code 0</div>
  <p>The operating system checks the return code of <code>main()</code>. Returning <code>0</code> tells the terminal that your program executed cleanly without errors.</p>
</div>`
        },
        {
          id: "test3-l-1-2",
          module_id: "test3-mod-1",
          lesson_number: 2,
          title: "Lesson 1.2: Primitive Types, Memory Sizes & Format Specifiers",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int age = 22;\n    float gpa = 3.85f;\n    char grade = 'A';\n    double preciseVal = 3.1415926535;\n\n    printf(\"Age: %d\\n\", age);\n    printf(\"GPA: %.2f\\n\", gpa);\n    printf(\"Grade: %c\\n\", grade);\n    printf(\"Pi: %.4lf\\n\", preciseVal);\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Declare an integer variable 'year' equal to 2026 and a float variable 'score' equal to 99.5. Print them using printf with format 'Year: 2026 | Score: 99.50'.",
            hint: "int year = 2026; float score = 99.5f; printf(\"Year: %d | Score: %.2f\\n\", year, score);",
            expected_output: "Year: 2026 | Score: 99.50"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧱</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Types in C represent exact chunks of physical RAM!</strong> Unlike dynamically typed languages, C requires you to declare the exact binary representation: integers, floating point numbers, characters, and their memory byte allocations.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">%d / %i • 4 Bytes</span>
    <div class="pipeline-title">🔢 int</div>
    <p class="pipeline-desc">Stores whole integers from -2,147,483,648 to +2,147,483,647 (on 32/64-bit systems).</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">%f • 4 Bytes</span>
    <div class="pipeline-title">🌊 float</div>
    <p class="pipeline-desc">Single-precision IEEE-754 floating point numbers with 6-7 decimal places of precision.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#ede9fe; color:#6d28d9;">%lf • 8 Bytes</span>
    <div class="pipeline-title">🔬 double</div>
    <p class="pipeline-desc">Double-precision floating point numbers with ~15-17 decimal digits of precision.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">%c • 1 Byte</span>
    <div class="pipeline-title">🔤 char</div>
    <p class="pipeline-desc">Stores a single ASCII character represented as an 8-bit integer (e.g. 'A' is integer 65).</p>
  </div>
</div>

<div class="code-editor">
  <div class="code-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="filename">types_demo.c</span>
  </div>
  <pre><code><span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="kw">int</span> <span class="var">items</span> = <span class="num">12</span>;
    <span class="kw">float</span> <span class="var">price</span> = <span class="num">19.99f</span>;
    <span class="kw">char</span> <span class="var">currency</span> = <span class="str">'$'</span>;

    <span class="fn">printf</span>(<span class="str">"Purchased %d items at %c%.2f each.\\n"</span>, <span class="var">items</span>, <span class="var">currency</span>, <span class="var">price</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre>
</div>
<p class="caption">Figure 1.2: Format specifiers act as placeholders where variables are safely substituted in order.</p>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ Single vs Double Quotes</div>
  <p>In C, single quotes <code>'A'</code> represent a single <code>char</code>. Double quotes <code>"A"</code> represent a string array ending with a null byte <code>'\\0'</code>. Never mix them up!</p>
</div>`
        },
        {
          id: "test3-l-1-3",
          module_id: "test3-mod-1",
          lesson_number: 3,
          title: "Lesson 1.3: Constants, Type Qualifiers & limits.h",
          order_index: 3,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n#define MAX_USERS 1000\n\nint main() {\n    const float TAX_RATE = 0.18f;\n    int revenue = 50000;\n    float tax = revenue * TAX_RATE;\n\n    printf(\"Max Users: %d\\n\", MAX_USERS);\n    printf(\"Calculated Tax: $%.2f\\n\", tax);\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Define a constant BUFFER_SIZE with value 512 using #define, and print 'Buffer Size: 512 bytes'.",
            hint: "#define BUFFER_SIZE 512 ... printf(\"Buffer Size: %d bytes\\n\", BUFFER_SIZE);",
            expected_output: "Buffer Size: 512 bytes"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔒</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Immutability prevents catastrophic bugs!</strong> In systems code, you declare fixed hardware parameters, buffer capacities, and physical constants using <code>const</code> variables and <code>#define</code> preprocessor macros.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">Macro • Preprocessor</span>
    <div class="pipeline-title">#define PI 3.14159</div>
    <p class="pipeline-desc">Replaces all occurrences of <code>PI</code> with the literal number before compilation.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">Type Qualifier • Compiler</span>
    <div class="pipeline-title">const int MAX = 100;</div>
    <p class="pipeline-desc">Enforces read-only memory at compile time; trying to reassign triggers a compilation error.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m1",
        course_id: "course-test-3-c",
        module_index: 1,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m1-q1",
            question: "Which compilation stage in C is responsible for expanding #include headers and #define macros?",
            options: ["Linker", "Preprocessor", "Assembler", "Code Generator"],
            correctAnswer: 1,
            explanation: "The Preprocessor runs before the actual compiler, expanding macros and inserting header text."
          },
          {
            id: "t3-m1-q2",
            question: "What is the correct format specifier to print a standard 32-bit signed integer in C?",
            options: ["%f", "%s", "%d", "%c"],
            correctAnswer: 2,
            explanation: "%d (or %i) is the standard format specifier used by printf for signed integers."
          },
          {
            id: "t3-m1-q3",
            question: "What does returning 0 from the main() function indicate to the operating system?",
            options: ["Program has 0 memory allocated", "Program failed with an error", "Program executed successfully without error", "Program needs a reboot"],
            correctAnswer: 2,
            explanation: "In UNIX and POSIX standard conventions, return code 0 indicates normal, successful program termination."
          }
        ]
      }
    },
    {
      id: "test3-mod-2",
      course_id: "course-test-3-c",
      module_number: 2,
      title: "Module 2: Operators, Logic & Conditional Branching",
      description: "Master arithmetic, relational, and logical evaluation. Control program flow with if/else branches and switch-case jump tables.",
      order_index: 2,
      lessons: [
        {
          id: "test3-l-2-1",
          module_id: "test3-mod-2",
          lesson_number: 1,
          title: "Lesson 2.1: Arithmetic, Modulo & Compound Operators",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int a = 17;\n    int b = 5;\n\n    int quotient = a / b;\n    int remainder = a % b;\n    float exact = (float)a / b; // Explicit type casting\n\n    printf(\"Integer Division: %d\\n\", quotient);\n    printf(\"Remainder (Modulo): %d\\n\", remainder);\n    printf(\"Exact Division: %.2f\\n\", exact);\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a program with int seconds = 3670. Compute and print total hours and remaining minutes in format 'Hours: 1 | Minutes: 1'.",
            hint: "int hours = seconds / 3600; int mins = (seconds % 3600) / 60; printf(\"Hours: %d | Minutes: %d\\n\", hours, mins);",
            expected_output: "Hours: 1 | Minutes: 1"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📐</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Beware of Integer Division!</strong> In C, dividing two integers (like <code>5 / 2</code>) throws away the fractional part and gives <code>2</code>. To get <code>2.5</code>, at least one operand must be cast to a float!</p>
  </div>
</div>

<div class="code-editor">
  <div class="code-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="filename">math_operators.c</span>
  </div>
  <pre><code><span class="kw">int</span> <span class="var">x</span> = <span class="num">10</span>;
<span class="var">x</span> += <span class="num">5</span>; <span class="cmt">// x = 15</span>
<span class="var">x</span>++;    <span class="cmt">// x = 16 (increment)</span>
<span class="kw">int</span> <span class="var">rem</span> = <span class="var">x</span> % <span class="num">3</span>; <span class="cmt">// 16 % 3 = 1</span></code></pre>
</div>`
        },
        {
          id: "test3-l-2-2",
          module_id: "test3-mod-2",
          lesson_number: 2,
          title: "Lesson 2.2: Decision Flow — if, else if, else & Nested Logic",
          order_index: 2,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int score = 85;\n\n    if (score >= 90) {\n        printf(\"Grade: A+ (Outstanding)\\n\");\n    } else if (score >= 75) {\n        printf(\"Grade: A (Excellent)\\n\");\n    } else if (score >= 50) {\n        printf(\"Grade: B (Passed)\\n\");\n    } else {\n        printf(\"Grade: F (Failed)\\n\");\n    }\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Check if int temp = 38 is greater than 37. If yes, print 'Status: Fever Alert!'. Otherwise print 'Status: Normal'.",
            hint: "if (temp > 37) printf(\"Status: Fever Alert!\\n\"); else printf(\"Status: Normal\\n\");",
            expected_output: "Status: Fever Alert!"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🚦</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>0 is False, Non-Zero is True!</strong> In C (before C99 bool), there was no native boolean type. Any expression that evaluates to <code>0</code> is treated as false, and any value like <code>1</code>, <code>-5</code>, or <code>42</code> is truthy.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-2-3",
          module_id: "test3-mod-2",
          lesson_number: 3,
          title: "Lesson 2.3: Switch-Case Branching & Fallthrough Mechanics",
          order_index: 3,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int code = 200;\n\n    switch (code) {\n        case 200:\n            printf(\"HTTP 200: OK (Success)\\n\");\n            break;\n        case 404:\n            printf(\"HTTP 404: Resource Not Found\\n\");\n            break;\n        case 500:\n            printf(\"HTTP 500: Internal Server Error\\n\");\n            break;\n        default:\n            printf(\"HTTP Status: Unknown Code\\n\");\n            break;\n    }\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create a switch statement on char command = 'R'. If 'R' print 'Action: Run'. If 'S' print 'Action: Stop'. Default 'Action: Idle'.",
            hint: "switch(command) { case 'R': printf(\"Action: Run\\n\"); break; ... }",
            expected_output: "Action: Run"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔀</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Switch compiles to a high-speed Jump Table!</strong> When you have many integer/character choices, <code>switch</code> allows the CPU to jump directly to the target code without evaluating dozens of <code>if-else</code> checks.</p>
  </div>
</div>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ Forgetting 'break' causes Fallthrough!</div>
  <p>If you omit <code>break;</code> inside a case, execution will keep falling through into subsequent cases until it finds a break or reaches the end!</p>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m2",
        course_id: "course-test-3-c",
        module_index: 2,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m2-q1",
            question: "In C, what is the result of evaluating the arithmetic expression: 7 / 2 ?",
            options: ["3.5", "3", "4", "Compilation Error"],
            correctAnswer: 1,
            explanation: "Because both 7 and 2 are integers, integer division truncates the decimal portion, resulting in 3."
          },
          {
            id: "t3-m2-q2",
            question: "In C conditions, which value is treated as FALSE?",
            options: ["-1", "0", "1", "Any non-zero integer"],
            correctAnswer: 1,
            explanation: "In C, the value 0 represents false, while any non-zero value evaluates to true."
          }
        ]
      }
    },
    {
      id: "test3-mod-3",
      course_id: "course-test-3-c",
      module_number: 3,
      title: "Module 3: Loops & Iterative Execution",
      description: "Harness repetition with for, while, and do-while loops. Control iteration flow with break and continue statements.",
      order_index: 3,
      lessons: [
        {
          id: "test3-l-3-1",
          module_id: "test3-mod-3",
          lesson_number: 1,
          title: "Lesson 3.1: Definite Iteration — The for Loop & Accumulators",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int sum = 0;\n\n    for (int i = 1; i <= 5; i++) {\n        sum += i;\n        printf(\"Adding %d -> Current Sum: %d\\n\", i, sum);\n    }\n\n    printf(\"Final Sum of 1 to 5 = %d\\n\", sum);\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a for loop that prints even numbers from 2 to 6, one per line (e.g. 'Even: 2', 'Even: 4', 'Even: 6').",
            hint: "for (int i = 2; i <= 6; i += 2) printf(\"Even: %d\\n\", i);",
            expected_output: "Even: 2\nEven: 4\nEven: 6"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔁</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>A for loop packs initialization, condition, and increment into a single clean line:</strong> <code>for (init; condition; update)</code>. It runs predictably for fixed ranges of data.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-3-2",
          module_id: "test3-mod-3",
          lesson_number: 2,
          title: "Lesson 3.2: while & do-while Loops — Condition-Driven Execution",
          order_index: 2,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int countdown = 3;\n\n    while (countdown > 0) {\n        printf(\"T-Minus: %d seconds...\\n\", countdown);\n        countdown--;\n    }\n    printf(\"Liftoff! 🚀\\n\");\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a while loop starting at count = 1. While count <= 3, print 'Step: count' and increment count.",
            hint: "int c = 1; while (c <= 3) { printf(\"Step: %d\\n\", c); c++; }",
            expected_output: "Step: 1\nStep: 2\nStep: 3"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⏳</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>while checks before running; do-while always runs at least once!</strong> Use <code>do-while</code> for interactive menus and user input validation where the prompt must show before checking.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-3-3",
          module_id: "test3-mod-3",
          lesson_number: 3,
          title: "Lesson 3.3: Loop Control Statements — break, continue & Nested Loops",
          order_index: 3,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Skipping odd numbers with continue:\\n\");\n    for (int i = 1; i <= 6; i++) {\n        if (i % 2 != 0) {\n            continue; // Skip current iteration\n        }\n        printf(\"Processed: %d\\n\", i);\n    }\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a loop from 1 to 10. When i reaches 4, break out immediately. Print each number as 'Num: i'.",
            hint: "for (int i=1; i<=10; i++) { if (i==4) break; printf(\"Num: %d\\n\", i); }",
            expected_output: "Num: 1\nNum: 2\nNum: 3"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⏹️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>break escapes the loop; continue skips to the next turn!</strong> Use <code>break</code> when search criteria is fulfilled, and <code>continue</code> to ignore invalid or filtered entries.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m3",
        course_id: "course-test-3-c",
        module_index: 3,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m3-q1",
            question: "Which loop construct in C is guaranteed to execute its body at least once even if the condition is initially false?",
            options: ["for loop", "while loop", "do-while loop", "nested loop"],
            correctAnswer: 2,
            explanation: "The do-while loop evaluates its condition at the bottom (exit-controlled), guaranteeing at least one execution."
          }
        ]
      }
    },
    {
      id: "test3-mod-4",
      course_id: "course-test-3-c",
      module_number: 4,
      title: "Module 4: Functions, Stack Frames & Scopes",
      description: "Deconstruct problems into reusable functions. Understand parameter passing by value, activation records on the call stack, storage classes, and recursive algorithms.",
      order_index: 4,
      lessons: [
        {
          id: "test3-l-4-1",
          module_id: "test3-mod-4",
          lesson_number: 1,
          title: "Lesson 4.1: Function Prototypes, Declarations & Call Semantics",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\n// Function prototype\nint calculateArea(int length, int width);\n\nint main() {\n    int l = 10;\n    int w = 5;\n    int area = calculateArea(l, w);\n\n    printf(\"Rectangle Area (%d x %d) = %d\\n\", l, w, area);\n    return 0;\n}\n\n// Function definition\nint calculateArea(int length, int width) {\n    return length * width;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create a function 'int cube(int n)' that returns n * n * n. In main, call it with 3 and print 'Cube of 3 is: 27'.",
            hint: "int cube(int n) { return n * n * n; } ... printf(\"Cube of 3 is: %d\\n\", cube(3));",
            expected_output: "Cube of 3 is: 27"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚙️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Why do we need Function Prototypes?</strong> The C compiler reads source files from top to bottom in a single pass. A prototype tells the compiler: <em>"Hey, this function exists later with these argument types — trust me!"</em></p>
  </div>
</div>`
        },
        {
          id: "test3-l-4-2",
          module_id: "test3-mod-4",
          lesson_number: 2,
          title: "Lesson 4.2: Storage Classes — auto, static, extern & Scope Rules",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nvoid hitCounter() {\n    static int count = 0; // Retains value across function calls!\n    count++;\n    printf(\"Function hit count: %d\\n\", count);\n}\n\nint main() {\n    hitCounter();\n    hitCounter();\n    hitCounter();\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create a function with a static variable 'calls' starting at 0. Increment and print 'Visit: 1', 'Visit: 2' on consecutive invocations.",
            hint: "static int calls = 0; calls++; printf(\"Visit: %d\\n\", calls);",
            expected_output: "Visit: 1\nVisit: 2"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏛️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Static variables live in the Data Segment, not on the Stack!</strong> While local variables are erased when a function returns, a <code>static</code> variable remembers its value for the entire lifetime of the program.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-4-3",
          module_id: "test3-mod-4",
          lesson_number: 3,
          title: "Lesson 4.3: Recursive Functions & The Call Stack",
          order_index: 3,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\n// Recursive Factorial: n! = n * (n-1)!\nint factorial(int n) {\n    // Base Case\n    if (n <= 1) return 1;\n    // Recursive Step\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int num = 5;\n    printf(\"Factorial of %d = %d\\n\", num, factorial(num));\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a recursive function 'int sumTo(int n)' that returns the sum of 1..n (base case: if n <= 1 return 1). Print sumTo(4) which is 10.",
            hint: "int sumTo(int n) { if (n <= 1) return 1; return n + sumTo(n - 1); } ... printf(\"Sum: %d\\n\", sumTo(4));",
            expected_output: "Sum: 10"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🥞</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Every function call pushes a Stack Frame onto RAM!</strong> When a function calls itself, new local variables and return addresses are added to the stack until hitting the <em>Base Case</em>, at which point the frames unwind and return values.</p>
  </div>
</div>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ Missing Base Case = Stack Overflow!</div>
  <p>If a recursive function never reaches a base case, it will consume all available stack memory until the OS kills the process with a Segmentation Fault (Stack Overflow).</p>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m4",
        course_id: "course-test-3-c",
        module_index: 4,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m4-q1",
            question: "Why are function prototypes placed at the top of a C source file?",
            options: ["To allocate RAM for function variables", "To inform the single-pass compiler about the function signature before its usage", "To make the function run in kernel mode", "To export the function to Python"],
            correctAnswer: 1,
            explanation: "Prototypes provide the compiler with return types and parameter types so it can type-check calls before encountering the actual definition."
          }
        ]
      }
    },
    {
      id: "test3-mod-5",
      course_id: "course-test-3-c",
      module_number: 5,
      title: "Module 5: Contiguous Memory — Arrays & Matrix Operations",
      description: "Understand continuous memory layout in RAM. Traverse 1D arrays, perform 2D matrix math, and pass arrays to functions.",
      order_index: 5,
      lessons: [
        {
          id: "test3-l-5-1",
          module_id: "test3-mod-5",
          lesson_number: 1,
          title: "Lesson 5.1: 1D Arrays — Physical Memory Layout & Traversal",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int scores[5] = {88, 92, 79, 95, 84};\n    int count = 5;\n\n    printf(\"First score (index 0): %d\\n\", scores[0]);\n    printf(\"Last score (index 4): %d\\n\", scores[4]);\n\n    int max = scores[0];\n    for (int i = 1; i < count; i++) {\n        if (scores[i] > max) {\n            max = scores[i];\n        }\n    }\n    printf(\"Highest Score: %d\\n\", max);\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Declare int arr[3] = {10, 20, 30}. Calculate their sum and print 'Total Sum: 60'.",
            hint: "int arr[3] = {10, 20, 30}; int sum = arr[0] + arr[1] + arr[2]; printf(\"Total Sum: %d\\n\", sum);",
            expected_output: "Total Sum: 60"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧱</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>An array in C is a contiguous block of bytes!</strong> If an integer array starts at memory address <code>0x1000</code>, element <code>arr[0]</code> is at <code>0x1000</code>, <code>arr[1]</code> is at <code>0x1004</code> (+4 bytes), and <code>arr[2]</code> is at <code>0x1008</code>.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-5-2",
          module_id: "test3-mod-5",
          lesson_number: 2,
          title: "Lesson 5.2: 2D Arrays & Matrix Mathematics",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    // 2x3 Matrix declaration\n    int matrix[2][3] = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n\n    printf(\"Matrix Rows & Columns:\\n\");\n    for (int r = 0; r < 2; r++) {\n        for (int c = 0; c < 3; c++) {\n            printf(\"%d \", matrix[r][c]);\n        }\n        printf(\"\\n\");\n    }\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create a 2x2 identity matrix int id[2][2] = {{1, 0}, {0, 1}}. Print 'Diagonal: 1 and 1'.",
            hint: "printf(\"Diagonal: %d and %d\\n\", id[0][0], id[1][1]);",
            expected_output: "Diagonal: 1 and 1"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📊</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Row-Major Ordering in RAM:</strong> C stores 2D arrays in Row-Major order. Row 0 elements are laid out sequentially first, followed immediately by Row 1 in physical memory.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-5-3",
          module_id: "test3-mod-5",
          lesson_number: 3,
          title: "Lesson 5.3: Array Decay & Passing Arrays to Functions",
          order_index: 3,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\n// When an array is passed, it decays into a pointer to the 1st element\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        printf(\"Element [%d]: %d\\n\", i, arr[i]);\n    }\n}\n\nint main() {\n    int data[4] = {10, 25, 50, 100};\n    printArray(data, 4);\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a function 'int findMin(int a[], int n)' that returns the minimum element. In main, test with {5, 2, 8} and print 'Min: 2'.",
            hint: "int findMin(int a[], int n) { int m = a[0]; for(int i=1; i<n; i++) if(a[i]<m) m=a[i]; return m; } ... printf(\"Min: %d\\n\", findMin(arr, 3));",
            expected_output: "Min: 2"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🚚</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Arrays decay into pointers when passed to functions!</strong> To prevent expensive memory copying, C passes the base memory address of the array. You must always pass the array size as a companion argument!</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m5",
        course_id: "course-test-3-c",
        module_index: 5,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m5-q1",
            question: "If an array int arr[5] is allocated at address 2000, and sizeof(int) is 4 bytes, what is the memory address of arr[3]?",
            options: ["2003", "2012", "2015", "2008"],
            correctAnswer: 1,
            explanation: "The address of arr[3] is base_address + (3 * sizeof(int)) = 2000 + (3 * 4) = 2012."
          }
        ]
      }
    },
    {
      id: "test3-mod-6",
      course_id: "course-test-3-c",
      module_number: 6,
      title: "Module 6: Strings as Null-Terminated Byte Arrays",
      description: "Learn how C represents text without a native string class. Master string literals, the terminating null character ('\\0'), string.h algorithms, and safe buffer handling.",
      order_index: 6,
      lessons: [
        {
          id: "test3-l-6-1",
          module_id: "test3-mod-6",
          lesson_number: 1,
          title: "Lesson 6.1: The Null Terminator ('\\0') & String Representation",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    char greeting[] = \"Hello\";\n    // Physically stored in RAM as: {'H', 'e', 'l', 'l', 'o', '\\0'}\n\n    printf(\"String: %s\\n\", greeting);\n    printf(\"First character: %c\\n\", greeting[0]);\n\n    // Manual string length calculation\n    int len = 0;\n    while (greeting[len] != '\\0') {\n        len++;\n    }\n    printf(\"Length of string: %d characters\\n\", len);\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Declare char lang[] = \"C Language\". Print 'Learning: C Language' using printf.",
            hint: "char lang[] = \"C Language\"; printf(\"Learning: %s\\n\", lang);",
            expected_output: "Learning: C Language"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔤</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>There is no 'string' type in C!</strong> Strings are simply arrays of <code>char</code> that end with a special byte with ASCII value 0, written as <code>'\\0'</code> (Null Terminator). This byte tells functions like <code>printf</code> where the text stops.</p>
  </div>
</div>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ Buffer Sizing Rule (+1 for '\\0')</div>
  <p>To store a word of 5 characters (like "Hello"), your char array must be at least <strong>6 bytes</strong> long to hold the final '\\0' byte!</p>
</div>`
        },
        {
          id: "test3-l-6-2",
          module_id: "test3-mod-6",
          lesson_number: 2,
          title: "Lesson 6.2: String Manipulation with string.h",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char first[20] = \"Super\";\n    char second[] = \"Fast\";\n\n    printf(\"Length of first: %d\\n\", (int)strlen(first));\n\n    // Concatenate strings: first becomes \"SuperFast\"\n    strcat(first, second);\n    printf(\"Combined string: %s\\n\", first);\n\n    // Compare strings (0 means identical)\n    if (strcmp(second, \"Fast\") == 0) {\n        printf(\"Match: second is 'Fast'\\n\");\n    }\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create char s1[30] = \"Hello \"; char s2[] = \"C!\"; Concatenate s2 into s1 using strcat and print 'Result: Hello C!'.",
            hint: "strcat(s1, s2); printf(\"Result: %s\\n\", s1);",
            expected_output: "Result: Hello C!"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧰</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Standard String Tools:</strong> <code>strlen()</code> counts bytes until <code>\\0</code>; <code>strcpy(dest, src)</code> copies characters; <code>strcat(dest, src)</code> appends text; and <code>strcmp(s1, s2)</code> performs lexicographical comparison.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-6-3",
          module_id: "test3-mod-6",
          lesson_number: 3,
          title: "Lesson 6.3: Buffer Overflows & Safe String APIs (strncpy, snprintf)",
          order_index: 3,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char buffer[16];\n    int userAge = 25;\n    char name[] = \"Alex\";\n\n    // Safe formatted printing with bounded buffer size\n    snprintf(buffer, sizeof(buffer), \"%s is %d yrs\", name, userAge);\n    printf(\"Safe Buffer Output: %s\\n\", buffer);\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Use snprintf to format char buf[32] with 'User: Admin | Level: 10' and print 'Output: User: Admin | Level: 10'.",
            hint: "snprintf(buf, sizeof(buf), \"User: %s | Level: %d\", \"Admin\", 10); printf(\"Output: %s\\n\", buf);",
            expected_output: "Output: User: Admin | Level: 10"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🛡️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Never use unsafe functions like gets() or strcpy()!</strong> Writing more characters than an array can hold overwrites neighboring RAM, leading to critical security vulnerabilities (Buffer Overflow exploits). Always use bounded APIs like <code>snprintf()</code>.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m6",
        course_id: "course-test-3-c",
        module_index: 6,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m6-q1",
            question: "What character marks the end of a valid C string in memory?",
            options: ["'\\n' (Newline)", "'\\0' (Null Terminator)", "EOF", "';' (Semicolon)"],
            correctAnswer: 1,
            explanation: "The null terminator '\\0' (ASCII 0) marks the end of string data in C character arrays."
          },
          {
            id: "t3-m6-q2",
            question: "What value does strcmp(s1, s2) return when strings s1 and s2 are completely identical?",
            options: ["1", "0", "-1", "true"],
            correctAnswer: 1,
            explanation: "strcmp returns 0 if both strings are lexicographically identical character-by-character."
          }
        ]
      }
    },
    {
      id: "test3-mod-7",
      course_id: "course-test-3-c",
      module_number: 7,
      title: "Module 7: Pointers & Deep Memory Mechanics (The Core of C)",
      description: "Demystify pointers, RAM addresses, indirection (*), pointer arithmetic, pass-by-reference, double pointers, and function pointers.",
      order_index: 7,
      lessons: [
        {
          id: "test3-l-7-1",
          module_id: "test3-mod-7",
          lesson_number: 1,
          title: "Lesson 7.1: Memory Addresses & Dereferencing (* and &)",
          order_index: 1,
          duration_minutes: 30,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int target = 42;\n    int *ptr = &target; // ptr holds the memory address of target\n\n    printf(\"Value of target: %d\\n\", target);\n    printf(\"Address of target: %p\\n\", (void*)ptr);\n    printf(\"Value via pointer dereference (*ptr): %d\\n\", *ptr);\n\n    // Mutating memory via pointer\n    *ptr = 99;\n    printf(\"New target value after *ptr = 99: %d\\n\", target);\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create int x = 10; int *p = &x; Set *p = 50; Print 'Updated x: 50'.",
            hint: "int x = 10; int *p = &x; *p = 50; printf(\"Updated x: %d\\n\", x);",
            expected_output: "Updated x: 50"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📍</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>A pointer is just a variable that stores a memory address number!</strong> The <code>&</code> (Address-Of) operator extracts where a variable lives in RAM. The <code>*</code> (Dereference) operator follows the address to read or write that physical memory cell.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">Address Operator (&)</span>
    <div class="pipeline-title">&var</div>
    <p class="pipeline-desc">Returns the memory coordinate where <code>var</code> is stored in physical RAM.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">Dereference Operator (*)</span>
    <div class="pipeline-title">*ptr</div>
    <p class="pipeline-desc">Peeks inside the target address to read or mutate the stored value.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-7-2",
          module_id: "test3-mod-7",
          lesson_number: 2,
          title: "Lesson 7.2: Pass-By-Reference — Mutating Caller Variables",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\n// Swapping values by passing memory addresses (pointers)\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10;\n    int y = 20;\n\n    printf(\"Before Swap: x = %d, y = %d\\n\", x, y);\n    swap(&x, &y); // Pass addresses of x and y\n    printf(\"After Swap:  x = %d, y = %d\\n\", x, y);\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a function 'void doubleValue(int *val)' that multiplies *val by 2. In main, call it with int num = 7 and print 'Doubled: 14'.",
            hint: "void doubleValue(int *val) { *val *= 2; } ... doubleValue(&num); printf(\"Doubled: %d\\n\", num);",
            expected_output: "Doubled: 14"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔄</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>C is strictly Pass-by-Value!</strong> When you pass an integer to a function, C creates a local copy. To allow a function to modify the caller's variable, you must pass the <em>pointer (address)</em> of that variable.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-7-3",
          module_id: "test3-mod-7",
          lesson_number: 3,
          title: "Lesson 7.3: Pointer Arithmetic & Array Equivalence",
          order_index: 3,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    int nums[] = {10, 20, 30, 40};\n    int *p = nums; // Array name decays to pointer to first element\n\n    printf(\"nums[0] via *p: %d\\n\", *p);\n    printf(\"nums[1] via *(p + 1): %d\\n\", *(p + 1));\n    printf(\"nums[2] via *(p + 2): %d\\n\", *(p + 2));\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create int vals[3] = {100, 200, 300}. Using pointer arithmetic *(vals + 2), print 'Third element: 300'.",
            hint: "printf(\"Third element: %d\\n\", *(vals + 2));",
            expected_output: "Third element: 300"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧮</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Pointer arithmetic scales by data type size!</strong> If <code>p</code> points to an <code>int</code> (4 bytes), doing <code>p + 1</code> increments the physical memory address by <strong>+4 bytes</strong>, moving cleanly to the next element.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m7",
        course_id: "course-test-3-c",
        module_index: 7,
        passing_score: 75,
        time_limit_minutes: 12,
        questions: [
          {
            id: "t3-m7-q1",
            question: "Given 'int x = 10; int *p = &x;', what does the expression '*p' do?",
            options: ["Yields the memory address of x", "Dereferences p to access or mutate the value of x", "Allocates a new heap variable", "Multiplies p by x"],
            correctAnswer: 1,
            explanation: "The dereference operator '*' follows the pointer address to read or write the actual value stored in that memory cell."
          },
          {
            id: "t3-m7-q2",
            question: "In C, what is 'arr[i]' under the hood according to pointer arithmetic equivalence?",
            options: ["*(arr + i)", "arr + i", "&(arr + i)", "arr->i"],
            correctAnswer: 0,
            explanation: "The array indexing operator arr[i] is syntactically identical to *(arr + i) in C standard specifications."
          }
        ]
      }
    },
    {
      id: "test3-mod-8",
      course_id: "course-test-3-c",
      module_number: 8,
      title: "Module 8: Dynamic Memory Allocation & Heap Management",
      description: "Manage dynamic heap memory using malloc(), calloc(), realloc(), and free(). Prevent catastrophic memory leaks and dangling pointers.",
      order_index: 8,
      lessons: [
        {
          id: "test3-l-8-1",
          module_id: "test3-mod-8",
          lesson_number: 1,
          title: "Lesson 8.1: Heap vs Stack & The malloc() / free() Lifecycle",
          order_index: 1,
          duration_minutes: 30,
          content_type: "text",
          starter_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int size = 3;\n    // Allocate memory on Heap for 3 integers\n    int *arr = (int *)malloc(size * sizeof(int));\n\n    if (arr == NULL) {\n        printf(\"Memory allocation failed!\\n\");\n        return 1;\n    }\n\n    // Populate heap array\n    arr[0] = 100;\n    arr[1] = 200;\n    arr[2] = 300;\n\n    printf(\"Heap Array Values: %d, %d, %d\\n\", arr[0], arr[1], arr[2]);\n\n    // ALWAYS free dynamically allocated memory\n    free(arr);\n    arr = NULL; // Prevent dangling pointer\n    printf(\"Heap memory safely freed!\\n\");\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Allocate memory for 2 floats using malloc. Set them to 1.5f and 2.5f, print 'Sum: 4.00', and free the memory.",
            hint: "float *f = (float*)malloc(2*sizeof(float)); f[0]=1.5f; f[1]=2.5f; printf(\"Sum: %.2f\\n\", f[0]+f[1]); free(f);",
            expected_output: "Sum: 4.00"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">💾</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>The Stack is automatic; the Heap is manual!</strong> Stack variables are automatically created and destroyed when functions exit. The Heap allows you to allocate dynamic chunks of memory at runtime that live until you explicitly call <code>free()</code>.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">malloc(bytes)</span>
    <div class="pipeline-title">📦 Raw Allocation</div>
    <p class="pipeline-desc">Allocates requested bytes on the Heap leaving memory uninitialized (garbage values).</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">calloc(num, size)</span>
    <div class="pipeline-title">🧹 Zeroed Allocation</div>
    <p class="pipeline-desc">Allocates heap memory and initializes every single byte to clean zero (0).</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">free(ptr)</span>
    <div class="pipeline-title">♻️ Release Memory</div>
    <p class="pipeline-desc">Gives the heap memory block back to the operating system.</p>
  </div>
</div>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ The Golden Rule: Every malloc needs a free!</div>
  <p>Failing to call <code>free()</code> leads to <strong>Memory Leaks</strong>, causing programs to consume RAM until your server or OS crashes!</p>
</div>`
        },
        {
          id: "test3-l-8-2",
          module_id: "test3-mod-8",
          lesson_number: 2,
          title: "Lesson 8.2: Dynamic Array Resizing with realloc() & calloc()",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Allocate initial buffer of 2 elements\n    int *nums = (int *)calloc(2, sizeof(int));\n    nums[0] = 10;\n    nums[1] = 20;\n\n    // Resize buffer to 4 elements dynamically\n    int *temp = (int *)realloc(nums, 4 * sizeof(int));\n    if (temp != NULL) {\n        nums = temp;\n        nums[2] = 30;\n        nums[3] = 40;\n    }\n\n    printf(\"Resized Array: %d, %d, %d, %d\\n\", nums[0], nums[1], nums[2], nums[3]);\n    free(nums);\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Allocate 1 int using malloc, set to 50. Use realloc to expand to 2 ints, set 2nd to 100. Print 'Values: 50, 100' and free memory.",
            hint: "int *p = (int*)malloc(sizeof(int)); *p=50; p=(int*)realloc(p, 2*sizeof(int)); p[1]=100; printf(\"Values: %d, %d\\n\", p[0], p[1]); free(p);",
            expected_output: "Values: 50, 100"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📈</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>realloc() expands or shrinks live heap memory!</strong> If contiguous memory is available behind the block, it expands in-place; otherwise, it moves data to a new location in RAM and frees the old block automatically.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-8-3",
          module_id: "test3-mod-8",
          lesson_number: 3,
          title: "Lesson 8.3: Memory Bugs — Leaks, Dangling Pointers & Double Free",
          order_index: 3,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int *)malloc(sizeof(int));\n    *ptr = 77;\n    printf(\"Valid Heap Value: %d\\n\", *ptr);\n\n    free(ptr);\n    ptr = NULL; // Crucial: sets pointer to NULL to prevent Dangling Pointer bugs\n\n    if (ptr == NULL) {\n        printf(\"Pointer safely grounded to NULL!\\n\");\n    }\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Demonstrate safety: allocate an int, set value 10, free it, set ptr = NULL, and print 'Safety check passed'.",
            hint: "int *p = malloc(sizeof(int)); free(p); p = NULL; printf(\"Safety check passed\\n\");",
            expected_output: "Safety check passed"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🚨</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>The 3 Deadly Memory Sins in C:</strong> 1) Memory Leaks (forgetting free), 2) Dangling Pointers (using a pointer after freeing), and 3) Double Free (calling free twice on the same pointer).</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m8",
        course_id: "course-test-3-c",
        module_index: 8,
        passing_score: 75,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m8-q1",
            question: "What does the function malloc(size) return if the system runs out of memory?",
            options: ["0x1", "NULL (0)", "-1", "Throws an Exception"],
            correctAnswer: 1,
            explanation: "malloc returns a NULL pointer if memory allocation fails. You should always check 'if (ptr == NULL)'."
          },
          {
            id: "t3-m8-q2",
            question: "Why should you set a pointer to NULL immediately after calling free(ptr)?",
            options: ["To speed up the CPU", "To prevent dangling pointer access bugs", "To notify the preprocessor", "It is required by GCC syntax"],
            correctAnswer: 1,
            explanation: "Setting ptr = NULL ensures subsequent code checks (like if (ptr != NULL)) will not accidentally dereference deallocated RAM."
          }
        ]
      }
    },
    {
      id: "test3-mod-9",
      course_id: "course-test-3-c",
      module_number: 9,
      title: "Module 9: Custom Types — Structures, Unions & Enums",
      description: "Model complex real-world data with struct, typedef, unions (shared memory), and enums. Master member access with the dot (.) and arrow (->) operators.",
      order_index: 9,
      lessons: [
        {
          id: "test3-l-9-1",
          module_id: "test3-mod-9",
          lesson_number: 1,
          title: "Lesson 9.1: Structures (struct) & The Arrow Operator (->)",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\n// Define a custom data structure\ntypedef struct {\n    int id;\n    char grade;\n    float gpa;\n} Student;\n\nint main() {\n    Student s1 = {101, 'A', 3.92f};\n    Student *sPtr = &s1;\n\n    // Direct member access via '.'\n    printf(\"Student ID: %d | Grade: %c\\n\", s1.id, s1.grade);\n\n    // Pointer member access via '->'\n    printf(\"GPA via Arrow Operator (->): %.2f\\n\", sPtr->gpa);\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Define a struct Point { int x; int y; }; Create a Point p = {10, 20}; Print 'Point: (10, 20)'.",
            hint: "struct Point { int x; int y; }; struct Point p = {10, 20}; printf(\"Point: (%d, %d)\\n\", p.x, p.y);",
            expected_output: "Point: (10, 20)"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📦</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>A struct groups multiple data types into a single contiguous record!</strong> Use the dot <code>.</code> operator on a struct instance, and the arrow <code>-></code> operator when you have a pointer to a struct.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-9-2",
          module_id: "test3-mod-9",
          lesson_number: 2,
          title: "Lesson 9.2: Memory Alignment, Struct Padding & sizeof",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nstruct PackedExample {\n    char a; // 1 byte + 3 bytes padding\n    int b;  // 4 bytes\n};\n\nint main() {\n    printf(\"Size of char: %d byte\\n\", (int)sizeof(char));\n    printf(\"Size of int: %d bytes\\n\", (int)sizeof(int));\n    printf(\"Total Struct Size (with CPU alignment padding): %d bytes\\n\", (int)sizeof(struct PackedExample));\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Declare struct Data { int x; int y; }; Print 'Data struct size: 8 bytes' using sizeof.",
            hint: "struct Data { int x; int y; }; printf(\"Data struct size: %d bytes\\n\", (int)sizeof(struct Data));",
            expected_output: "Data struct size: 8 bytes"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📐</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>CPUs read RAM in word boundaries (4 or 8 bytes)!</strong> To optimize memory bus access, the compiler inserts hidden <em>padding bytes</em> so 4-byte integers start at 4-byte aligned addresses.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-9-3",
          module_id: "test3-mod-9",
          lesson_number: 3,
          title: "Lesson 9.3: Unions (Shared Memory) & Enum Type Constants",
          order_index: 3,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\n// Union: All fields share the EXACT SAME memory location!\nunion DataPacket {\n    int intVal;\n    float floatVal;\n};\n\n// Enum: Named integer constants\nenum LogLevel { INFO = 1, WARN = 2, ERROR = 3 };\n\nint main() {\n    union DataPacket packet;\n    packet.intVal = 42;\n    printf(\"Union int value: %d\\n\", packet.intVal);\n\n    enum LogLevel currentLevel = ERROR;\n    printf(\"Current Log Level Enum: %d\\n\", currentLevel);\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Define enum Status { OFFLINE = 0, ONLINE = 1 }; Set status to ONLINE and print 'Status is: 1'.",
            hint: "enum Status { OFFLINE = 0, ONLINE = 1 }; enum Status s = ONLINE; printf(\"Status is: %d\\n\", s);",
            expected_output: "Status is: 1"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔄</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Unions overlay multiple variables in the same memory slot!</strong> While a struct allocates memory for all members, a union allocates only enough RAM for its single largest member.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m9",
        course_id: "course-test-3-c",
        module_index: 9,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m9-q1",
            question: "When accessing a struct member through a pointer 'ptr', which operator is used?",
            options: [". (Dot)", "-> (Arrow)", ":: (Scope Resolution)", "@ (At)"],
            correctAnswer: 1,
            explanation: "The arrow operator 'ptr->member' is shorthand for (*ptr).member when dereferencing struct pointers."
          },
          {
            id: "t3-m9-q2",
            question: "How does memory allocation for a 'union' differ from a 'struct' in C?",
            options: ["Unions allocate memory on the GPU", "All members in a union share the same memory space", "Unions cannot store integers", "Unions are allocated via malloc automatically"],
            correctAnswer: 1,
            explanation: "In a union, all member variables share the same physical memory location, sized to the largest member."
          }
        ]
      }
    },
    {
      id: "test3-mod-10",
      course_id: "course-test-3-c",
      module_number: 10,
      title: "Module 10: Bitwise Operations & Bitmasking",
      description: "Direct silicon manipulation! Master bitwise AND (&), OR (|), XOR (^), NOT (~), bit shifts (<<, >>), and bit flags for hardware registers.",
      order_index: 10,
      lessons: [
        {
          id: "test3-l-10-1",
          module_id: "test3-mod-10",
          lesson_number: 1,
          title: "Lesson 10.1: Bitwise Operators & Binary Shifts",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    unsigned char a = 5;  // Binary: 00000101\n    unsigned char b = 3;  // Binary: 00000011\n\n    printf(\"a & b (AND): %d\\n\", (a & b)); // 00000001 = 1\n    printf(\"a | b (OR):  %d\\n\", (a | b)); // 00000111 = 7\n    printf(\"a ^ b (XOR): %d\\n\", (a ^ b)); // 00000110 = 6\n\n    // Bit shifts (Fast multiplication/division by 2)\n    printf(\"a << 1 (Multiply by 2): %d\\n\", (a << 1)); // 10\n    printf(\"a >> 1 (Divide by 2):   %d\\n\", (a >> 1)); // 2\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Shift int val = 4 left by 2 bits (val << 2). Print 'Shifted: 16'.",
            hint: "int val = 4; printf(\"Shifted: %d\\n\", val << 2);",
            expected_output: "Shifted: 16"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">💡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Bit shifts move raw binary bits left or right!</strong> Shifting left <code>x << 1</code> doubles the number in 1 CPU clock cycle. Shifting right <code>x >> 1</code> halves the integer instantly.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-10-2",
          module_id: "test3-mod-10",
          lesson_number: 2,
          title: "Lesson 10.2: Bitmasking — Setting, Clearing & Toggling Bits",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\n#define FLAG_READ    (1 << 0) // 0001 (1)\n#define FLAG_WRITE   (1 << 1) // 0010 (2)\n#define FLAG_EXECUTE (1 << 2) // 0100 (4)\n\nint main() {\n    unsigned char permissions = 0;\n\n    // Setting bits (OR)\n    permissions |= (FLAG_READ | FLAG_WRITE); // permissions = 3\n\n    // Checking bit status (AND)\n    if (permissions & FLAG_READ) {\n        printf(\"Permission: READ is ENABLED\\n\");\n    }\n    if (permissions & FLAG_EXECUTE) {\n        printf(\"Permission: EXECUTE is ENABLED\\n\");\n    } else {\n        printf(\"Permission: EXECUTE is DISABLED\\n\");\n    }\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create int flags = 0; Turn on bit 3 using 'flags |= (1 << 3);'. Print 'Flags Value: 8'.",
            hint: "int flags = 0; flags |= (1 << 3); printf(\"Flags Value: %d\\n\", flags);",
            expected_output: "Flags Value: 8"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🚩</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Pack 8 boolean flags into 1 single byte!</strong> By using bitwise masks, you can toggle individual bit switches: <code>flags |= MASK</code> to set, <code>flags &= ~MASK</code> to clear, and <code>flags ^ MASK</code> to toggle.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m10",
        course_id: "course-test-3-c",
        module_index: 10,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m10-q1",
            question: "What bitwise operator is used to test if a specific bit flag is active?",
            options: ["& (Bitwise AND)", "| (Bitwise OR)", "~ (Bitwise NOT)", ">> (Right shift)"],
            correctAnswer: 0,
            explanation: "The bitwise AND (&) operator isolates specific bits with a mask to check if they are set (non-zero)."
          }
        ]
      }
    },
    {
      id: "test3-mod-11",
      course_id: "course-test-3-c",
      module_number: 11,
      title: "Module 11: File I/O & Persistent Storage",
      description: "Read and write data to disk streams. Work with text files and raw binary streams using fopen, fclose, fprintf, fscanf, fread, and fwrite.",
      order_index: 11,
      lessons: [
        {
          id: "test3-l-11-1",
          module_id: "test3-mod-11",
          lesson_number: 1,
          title: "Lesson 11.1: File Streams (FILE*), fopen, fprintf & fclose",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Simulating File Stream Operations:\\n\");\n    printf(\"Opening file in 'w' (write) mode...\\n\");\n    printf(\"Writing: ID=101, Name=Lernex to database.txt...\\n\");\n    printf(\"Flushing stream and closing file handle safely.\\n\");\n    printf(\"File I/O Success!\\n\");\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Write a program printing 'Stream: Opened' on line 1 and 'Stream: Closed' on line 2.",
            hint: "printf(\"Stream: Opened\\nStream: Closed\\n\");",
            expected_output: "Stream: Opened\nStream: Closed"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📂</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>A FILE* pointer represents an active OS File Descriptor!</strong> Always verify <code>if (fp == NULL)</code> after <code>fopen()</code>, and always call <code>fclose(fp)</code> to flush cached buffers to the physical SSD/HDD.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-11-2",
          module_id: "test3-mod-11",
          lesson_number: 2,
          title: "Lesson 11.2: Binary Files (fread, fwrite) & Seeking (fseek, ftell)",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: "#include <stdio.h>\n\nint main() {\n    printf(\"Binary I/O & Random Access Mechanics:\\n\");\n    printf(\"fwrite(&record, sizeof(struct Record), 1, fp);\\n\");\n    printf(\"fseek(fp, 0, SEEK_END); // Jump directly to end of file\\n\");\n    printf(\"long fileSize = ftell(fp); // Query exact byte position\\n\");\n    printf(\"Binary Record Serialized: OK\\n\");\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Print 'File Size: 1024 bytes' and 'Position: SEEK_SET'.",
            hint: "printf(\"File Size: 1024 bytes\\nPosition: SEEK_SET\\n\");",
            expected_output: "File Size: 1024 bytes\nPosition: SEEK_SET"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">💾</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Binary files store exact in-memory struct byte blobs!</strong> Using <code>fseek()</code> allows your program to jump instantly to any byte offset in gigabyte-sized files without reading sequentially from the beginning.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m11",
        course_id: "course-test-3-c",
        module_index: 11,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m11-q1",
            question: "What does fopen() return if a requested file cannot be opened due to missing permissions or non-existence?",
            options: ["-1", "NULL", "0xFF", "EOF"],
            correctAnswer: 1,
            explanation: "fopen() returns a NULL pointer if the file operation cannot be completed by the operating system."
          }
        ]
      }
    },
    {
      id: "test3-mod-12",
      course_id: "course-test-3-c",
      module_number: 12,
      title: "Module 12: Capstone Project — Dynamic Data Structures in C",
      description: "Build production-grade dynamic data structures from scratch. Implement dynamic linked lists, node pointers, insertion, deletion, and complete heap reclamation.",
      order_index: 12,
      lessons: [
        {
          id: "test3-l-12-1",
          module_id: "test3-mod-12",
          lesson_number: 1,
          title: "Lesson 12.1: Building a Dynamic Singly Linked List Node Engine",
          order_index: 1,
          duration_minutes: 35,
          content_type: "text",
          starter_code: "#include <stdio.h>\n#include <stdlib.h>\n\n// Node structure with self-referential pointer\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* createNode(int value) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    newNode->data = value;\n    newNode->next = NULL;\n    return newNode;\n}\n\nint main() {\n    // Create linked nodes: [10] -> [20] -> [30] -> NULL\n    Node *head = createNode(10);\n    head->next = createNode(20);\n    head->next->next = createNode(30);\n\n    printf(\"Linked List Traversal:\\n\");\n    Node *curr = head;\n    while (curr != NULL) {\n        printf(\"[%d] -> \", curr->data);\n        curr = curr->next;\n    }\n    printf(\"NULL\\n\");\n\n    // Free linked list\n    curr = head;\n    while (curr != NULL) {\n        Node *temp = curr->next;\n        free(curr);\n        curr = temp;\n    }\n    printf(\"All Nodes Safely Freed from Heap!\\n\");\n\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Create a linked list with nodes [100] -> [200] -> NULL. Traverse and print 'Node: 100', 'Node: 200'. Free memory.",
            hint: "Node *h = createNode(100); h->next = createNode(200); printf(\"Node: %d\\nNode: %d\\n\", h->data, h->next->data); free(h->next); free(h);",
            expected_output: "Node: 100\nNode: 200"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔗</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>A Linked List overcomes fixed array size limits!</strong> Each node lives in its own heap memory cell, chained together by a <code>next</code> pointer pointing to the next node's RAM address.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-12-2",
          module_id: "test3-mod-12",
          lesson_number: 2,
          title: "Lesson 12.2: Advanced Node Operations — Insertion, Search & Safe Deletion",
          order_index: 2,
          duration_minutes: 35,
          content_type: "text",
          starter_code: "#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int val;\n    struct Node *next;\n} Node;\n\nvoid pushFront(Node **headRef, int newVal) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    newNode->val = newVal;\n    newNode->next = *headRef;\n    *headRef = newNode;\n}\n\nint main() {\n    Node *head = NULL;\n    pushFront(&head, 30);\n    pushFront(&head, 20);\n    pushFront(&head, 10); // List is now: 10 -> 20 -> 30\n\n    printf(\"List head after pushFront: %d\\n\", head->val);\n    printf(\"Second element: %d\\n\", head->next->val);\n\n    // Clean up\n    while (head != NULL) {\n        Node *next = head->next;\n        free(head);\n        head = next;\n    }\n    printf(\"Linked list memory cleanly reclaimed.\\n\");\n    return 0;\n}",
          sandbox_language: "c",
          challenge: {
            task: "Print 'Status: Capstone Completed' and 'Grade: O (Mastery)'.",
            hint: "printf(\"Status: Capstone Completed\\nGrade: O (Mastery)\\n\");",
            expected_output: "Status: Capstone Completed\nGrade: O (Mastery)"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏆</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Double Pointers (Node**) allow modifying the Head pointer in-place!</strong> By passing the address of the head pointer, insertion and deletion helper functions can repoint the root of your data structures seamlessly.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m12",
        course_id: "course-test-3-c",
        module_index: 12,
        passing_score: 75,
        time_limit_minutes: 10,
        questions: [
          {
            id: "t3-m12-q1",
            question: "Why does a linked list node contain a pointer to another struct of its own type (self-referential structure)?",
            options: ["To cause infinite recursion", "To store the memory address of the subsequent chained node", "To force GCC to inline the struct", "To encrypt the stored integer"],
            correctAnswer: 1,
            explanation: "Self-referential pointers store the physical heap address of the next item, enabling dynamic data structures of unlimited length."
          }
        ]
      }
    }
  ],
  final_exam: {
    id: "test3-exam-final",
    course_id: "course-test-3-c",
    title: "C Programming & Systems Architecture Certification Exam",
    passing_score: 75,
    time_limit_minutes: 30,
    questions: [
      {
        id: "t3-fe-q1",
        question: "Which of the following describes the correct order of the C compilation pipeline?",
        options: [
          "Compiler -> Linker -> Assembler -> Preprocessor",
          "Preprocessor -> Compiler -> Assembler -> Linker",
          "Linker -> Assembler -> Compiler -> Preprocessor",
          "Preprocessor -> Linker -> Compiler -> Assembler"
        ],
        correctAnswer: 1,
        explanation: "GCC follows: 1) Preprocessor (text expansion), 2) Compiler (generates assembly), 3) Assembler (produces .o object files), 4) Linker (binds libc and creates binary executable)."
      },
      {
        id: "t3-fe-q2",
        question: "What is the memory size and dereference behavior of an int pointer 'int *p' on a modern 64-bit architecture?",
        options: [
          "Pointer size is 8 bytes; dereferencing (*p) reads 4 bytes of integer data",
          "Pointer size is 4 bytes; dereferencing (*p) reads 8 bytes",
          "Both pointer and target are 4 bytes",
          "Pointer size is 16 bytes"
        ],
        correctAnswer: 0,
        explanation: "On a 64-bit system, memory addresses are 8 bytes long. Dereferencing an int* reads/writes sizeof(int), which is 4 bytes."
      },
      {
        id: "t3-fe-q3",
        question: "What happens if free(ptr) is never called on memory allocated by malloc()?",
        options: [
          "The compiler automatically frees it after main returns",
          "Memory remains allocated on the Heap until process termination, causing a Memory Leak",
          "Triggers a compilation error",
          "The CPU executes slower instructions"
        ],
        correctAnswer: 1,
        explanation: "Unfreed heap memory remains allocated until the process terminates, creating memory leaks that degrade performance and crash long-running applications."
      },
      {
        id: "t3-fe-q4",
        question: "In C, if 'ptr' is a pointer to a struct containing member 'score', which expression is valid?",
        options: ["ptr.score", "ptr->score", "ptr::score", "ptr#score"],
        correctAnswer: 1,
        explanation: "The arrow operator 'ptr->score' is the direct C syntax for dereferencing a struct pointer and accessing its member."
      },
      {
        id: "t3-fe-q5",
        question: "What is the result of shifting the binary value 00000100 (4) left by 3 bits (4 << 3)?",
        options: ["12", "16", "32", "64"],
        correctAnswer: 2,
        explanation: "4 << 3 = 4 * 2^3 = 4 * 8 = 32 (Binary 00100000)."
      }
    ]
  }
};

const outputPath = path.join(process.cwd(), 'Courses', 'test-3.json');
fs.writeFileSync(outputPath, JSON.stringify(cCourse, null, 2), 'utf-8');
console.log(`✅ Successfully generated updated C Course with ${cCourse.modules.length} modules!`);
cCourse.modules.forEach(m => {
  console.log(`  - Module ${m.module_number}: "${m.title}" -> ${m.lessons.length} lessons`);
});
