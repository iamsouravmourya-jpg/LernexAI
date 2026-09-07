import fs from 'fs';
import path from 'path';

function makeLesson(id: string, moduleId: string, lessonNum: number, title: string, orderIndex: number, duration: number, starterCode: string, challenge: { task: string; hint: string; expected_output: string }, mentalModel: string, points: Array<{ tag: string; color: string; title: string; desc: string }>, htmlContent: string) {
  return {
    id,
    module_id: moduleId,
    lesson_number: lessonNum,
    title,
    order_index: orderIndex,
    duration_minutes: duration,
    content_type: "text",
    starter_code: starterCode,
    sandbox_language: "html" as const,
    challenge,
    content: `<div class="mental-model-box">
  <div class="mental-icon">🎨</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text">${mentalModel}</p>
  </div>
</div>

<div class="pipeline-flow">
  ${points.map(p => `
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:${p.color.split(';')[0]}; color:${p.color.split(';')[1]};">${p.tag}</span>
    <div class="pipeline-title">${p.title}</div>
    <p class="pipeline-desc">${p.desc}</p>
  </div>`).join('')}
</div>

${htmlContent}`
  };
}

export const htmlCssFullCourse = {
  id: "course-test-5-html-css",
  title: "Modern Responsive Web Design: HTML5 & CSS3 Masterclass (Hinglish)",
  subtitle: "Semantic Architecture, Modern CSS Layouts (Flexbox & Grid), Responsive Systems & Micro-Interactions",
  description: "Modern Responsive Web Development ko zero se senior frontend architect level tak master karein natural Hinglish mein! Semantic HTML5 tags, Form Validation, CSS Box Model, Specificity, Advanced CSS Flexbox, 2D CSS Grid Matrix, Responsive Breakpoints (Mobile-First), Fluid Typography (clamp), Keyframe Animations, Glassmorphism aur High-Conversion Production SaaS Landing Page live editor ke sath seekhein.",
  category: "Web Development",
  difficulty: "Beginner",
  thumbnail_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 10,
  estimated_hours: 48,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    {
      id: "test5-mod-1",
      course_id: "course-test-5-html-css",
      module_number: 1,
      title: "Module 1: HTML5 Document Anatomy & Semantic Architecture",
      description: "DOCTYPE, DOM Tree, Head vs Body, Semantic Tags (<header>, <nav>, <main>, <article>, <aside>, <footer>) aur Accessibility (ARIA).",
      order_index: 1,
      lessons: [
        makeLesson("test5-l-1-1", "test5-mod-1", 1, "Lesson 1.1: Semantic HTML5 Structure vs Generic <div> Soup", 1, 25,
`<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Semantic Web</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #0f172a; color: #f8fafc; padding: 20px; }
    header { background: #1e293b; padding: 16px 24px; border-radius: 12px; border: 1px solid #334155; }
    main { margin-top: 20px; background: #1e293b; padding: 24px; border-radius: 12px; }
    .badge { background: #0284c7; color: white; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <header>
    <span class="badge">HTML5 Semantic Standard</span>
    <h2>🚀 Mera Modern Web Portal</h2>
    <p>Semantic tags search engines (SEO) aur screen readers ke liye zaroori hain!</p>
  </header>

  <main>
    <h3>Kyu Semantic Tags zaroori hain?</h3>
    <p>Sirf &lt;div&gt; use karne ke bajaye &lt;main&gt;, &lt;article&gt; aur &lt;nav&gt; use karne se browser ko webpage ka structure samajh aata hai.</p>
  </main>
</body>
</html>`, {
          task: "Ek <nav> element banayein jisme 3 navigation links (Home, Courses, Contact) hon.",
          hint: "<nav><a href=\"#\">Home</a> <a href=\"#\">Courses</a></nav>",
          expected_output: "nav"
        },
        "<strong>HTML5 = Webpage ka Kankaal (Skeleton / Bones)!</strong> Semantic tags generic &lt;div&gt; ke muqable browser aur search engines (Google SEO) ko batate hain ki kaunsa content kya role play karta hai.",
        [
          { tag: "Semantic 01", color: "#e0f2fe;#0369a1", title: "🧭 &lt;nav&gt; & &lt;header&gt;", desc: "Global navigation links aur branding header section." },
          { tag: "Semantic 02", color: "#dcfce7;#15803d", title: "📄 &lt;main&gt; & &lt;article&gt;", desc: "Page ka core primary content jo SEO ranking define karta hai." }
        ],
        ""
        ),
        makeLesson("test5-l-1-2", "test5-mod-1", 2, "Lesson 1.2: The Head Element, Meta Tags & SEO Optimization", 2, 20,
`<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character Encoding for Unicode/Hindi/Emojis -->
  <meta charset="UTF-8">
  <!-- Critical for Responsive Scaling on Smartphones -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Production Web Development Masterclass in Hinglish">
  <title>Developer Portal • Masterclass</title>
</head>
<body style="font-family: sans-serif; background: #1e293b; color: white; padding: 20px;">
  <h2>🔍 HTML5 Head Section Anatomy</h2>
  <p>&lt;head&gt; tag mein page ki hidden metadata, fonts, stylesheets aur SEO instructions hoti hain.</p>
</body>
</html>`, {
          task: "Ek meta description tag add karein head section mein.",
          hint: "<meta name=\"description\" content=\"My Web App\">",
          expected_output: "meta name=\"description\""
        },
        "<strong>The &lt;head&gt; Tag = Invisible Command Center!</strong> Screen par kuch render nahi karta, lekin Google search ranking, social sharing previews (OpenGraph), aur mobile scaling ko control karta hai.",
        [
          { tag: "Meta", color: "#e0f2fe;#0369a1", title: "📱 Viewport Meta Tag", desc: "Mobile devices par 100% pixel-perfect responsive scaling deta hai." },
          { tag: "Charset", color: "#dcfce7;#15803d", title: "🌐 UTF-8 Encoding", desc: "Special symbols aur multilingual characters cleanly render karta hai." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-html-1-1", question: "HTML5 document ke top par `<!DOCTYPE html>` likhna kyu mandatory hai?", options: ["Browser ko HTML5 standards mode mein page render karne ka instruction dene ke liye", "Page download karne ke liye", "Internet speed badhane ke liye", "Font color set karne ke liye"], correct_index: 0, explanation: "<!DOCTYPE html> browser ko legacy quirks mode se prevent karta hai aur modern HTML5 standard rendering enable karta hai." },
          { id: "q-html-1-2", question: "Generic `<div>` tag ke muqable `<article>` tag kab use kiya jata hai?", options: ["Jab content self-contained aur independently distributable ho (jaise blog post ya news article)", "Sirf images ke liye", "Sirf buttons ke liye", "Kabhi nahi"], correct_index: 0, explanation: "<article> semantic tag independent, reusable content blocks ke liye use hota hai." },
          { id: "q-html-1-3", question: "Ek HTML document mein `<main>` tag kitni baar aana chahiye?", options: ["Sirf ek baar (Unique to each page)", "Har paragraph ke baad", "10 baar", "Unlimited"], correct_index: 0, explanation: "<main> tag page ke unique core content ko represent karta hai aur per-document sirf 1 baar allowed hota hai." },
          { id: "q-html-1-4", question: "`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` ka primary role kya hai?", options: ["Responsive mobile viewport scaling enable karna", "Language translate karna", "Password encrypt karna", "Page refresh karna"], correct_index: 0, explanation: "Viewport meta tag mobile devices par page ko screen width ke according scale karta hai for responsive design." },
          { id: "q-html-1-5", question: "Images mein `alt` attribute provide karna kyu critical hai?", options: ["Screen readers ke through visually impaired users ko accessibility aur SEO indexing ke liye", "Image ka size badhane ke liye", "Image ko crop karne ke liye", "Border hatane ke liye"], correct_index: 0, explanation: "alt text image na load hone par text fallback deta hai aur screen readers ke liye accessibility provide karta hai." }
        ]
      }
    },
    {
      id: "test5-mod-2",
      course_id: "course-test-5-html-css",
      module_number: 2,
      title: "Module 2: Typography, Links, Media & Responsive Images",
      description: "Headings (h1-h6), Paragraphs, Anchor tags, Responsive Images (<picture>, srcset), Video/Audio aur Web Accessibility.",
      order_index: 2,
      lessons: [
        makeLesson("test5-l-2-1", "test5-mod-2", 1, "Lesson 2.1: Modern Responsive Images & Media Elements", 1, 25,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #111827; color: white; padding: 20px; }
    .card { max-width: 450px; background: #1f2937; border-radius: 12px; overflow: hidden; border: 1px solid #374151; }
    .card img { width: 100%; height: 220px; object-fit: cover; display: block; }
    .content { padding: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <img 
      src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600" 
      alt="Developer laptop screen with clean code" 
      loading="lazy"
    />
    <div class="content">
      <h3>🚀 Ultra-Fast Responsive Web</h3>
      <p>Modern images mein <code>loading="lazy"</code> aur <code>object-fit: cover</code> best practice hain.</p>
    </div>
  </div>
</body>
</html>`, {
          task: "Ek image tag likhein jisme 'loading=\"lazy\"' aur valid 'alt' text set ho.",
          hint: "<img src=\"...\" alt=\"Laptop\" loading=\"lazy\" />",
          expected_output: "loading=\"lazy\""
        },
        "<strong>Responsive Images = Fast Loading & Crisp Quality!</strong> <code>loading=\"lazy\"</code> browser ko off-screen images defer karne bolta hai jisse initial page load ultra-fast hota hai.",
        [
          { tag: "object-fit", color: "#e0f2fe;#0369a1", title: "🖼️ object-fit: cover", desc: "Image distortion ke bina container mein aspect ratio preserve karke fill karti hai." },
          { tag: "lazy", color: "#dcfce7;#15803d", title: "⚡ loading=\"lazy\"", desc: "Native browser lazy loading for high Lighthouse performance." }
        ],
        ""
        ),
        makeLesson("test5-l-2-2", "test5-mod-2", 2, "Lesson 2.2: Semantic Typography, Blockquotes & Lists", 2, 20,
`<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background: #0f172a; color: #f8fafc; padding: 20px;">
  <h1>H1 Primary Page Headline</h1>
  <p>Hierarchical heading structure (h1 to h6) SEO ke liye bohot zaroori hota hai.</p>
  
  <blockquote style="border-left: 4px solid #38bdf8; padding-left: 12px; color: #94a3b8;">
    "Good design is obvious. Great design is transparent." — Joe Sparano
  </blockquote>

  <h3>Core Stack Essentials</h3>
  <ul>
    <li>HTML5 Semantics</li>
    <li>Modern CSS Grid & Flexbox</li>
    <li>Clean Accessibility (ARIA)</li>
  </ul>
</body>
</html>`, {
          task: "Ek unordered list (&lt;ul&gt;) banayein jisme 2 list items (&lt;li&gt;) hon.",
          hint: "<ul><li>Item 1</li><li>Item 2</li></ul>",
          expected_output: "<ul>"
        },
        "<strong>Typography Hierarchy!</strong> h1 se h6 tak size ke hisaab se nahi, balki topic importance ke hisaab se use karein. Per-page sirf ek single primary h1 hona chahiye.",
        [
          { tag: "H1", color: "#e0f2fe;#0369a1", title: "👑 Single H1", desc: "Google crawler h1 ko page ka main title manta hai." },
          { tag: "Lists", color: "#dcfce7;#15803d", title: "📋 &lt;ul&gt; & &lt;ol&gt;", desc: "Structured lists for accessibility." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-html-2-1", question: "`loading=\"lazy\"` attribute image tag mein add karne se kya hota hai?", options: ["Browser sirf tab image download karta hai jab user uske paas scroll karta hai (Performance optimization)", "Image slow download hoti hai", "Image quality kharab ho jaati hai", "Image black & white ho jaati hai"], correct_index: 0, explanation: "Native lazy loading page load speed aur initial network payload ko drastically reduce karti hai." },
          { id: "q-html-2-2", question: "CSS mein `object-fit: cover` property ka kya kaam hota hai?", options: ["Image ko bina aspect ratio distort kiye container mein properly fit/crop karna", "Image ko rotate karna", "Border lagana", "Background color badalna"], correct_index: 0, explanation: "object-fit: cover aspect ratio barkaraar rakhte hue container ko fully cover karta hai." },
          { id: "q-html-2-3", question: "External link open karne ke liye `target=\"_blank\"` ke sath `rel=\"noopener noreferrer\"` kyu zaroori hai?", options: ["Security vulnerability (Tabnabbing) prevent karne ke liye", "Color change karne ke liye", "Link ko bold karne ke liye", "Browser crash rokne ke liye"], correct_index: 0, explanation: "noopener window.opener access prevent karta hai jisse phishing tab-hijacking attack block hota hai." },
          { id: "q-html-2-4", question: "Responsive images ke liye alag-alag screen resolutions par different images serve karne ke liye kaunsa tag best hai?", options: ["<picture> tag with <source media=\"...\">", "<div> tag", "<b> tag", "<hr> tag"], correct_index: 0, explanation: "<picture> tag art-direction aur device-specific image switching natively allow karta hai." },
          { id: "q-html-2-5", question: "Heading tags (h1 to h6) ka primary SEO rule kya hai?", options: ["Page par sirf ek single h1 hona chahiye jo main topic define kare", "Har line par h1 lagayein", "h1 avoid karein", "h6 sabse bada hota hai"], correct_index: 0, explanation: "Standard SEO best practice ke mutabiq per-page 1 primary h1 hona chahiye." }
        ]
      }
    },
    {
      id: "test5-mod-3",
      course_id: "course-test-5-html-css",
      module_number: 3,
      title: "Module 3: HTML5 Forms, Inputs & Client-Side Validation",
      description: "Form handling, input types (email, tel, password, range), required, pattern regex, <datalist>, accessible labels aur validation states.",
      order_index: 3,
      lessons: [
        makeLesson("test5-l-3-1", "test5-mod-3", 1, "Lesson 3.1: Building Accessible & Validated Modern Forms", 1, 25,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: white; padding: 20px; }
    .form-box { max-width: 400px; background: #1e293b; padding: 24px; border-radius: 12px; border: 1px solid #334155; }
    label { display: block; margin-top: 12px; font-size: 13px; color: #94a3b8; }
    input { width: 100%; box-sizing: border-box; padding: 10px; margin-top: 6px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; }
    input:focus { outline: 2px solid #38bdf8; border-color: transparent; }
    button { width: 100%; margin-top: 18px; padding: 12px; background: #0284c7; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
    button:hover { background: #0369a1; }
  </style>
</head>
<body>
  <div class="form-box">
    <h3>🔐 Member Registration</h3>
    <form action="#" method="POST">
      <label for="username">Full Name</label>
      <input type="text" id="username" required placeholder="Sourav Sharma" />

      <label for="email">Work Email</label>
      <input type="email" id="email" required placeholder="name@company.com" />

      <button type="submit">Complete Setup 🚀</button>
    </form>
  </div>
</body>
</html>`, {
          task: "Ek password input field add karein jisme minlength='8' aur required set ho.",
          hint: "<input type=\"password\" minlength=\"8\" required />",
          expected_output: "minlength=\"8\""
        },
        "<strong>HTML5 Forms = Built-In Native Client-Side Validation!</strong> JavaScript likhe bina hi aap <code>required</code>, <code>type=\"email\"</code>, aur <code>minlength</code> se accurate form input enforce kar sakte hain.",
        [
          { tag: "Validation", color: "#e0f2fe;#0369a1", title: "🛡️ Native Constraints", desc: "Browser automatically invalid input par native tooltips display karta hai." },
          { tag: "A11y", color: "#dcfce7;#15803d", title: "🏷️ &lt;label for=\"id\"&gt;", desc: "Label click karne par target input auto-focus hota hai." }
        ],
        ""
        ),
        makeLesson("test5-l-3-2", "test5-mod-3", 2, "Lesson 3.2: Datalists, Custom Selects & Radio / Checkbox Groups", 2, 25,
`<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background: #1e293b; color: white; padding: 20px;">
  <h3>🎛️ Modern Input Controls</h3>
  
  <label for="framework">Preferred Frontend Library:</label>
  <input list="frameworks" id="framework" name="framework" placeholder="Type or select...">
  
  <datalist id="frameworks">
    <option value="React"></option>
    <option value="Next.js"></option>
    <option value="Vue"></option>
    <option value="Tailwind CSS"></option>
  </datalist>

  <div style="margin-top: 20px;">
    <label><input type="checkbox" checked> Accept Terms & Conditions</label>
  </div>
</body>
</html>`, {
          task: "Ek &lt;datalist&gt; tag banayein jisme 2 &lt;option&gt; values hon.",
          hint: "<datalist id=\"cities\"><option value=\"Delhi\"></datalist>",
          expected_output: "<datalist"
        },
        "<strong>&lt;datalist&gt; = Auto-Complete Search Bar!</strong> User ko normal text type karne ki azadi bhi deta hai aur dropdown recommendations bhi provide karta hai.",
        [
          { tag: "datalist", color: "#e0f2fe;#0369a1", title: "💡 &lt;datalist&gt;", desc: "Combines text input flexibility with dropdown autocomplete." },
          { tag: "UX", color: "#dcfce7;#15803d", title: "✨ Clean Form UX", desc: "High conversion mobile friendly form design." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-html-3-1", question: "`<label for=\"user_email\">` tag mein `for` attribute ka kya purpose hai?", options: ["Input field ke `id` attribute se bind karke accessibility aur click-to-focus enable karna", "Style change karna", "Email send karna", "Server configure karna"], correct_index: 0, explanation: "label ka `for` attribute corresponding input element ki `id` se link hota hai for screen readers aur touch usability." },
          { id: "q-html-3-2", question: "Input field mein `required` attribute add karne par kya hota hai?", options: ["Form bina us field ko fill kiye submit nahi ho sakta (Native validation trigger hoti hai)", "Password hide hota hai", "Input disable hota hai", "Font bold hota hai"], correct_index: 0, explanation: "required attribute browser level par submission block karta hai agar field blank ho." },
          { id: "q-html-3-3", question: "`<datalist>` tag ka kya benefit hai input element ke sath?", options: ["Predefined auto-complete options dropdown provide karna", "Database table banana", "List delete karna", "Font change karna"], correct_index: 0, explanation: "<datalist> user ko standard typing input ke sath suggested dropdown suggestions provide karta hai." },
          { id: "q-html-3-4", question: "Sensitive information jaise Password submit karte waqt `<form method=\"...\">` mein kya use hona chahiye?", options: ["method=\"POST\"", "method=\"GET\"", "method=\"DELETE\"", "method=\"HEAD\""], correct_index: 0, explanation: "GET method sensitive data URL query parameters mein expose kar deta hai isliye hamesha POST use karna chahiye." },
          { id: "q-html-3-5", question: "Pattern attribute (e.g. `pattern=\"[0-9]{10}\"`) input mein kya enforce karta hai?", options: ["Custom Regular Expression (Regex) validation (jaise 10-digit phone number)", "Color code", "Dark mode", "Audio output"], correct_index: 0, explanation: "pattern attribute client-side regex matching enforce karta hai submission se pehle." }
        ]
      }
    },
    {
      id: "test5-mod-4",
      course_id: "course-test-5-html-css",
      module_number: 4,
      title: "Module 4: CSS3 Foundations, Selectors & Cascade Specificity",
      description: "CSS Rulesets, Specificity Weight (Inline vs ID vs Class vs Element), Combinators (>, +, ~), Pseudo-classes (:hover, :focus, :nth-child) aur Cascade.",
      order_index: 4,
      lessons: [
        makeLesson("test5-l-4-1", "test5-mod-4", 1, "Lesson 4.1: CSS Specificity Hierarchy & Pseudo-Classes", 1, 30,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    
    /* Base Class */
    .btn {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      background: #334155;
      color: white;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    /* Pseudo-Class :hover */
    .btn:hover {
      background: #0284c7;
      transform: translateY(-2px);
    }

    /* Pseudo-Class :active */
    .btn:active {
      transform: translateY(0);
    }
  </style>
</head>
<body>
  <h3>⚡ CSS Specificity & Interactive States</h3>
  <a href="#" class="btn">Hover Over Me! 🎯</a>
</body>
</html>`, {
          task: "Ek :focus-visible pseudo-class style add karein jo focus aane par outline show kare.",
          hint: ".btn:focus-visible { outline: 2px solid #38bdf8; }",
          expected_output: ":focus-visible"
        },
        "<strong>CSS Specificity = Style Conflict Resolution Formula!</strong> Jab multiple CSS rules same element par lagte hain, browser mathematically score calculate karta hai: Inline (1000) > ID (100) > Class/Pseudo-class (10) > Element (1).",
        [
          { tag: "Specificity", color: "#e0f2fe;#0369a1", title: "⚖️ Specificity Score", desc: "`#header .nav a` has 100 + 10 + 1 = 111 score!" },
          { tag: "Pseudo", color: "#dcfce7;#15803d", title: "✨ Pseudo-classes", desc: "`:hover`, `:focus`, `:nth-child(even)` dynamic element states style karte hain." }
        ],
        ""
        ),
        makeLesson("test5-l-4-2", "test5-mod-4", 2, "Lesson 4.2: Pseudo-Elements (::before & ::after) & Combinators", 2, 25,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    
    /* Badge with ::before glowing dot */
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #1e293b;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 13px;
      border: 1px solid #334155;
    }

    .status-badge::before {
      content: "";
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 8px #22c55e;
    }
  </style>
</head>
<body>
  <div class="status-badge">System Live & Operational</div>
</body>
</html>`, {
          task: "Ek ::after pseudo-element add karein jisme content: ' 🚀' set ho.",
          hint: ".status-badge::after { content: ' 🚀'; }",
          expected_output: "::after"
        },
        "<strong>Pseudo-Elements = Extra HTML DOM Add Kiye Bina UI Accents Decorate Karna!</strong> <code>::before</code> aur <code>::after</code> se glowing dots, badges, tooltips aur decorative icons inject kiye jaate hain.",
        [
          { tag: "::before", color: "#e0f2fe;#0369a1", title: "✨ ::before", desc: "Element content ke pehle virtual decorative element create karta hai." },
          { tag: "Combinators", color: "#dcfce7;#15803d", title: "🔗 Child (>) vs Adjacent (+)", desc: "Precision structural targeting in CSS." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-css-4-1", question: "Kaunsa CSS selector sabse HIGHEST specificity score rakhta hai?", options: ["Inline style (style=\"...\")", "ID selector (#header)", "Class selector (.card)", "Element selector (div)"], correct_index: 0, explanation: "Inline styles (1000) ID (100), Class (10) aur Tag (1) se sabse zyada specific hote hain." },
          { id: "q-css-4-2", question: "Child combinator `parent > child` aur Descendant combinator `parent child` mein kya farak hai?", options: ["`>` sirf direct (immediate) child elements select karta hai; space saare deeply nested descendants select karta hai", "Dono identical hain", "`>` slow hota hai", "Space error deta hai"], correct_index: 0, explanation: "`>` strictly 1 level deep child elements ko match karta hai." },
          { id: "q-css-4-3", question: "`:nth-child(2n)` pseudo-class kin elements ko select karti hai?", options: ["Sirf Even (2, 4, 6...) numbered sibling elements ko", "Sirf Odd elements ko", "Sirf pehle 2 elements ko", "Kisi ko nahi"], correct_index: 0, explanation: "2n even indexed siblings ko target karta hai jo zebra-striped tables banane ke liye standard hai." },
          { id: "q-css-4-4", question: "`!important` declaration CSS mein excessively kyu avoid karni chahiye?", options: ["Ye specificity cascade ko break karta hai aur future maintainability/debugging ko nightmare bana deta hai", "Website crash ho jaati hai", "RAM full ho jaati hai", "Font delete ho jata hai"], correct_index: 0, explanation: "!important normal cascade flow ko override karke styles ko rigid aur unmaintainable bana deta hai." },
          { id: "q-css-4-5", question: "Pseudo-element `::before` aur `::after` create karte waqt kaunsi property hona mandatory hai?", options: ["content: ''", "color: red", "display: block", "width: 100px"], correct_index: 0, explanation: "Bina `content: ''` property ke browser pseudo-element ko render hi nahi karta." }
        ]
      }
    },
    {
      id: "test5-mod-5",
      course_id: "course-test-5-html-css",
      module_number: 5,
      title: "Module 5: The CSS Box Model, Sizing & Modern Units",
      description: "Content, Padding, Border, Margin, box-sizing: border-box, Margin Collapsing, rem, em, ch, vh, vw, clamp() aur min()/max().",
      order_index: 5,
      lessons: [
        makeLesson("test5-l-5-1", "test5-mod-5", 1, "Lesson 5.1: box-sizing: border-box & Fluid clamp() Typography", 1, 30,
`<!DOCTYPE html>
<html>
<head>
  <style>
    *, *::before, *::after {
      box-sizing: border-box; /* The Golden CSS Reset! */
    }

    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }

    /* Fluid typography that scales smoothly between mobile and 4K displays */
    h1 {
      font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
      margin: 0 0 12px 0;
      color: #38bdf8;
    }

    .box {
      width: 100%;
      max-width: 400px;
      padding: 24px;
      border: 2px solid #38bdf8;
      background: #1e293b;
      border-radius: 12px;
    }
  </style>
</head>
<body>
  <h1>Fluid Headline with clamp()</h1>
  <div class="box">
    <p><code>box-sizing: border-box</code> ensure karta hai ki padding aur border add karne se element ka overall width explode na ho!</p>
  </div>
</body>
</html>`, {
          task: "Ek rule likhein jo root font-size ke relative '2rem' margin-bottom add kare.",
          hint: "margin-bottom: 2rem;",
          expected_output: "margin-bottom: 2rem"
        },
        "<strong>box-sizing: border-box = Predictable Layouts!</strong> Default <code>content-box</code> mein padding aur border width ke upar add hote hain. <code>border-box</code> se specified width ke andar hi padding aur border fit hote hain.",
        [
          { tag: "Reset", color: "#e0f2fe;#0369a1", title: "📐 border-box", desc: "Width = Content + Padding + Border (Total exact size)." },
          { tag: "Fluid", color: "#fef3c7;#b45309", title: "🌊 clamp(min, val, max)", desc: "Zero media queries ke bina fluid dynamic sizing." }
        ],
        ""
        ),
        makeLesson("test5-l-5-2", "test5-mod-5", 2, "Lesson 5.2: CSS Modern Units — rem vs em, ch, dvh & Margin Collapsing", 2, 25,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    
    /* Optimal line length for reading (65 characters width) */
    .article-text {
      max-width: 65ch;
      line-height: 1.6;
      font-size: 1.125rem;
      color: #cbd5e1;
    }
  </style>
</head>
<body>
  <div class="article-text">
    <h2>Optimal Line Width with 'ch' Units</h2>
    <p>Using <code>65ch</code> guarantees perfect typographic readability regardless of font-family or device resolution.</p>
  </div>
</body>
</html>`, {
          task: "Max width 60ch set karein readable text ke liye.",
          hint: "max-width: 60ch;",
          expected_output: "max-width: 60ch"
        },
        "<strong>Units Matter for Scalable Design Systems!</strong> `rem` root element par scale karta hai, `em` parent par compound hota hai, aur `ch` typography character width ke according responsive width deta hai.",
        [
          { tag: "rem", color: "#e0f2fe;#0369a1", title: "📏 rem Unit", desc: "Root EM ensures user browser font size preferences are respected." },
          { tag: "ch", color: "#dcfce7;#15803d", title: "📖 ch Unit", desc: "Width of '0' glyph for typographic line length control." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-css-5-1", question: "`box-sizing: border-box` apply karne se element ki calculated width par kya effect hota hai?", options: ["Padding aur Border specified width ke andar count hote hain (Total width constant rehti hai)", "Width 100px badh jaati hai", "Border invisible ho jata hai", "Padding remove ho jaati hai"], correct_index: 0, explanation: "border-box mein padding aur border inner space consume karte hain, total element width ko explode nahi karte." },
          { id: "q-css-5-2", question: "`1rem` unit kiske barabar hoti hai?", options: ["Root (`<html>`) element ke font-size ke (Default: 16px)", "Parent element ke font-size ke", "Screen height ke", "100px"], correct_index: 0, explanation: "rem (Root EM) hamesha root html element ke computed font-size se multiply hota hai." },
          { id: "q-css-5-3", question: "`clamp(1rem, 2.5vw, 2rem)` function CSS mein kya karta hai?", options: ["Value ko minimum 1rem, maximum 2rem ke beech viewport width (2.5vw) ke hisaab se dynamically scale karta hai", "Value ko freeze karta hai", "Color badalta hai", "Error throw karta hai"], correct_index: 0, explanation: "clamp() lower bound, preferred fluid rate aur upper bound define karke fluid sizing deta hai." },
          { id: "q-css-5-4", question: "Margin Collapsing kab hoti hai?", options: ["Jab do adjacent vertical margins aapas mein merge hokar single largest margin ban jaate hain", "Jab margin 0 ho jaye", "Jab flexbox use ho", "Horizontal margins mein"], correct_index: 0, explanation: "Block layout mein top aur bottom vertical margins collapse hokar dono mein se maximum value display karte hain." },
          { id: "q-css-5-5", question: "Modern CSS mein `dvh` (Dynamic Viewport Height) unit `vh` se behtar kyu hai mobile browsers par?", options: ["Mobile browser address bar expand/collapse hone par dynamically adjust hoti hai", "Download speed badhati hai", "Pixel density double karti hai", "Dark mode support karti hai"], correct_index: 0, explanation: "dvh mobile URL address bars ke hide/show hone par actual visible height calculate karta hai." }
        ]
      }
    },
    {
      id: "test5-mod-6",
      course_id: "course-test-5-html-css",
      module_number: 6,
      title: "Module 6: Positioning, Stacking Context & Z-Index Architecture",
      description: "Static, Relative, Absolute, Fixed, Sticky positioning, Stacking contexts, isolation: isolate aur z-index wars resolution.",
      order_index: 6,
      lessons: [
        makeLesson("test5-l-6-1", "test5-mod-6", 1, "Lesson 6.1: Master CSS Position (Absolute, Fixed, Sticky & Z-Index)", 1, 30,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; margin: 0; padding: 20px; min-height: 200vh; }

    /* Sticky Navbar */
    .sticky-nav {
      position: sticky;
      top: 10px;
      background: rgba(30, 41, 59, 0.9);
      backdrop-filter: blur(8px);
      padding: 12px 20px;
      border-radius: 10px;
      border: 1px solid #334155;
      z-index: 100;
    }

    /* Relative Container + Absolute Badge */
    .card {
      position: relative;
      background: #1e293b;
      padding: 24px;
      border-radius: 12px;
      margin-top: 30px;
      max-width: 350px;
    }

    .badge {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #f43f5e;
      color: white;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="sticky-nav">
    📌 Sticky Navigation (Scroll down to see stickiness!)
  </div>

  <div class="card">
    <span class="badge">HOT 🔥</span>
    <h3>Pro Positioning Architecture</h3>
    <p>Parent <code>position: relative</code> aur Child <code>position: absolute</code> modern UI ka classic pattern hai.</p>
  </div>
</body>
</html>`, {
          task: "Ek floating action button banayein jisme 'position: fixed; bottom: 20px; right: 20px;' set ho.",
          hint: "position: fixed; bottom: 20px; right: 20px;",
          expected_output: "position: fixed"
        },
        "<strong>Positioning = Document Flow Se Elements Ko Control Karna!</strong> <code>relative</code> normal flow preserve karta hai, <code>absolute</code> closest positioned ancestor ke reference se move karta hai, aur <code>sticky</code> scroll ke sath lock hota hai.",
        [
          { tag: "sticky", color: "#e0f2fe;#0369a1", title: "📌 position: sticky", desc: "Relative scroll behavior jab tak specified threshold (top: 0) reach na ho." },
          { tag: "absolute", color: "#fef3c7;#b45309", title: "🎯 position: absolute", desc: "Normal document flow se bahar nikal kar nearest positioned ancestor ke bounds mein float karta hai." }
        ],
        ""
        ),
        makeLesson("test5-l-6-2", "test5-mod-6", 2, "Lesson 6.2: Stacking Contexts & Resolving Z-Index Wars", 2, 25,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    
    /* Clean stacking isolation */
    .modal-container {
      isolation: isolate; /* Creates clean new stacking context */
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1e293b;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #475569;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }
  </style>
</head>
<body>
  <div class="modal-container">
    <h3>🛡️ Isolated Modal Dialog</h3>
    <p><code>isolation: isolate</code> prevents z-index pollution from leaking into background elements.</p>
  </div>
</body>
</html>`, {
          task: "Rule mein 'isolation: isolate;' add karein.",
          hint: "isolation: isolate;",
          expected_output: "isolation: isolate"
        },
        "<strong>Z-Index Wars Ko Khatam Karein!</strong> `isolation: isolate` se aap clean local stacking context create karte hain jisse `z-index: 999999` ki gandi bad practice se chhutkara milta hai.",
        [
          { tag: "Isolate", color: "#e0f2fe;#0369a1", title: "🛡️ isolation: isolate", desc: "Creates airtight stacking context boundaries." },
          { tag: "Z-Index", color: "#dcfce7;#15803d", title: "🥞 Layer Stacking", desc: "Predictable layered rendering without collisions." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-css-6-1", question: "`position: absolute` element kis reference point ke hisaab se position hota hai?", options: ["Apne sabse nazdeeki positioned (`relative`, `absolute`, `fixed`) ancestor ke hisaab se", "Hamesha browser window ke top-left se", "Screen ke center se", "Apne next sibling ke hisaab se"], correct_index: 0, explanation: "Absolute child apne closest non-static parent container ke bounding box ko origin manta hai." },
          { id: "q-css-6-2", question: "`position: sticky` kab tak scroll hoti hai?", options: ["Apne parent container ke end boundary tak", "Infinite scroll hoti hai", "Sirf 10px", "Scroll nahi hoti"], correct_index: 0, explanation: "Sticky element apne direct parent container ke visual boundary ke andar hi stick karta hai." },
          { id: "q-css-6-3", question: "Element par `z-index: 9999` lagane ke bawajood agar wo doosre element ke peeche chala jaye, toh root cause kya hota hai?", options: ["Parent element ne alag Stacking Context create kar rakha hai", "z-index number kam hai", "Browser bug hai", "Color dark hai"], correct_index: 0, explanation: "Parent stacking context child ke global z-index ko isolate kar deta hai (Parent z-index ceiling)." },
          { id: "q-css-6-4", question: "`position: fixed` element scroll karne par kya karta hai?", options: ["Viewport ke relative fixed rehta hai aur scroll karne par bhi screen par stationary bana rehta hai", "Page ke sath scroll ho jata hai", "Disappear ho jata hai", "Rotate hota hai"], correct_index: 0, explanation: "Fixed positioning browser viewport ko reference frame banati hai." },
          { id: "q-css-6-5", question: "`isolation: isolate` property CSS mein kyu use ki jaati hai?", options: ["Ek naya local stacking context create karke z-index leaks prevent karne ke liye", "Element delete karne ke liye", "Network disable karne ke liye", "Border hatane ke liye"], correct_index: 0, explanation: "isolation: isolate clean stacking context boundaries banata hai taaki children bahar ke z-index se interfere na karein." }
        ]
      }
    },
    {
      id: "test5-mod-7",
      course_id: "course-test-5-html-css",
      module_number: 7,
      title: "Module 7: Master CSS Flexbox (1-Dimensional Layout Engine)",
      description: "Flex Container & Items, Main Axis vs Cross Axis, justify-content, align-items, flex-grow, flex-shrink, flex-basis, flex-wrap aur gap.",
      order_index: 7,
      lessons: [
        makeLesson("test5-l-7-1", "test5-mod-7", 1, "Lesson 7.1: Flexbox Axes, Alignment & Modern gap Property", 1, 30,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }

    /* Flexbox Container */
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1e293b;
      padding: 14px 20px;
      border-radius: 12px;
      border: 1px solid #334155;
    }

    .nav-links {
      display: flex;
      gap: 16px; /* Native spacing without margin hacks! */
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-links a { color: #94a3b8; text-decoration: none; font-weight: bold; }
    .nav-links a:hover { color: #38bdf8; }

    .cta-btn { background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <nav class="nav-bar">
    <div style="font-weight: bold; font-size: 18px;">⚡ DevCraft</div>
    <ul class="nav-links">
      <li><a href="#">Courses</a></li>
      <li><a href="#">Roadmaps</a></li>
      <li><a href="#">Community</a></li>
    </ul>
    <button class="cta-btn">Join Pro</button>
  </nav>
</body>
</html>`, {
          task: "Flexbox container banayein jo child items ko vertically aur horizontally perfectly center kare.",
          hint: "display: flex; justify-content: center; align-items: center;",
          expected_output: "justify-content: center"
        },
        "<strong>Flexbox = 1D (Row ya Column) Distribution Master!</strong> Flexbox items ko dynamic resizing aur perfect alignment deta hai. <code>justify-content</code> Main Axis ko align karta hai, aur <code>align-items</code> Cross Axis ko.",
        [
          { tag: "Main Axis", color: "#e0f2fe;#0369a1", title: "↔️ justify-content", desc: "`flex-start`, `center`, `space-between`, `space-around`." },
          { tag: "Cross Axis", color: "#dcfce7;#15803d", title: "↕️ align-items", desc: "`stretch`, `center`, `flex-start`, `baseline`." }
        ],
        ""
        ),
        makeLesson("test5-l-7-2", "test5-mod-7", 2, "Lesson 7.2: Flex-Grow, Flex-Shrink, Flex-Basis & Wrap", 2, 25,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    
    .card-row {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .flex-item {
      background: #1e293b;
      padding: 20px;
      border-radius: 10px;
      flex: 1 1 200px; /* flex-grow: 1, flex-shrink: 1, flex-basis: 200px */
      border: 1px solid #334155;
    }
  </style>
</head>
<body>
  <div class="card-row">
    <div class="flex-item">Item A (flex: 1 1 200px)</div>
    <div class="flex-item">Item B (flex: 1 1 200px)</div>
    <div class="flex-item">Item C (flex: 1 1 200px)</div>
  </div>
</body>
</html>`, {
          task: "Flex item par 'flex: 1;' apply karein.",
          hint: "flex: 1;",
          expected_output: "flex: 1"
        },
        "<strong>The Power of flex: 1 1 auto!</strong> `flex-grow` free space distribute karta hai, `flex-shrink` overflow rokta hai, aur `flex-basis` initial ideal size set karta hai.",
        [
          { tag: "Grow", color: "#e0f2fe;#0369a1", title: "🌱 flex-grow", desc: "Fills remaining empty space proportionately." },
          { tag: "Wrap", color: "#dcfce7;#15803d", title: "🔄 flex-wrap: wrap", desc: "Gracefully wraps items to next line on small screens." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-css-7-1", question: "Flexbox mein element ko perfectly horizontal aur vertical center karne ka standard shorthand kya hai?", options: ["display: flex; justify-content: center; align-items: center;", "align: center;", "margin: center;", "text-align: center; vertical-align: middle;"], correct_index: 0, explanation: "Flexbox mein justify-content (main-axis) aur align-items (cross-axis) dono ko center karna standard centering pattern hai." },
          { id: "q-css-7-2", question: "`flex-direction: column` set karne par Main Axis kaunsi hoti hai?", options: ["Vertical Axis (Top to Bottom)", "Horizontal Axis", "Diagonal Axis", "Z-Axis"], correct_index: 0, explanation: "flex-direction: column main axis ko horizontal se vertical mein switch kar deta hai." },
          { id: "q-css-7-3", question: "`flex: 1` shorthand property kin teen properties ka combination hoti hai?", options: ["flex-grow: 1; flex-shrink: 1; flex-basis: 0%;", "flex-direction: row; flex-wrap: wrap; flex-flow: auto;", "width: 100%; height: 100%; margin: auto;", "padding: 1px; border: 1px; margin: 1px;"], correct_index: 0, explanation: "flex: 1 element ko available free space equally fill karne ke liye enable karta hai." },
          { id: "q-css-7-4", question: "`flex-wrap: wrap` ka kya role hota hai jab total items container width se bade ho jayein?", options: ["Items ko shrink karke todne ke bajaye next line par wrap kar deta hai", "Items ko delete kar deta hai", "Horizontal scrollbar laata hai", "Screen freeze karta hai"], correct_index: 0, explanation: "flex-wrap: wrap multi-line flex containers allow karta hai for responsive card grids." },
          { id: "q-css-7-5", question: "Flexbox container mein `gap: 20px` use karne ka margin par kya advantage hai?", options: ["Items ke beech uniform spacing aati hai bina first/last child par extra margin hacks lagaye", "Background change hota hai", "Download fast hota hai", "Border lagta hai"], correct_index: 0, explanation: "gap property only items ke internal beech mein space apply karti hai, outer edges clean rehti hain." }
        ]
      }
    },
    {
      id: "test5-mod-8",
      course_id: "course-test-5-html-css",
      module_number: 8,
      title: "Module 8: Master CSS Grid (2-Dimensional Layout Matrix)",
      description: "Grid Columns & Rows, fr Units, repeat(auto-fit, minmax()), grid-template-areas, Subgrid aur Alignment.",
      order_index: 8,
      lessons: [
        makeLesson("test5-l-8-1", "test5-mod-8", 1, "Lesson 8.1: Modern Responsive 2D Grid with auto-fit & minmax()", 1, 30,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }

    /* The Holy Grail Responsive Grid (Zero Media Queries Required!) */
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }

    .card {
      background: #1e293b;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #334155;
    }

    .card h4 { margin: 0 0 8px 0; color: #38bdf8; }
    .card p { font-size: 14px; color: #94a3b8; margin: 0; }
  </style>
</head>
<body>
  <h3>🔥 Zero-Media-Query CSS Grid Matrix</h3>
  <div class="grid-container">
    <div class="card"><h4>Python Masterclass</h4><p>10 Modules • In-Depth Backend</p></div>
    <div class="card"><h4>Core Java & OOP</h4><p>10 Modules • JVM Architecture</p></div>
    <div class="card"><h4>Modern C++</h4><p>12 Modules • Zero-Cost Abstractions</p></div>
    <div class="card"><h4>SQL Architecture</h4><p>10 Modules • ACID Transactions</p></div>
  </div>
</body>
</html>`, {
          task: "CSS Grid rule likhein jo 3 equal columns create kare fr units ka use karke.",
          hint: "grid-template-columns: repeat(3, 1fr);",
          expected_output: "repeat(3, 1fr)"
        },
        "<strong>CSS Grid = 2-Dimensional Rows + Columns Matrix Master!</strong> Flexbox 1D linear layouts ke liye perfect hai, jabki CSS Grid poore page ki 2D matrix structure aur complex dashboards ke liye standard hai.",
        [
          { tag: "auto-fit", color: "#e0f2fe;#0369a1", title: "🔄 auto-fit & minmax", desc: "Screen size ke hisaab se automatic columns adjust karta hai." },
          { tag: "fr unit", color: "#dcfce7;#15803d", title: "📊 Fractional Unit (fr)", desc: "Available free space ka proportional fraction allocate karta hai." }
        ],
        ""
        ),
        makeLesson("test5-l-8-2", "test5-mod-8", 2, "Lesson 8.2: Grid Template Areas & Named Dashboard Layouts", 2, 25,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; margin: 0; padding: 20px; }
    
    .dashboard {
      display: grid;
      grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
      grid-template-columns: 220px 1fr;
      gap: 12px;
      min-height: 80vh;
    }

    .area-header { grid-area: header; background: #1e293b; padding: 16px; border-radius: 8px; }
    .area-sidebar { grid-area: sidebar; background: #1e293b; padding: 16px; border-radius: 8px; }
    .area-main { grid-area: main; background: #334155; padding: 20px; border-radius: 8px; }
    .area-footer { grid-area: footer; background: #1e293b; padding: 12px; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="dashboard">
    <header class="area-header">🚀 Header Bar</header>
    <aside class="area-sidebar">📁 Navigation Sidebar</aside>
    <main class="area-main">📈 Main Analytics Canvas</main>
    <footer class="area-footer">📌 Footer Status</footer>
  </div>
</body>
</html>`, {
          task: "Grid-area 'main' assign karein main content container ko.",
          hint: "grid-area: main;",
          expected_output: "grid-area: main"
        },
        "<strong>Visual ASCII Blueprint Layouts!</strong> `grid-template-areas` se aap pure page ka architecture English words mein map kar sakte hain bina confusing numeric line indices ke.",
        [
          { tag: "Areas", color: "#e0f2fe;#0369a1", title: "🗺️ grid-template-areas", desc: "Intuitive semantic template maps." },
          { tag: "Dashboard", color: "#dcfce7;#15803d", title: "📊 Pro Dashboards", desc: "Multi-panel enterprise admin layouts in 5 lines of CSS." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-css-8-1", question: "`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` ka primary power kya hai?", options: ["Media queries ke bina fully responsive multi-column grid banana jo screen width ke hisaab se auto-wrap ho", "Sirf mobile par chalna", "Columns freeze karna", "Row delete karna"], correct_index: 0, explanation: "auto-fit + minmax modern responsive web development ka 'Holy Grail' grid pattern hai." },
          { id: "q-css-8-2", question: "Flexbox aur CSS Grid mein fundamental architectural difference kya hai?", options: ["Flexbox 1-Dimensional (Row YA Column) layout ke liye hai; CSS Grid 2-Dimensional (Rows AUR Columns dono simultaneously) ke liye hai", "Flexbox sirf text ke liye hai", "CSS Grid slow hota hai", "Dono identical hain"], correct_index: 0, explanation: "Flexbox content-first 1D flow handle karta hai, CSS Grid layout-first 2D matrix handle karta hai." },
          { id: "q-css-8-3", question: "CSS Grid mein `1fr` unit ka kya meaning hota hai?", options: ["Container mein available remaining free space ka 1 fraction share", "1 frame", "100 pixels", "1 font size"], correct_index: 0, explanation: "fr (Fraction) available remaining free space ka proportional hissa hota hai." },
          { id: "q-css-8-4", question: "`grid-column: span 2` ka kya effect hota hai grid item par?", options: ["Item horizontal direction mein 2 columns ki width occupy karega", "Item duplicate ho jayega", "Item delete ho jayega", "Item 2px move hoga"], correct_index: 0, explanation: "span 2 item ko adjacent 2 column tracks tak stretch karta hai." },
          { id: "q-css-8-5", question: "CSS Grid `grid-template-areas` property ka kya benefit hai?", options: ["Visual ASCII-like layout map (jaise 'header header' 'nav main') se intuitive page skeleton define karna", "Map show karna", "Color generate karna", "Errors fix karna"], correct_index: 0, explanation: "grid-template-areas named visual template strings se semantic layout blueprint provide karta hai." }
        ]
      }
    },
    {
      id: "test5-mod-9",
      course_id: "course-test-5-html-css",
      module_number: 9,
      title: "Module 9: Responsive Design, Mobile-First & Modern Media Queries",
      description: "Mobile-First Methodology, Breakpoints (sm, md, lg, xl), @media queries, Container Queries (@container) aur prefers-color-scheme (Dark Mode).",
      order_index: 9,
      lessons: [
        makeLesson("test5-l-9-1", "test5-mod-9", 1, "Lesson 9.1: Mobile-First Strategy, Breakpoints & Dark Mode", 1, 30,
`<!DOCTYPE html>
<html>
<head>
  <style>
    /* CSS Custom Properties (Theme Tokens) */
    :root {
      --bg-primary: #ffffff;
      --text-primary: #0f172a;
      --card-bg: #f1f5f9;
    }

    /* Native Dark Mode Detection */
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-primary: #0f172a;
        --text-primary: #f8fafc;
        --card-bg: #1e293b;
      }
    }

    body {
      background: var(--bg-primary);
      color: var(--text-primary);
      font-family: sans-serif;
      padding: 20px;
      margin: 0;
    }

    /* Mobile-First Layout (Default Single Column) */
    .container { display: flex; flex-direction: column; gap: 16px; }

    /* Desktop Breakpoint (min-width: 768px) */
    @media (min-width: 768px) {
      .container { flex-direction: row; }
    }

    .card { background: var(--card-bg); padding: 20px; border-radius: 12px; flex: 1; }
  </style>
</head>
<body>
  <h2>📱 Mobile-First + 🌓 Native Dark Mode</h2>
  <div class="container">
    <div class="card"><h3>Feature 01</h3><p>Mobile par stacked single column, tablet/desktop par side-by-side flex row!</p></div>
    <div class="card"><h3>Feature 02</h3><p>System dark mode preference ke hisaab se auto-theme switch.</p></div>
  </div>
</body>
</html>`, {
          task: "Ek media query likhein jo 1024px screen width se upar background color change kare.",
          hint: "@media (min-width: 1024px) { ... }",
          expected_output: "@media (min-width: 1024px)"
        },
        "<strong>Mobile-First Design = Build for Smallest Screens First, Expand Gracefully!</strong> Mobile-first architecture mein base CSS mobile ke liye hoti hai aur <code>@media (min-width: ...)</code> se progressively complex desktop enhancements add kiye jaate hain.",
        [
          { tag: "min-width", color: "#e0f2fe;#0369a1", title: "📱 Mobile-First", desc: "Clean cascading overrides jahan default CSS lightweight hoti hai." },
          { tag: "Dark Mode", color: "#ede9fe;#6d28d9", title: "🌓 prefers-color-scheme", desc: "OS theme settings ke sath instant hardware alignment." }
        ],
        ""
        ),
        makeLesson("test5-l-9-2", "test5-mod-9", 2, "Lesson 9.2: Modern Container Queries (@container)", 2, 25,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 20px; }
    
    .card-wrapper {
      container-type: inline-size; /* Enable container query boundary */
      max-width: 500px;
    }

    .responsive-card {
      background: #1e293b;
      padding: 20px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* Container query based on wrapper width NOT viewport width! */
    @container (min-width: 400px) {
      .responsive-card {
        flex-direction: row;
        align-items: center;
      }
    }
  </style>
</head>
<body>
  <div class="card-wrapper">
    <div class="responsive-card">
      <div style="font-size: 32px;">🚀</div>
      <div>
        <h4>Self-Responsive Component</h4>
        <p style="margin: 0; color: #94a3b8; font-size: 14px;">Container queries make components independently responsive anywhere.</p>
      </div>
    </div>
  </div>
</body>
</html>`, {
          task: "Container type 'inline-size' set karein.",
          hint: "container-type: inline-size;",
          expected_output: "container-type: inline-size"
        },
        "<strong>Container Queries = Modular Component Revolution!</strong> Ab component poore screen size ke bajaye apne parent wrapper ke size ke hisaab se layout adjust karta hai.",
        [
          { tag: "@container", color: "#e0f2fe;#0369a1", title: "📦 Container Queries", desc: "True component level self-responsiveness." },
          { tag: "Modular", color: "#dcfce7;#15803d", title: "🧩 Plug-and-Play", desc: "Drop component in sidebar or main area without breaking layout." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-css-9-1", question: "Mobile-First development approach mein kaunsi media query property standard use hoti hai?", options: ["`@media (min-width: ...)`", "`@media (max-width: ...)`", "`@media (orientation: landscape)`", "`@media (aspect-ratio: 1/1)`"], correct_index: 0, explanation: "Mobile-first base styles likhne ke baad `min-width` queries se progressively larger screens enhance karta hai." },
          { id: "q-css-9-2", question: "`@media (prefers-color-scheme: dark)` ka kya function hai?", options: ["User ke operating system (Windows/macOS/Android) ke Dark Mode setting ko detect karke styles apply karna", "Screen brightness 0 karna", "Images delete karna", "Battery save karna"], correct_index: 0, explanation: "prefers-color-scheme system level dark/light mode preference detect karta hai." },
          { id: "q-css-9-3", question: "Container Queries (`@container`) traditional Viewport Media Queries (`@media`) se behtar kyu hain modular components ke liye?", options: ["Component poore viewport width ke bajaye apne direct parent container ke size ke hisaab se responsive hota hai", "Fast compile hota hai", "C++ mein chalta hai", "Animations band karta hai"], correct_index: 0, explanation: "Container queries component ko kahi bhi (sidebar ya main feed) fit hone par self-responsive banati hain." },
          { id: "q-css-9-4", question: "CSS Custom Properties (Variables, jaise `--primary-color: #0284c7;`) ka main advantage kya hai?", options: ["Runtime dynamic theming, easy maintenance aur single-place value update across the entire app", "Internet speed double karna", "Memory 0 karna", "JavaScript replace karna"], correct_index: 0, explanation: "CSS variables cascade aur runtime manipulation support karti hain for comprehensive design systems." },
          { id: "q-css-9-5", question: "Touch devices par clickable elements (buttons/links) ka minimum recommended touch target size kya hona chahiye?", options: ["At least 44px x 44px (Accessibility standard)", "5px x 5px", "1000px", "1px"], correct_index: 0, explanation: "WCAG/Apple HIG standard ke mutabiq fat-finger touch errors rokne ke liye minimum 44px x 44px area hona chahiye." }
        ]
      }
    },
    {
      id: "test5-mod-10",
      course_id: "course-test-5-html-css",
      module_number: 10,
      title: "Module 10: Capstone Project — Production SaaS UI Showcase",
      description: "Transitions, Transforms, Keyframe Animations, Glassmorphism, CSS Tokens aur High-Conversion Responsive SaaS Interface.",
      order_index: 10,
      lessons: [
        makeLesson("test5-l-10-1", "test5-mod-10", 1, "Lesson 10.1: Building the Complete SaaS Showcase & Animations", 1, 40,
`<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: radial-gradient(circle at top, #1e1b4b, #0f172a 70%);
      color: #f8fafc;
      padding: 30px 20px;
      min-height: 100vh;
    }

    .hero {
      text-align: center;
      max-width: 700px;
      margin: 0 auto 40px auto;
    }

    .badge {
      display: inline-block;
      background: rgba(99, 102, 241, 0.2);
      border: 1px solid #6366f1;
      color: #a5b4fc;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }

    h1 {
      font-size: clamp(2rem, 5vw, 3.5rem);
      margin: 0 0 16px 0;
      line-height: 1.15;
      background: linear-gradient(135deg, #ffffff, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Glassmorphism Pricing Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      max-width: 900px;
      margin: 0 auto;
    }

    .card {
      background: rgba(30, 41, 59, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 32px 24px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
    }

    .card:hover {
      transform: translateY(-6px);
      border-color: #38bdf8;
    }

    .card.featured {
      border-color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
    }

    .price { font-size: 2.5rem; font-weight: 800; color: #38bdf8; margin: 16px 0; }
    .price span { font-size: 1rem; color: #94a3b8; font-weight: 400; }

    .btn {
      display: block;
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: none;
      font-weight: 700;
      background: #0284c7;
      color: white;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="hero">
    <span class="badge">PRODUCTION SAAS ARCHITECTURE</span>
    <h1>Master Modern Web Layouts & Micro-Interactions</h1>
  </div>

  <div class="grid">
    <div class="card">
      <h3>Starter Engine</h3>
      <div class="price">₹0 <span>/ forever</span></div>
      <button class="btn">Get Started</button>
    </div>

    <div class="card featured">
      <h3>Pro Masterclass</h3>
      <div class="price">₹0 <span>/ Free during Beta</span></div>
      <button class="btn" style="background:#6366f1;">Unlock Full Access 🚀</button>
    </div>
  </div>
</body>
</html>`, {
          task: "Featured card par subtle box-shadow add karein for premium glowing elevation.",
          hint: "box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);",
          expected_output: "box-shadow"
        },
        "<strong>Capstone Architecture Overview!</strong> Is comprehensive project mein aapne <strong>Semantic HTML5</strong>, <strong>CSS Glassmorphism (backdrop-filter)</strong>, <strong>Fluid Typography</strong>, <strong>Auto-Fit CSS Grid</strong>, aur <strong>GPU Hardware-Accelerated Micro-Interactions</strong> ko combine karke production-grade SaaS showcase create kiya hai!",
        [
          { tag: "Architecture", color: "#e0f2fe;#0369a1", title: "🏆 Production SaaS Showcase", desc: "Complete responsive layout system with high visual polish." }
        ],
        ""
        ),
        makeLesson("test5-l-10-2", "test5-mod-10", 2, "Lesson 10.2: GPU Accelerated CSS Keyframes & Micro-Interactions", 2, 30,
`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: white; padding: 40px 20px; display: flex; justify-content: center; }
    
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
      70% { box-shadow: 0 0 0 15px rgba(56, 189, 248, 0); }
      100% { box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
    }

    .pulse-btn {
      background: #0284c7;
      color: white;
      border: none;
      padding: 14px 28px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 12px;
      cursor: pointer;
      animation: pulseGlow 2s infinite cubic-bezier(0.66, 0, 0, 1);
      will-change: transform, box-shadow;
    }
  </style>
</head>
<body>
  <button class="pulse-btn">⚡ 60FPS Hardware GPU Animated CTA</button>
</body>
</html>`, {
          task: "Button par @keyframes animation apply karein.",
          hint: "animation: pulseGlow 2s infinite;",
          expected_output: "animation: pulseGlow"
        },
        "<strong>60 FPS Buttery Smooth Web Animations!</strong> Sirf `transform` aur `opacity` animate karein taaki browser GPU compositor thread direct render kare aur layout reflow zero rahe.",
        [
          { tag: "GPU", color: "#e0f2fe;#0369a1", title: "⚡ GPU Acceleration", desc: "Bypasses CPU paint and reflow pipeline." },
          { tag: "will-change", color: "#dcfce7;#15803d", title: "🚀 will-change", desc: "Pre-allocates graphics compositor layers for silky 60fps." }
        ],
        ""
        )
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          { id: "q-css-10-1", question: "CSS animations mein `transform` aur `opacity` animate karna `width` ya `height` animate karne se kyu dramatically fast hota hai?", options: ["Kyunki GPU (Compositor thread) direct render karta hai bina expensive Layout Reflow aur Repaint trigger kiye (60fps guaranteed)", "Kyunki code chhota hota hai", "Kyunki font clean rehta hai", "Kyunki RAM free hoti hai"], correct_index: 0, explanation: "transform aur opacity composite layer par calculate hoti hain jo layout reflow bypass karke buttery 60fps animations deti hain." },
          { id: "q-css-10-2", question: "`backdrop-filter: blur(12px)` property kya effect create karti hai?", options: ["Glassmorphism effect (Element ke peeche ke background ko frosted blur karna)", "Text delete karna", "Image crop karna", "Screen freeze karna"], correct_index: 0, explanation: "backdrop-filter frosted glass UI design pattern ke liye behind content ko blur karta hai." },
          { id: "q-css-10-3", question: "`will-change: transform` property browser ko kya hint deti hai?", options: ["GPU memory layer promote karke heavy animations ke liye browser ko pre-optimize karna", "Page refresh karna", "Download stop karna", "Error hide karna"], correct_index: 0, explanation: "will-change browser rendering engine ko animation optimization ke liye pre-allocation ka hint deta hai." },
          { id: "q-css-10-4", question: "`@keyframes` rule CSS mein kis purpose ke liye define kiya jata hai?", options: ["Multi-step smooth timeline animations create karne ke liye", "Form submit karne ke liye", "Database connect karne ke liye", "Font download karne ke liye"], correct_index: 0, explanation: "@keyframes percentage steps (0%, 50%, 100%) par custom animation timeline define karta hai." },
          { id: "q-css-10-5", question: "Modern Web Performance mein 'Lighthouse Performance Score' maximize karne ke liye primary CSS rule kya hai?", options: ["Unused CSS remove karna, critical CSS inline karna aur heavy reflow animations avoid karna", "Website par CSS na likhna", "Har cheez image banana", "Server disconnect karna"], correct_index: 0, explanation: "CSS payload minimize karna aur layout thrashing avoid karna core web vitals ka golden rule hai." }
        ]
      }
    }
  ],
  final_exam: {
    passing_score: 60,
    time_limit_minutes: 30,
    questions: [
      { id: "fe-html-1", question: "Semantic HTML5 vs Non-Semantic HTML mein primary architectural value kya hai?", options: ["SEO Crawlers, Screen Readers aur Browsers ko page ka actual structural meaning samajh aata hai", "Colors zyada acche aate hain", "Website offline chalti hai", "Dono identical hain"], correct_index: 0, explanation: "Semantic elements accessibility aur search engine optimization ke foundation hain." },
      { id: "fe-html-2", question: "The Golden CSS Box Model Reset `*, *::before, *::after { box-sizing: border-box; }` kyu industry standard hai?", options: ["Kyunki ye padding aur borders ko element ki predefined width ke andar count karta hai, unexpected layout blowups roktahai", "Kyunki ye mandatory rule hai", "Kyunki ye fonts change karta hai", "Kyunki ye browser close karta hai"], correct_index: 0, explanation: "border-box predictable sizing provide karta hai bina dimensions explode huye." },
      { id: "fe-html-3", question: "Flexbox aur CSS Grid kab choose karna chahiye?", options: ["1D Flow (Navigation bars, toolbars, vertical item lists) ke liye Flexbox; 2D Matrix (Dashboard layouts, multi-column card grids) ke liye CSS Grid", "Dono interchangeably kuch bhi use karo", "Sirf Flexbox use karo", "Sirf Grid use karo"], correct_index: 0, explanation: "Flexbox 1D content alignment handle karta hai, CSS Grid 2D matrix layouts organize karta hai." },
      { id: "fe-html-4", question: "`clamp()` fluid typography CSS mein media queries ke upar kya advantage deti hai?", options: ["Screen width change hone par continuously smooth mathematical scaling (Bina stepped jarring media query jumps ke)", "Download speed badhati hai", "Text bold karti hai", "Color badalti hai"], correct_index: 0, explanation: "clamp() continuous fluid scaling allow karta hai bina discrete breakpoint steps ke." },
      { id: "fe-html-5", question: "Web Accessibility (a11y) ka golden rule forms ke liye kya hai?", options: ["Har form input ke paas explicitly linked `<label for=\"id\">` ya accessible `aria-label` hona mandatory hai", "Placeholders hi kaafi hain", "Labels hide kar do", "Forms avoid karo"], correct_index: 0, explanation: "Accessible labels screen reader users aur motor impaired users ke liye essential requirement hain." }
    ]
  }
};

const outputPath = path.join(process.cwd(), 'Courses', 'test-5.json');
fs.writeFileSync(outputPath, JSON.stringify(htmlCssFullCourse, null, 2), 'utf-8');
console.log(`✅ Full 10-Module HTML & CSS Course (2 Units per module) generated at ${outputPath}`);
