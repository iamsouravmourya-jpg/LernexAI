import fs from 'fs';
import { makeLesson } from './helpers';

export const webCourse = {
  id: "course-test-5-web",
  title: "Modern Responsive Web Design: HTML5 & CSS3 Masterclass (Hinglish)",
  subtitle: "Semantic HTML5, CSS Grid, Flexbox, Container Queries & Modern Animations",
  description: "Master modern web frontend development from semantic document anatomy, accessibility (a11y), CSS Box Model, Flexbox, 2D CSS Grid, Container Queries, CSS Variables to production SaaS UI animations in natural Hinglish.",
  category: "Web Development",
  difficulty: "Beginner to Advanced",
  thumbnail_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
  is_premium: false,
  total_modules: 10,
  estimated_hours: 45,
  created_at: "2026-03-01T00:00:00Z",
  modules: [
    // Mod 1: 4 lessons
    {
      id: "test5-mod-1",
      course_id: "course-test-5-web",
      module_number: 1,
      title: "Module 1: HTML5 Document Anatomy & Semantic Architecture",
      description: "Semantic tags (<header>, <main>, <article>, <aside>, <dialog>), meta viewport, SEO, accessibility (a11y), and ARIA landmarks.",
      order_index: 1,
      lessons: [
        makeLesson("test5-l-1-1", "test5-mod-1", 1, "Lesson 1.1: Semantic HTML5 Structure vs Generic <div> Soup", 1, 20, "html",
`<!-- Semantic HTML5 Architecture -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Modern Semantic App</title>
</head>
<body>
  <header>
    <h1>Antigravity Web Hub</h1>
    <nav>
      <a href="#features">Features</a>
      <a href="#pricing">Pricing</a>
    </nav>
  </header>
  <main>
    <article>
      <h2>Modern HTML5 Best Practices</h2>
      <p>Semantic tags improve accessibility, readability, and SEO rankings.</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2026 Antigravity. All rights reserved.</p>
  </footer>
</body>
</html>`,
          { task: "Create semantic structure with <header>, <main>, and <footer> tags.", hint: "Semantic HTML5 layout.", expected_output: "Antigravity Web Hub" },
          "Semantic HTML tags browser aur screen readers ko page content ka exact structural meaning batate hain bina generic div pollution ke.",
          [
            { tag: "Semantic HTML", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Document Semantics", desc: "<header>, <nav>, <main>, <article>, <footer> for clean hierarchy." }
          ],
          `<div class="theory-card"><h3>Semantic Architecture</h3><p>Boosts SEO ranking and powers screen reader assistive technology.</p></div>`
        ),
        makeLesson("test5-l-1-2", "test5-mod-1", 2, "Lesson 1.2: The <head> Element, Viewport Meta & OpenGraph SEO", 2, 20, "html",
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Critical for Responsive Mobile Rendering -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Production SaaS UI & Masterclass platform">
  <!-- OpenGraph Social Sharing Card -->
  <meta property="og:title" content="Modern HTML5 & CSS3 Masterclass">
  <meta property="og:type" content="website">
  <title>SEO Optimized Portal</title>
</head>
<body>
  <h1>SEO & Mobile Responsive Meta Ready</h1>
</body>
</html>`,
          { task: "Add <meta name='viewport' content='width=device-width, initial-scale=1.0'> tag.", hint: "Meta viewport definition.", expected_output: "SEO & Mobile Responsive Meta Ready" },
          "Viewport meta tag mobile devices ko page ko device screen width ke 1:1 scale par render karne ke liye force karta hai.",
          [
            { tag: "SEO & Viewport", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Responsive Meta", desc: "Mandatory foundation for all modern mobile-responsive websites." }
          ],
          `<div class="theory-card"><h3>Document Head</h3><p>Configures character encoding, mobile scaling, and social meta previews.</p></div>`
        ),
        makeLesson("test5-l-1-3", "test5-mod-1", 3, "Lesson 1.3: Web Accessibility (a11y) & ARIA Landmarks", 3, 25, "html",
`<!-- Accessible Component with ARIA Landmarks -->
<button aria-label="Close notification modal" aria-expanded="false">
  &times;
</button>

<section aria-labelledby="features-heading">
  <h2 id="features-heading">Engine Highlights</h2>
  <ul role="list">
    <li>Ultra-fast page loads</li>
    <li>100% WCAG AA Accessible</li>
  </ul>
</section>`,
          { task: "Create an accessible button with aria-label='Submit form'.", hint: "ARIA attributes for accessibility.", expected_output: "Engine Highlights" },
          "Accessibility (a11y) har user (including visually impaired users with screen readers) ke liye inclusive experience ensure karta hai.",
          [
            { tag: "a11y Standards", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "WCAG Compliance", desc: "ARIA labels and landmarks for screen reader navigation." }
          ],
          `<div class="theory-card"><h3>Accessibility Standards</h3><p>Passes WCAG 2.1 AA contrast, keyboard navigation, and semantic markers.</p></div>`
        ),
        makeLesson("test5-l-1-4", "test5-mod-1", 4, "Lesson 1.4: Native HTML5 <dialog> & Interactive <details> Accordions", 4, 20, "html",
`<!-- Native HTML5 Interactive Elements (Zero JS Accordion) -->
<details>
  <summary>What is included in the course?</summary>
  <p>Over 35 high-depth modules covering modern semantic web design.</p>
</details>

<dialog id="promoModal" open>
  <h3>Special Launch Offer</h3>
  <p>Get full lifetime access today.</p>
  <form method="dialog">
    <button>Dismiss</button>
  </form>
</dialog>`,
          { task: "Create a <details><summary>FAQ</summary><p>Answer</p></details> accordion.", hint: "Native details element.", expected_output: "What is included in the course?" },
          "<details> aur <dialog> modern HTML5 ke built-in interactive components hain jo bina JavaScript ke rich native behavior provide karte hain.",
          [
            { tag: "Native UI", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "HTML5 <dialog>", desc: "Built-in accessible modals and accordions." }
          ],
          `<div class="theory-card"><h3>Native Browser Capabilities</h3><p>Zero bundle size interactive UI primitives.</p></div>`
        )
      ]
    },

    // Mod 2: 3 lessons
    {
      id: "test5-mod-2",
      course_id: "course-test-5-web",
      module_number: 2,
      title: "Module 2: Typography, Links, Media & Responsive Images",
      description: "Responsive images (<picture>, srcset, sizes), semantic typography, and HTML5 audio/video streams.",
      order_index: 2,
      lessons: [
        makeLesson("test5-l-2-1", "test5-mod-2", 1, "Lesson 2.1: Modern Responsive Images with <picture>, srcset & sizes", 1, 25, "html",
`<!-- Art Direction with Responsive Picture Element -->
<picture>
  <source media="(min-width: 1024px)" srcset="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200" type="image/jpeg">
  <source media="(min-width: 640px)" srcset="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800" type="image/jpeg">
  <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400" 
       alt="Developer workspace with code on laptop" 
       loading="lazy" 
       width="800" 
       height="500">
</picture>`,
          { task: "Implement an <img> tag with loading='lazy' and alt text.", hint: "Lazy loading image attribute.", expected_output: "Developer workspace" },
          "<picture> aur srcset browser ko user ke exact screen resolution (1x, 2x Retina, mobile vs desktop) ke mutabiq optimal image size download karne allow karte hain.",
          [
            { tag: "Responsive Images", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "<picture> & srcset", desc: "Art direction and resolution switching for massive bandwidth savings." }
          ],
          `<div class="theory-card"><h3>Image Optimization Pipeline</h3><p>loading='lazy' prevents offscreen images from blocking initial page render.</p></div>`
        ),
        makeLesson("test5-l-2-2", "test5-mod-2", 2, "Lesson 2.2: Semantic Typography, Blockquotes & Definition Lists", 2, 20, "html",
`<blockquote>
  <p>"Good design is as little design as possible."</p>
  <cite>— Dieter Rams</cite>
</blockquote>

<dl>
  <dt>HTML5</dt>
  <dd>HyperText Markup Language 5th Revision</dd>
  <dt>CSS3</dt>
  <dd>Cascading Style Sheets Level 3</dd>
</dl>`,
          { task: "Create a <blockquote> with a <cite> author citation.", hint: "Semantic quote tag.", expected_output: "Good design is as little design as possible." },
          "Semantic typography (<mark>, <abbr>, <dfn>, <dl>, <blockquote>) text relationships ko clearly define karti hai.",
          [
            { tag: "Typography", color: "rgba(16, 185, 129, 0.15); #10b981", title: "<dl> & <blockquote>", desc: "Rich structural text markup." }
          ],
          `<div class="theory-card"><h3>Text Semantics</h3><p>Provides rich context to browser parsing engines.</p></div>`
        ),
        makeLesson("test5-l-2-3", "test5-mod-2", 3, "Lesson 2.3: Native HTML5 Audio, Video & Embedded Media Elements", 3, 20, "html",
`<video controls preload="metadata" width="100%" poster="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800">
  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
  <p>Your browser does not support the video tag.</p>
</video>`,
          { task: "Add a <video controls> player with width='100%'.", hint: "HTML5 video element.", expected_output: "Your browser does not support the video tag." },
          "HTML5 <video> aur <audio> bina third-party plugins ke high-performance hardware accelerated media playback provide karte hain.",
          [
            { tag: "Streaming Media", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "HTML5 Media", desc: "Hardware accelerated video & audio streaming." }
          ],
          `<div class="theory-card"><h3>Media Buffering</h3><p>preload='metadata' saves bandwidth while providing video duration.</p></div>`
        )
      ]
    },

    // Mod 3: 5 lessons
    {
      id: "test5-mod-3",
      course_id: "course-test-5-web",
      module_number: 3,
      title: "Module 3: HTML5 Forms, Inputs & Client-Side Validation",
      description: "Accessible form design (<label>, <fieldset>), input types (email, range, date), datalists, RegEx pattern validation, and Constraint Validation API.",
      order_index: 3,
      lessons: [
        makeLesson("test5-l-3-1", "test5-mod-3", 1, "Lesson 3.1: Building Accessible & Validated Modern Forms", 1, 20, "html",
`<form action="/api/register" method="POST">
  <fieldset>
    <legend>Account Credentials</legend>
    
    <div>
      <label for="userEmail">Business Email:</label>
      <input type="email" id="userEmail" name="email" required autocomplete="email" placeholder="dev@company.com">
    </div>

    <div>
      <label for="userPass">Secure Password:</label>
      <input type="password" id="userPass" name="password" minlength="8" required>
    </div>

    <button type="submit">Create Account</button>
  </fieldset>
</form>`,
          { task: "Create an input with type='email' and required attribute.", hint: "Email input tag.", expected_output: "Account Credentials" },
          "<label for='id'> input element ke sath programmatic association banata hai jo accessibility aur tap target size dono improve karta hai.",
          [
            { tag: "Accessible Forms", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "<fieldset> & <label>", desc: "Accessible form groups with keyboard focus chaining." }
          ],
          `<div class="theory-card"><h3>Form Architecture</h3><p>autocomplete attribute mobile users ke liye autofill experience boost karta hai.</p></div>`
        ),
        makeLesson("test5-l-3-2", "test5-mod-3", 2, "Lesson 3.2: Modern Input Types (range, color, date, number)", 2, 20, "html",
`<form>
  <label for="volume">Volume Control:</label>
  <input type="range" id="volume" name="volume" min="0" max="100" value="80">

  <label for="themeColor">Brand Accent Color:</label>
  <input type="color" id="themeColor" name="themeColor" value="#3b82f6">

  <label for="dob">Launch Date:</label>
  <input type="date" id="dob" name="launch_date">
</form>`,
          { task: "Create an input type='range' with min='0' and max='100'.", hint: "Range slider input.", expected_output: "Volume Control:" },
          "Modern input types mobile browsers par native platform pickers (jaise date wheel aur number keypad) trigger karte hain.",
          [
            { tag: "Native Pickers", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Input Types", desc: "Invokes specialized mobile virtual keyboards and system pickers." }
          ],
          `<div class="theory-card"><h3>Mobile UX</h3><p>inputmode='numeric' opens mobile numpad without decimal clutter.</p></div>`
        ),
        makeLesson("test5-l-3-3", "test5-mod-3", 3, "Lesson 3.3: Datalists & Custom Select Dropdowns (<datalist>)", 3, 20, "html",
`<label for="browserChoice">Preferred Code Editor:</label>
<input list="editors" id="browserChoice" name="editor" placeholder="Type or select...">

<datalist id="editors">
  <option value="VS Code">
  <option value="Cursor">
  <option value="Zed">
  <option value="Neovim">
</datalist>`,
          { task: "Create an <input list='fruits'> linked to a <datalist id='fruits'>.", hint: "Datalist autocomplete markup.", expected_output: "Preferred Code Editor:" },
          "<datalist> standard text inputs ko native autocomplete dropdown suggestions provide karta hai without any heavy JavaScript libraries.",
          [
            { tag: "Autocomplete", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "<datalist> Component", desc: "Native searchable autocomplete dropdown." }
          ],
          `<div class="theory-card"><h3>Zero-JS Autocomplete</h3><p>Users can either select from list or type custom values.</p></div>`
        ),
        makeLesson("test5-l-3-4", "test5-mod-3", 4, "Lesson 3.4: HTML5 RegEx Pattern Validation & Constraint Validation API", 4, 25, "html",
`<form>
  <label for="zipcode">Postal Code (5 digits):</label>
  <input type="text" id="zipcode" name="zip" 
         pattern="^[0-9]{5}$" 
         title="Please enter a valid 5-digit postal code" 
         required>
  <button>Validate</button>
</form>`,
          { task: "Add pattern='^[0-9]{5}$' to a text input.", hint: "RegEx pattern attribute.", expected_output: "Postal Code (5 digits):" },
          "pattern attribute input values ko regular expressions ke against validate karta hai aur form submit hone se pehle invalid entries ko block karta hai.",
          [
            { tag: "RegEx Validation", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "pattern Attribute", desc: "Declarative client-side regular expression validation." }
          ],
          `<div class="theory-card"><h3>Constraint Validation</h3><p>Prevents bad network payloads before reaching the server.</p></div>`
        ),
        makeLesson("test5-l-3-5", "test5-mod-3", 5, "Lesson 3.5: CSS Form Pseudo-Classes (:valid, :invalid, :focus-within)", 5, 25, "html",
`<style>
  input:valid { border: 2px solid #10b981; }
  input:invalid:not(:placeholder-shown) { border: 2px solid #ef4444; }
  .form-group:focus-within { outline: 2px solid #3b82f6; }
</style>

<div class="form-group">
  <label for="emailVal">Verified Email:</label>
  <input type="email" id="emailVal" placeholder="name@site.com" required>
</div>`,
          { task: "Style input:valid with green border in CSS.", hint: "CSS form validation styling.", expected_output: "Verified Email:" },
          ":valid aur :invalid pseudo-classes input validity state ke mutabiq dynamic real-time visual feedback render karti hain.",
          [
            { tag: "Form Pseudo-Classes", color: "rgba(239, 68, 68, 0.15); #ef4444", title: ":valid / :invalid", desc: "Instant visual feedback without JavaScript event listeners." }
          ],
          `<div class="theory-card"><h3>Stateful Styling</h3><p>:focus-within styles entire container when child gains focus.</p></div>`
        )
      ]
    },

    // Mod 4: 4 lessons
    {
      id: "test5-mod-4",
      course_id: "course-test-5-web",
      module_number: 4,
      title: "Module 4: CSS3 Foundations, Selectors & Cascade Specificity",
      description: "CSS Specificity math, pseudo-classes (:has(), :is(), :where()), pseudo-elements (::before/::after), CSS Variables, and @layer.",
      order_index: 4,
      lessons: [
        makeLesson("test5-l-4-1", "test5-mod-4", 1, "Lesson 4.1: CSS Specificity Hierarchy & Specificity Calculator Math", 1, 25, "html",
`<style>
  /* Specificity Math: (Inline, ID, Class/Attribute/Pseudo-Class, Element) */
  p { color: #64748b; }                     /* (0, 0, 0, 1) */
  .text-highlight { color: #3b82f6; }       /* (0, 0, 1, 0) - WINS */
  #primary-notice { color: #10b981; }       /* (0, 1, 0, 0) - ULTIMATE WIN */
</style>

<p id="primary-notice" class="text-highlight">
  Understanding CSS Cascade Specificity Hierarchy
</p>`,
          { task: "Apply class and ID selector to demonstrate CSS specificity.", hint: "Specificity calculation.", expected_output: "Understanding CSS Cascade Specificity Hierarchy" },
          "CSS Specificity (Inline > ID > Class/Pseudo-class > Element) determine karti hai ki conflict hone par kaunsa rule render hoga.",
          [
            { tag: "Specificity Math", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Cascade Resolution", desc: "Inline (1000) > ID (100) > Class (10) > Element (1)." }
          ],
          `<div class="theory-card"><h3>Cascade Pipeline</h3><p>Avoid using !important; manage specificity cleanly using structured classes.</p></div>`
        ),
        makeLesson("test5-l-4-2", "test5-mod-4", 2, "Lesson 4.2: Modern Pseudo-Classes (:has() Parent Selector, :is(), :where())", 2, 25, "html",
`<style>
  /* :has() is the CSS Parent Selector */
  .card:has(img) {
    border: 2px solid #3b82f6;
    padding: 1rem;
  }
  /* :where() resets specificity to 0 */
  :where(h1, h2, h3) {
    margin-block-end: 0.5rem;
  }
</style>

<div class="card">
  <h2>Parent Selector :has() in Action</h2>
  <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=100" alt="Icon">
</div>`,
          { task: "Use :has() pseudo-class to style a container having an image.", hint: "CSS :has() selector.", expected_output: "Parent Selector :has() in Action" },
          ":has() CSS ka long-awaited parent selector hai jo child elements ki presence ke basis par parent container ko dynamically style karta hai.",
          [
            { tag: "Parent Selector", color: "rgba(16, 185, 129, 0.15); #10b981", title: ":has() Selector", desc: "Styles parent containers conditionally based on children." }
          ],
          `<div class="theory-card"><h3>Modern CSS Selectors</h3><p>:is() groups selectors with highest specificity; :where() has 0 specificity.</p></div>`
        ),
        makeLesson("test5-l-4-3", "test5-mod-4", 3, "Lesson 4.3: Pseudo-Elements (::before & ::after) for Decorative UI", 3, 20, "html",
`<style>
  .badge::before {
    content: "•";
    color: #10b981;
    font-size: 1.5rem;
    margin-right: 6px;
    vertical-align: middle;
  }
</style>

<span class="badge">Live Server Status: Active</span>`,
          { task: "Use ::before pseudo-element with content: '★ ' to add decorative stars.", hint: "CSS ::before pseudo element.", expected_output: "Live Server Status: Active" },
          "::before aur ::after DOM mein extra HTML nodes add kiye bina decorative icons, badges, aur tooltips render karte hain.",
          [
            { tag: "Pseudo-Elements", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "::before & ::after", desc: "Zero-DOM decorative styling attachments." }
          ],
          `<div class="theory-card"><h3>Decorative Rendering</h3><p>Must include content: '' property to render in the browser box tree.</p></div>`
        ),
        makeLesson("test5-l-4-4", "test5-mod-4", 4, "Lesson 4.4: CSS Custom Properties (Variables) & Cascade Layers (@layer)", 4, 25, "html",
`<style>
  :root {
    --brand-primary: #3b82f6;
    --radius-md: 12px;
  }

  @layer base, components;

  @layer components {
    .btn-themed {
      background-color: var(--brand-primary);
      border-radius: var(--radius-md);
      color: #ffffff;
      padding: 8px 16px;
      border: none;
    }
  }
</style>

<button class="btn-themed">Themed with CSS Variables</button>`,
          { task: "Define --accent-color: #10b981 in :root and use with var().", hint: "CSS Custom properties.", expected_output: "Themed with CSS Variables" },
          "CSS Custom Properties runtime par dynamic theming allow karti hain aur @layer specificity wars ko systematically organize karta hai.",
          [
            { tag: "CSS Variables", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "var() & @layer", desc: "Dynamic runtime variables with cascade layer management." }
          ],
          `<div class="theory-card"><h3>Design Tokens</h3><p>The foundation of enterprise design systems and dark mode toggle engines.</p></div>`
        )
      ]
    },

    // Mod 5: 2 lessons
    {
      id: "test5-mod-5",
      course_id: "course-test-5-web",
      module_number: 5,
      title: "Module 5: The CSS Box Model, Sizing & Modern Units",
      description: "box-sizing: border-box, margin collapsing, modern viewport units (dvh, lvh, svh), container query units (cqw), and clamp() sizing.",
      order_index: 5,
      lessons: [
        makeLesson("test5-l-5-1", "test5-mod-5", 1, "Lesson 5.1: box-sizing: border-box & Margin Collapsing Mechanics", 1, 25, "html",
`<style>
  *, *::before, *::after {
    box-sizing: border-box; /* Width includes padding and border */
    margin: 0;
  }

  .box {
    width: 200px;
    padding: 20px;
    border: 5px solid #3b82f6;
    background-color: #f1f5f9;
  }
</style>

<div class="box">
  Exact 200px Total Width Box
</div>`,
          { task: "Apply *, *::before, *::after { box-sizing: border-box; } globally.", hint: "CSS box-sizing reset.", expected_output: "Exact 200px Total Width Box" },
          "box-sizing: border-box element width mein padding aur border include karta hai, preventing unwanted layout wrapping bugs.",
          [
            { tag: "Box Model", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "border-box Reset", desc: "Content + Padding + Border = Defined Width." }
          ],
          `<div class="theory-card"><h3>Box Model Math</h3><p>Universal box-sizing reset is step #1 in every production CSS setup.</p></div>`
        ),
        makeLesson("test5-l-5-2", "test5-mod-5", 2, "Lesson 5.2: CSS Modern Units — rem vs em, ch, dvh & clamp() Sizing", 2, 25, "html",
`<style>
  .fluid-heading {
    /* clamp(MIN, VAL, MAX) for fluid responsive typography */
    font-size: clamp(1.5rem, 4vw + 1rem, 3.5rem);
    max-width: 65ch; /* 65 characters optimal line length */
  }
</style>

<h1 class="fluid-heading">Fluid Responsive Typography with CSS clamp()</h1>`,
          { task: "Use font-size: clamp(1rem, 2vw, 2rem) for fluid text scaling.", hint: "CSS clamp math.", expected_output: "Fluid Responsive Typography with CSS clamp()" },
          "clamp() smooth fluid scaling create karta hai bina dozens of media query breakpoints likhe.",
          [
            { tag: "Fluid Math", color: "rgba(16, 185, 129, 0.15); #10b981", title: "clamp() & dvh", desc: "Dynamic viewport scaling with optimal character width limits." }
          ],
          `<div class="theory-card"><h3>Typography Ergonomics</h3><p>Constraining line-length to 65–75ch guarantees maximum readability.</p></div>`
        )
      ]
    },

    // Mod 6: 4 lessons
    {
      id: "test5-mod-6",
      course_id: "course-test-5-web",
      module_number: 6,
      title: "Module 6: Positioning, Stacking Context & Z-Index Architecture",
      description: "CSS position (static, relative, absolute, fixed, sticky), stacking contexts, logical properties (inset), and modal overlay patterns.",
      order_index: 6,
      lessons: [
        makeLesson("test5-l-6-1", "test5-mod-6", 1, "Lesson 6.1: Master CSS Position (Absolute, Fixed, Sticky & Inset)", 1, 25, "html",
`<style>
  .sticky-nav {
    position: sticky;
    top: 0;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 12px;
    z-index: 10;
  }
</style>

<nav class="sticky-nav">Sticky Header Navigation</nav>
<div style="height: 200px; padding: 20px;">Scrollable content area</div>`,
          { task: "Create a sticky header with position: sticky; top: 0;.", hint: "CSS sticky positioning.", expected_output: "Sticky Header Navigation" },
          "position: sticky normal document flow mein scroll hota hai aur defined threshold reach hone par viewport par lock ho jata hai.",
          [
            { tag: "Positioning", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "Sticky & Fixed", desc: "Viewport-bound positioning mechanics." }
          ],
          `<div class="theory-card"><h3>Positioning Matrix</h3><p>inset: 0 is the modern replacement for top:0; right:0; bottom:0; left:0;.</p></div>`
        ),
        makeLesson("test5-l-6-2", "test5-mod-6", 2, "Lesson 6.2: Stacking Contexts & Resolving Z-Index Wars", 2, 25, "html",
`<style>
  /* Stacking context isolation prevents z-index pollution */
  .isolated-card {
    isolation: isolate;
    position: relative;
    z-index: 1;
  }
</style>

<div class="isolated-card">
  <h3>Isolated Stacking Context</h3>
  <p>Child z-indexes are safely contained within this component boundary.</p>
</div>`,
          { task: "Apply isolation: isolate; to prevent z-index leaks.", hint: "CSS isolation property.", expected_output: "Isolated Stacking Context" },
          "isolation: isolate naya stacking context create karta hai jisse child z-indexes pure page ke layout ko corrupt nahi karte.",
          [
            { tag: "Stacking Context", color: "rgba(16, 185, 129, 0.15); #10b981", title: "isolation: isolate", desc: "Encapsulates z-index hierarchy within component boundaries." }
          ],
          `<div class="theory-card"><h3>Z-Index Architecture</h3><p>Eliminates z-index: 999999 wars forever.</p></div>`
        ),
        makeLesson("test5-l-6-3", "test5-mod-6", 3, "Lesson 6.3: CSS Logical Properties (margin-inline, padding-block)", 3, 20, "html",
`<style>
  .modern-card {
    padding-block: 1.5rem;    /* Top and Bottom */
    padding-inline: 2rem;    /* Left and Right (adapts to RTL/LTR) */
    border-inline-start: 4px solid #3b82f6;
  }
</style>

<div class="modern-card">
  Logical properties adapt automatically to international writing modes!
</div>`,
          { task: "Use padding-inline: 1rem; and padding-block: 0.5rem;.", hint: "CSS logical properties.", expected_output: "Logical properties adapt automatically" },
          "Logical properties (inline/block) internationalization (RTL/LTR) aur vertical writing modes ko seamlessly support karti hain.",
          [
            { tag: "Logical CSS", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Logical Properties", desc: "Writing-mode agnostic directional styling." }
          ],
          `<div class="theory-card"><h3>Global Ready</h3><p>Replaces physical top/bottom/left/right with block and inline axes.</p></div>`
        ),
        makeLesson("test5-l-6-4", "test5-mod-6", 4, "Lesson 6.4: Production UI Patterns — Modals, Drawers & Notification Badges", 4, 25, "html",
`<style>
  .notification-wrapper {
    position: relative;
    display: inline-block;
  }
  .badge-dot {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 10px;
    height: 10px;
    background: #ef4444;
    border-radius: 50%;
  }
</style>

<div class="notification-wrapper">
  <button>Inbox</button>
  <span class="badge-dot"></span>
</div>`,
          { task: "Position a notification dot badge on top-right of an inbox button.", hint: "Absolute badge pattern.", expected_output: "Inbox" },
          "Relative parent + Absolute child pattern badges, dropdown arrows, aur modal overlay close buttons ke liye foundational hai.",
          [
            { tag: "UI Patterns", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "Badge Overlays", desc: "Relative-Absolute anchoring pattern." }
          ],
          `<div class="theory-card"><h3>Production Badging</h3><p>Pixel-perfect overlay positioning.</p></div>`
        )
      ]
    },

    // Mod 7: 3 lessons
    {
      id: "test5-mod-7",
      course_id: "course-test-5-web",
      module_number: 7,
      title: "Module 7: Master CSS Flexbox (1-Dimensional Layout Engine)",
      description: "Flexbox container properties, main vs cross axes, flex-grow/shrink/basis mathematical calculations, and gap alignments.",
      order_index: 7,
      lessons: [
        makeLesson("test5-l-7-1", "test5-mod-7", 1, "Lesson 7.1: Flexbox Axes, Alignment & Modern gap Property", 1, 25, "html",
`<style>
  .nav-bar {
    display: flex;
    justify-content: space-between; /* Main Axis */
    align-items: center;           /* Cross Axis */
    gap: 1.5rem;                   /* Modern Flex Gap */
    padding: 1rem;
    background: #f8fafc;
  }
</style>

<header class="nav-bar">
  <div class="logo"><strong>Antigravity</strong></div>
  <nav style="display:flex; gap:1rem;">
    <a href="#">Docs</a>
    <a href="#">Showcase</a>
  </nav>
</header>`,
          { task: "Create display: flex; justify-content: space-between; align-items: center; navbar.", hint: "Flexbox navbar styling.", expected_output: "Antigravity" },
          "Flexbox 1-dimensional layouts (rows ya columns) ko distribute aur align karne ke liye world-standard engine hai.",
          [
            { tag: "Flexbox", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "1D Flex Engine", desc: "Main axis (justify-content) and Cross axis (align-items)." }
          ],
          `<div class="theory-card"><h3>gap Property</h3><p>gap property margins ke bina clean uniform spacing deta hai.</p></div>`
        ),
        makeLesson("test5-l-7-2", "test5-mod-7", 2, "Lesson 7.2: Flex-Grow, Flex-Shrink, Flex-Basis & Wrap Math", 2, 25, "html",
`<style>
  .flex-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .sidebar { flex: 0 0 250px; background: #e2e8f0; padding: 1rem; }
  .content { flex: 1 1 500px; background: #f1f5f9; padding: 1rem; }
</style>

<div class="flex-container">
  <aside class="sidebar">Sidebar (250px Fixed)</aside>
  <main class="content">Fluid Main Content Area</main>
</div>`,
          { task: "Set flex: 1 1 auto; on a responsive flex item.", hint: "Flex shorthand property.", expected_output: "Sidebar (250px Fixed)" },
          "flex: [grow] [shrink] [basis] shorthand distribute karta hai remaining free space proportional ratios ke sath.",
          [
            { tag: "Flex Math", color: "rgba(16, 185, 129, 0.15); #10b981", title: "flex Shorthand", desc: "Calculates available space allocation mathematically." }
          ],
          `<div class="theory-card"><h3>Flex Proportions</h3><p>flex: 1 expands item to fill 100% of remaining free space.</p></div>`
        ),
        makeLesson("test5-l-7-3", "test5-mod-7", 3, "Lesson 7.3: Flex Item Proportions — flex: 1 vs flex: auto Deep Dive", 3, 20, "html",
`<style>
  .flex-demo { display: flex; gap: 8px; }
  .equal-col { flex: 1 1 0; background: #dbeafe; padding: 12px; }
</style>

<div class="flex-demo">
  <div class="equal-col">Col 1 (Equal 33.3%)</div>
  <div class="equal-col">Col 2 (Equal 33.3%)</div>
  <div class="equal-col">Col 3 (Equal 33.3%)</div>
</div>`,
          { task: "Create 3 equal width columns using flex: 1 1 0;.", hint: "Equal flex columns.", expected_output: "Col 1 (Equal 33.3%)" },
          "flex: 1 (flex: 1 1 0) content size ko ignore karke strictly equal column widths guarantee karta hai.",
          [
            { tag: "Equal Columns", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "flex: 1 1 0", desc: "Forces equal width columns regardless of inner content length." }
          ],
          `<div class="theory-card"><h3>Flex Basis 0</h3><p>Overcomes content-driven layout distortion.</p></div>`
        )
      ]
    },

    // Mod 8: 5 lessons
    {
      id: "test5-mod-8",
      course_id: "course-test-5-web",
      module_number: 8,
      title: "Module 8: Master CSS Grid (2-Dimensional Layout Matrix)",
      description: "CSS Grid 2D matrix, auto-fit/minmax() responsive grids, grid-template-areas, CSS Subgrid, and modern Bento layouts.",
      order_index: 8,
      lessons: [
        makeLesson("test5-l-8-1", "test5-mod-8", 1, "Lesson 8.1: Modern Responsive 2D Grid with auto-fit & minmax()", 1, 25, "html",
`<style>
  /* The Ultimate Responsive Grid (Zero Media Queries Required!) */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  .card {
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    padding: 1.5rem;
    border-radius: 12px;
  }
</style>

<div class="grid-container">
  <div class="card"><h3>Analytics Dashboard</h3><p>Real-time telemetry</p></div>
  <div class="card"><h3>User Management</h3><p>Access control RBAC</p></div>
  <div class="card"><h3>Billing Engine</h3><p>Stripe webhook sync</p></div>
</div>`,
          { task: "Create grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); grid.", hint: "Auto-fit responsive grid.", expected_output: "Analytics Dashboard" },
          "repeat(auto-fit, minmax(240px, 1fr)) bina ek bhi media query likhe screen resize par cards ko automatically wrap aur stretch karta hai.",
          [
            { tag: "Auto Grid", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "auto-fit & minmax", desc: "Completely automated responsive column grid." }
          ],
          `<div class="theory-card"><h3>2D Grid Matrix</h3><p>Aligns elements along rows AND columns simultaneously.</p></div>`
        ),
        makeLesson("test5-l-8-2", "test5-mod-8", 2, "Lesson 8.2: Grid Template Areas & Named Dashboard Layouts", 2, 25, "html",
`<style>
  .app-layout {
    display: grid;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 240px 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 200px;
    gap: 10px;
  }
  .h { grid-area: header; background: #e2e8f0; padding: 10px; }
  .s { grid-area: sidebar; background: #cbd5e1; padding: 10px; }
  .m { grid-area: main; background: #f1f5f9; padding: 10px; }
  .f { grid-area: footer; background: #e2e8f0; padding: 10px; }
</style>

<div class="app-layout">
  <header class="h">Header Area</header>
  <aside class="s">Sidebar Nav</aside>
  <main class="m">Dashboard Main Body</main>
  <footer class="f">Footer Info</footer>
</div>`,
          { task: "Use grid-template-areas to construct named layout.", hint: "Named grid template areas.", expected_output: "Dashboard Main Body" },
          "grid-template-areas complex application shells ko visual ASCII-art style syntax mein represent karne allow karta hai.",
          [
            { tag: "Named Grid", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Template Areas", desc: "Visual declarative layout mapping." }
          ],
          `<div class="theory-card"><h3>Dashboard Shell</h3><p>Reorder layout on mobile by changing only 3 lines in media query.</p></div>`
        ),
        makeLesson("test5-l-8-3", "test5-mod-8", 3, "Lesson 8.3: CSS Subgrid & Hierarchical Grid Alignments", 3, 25, "html",
`<style>
  .parent-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  .subgrid-card {
    grid-column: span 2;
    display: grid;
    grid-template-columns: subgrid; /* Inherits track sizing from parent! */
  }
</style>

<div class="parent-grid">
  <div class="subgrid-card">
    <div style="background:#dbeafe; padding:10px;">Subgrid Col 1</div>
    <div style="background:#bfdbfe; padding:10px;">Subgrid Col 2</div>
  </div>
</div>`,
          { task: "Use grid-template-columns: subgrid; inside child grid.", hint: "CSS Subgrid implementation.", expected_output: "Subgrid Col 1" },
          "CSS Subgrid nested cards aur complex tables ke internal tracks ko parent grid ke columns ke sath perfectly align karta hai.",
          [
            { tag: "Subgrid", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "CSS Subgrid", desc: "Inherits parent grid tracks for nested alignment perfection." }
          ],
          `<div class="theory-card"><h3>Subgrid Alignment</h3><p>Solves uneven card button alignments across card rows.</p></div>`
        ),
        makeLesson("test5-l-8-4", "test5-mod-8", 4, "Lesson 8.4: Grid Auto-Flow & Dense Packing Mechanics", 4, 25, "html",
`<style>
  .dense-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: dense; /* Backfills empty grid holes automatically */
    gap: 8px;
  }
  .wide { grid-column: span 2; background: #fed7aa; padding: 12px; }
  .item { background: #ffedd5; padding: 12px; }
</style>

<div class="dense-grid">
  <div class="wide">Wide Card #1 (Spans 2)</div>
  <div class="item">Small Card #2</div>
  <div class="item">Small Card #3</div>
</div>`,
          { task: "Apply grid-auto-flow: dense; to eliminate grid gaps.", hint: "Dense auto packing.", expected_output: "Wide Card #1" },
          "grid-auto-flow: dense masonry style dashboards mein spaces ko naturally fill karta hai.",
          [
            { tag: "Dense Packing", color: "rgba(245, 158, 11, 0.15); #f59e0b", title: "Dense Flow", desc: "Eliminates empty track holes in asymmetric layouts." }
          ],
          `<div class="theory-card"><h3>Grid Backfilling</h3><p>Optimal for photo galleries and asymmetric SaaS bento cards.</p></div>`
        ),
        makeLesson("test5-l-8-5", "test5-mod-8", 5, "Lesson 8.5: Modern Bento Grid Showcase Architecture", 5, 25, "html",
`<style>
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .bento-hero { grid-column: span 2; grid-row: span 2; background: #1e293b; color:#fff; padding: 24px; border-radius: 16px; }
  .bento-stat { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px; }
</style>

<div class="bento-grid">
  <div class="bento-hero">
    <h2>Enterprise Security AI</h2>
    <p>Real-time threat mitigation across all endpoints.</p>
  </div>
  <div class="bento-stat"><h3>99.99%</h3><p>Uptime SLA</p></div>
  <div class="bento-stat"><h3>100k+</h3><p>Active Devs</p></div>
</div>`,
          { task: "Create modern bento grid with hero spanning 2 columns.", hint: "Bento grid styling.", expected_output: "Enterprise Security AI" },
          "Bento grids modern Apple/Linear-style feature landing pages ka industry-leading visual standard hain.",
          [
            { tag: "Bento Grid", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Bento UI Pattern", desc: "Modern asymmetric high-contrast feature presentation." }
          ],
          `<div class="theory-card"><h3>Design Trend</h3><p>Asymmetric depth with high-contrast typography and subtle dividers.</p></div>`
        )
      ]
    },

    // Mod 9: 3 lessons
    {
      id: "test5-mod-9",
      course_id: "course-test-5-web",
      module_number: 9,
      title: "Module 9: Responsive Design, Mobile-First & Modern Media Queries",
      description: "Mobile-first CSS strategy, standard breakpoints, modern Container Queries (@container), and prefers-color-scheme dark mode.",
      order_index: 9,
      lessons: [
        makeLesson("test5-l-9-1", "test5-mod-9", 1, "Lesson 9.1: Mobile-First Strategy, Breakpoints & Dark Mode", 1, 25, "html",
`<style>
  /* Mobile-First Base (Default) */
  .hero-title { font-size: 1.5rem; color: #0f172a; }

  /* Tablet & Desktop (min-width queries) */
  @media (min-width: 768px) {
    .hero-title { font-size: 2.5rem; }
  }

  /* Dark Mode System Detection */
  @media (prefers-color-scheme: dark) {
    body { background-color: #0b0f17; color: #f8fafc; }
    .hero-title { color: #f8fafc; }
  }
</style>

<h1 class="hero-title">Mobile-First High Performance Platform</h1>`,
          { task: "Define media query @media (min-width: 768px) for desktop styling.", hint: "Mobile first media query.", expected_output: "Mobile-First High Performance Platform" },
          "Mobile-first min-width media queries use karta hai, ensuring fastest performance on mobile devices with zero unused desktop styles.",
          [
            { tag: "Mobile First", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "min-width Queries", desc: "Progressive enhancement for larger viewport sizes." }
          ],
          `<div class="theory-card"><h3>System Dark Mode</h3><p>prefers-color-scheme matches user OS theme settings automatically.</p></div>`
        ),
        makeLesson("test5-l-9-2", "test5-mod-9", 2, "Lesson 9.2: Modern Container Queries (@container) — The Future of Responsive UI", 2, 30, "html",
`<style>
  .card-container {
    container-type: inline-size;
    container-name: card;
  }
  .user-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
    background: #f1f5f9;
  }

  /* Responsive to PARENT WIDTH, not viewport width! */
  @container card (min-width: 400px) {
    .user-card {
      flex-direction: row;
      align-items: center;
    }
  }
</style>

<div class="card-container">
  <div class="user-card">
    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60" style="border-radius:50%;" alt="Avatar">
    <div><strong>Priya Sharma</strong><p>Staff Systems Architect</p></div>
  </div>
</div>`,
          { task: "Define @container query based on parent container width.", hint: "Container queries syntax.", expected_output: "Priya Sharma" },
          "Container Queries component ko viewport ki jagah apne parent container ki width ke hisaab se responsive banati hain — true modular UI components!",
          [
            { tag: "Container Queries", color: "rgba(16, 185, 129, 0.15); #10b981", title: "@container Queries", desc: "Component-level responsiveness independent of global viewport size." }
          ],
          `<div class="theory-card"><h3>Modular Design Systems</h3><p>Same card adapts whether placed in narrow sidebar or wide dashboard main body.</p></div>`
        ),
        makeLesson("test5-l-9-3", "test5-mod-9", 3, "Lesson 9.3: Fluid Typography & Layouts with CSS clamp() and min() / max()", 3, 20, "html",
`<style>
  .fluid-container {
    width: min(90%, 1200px); /* Responsive width with hard cap */
    margin-inline: auto;
    padding: clamp(1rem, 3vw, 2.5rem);
    background: #f8fafc;
    border: 1px solid #e2e8f0;
  }
</style>

<div class="fluid-container">
  Fluid Container with min() Hard Width Constraints
</div>`,
          { task: "Use width: min(90%, 1000px); to clamp container max width.", hint: "CSS min function.", expected_output: "Fluid Container with min() Hard Width Constraints" },
          "min() aur max() math functions complex responsive calculations ko single-line declarative statements mein convert karte hain.",
          [
            { tag: "CSS Math", color: "rgba(168, 85, 247, 0.15); #a855f7", title: "min(), max(), clamp()", desc: "Mathematical boundary constraints in pure CSS." }
          ],
          `<div class="theory-card"><h3>Fluid Geometry</h3><p>Zero JavaScript window resize listener overhead.</p></div>`
        )
      ]
    },

    // Mod 10: 2 lessons
    {
      id: "test5-mod-10",
      course_id: "course-test-5-web",
      module_number: 10,
      title: "Module 10: Capstone Project — Production SaaS UI Showcase",
      description: "Building a production-ready, fully responsive SaaS dashboard and feature landing page with GPU-accelerated CSS animations.",
      order_index: 10,
      lessons: [
        makeLesson("test5-l-10-1", "test5-mod-10", 1, "Lesson 10.1: Building the Complete SaaS Showcase & Animations", 1, 25, "html",
`<style>
  @keyframes slideUpFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .saas-hero {
    animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    padding: 3rem 1.5rem;
    text-align: center;
    background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  }
</style>

<section class="saas-hero">
  <h1 style="font-size:2.5rem; font-weight:800; color:#0f172a;">Antigravity Cloud Platform</h1>
  <p style="color:#64748b; font-size:1.1rem; max-width:600px; margin:1rem auto;">
    Enterprise Cloud Engine for high-throughput distributed systems.
  </p>
</section>`,
          { task: "Create CSS keyframes animation with slideUpFade.", hint: "Keyframes animation in CSS.", expected_output: "Antigravity Cloud Platform" },
          "CSS animations cubic-bezier easing curves ke sath smooth 60fps/120fps hardware-accelerated transitions produce karti hain.",
          [
            { tag: "60fps Animation", color: "rgba(59, 130, 246, 0.15); #3b82f6", title: "GPU Acceleration", desc: "transform & opacity animate purely on the compositor thread." }
          ],
          `<div class="theory-card"><h3>Compositor Thread</h3><p>Never animate width/top/margin to avoid expensive CPU layout repaints.</p></div>`
        ),
        makeLesson("test5-l-10-2", "test5-mod-10", 2, "Lesson 10.2: Complete Capstone Showcase — Production SaaS UI Showcase", 2, 30, "html",
`<!-- Full Production SaaS UI Showcase Capstone -->
<div style="font-family: system-ui, sans-serif; max-width: 1000px; margin: 0 auto; padding: 24px;">
  <header style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #e2e8f0; padding-bottom:16px;">
    <h2 style="margin:0; color:#3b82f6;">Antigravity Design Engine</h2>
    <span style="background:#dcfce7; color:#15803d; padding:4px 12px; border-radius:999px; font-size:14px; font-weight:600;">Production Ready</span>
  </header>
  <main style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-top:24px;">
    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:12px;">
      <h3 style="margin-top:0;">Semantic Core</h3>
      <p style="color:#64748b;">100% WCAG AA Accessibility and HTML5 Semantic Landmarks.</p>
    </div>
    <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:20px; border-radius:12px;">
      <h3 style="margin-top:0;">CSS Grid & Flexbox</h3>
      <p style="color:#64748b;">Subgrid, Container Queries, and Fluid clamp() scaling.</p>
    </div>
  </main>
</div>`,
          { task: "Render complete production SaaS UI showcase capstone.", hint: "Full capstone HTML/CSS render.", expected_output: "Antigravity Design Engine" },
          "Mubarak ho! Aapne Semantic HTML5, WCAG Accessibility, CSS Box Model, Flexbox, 2D Grid, Subgrid, Container Queries aur GPU-accelerated CSS animations master kar liya hai!",
          [
            { tag: "Frontend Architect", color: "rgba(16, 185, 129, 0.15); #10b981", title: "Modern Web Master", desc: "Production-ready modern HTML5 & CSS3 engineering unlocked." }
          ],
          `<div class="theory-card"><h3>Web Design Mastery</h3><p>Elite frontend UI engineering capabilities achieved!</p></div>`
        )
      ]
    }
  ]
};

fs.writeFileSync('Courses/test-5.json', JSON.stringify(webCourse, null, 2));
console.log("✅ Course 5 (HTML5 & CSS3) fully built with pure, unique Web content!");
