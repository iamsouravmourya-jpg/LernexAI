export function generateLessonQuizzes(lessonTitle: string, lang: string) {
  return [
    {
      id: `q-${Math.random().toString(36).substring(2, 9)}`,
      question: `What is the primary core concept taught in "${lessonTitle}"?`,
      options: [
        `Understanding key domain mechanisms and syntax patterns of ${lang.toUpperCase()}`,
        `Ignoring runtime efficiency and data structure memory layouts`,
        `Using deprecated language features without safety guards`,
        `Avoiding type checks and compilation stages completely`
      ],
      correctAnswer: 0,
      explanation: `This lesson focuses on mastering the exact, idiomatic patterns and architectural best practices of ${lang.toUpperCase()}.`
    },
    {
      id: `q-${Math.random().toString(36).substring(2, 9)}`,
      question: `Which statement regarding ${lang.toUpperCase()} best practices in this topic is accurate?`,
      options: [
        `Always prefer clear, idiomatic, type-safe constructs with verified execution guarantees`,
        `Always bypass error handling to make scripts shorter`,
        `Hardcode variable values without dynamic parameterization`,
        `Rely on undefined behavior for performance optimization`
      ],
      correctAnswer: 0,
      explanation: `Modern ${lang.toUpperCase()} emphasizes strict type safety, predictable execution flow, and zero undefined behavior.`
    },
    {
      id: `q-${Math.random().toString(36).substring(2, 9)}`,
      question: `What is the expected outcome when applying the principles of "${lessonTitle}"?`,
      options: [
        `Predictable, clean, maintainable, and high-performance production code`,
        `Unpredictable runtime memory corruption and data leaks`,
        `Slow execution caused by unoptimized redundant iterations`,
        `Breaking API contracts and compiler errors`
      ],
      correctAnswer: 0,
      explanation: `Applying core idiomatic patterns ensures maximum performance, readability, and robust software architecture.`
    }
  ];
}

export function makeLesson(
  id: string,
  moduleId: string,
  lessonNum: number,
  title: string,
  orderIndex: number,
  duration: number,
  sandboxLanguage: "python" | "java" | "c" | "cpp" | "html" | "sql",
  starterCode: string,
  challenge: { task: string; hint: string; expected_output: string },
  mentalModel: string,
  points: Array<{ tag: string; color: string; title: string; desc: string }>,
  htmlContent: string
) {
  const quizzes = generateLessonQuizzes(title, sandboxLanguage);
  return {
    id,
    module_id: moduleId,
    lesson_number: lessonNum,
    title,
    order_index: orderIndex,
    duration_minutes: duration,
    content_type: "text",
    starter_code: starterCode,
    sandbox_language: sandboxLanguage,
    challenge,
    quizzes,
    quiz_questions: quizzes,
    content: `<div class="mental-model-box">
  <div class="mental-icon">⚡</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text">${mentalModel}</p>
  </div>
</div>

<div class="pipeline-flow">
  ${points.map(p => `  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:${p.color.split(';')[0]}; color:${p.color.split(';')[1]};">${p.tag}</span>
    <div class="pipeline-title">${p.title}</div>
    <p class="pipeline-desc">${p.desc}</p>
  </div>`).join('')}
</div>

${htmlContent}`
  };
}
