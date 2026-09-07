import * as fs from 'fs';
import * as path from 'path';

// Complete C Programming Course in Natural Hinglish
const cHinglishCourse = {
  id: "course-test-3-c",
  title: "Mastering C Programming & Systems Architecture (Hinglish)",
  subtitle: "Silicon se Software tak — Memory, Pointers, Low-Level Control & Dynamic Data Structures",
  description: "C Programming ka sabse practical aur in-depth masterclass Hinglish mein! GCC compilation pipeline, RAM memory management, Pointers, Pointer Arithmetic, Malloc/Free Heap mechanics, Bitwise algorithms, Structs, File I/O aur Linked Lists ko zero se advanced level tak master karein.",
  category: "Technology",
  difficulty: "Intermediate",
  thumbnail_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 12,
  estimated_hours: 42,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    // -------------------------------------------------------------
    // MODULE 1
    // -------------------------------------------------------------
    {
      id: "test3-mod-1",
      course_id: "course-test-3-c",
      module_number: 1,
      title: "Module 1: C Introduction & Compilation Pipeline",
      description: "Samjhein C language direct hardware aur RAM se kaise communicate karti hai. Compilation ke 4 stages (Preprocessor, Compiler, Assembler, Linker) aur apna pehla C program likhein.",
      order_index: 1,
      lessons: [
        {
          id: "test3-l-1-1",
          module_id: "test3-mod-1",
          lesson_number: 1,
          title: "Lesson 1.1: C ki Shuruat & Compilation Pipeline",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `#include <stdio.h>

int main() {
    printf("Namaste Systems Programming World! 🚀\\n");
    printf("C language se aap direct CPU aur RAM ko control karte hain.\\n");
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Ek program likhein jo pehli line par 'C Language Masterclass' aur doosri line par 'Compiled with GCC' print kare.",
            hint: 'printf("C Language Masterclass\\n"); ke baad printf("Compiled with GCC\\n"); ka use karein.',
            expected_output: "C Language Masterclass\nCompiled with GCC"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>C modern computer science ki maa hai!</strong> Linux OS, Windows Kernel, PostgreSQL/Redis database engines, aur AAA game engines sab C mein likhe gaye hain kyunki C mein zero-overhead aur direct hardware control milta hai.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">Stage 01 • Preprocessing</span>
    <div class="pipeline-title">🔍 Text Expansion</div>
    <p class="pipeline-desc">Comments ko remove karta hai, <code>#include</code> headers ko add karta hai, aur <code>#define</code> macros ko expand karta hai.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">Stage 02 • Compilation</span>
    <div class="pipeline-title">⚙️ Assembly Code</div>
    <p class="pipeline-desc">Pure C code ko processor-specific Assembly instructions (jaise x86-64 ya ARM) mein convert karta hai.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#ede9fe; color:#6d28d9;">Stage 03 • Assembly</span>
    <div class="pipeline-title">💾 Machine Code (.o)</div>
    <p class="pipeline-desc">Assembly instructions ko CPU ke samajhne layak raw binary object code (0s aur 1s) mein convert karta hai.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">Stage 04 • Linking</span>
    <div class="pipeline-title">🔗 Executable (.exe)</div>
    <p class="pipeline-desc">Aapke object code aur C standard library (libc) ko combine karke final run-hone-layak executable file banata hai.</p>
  </div>
</div>

<div class="code-editor">
  <div class="code-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="filename">main.c</span>
  </div>
  <pre><code><span class="kw">#include</span> <span class="str">&lt;stdio.h&gt;</span> <span class="cmt">// Standard I/O library header file</span>

<span class="kw">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="str">"C Programming ki duniya mein swagat hai!\\n"</span>);
    <span class="kw">return</span> <span class="num">0</span>; <span class="cmt">// 0 return karne ka matlab OS ko success signal bhejna</span>
}</code></pre>
</div>
<p class="caption">Figure 1.1: Standard C program ka basic structure. Har ek C program ka execution hamesha main() function se start hota hai.</p>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ Semicolon (;) Lagana Bhoolna!</div>
  <p>C language mein har statement ke baad semicolon (;) lagana zaruri hai. Beginners ki sabse common syntax error yahi hoti hai!</p>
</div>

<div class="pro-tip">
  <div class="pro-tip-title">💡 Pro-Tip: Return 0 ka Matlab</div>
  <p>Operating system <code>main()</code> ke return code ko check karta hai. <code>0</code> return karne ka matlab hai ki program bina kisi crash ya error ke safalta-purvak execute hua.</p>
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
          starter_code: `#include <stdio.h>

int main() {
    int age = 22;
    float marks = 89.50f;
    char grade = 'A';
    double preciseValue = 3.1415926535;

    printf("Umar: %d saal\\n", age);
    printf("Marks: %.2f\\n", marks);
    printf("Grade: %c\\n", grade);
    printf("Pi ki exact value: %.4lf\\n", preciseValue);

    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Ek integer variable 'year' = 2026 aur float variable 'score' = 99.5 banayein, aur printf se 'Year: 2026 | Score: 99.50' print karein.",
            hint: 'int year = 2026; float score = 99.5f; printf("Year: %d | Score: %.2f\\n", year, score); ka use karein.',
            expected_output: "Year: 2026 | Score: 99.50"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧱</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>C mein Data Types ka matlab physical RAM ke blocks hote hain!</strong> Python ya JS ki tarah yahan dynamic typing nahi hoti. C mein aap compiler ko batate hain ki kitne bytes memory reserve karni hai (int, float, char, etc.).</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">%d / %i • 4 Bytes</span>
    <div class="pipeline-title">🔢 int (Integer)</div>
    <p class="pipeline-desc">Poore number store karta hai (-2,147,483,648 se +2,147,483,647 tak 32-bit systems par).</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">%f • 4 Bytes</span>
    <div class="pipeline-title">🌊 float (Decimals)</div>
    <p class="pipeline-desc">Single-precision decimal numbers, jisme lagbhag 6-7 digits tak accuracy milti hai.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#ede9fe; color:#6d28d9;">%lf • 8 Bytes</span>
    <div class="pipeline-title">🔬 double (High Precision)</div>
    <p class="pipeline-desc">Double-precision decimal numbers, jisme 15-17 digits tak ki high mathematical accuracy milti hai.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">%c • 1 Byte</span>
    <div class="pipeline-title">🔤 char (Single Letter)</div>
    <p class="pipeline-desc">Single ASCII character store karta hai (jaise 'A', jiska internal binary value 65 hota hai).</p>
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

    <span class="fn">printf</span>(<span class="str">"Aapne %d items khareede %c%.2f prati item par.\\n"</span>, <span class="var">items</span>, <span class="var">currency</span>, <span class="var">price</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre>
</div>
<p class="caption">Figure 1.2: Format specifiers placeholders ki tarah kaam karte hain jahan variables ki values sequentially substitute hoti hain.</p>

<div class="pitfall-box">
  <div class="pitfall-title">⚠️ Single Quotes vs Double Quotes ka Farak</div>
  <p>C mein single quotes <code>'A'</code> ka matlab sirf 1 byte char hota hai. Double quotes <code>"A"</code> ka matlab string array hota hai jo null terminator <code>'\\0'</code> par khatam hota hai. Inhe mix mat karein!</p>
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
          starter_code: `#include <stdio.h>
#define MAX_USERS 1000

int main() {
    const float GST_RATE = 0.18f;
    int billingAmount = 50000;
    float finalTax = billingAmount * GST_RATE;

    printf("Maximum Allowed Users: %d\\n", MAX_USERS);
    printf("Calculated GST Tax: Rs. %.2f\\n", finalTax);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "#define ka use karke constant BUFFER_SIZE = 512 banayein aur 'Buffer Size: 512 bytes' print karein.",
            hint: '#define BUFFER_SIZE 512 ... printf("Buffer Size: %d bytes\\n", BUFFER_SIZE);',
            expected_output: "Buffer Size: 512 bytes"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔒</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Immutability se bugs rukte hain!</strong> Systems programming mein constants ka use hardware limits, buffer sizes, aur physics/finance constants ko lock karne ke liye kiya jata hai taaki galti se bhi code mein unhe koi badal na sake.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">Macro • Preprocessor</span>
    <div class="pipeline-title">#define PI 3.14159</div>
    <p class="pipeline-desc">Compile hone se pehle hi code mein jahan-jahan PI likha hai uski jagah value paste kar deta hai.</p>
  </div>

  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">Type Qualifier • Compiler</span>
    <div class="pipeline-title">const int MAX = 100;</div>
    <p class="pipeline-desc">Compiler is variable ko read-only bana deta hai; reassign karne par compile error aayega.</p>
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
            id: "course-test-3-c-m1-q1",
            question: "C compilation process mein #include aur #define ko expand karne ka kaam kaun karta hai?",
            options: ["Linker", "Preprocessor", "Assembler", "Code Optimizer"],
            correctAnswer: 1,
            explanation: "Preprocessor compilation shuru hone se pehle hi header files aur macros ko replace aur expand kar deta hai."
          },
          {
            id: "course-test-3-c-m1-q2",
            question: "C language mein standard 32-bit signed integer ko printf se print karne ke liye kaunsa format specifier use hota hai?",
            options: ["%f", "%s", "%d", "%c"],
            correctAnswer: 2,
            explanation: "%d (ya %i) format specifier decimal integer value ko print karne ke liye use kiya jata hai."
          },
          {
            id: "course-test-3-c-m1-q3",
            question: "main() function ke end mein return 0 karne ka kya matlab hota hai?",
            options: ["Program mein 0 memory bachi hai", "Program crash ho gaya", "Program bina kisi error ke safely complete hua", "Program ko root permissions chahiye"],
            correctAnswer: 2,
            explanation: "Operating system ko return 0 ka signal bhejne ka matlab hai execution fully successful raha."
          },
          {
            id: "course-test-3-c-m1-q4",
            question: "Modern computer architectures par standard 'char' data type RAM mein kitni memory leta hai?",
            options: ["1 Byte (8 bits)", "2 Bytes", "4 Bytes", "8 Bytes"],
            correctAnswer: 0,
            explanation: "ANSI/ISO C standard ke mutabiq sizeof(char) hamesha guaranteed 1 byte (8 bits) hota hai."
          },
          {
            id: "course-test-3-c-m1-q5",
            question: "printf() aur scanf() functions ko use karne ke liye kaunsi standard header file include karni padti hai?",
            options: ["<stdlib.h>", "<string.h>", "<stdio.h>", "<math.h>"],
            correctAnswer: 2,
            explanation: "<stdio.h> (Standard Input Output) header file mein printf aur scanf ke function prototypes hote hain."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 2
    // -------------------------------------------------------------
    {
      id: "test3-mod-2",
      course_id: "course-test-3-c",
      module_number: 2,
      title: "Module 2: Operators, Logic & Conditional Branching",
      description: "Arithmetic operations, Modulo operator, Boolean logic conditions (if-else, ternary) aur Switch-Case branching ko master karein.",
      order_index: 2,
      lessons: [
        {
          id: "test3-l-2-1",
          module_id: "test3-mod-2",
          lesson_number: 1,
          title: "Lesson 2.1: Arithmetic, Modulo & Compound Operators",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>

int main() {
    int a = 17, b = 5;
    int quotient = a / b;
    int remainder = a % b;

    printf("Bhagfal (Quotient): %d\\n", quotient);
    printf("Sheshfal (Remainder): %d\\n", remainder);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Ek number 'num = 29' ka modulo 4 nikaalein aur '29 % 4 = 1' format mein print karein.",
            hint: 'int num = 29; printf("29 %% 4 = %d\\n", num % 4); (printf mein %% se percent sign print hota hai)',
            expected_output: "29 % 4 = 1"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚙️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Integer Division decimal hissa truncate (hata) deta hai!</strong> C mein agar dono numbers integer hain, to <code>7 / 2</code> ka answer <code>3</code> aayega, <code>3.5</code> nahi. Modulo operator <code>%</code> sirf remainder deta hai.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-2-2",
          module_id: "test3-mod-2",
          lesson_number: 2,
          title: "Lesson 2.2: Decision Flow — if, else if & Nested Logic",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>

int main() {
    int marks = 85;

    if (marks >= 90) {
        printf("Grade: A+\\n");
    } else if (marks >= 75) {
        printf("Grade: A - Shandaar pradarshan!\\n");
    } else {
        printf("Hard work karte rahein!\\n");
    }

    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Ek variable 'temp = 38' check karein. Agar temp > 35 hai to 'Garmi bahut hai!', warna 'Mausam theek hai' print karein.",
            hint: 'if (temp > 35) { printf("Garmi bahut hai!\\n"); }',
            expected_output: "Garmi bahut hai!"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔀</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>C mein 0 matlab FALSE, aur baki sab TRUE!</strong> C mein koi alag boolean type nahi hota tha (pehle). Koi bhi non-zero number (positive ya negative) hamesha true mana jata hai.</p>
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
          starter_code: `#include <stdio.h>

int main() {
    int option = 2;

    switch(option) {
        case 1:
            printf("Hindi bhasha chuni gayi.\\n");
            break;
        case 2:
            printf("Hinglish bhasha chuni gayi.\\n");
            break;
        default:
            printf("Invalid vikalp!\\n");
    }

    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Switch statement likhein jo option = 1 par 'Order Confirmed' aur break ke saath print kare.",
            hint: 'switch(option) { case 1: printf("Order Confirmed\\n"); break; }',
            expected_output: "Order Confirmed"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Switch-Case Jump Tables banata hai!</strong> Multiple if-else ke mukable Switch-Case CPU instructions ke level par direct jump table banakar O(1) time mein branch execute kar sakta hai.</p>
  </div>
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
            id: "course-test-3-c-m2-q1",
            question: "C mein expression '7 / 2' ka final output kya aayega?",
            options: ["3.5", "3", "4", "Compilation Error"],
            correctAnswer: 1,
            explanation: "Kyunki dono operands 7 aur 2 integers hain, integer division decimal hissa hata deta hai aur result 3 hota hai."
          },
          {
            id: "course-test-3-c-m2-q2",
            question: "C conditionals mein kaunsi value ko FALSE mana jata hai?",
            options: ["-1", "0", "1", "Koi bhi non-zero number"],
            correctAnswer: 1,
            explanation: "C language mein sirf 0 value false hoti hai, jabki koi bhi non-zero number true mana jata hai."
          },
          {
            id: "course-test-3-c-m2-q3",
            question: "Switch-case statement mein agar aap matched case ke baad 'break' lagana bhool jayein to kya hoga?",
            options: ["Compile error aayega", "Execution niche ke cases mein fall-through ho jayega", "Program terminate ho jayega", "Switch dobara shuru hoga"],
            correctAnswer: 1,
            explanation: "Bina break ke C niche ke baki sabhi cases ko bina condition check kiye execute kar deta hai (Fallthrough)."
          },
          {
            id: "course-test-3-c-m2-q4",
            question: "C mein integer division ka sheshfal (remainder) nikaalne ke liye kaunsa operator use hota hai?",
            options: ["/", "//", "%", "^"],
            correctAnswer: 2,
            explanation: "Modulo operator (%) do integers ke division ka remainder return karta hai."
          },
          {
            id: "course-test-3-c-m2-q5",
            question: "C mein Logical AND operation ke liye kaunsa symbol use hota hai?",
            options: ["&", "&&", "AND", "|"],
            correctAnswer: 1,
            explanation: "&& logical AND operator hai (short-circuiting ke sath), jabki & bitwise AND operator hai."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 3
    // -------------------------------------------------------------
    {
      id: "test3-mod-3",
      course_id: "course-test-3-c",
      module_number: 3,
      title: "Module 3: Loops & Iterative Execution",
      description: "For loops, While loops, Do-While loops aur Loop controls (break, continue) ke saath repetitive tasks ko automate karein.",
      order_index: 3,
      lessons: [
        {
          id: "test3-l-3-1",
          module_id: "test3-mod-3",
          lesson_number: 1,
          title: "Lesson 3.1: Definite Iteration — For Loop & Accumulators",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>

int main() {
    int sum = 0;

    for (int i = 1; i <= 5; i++) {
        sum += i;
        printf("Step %d: Kul jod = %d\\n", i, sum);
    }

    printf("Final Sum (1 se 5 tak): %d\\n", sum);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "For loop ka use karke 1 se 3 tak numbers print karein: 'Ginti: 1', 'Ginti: 2', 'Ginti: 3'.",
            hint: 'for (int i = 1; i <= 3; i++) { printf("Ginti: %d\\n", i); }',
            expected_output: "Ginti: 1\nGinti: 2\nGinti: 3"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔁</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>For Loop teen parts mein chalta hai: Init, Condition, Increment!</strong> CPU counter register ko har iteration par update karta hai aur condition false hone par loop se bahar nikal jata hai.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-3-2",
          module_id: "test3-mod-3",
          lesson_number: 2,
          title: "Lesson 3.2: While & Do-While Loops — Condition-Driven Execution",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>

int main() {
    int battery = 3;

    while (battery > 0) {
        printf("Battery bachi hai: %d bars\\n", battery);
        battery--;
    }

    printf("Device shutdown ho raha hai.\\n");
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Do-while loop se kam se kam 1 baar 'Executing at least once!' print karein.",
            hint: 'do { printf("Executing at least once!\\n"); } while(0);',
            expected_output: "Executing at least once!"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⏳</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>While pehle check karta hai, Do-While baad mein!</strong> Do-While loop ki body kam se kam 1 baar zaroor execute hoti hai chahe condition shuru se hi false kyun na ho.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-3-3",
          module_id: "test3-mod-3",
          lesson_number: 3,
          title: "Lesson 3.3: Loop Control — Break, Continue & Nested Loops",
          order_index: 3,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i == 3) {
            printf("Step 3 ko skip kiya ja raha hai (continue)\\n");
            continue;
        }
        printf("Processing item: %d\\n", i);
    }
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Ek loop chalayein jo i == 2 hone par 'Found 2' print karke break kar de.",
            hint: 'for(int i=1; i<=5; i++) { if(i==2){ printf("Found 2\\n"); break; } }',
            expected_output: "Found 2"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🛑</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Break loop ko turant terminate karta hai, Continue agli iteration par jump karta hai!</strong> In controls se aap algorithms ko optimize kar sakte hain.</p>
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
            id: "course-test-3-c-m3-q1",
            question: "C mein kaunsa loop body ko kam se kam 1 baar zaroor execute karta hai chahe condition false ho?",
            options: ["for loop", "while loop", "do-while loop", "nested loop"],
            correctAnswer: 2,
            explanation: "Do-while loop exit-controlled hota hai, isliye condition check hone se pehle body 1 baar run ho chuki hoti hai."
          },
          {
            id: "course-test-3-c-m3-q2",
            question: "Loop ke andar 'continue' keyword kya karta hai?",
            options: ["Poore loop ko turant band kar deta hai", "Current iteration ka bacha code skip karke agle cycle par jump karta hai", "Program restart karta hai", "Function se exit karta hai"],
            correctAnswer: 1,
            explanation: "continue current step ke bache hue hisse ko chhodkar sidhe next loop iteration par bhej deta hai."
          },
          {
            id: "course-test-3-c-m3-q3",
            question: "For loop se infinite loop banane ka sabse standard C syntax kya hai?",
            options: ["for(int i=0; i<1; i--)", "for(;;)", "for(while(true))", "loop()"],
            correctAnswer: 1,
            explanation: "for(;;) mein initialization, condition aur update teeno blank hote hain jo ki infinite loop ka standard tarika hai."
          },
          {
            id: "course-test-3-c-m3-q4",
            question: "'for (int i = 0; i < 5; i++)' loop kul kitni baar chalega?",
            options: ["4 baar", "5 baar", "6 baar", "Infinite baar"],
            correctAnswer: 1,
            explanation: "Yeh loop i = 0, 1, 2, 3, 4 ke liye chalega, yani pure 5 iterations."
          },
          {
            id: "course-test-3-c-m3-q5",
            question: "Nested loop ke andar 'break' statement likhne par kya hota hai?",
            options: ["Sirf innermost loop terminate hota hai", "Saare outer loops band ho jaate hain", "Program band ho jata hai", "Outer loop restart hota hai"],
            correctAnswer: 0,
            explanation: "break sirf usi immediate loop ko terminate karta hai jiske andar wo likha gaya hota hai."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 4
    // -------------------------------------------------------------
    {
      id: "test3-mod-4",
      course_id: "course-test-3-c",
      module_number: 4,
      title: "Module 4: Functions, Stack Frames & Scopes",
      description: "Modular programming, Function prototypes, Stack frame memory mechanics, Recursion aur Storage classes (auto, static, extern) seekhein.",
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
          starter_code: `#include <stdio.h>

// Function Prototype (Compiler ko advance mein batana)
int square(int x);

int main() {
    int num = 6;
    int result = square(num);
    printf("%d ka square hai: %d\\n", num, result);
    return 0;
}

int square(int x) {
    return x * x;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Ek function 'add(int a, int b)' banayein jo dono ka sum return kare aur 10 + 20 = 30 print kare.",
            hint: 'int add(int a, int b) { return a + b; } ... printf("Sum: %d\\n", add(10, 20));',
            expected_output: "Sum: 30"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧩</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Prototypes Compiler ke liye Contract hote hain!</strong> C single-pass compiler hota hai. Agar aap prototype nahi denge to compiler ko nahi pata chalega ki function kaunsa type return karega aur kitne arguments lega.</p>
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
          starter_code: `#include <stdio.h>

void trackVisits() {
    static int visitCount = 0; // Data segment mein rehta hai
    visitCount++;
    printf("Function call number: %d\\n", visitCount);
}

int main() {
    trackVisits();
    trackVisits();
    trackVisits();
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Static counter wala function 2 baar call karke 'Call: 1' aur 'Call: 2' print karein.",
            hint: 'void count() { static int c=0; c++; printf("Call: %d\\n", c); }',
            expected_output: "Call: 1\nCall: 2"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏷️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Static variables function khatam hone par destroy nahi hote!</strong> Normal local variables Stack Frame par bante aur mit-te hain, lekin <code>static</code> variables Data Segment mein rehte hain aur apni value yaad rakhte hain.</p>
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
          starter_code: `#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1; // Base Case (Rukne ki shart)
    return n * factorial(n - 1); // Recursive Call
}

int main() {
    int ans = factorial(5);
    printf("5 ka Factorial: %d\\n", ans);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Recursion se 4 ka factorial calculate karein aur 'Factorial of 4 is 24' print karein.",
            hint: 'printf("Factorial of 4 is %d\\n", factorial(4));',
            expected_output: "Factorial of 4 is 24"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🥞</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Recursion Stack Frames ka pahaad banata hai!</strong> Har recursive call stack par ek naya frame banati hai. Agar base case nahi hoga to stack memory bhar jayegi aur <em>Stack Overflow</em> error se crash ho jayega.</p>
  </div>
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
            id: "course-test-3-c-m4-q1",
            question: "C source code ke top par Function Prototype kyu likha jata hai?",
            options: ["RAM memory allocate karne ke liye", "Compiler ko function ka return type aur parameters pehle se batane ke liye", "Function ko GPU par chalane ke liye", "Code ko Python mein export karne ke liye"],
            correctAnswer: 1,
            explanation: "Single-pass compiler ko call hone se pehle function signature ki jankari mil sake isliye prototype likhte hain."
          },
          {
            id: "course-test-3-c-m4-q2",
            question: "C mein primitive data types (int, float) functions ko kaise pass hote hain by default?",
            options: ["Pass-by-Reference", "Pass-by-Value", "Pass-by-Pointer", "Pass-by-Hardware"],
            correctAnswer: 1,
            explanation: "C strictly pass-by-value hoti hai, jisme argument ki copy stack frame par pass hoti hai."
          },
          {
            id: "course-test-3-c-m4-q3",
            question: "Kaunsa keyword local variable ki value ko function calls ke beech retain (yaad) rakhne deta hai?",
            options: ["auto", "register", "static", "volatile"],
            correctAnswer: 2,
            explanation: "static variable Data Segment mein store hota hai aur function khatam hone ke baad bhi destroy nahi hota."
          },
          {
            id: "course-test-3-c-m4-q4",
            question: "Agar recursive function mein sahi base case na ho to kaunsi runtime error aati hai?",
            options: ["Memory Fragmentation", "Stack Overflow (Segmentation Fault)", "Deadlock", "Syntax Error"],
            correctAnswer: 1,
            explanation: "Infinite recursion se RAM ka Call Stack bhar jata hai aur OS process ko Stack Overflow se crash kar deta hai."
          },
          {
            id: "course-test-3-c-m4-q5",
            question: "C mein 'extern' keyword ka kya matlab hota hai?",
            options: ["Variable sirf GPU par chalega", "Variable kisi doosri file/translation unit mein define kiya gaya hai", "Temporary variable hai", "Encrypted pointer hai"],
            correctAnswer: 1,
            explanation: "extern compiler ko batata hai ki is variable ki definition doosri source file mein hai jo linker solve karega."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 5
    // -------------------------------------------------------------
    {
      id: "test3-mod-5",
      course_id: "course-test-3-c",
      module_number: 5,
      title: "Module 5: Contiguous Memory — Arrays & Matrix Operations",
      description: "RAM mein 1D Arrays ka physical layout, 2D Matrices, Array indexing mechanics aur Array decay ko samjhein.",
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
          starter_code: `#include <stdio.h>

int main() {
    int scores[4] = {85, 92, 78, 96};

    printf("Pehla score: %d\\n", scores[0]);
    printf("Teesra score: %d\\n", scores[2]);

    printf("\\nSaare scores:\\n");
    for (int i = 0; i < 4; i++) {
        printf("Index %d: %d\\n", i, scores[i]);
    }
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Array 'int a[3] = {10, 20, 30};' ka sum nikaalein aur 'Sum: 60' print karein.",
            hint: 'int sum = a[0] + a[1] + a[2]; printf("Sum: %d\\n", sum);',
            expected_output: "Sum: 60"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📦</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Arrays RAM mein lagatar (contiguous) block hote hain!</strong> Agar array ka pehla element address 2000 par hai aur int 4 bytes ka hai, to agla element theek address 2004 par hoga.</p>
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
          starter_code: `#include <stdio.h>

int main() {
    int matrix[2][2] = {
        {1, 2},
        {3, 4}
    };

    printf("2x2 Matrix:\\n");
    for(int r = 0; r < 2; r++) {
        for(int c = 0; c < 2; c++) {
            printf("%d ", matrix[r][c]);
        }
        printf("\\n");
    }
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Matrix element [1][1] ko access karke 'Corner: 4' print karein.",
            hint: 'printf("Corner: %d\\n", matrix[1][1]);',
            expected_output: "Corner: 4"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">▦</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>C mein 2D Arrays Row-Major order mein store hote hain!</strong> Memory flat hoti hai, isliye pehle Row 0 ke saare elements aur fir Row 1 ke saare elements sequentially store hote hain.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-5-3",
          module_id: "test3-mod-5",
          lesson_number: 3,
          title: "Lesson 5.3: Array Decay & Passing Arrays to Functions",
          order_index: 3,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `#include <stdio.h>

void printArray(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int data[3] = {100, 200, 300};
    printArray(data, 3);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Array ko function mein pass karke uske pehle element ko print karein.",
            hint: 'void showFirst(int *arr) { printf("First: %d\\n", arr[0]); }',
            expected_output: "First: 100"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📉</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Array Decay: Array ka naam uska pehla pointer ban jata hai!</strong> Jab aap function mein array pass karte hain to poori array copy nahi hoti, balki pehle element ka memory address (pointer) pass hota hai.</p>
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
            id: "course-test-3-c-m5-q1",
            question: "Agar array 'int arr[5]' address 2000 par hai aur int 4 bytes ka hai, to arr[3] ka memory address kya hoga?",
            options: ["2003", "2012", "2015", "2008"],
            correctAnswer: 1,
            explanation: "Formula: Base + (Index * sizeof(int)) = 2000 + (3 * 4) = 2012."
          },
          {
            id: "course-test-3-c-m5-q2",
            question: "C language mein 2D arrays RAM memory mein kis order mein store hote hain?",
            options: ["Column-Major order", "Row-Major contiguous order", "Linked chunks", "Tree blocks"],
            correctAnswer: 1,
            explanation: "C hamesha Row-Major order follow karta hai, jahan row ke elements ek ke baad ek continuous memory mein aate hain."
          },
          {
            id: "course-test-3-c-m5-q3",
            question: "C mein 'Array Decay' ka kya matlab hota hai jab array function ko pass ki jati hai?",
            options: ["Array delete ho jati hai", "Array apne pehle element ke pointer (T*) mein convert ho jati hai", "Negative numbers 0 ban jaate hain", "Linked list ban jati hai"],
            correctAnswer: 1,
            explanation: "Function argument mein array name automatically first element ke pointer address mein convert (decay) ho jata hai."
          },
          {
            id: "course-test-3-c-m5-q4",
            question: "C array ka starting first index hamesha kya hota hai?",
            options: ["1", "0", "-1", "System specific"],
            correctAnswer: 1,
            explanation: "C language zero-based indexing follow karti hai, isliye pehla element arr[0] hota hai."
          },
          {
            id: "course-test-3-c-m5-q5",
            question: "'int a[5] = {10, 20};' likhne par baaki bache elements a[2], a[3], a[4] ki value kya hogi?",
            options: ["Random garbage values", "Zero (0)", "-1", "NULL"],
            correctAnswer: 1,
            explanation: "Partial initialization mein C baaki bache sabhi elements ko automatically zero (0) set kar deta hai."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 6
    // -------------------------------------------------------------
    {
      id: "test3-mod-6",
      course_id: "course-test-3-c",
      module_number: 6,
      title: "Module 6: Strings as Null-Terminated Byte Arrays",
      description: "Null terminator ('\\0'), string.h library (strlen, strcpy, strcmp), Buffer overflow safety aur snprintf ko master karein.",
      order_index: 6,
      lessons: [
        {
          id: "test3-l-6-1",
          module_id: "test3-mod-6",
          lesson_number: 1,
          title: "Lesson 6.1: Null Terminator ('\\0') & Character Arrays",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `#include <stdio.h>

int main() {
    char greeting[] = "Namaste";

    printf("Message: %s\\n", greeting);
    printf("Teesra character: %c\\n", greeting[2]);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Ek char array 'name[] = \"Lernex\";' banayein aur 'Platform: Lernex' print karein.",
            hint: 'char name[] = "Lernex"; printf("Platform: %s\\n", name);',
            expected_output: "Platform: Lernex"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧵</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>C mein Strings sirf Character Arrays hoti hain jo '\\0' par khatam hoti hain!</strong> C mein koi alag string class nahi hoti. '\\0' (Null Terminator) compiler ko batata hai ki text yahan end ho gaya.</p>
  </div>
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
          starter_code: `#include <stdio.h>
#include <string.h>

int main() {
    char str1[20] = "Super";
    char str2[] = "Fast";

    strcat(str1, str2); // str1 ban gaya "SuperFast"

    printf("Combined String: %s\\n", str1);
    printf("Total Length: %lu\\n", strlen(str1));
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "strlen() ka use karke 'Hello' ki length nikaalein aur 'Length: 5' print karein.",
            hint: 'printf("Length: %lu\\n", strlen("Hello"));',
            expected_output: "Length: 5"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧰</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>string.h library standard string tools deti hai!</strong> <code>strlen</code> length napta hai (null char ko chhodkar), <code>strcpy</code> copy karta hai, aur <code>strcmp</code> compare karta hai.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-6-3",
          module_id: "test3-mod-6",
          lesson_number: 3,
          title: "Lesson 6.3: Buffer Overflows & Safe String APIs",
          order_index: 3,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>

int main() {
    char safeBuffer[32];
    snprintf(safeBuffer, sizeof(safeBuffer), "User ID: %d", 4096);

    printf("%s\\n", safeBuffer);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "snprintf ka use karke safe buffer mein 'Secure: OK' format karein aur print karein.",
            hint: 'char buf[16]; snprintf(buf, sizeof(buf), "Secure: OK"); printf("%s\\n", buf);',
            expected_output: "Secure: OK"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🛡️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>gets() aur strcpy() dangerous hain!</strong> Agar input array se bada ho to Buffer Overflow ho jata hai jisse hackers program ko hack kar sakte hain. Hamesha <code>snprintf</code> aur <code>strncpy</code> use karein.</p>
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
            id: "course-test-3-c-m6-q1",
            question: "C string memory mein kis character par jaakar end hoti hai?",
            options: ["'\\n' (Newline)", "'\\0' (Null Terminator)", "EOF", "';' (Semicolon)"],
            correctAnswer: 1,
            explanation: "Null terminator '\\0' (ASCII value 0) string ke end ko mark karta hai."
          },
          {
            id: "course-test-3-c-m6-q2",
            question: "Agar do strings s1 aur s2 bilkul barabar (identical) hon to strcmp(s1, s2) kya return karega?",
            options: ["1", "0", "-1", "true"],
            correctAnswer: 1,
            explanation: "strcmp 0 return karta hai jab dono strings ke characters exact match karte hain."
          },
          {
            id: "course-test-3-c-m6-q3",
            question: "String literal \"Lernex\" ko memory mein store karne ke liye kitne bytes chahiye?",
            options: ["6 Bytes", "7 Bytes", "8 Bytes", "5 Bytes"],
            correctAnswer: 1,
            explanation: "\"Lernex\" ke 6 characters + 1 byte '\\0' (null terminator) = total 7 bytes."
          },
          {
            id: "course-test-3-c-m6-q4",
            question: "Modern C standard (C11) mein gets() function ko kyu remove kar diya gaya?",
            options: ["Bahut slow tha", "Isme bounds check na hone se khatarnak Buffer Overflow vulnerabilities hoti hain", "Spaces read nahi kar pata tha", "Root permission mangta tha"],
            correctAnswer: 1,
            explanation: "gets() destination buffer size check nahi karta, jisse memory overwrite ho sakti hai."
          },
          {
            id: "course-test-3-c-m6-q5",
            question: "Kaunsa standard function string format karne ke liye safe mana jata hai kyunki ye buffer size limit leta hai?",
            options: ["sprintf()", "snprintf()", "strcpy()", "strcat()"],
            correctAnswer: 1,
            explanation: "snprintf() buffer size limit accept karta hai aur buffer overflow hone se rokta hai."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 7
    // -------------------------------------------------------------
    {
      id: "test3-mod-7",
      course_id: "course-test-3-c",
      module_number: 7,
      title: "Module 7: Pointers & Deep Memory Mechanics (The Core of C)",
      description: "Memory Addresses (&), Dereferencing (*), Pass-by-Reference aur Pointer Arithmetic ke zariye hardware memory ko directly control karein.",
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
          starter_code: `#include <stdio.h>

int main() {
    int target = 42;
    int *ptr = &target; // ptr mein target ka memory address store hua

    printf("Target ki Value: %d\\n", target);
    printf("Target ka Address: %p\\n", (void*)ptr);
    printf("Pointer se Value access (*ptr): %d\\n", *ptr);

    *ptr = 99; // Pointer ke zariye value change kar di!
    printf("Nayi Target Value: %d\\n", target);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Pointer ke through ek variable 'val = 50' ko modify karke 100 banayein aur 'Value: 100' print karein.",
            hint: 'int val = 50; int *p = &val; *p = 100; printf("Value: %d\\n", val);',
            expected_output: "Value: 100"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🎯</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Pointer sirf ek Memory Address hota hai!</strong> <code>&</code> operator address nikalta hai (GPS coordinates), aur <code>*</code> (Dereference) operator us address par jakar rakhi value ko read ya write karta hai.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-7-2",
          module_id: "test3-mod-7",
          lesson_number: 2,
          title: "Lesson 7.2: Pass-By-Reference — Caller Variables ko Mutate Karna",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>

// Pass-by-Reference using Pointers
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before: x = %d, y = %d\\n", x, y);
    swap(&x, &y);
    printf("After:  x = %d, y = %d\\n", x, y);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Swap function ke baad 'x = 20, y = 10' print karein.",
            hint: 'swap(&x, &y); printf("x = %d, y = %d\\n", x, y);',
            expected_output: "x = 20, y = 10"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔄</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Pointers ke bina functions original variable ko modify nahi kar sakte!</strong> Pointer pass karne se function seedhe caller ke Stack Frame ki memory location ko mutate kar deta hai.</p>
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
          starter_code: `#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};
    int *p = arr;

    printf("Pehla element (*p): %d\\n", *p);
    printf("Doosra element (*(p + 1)): %d\\n", *(p + 1));
    printf("Teesra element (*(p + 2)): %d\\n", *(p + 2));
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Pointer arithmetic se *(p + 2) print karein: 'Third: 30'.",
            hint: 'printf("Third: %d\\n", *(p + 2));',
            expected_output: "Third: 30"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📐</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>arr[i] internal level par *(arr + i) hota hai!</strong> Pointer mein <code>+ 1</code> add karne par wo 1 byte nahi balki us data type ke size (jaise 4 bytes for int) ke hisab se memory mein aage jump karta hai.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m7",
        course_id: "course-test-3-c",
        module_index: 7,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "course-test-3-c-m7-q1",
            question: "Agar 'int x = 10; int *p = &x;' hai, to '*p' ki value kya hogi?",
            options: ["x ka memory address", "x ki actual value (10)", "Pointer p ka address", "Garbage value"],
            correctAnswer: 1,
            explanation: "Dereference operator (*) pointer ke address par jakar stored value (10) ko nikalta hai."
          },
          {
            id: "course-test-3-c-m7-q2",
            question: "C pointer arithmetic ke mutabiq 'arr[i]' expression kiske barabar hota hai?",
            options: ["*(arr + i)", "arr + i", "&(arr + i)", "arr->i"],
            correctAnswer: 0,
            explanation: "Array indexing syntax arr[i] C standard mein internally *(arr + i) ke barabar hota hai."
          },
          {
            id: "course-test-3-c-m7-q3",
            question: "Address-Of operator (&) kisi variable par lagane se kya milta hai?",
            options: ["Variable ka byte size", "RAM mein variable ka physical memory address", "Variable ki copy", "Type descriptor"],
            correctAnswer: 1,
            explanation: "&var us variable ka RAM coordinate memory address return karta hai."
          },
          {
            id: "course-test-3-c-m7-q4",
            question: "Agar 'int *p' address 0x1000 par hai aur int 4 bytes ka hai, to 'p + 2' kis address ko point karega?",
            options: ["0x1002", "0x1008", "0x1004", "0x1016"],
            correctAnswer: 1,
            explanation: "Pointer arithmetic type size se multiply hoti hai: 0x1000 + (2 * 4 bytes) = 0x1008."
          },
          {
            id: "course-test-3-c-m7-q5",
            question: "C language mein 'NULL pointer' kya hota hai?",
            options: ["Address 0 ko point karne wala pointer, jo kisi valid memory ko point nahi karta", "Jo khud ko point kare", "Uninitialized random address", "Read-only pointer"],
            correctAnswer: 0,
            explanation: "NULL macro address 0 ko represent karta hai jisse pata chalta hai ki pointer kisi valid memory ko point nahi kar raha."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 8
    // -------------------------------------------------------------
    {
      id: "test3-mod-8",
      course_id: "course-test-3-c",
      module_number: 8,
      title: "Module 8: Dynamic Memory Allocation & Heap Management",
      description: "Stack vs Heap, malloc(), calloc(), realloc(), free() lifecycle aur Memory leaks se bachne ke safe practices.",
      order_index: 8,
      lessons: [
        {
          id: "test3-l-8-1",
          module_id: "test3-mod-8",
          lesson_number: 1,
          title: "Lesson 8.1: Heap vs Stack & malloc() / free() Lifecycle",
          order_index: 1,
          duration_minutes: 30,
          content_type: "text",
          starter_code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Heap par 5 integers ki memory allocate karna
    int *arr = (int*) malloc(5 * sizeof(int));

    if (arr == NULL) {
        printf("Memory allocate nahi ho saki!\\n");
        return 1;
    }

    for (int i = 0; i < 5; i++) {
        arr[i] = (i + 1) * 10;
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    free(arr); // Memory leak se bachne ke liye free karna ZARURI hai
    arr = NULL; // Dangling pointer se bachne ke liye NULL set karna
    printf("Heap memory successfully deallocated!\\n");
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "malloc se 1 integer allocate karein, usme 77 store karein, print karein, fir free karein.",
            hint: 'int *p = malloc(sizeof(int)); *p = 77; printf("Value: %d\\n", *p); free(p);',
            expected_output: "Value: 77"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏔️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Stack automatic hota hai, Heap par aapko khud safai karni hoti hai!</strong> <code>malloc()</code> se runtime par jitni chahe memory maango, lekin kaam hone par <code>free()</code> karna mandatory hai, warna Memory Leak ho jayega.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-8-2",
          module_id: "test3-mod-8",
          lesson_number: 2,
          title: "Lesson 8.2: Dynamic Resizing with realloc() & calloc()",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *nums = (int*) calloc(2, sizeof(int)); // Zero-initialized memory
    nums[0] = 5;
    nums[1] = 10;

    // Array ko resize karke 4 elements ka banayein
    nums = (int*) realloc(nums, 4 * sizeof(int));
    nums[2] = 15;
    nums[3] = 20;

    printf("Resized Array: %d %d %d %d\\n", nums[0], nums[1], nums[2], nums[3]);
    free(nums);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "calloc se 2 integers allocate karein aur check karein ki default value 0 hai: 'Init: 0'.",
            hint: 'int *p = calloc(2, sizeof(int)); printf("Init: %d\\n", p[0]); free(p);',
            expected_output: "Init: 0"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📐</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>calloc memory ko zero kar deta hai, aur realloc size badha deta hai!</strong> Dynamic lists banane ke liye <code>realloc</code> sabse zaroori function hai.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-8-3",
          module_id: "test3-mod-8",
          lesson_number: 3,
          title: "Lesson 8.3: Memory Bugs — Leaks & Dangling Pointers",
          order_index: 3,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = malloc(sizeof(int));
    *ptr = 100;
    printf("Safe Value: %d\\n", *ptr);

    free(ptr);
    ptr = NULL; // Best practice: pointer ko NULL kar do

    if (ptr == NULL) {
        printf("Pointer safely neutralized!\\n");
    }
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Memory free karne ke baad pointer ko NULL set karke 'Pointer is NULL' print karein.",
            hint: 'free(ptr); ptr = NULL; if(ptr == NULL) printf("Pointer is NULL\\n");',
            expected_output: "Pointer is NULL"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🪲</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Dangling Pointer ek bhoot hai!</strong> Free karne ke baad pointer purane address ko point karta rehta hai. Agar aapne use dobara access kiya to program crash ho sakta hai. Isliye free ke turant baad <code>ptr = NULL;</code> karein.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m8",
        course_id: "course-test-3-c",
        module_index: 8,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "course-test-3-c-m8-q1",
            question: "Heap par uninitialized memory allocate karne ke liye kaunsa standard C function use hota hai?",
            options: ["calloc()", "malloc()", "realloc()", "free()"],
            correctAnswer: 1,
            explanation: "malloc(size) heap par raw uninitialized memory allocate karta hai."
          },
          {
            id: "course-test-3-c-m8-q2",
            question: "malloc() aur calloc() mein sabse bada farak kya hota hai?",
            options: ["calloc stack memory leta hai", "calloc allocated memory ke sabhi bytes ko zero (0) se initialize kar deta hai", "calloc faster hota hai", "calloc auto-free hota hai"],
            correctAnswer: 1,
            explanation: "calloc(n, size) memory allocate karke har ek byte ko 0 set kar deta hai."
          },
          {
            id: "course-test-3-c-m8-q3",
            question: "Agar malloc se allocate ki gayi heap memory ko free() na kiya jaye to kya hota hai?",
            options: ["Segmentation Fault", "Memory Leak", "Buffer Overflow", "Deadlock"],
            correctAnswer: 1,
            explanation: "Jab memory use na hone par bhi OS ko wapas na ki jaye to use Memory Leak kehte hain."
          },
          {
            id: "course-test-3-c-m8-q4",
            question: "C mein 'Dangling Pointer' kise kehte hain?",
            options: ["NULL pointer ko", "Aise pointer ko jo aisi memory ko point kar raha ho jise pehle hi free() kiya ja chuka hai", "Random pointer ko", "Read-only pointer ko"],
            correctAnswer: 1,
            explanation: "Deallocated memory ko point karne wale pointer ko dangling pointer kehte hain, jise access karne par crash ho sakta hai."
          },
          {
            id: "course-test-3-c-m8-q5",
            question: "Pehle se allocated heap memory block ke size ko dynamically badhane ya ghatane ke liye kaunsa function use hota hai?",
            options: ["resize()", "realloc()", "memshift()", "alloc_more()"],
            correctAnswer: 1,
            explanation: "realloc(ptr, new_size) existing heap memory chunk ko resize karta hai."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 9
    // -------------------------------------------------------------
    {
      id: "test3-mod-9",
      course_id: "course-test-3-c",
      module_number: 9,
      title: "Module 9: Custom Types — Structures, Unions & Enums",
      description: "Complex real-world entities ko model karein: Structures (struct), Arrow operator (->), Memory alignment padding, Unions aur Enums.",
      order_index: 9,
      lessons: [
        {
          id: "test3-l-9-1",
          module_id: "test3-mod-9",
          lesson_number: 1,
          title: "Lesson 9.1: Structures (struct) & Arrow Operator (->)",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>

struct Student {
    int id;
    char name[30];
    float gpa;
};

int main() {
    struct Student s1 = {101, "Rahul", 3.90f};
    struct Student *ptr = &s1;

    // Dot operator se direct access
    printf("Student ID: %d, Name: %s\\n", s1.id, s1.name);

    // Arrow operator (->) se pointer ke through access
    printf("Pointer se GPA: %.2f\\n", ptr->gpa);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Struct student ka ID 102 set karke 'ID: 102' print karein.",
            hint: 'struct Student s2; s2.id = 102; printf("ID: %d\\n", s2.id);',
            expected_output: "ID: 102"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏛️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Struct alag-alag data types ka bundle hota hai!</strong> OOP ke Classes ki tarah struct mein aap custom data structures banate hain. Pointer ke sath dot ki jagah arrow operator (<code>ptr->field</code>) use hota hai.</p>
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
          starter_code: `#include <stdio.h>

struct Example {
    char a;    // 1 byte
    // 3 bytes padding (CPU alignment ke liye)
    int b;     // 4 bytes
};

int main() {
    printf("Total Struct Size: %lu bytes\\n", sizeof(struct Example));
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "sizeof(struct Example) print karein: 'Size: 8'.",
            hint: 'printf("Size: %lu\\n", sizeof(struct Example));',
            expected_output: "Size: 8"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧱</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>CPU 4-byte ya 8-byte boundaries par fast read karta hai!</strong> Is speed ke liye compiler struct ke beech mein khali padding bytes daal deta hai jisse struct ka size fields ke direct sum se bada ho sakta hai.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-9-3",
          module_id: "test3-mod-9",
          lesson_number: 3,
          title: "Lesson 9.3: Unions (Shared Memory) & Enum Type Constants",
          order_index: 3,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `#include <stdio.h>

enum Level { LOW = 1, MEDIUM = 2, HIGH = 3 };

union Data {
    int i;
    float f;
};

int main() {
    enum Level currentLevel = HIGH;
    union Data d;
    d.i = 42;

    printf("Security Level: %d\\n", currentLevel);
    printf("Union Integer Value: %d\\n", d.i);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Enum level HIGH print karein: 'Level: 3'.",
            hint: 'enum Level lvl = HIGH; printf("Level: %d\\n", lvl);',
            expected_output: "Level: 3"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🎭</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Union mein saare fields ek hi memory location share karte hain!</strong> Struct mein har field ki alag memory hoti hai, jabki Union ka total size uske sabse bade member ke barabar hota hai.</p>
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
            id: "course-test-3-c-m9-q1",
            question: "Structure pointer (jaise Node *ptr) ke through members access karne ke liye kaunsa operator use hota hai?",
            options: [". (Dot operator)", "-> (Arrow operator)", ":: (Scope resolution)", "=> (Fat arrow)"],
            correctAnswer: 1,
            explanation: "ptr->member syntax (*ptr).member ka direct shortcut hota hai."
          },
          {
            id: "course-test-3-c-m9-q2",
            question: "C mein 'struct' aur 'union' ke beech mukhya farak kya hai?",
            options: ["struct heap par hota hai aur union stack par", "Struct mein har member ki alag memory hoti hai, jabki Union mein sabhi members same memory share karte hain", "Union mein numbers nahi rakh sakte", "Struct nest nahi ho sakte"],
            correctAnswer: 1,
            explanation: "Union ke sabhi members ek hi memory location par overlay hote hain, isliye ek time par sirf ek value valid rehti hai."
          },
          {
            id: "course-test-3-c-m9-q3",
            question: "C memory layout mein 'Structure Padding' kyu hoti hai?",
            options: ["Spaces add karne ke liye", "CPU word boundary alignment ke liye compiler extra bytes insert karta hai", "Encryption ke liye", "GPU allocation ke liye"],
            correctAnswer: 1,
            explanation: "CPU memory bus speed ko maximize karne ke liye data ko 32-bit ya 64-bit boundaries par align karta hai."
          },
          {
            id: "course-test-3-c-m9-q4",
            question: "C mein custom type aliases (jaise typedef unsigned long ulong;) banane ke liye kaunsa keyword use hota hai?",
            options: ["type", "alias", "typedef", "using"],
            correctAnswer: 2,
            explanation: "typedef keyword existing data types aur struct signatures ko naye aasan naam dene ke liye use hota hai."
          },
          {
            id: "course-test-3-c-m9-q5",
            question: "C mein Enum constants ki default value kahan se shuru hoti hai agar explicitly set na karein?",
            options: ["0 se integer ke roop mein", "1 se", "'A' se", "NULL se"],
            correctAnswer: 0,
            explanation: "Enum values default integer constants hoti hain jo 0 se shuru hokar 1, 2, 3... badhti hain."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 10
    // -------------------------------------------------------------
    {
      id: "test3-mod-10",
      course_id: "course-test-3-c",
      module_number: 10,
      title: "Module 10: Bitwise Operations & Bitmasking",
      description: "Low-level Binary operations (&, |, ^, ~, <<, >>), Bitmasking, Flag setting, aur Hardware register manipulation seekhein.",
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
          starter_code: `#include <stdio.h>

int main() {
    int a = 5;  // Binary: 0101
    int b = 3;  // Binary: 0011

    printf("a & b (AND): %d\\n", a & b); // 0001 = 1
    printf("a | b (OR):  %d\\n", a | b); // 0111 = 7
    printf("a ^ b (XOR): %d\\n", a ^ b); // 0110 = 6
    printf("a << 1 (Left Shift, Multiply by 2): %d\\n", a << 1); // 10
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Bitwise left shift se 4 << 1 calculate karein aur 'Result: 8' print karein.",
            hint: 'printf("Result: %d\\n", 4 << 1);',
            expected_output: "Result: 8"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Bitwise Operators 1 CPU cycle mein execute hote hain!</strong> Left shift (<code><< 1</code>) number ko 2 se multiply karta hai, aur Right shift (<code>>> 1</code>) number ko 2 se divide karta hai bina kisi heavy ALU math ke.</p>
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
          starter_code: `#include <stdio.h>

int main() {
    int flags = 0; // Saare bits 0 hain

    // 2nd bit ko SET karna (Turn ON)
    flags |= (1 << 2);
    printf("Bit 2 set hone ke baad: %d\\n", flags);

    // Check karna ki bit 2 set hai ya nahi
    if (flags & (1 << 2)) {
        printf("Bit 2 Active (ON) hai!\\n");
    }
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "1 << 3 calculate karke 'Mask: 8' print karein.",
            hint: 'printf("Mask: %d\\n", 1 << 3);',
            expected_output: "Mask: 8"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🎭</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Bitmasking se 1 byte mein 8 flags store ho jaate hain!</strong> Game state, network protocols, aur embedded systems mein permissions ko bitmask se represent kiya jata hai.</p>
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
            id: "course-test-3-c-m10-q1",
            question: "Bitwise Left Shift operator (x << 1) kisi number ke sath mathematically kya karta hai?",
            options: ["Number ko 2 se divide karta hai", "Number ko 2 se multiply karta hai", "Number mein 1 add karta hai", "Bits invert karta hai"],
            correctAnswer: 1,
            explanation: "Left shift karne se binary number ke right mein zero add hota hai, jisse value 2 guna (x * 2) ho jati hai."
          },
          {
            id: "course-test-3-c-m10-q2",
            question: "Kisi specific bit ko TOGGLE (flip) karne ke liye kaunsa bitwise operator use hota hai?",
            options: ["& (Bitwise AND)", "| (Bitwise OR)", "^ (Bitwise XOR)", "~ (Bitwise NOT)"],
            correctAnswer: 2,
            explanation: "XOR (^) with 1 bit ko flip kar deta hai (0 ban jata hai 1, aur 1 ban jata hai 0)."
          },
          {
            id: "course-test-3-c-m10-q3",
            question: "(5 & 3) ka binary evaluation karne par kya result aayega? (5 = 0101, 3 = 0011)",
            options: ["1 (0001)", "7 (0111)", "0 (0000)", "6 (0110)"],
            correctAnswer: 0,
            explanation: "0101 AND 0011 = 0001 (decimal 1) kyunki sirf aakhri bit dono mein 1 hai."
          },
          {
            id: "course-test-3-c-m10-q4",
            question: "Bitwise operator se number 'n' ko ODD check karne ka fastest tarika kya hai?",
            options: ["(n & 1) == 1", "(n | 1) == 1", "(n ^ 1) == 0", "(n >> 1) == 0"],
            correctAnswer: 0,
            explanation: "Sabhi odd numbers ka least significant bit (LSB) 1 hota hai, isliye (n & 1) 1 return karta hai."
          },
          {
            id: "course-test-3-c-m10-q5",
            question: "Bitwise NOT operator (~) kya karta hai?",
            options: ["-1 se multiply karta hai", "Sabhi binary bits ko invert karta hai (1 ban jata hai 0, 0 ban jata hai 1)", "Sign bit zero karta hai", "RAM clear karta hai"],
            correctAnswer: 1,
            explanation: "Unary ~ operator One's complement bitwise inversion karta hai."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 11
    // -------------------------------------------------------------
    {
      id: "test3-mod-11",
      course_id: "course-test-3-c",
      module_number: 11,
      title: "Module 11: File I/O & Persistent Storage",
      description: "Disk storage par files read/write karna: File Streams (FILE*), fopen, fprintf, fscanf, Binary Files (fread, fwrite) aur fseek.",
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
          starter_code: `#include <stdio.h>

int main() {
    FILE *fp = fopen("output.txt", "w");

    if (fp == NULL) {
        printf("File open nahi ho saki!\\n");
        return 1;
    }

    fprintf(fp, "Lernex C Masterclass Data\\nScore: %d\\n", 100);
    fclose(fp); // File stream ko flush aur close karna zaroori hai

    printf("File me data likha ja chuka hai!\\n");
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "File pointer NULL check simulate karein: agar fp == NULL to 'File not found' print karein.",
            hint: 'FILE *f = NULL; if(f == NULL) printf("File not found\\n");',
            expected_output: "File not found"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">💾</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Files Operating System ke Resource Handles hote hain!</strong> <code>fopen</code> file stream open karta hai aur <code>fclose</code> buffer ko disk par flush karke OS lock release karta hai.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-11-2",
          module_id: "test3-mod-11",
          lesson_number: 2,
          title: "Lesson 11.2: Binary Files (fread, fwrite) & Seeking (fseek)",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `#include <stdio.h>

struct Player {
    int id;
    int score;
};

int main() {
    struct Player p1 = {1, 9500};
    FILE *fp = fopen("player.bin", "wb");

    if (fp != NULL) {
        fwrite(&p1, sizeof(struct Player), 1, fp); // Direct memory bytes write
        fclose(fp);
        printf("Binary player data saved!\\n");
    }
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Binary write simulation print karein: 'Binary write completed'.",
            hint: 'printf("Binary write completed\\n");',
            expected_output: "Binary write completed"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Binary Files text se 10x fast hoti hain!</strong> <code>fwrite</code> aur <code>fread</code> memory struct ko bina string conversion ke direct disk par byte-by-byte save aur load karte hain.</p>
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
            id: "course-test-3-c-m11-q1",
            question: "fopen(\"data.txt\", \"r\") call karne par agar file disk par na mile to kya return hota hai?",
            options: ["0", "NULL", "EOF", "-1"],
            correctAnswer: 1,
            explanation: "Agar file open na ho sake to fopen() NULL pointer return karta hai."
          },
          {
            id: "course-test-3-c-m11-q2",
            question: "Open file stream ko safely flush aur close karne ke liye kaunsa function use hota hai?",
            options: ["close()", "fclose()", "file_end()", "free_file()"],
            correctAnswer: 1,
            explanation: "fclose(fp) saare pending data buffers ko disk par write karta hai aur file handle release karta hai."
          },
          {
            id: "course-test-3-c-m11-q3",
            question: "fopen() mein kaunsa mode purane data ko delete kiye bina naya data aakhri mein jodta hai (append)?",
            options: ["\"r\"", "\"w\"", "\"a\"", "\"r+\""],
            correctAnswer: 2,
            explanation: "Append mode (\"a\") file ke end mein writing ke liye file position set karta hai."
          },
          {
            id: "course-test-3-c-m11-q4",
            question: "Raw binary data ko direct memory se disk par read aur write karne ke liye kaunse functions use hote hain?",
            options: ["scanf() aur printf()", "fread() aur fwrite()", "getc() aur putc()", "cin aur cout"],
            correctAnswer: 1,
            explanation: "fread aur fwrite bina text parsing ke raw bytes ko transfer karte hain."
          },
          {
            id: "course-test-3-c-m11-q5",
            question: "File position cursor ko kisi specific byte offset par jump karane ke liye kaunsa function use hota hai?",
            options: ["fseek()", "ftell()", "rewind()", "fsetpos()"],
            correctAnswer: 0,
            explanation: "fseek(filePtr, offset, origin) file pointer cursor ko specified byte position par move karta hai."
          }
        ]
      }
    },

    // -------------------------------------------------------------
    // MODULE 12
    // -------------------------------------------------------------
    {
      id: "test3-mod-12",
      course_id: "course-test-3-c",
      module_number: 12,
      title: "Module 12: Capstone Project — Dynamic Data Structures in C",
      description: "C ke saare concepts ko jodkar dynamic Singly Linked List Data Structure engine banayein: Head insertion, Traversal aur Safe Heap Deallocation.",
      order_index: 12,
      lessons: [
        {
          id: "test3-l-12-1",
          module_id: "test3-mod-12",
          lesson_number: 1,
          title: "Lesson 12.1: Building a Dynamic Singly Linked List Node Engine",
          order_index: 1,
          duration_minutes: 30,
          content_type: "text",
          starter_code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int value) {
    struct Node *newNode = (struct Node*) malloc(sizeof(struct Node));
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

int main() {
    struct Node *head = createNode(10);
    head->next = createNode(20);
    head->next->next = createNode(30);

    // Traversal (List print karna)
    struct Node *temp = head;
    printf("Linked List: ");
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");

    // Clean up memory
    free(head->next->next);
    free(head->next);
    free(head);
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "Linked list nodes bana kar '10 -> 20 -> NULL' print karein.",
            hint: 'struct Node *head = createNode(10); head->next = createNode(20); printf("%d -> %d -> NULL\\n", head->data, head->next->data);',
            expected_output: "10 -> 20 -> NULL"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🔗</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Linked List Heap mein bikhre hue nodes ki chain hoti hai!</strong> Array ki tarah isme lagatar memory ki zarurat nahi hoti. Har node ke paas data aur agle node ka pointer address hota hai.</p>
  </div>
</div>`
        },
        {
          id: "test3-l-12-2",
          module_id: "test3-mod-12",
          lesson_number: 2,
          title: "Lesson 12.2: Advanced Node Operations — Insertion & Safe Deletion",
          order_index: 2,
          duration_minutes: 30,
          content_type: "text",
          starter_code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void insertHead(struct Node **headRef, int val) {
    struct Node *newNode = (struct Node*) malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *headRef;
    *headRef = newNode;
}

void freeList(struct Node *head) {
    struct Node *temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp); // Node ko safe tareeke se free karna
    }
}

int main() {
    struct Node *head = NULL;
    insertHead(&head, 50);
    insertHead(&head, 25);

    printf("Head element: %d\\n", head->data);
    freeList(head);
    printf("Poori List safely free ho gayi!\\n");
    return 0;
}`,
          sandbox_language: "c",
          challenge: {
            task: "insertHead se 25 ko head par insert karke 'Head: 25' print karein.",
            hint: 'insertHead(&head, 25); printf("Head: %d\\n", head->data);',
            expected_output: "Head: 25"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🛡️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Node free karne se pehle agle node ka address save karna padta hai!</strong> Agar aapne <code>free(head)</code> pehle kar diya to <code>head->next</code> ka pointer lose ho jayega aur baki list leak ho jayegi.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        id: "test3-quiz-m12",
        course_id: "course-test-3-c",
        module_index: 12,
        passing_score: 70,
        time_limit_minutes: 10,
        questions: [
          {
            id: "course-test-3-c-m12-q1",
            question: "Singly Linked List ke aakhri node (tail) ka 'next' pointer kis address ko point karta hai?",
            options: ["Head node ko", "NULL", "Previous node ko", "Random memory ko"],
            correctAnswer: 1,
            explanation: "Linear linked list ke last node ka next pointer hamesha NULL hota hai jo list ke end ko darshata hai."
          },
          {
            id: "course-test-3-c-m12-q2",
            question: "Singly Linked List ke HEAD par naya node insert karne ki Time Complexity kya hoti hai?",
            options: ["O(1) Constant Time", "O(N) Linear Time", "O(log N)", "O(N^2)"],
            correctAnswer: 0,
            explanation: "Head insertion mein sirf ek naya pointer connect hota hai jo hamesha O(1) instant time leta hai."
          },
          {
            id: "course-test-3-c-m12-q3",
            question: "Linked List ke kisi node ko free() karne se pehle 'current->next' ko temp variable mein save kyu karna padta hai?",
            options: ["Memory alignment ke liye", "Kyunki node free hone ke baad uske next pointer ko read karna undefined behavior (Use-After-Free) hai", "Compiler symbol table update ke liye", "Sorting ke liye"],
            correctAnswer: 1,
            explanation: "Node free hone par memory invalidate ho jati hai, isliye next address pehle se store karna mandatory hota hai."
          },
          {
            id: "course-test-3-c-m12-q4",
            question: "Array ke mukable Linked List ka sabse bada memory fayda kya hota hai?",
            options: ["Kam RAM use karta hai", "Dynamic size jo runtime par bina contiguous RAM block ke asani se grow ho sakta hai", "Sequential read faster hota hai", "Direct indexing milti hai"],
            correctAnswer: 1,
            explanation: "Linked list heap par jab chahe tab naye nodes add kar sakti hai bina bade lagatar memory block ke."
          },
          {
            id: "course-test-3-c-m12-q5",
            question: "Self-referential structure node ke andar agle node ko point karne ke liye member ka data type kya hona chahiye?",
            options: ["struct Node next;", "struct Node *next;", "void next;", "int next;"],
            correctAnswer: 1,
            explanation: "Structure khud ka direct instance nahi rakh sakta lekin apne hi type ka pointer (struct Node *next) store kar sakta hai."
          }
        ]
      }
    }
  ],
  final_exam: {
    id: "test3-final-exam",
    course_id: "course-test-3-c",
    title: "Mastering C Programming & Systems Certification Exam",
    passing_score: 80,
    time_limit_minutes: 25,
    questions: [
      {
        id: "test3-fe-q1",
        question: "Kaunsa memory area programmer dwara malloc() aur free() se manually manage kiya jata hai?",
        options: ["Call Stack", "Heap Memory", "Data Segment", "CPU Registers"],
        correctAnswer: 1,
        explanation: "Heap memory runtime dynamic allocations ke liye use hoti hai jise developer manually allocate aur deallocate karta hai."
      },
      {
        id: "test3-fe-q2",
        question: "C mein 'int *ptr' ko dereference (*ptr) karne ka kya matlab hota hai?",
        options: ["Pointer ka address print karna", "Pointer dwara point kiye gaye address par stored value ko access ya modify karna", "Pointer ko delete karna", "Array create karna"],
        correctAnswer: 1,
        explanation: "Dereferencing pointer ke address par jakar wahan ki value read ya update karne ki process hai."
      },
      {
        id: "test3-fe-q3",
        question: "Buffer Overflow vulnerability se bachne ke liye string formatting ka kaunsa function best practice hai?",
        options: ["gets()", "strcpy()", "snprintf()", "sprintf()"],
        correctAnswer: 2,
        explanation: "snprintf() maximum buffer size limit leta hai aur buffer exceed hone se rokta hai."
      },
      {
        id: "test3-fe-q4",
        question: "Struct aur Union ke beech memory layout ka main difference kya hota hai?",
        options: ["Struct ke members separate memory lete hain jabki Union ke saare members same memory space share karte hain", "Union heap par hota hai", "Struct mein pointers nahi ho sakte", "Union mein floats nahi hote"],
        correctAnswer: 0,
        explanation: "Union ke sabhi fields ek hi base address par overlap karte hain jisse memory conserve hoti hai."
      },
      {
        id: "test3-fe-q5",
        question: "Linked list mein memory leak se bachne ke liye kya karna zaroori hai?",
        options: ["Saare nodes ko NULL set karna", "Program end hone se pehle har dynamically allocated node ko free() karna", "Static memory use karna", "Array use karna"],
        correctAnswer: 1,
        explanation: "malloc() se bane har node ko free() karna mandatory hota hai taaki RAM OS ko wapas mil sake."
      }
    ]
  }
};

fs.writeFileSync(path.join(process.cwd(), 'Courses', 'test-3.json'), JSON.stringify(cHinglishCourse, null, 2));
console.log("✅ C Language course successfully converted to rich, natural Hinglish in Courses/test-3.json!");
