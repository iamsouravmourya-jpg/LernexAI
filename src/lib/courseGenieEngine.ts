/**
 * COURSEGENIE AI - CORE GENERATION ENGINE LOGIC & PROMPTS
 * Complete implementation of the CourseGenie AI Blueprint
 * Using Google Gemini API only (Strictly NO Groq).
 */

import type { Course, Module, Lesson } from "./course";

export const COURSEGENIE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-flash-latest",
  "gemini-3.6-flash",
  "gemini-3.1-flash-lite",
];

export interface CourseGenieInput {
  topic: string;
  totalModules?: number;
  lessonsPerModule?: number;
  targetAudience?: string;
  languageMode?: "Hinglish" | "English";
  pacing?: "Crash Course" | "Comprehensive" | "Deep Dive";
  customInstructions?: string;
}

export function buildCourseGenieSystemPrompt(input: CourseGenieInput): string {
  const topic = input.topic.trim();
  const totalModules = input.totalModules || 4;
  const lessonsPerModule = input.lessonsPerModule || 3;
  const totalLessonsCount = totalModules * lessonsPerModule;
  const targetAudience = input.targetAudience || "Beginner to Advanced";
  const customInstructions = input.customInstructions || (input.languageMode === "Hinglish" 
    ? "Provide explanations in friendly, natural Hinglish (Hindi + English blend) so complex concepts are effortless to grasp." 
    : "Provide explanations in crystal-clear, professional modern English.");

  return `You are "CourseGenie AI," an Elite Curriculum Architect and Master Instructional Designer.
Your mission is to produce comprehensive, high-depth, professional masterclasses matching the pedagogical depth of Udemy Best-Sellers and Great Learning Executive Programs.

Your task is to generate a complete, deeply detailed, highly engaging, and beautifully styled educational course as a single, valid, standalone HTML document starting with <!DOCTYPE html>.

PEDAGOGICAL BLUEPRINT & CURRICULUM DESIGN:
- Conduct rigorous, university-grade curriculum planning for "${topic}" tailored to ${targetAudience}.
- For "Basic" or "Beginner" courses: NEVER make them shallow, truncated, or basic-only in a trivial sense. Cover ALL fundamental building blocks thoroughly (architecture, dynamic memory/typing, operators, branching logic, loop mechanics, sequential collections, associative hash structures, functions/closures/scopes, file streams/I/O, error handling, OOP foundations, and an end-to-end capstone).
- Provide exactly ${totalModules} deep, logically ordered modules covering the entire domain syllabus without skipping.
- Every module MUST have a distinct technical theme and clear progression. Prohibit generic duplicate titles (e.g., do NOT repeat titles like "Deep Dive (Part 1)").

CRITICAL COMPLETION MANDATE (ZERO MISSING LESSONS & CORRECT SEQUENCING):
- You MUST start writing from Module 1, and proceed sequentially in order: Module 1, Module 2, Module 3, Module 4, Module 5, Module 6, Module 7, Module 8, Module 9, up to Module ${totalModules}.
- NEVER skip any modules. Never start from Module 5 or skip Modules 1 to 4 under any circumstances.
- Under every module, you MUST write and completely render all ${lessonsPerModule} lessons sequentially (e.g., Lesson 1.1, 1.2, 1.3 for Module 1).
- Total distinct lessons to generate: exactly ${totalLessonsCount} lessons.
- DO NOT truncate, DO NOT write comments like "<!-- repeat for lessons... -->", DO NOT skip lessons, and DO NOT leave any lesson blank.
- Each lesson container <div class="lesson">...</div> MUST end with this exact HTML comment on its own line:
<!-- end lesson -->

NO BASIC / SHALLOW CONTENT (UDEMY & GREAT LEARNING QUALITY BENCHMARK):
- Avoid superficial 2-sentence summaries. Write rich, educational, step-by-step masterclass lectures.
- Explain the "Why" behind concepts: why it was created, how systems work under the hood, and how tech leaders (Google, Netflix, Amazon, Stripe) leverage it.

EVERY SINGLE LESSON MUST CONTAIN ALL OF THESE STRUCTURED SECTIONS:
1. Deep Conceptual Explanation: 2-3 substantial paragraphs breaking down the mechanics with bolded key terms.
2. Production-Grade Visual / Code Mockup:
   - Wrapped in <div class="visual-container"> with an italicized <p class="caption">Figure X.Y: ...</p>.
   - For programming/tech: <div class="code-editor"> with macOS colored window dots, file name, and syntax spans (<span class="kw">, <span class="str">, <span class="num">, <span class="var">, <span class="fn">, <span class="cmt">).
   - For spreadsheets/finance: Excel grid table with column/row coordinates.
   - For business/strategy: Comparison matrix table or structured step cards.
3. Common Pitfall & Debugging Box:
   <div class="pitfall-box">
     <div class="pitfall-title">⚠️ Common Pitfall & Debugging Gotcha</div>
     <p>Describe the classic mistake developers/practitioners make, why the error occurs, and how senior engineers avoid it.</p>
   </div>
4. Senior Engineer Pro-Tip:
   <div class="pro-tip">
     <div class="pro-tip-title">💡 Senior Practitioner Pro-Tip</div>
     <p>High-leverage industry shortcut, memory/performance tip, or production architecture secret.</p>
   </div>
5. Key Takeaways & Interview Checklist:
   <div class="takeaways-box">
     <div class="takeaways-title">📌 Key Takeaways & Interview Prep</div>
     <ul>
       <li><strong>Core Takeaway:</strong> High-impact summary point.</li>
       <li><strong>Production Standard:</strong> Best practice to remember.</li>
       <li><strong>Interview Question:</strong> Common technical interview angle.</li>
     </ul>
   </div>
6. Interactive Hands-on Sandbox Challenge (For Live Execution):
   <div class="sandbox-challenge">
     <span class="challenge-badge">⚡ Interactive Sandbox Challenge</span>
     <h4 class="challenge-title">Challenge: [Concise Task Title]</h4>
     <p class="challenge-task">[Specific actionable coding task for the student to solve right now in the sandbox]</p>
     <p class="challenge-expected"><strong>Expected Output:</strong> [Exact console output or return value]</p>
     <p class="challenge-hint"><strong>Hint:</strong> [Helpful hint guiding the student]</p>
     <pre class="starter-code"><code>// Starter code ready to run in the sandbox
// TODO: Implement the solution
</code></pre>
   </div>

CRITICAL READABILITY & BREATHABLE SPACING:
- Line height: 1.8 to 1.85 for body text.
- Generous margins: margin-bottom: 22px on paragraphs, margin: 28px 0 on callout boxes.
- Lesson spacing: .lesson { margin-bottom: 55px; padding-bottom: 45px; border-bottom: 1px solid #E8E4E1; }.

STRICT REQUIREMENTS FOR THE HTML OUTPUT:
1. DOCUMENT FORMAT:
   - Output ONLY pure, valid HTML code starting with <!DOCTYPE html> and ending with </html>.
   - Do NOT wrap in markdown code blocks like \`\`\`html.
   - Include embedded CSS inside <style> with Google Fonts ('Inter' and 'JetBrains Mono').
2. CONTENT & TONE:
   - ${input.languageMode === "Hinglish" 
     ? "Engaging, natural Hinglish (conversational Hindi + English tech blend) as used in top Indian tech bootcamps." 
     : "Professional, encouraging, crystal-clear modern English."}
   - Context: ${topic}.
   - Target Audience: ${targetAudience}.

User Custom Request: ${customInstructions}`;
}

export function buildCourseGenieUserPrompt(input: CourseGenieInput): string {
  const topic = input.topic.trim();
  const totalModules = input.totalModules || 4;
  const lessonsPerModule = input.lessonsPerModule || 3;
  const totalLessonsCount = totalModules * lessonsPerModule;
  const targetAudience = input.targetAudience || "Beginner to Advanced";

  return `Generate an industry-grade, Udemy & Great Learning standard masterclass course on "${topic}".
Target Audience: ${targetAudience}.
Total Modules: ${totalModules}.
Lessons per module: ${lessonsPerModule}.
Total Lessons to generate in full: ${totalLessonsCount}.

MANDATORY PEDAGOGICAL BLUEPRINT:
1. Research and structure the curriculum from foundational mechanics to enterprise capstone.
2. Complete ALL ${totalModules} modules and ALL ${totalLessonsCount} lessons without skipping or abbreviating.
3. You MUST start writing from Module 1 and generate all modules sequentially: Module 1, Module 2, Module 3, Module 4, Module 5, Module 6, Module 7, Module 8, Module 9, up to Module ${totalModules}. NEVER skip modules. NEVER start at Module 5 or skip early foundational modules.
4. Every single lesson MUST feature:
   - In-depth, substantial lecture paragraphs (no short summaries).
   - Production-grade visual code mockup (<div class="code-editor">).
   - Common Pitfalls box (<div class="pitfall-box">).
   - Pro-Tip box (<div class="pro-tip">).
   - Key Takeaways & Interview Checklist (<div class="takeaways-box">).
   - Interactive Sandbox Challenge (<div class="sandbox-challenge"> with <pre class="starter-code"><code>...</code></pre>).
5. Each lesson container <div class="lesson">...</div> MUST end with this exact HTML comment on its own line:
<!-- end lesson -->

Output pure standalone HTML starting with <!DOCTYPE html> and ending with </html> now.`;
}

/**
 * Sanitizes and repairs HTML output
 */
export function sanitizeAndRepairHtml(rawText: string): string {
  let html = (rawText || "").trim();

  // 1. Remove markdown fence if present
  if (html.startsWith("```html")) {
    html = html.replace(/^```html\s*/i, "").replace(/\s*```$/, "");
  } else if (html.startsWith("```")) {
    html = html.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  // 2. Ensure DOCTYPE exists
  if (!html.toLowerCase().includes("<!doctype html")) {
    html = "<!DOCTYPE html>\n" + html;
  }

  // 3. Auto repair missing closing tags
  if (!html.includes("</html>")) {
    if (!html.includes("</body>")) {
      html = html + "\n</div></div></body></html>";
    } else {
      html = html + "\n</html>";
    }
  }

  return html;
}

/**
 * Parses the standalone HTML document into structured modules and lessons
 * for LernexAI's interactive learning environment
 */
export function parseHtmlToCourseStructure(
  html: string,
  topic: string,
  level: string = "Beginner to Advanced",
  language: string = "Hinglish",
  pacing: string = "Comprehensive"
): Course {
  const courseId = `course-gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  
  // Extract title
  let title = topic;
  const titleMatch = html.match(/<h1[^>]*class="[^"]*cover-title[^"]*"[^>]*>(.*?)<\/h1>/i) 
    || html.match(/<h1[^>]*>(.*?)<\/h1>/i)
    || html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    title = titleMatch[1].replace(/<[^>]+>/g, "").trim();
  }

  // Extract tagline
  let tagline = `A comprehensive, hands-on path to master ${topic} with interactive exercises.`;
  const subMatch = html.match(/<p[^>]*class="[^"]*cover-subtitle[^"]*"[^>]*>(.*?)<\/p>/i);
  if (subMatch && subMatch[1]) {
    tagline = subMatch[1].replace(/<[^>]+>/g, "").trim();
  }

  // Parse modules
  const modules: Module[] = [];
  
  // Regex to split by module blocks or headers
  const moduleBlocks = html.split(/<div[^>]*class="[^"]*module-block[^"]*"[^>]*>/i);
  
  if (moduleBlocks.length > 1) {
    // We found structured module-block elements!
    for (let mIdx = 1; mIdx < moduleBlocks.length; mIdx++) {
      const block = moduleBlocks[mIdx];
      const modTitleMatch = block.match(/<h2[^>]*>(.*?)<\/h2>/i) || block.match(/<div[^>]*class="[^"]*module-header[^"]*"[^>]*>[\s\S]*?<h2[^>]*>(.*?)<\/h2>/i);
      const modTitle = modTitleMatch ? modTitleMatch[1].replace(/<[^>]+>/g, "").trim() : `Module ${mIdx}`;

      const modDescMatch = block.match(/<p[^>]*class="[^"]*module-desc[^"]*"[^>]*>(.*?)<\/p>/i);
      const modDesc = modDescMatch ? modDescMatch[1].replace(/<[^>]+>/g, "").trim() : `Core principles and practical implementation of ${modTitle}.`;

      // Extract lessons within this module block
      const lessonBlocks = block.split(/<div[^>]*class="[^"]*lesson[^"]*"[^>]*>/i);
      const lessons: Lesson[] = [];

      for (let lIdx = 1; lIdx < lessonBlocks.length; lIdx++) {
        const lBlock = lessonBlocks[lIdx].split(/<\/div>\s*<!--\s*end lesson\s*-->/i)[0];
        const lesTitleMatch = lBlock.match(/<h3[^>]*>(.*?)<\/h3>/i);
        const lesTitle = lesTitleMatch ? lesTitleMatch[1].replace(/<[^>]+>/g, "").trim() : `Lesson ${mIdx}.${lIdx}`;

        // Determine sandbox type
        let sandboxType = "Code Editor";
        if (lBlock.includes("excel-grid")) sandboxType = "Spreadsheet Sandbox";
        else if (lBlock.includes("comparison-table") || lBlock.includes("step-grid")) sandboxType = "Interactive Spec";
        else if (lBlock.includes("practice")) sandboxType = "Hands-on Exercise";

        // Clean lesson content
        const lessonContentHtml = lBlock
          .replace(/<h3[^>]*>.*?<\/h3>/i, "") // remove heading since title handles it
          .trim();

        // Extract starter code
        let starterCode: string | undefined;
        const starterMatch = lBlock.match(/<pre[^>]*class="[^"]*starter-code[^"]*"[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i)
          || lBlock.match(/<div[^>]*class="[^"]*code-editor[^"]*"[^>]*>[\s\S]*?<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i)
          || lBlock.match(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);

        if (starterMatch && starterMatch[1]) {
          starterCode = starterMatch[1]
            .replace(/<span[^>]*>/gi, "")
            .replace(/<\/span>/gi, "")
            .replace(/<[^>]+>/g, "")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim();
        }

        // Determine sandbox language
        let sandboxLanguage: "javascript" | "html" | "python" = "javascript";
        const testStr = `${topic} ${lesTitle} ${starterCode || ""}`.toLowerCase();
        if (testStr.includes("python") || testStr.includes("pandas") || testStr.includes("numpy") || (starterCode && (starterCode.includes("def ") || starterCode.includes("print(")))) {
          sandboxLanguage = "python";
        } else if (testStr.includes("html") || testStr.includes("css") || (starterCode && (starterCode.includes("<!doctype") || starterCode.includes("<html") || starterCode.includes("<div")))) {
          sandboxLanguage = "html";
        }

        // Extract challenge
        let challenge: Lesson["challenge"] | undefined;
        const chalBlockMatch = lBlock.match(/<div[^>]*class="[^"]*sandbox-challenge[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
          || lBlock.match(/<div[^>]*class="[^"]*practice[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

        if (chalBlockMatch) {
          const rawC = chalBlockMatch[1];
          const taskMatch = rawC.match(/<p[^>]*class="[^"]*challenge-task[^"]*"[^>]*>([\s\S]*?)<\/p>/i)
            || rawC.match(/<p>([\s\S]*?)<\/p>/i);
          const hintMatch = rawC.match(/<p[^>]*class="[^"]*challenge-hint[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
          const expectedMatch = rawC.match(/<p[^>]*class="[^"]*challenge-expected[^"]*"[^>]*>([\s\S]*?)<\/p>/i);

          challenge = {
            task: taskMatch ? taskMatch[1].replace(/<[^>]+>/g, "").trim() : "Apply this lesson's concept in the interactive editor.",
            hint: hintMatch ? hintMatch[1].replace(/<[^>]+>/g, "").replace(/^Hint:\s*/i, "").trim() : undefined,
            expected_output: expectedMatch ? expectedMatch[1].replace(/<[^>]+>/g, "").replace(/^Expected Output:\s*/i, "").trim() : undefined,
          };
        }

        lessons.push({
          id: `lesson-${courseId}-${mIdx}-${lIdx}`,
          module_id: `module-${courseId}-${mIdx}`,
          lesson_number: lIdx,
          title: lesTitle,
          content: lessonContentHtml,
          content_type: "html",
          order_index: lIdx,
          duration_minutes: 20,
          starter_code: starterCode,
          sandbox_language: sandboxLanguage,
          challenge,
        });
      }

      // If no lesson blocks found via split, create at least 1-2 lessons from content
      if (lessons.length === 0) {
        lessons.push({
          id: `lesson-${courseId}-${mIdx}-1`,
          module_id: `module-${courseId}-${mIdx}`,
          lesson_number: 1,
          title: `${modTitle}: Comprehensive Walkthrough`,
          content: block,
          content_type: "html",
          order_index: 1,
          duration_minutes: 30,
        });
      }

      modules.push({
        id: `module-${courseId}-${mIdx}`,
        course_id: courseId,
        module_number: mIdx,
        title: modTitle,
        description: modDesc,
        order_index: mIdx,
        lessons,
      });
    }
  }

  // Fallback: If no module blocks matched, parse via TOC or h2/h3 tags
  if (modules.length === 0) {
    // Let's split by H2 tags to get actual module blocks from standard semantic HTML
    const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
    const h2Matches = Array.from(html.matchAll(h2Regex));
    
    if (h2Matches.length > 0) {
      // Find the start index of each h2
      const indices: number[] = [];
      let match;
      const findRegex = /<h2[^>]*>/gi;
      while ((match = findRegex.exec(html)) !== null) {
        indices.push(match.index);
      }
      
      for (let idx = 0; idx < h2Matches.length; idx++) {
        const modTitle = h2Matches[idx][1].replace(/<[^>]+>/g, "").trim();
        const startPos = indices[idx];
        const endPos = idx + 1 < h2Matches.length ? indices[idx + 1] : html.length;
        const blockContent = html.substring(startPos, endPos);
        
        // Inside this blockContent, search for h3 tags which represent lessons!
        const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
        const h3Matches = Array.from(blockContent.matchAll(h3Regex));
        
        const lessons: Lesson[] = [];
        
        if (h3Matches.length > 0) {
          // Find the start indices of h3 within this blockContent
          const h3Indices: number[] = [];
          let h3Match;
          const findH3Regex = /<h3[^>]*>/gi;
          while ((h3Match = findH3Regex.exec(blockContent)) !== null) {
            h3Indices.push(h3Match.index);
          }
          
          for (let lIdx = 0; lIdx < h3Matches.length; lIdx++) {
            const lesTitle = h3Matches[lIdx][1].replace(/<[^>]+>/g, "").trim();
            const lStart = h3Indices[lIdx];
            const lEnd = lIdx + 1 < h3Matches.length ? h3Indices[lIdx + 1] : blockContent.length;
            const lBlock = blockContent.substring(lStart, lEnd);
            
            // Extract sandbox type, starter code, and challenge as we do in the main parser
            let sandboxType = "Code Editor";
            if (lBlock.includes("excel-grid")) sandboxType = "Spreadsheet Sandbox";
            else if (lBlock.includes("comparison-table") || lBlock.includes("step-grid")) sandboxType = "Interactive Spec";
            else if (lBlock.includes("practice")) sandboxType = "Hands-on Exercise";

            const lessonContentHtml = lBlock
              .replace(/<h3[^>]*>.*?<\/h3>/i, "") // remove heading
              .trim();

            let starterCode: string | undefined;
            const starterMatch = lBlock.match(/<pre[^>]*class="[^"]*starter-code[^"]*"[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i)
              || lBlock.match(/<div[^>]*class="[^"]*code-editor[^"]*"[^>]*>[\s\S]*?<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i)
              || lBlock.match(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/i);

            if (starterMatch && starterMatch[1]) {
              starterCode = starterMatch[1]
                .replace(/<span[^>]*>/gi, "")
                .replace(/<\/span>/gi, "")
                .replace(/<[^>]+>/g, "")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .trim();
            }

            let sandboxLanguage: "javascript" | "html" | "python" = "javascript";
            const testStr = `${topic} ${lesTitle} ${starterCode || ""}`.toLowerCase();
            if (testStr.includes("python") || testStr.includes("pandas") || testStr.includes("numpy") || (starterCode && (starterCode.includes("def ") || starterCode.includes("print(")))) {
              sandboxLanguage = "python";
            } else if (testStr.includes("html") || testStr.includes("css") || (starterCode && (starterCode.includes("<!doctype") || starterCode.includes("<html") || starterCode.includes("<div")))) {
              sandboxLanguage = "html";
            }

            let challenge: Lesson["challenge"] | undefined;
            const chalBlockMatch = lBlock.match(/<div[^>]*class="[^"]*sandbox-challenge[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
              || lBlock.match(/<div[^>]*class="[^"]*practice[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

            if (chalBlockMatch) {
              const rawC = chalBlockMatch[1];
              const taskMatch = rawC.match(/<p[^>]*class="[^"]*challenge-task[^"]*"[^>]*>([\s\S]*?)<\/p>/i)
                || rawC.match(/<p>([\s\S]*?)<\/p>/i);
              const hintMatch = rawC.match(/<p[^>]*class="[^"]*challenge-hint[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
              const expectedMatch = rawC.match(/<p[^>]*class="[^"]*challenge-expected[^"]*"[^>]*>([\s\S]*?)<\/p>/i);

              challenge = {
                task: taskMatch ? taskMatch[1].replace(/<[^>]+>/g, "").trim() : "Apply this lesson's concept in the interactive editor.",
                hint: hintMatch ? hintMatch[1].replace(/<[^>]+>/g, "").replace(/^Hint:\s*/i, "").trim() : undefined,
                expected_output: expectedMatch ? expectedMatch[1].replace(/<[^>]+>/g, "").replace(/^Expected Output:\s*/i, "").trim() : undefined,
              };
            }

            lessons.push({
              id: `lesson-${courseId}-${idx + 1}-${lIdx + 1}`,
              module_id: `module-${courseId}-${idx + 1}`,
              lesson_number: lIdx + 1,
              title: lesTitle,
              content: lessonContentHtml,
              content_type: "html",
              order_index: lIdx + 1,
              duration_minutes: 20,
              starter_code: starterCode,
              sandbox_language: sandboxLanguage,
              challenge,
            });
          }
        }

        // If no h3 lessons found in this H2 block, create 1-2 standard default lessons from block content
        if (lessons.length === 0) {
          lessons.push({
            id: `lesson-${courseId}-${idx + 1}-1`,
            module_id: `module-${courseId}-${idx + 1}`,
            lesson_number: 1,
            title: `${modTitle} - Introduction & Foundations`,
            content: blockContent.replace(/<h2[^>]*>.*?<\/h2>/i, "").trim(),
            content_type: "html",
            order_index: 1,
            duration_minutes: 25,
          });
        }

        modules.push({
          id: `module-${courseId}-${idx + 1}`,
          course_id: courseId,
          module_number: idx + 1,
          title: modTitle.startsWith("Module") ? modTitle : `Module ${idx + 1}: ${modTitle}`,
          description: `Detailed study and hands-on practice for ${modTitle}.`,
          order_index: idx + 1,
          lessons,
        });
      }
    }
  }

  // If still empty, build clean default modules wrapping the generated content
  if (modules.length === 0) {
    const defaultMods = [
      "Foundations & Architecture",
      "Core Concepts & Hands-on Implementation",
      "Advanced Patterns & Optimization",
      "Real-World Production Project"
    ];
    defaultMods.forEach((modName, idx) => {
      modules.push({
        id: `module-${courseId}-${idx + 1}`,
        course_id: courseId,
        module_number: idx + 1,
        title: `Module ${idx + 1}: ${modName}`,
        description: `Hands-on module covering ${modName} for ${topic}.`,
        order_index: idx + 1,
        lessons: [
          {
            id: `lesson-${courseId}-${idx + 1}-1`,
            module_id: `module-${courseId}-${idx + 1}`,
            lesson_number: 1,
            title: `Introduction to ${modName}`,
            content: html,
            content_type: "html",
            order_index: 1,
            duration_minutes: 25,
          }
        ]
      });
    });
  }

  const estimatedHours = pacing === "Crash Course" ? 4 : pacing === "Deep Dive" ? 28 : 12;

  const normalizedDifficulty = level.includes("Beginner")
    ? "Beginner"
    : level.includes("Advanced")
    ? "Advanced"
    : "Intermediate";

  return {
    id: courseId,
    title,
    description: tagline,
    category: "Software Engineering & AI",
    difficulty: normalizedDifficulty,
    thumbnail_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    is_premium: false,
    total_modules: modules.length,
    estimated_hours: estimatedHours,
    created_at: new Date().toISOString(),
    modules,
    html_content: html,
  };
}

/**
 * Creates high-fidelity fallback HTML if Gemini API is unreachable
 * Strictly matches CourseGenie AI Blueprint styling, breathable spacing & layout
 */
export function generateCourseGenieFallbackHtml(
  topic: string,
  totalModules: number = 8,
  lessonsPerModule: number = 3,
  level: string = "Beginner to Advanced",
  language: string = "Hinglish"
): string {
  const isHinglish = language.toLowerCase().includes("hinglish");
  const cleanTopic = topic.replace(/^I want to learn /i, "").replace(/^Master /i, "").trim();
  const lower = cleanTopic.toLowerCase();

  // Distinct topic curriculum frameworks
  type LessonBlueprint = { title: string; concept: string; codeFilename: string; code: string; pitfall: string; proTip: string; task: string; expected: string };
  type ModuleBlueprint = { title: string; desc: string; lessons: LessonBlueprint[] };

  let curriculum: ModuleBlueprint[] = [];

  if (lower.includes("python")) {
    curriculum = [
      {
        title: "Python Kickstart: First Code, Variables & Interactive Input",
        desc: "Get started from absolute scratch! Write your first program, understand how computers display information, store values in variables, and make interactive programs.",
        lessons: [
          {
            title: "Hello Python: Your Very First Program & Clean Syntax",
            concept: isHinglish ? "Python me bina kisi boilerplate ke direct print('Hello, World!') chalta hai. English jaisi simple language hai jo beginners ke liye sabse friendly hai." : "Python requires zero boilerplate: a single print('Hello, World!') executes cleanly. It emphasizes human readability and intuitive English-like syntax.",
            codeFilename: "first_steps.py",
            code: `# Let's make the computer talk!\nprint("Hello, World! 🚀")\nprint("Welcome to Python with LernexAI!")\n\n# Instant math:\nprint("20 + 25 =", 20 + 25)`,
            pitfall: "Text must always be surrounded by quotes ('...' or \"...\"). Writing print(Hello) without quotes triggers a NameError.",
            proTip: "Use comments starting with # to leave helpful notes for yourself; Python will completely ignore them during execution.",
            task: "Print 'Hello, World! Python is awesome' on line 1, and 'My journey begins now!' on line 2.",
            expected: "Hello, World! Python is awesome\nMy journey begins now!"
          },
          {
            title: "Variables & Core Data Types: Storing & Labeling Data",
            concept: isHinglish ? "Variables data ke labeled boxes hote hain (name = 'Alex', score = 95). Python automatically samajh jata hai ki ye string hai ya number bina type declare kiye." : "Variables act as labeled references for data on the heap. Python uses dynamic typing to automatically infer types (str, int, float, bool) at runtime.",
            codeFilename: "variables_types.py",
            code: `student_name = "Alex"\nage = 20\nfee = 49.99\nis_active = True\n\nprint("Student:", student_name)\nprint("Type of fee:", type(fee))`,
            pitfall: "Python variable names are case-sensitive. 'age', 'Age', and 'AGE' are three completely different variables.",
            proTip: "Follow the PEP 8 convention: use descriptive snake_case (like user_account_balance) for clean readable variable names.",
            task: "Create a variable 'language' = 'Python' and 'rating' = 10, then print 'Language: Python | Rating: 10'.",
            expected: "Language: Python | Rating: 10"
          },
          {
            title: "Interactive Programs: f-Strings, Input & Type Conversion",
            concept: isHinglish ? "Modern Python me f'Hello {name}' sabse clean formatting deta hai. int() aur str() se data types convert karke dynamic interactive logic banta hai." : "Modern f-strings (f'Hello {name}') allow clean, inline expression interpolation. Type conversion functions like int() and str() enable flexible user interaction.",
            codeFilename: "fstrings_interaction.py",
            code: `first_name = "Priya"\nmarks = 92\n\n# Modern Python f-string\nprint(f"Top Performer: {first_name} | Score: {marks}% 🏆")\nprint(f"Marks needed for 100%: {100 - marks}")`,
            pitfall: "Adding a string and integer directly ('5' + 5) throws a TypeError. Always convert using int('5') + 5 first.",
            proTip: "f-strings are significantly faster and more readable than older format specifiers like %s or .format().",
            task: "Create variables: item = 'Book' and price = 15. Use an f-string to print 'The Book costs $15.'",
            expected: "The Book costs $15."
          }
        ]
      },
      {
        title: "Numeric Types, Mathematical Mechanics & Float Precision",
        desc: "Master arbitrary-precision integers, IEEE 754 floating-point limitations, decimal.Decimal, and math utilities.",
        lessons: [
          {
            title: "Arbitrary-Precision Integers & Large Arithmetic",
            concept: isHinglish ? "Python 3 me integers overflow nahi hote. Standard 64-bit limits ke baad Python automatically heap memory allocate karke infinite precision calculate karta hai." : "Python 3 integers have arbitrary precision, automatically expanding heap memory to compute astronomically large values without overflow.",
            codeFilename: "arbitrary_ints.py",
            code: `large_val = 2 ** 120\nprint("2^120 =", large_val)\nprint("Total digits:", len(str(large_val)))`,
            pitfall: "While integers never overflow, extremely large power operations (e.g. 2**10000000) consume CPU and memory rapidly.",
            proTip: "Use underscore separators in integer literals (e.g., 10_000_000) to improve code readability without affecting runtime value.",
            task: "Calculate 10 to the power of 20 and print with comma formatting.",
            expected: "100,000,000,000,000,000,000"
          },
          {
            title: "IEEE 754 Floating Point & Exact Calculations with Decimal",
            concept: isHinglish ? "Standard floats binary fractions use karte hain jisse 0.1 + 0.2 != 0.3 hota hai. Financial calculations ke liye decimal.Decimal use karna zaroori hai." : "Base-2 floating-point representation yields inexact representations of decimals like 0.1. Production financial ledgers must use decimal.Decimal.",
            codeFilename: "decimal_precision.py",
            code: `from decimal import Decimal\nprice = Decimal("19.99")\ntax = Decimal("0.0825")\ntotal = round(price * (1 + tax), 2)\nprint("Exact Financial Total: $", total)`,
            pitfall: "Passing a raw float into Decimal (e.g. Decimal(0.1)) preserves the binary rounding artifact. Always pass string literals: Decimal('0.1').",
            proTip: "For scientific modeling where speed matters more than base-10 exactness, standard floats are 10x faster than Decimal.",
            task: "Compute exact sum of Decimal('0.1') and Decimal('0.2').",
            expected: "0.3"
          },
          {
            title: "Floor Division (//), Modulo (%) & The math Module",
            concept: isHinglish ? "Floor division integer return karta hai jo negative infinity ki taraf round hota hai. Modulo % cyclic logic aur remainder calculations ke liye best hai." : "Floor division (//) computes the mathematical floor quotient. Modulo (%) calculates the remainder and powers round-robin scheduling algorithms.",
            codeFilename: "math_ops.py",
            code: `import math\ntotal_minutes = 325\nhours = total_minutes // 60\nremaining = total_minutes % 60\nprint(f"{hours}h {remaining}m | gcd(24, 36) = {math.gcd(24, 36)}")`,
            pitfall: "In Python, -7 // 2 evaluates to -4 (towards negative infinity), unlike C/Java which truncate towards zero to -3.",
            proTip: "Use math.isclose(a, b) when checking floating-point equality instead of a == b.",
            task: "Calculate 100 // 7 and 100 % 7 in Python.",
            expected: "Quotient: 14, Remainder: 2"
          }
        ]
      },
      {
        title: "Strings, Encodings, Slicing & Text Parsing",
        desc: "Master Unicode UTF-8 string immutability, the 3-parameter slice operator [start:stop:step], f-strings, and string parsing methods.",
        lessons: [
          {
            title: "String Immutability & UTF-8 Encodings",
            concept: isHinglish ? "Python me strings immutable hoti hain. Ek bar memory me create hone ke baad character mutate nahi ho sakta, jisse thread-safety ensure hoti hai." : "Python strings are strictly immutable sequences of Unicode code points, ensuring hash stability and thread safety.",
            codeFilename: "string_encodings.py",
            code: `title = "LernexAI Platform"\nprint("UTF-8 Bytes:", title.encode("utf-8"))\n# title[0] = "M" raises TypeError`,
            pitfall: "Repeatedly concatenating strings with += inside a loop causes quadratic O(N^2) memory reallocations. Use ''.join(list) instead.",
            proTip: "Use str.encode() and bytes.decode() explicitly when handling network payloads to prevent UnicodeDecodeError.",
            task: "Check if a string is alphanumeric using .isalnum().",
            expected: "True"
          },
          {
            title: "Advanced Slicing Mechanics [start:stop:step]",
            concept: isHinglish ? "Slice operator sequence ke kisi bhi hisse ko extract karne ke liye use hota hai. Negative step pure sequence ko reverse kar deta hai." : "The sequence slice seq[start:stop:step] extracts sub-sequences. Omitting indices defaults start to 0, stop to length, and step to 1.",
            codeFilename: "slicing_mechanics.py",
            code: `serial = "SRV-2026-NODE-99"\nprefix = serial[:3]\nyear = serial[4:8]\nreversed_code = serial[::-1]\nprint("Parsed:", prefix, year, "| Reversed:", reversed_code)`,
            pitfall: "Slice stop index is non-inclusive. serial[0:3] grabs indices 0, 1, and 2 only.",
            proTip: "Checking if a string is a palindrome is as simple as: s == s[::-1].",
            task: "Reverse the string 'CourseGenie' using slicing.",
            expected: "eineGesruoC"
          },
          {
            title: "String Parsing Methods (.split, .join, .strip, f-strings)",
            concept: isHinglish ? "Data cleaning me .strip(), .split(), aur .join() sabse zyada use hote hain. Modern Python me f-strings fast aur readable formatting dete hain." : "The trifecta of .strip(), .split(), and .join() powers text normalization pipelines. F-strings evaluate expressions at runtime with compiled C performance.",
            codeFilename: "string_methods.py",
            code: `raw_csv = "  101,  Aarav Mehta,  DevOps Engineer  \\n"\nfields = [col.strip() for col in raw_csv.split(",")]\nprint("Formatted Output:", " | ".join(fields))`,
            pitfall: "Calling .split() with no arguments splits on any whitespace sequence, whereas .split(' ') splits strictly on single space characters.",
            proTip: "F-strings support inline formatting specifiers, like f'{value:,.2f}' for currency or f'{timestamp:%Y-%m-%d}'.",
            task: "Format an integer 1250000 with commas using an f-string: f'{val:,}'.",
            expected: "1,250,000"
          }
        ]
      },
      {
        title: "Boolean Logic, Relational Operators & Conditional Branching",
        desc: "Master truth value testing (Truthy vs Falsy), short-circuit boolean evaluation, chained comparisons, and if-elif-else logic.",
        lessons: [
          {
            title: "Truth Value Testing & Short-Circuit Evaluation",
            concept: isHinglish ? "Python me 0, None, '', [], {}, set() falsy hote hain. 'and' aur 'or' short-circuit follow karte hain aur pehla determining value return karte hain." : "Every Python object has an intrinsic boolean truth value. Logical operators short-circuit, returning the determining operand directly.",
            codeFilename: "truthiness.py",
            code: `user_name = ""\ndisplay_name = user_name or "Anonymous"\nprint("Resolved User:", display_name)`,
            pitfall: "Be careful with default fallback x = val or 100 when val can legitimately be 0 (since 0 is falsy, it incorrectly falls back to 100).",
            proTip: "Explicit is better than implicit: prefer `if items:` over `if len(items) > 0:` for testing non-empty collections.",
            task: "Test if an empty list [] evaluates to False in an if statement.",
            expected: "List is empty"
          },
          {
            title: "Chained Comparisons & Relational Mechanics",
            concept: isHinglish ? "Python uniquely 10 <= x <= 50 support karta hai. Ye mathematically clean hai aur variable ko ek hi bar evaluate karta hai." : "Python supports mathematical chained comparisons like 0 <= score <= 100, evaluating middle operands exactly once.",
            codeFilename: "chained_comparison.py",
            code: `latency_ms = 45\nstatus = "Optimal" if 20 <= latency_ms <= 50 else "Suboptimal"\nprint("Cluster Health:", status)`,
            pitfall: "Comparing incompatible types (e.g. '5' > 3) raises a TypeError in Python 3.",
            proTip: "Use `in` for membership tests in sequences: `if user_role in ('admin', 'editor'):`.",
            task: "Check if temperature is between 20 and 30 using a chained comparison.",
            expected: "Moderate Temperature"
          },
          {
            title: "Multi-branch Logic (if-elif-else) & Ternary Expressions",
            concept: isHinglish ? "Conditional logic structured decision making ensure karta hai. Ternary expression [true_val] if [condition] else [false_val] concise assignments deta hai." : "Multi-way branching coordinates decision trees. Inline ternary conditionals provide clean, declarative variable assignments.",
            codeFilename: "branching_logic.py",
            code: `tier = "PRO"\nquota = 50000 if tier == "PRO" else 1000\nprint(f"API Rate Quota: {quota} req/min")`,
            pitfall: "Never nest ternary operators more than one level deep; nested ternaries degrade code readability.",
            proTip: "Use structural pattern matching (match/case) introduced in Python 3.10 for complex data structure matching.",
            task: "Assign access = 'Granted' if role == 'Admin' else 'Denied' using a ternary expression.",
            expected: "Granted"
          }
        ]
      },
      {
        title: "Loops, Iteration Protocols & List Comprehensions",
        desc: "Master while loops, for...in iteration, range(), enumerate(), zip(), loop else blocks, and list comprehensions.",
        lessons: [
          {
            title: "The while Loop, Sentinel Values & Loop Guards",
            concept: isHinglish ? "while loop tab use karte hain jab iterations condition par depend karti hain. Sentinel values ya boolean flags clean exit provide karte hain." : "The while loop executes as long as a boolean condition remains true. Loop guards and timeouts protect against runaway processes.",
            codeFilename: "while_sentinel.py",
            code: `retries = 0\nwhile retries < 3:\n    retries += 1\n    print(f"Connecting... Attempt {retries}")`,
            pitfall: "Forgetting to update the loop accumulator condition inside the while block causes 100% CPU lockups in an infinite loop.",
            proTip: "Always attach a safety counter limit when polling external network services inside while loops.",
            task: "Write a while loop that counts down from 3 to 1 and prints 'Liftoff!'.",
            expected: "3, 2, 1, Liftoff!"
          },
          {
            title: "The for...in Loop, range(), enumerate() & zip()",
            concept: isHinglish ? "Python me for loops iterator protocol use karte hain. Index ke liye enumerate() aur parallel lists ke liye zip() idiomatic standard hain." : "Python for loops consume iterables via iter() and next(). enumerate() yields index-item pairs, and zip() combines multiple sequences in parallel.",
            codeFilename: "iteration_tools.py",
            code: `frameworks = ["FastAPI", "React", "Docker"]\nfor rank, fw in enumerate(frameworks, start=1):\n    print(f"#{rank} {fw}")`,
            pitfall: "zip() stops at the length of the shortest iterable. If sequences are of unequal length, use itertools.zip_longest().",
            proTip: "Never maintain a manual i = 0 counter outside a for loop; always use enumerate(items).",
            task: "Pair two lists ['A', 'B'] and [1, 2] into a dictionary using dict(zip(l1, l2)).",
            expected: "{'A': 1, 'B': 2}"
          },
          {
            title: "break, continue, else in Loops & List Comprehensions",
            concept: isHinglish ? "Loop ka else block tab execute hota hai jab loop bina break ke normal finish ho. List comprehension concise aur fast list generation deta hai." : "A loop else clause executes only if the loop terminates naturally without a break statement. List comprehensions compile to optimized bytecode.",
            codeFilename: "comprehensions.py",
            code: `squares = [n ** 2 for n in range(1, 11) if n % 2 == 0]\nprint("Even Squares:", squares)`,
            pitfall: "Over-complicating list comprehensions with multiple nested ifs or fors makes code unreadable; split into a standard loop if it exceeds 80 characters.",
            proTip: "For large sequences, use generator expressions (x**2 for x in seq) to avoid allocating memory for all items at once.",
            task: "Generate squares of numbers 1 to 5 using a list comprehension.",
            expected: "[1, 4, 9, 16, 25]"
          }
        ]
      },
      {
        title: "Ordered Collections: Lists & Tuples",
        desc: "Deep dive into dynamic array memory growth, list mutating methods, tuple immutability, tuple unpacking, and copy semantics.",
        lessons: [
          {
            title: "Lists: Dynamic Array Over-Allocation & In-Place Mutation",
            concept: isHinglish ? "Python lists contiguous pointer arrays hoti hain. Jab list full hoti hai, CPython extra memory allocate karta hai taaki append O(1) amortized rahe." : "Lists are dynamic arrays storing pointers to heap objects. CPython uses an over-allocation growth pattern (0, 4, 8, 16...) to guarantee amortized O(1) appends.",
            codeFilename: "list_mechanics.py",
            code: `stack = []\nstack.append("Job 1")\nstack.append("Job 2")\nprocessed = stack.pop()\nprint("Processed:", processed, "| Remaining:", stack)`,
            pitfall: "Deleting or inserting items at index 0 (e.g. list.pop(0) or list.insert(0, x)) shifts all N elements, costing O(N) time. Use collections.deque for FIFO queues.",
            proTip: "list.extend(iterable) appends elements one-by-one, while list.append(iterable) nests the entire iterable as a single element.",
            task: "Extend a list [1, 2] with [3, 4] using .extend() and print the result.",
            expected: "[1, 2, 3, 4]"
          },
          {
            title: "Tuples: Immutability, Memory Efficiency & Extended Unpacking",
            concept: isHinglish ? "Tuples immutable hote hain aur lists se kam memory lete hain. Asterisk * ke sath tuple unpacking flexible data extraction allow karta hai." : "Tuples are immutable sequences, requiring less memory overhead than lists and participating in CPython free-list memory caching.",
            codeFilename: "tuple_unpacking.py",
            code: `endpoint = ("GET", "/api/v1/users", 200, "12ms", "prod-cluster")\nmethod, path, status, *telemetry = endpoint\nprint(f"{method} {path} -> {status} | Extra:", telemetry)`,
            pitfall: "A single-element tuple requires a trailing comma: `t = (42,)`. Without the comma, `t = (42)` is evaluated simply as an integer.",
            proTip: "Use tuples whenever the collection of items is heterogeneous and of fixed length (like database records or coordinate points).",
            task: "Swap two variables x, y = 5, 10 in a single line using tuple unpacking.",
            expected: "x=10, y=5"
          },
          {
            title: "Shallow Copy vs. Deep Copy (copy.deepcopy)",
            concept: isHinglish ? "Shallow copy sirf bahar ke container ko clone karta hai, andar ke nested objects wahi rehte hain. Deep copy recursively sabhi children ko duplicate karta hai." : "Shallow copying duplicates the outermost container while referencing nested objects. Deep copying recursively clones all descendant objects in memory.",
            codeFilename: "copy_semantics.py",
            code: `import copy\nmatrix = [[1, 2], [3, 4]]\nshallow = list(matrix)\ndeep = copy.deepcopy(matrix)\nmatrix[0].append(99)\nprint("Shallow:", shallow, "| Deep:", deep)`,
            pitfall: "Mutating nested items in a shallow copy inadvertently modifies the original data structure.",
            proTip: "In modern Python, shallow copying a list can be done via `lst.copy()`, `lst[:]`, or `list(lst)`.",
            task: "Demonstrate that mutating a deepcopy does not alter the original list.",
            expected: "Original list remains unchanged"
          }
        ]
      },
      {
        title: "Associative Collections: Dictionaries & Sets",
        desc: "Understand hash tables, key-value lookups, O(1) performance, dictionary methods (.get, .setdefault), set algebra, and comprehensions.",
        lessons: [
          {
            title: "Dictionaries as Hash Tables & O(1) Key-Value Access",
            concept: isHinglish ? "Python dictionaries hash tables hoti hain. Key ka hash calculate karke O(1) me value milti hai. .get() method key missing hone par crash se bachata hai." : "Dictionaries are compact hash tables with O(1) average lookup, insertion, and deletion. Keys must be immutable and hashable.",
            codeFilename: "dict_lookups.py",
            code: `user = {"id": 104, "name": "Diya", "role": "DevOps"}\nprint("Role:", user.get("role", "Guest"))\nprint("Missing key fallback:", user.get("team", "Unassigned"))`,
            pitfall: "Accessing a missing key via dict[key] raises a KeyError. Always use dict.get(key, default) or collections.defaultdict.",
            proTip: "Since Python 3.7, dictionaries are guaranteed to maintain their insertion order.",
            task: "Set a default value for key 'theme' in a dict using .setdefault('theme', 'dark').",
            expected: "{'theme': 'dark'}"
          },
          {
            title: "Dictionary Comprehensions & Inversion Patterns",
            concept: isHinglish ? "Dict comprehensions data transformation ko ek line me execute karte hain. Values aur keys ko invert karna iska classic example hai." : "Dictionary comprehensions {k: v for ...} provide declarative transformations of associative data with filtering predicates.",
            codeFilename: "dict_comprehension.py",
            code: `prices_usd = {"laptop": 1200, "mouse": 25, "keyboard": 75}\nprices_inr = {k: round(v * 85.0, 2) for k, v in prices_usd.items() if v > 50}\nprint("Premium Gear in INR:", prices_inr)`,
            pitfall: "When inverting a dictionary ({v: k for k, v in d.items()}), any duplicate values in the original will overwrite earlier keys.",
            proTip: "Use `d.items()` to iterate through key and value simultaneously rather than looking up `d[k]` repeatedly.",
            task: "Invert a dict {'a': 1, 'b': 2} using a dict comprehension.",
            expected: "{1: 'a', 2: 'b'}"
          },
          {
            title: "Sets: Unique Elements & Mathematical Set Operations",
            concept: isHinglish ? "Set me duplicates automatically remove ho jate hain. Intersection (&), Union (|), aur Difference (-) mathematical operations O(1) speed se run hote hain." : "Sets are hash tables containing only distinct keys. They provide mathematical set algebra operations in O(min(len(s), len(t))) time.",
            codeFilename: "set_algebra.py",
            code: `frontend = {"HTML", "CSS", "React", "TypeScript"}\nbackend = {"Python", "FastAPI", "PostgreSQL", "TypeScript"}\nprint("Full Stack Intersection:", frontend & backend)\nprint("All Unique Skills:", frontend | backend)`,
            pitfall: "Creating an empty set must be done via set(), not {}. {} creates an empty dictionary.",
            proTip: "Checking membership `x in s` on a set with 1,000,000 items takes ~50 nanoseconds, compared to scanning a list which takes milliseconds.",
            task: "Find the intersection between set {1, 2, 3} and set {2, 3, 4}.",
            expected: "{2, 3}"
          }
        ]
      },
      {
        title: "Functions, Parameter Passing & Scope (LEGB)",
        desc: "Master modular function design, positional vs keyword arguments, *args, **kwargs, default argument traps, the LEGB scope hierarchy, and lambda expressions.",
        lessons: [
          {
            title: "Function Definitions, Type Hints & Return Signatures",
            concept: isHinglish ? "Functions reusable blocks of logic hote hain. Type hints code documentation aur static analysis ko enhance karte hain. Bina return ke function None return karta hai." : "Functions encapsulate repeatable logic. Type annotations document interfaces without imposing runtime overhead.",
            codeFilename: "typed_functions.py",
            code: `def calculate_bmi(weight_kg: float, height_m: float) -> float:\n    \"\"\"Calculate BMI safely.\"\"\"\n    if height_m <= 0:\n        raise ValueError("Height must be positive")\n    return round(weight_kg / (height_m ** 2), 2)\n\nprint("BMI:", calculate_bmi(70, 1.75))`,
            pitfall: "Type hints in Python are not enforced at runtime by default; use tools like mypy or Pydantic for validation.",
            proTip: "Always use docstrings with parameters and return descriptions to enable rich autocomplete in IDEs.",
            task: "Write a function square(n: int) -> int that returns n * n.",
            expected: "25"
          },
          {
            title: "The Mutable Default Argument Trap & (*args, **kwargs)",
            concept: isHinglish ? "Default argument function definition ke time ek hi bar evaluate hota hai. Agar list [] default denge toh sabhi calls wahi list share karengi. Hamesha None use karein." : "Default argument expressions are evaluated once at definition time. Using a mutable default (like []) leaks state across invocations. Always default to None.",
            codeFilename: "safe_defaults.py",
            code: `def register_user(username: str, tags: list = None):\n    if tags is None:\n        tags = []\n    tags.append("active")\n    return {"username": username, "tags": tags}\n\nprint("User 1:", register_user("aarav"))\nprint("User 2:", register_user("priya"))`,
            pitfall: "def func(data=[]): data.append(1) reuses the same list object on subsequent invocations, corrupting state.",
            proTip: "Use *args to capture variable positional arguments as a tuple, and **kwargs to capture extra named arguments as a dictionary.",
            task: "Create a function sum_all(*numbers) that returns the sum of any quantity of numbers passed.",
            expected: "15"
          },
          {
            title: "The LEGB Scope Hierarchy & Lambda Functions",
            concept: isHinglish ? "Python variable lookup LEGB order me karta hai: Local -> Enclosing -> Global -> Built-in. Lambdas anonymous one-line functions hote hain jo callbacks me use hote hain." : "The LEGB rule governs scope resolution: Local, Enclosing (closures), Global, Built-in. Lambdas provide concise inline function objects.",
            codeFilename: "legb_scopes.py",
            code: `records = [("Alice", 92), ("Bob", 85), ("Charlie", 96)]\nrecords.sort(key=lambda r: r[1], reverse=True)\nprint("Sorted Leaderboard:", records)`,
            pitfall: "Mutating a global variable inside a function without the `global` keyword raises UnboundLocalError.",
            proTip: "Do not assign a lambda to a variable (e.g. f = lambda x: x*2); define a standard def f(x): instead for clean stack traces.",
            task: "Sort a list of strings by length using sorted(words, key=lambda w: len(w)).",
            expected: "['ox', 'cat', 'tiger', 'elephant']"
          }
        ]
      },
      {
        title: "File I/O, Context Managers & Data Serialization",
        desc: "Learn safe file streams using with context managers, file modes (r, w, a, b), line-by-line reading, and structured JSON/CSV data processing.",
        lessons: [
          {
            title: "Safe File Handling with the `with` Context Manager",
            concept: isHinglish ? "with statement Python ka context manager protocol (__enter__ aur __exit__) use karta hai. File open hone ke baad exception aane par bhi automatic close ho jati hai." : "The with statement guarantees resource cleanup by invoking __exit__ on file descriptors, eliminating handle leaks even during exceptions.",
            codeFilename: "file_io_safe.py",
            code: `import io\nstream = io.StringIO()\nstream.write("Telemetry Log: All systems operational\\n")\nstream.seek(0)\nprint("Stream Content:", stream.read().strip())`,
            pitfall: "Opening files with manual f = open() without a finally: f.close() block can exhaust operating system file descriptors.",
            proTip: "Always specify encoding='utf-8' when opening text files to prevent platform-specific encoding mismatches.",
            task: "Read lines from an in-memory stream using a for line in stream loop.",
            expected: "Telemetry Log: All systems operational"
          },
          {
            title: "Parsing & Serializing JSON Payloads (json module)",
            concept: isHinglish ? "json.dumps() Python object ko JSON string me convert karta hai aur json.loads() JSON string ko Python dictionary/list me parse karta hai." : "The json module bridges Python types and standard JSON. dumps/loads operate on strings; dump/load operate directly on file streams.",
            codeFilename: "json_payloads.py",
            code: `import json\npayload = {"status": "success", "cluster": "asia-south1", "nodes": 8}\njson_str = json.dumps(payload, indent=2)\nprint("Serialized JSON:\\n", json_str)\nparsed = json.loads(json_str)\nprint("Cluster:", parsed["cluster"])`,
            pitfall: "Standard json.dumps() cannot serialize custom Python class instances or datetime objects without a custom JSONEncoder.",
            proTip: "Pass sort_keys=True to json.dumps() when generating deterministic JSON strings for cryptographic signatures or caching.",
            task: "Convert a dictionary {'status': 200} into a JSON string using json.dumps().",
            expected: "{\"status\": 200}"
          },
          {
            title: "Tabular Data Processing with csv.DictReader",
            concept: isHinglish ? "csv.DictReader CSV rows ko Python dictionaries me map karta hai jisme keys header names hoti hain. Isse column order change hone par code nahi tootata." : "csv.DictReader parses rows into dictionaries keyed by header names, providing schema resilience against column reordering in data feeds.",
            codeFilename: "csv_reader.py",
            code: `import csv, io\ncsv_text = "id,name,role\\n1,Aarav,Architect\\n2,Priya,Security"\nreader = csv.DictReader(io.StringIO(csv_text))\nfor row in reader:\n    print(f"ID #{row['id']}: {row['name']} ({row['role']})")`,
            pitfall: "When writing CSV files on Windows using csv.writer, always open with newline='' to avoid blank alternating rows.",
            proTip: "Use csv.DictWriter to ensure explicit field ordering when writing data back out to CSV files.",
            task: "Extract all names from a CSV stream into a list using [row['name'] for row in reader].",
            expected: "['Aarav', 'Priya']"
          }
        ]
      },
      {
        title: "Exception Handling, OOP Foundations & Capstone Project",
        desc: "Master defensive error boundaries (try-except-else-finally), class structures, methods, encapsulation, and build a capstone Student Analytics System.",
        lessons: [
          {
            title: "Defensive Error Boundaries & Custom Exceptions",
            concept: isHinglish ? "try/except blocks unexpected crashes ko handle karte hain. Custom exceptions business domain errors ko clearly convey karte hain." : "Defensive programming structures resilient error boundaries. Custom domain exceptions subclassing Exception provide actionable diagnostic contexts.",
            codeFilename: "custom_exceptions.py",
            code: `class ValidationError(Exception): pass\n\ndef validate_age(age: int):\n    if age < 0 or age > 120:\n        raise ValidationError(f"Invalid age: {age}")\n    return True\n\ntry:\n    validate_age(150)\nexcept ValidationError as err:\n    print("Caught expected validation failure:", err)`,
            pitfall: "Catching bare `except:` or `except Exception:` blindly silences keyboard interrupts (Ctrl+C) and masks system-level bugs.",
            proTip: "Use the `finally:` block for guaranteed cleanup tasks like closing sockets or releasing file locks.",
            task: "Create a custom exception NegativeBalanceError and raise it when balance < 0.",
            expected: "NegativeBalanceError raised successfully"
          },
          {
            title: "OOP: Classes, __init__, Encapsulation & Properties",
            concept: isHinglish ? "Classes blueprint hoti hain aur objects instances. __init__ constructor attribute initialization karta hai aur @property clean getter/setter validation deta hai." : "Classes bundle state and behavior. The @property decorator provides Pythonic getters and setters with clean attribute access syntax.",
            codeFilename: "oop_classes.py",
            code: `class Account:\n    def __init__(self, owner: str, balance: float = 0.0):\n        self.owner = owner\n        self._balance = balance\n\n    @property\n    def balance(self) -> float:\n        return self._balance\n\nacc = Account("Aarav", 500.0)\nprint(f"Account for {acc.owner}: Balance ${acc.balance}")`,
            pitfall: "Using double underscores (__var) invokes name mangling; for standard protected attributes, use a single underscore (_var).",
            proTip: "Use the dataclasses module (@dataclass) in Python 3.7+ to automatically generate __init__, __repr__, and __eq__ methods for data containers.",
            task: "Define a class Circle with radius and a property area that returns 3.14159 * radius ** 2.",
            expected: "Circle Area: 78.54"
          },
          {
            title: "Capstone Project: Enterprise Academic Analytics Engine",
            concept: isHinglish ? "Is capstone project me hum sabhi 10 modules ka combination use karke ek production-ready Academic Analytics Engine build karenge jo student grades aur performance track karta hai." : "This capstone synthesizes all foundational Python paradigms into a cohesive, object-oriented Academic Analytics Engine with rankings, averages, and report generation.",
            codeFilename: "capstone_analytics.py",
            code: `class AnalyticsEngine:\n    def __init__(self, course: str):\n        self.course = course\n        self._students = {}\n\n    def add_grade(self, name: str, score: float):\n        self._students.setdefault(name, []).append(score)\n\n    def get_rankings(self):\n        return sorted([(k, sum(v)/len(v)) for k, v in self._students.items()], key=lambda x: x[1], reverse=True)\n\nengine = AnalyticsEngine("Python CS")\nengine.add_grade("Priya", 98)\nengine.add_grade("Aarav", 92)\nfor rank, (name, avg) in enumerate(engine.get_rankings(), 1):\n    print(f"#{rank} {name}: {avg}%")`,
            pitfall: "Failing to handle division by zero when calculating averages for students with 0 scores will cause ZeroDivisionError.",
            proTip: "Expose clean public APIs and hide internal state data structures behind descriptive query methods.",
            task: "Run the capstone engine and verify that highest scoring students are ranked first.",
            expected: "#1 Priya: 98.0%, #2 Aarav: 92.0%"
          }
        ]
      }
    ];
  } else {
    // Universal domain curriculum for other topics (JavaScript, C, Java, Web Dev, etc.)
    const topicPhases = [
      { name: "Architecture, Runtime & Ecosystem Foundations", sub: "Internal execution pipeline, runtime environments, toolchains & setup" },
      { name: "Data Primitives, Memory Representation & Operators", sub: "Types, memory allocation, arithmetic logic, and bitwise mechanics" },
      { name: "Text Manipulation, Encodings & String Pipelines", sub: "Immutability, character encodings, slicing, and parsing protocols" },
      { name: "Decision Engines, Boolean Algebra & Control Flow", sub: "Short-circuit evaluation, pattern matching, branching trees" },
      { name: "Iterative Mechanics, Iterators & Stream Processing", sub: "Loop invariants, collection traversal, comprehensions, and generators" },
      { name: "Sequential Data Structures & Memory Alignment", sub: "Dynamic arrays, continuous memory layout, mutability, and indexing" },
      { name: "Associative Lookups, Hash Tables & Set Theory", sub: "Hash functions, collision resolution, O(1) algorithms, and set operations" },
      { name: "Modular Architecture, Functions & Lexical Scope", sub: "Call stacks, closures, parameter passing, and encapsulation boundaries" },
      { name: "I/O Streams, Resource Management & Serialization", sub: "File descriptors, context managers, JSON/binary serialization protocols" },
      { name: "Defensive Engineering, Exception Boundaries & Capstone", sub: "Error handling, OOP abstraction, and an end-to-end production capstone" },
    ];

    curriculum = topicPhases.map((phase, idx) => ({
      title: `${cleanTopic}: ${phase.name}`,
      desc: `Master ${phase.sub.toLowerCase()} within ${cleanTopic} with production patterns.`,
      lessons: [
        {
          title: `${cleanTopic} ${phase.name.split(',')[0]} Fundamentals`,
          concept: isHinglish 
            ? `Is lesson me hum <strong>${cleanTopic}</strong> ke underlying architecture aur foundational mechanics ko thoroughly dissect karenge. Tier-1 enterprise systems me is pattern ko standard mana jata hai.`
            : `In this lecture, we dissect the architectural mechanics of <strong>${cleanTopic}</strong>. Tier-1 engineering organizations implement this pattern to guarantee deterministic runtime behavior.`,
          codeFilename: `${cleanTopic.toLowerCase().replace(/[^a-z0-9]/g, "_")}_m${idx + 1}_core.ts`,
          code: `// Production Implementation for ${cleanTopic}\nexport class SystemModule_${idx + 1} {\n  private readonly topic = "${cleanTopic}";\n  private isHealthy = true;\n\n  public inspect(): string {\n    return \`[\${this.topic}] Module ${idx + 1} active and verified.\`;\n  }\n}\n\nconst inst = new SystemModule_${idx + 1}();\nconsole.log(inst.inspect());`,
          pitfall: "Premature optimization without profiling runtime metrics can create unnecessary architectural complexity.",
          proTip: "Separate pure business calculations from side-effects (I/O, database) to make testing and scaling straightforward.",
          task: `Initialize the ${cleanTopic} system instance and verify the inspection output.`,
          expected: `[${cleanTopic}] Module ${idx + 1} active and verified.`
        },
        {
          title: `Applied Engineering Patterns & Real-World Mechanics in ${cleanTopic}`,
          concept: isHinglish
            ? `Syntax seekhne ke baad use production systems me apply karna critical hai. Yaha hum practical workflows, edge cases, aur high-performance design patterns implement karenge.`
            : `Translating fundamental syntax into robust engineering workflows requires strict boundary validation and structured error propagation.`,
          codeFilename: `${cleanTopic.toLowerCase().replace(/[^a-z0-9]/g, "_")}_m${idx + 1}_workflow.ts`,
          code: `export async function executePipeline(dataset: string[]): Promise<{ count: number; status: string }> {\n  const sanitized = dataset.map(item => item.trim()).filter(Boolean);\n  console.log("Processed ${cleanTopic} items:", sanitized.length);\n  return { count: sanitized.length, status: "OK" };\n}`,
          pitfall: "Failing to sanitize user inputs before processing leads to memory leaks or unexpected runtime crashes.",
          proTip: "Leverage immutable data patterns whenever data crosses concurrent or asynchronous boundaries.",
          task: `Process a dataset of 3 items through executePipeline and inspect the returned object.`,
          expected: `Processed ${cleanTopic} items: 3`
        },
        {
          title: `Diagnostic Debugging, Pro-Tips & Hands-on Mastery for Module ${idx + 1}`,
          concept: isHinglish
            ? `Ek senior engineer aur junior me farak debugging aur optimization ka hota hai. Yaha hum common pitfalls aur interview checklist ko master karenge.`
            : `Distinguishing senior practitioners from novices lies in anticipating failure modes, understanding profiling tools, and isolating edge cases.`,
          codeFilename: `${cleanTopic.toLowerCase().replace(/[^a-z0-9]/g, "_")}_m${idx + 1}_diagnostics.ts`,
          code: `export function runHealthDiagnostics() {\n  const telemetry = { status: "ACTIVE", memory: "Optimal", topic: "${cleanTopic}" };\n  console.log("Telemetry Check:", telemetry);\n  return telemetry;\n}\nrunHealthDiagnostics();`,
          pitfall: "Silently ignoring errors with empty catch blocks makes production failures impossible to trace.",
          proTip: "Always attach descriptive context (timestamps, identifiers) to error payloads for rapid triage in logging dashboards.",
          task: `Run the diagnostics function and verify all telemetry attributes are present.`,
          expected: `Telemetry Check: { status: 'ACTIVE', memory: 'Optimal' }`
        }
      ]
    }));
  }

  // Adjust to requested totalModules
  const effectiveModules = curriculum.slice(0, totalModules);
  while (effectiveModules.length < totalModules) {
    const extraIdx = effectiveModules.length + 1;
    effectiveModules.push({
      title: `${cleanTopic} Advanced Systems Module ${extraIdx}`,
      desc: `Specialized domain architecture, high-throughput scaling, and production workflows for ${cleanTopic}.`,
      lessons: [
        {
          title: `Advanced Architecture & Mechanics (Part 1)`,
          concept: `Comprehensive examination of advanced execution pipelines and systems patterns in ${cleanTopic}.`,
          codeFilename: `module_${extraIdx}_adv1.ts`,
          code: `console.log("Executing Advanced Module ${extraIdx} for ${cleanTopic}");`,
          pitfall: "Avoid unmonitored background routines.",
          proTip: "Profile memory usage before scaling cluster size.",
          task: "Execute the advanced routine.",
          expected: `Advanced Module ${extraIdx} Ready`
        },
        {
          title: `Production Optimization & Scaling (Part 2)`,
          concept: `Techniques for optimizing latency, concurrency, and reliability in enterprise deployments.`,
          codeFilename: `module_${extraIdx}_adv2.ts`,
          code: `console.log("Optimized pipeline running for ${cleanTopic}");`,
          pitfall: "Over-caching stale records.",
          proTip: "Set explicit TTL on all distributed cache entries.",
          task: "Verify pipeline optimization.",
          expected: "Optimized Pipeline Ready"
        },
        {
          title: `Capstone & Industry Checklist (Part 3)`,
          concept: `Capstone synthesis, technical interview readiness, and operational standards.`,
          codeFilename: `module_${extraIdx}_adv3.ts`,
          code: `console.log("Module ${extraIdx} Capstone Verified");`,
          pitfall: "Skipping integration tests before deploying.",
          proTip: "Automate test assertions in continuous integration.",
          task: "Run capstone verification.",
          expected: "Capstone Verified"
        }
      ]
    });
  }

  let modulesHtml = "";

  effectiveModules.forEach((mod, mIdx) => {
    const m = mIdx + 1;
    let lessonsHtml = "";

    mod.lessons.slice(0, lessonsPerModule).forEach((lesson, lIdx) => {
      const l = lIdx + 1;
      lessonsHtml += `
      <div class="lesson">
        <h3>Lesson ${m}.${l}: ${lesson.title}</h3>
        <p>${lesson.concept}</p>

        <!-- VISUAL MOCKUP CONTAINER -->
        <div class="visual-container">
          <div class="code-editor">
            <div class="code-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="filename">${lesson.codeFilename}</span>
            </div>
            <pre><code>${lesson.code}</code></pre>
          </div>
          <p class="caption">Figure ${m}.${l}: Verified implementation for ${lesson.title}.</p>
        </div>

        <!-- COMMON PITFALLS BOX -->
        <div class="pitfall-box">
          <div class="pitfall-title">⚠️ Common Pitfall & Debugging Gotcha</div>
          <p>${lesson.pitfall}</p>
        </div>

        <!-- PRO-TIP BOX -->
        <div class="pro-tip">
          <div class="pro-tip-title">💡 Senior Practitioner Pro-Tip</div>
          <p>${lesson.proTip}</p>
        </div>

        <!-- KEY TAKEAWAYS BOX -->
        <div class="takeaways-box">
          <div class="takeaways-title">📌 Key Takeaways & Interview Prep</div>
          <ul>
            <li><strong>Core Takeaway:</strong> Understand the internal execution lifecycle of ${lesson.title}.</li>
            <li><strong>Production Standard:</strong> Validate inputs and isolate state mutations across boundaries.</li>
            <li><strong>Interview Question:</strong> How does ${cleanTopic} handle this pattern under high throughput?</li>
          </ul>
        </div>

        <!-- INTERACTIVE SANDBOX CHALLENGE -->
        <div class="sandbox-challenge">
          <span class="challenge-badge">⚡ Interactive Hands-on Challenge</span>
          <h4 class="challenge-title">Exercise: ${lesson.task}</h4>
          <p class="challenge-task">${isHinglish ? "Niche diye gaye starter code ko sandbox me run karein aur expected output verify karein:" : "Run the starter code below in the sandbox and verify the expected output:"}</p>
          <p class="challenge-expected"><strong>Expected Output:</strong> ${lesson.expected}</p>
          <pre class="starter-code"><code>// Starter code for ${lesson.title}\n${lesson.code}</code></pre>
        </div>
      </div>
      `;
    });

    modulesHtml += `
    <div class="module-block">
      <div class="module-header">
        <span class="module-pill">MODULE 0${m}</span>
        <h2>Module ${m}: ${mod.title}</h2>
        <p class="module-desc">${mod.desc}</p>
      </div>
      ${lessonsHtml}
    </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanTopic} - CourseGenie Editorial Curriculum</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    @page { size: A4; margin: 18mm 20mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #FDFCFB;
      color: #333333;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.85;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 860px;
      margin: 0 auto;
      padding: 40px 24px;
    }
    .cover-page {
      padding: 60px 0 40px 0;
      border-bottom: 2px solid #E8E4E1;
      margin-bottom: 50px;
    }
    .badge {
      display: inline-block;
      background: #FFF3EB;
      color: #F27D26;
      border: 1px solid #FCD4BA;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 6px 14px;
      border-radius: 999px;
      margin-bottom: 20px;
    }
    .cover-title {
      font-size: 38px;
      font-weight: 800;
      color: #1A1A1A;
      line-height: 1.25;
      margin-bottom: 14px;
      letter-spacing: -0.02em;
    }
    .cover-subtitle {
      font-size: 18px;
      color: #666666;
      line-height: 1.6;
      margin-bottom: 28px;
    }
    .meta-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 16px 20px;
      background: #F7F5F3;
      border: 1px solid #E8E4E1;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
      color: #555555;
      margin-bottom: 40px;
    }
    .meta-item { display: flex; align-items: center; gap: 6px; }
    .meta-item strong { color: #1A1A1A; }
    .toc {
      background: #FFFFFF;
      border: 1px solid #E8E4E1;
      border-radius: 14px;
      padding: 28px 32px;
      margin-top: 30px;
    }
    .toc h3 {
      font-size: 16px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #1A1A1A;
      margin-bottom: 16px;
    }
    .toc ul { list-style: none; }
    .toc li {
      padding: 8px 0;
      border-bottom: 1px dashed #EDE8E5;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      color: #444444;
    }
    .module-block { margin-bottom: 70px; }
    .module-header {
      padding-bottom: 20px;
      border-bottom: 2px solid #1A1A1A;
      margin-bottom: 35px;
    }
    .module-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: #F27D26;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      display: block;
      margin-bottom: 8px;
    }
    .module-header h2 {
      font-size: 26px;
      font-weight: 800;
      color: #1A1A1A;
      letter-spacing: -0.01em;
      margin-bottom: 8px;
    }
    .module-desc {
      font-size: 15px;
      color: #666666;
      line-height: 1.6;
    }
    .lesson {
      margin-bottom: 50px;
      padding-bottom: 40px;
      border-bottom: 1px solid #E8E4E1;
    }
    .lesson h3 {
      font-size: 20px;
      font-weight: 700;
      color: #1A1A1A;
      margin-top: 28px;
      margin-bottom: 20px;
    }
    p { margin-bottom: 22px; }
    .visual-container { margin: 26px 0; }
    .code-editor {
      background: #111418;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      border: 1px solid #232933;
    }
    .code-header {
      background: #1A1F26;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 6px;
      border-bottom: 1px solid #232933;
    }
    .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
    .dot.red { background: #FF5F56; }
    .dot.yellow { background: #FFBD2E; }
    .dot.green { background: #27C93F; }
    .filename {
      margin-left: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #8D99AE;
    }
    pre {
      padding: 22px 24px;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      line-height: 1.75;
      color: #E6EDF3;
    }
    .caption {
      font-size: 12px;
      color: #888888;
      font-style: italic;
      margin-top: 8px;
      text-align: center;
    }
    .pitfall-box {
      background: #FFF9F7;
      border: 1px solid #FFD8CE;
      border-left: 4px solid #E5484D;
      border-radius: 0 12px 12px 0;
      padding: 20px 24px;
      margin: 26px 0;
    }
    .pitfall-title {
      font-weight: 800;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #C02D32;
      margin-bottom: 8px;
    }
    .pitfall-box p { margin-bottom: 0; color: #4A1E20; font-size: 14px; }
    .pro-tip {
      background: #FFFBF5;
      border-left: 4px solid #F27D26;
      border-radius: 0 12px 12px 0;
      padding: 22px 28px;
      margin: 28px 0;
      border: 1px solid #FCD4BA;
      border-left-width: 4px;
    }
    .pro-tip-title {
      font-weight: 800;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #C05600;
      margin-bottom: 8px;
    }
    .pro-tip p { margin-bottom: 0; color: #4A3B32; }
    .takeaways-box {
      background: #F8F9FA;
      border: 1px solid #E9ECEF;
      border-radius: 12px;
      padding: 20px 24px;
      margin: 26px 0;
    }
    .takeaways-title {
      font-weight: 800;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #212529;
      margin-bottom: 12px;
    }
    .takeaways-box ul { list-style: disc; padding-left: 20px; }
    .takeaways-box li { margin-bottom: 8px; font-size: 14px; color: #495057; }
    .sandbox-challenge {
      background: #F0FBF8;
      border: 1px solid #C4EFE3;
      border-radius: 12px;
      padding: 24px 28px;
      margin: 28px 0;
    }
    .challenge-badge {
      display: inline-block;
      background: #00876C;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 10px;
    }
    .challenge-title { font-size: 16px; font-weight: 800; color: #005644; margin-bottom: 8px; }
    .challenge-task { font-size: 14px; color: #1E3D35; margin-bottom: 12px; }
    .challenge-expected { font-size: 13px; color: #005644; margin-bottom: 14px; }
    .starter-code { background: #082921; color: #72E5C3; padding: 16px; border-radius: 8px; font-size: 12px; overflow-x: auto; }
    @media print {
      body { background: #FFFFFF; font-size: 12pt; }
      .wrapper { max-width: 100%; padding: 0; }
      .lesson { page-break-inside: avoid; }
      .module-block { page-break-before: always; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="cover-page">
      <div class="badge">CourseGenie Editorial Curriculum</div>
      <h1 class="cover-title">${cleanTopic}</h1>
      <p class="cover-subtitle">A comprehensive, hands-on path to master ${cleanTopic} with interactive code architectures and real-world exercises.</p>

      <div class="meta-bar">
        <div class="meta-item">Audience: <strong>${level}</strong></div>
        <div class="meta-item">•</div>
        <div class="meta-item">Modules: <strong>${effectiveModules.length} Modules</strong></div>
        <div class="meta-item">•</div>
        <div class="meta-item">Lessons: <strong>${effectiveModules.length * lessonsPerModule} Practical Lessons</strong></div>
        <div class="meta-item">•</div>
        <div class="meta-item">Language: <strong>${language}</strong></div>
      </div>

      <div class="toc">
        <h3>Table of Contents</h3>
        <ul>
          ${effectiveModules.map((m, i) => `
            <li>
              <span>Module 0${i + 1}: ${m.title}</span>
              <span>${lessonsPerModule} Lessons</span>
            </li>
          `).join("")}
        </ul>
      </div>
    </div>

    ${modulesHtml}
  </div>
</body>
</html>`;
}
