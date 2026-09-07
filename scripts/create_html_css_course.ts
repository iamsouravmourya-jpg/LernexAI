import fs from 'fs';
import path from 'path';

export const htmlCssCourse = {
  id: "course-test-5-html-css",
  title: "Modern Responsive Web Design: HTML5 & CSS3 Masterclass (Hinglish)",
  subtitle: "Semantic HTML5, CSS3 Modern Layouts (Flexbox & Grid), Responsive UI, Animations & Dark Mode",
  description: "Web development ki foundation master karein bilkul natural Hinglish mein! Semantic HTML5 tags, CSS Box Model, Modern Flexbox, CSS Grid 2D layouts, Responsive Media Queries (Mobile-First), Keyframe Animations, Glassmorphism, CSS Custom Properties (Variables) aur Capstone Production Landing Page live in-browser banayein.",
  category: "Design & Development",
  difficulty: "Beginner",
  thumbnail_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 6,
  estimated_hours: 38,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    {
      id: "test5-mod-1",
      course_id: "course-test-5-html-css",
      module_number: 1,
      title: "Module 1: HTML5 Foundations & Semantic Web Structure",
      description: "Document Object Model (DOM), Semantic tags (<header>, <nav>, <main>, <article>, <section>, <footer>), Head metadata aur Accessibility (a11y).",
      order_index: 1,
      lessons: [
        {
          id: "test5-l-1-1",
          module_id: "test5-mod-1",
          lesson_number: 1,
          title: "Lesson 1.1: HTML5 Document Anatomy & Semantic Tags",
          order_index: 1,
          duration_minutes: 20,
          content_type: "text",
          starter_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mera Pehla Modern Webpage</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; background: #0f172a; color: #f8fafc; }
    header { background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 20px; }
    h1 { color: #38bdf8; margin: 0 0 8px 0; }
    p { color: #94a3b8; line-height: 1.6; }
    .tag { display: inline-block; background: #0284c7; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold; }
  </style>
</head>
<body>
  <header>
    <span class="tag">HTML5 Live Preview</span>
    <h1>Namaste Web Developers! 🌐</h1>
    <p>HTML web ka skeleton (kankal) hai aur CSS uski styling aur design hai.</p>
  </header>
</body>
</html>`,
          sandbox_language: "html",
          challenge: {
            task: "Header ke andar ek <p> tag add karein jisme 'Built with Semantic HTML5' likha ho.",
            hint: "<p>Built with Semantic HTML5</p> header ke andar likhein.",
            expected_output: "Namaste Web Developers!"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏗️</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>HTML = Web ka Skeleton (Dhanche)</strong> aur <strong>CSS = Interior Design & Clothing!</strong> Jab browser kisi website ko load karta hai, toh HTML tags ko parse karke DOM (Document Object Model) tree banata hai.</p>
  </div>
</div>

<div class="pipeline-flow">
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#e0f2fe; color:#0369a1;">&lt;header&gt; & &lt;nav&gt;</span>
    <div class="pipeline-title">🔝 Top Navigation</div>
    <p class="pipeline-desc">Website ka logo, main navigation menu aur search bar yahan aate hain.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#fef3c7; color:#b45309;">&lt;main&gt; & &lt;section&gt;</span>
    <div class="pipeline-title">📄 Core Content</div>
    <p class="pipeline-desc">Page ka primary unique content. Har topic ke liye separate <code>&lt;section&gt;</code> ya <code>&lt;article&gt;</code> use hota hai.</p>
  </div>
  <div class="pipeline-card">
    <span class="pipeline-tag" style="background:#dcfce7; color:#15803d;">&lt;footer&gt;</span>
    <div class="pipeline-title">🦶 Bottom Footer</div>
    <p class="pipeline-desc">Copyright, privacy policies, contact links aur social media handles ke liye.</p>
  </div>
</div>`
        },
        {
          id: "test5-l-1-2",
          module_id: "test5-mod-1",
          lesson_number: 2,
          title: "Lesson 1.2: Modern Forms, Inputs & Accessibility (a11y)",
          order_index: 2,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>User Registration</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #f1f5f9; padding: 30px; }
    .card { max-width: 400px; margin: 0 auto; background: white; padding: 24px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
    h2 { margin-top: 0; color: #0f172a; }
    label { display: block; font-weight: 600; font-size: 14px; margin-bottom: 6px; color: #334155; }
    input { width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 16px; font-size: 15px; }
    input:focus { outline: 2px solid #0284c7; border-color: transparent; }
    button { width: 100%; background: #0284c7; color: white; border: none; padding: 12px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
    button:hover { background: #0369a1; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Student Sign Up 🎓</h2>
    <form action="#">
      <label for="fullname">Aapka Poora Naam:</label>
      <input type="text" id="fullname" placeholder="e.g. Rahul Sharma" required>

      <label for="email">Email Address:</label>
      <input type="email" id="email" placeholder="rahul@example.com" required>

      <button type="submit">Create Account 🚀</button>
    </form>
  </div>
</body>
</html>`,
          sandbox_language: "html",
          challenge: {
            task: "Form mein ek naya Password field add karein jiska type='password' aur placeholder='Min 8 characters' ho.",
            hint: "<label for='pass'>Password:</label><input type='password' id='pass' placeholder='Min 8 characters' required>",
            expected_output: "Student Sign Up"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📝</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Forms user se data collect karne ka gateway hain!</strong> HTML5 mein built-in client-side validation (<code>type="email"</code>, <code>required</code>, <code>pattern</code>) milta hai jisse invalid data server par jane se pehle hi browser level par rok liya jata hai.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-html-1-1",
            question: "HTML5 mein `<div>` ki jagah `<header>`, `<main>`, `<article>`, `<footer>` jaise semantic tags use karne ka primary benefit kya hai?",
            options: [
              "Ye website ko automatically color kar deta hai",
              "SEO (Search Engine Optimization), Screen Readers (Accessibility) aur Clean Code Structure behtar hota hai",
              "Ye page ko reload hone se rokta hai",
              "Ye CSS ko automatically delete karta hai"
            ],
            correct_index: 1,
            explanation: "Semantic HTML search engines (Google bot) aur screen readers ko page ka actual meaning aur hierarchy samajhne mein help karta hai."
          },
          {
            id: "q-html-1-2",
            question: "`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` tag ka kya role hai?",
            options: [
              "Page ka title set karna",
              "Mobile aur Tablet devices par webpage ko responsive aur proper scale par render karna",
              "Background image load karna",
              "Cookies manage karna"
            ],
            correct_index: 1,
            explanation: "Viewport meta tag browser ko device ki physical screen width ke according website scale karne ka instruction deta hai."
          },
          {
            id: "q-html-1-3",
            question: "`<label>` tag mein `for=\"user_email\"` attribute ka kya purpose hota hai?",
            options: [
              "Ye CSS animation trigger karta hai",
              "Ye label ko matching `id=\"user_email\"` wale input field se bind karta hai taaki label par click karne par input focus ho sake",
              "Ye loop chalata hai",
              "Ye database save karta hai"
            ],
            correct_index: 1,
            explanation: "Label ka 'for' attribute input ke 'id' se connect hota hai, jo accessibility aur UX dono ko improve karta hai."
          },
          {
            id: "q-html-1-4",
            question: "`<img>` tag mein `alt` attribute specify karna kyu compulsory best-practice hai?",
            options: [
              "Image ko full-screen karne ke liye",
              "Agar image load na ho ya visually impaired users screen reader use kar rahe hon toh alternate descriptive text provide karne ke liye",
              "Image ko video mein convert karne ke liye",
              "Image download prevent karne ke liye"
            ],
            correct_index: 1,
            explanation: "alt (alternative text) accessibility aur broken image fallback ke liye web standards ke anusaar mandatory hai."
          },
          {
            id: "q-html-1-5",
            question: "`<button type=\"button\">` aur `<button type=\"submit\">` mein kya difference hai?",
            options: [
              "Dono exact same hain",
              "type=\"submit\" form ko submit karta hai jabki type=\"button\" default submission trigger nahi karta (custom JS actions ke liye use hota hai)",
              "type=\"button\" form ko reset karta hai",
              "type=\"submit\" error throw karta hai"
            ],
            correct_index: 1,
            explanation: "Form ke andar default button type 'submit' hota hai jo form data post karta hai; type='button' custom scripting ke liye use hota hai."
          }
        ]
      }
    },
    {
      id: "test5-mod-2",
      course_id: "course-test-5-html-css",
      module_number: 2,
      title: "Module 2: CSS3 Box Model, Specificity & Typography",
      description: "Content, Padding, Border, Margin, box-sizing: border-box, CSS Specificity hierarchy, aur Modern Typography.",
      order_index: 2,
      lessons: [
        {
          id: "test5-l-2-1",
          module_id: "test5-mod-2",
          lesson_number: 1,
          title: "Lesson 2.1: CSS Box Model & box-sizing: border-box",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    * {
      box-sizing: border-box; /* The Golden Rule of Modern CSS! */
      margin: 0;
      padding: 0;
    }
    body {
      font-family: sans-serif;
      background: #0f172a;
      padding: 40px;
      display: flex;
      gap: 24px;
      justify-content: center;
    }
    .box {
      width: 240px;
      background: #1e293b;
      color: #f8fafc;
      padding: 24px; /* Space inside the border */
      border: 4px solid #38bdf8; /* The boundary */
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }
    h3 { color: #38bdf8; margin-bottom: 8px; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="box">
    <h3>Card 01</h3>
    <p>Content + Padding + Border sab ek specific math follow karte hain!</p>
  </div>
  <div class="box">
    <h3>Card 02</h3>
    <p>box-sizing: border-box width ko inflate nahi hone deta.</p>
  </div>
</body>
</html>`,
          sandbox_language: "html",
          challenge: {
            task: "Dono boxes ka background #1e293b se badal kar #334155 karein aur border-color #f59e0b (amber) karein.",
            hint: ".box ke andar background: #334155; border: 4px solid #f59e0b; set karein.",
            expected_output: "Card 01"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">📦</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Web par har ek HTML element ek 4-layer box hota hai!</strong><br/>
    1. <strong>Content</strong>: Text ya image.<br/>
    2. <strong>Padding</strong>: Content aur border ke beech ka internal space.<br/>
    3. <strong>Border</strong>: Box ki boundary line.<br/>
    4. <strong>Margin</strong>: Box aur doosre elements ke beech ka external space.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-css-2-1",
            question: "CSS mein `* { box-sizing: border-box; }` lagane se kya change hota hai?",
            options: [
              "Border gayab ho jata hai",
              "Element ki total width/height mein padding aur border include ho jate hain, jisse layout break nahi hota",
              "Sabhi elements circle ban jate hain",
              "Text font size badh jata hai"
            ],
            correct_index: 1,
            explanation: "border-box ke saath `width: 200px` aur `padding: 20px` hone par total width 200px hi rehti hai, content automatically adjust hota hai."
          },
          {
            id: "q-css-2-2",
            question: "Padding aur Margin mein primary technical farak kya hai?",
            options: [
              "Padding external space hota hai, Margin internal",
              "Padding element ke border ke andar ka space hota hai, jabki Margin border ke bahar doosre elements se doori banata hai",
              "Dono exact same hote hain",
              "Margin sirf text ke liye kaam karta hai"
            ],
            correct_index: 1,
            explanation: "Padding = Inner breathing space (inside border); Margin = Outer separation space (outside border)."
          },
          {
            id: "q-css-2-3",
            question: "CSS Specificity ke hisab se sabse highest priority kiski hoti hai?",
            options: [
              "Element Type Selector (e.g. p, div)",
              "Class Selector (e.g. .card)",
              "ID Selector (e.g. #header)",
              "Inline Style (e.g. style=\"color: red;\")"
            ],
            correct_index: 3,
            explanation: "Inline styles (1,0,0,0) ID selector (0,1,0,0) aur Class selector (0,0,1,0) se zyada specific hote hain (except !important)."
          },
          {
            id: "q-css-2-4",
            question: "Typography mein `rem` unit kisse relative hoti hai?",
            options: [
              "Parent element ke font-size se",
              "Root `<html>` element ke font-size se (usually 16px default)",
              "Screen ki width se",
              "Device ke battery percentage se"
            ],
            correct_index: 1,
            explanation: "rem = Root EM (root `<html>` ke font size se directly multiply hota hai, e.g. 1.5rem = 1.5 * 16px = 24px)."
          },
          {
            id: "q-css-2-5",
            question: "`display: inline` elements (jaise `<span>`) ke baare mein kya sach hai?",
            options: [
              "Inpar top aur bottom margin/padding proper layout push nahi karte aur width/height apply nahi hoti",
              "Ye hamesha new line se start hote hain",
              "Inme automatic flexbox hota hai",
              "Ye background color support nahi karte"
            ],
            correct_index: 0,
            explanation: "Inline elements text flow ke andar rehte hain isliye unpar explicit width, height aur vertical margins respect nahi hote."
          }
        ]
      }
    },
    {
      id: "test5-mod-3",
      course_id: "course-test-5-html-css",
      module_number: 3,
      title: "Module 3: Master CSS Flexbox (1-Dimensional Layouts)",
      description: "Flex Container, flex-direction, justify-content (main axis), align-items (cross axis), gap, flex-wrap aur auto-margins.",
      order_index: 3,
      lessons: [
        {
          id: "test5-l-3-1",
          module_id: "test5-mod-3",
          lesson_number: 1,
          title: "Lesson 3.1: Flexbox Navigation & Alignment",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #0f172a; color: white; padding: 20px; }
    
    /* Modern Flexbox Navigation Bar */
    .navbar {
      display: flex;
      justify-content: space-between; /* Space out Logo and Nav Links */
      align-items: center; /* Vertical Center Alignment */
      background: #1e293b;
      padding: 14px 28px;
      border-radius: 12px;
      border: 1px solid #334155;
    }
    
    .logo { font-size: 20px; font-weight: 800; color: #38bdf8; display: flex; align-items: center; gap: 8px; }
    
    .nav-links {
      display: flex;
      list-style: none;
      gap: 20px; /* Modern spacing between links */
      margin: 0;
      padding: 0;
    }
    
    .nav-links a {
      color: #94a3b8;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: #38bdf8; }
    
    .cta-btn {
      background: #0284c7;
      color: white;
      border: none;
      padding: 8px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">⚡ DevCraft</div>
    <ul class="nav-links">
      <li><a href="#">Courses</a></li>
      <li><a href="#">Sandboxes</a></li>
      <li><a href="#">Community</a></li>
    </ul>
    <button class="cta-btn">Sign In</button>
  </nav>
</body>
</html>`,
          sandbox_language: "html",
          challenge: {
            task: "Nav links mein ek naya item '<li><a href=\"#\">Pricing</a></li>' add karein.",
            hint: "ul.nav-links ke andar ek aur li item add karein.",
            expected_output: "DevCraft"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🧭</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Flexbox 1-Dimensional Alignment ka hero hai (Row ya Column)!</strong><br/>
    • <strong>Main Axis</strong>: <code>justify-content</code> (start, center, end, space-between, space-around).<br/>
    • <strong>Cross Axis</strong>: <code>align-items</code> (stretch, center, flex-start, flex-end).</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-flex-3-1",
            question: "`display: flex` container mein `justify-content` kis axis par items align karta hai?",
            options: [
              "Hamesha vertical axis par",
              "Main Axis par (default horizontal row mein left-to-right)",
              "Sirf diagonal axis par",
              "Z-index axis par"
            ],
            correct_index: 1,
            explanation: "justify-content hamesha Main Axis par items ko distribute karta hai (row mode mein horizontal, column mode mein vertical)."
          },
          {
            id: "q-flex-3-2",
            question: "Flex items ke beech consistent space dene ke liye sabse modern aur clean CSS property kaunsi hai?",
            options: ["margin-right on each child", "gap (e.g. gap: 16px)", "padding-left on parent", "table-spacing"],
            correct_index: 1,
            explanation: "Modern CSS `gap` property automatically items ke beech space create karti hai bina first/last child margins adjust kiye."
          },
          {
            id: "q-flex-3-3",
            question: "Agar screen chhoti hone par flex items ko next line mein wrap karwana ho, toh kya use karenge?",
            options: ["flex-wrap: wrap", "overflow: wrap", "display: inline", "white-space: normal"],
            correct_index: 0,
            explanation: "flex-wrap: wrap allow karta hai ki items single line mein shrink hone ke bajaye next row mein break ho sakein."
          },
          {
            id: "q-flex-3-4",
            question: "Flexbox se kisi child element ko perfectly vertical + horizontal center karne ka fastest tareeka kya hai?",
            options: [
              "display: flex; justify-content: center; align-items: center;",
              "margin: auto on everything",
              "position: fixed only",
              "float: center"
            ],
            correct_index: 0,
            explanation: "Parent par `display: flex; justify-content: center; align-items: center;` lagana perfect 2D centering ka standard formula hai."
          },
          {
            id: "q-flex-3-5",
            question: "`flex: 1` ka kya matlab hota hai?",
            options: [
              "flex-grow: 1, flex-shrink: 1, flex-basis: 0% (Item bachi hui saari available space barabar share karega)",
              "Item 1 pixel ka ban jayega",
              "Item invisible ho jayega",
              "Item sirf 1 word display karega"
            ],
            correct_index: 0,
            explanation: "flex: 1 shorthand hota hai jo element ko dynamic available space equally fill karne ki capability deta hai."
          }
        ]
      }
    },
    {
      id: "test5-mod-4",
      course_id: "course-test-5-html-css",
      module_number: 4,
      title: "Module 4: Master CSS Grid (2-Dimensional Layouts)",
      description: "CSS Grid Container, grid-template-columns, fr units, repeat(), minmax(), grid-gap aur Bento Grid UI design.",
      order_index: 4,
      lessons: [
        {
          id: "test5-l-4-1",
          module_id: "test5-mod-4",
          lesson_number: 1,
          title: "Lesson 4.1: Responsive Bento Grid Layouts with auto-fit",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0f19; color: white; padding: 30px; }
    h2 { text-align: center; color: #38bdf8; margin-bottom: 24px; }
    
    /* Modern 2D CSS Grid with auto-fit & minmax */
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    .grid-card {
      background: #1e293b;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #334155;
      transition: transform 0.2s, border-color 0.2s;
    }
    
    .grid-card:hover {
      transform: translateY(-4px);
      border-color: #38bdf8;
    }
    
    .card-icon { font-size: 32px; margin-bottom: 12px; }
    .card-title { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
    .card-desc { font-size: 14px; color: #94a3b8; line-height: 1.5; }
  </style>
</head>
<body>
  <h2>Explore Tech Stack 🚀</h2>
  <div class="grid-container">
    <div class="grid-card">
      <div class="card-icon">⚡</div>
      <div class="card-title">Fast Performance</div>
      <div class="card-desc">Zero runtime latency with optimized CSS architecture.</div>
    </div>
    <div class="grid-card">
      <div class="card-icon">📱</div>
      <div class="card-title">Mobile Responsive</div>
      <div class="card-desc">Adapts seamlessly from smartphones to 4K monitors.</div>
    </div>
    <div class="grid-card">
      <div class="card-icon">🎨</div>
      <div class="card-title">Modern Theme</div>
      <div class="card-desc">Clean dark mode with high contrast typography.</div>
    </div>
  </div>
</body>
</html>`,
          sandbox_language: "html",
          challenge: {
            task: "Grid ke andar ek chautha card add karein jisme '🛡️ Security' title ho.",
            hint: "<div class=\"grid-card\"><div class=\"card-icon\">🛡️</div><div class=\"card-title\">Security</div><div class=\"card-desc\">Enterprise level protection.</div></div>",
            expected_output: "Explore Tech Stack"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">▦</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>CSS Grid = Complete 2-Dimensional Rows & Columns Matrix!</strong> Flexbox ek time par sirf Row ya sirf Column align karta hai, jabki CSS Grid dono dimensions ko ek sath control karta hai.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-grid-4-1",
            question: "CSS Grid mein `1fr` unit ka kya matlab hota hai?",
            options: [
              "1 frame",
              "1 Fraction of available space (Available free space ka 1 hissa)",
              "1 Footprint unit",
              "1 Front-end rem"
            ],
            correct_index: 1,
            explanation: "fr (fractional unit) grid container ke andar bachi hui free space ko mathematically divide karta hai."
          },
          {
            id: "q-grid-4-2",
            question: "`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));` ka primary benefit kya hai?",
            options: [
              "Bina media queries likhe fully responsive card grid banana jo screen size ke according columns auto-adjust karta hai",
              "Card ka color change karna",
              "Database connect karna",
              "Images compress karna"
            ],
            correct_index: 0,
            explanation: "auto-fit + minmax modern responsive web design ka magic formula hai jo fluid responsive grids generate karta hai."
          },
          {
            id: "q-grid-4-3",
            question: "Flexbox vs CSS Grid mein kab kaunsa use karna chahiye?",
            options: [
              "Flexbox 1-Dimensional components (e.g. Navbars, Button groups) ke liye aur CSS Grid 2-Dimensional full-page / dashboard matrices ke liye",
              "Flexbox outdated ho chuka hai",
              "Grid sirf mobile par kaam karta hai",
              "Dono ek sath kabhi use nahi ho sakte"
            ],
            correct_index: 0,
            explanation: "Industry standard: 1D alignment = Flexbox; 2D structure layout = CSS Grid."
          },
          {
            id: "q-grid-4-4",
            question: "Kisi grid item ko 2 columns span karwane ke liye kaunsi CSS property use hoti hai?",
            options: ["grid-column: span 2;", "column-width: double;", "grid-merge: 2;", "table-colspan: 2;"],
            correct_index: 0,
            explanation: "grid-column: span 2 item ko horizontal 2 tracks stretch karne ka instruction deta hai."
          },
          {
            id: "q-grid-4-5",
            question: "`gap: 20px 40px;` CSS Grid mein kya define karta hai?",
            options: [
              "20px Row Gap aur 40px Column Gap",
              "20px Padding aur 40px Margin",
              "20px Border aur 40px Radius",
              "Sirf font size"
            ],
            correct_index: 0,
            explanation: "gap shorthand mein pehla value row-gap aur doosra value column-gap hota hai."
          }
        ]
      }
    },
    {
      id: "test5-mod-5",
      course_id: "course-test-5-html-css",
      module_number: 5,
      title: "Module 5: Transitions, Transforms & Keyframe Animations",
      description: "CSS Transitions (ease-in-out), 2D/3D Transforms (scale, rotate, translate), @keyframes Animations aur Performance (GPU Accel).",
      order_index: 5,
      lessons: [
        {
          id: "test5-l-5-1",
          module_id: "test5-mod-5",
          lesson_number: 1,
          title: "Lesson 5.1: Interactive Micro-Animations & Glow Effects",
          order_index: 1,
          duration_minutes: 25,
          content_type: "text",
          starter_code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: system-ui, sans-serif;
      background: #090d16;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80vh;
      margin: 0;
    }
    
    /* Glowing Animated Button */
    .glow-btn {
      background: linear-gradient(135deg, #0284c7, #38bdf8);
      color: white;
      font-size: 18px;
      font-weight: 700;
      padding: 16px 36px;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }
    
    .glow-btn:hover {
      transform: scale(1.08) translateY(-2px);
      box-shadow: 0 0 35px rgba(56, 189, 248, 0.8);
    }
    
    .glow-btn:active {
      transform: scale(0.98);
    }
  </style>
</head>
<body>
  <button class="glow-btn">✨ Get Started Now</button>
</body>
</html>`,
          sandbox_language: "html",
          challenge: {
            task: "Button ka text change karke '🚀 Launch App' karein.",
            hint: "<button class=\"glow-btn\">🚀 Launch App</button>",
            expected_output: "Launch App"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">✨</div>
  <div>
    <div class="mental-title">30-Second Mental Model</div>
    <p class="mental-text"><strong>Micro-interactions UI ko alive banate hain!</strong> <code>transform</code> aur <code>opacity</code> GPU-accelerated hote hain jo 60fps/120fps par bina kisi lag ke smoothly animate hote hain.</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-anim-5-1",
            question: "Smooth 60FPS animation ke liye CSS mein kaunsi properties animate karna best practice hai?",
            options: [
              "width aur height",
              "transform (translate, scale, rotate) aur opacity (GPU-Accelerated)",
              "margin-top aur top",
              "border-width"
            ],
            correct_index: 1,
            explanation: "transform aur opacity browser ke Compositor thread par GPU se render hote hain, bina expensive Layout Reflow ya Repaint trigger kiye."
          },
          {
            id: "q-anim-5-2",
            question: "CSS `@keyframes` rule ka kya kaam hota hai?",
            options: [
              "Multi-step animation timeline define karna (0% se 100% tak frames)",
              "Keyboard shortcut bind karna",
              "Database password store karna",
              "Font download karna"
            ],
            correct_index: 0,
            explanation: "@keyframes timeline allow karta hai jahan different percentage markers par CSS property changes set kiye jaate hain."
          },
          {
            id: "q-anim-5-3",
            question: "`transition: all 0.3s ease;` mein `0.3s` kya represent karta hai?",
            options: ["Animation Delay", "Animation Duration (Time period)", "Iteration count", "Frame rate"],
            correct_index: 1,
            explanation: "0.3s animation duration hai yaani state change hone mein 300 milliseconds lagenge."
          },
          {
            id: "q-anim-5-4",
            question: "Animation ko continuously infinite loop mein chalane ke liye kya property use hoti hai?",
            options: ["animation-iteration-count: infinite;", "animation-repeat: true;", "loop: always;", "cycle: continuous;"],
            correct_index: 0,
            explanation: "animation-iteration-count: infinite se animation bina ruke endlessly repeat hoti rehti hai."
          },
          {
            id: "q-anim-5-5",
            question: "CSS `transform: translateY(-5px);` element ko kahan move karta hai?",
            options: ["5px Right", "5px Left", "5px Upwards (Oopar)", "5px Downwards"],
            correct_index: 2,
            explanation: "Screen coordinate system mein negative Y-axis upward direction hoti hai, isliye -5px element ko oopar lift karta hai."
          }
        ]
      }
    },
    {
      id: "test5-mod-6",
      course_id: "course-test-5-html-css",
      module_number: 6,
      title: "Module 6: Capstone Project — Production-Grade SaaS Landing Page & Pricing Matrix",
      description: "Full modern SaaS landing page, Responsive Navbar, Hero CTA, Glassmorphism Cards, Pricing Tiers aur Dark Mode.",
      order_index: 6,
      lessons: [
        {
          id: "test5-l-6-1",
          module_id: "test5-mod-6",
          lesson_number: 1,
          title: "Lesson 6.1: Building the SaaS Product Showcase Page",
          order_index: 1,
          duration_minutes: 35,
          content_type: "text",
          starter_code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Apex SaaS — Modern Cloud Platform</title>
  <style>
    :root {
      --bg-dark: #090d16;
      --card-bg: #131b2e;
      --accent: #38bdf8;
      --accent-grad: linear-gradient(135deg, #0284c7, #38bdf8);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background: var(--bg-dark); color: var(--text-main); line-height: 1.6; padding-bottom: 60px; }
    
    /* Navigation */
    .nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; max-width: 1200px; margin: 0 auto; }
    .logo { font-size: 22px; font-weight: 800; color: var(--accent); }
    .btn-primary { background: var(--accent-grad); color: white; border: none; padding: 10px 22px; border-radius: 8px; font-weight: 600; cursor: pointer; }
    
    /* Hero Section */
    .hero { text-align: center; padding: 60px 20px; max-width: 800px; margin: 0 auto; }
    .badge { display: inline-block; background: rgba(56, 189, 248, 0.1); color: var(--accent); border: 1px solid rgba(56, 189, 248, 0.3); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }
    .hero h1 { font-size: 44px; font-weight: 800; line-height: 1.2; margin-bottom: 16px; }
    .hero p { font-size: 18px; color: var(--text-muted); margin-bottom: 30px; }
    
    /* Pricing Grid */
    .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto; padding: 0 20px; }
    .price-card { background: var(--card-bg); border: 1px solid #1e293b; padding: 32px; border-radius: 16px; position: relative; transition: transform 0.2s; }
    .price-card.featured { border-color: var(--accent); box-shadow: 0 0 30px rgba(56, 189, 248, 0.15); }
    .price-card:hover { transform: translateY(-6px); }
    .plan-name { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .price { font-size: 36px; font-weight: 800; color: var(--accent); margin-bottom: 20px; }
    .features-list { list-style: none; margin-bottom: 28px; }
    .features-list li { margin-bottom: 10px; color: var(--text-muted); font-size: 15px; }
    .features-list li::before { content: "✓ "; color: #10b981; font-weight: bold; }
    .plan-btn { width: 100%; padding: 12px; border-radius: 8px; font-weight: 600; border: none; cursor: pointer; background: #1e293b; color: white; transition: background 0.2s; }
    .price-card.featured .plan-btn { background: var(--accent-grad); }
  </style>
</head>
<body>
  <nav class="nav">
    <div class="logo">⚡ APEX.IO</div>
    <button class="btn-primary">Get Started</button>
  </nav>

  <section class="hero">
    <span class="badge">🚀 v3.0 Just Launched</span>
    <h1>Build Faster With Intelligent Modern Cloud UI</h1>
    <p>Semantic HTML5 structure aur responsive CSS3 layouts se banaiye high-converting web applications.</p>
  </section>

  <div class="pricing-grid">
    <div class="price-card">
      <div class="plan-name">Starter</div>
      <div class="price">₹0 <span style="font-size:16px; color:#94a3b8;">/month</span></div>
      <ul class="features-list">
        <li>1 Live Project</li>
        <li>Community Discord Access</li>
        <li>Standard CSS Grid Engine</li>
      </ul>
      <button class="plan-btn">Start Free</button>
    </div>

    <div class="price-card featured">
      <div class="plan-name">Pro Master 🌟</div>
      <div class="price">₹999 <span style="font-size:16px; color:#94a3b8;">/month</span></div>
      <ul class="features-list">
        <li>Unlimited Projects</li>
        <li>24/7 AI Code Assistant</li>
        <li>Custom Animations & Themes</li>
        <li>Priority Cloud Hosting</li>
      </ul>
      <button class="plan-btn">Upgrade to Pro</button>
    </div>
  </div>
</body>
</html>`,
          sandbox_language: "html",
          challenge: {
            task: "Pricing grid ke andar ek teesra card 'Enterprise' tier add karein.",
            hint: "<div class=\"price-card\"><div class=\"plan-name\">Enterprise</div><div class=\"price\">₹4,999</div>...</div>",
            expected_output: "APEX.IO"
          },
          content: `<div class="mental-model-box">
  <div class="mental-icon">🏆</div>
  <div>
    <div class="mental-title">Capstone Architecture Overview</div>
    <p class="mental-text">Is production landing page mein aapne <strong>CSS Custom Properties (Variables)</strong>, <strong>Flexbox Navigation</strong>, <strong>Auto-Fit CSS Grid Pricing Matrix</strong>, aur <strong>Modern Glassmorphism Card Hierarchy</strong> ko perfectly blend kiya hai!</p>
  </div>
</div>`
        }
      ],
      quiz: {
        passing_score: 70,
        time_limit_minutes: 15,
        questions: [
          {
            id: "q-html-cap-1",
            question: "CSS Variables (e.g. `:root { --primary-color: #0284c7; }`) ka sabse bada faayda kya hai?",
            options: [
              "Centralized design system tokenization jisse Dark Mode switch aur color update single line mein ho jata hai",
              "Ye website ko fast download karta hai",
              "Ye HTML tags ko delete karta hai",
              "Ye images convert karta hai"
            ],
            correct_index: 0,
            explanation: "CSS Custom properties (`var(--name)`) runtime design systems aur easy theming (Dark/Light mode) ke liye fundamental building block hain."
          },
          {
            id: "q-html-cap-2",
            question: "Modern Mobile-First workflow ka kya matlab hai?",
            options: [
              "Pehle mobile screen ke styles likhna aur fir `@media (min-width: 768px)` se desktop ke liye enhance karna",
              "Sirf mobile ke liye app banana",
              "Desktop browser block karna",
              "Images remove karna"
            ],
            correct_index: 0,
            explanation: "Mobile-First approach base CSS ko light aur mobile-ready banata hai aur `min-width` media queries se larger screens ke liye expand karta hai."
          },
          {
            id: "q-html-cap-3",
            question: "`backdrop-filter: blur(12px);` CSS effect ko industry mein kis naam se jana jata hai?",
            options: ["Glassmorphism (Frosted Glass Effect)", "Neumorphism", "Flat Design 1.0", "Pixel Art"],
            correct_index: 0,
            explanation: "backdrop-filter frosted glass effect create karta hai jo modern macOS, iOS aur luxury web UIs mein standard ban chuka hai."
          },
          {
            id: "q-html-cap-4",
            question: "Form submit hone par bina page reload kiye modern JavaScript handle karne ke liye form event par kya call karte hain?",
            options: ["e.preventDefault()", "e.stop()", "window.kill()", "document.clear()"],
            correct_index: 0,
            explanation: "e.preventDefault() default browser page reload ko suspend karta hai taaki AJAX/fetch se data handle kiya ja sake."
          },
          {
            id: "q-html-cap-5",
            question: "Web performance mein SVG format images PNG/JPEG se better kyu hoti hain icons/logos ke liye?",
            options: [
              "SVG XML-based vector graphics hoti hain jo kisi bhi resolution (Retina/4K) par crisp rehti hain aur tiny file size hota hai",
              "SVG mein music chalta hai",
              "SVG sirf C++ mein banti hain",
              "SVG ko internet nahi chahiye"
            ],
            correct_index: 0,
            explanation: "SVGs resolution-independent vectors hote hain jo CSS se directly style aur animate bhi kiye ja sakte hain."
          }
        ]
      }
    }
  ],
  final_exam: {
    passing_score: 60,
    time_limit_minutes: 30,
    questions: [
      {
        id: "fe-html-1",
        question: "DOM (Document Object Model) kya hai?",
        options: [
          "Database query language",
          "HTML document ka browser dwara memory mein create kiya gaya hierarchical tree structure jise JavaScript aur CSS style/manipulate kar sakti hai",
          "Server operating system",
          "Graphic design software"
        ],
        correct_index: 1,
        explanation: "DOM HTML nodes ka interactive in-memory tree representation hota hai jo browser render karta hai."
      },
      {
        id: "fe-html-2",
        question: "CSS Specificity Calculation mein `!important` ka use kyu minimize karna chahiye?",
        options: [
          "Ye natural cascading order ko break karta hai aur future debugging ko difficult banata hai",
          "Ye computer crash kar deta hai",
          "Ye browser ko slow karta hai",
          "Ye legal nahi hai"
        ],
        correct_index: 0,
        explanation: "!important specificity rules ko bypass karta hai, isliye modular clean CSS architecture mein ise avoid karna chahiye."
      },
      {
        id: "fe-html-3",
        question: "Flexbox Main Axis aur Cross Axis switch kab hoti hain?",
        options: [
          "Jab `flex-direction: column` set kiya jata hai",
          "Jab page refresh hota hai",
          "Jab screen rotate hoti hai",
          "Jab image load hoti hai"
        ],
        correct_index: 0,
        explanation: "flex-direction: column karte hi Main Axis vertical ho jaati hai aur Cross Axis horizontal ho jaati hai."
      },
      {
        id: "fe-html-4",
        question: "Accessibility (a11y) ke liye high contrast ratio (e.g. WCAG AA standard 4.5:1) kyu important hai?",
        options: [
          "Taaki low-vision aur bright sunlight mein users text ko bina strain ke aasaani se read kar sakein",
          "Taaki code short ho sake",
          "Taaki server space bache",
          "Taaki ads display na hon"
        ],
        correct_index: 0,
        explanation: "WCAG contrast ratio ensures readable, inclusive user interfaces for all users across diverse environments."
      },
      {
        id: "fe-html-5",
        question: "`display: none` aur `visibility: hidden` mein kya difference hai?",
        options: [
          "`display: none` element ko DOM flow se poori tarah remove kar deta hai (0 space leta hai), jabki `visibility: hidden` element ko invisible karta hai lekin uski space reserved rehti hai",
          "Dono identical hain",
          "`visibility: hidden` element delete kar deta hai",
          "`display: none` color change karta hai"
        ],
        correct_index: 0,
        explanation: "display:none element ka physical layout space collapse kar deta hai; visibility:hidden element ko chupata hai lekin uska white space barkaraar rehta hai."
      }
    ]
  }
};

const outputPath = path.join(process.cwd(), 'Courses', 'test-5.json');
fs.writeFileSync(outputPath, JSON.stringify(htmlCssCourse, null, 2), 'utf-8');
console.log(`✅ HTML & CSS Course generated at ${outputPath}`);
