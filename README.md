# LernexAI 🎓⚡
> **Next-Generation Interactive Learning Platform with AI Tutoring, Proctored Assessments & Verifiable Academic Certifications.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Groq](https://img.shields.io/badge/Groq-AI%20Inference-F55036?logo=fastapi&logoColor=white)](https://groq.com/)

---

## 🌟 Executive Overview

**LernexAI** is a modern, full-stack educational web application engineered for hands-on technical training. It combines structured computer science curricula, randomized checkpoint quizzes, a browser-proctored examination room, and verifiable academic credential issuance with an ultra-fast streaming AI Tutor.

```
                                  ┌────────────────────────┐
                                  │   Learner Experience   │
                                  │  (React 18 + Wouter)   │
                                  └───────────┬────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
         ┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
         │  Curriculum Engine  │   │  Proctored Exam Room │   │   AI Tutor Engine   │
         │  Lessons & Quizzes  │   │ 2-Strike Anti-Cheat │   │ 4-Key Groq Failover │
         └──────────┬──────────┘   └──────────┬──────────┘   └──────────┬──────────┘
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              ▼
                                 ┌────────────────────────┐
                                 │   Express API Server   │
                                 │   (Node.js + ESBuild)  │
                                 └────────────┬───────────┘
                                              │
                         ┌────────────────────┴────────────────────┐
                         ▼                                         ▼
            ┌─────────────────────────┐               ┌─────────────────────────┐
            │   Supabase PostgreSQL   │               │   Razorpay Gateway      │
            │   Auth, Progress & RLS  │               │   Secure Verification   │
            └─────────────────────────┘               └─────────────────────────┘
```

---

## 🚀 Key Platform Features

### 1. 📚 Rich Curriculum & Learning Experience
- **Structured Hierarchy**: Courses are partitioned into clear Modules, Lessons, and Checkpoint Quizzes.
- **Resilient Dual Data Layer**: Courses synchronize seamlessly with Supabase tables (`courses`, `modules`, `lessons`, `quizzes`) with high-fidelity local fallback JSON catalogs in `/Courses`.
- **Distraction-Free UI**: Responsive collapsible drawer navigation, reading progress trackers, syntax highlighting, and clean single-touch completion toggles.

### 2. 🧠 Smart Checkpoint Quizzes
- **Anti-Memorization Engine**: Employs Fisher-Yates randomization to shuffle question order and option positions dynamically on every attempt.
- **Instant Rubric Explanations**: Detailed technical explanations displayed immediately after submission.
- **Continuous Progress Tracking**: Local and cloud progress tracking to unlock subsequent topics and final exams.

### 3. 🛡️ Proctored Final Examination Room
- **Weighted 100-Mark Academic Assessment**:
  - **40 Marks**: Continuous internal assessment calculated from completed module quizzes.
  - **60 Marks**: Timed final theory examination.
- **2-Strike Anti-Cheating System**:
  - Real-time detection of tab switching, window blur, developer tools, and forbidden shortcut attempts.
  - Strike 1 issues an urgent warning; Strike 2 automatically submits the exam.
- **Dynamic Security Watermark**: Renders learner-identifying watermarks and disables browser screenshots during the active test session.

### 4. 📜 Academic-Grade Verifiable Certifications
- **Guilloche Security Design**: Certificate component designed with classical motifs, official seals, and custom certificate identification codes (`LRNX-YYYY-XXXX`).
- **Dynamic QR Code Verification**: Direct verification via `/verify?id=...` allowing employers and institutions to authenticate credentials online.
- **Print & PDF Support**: Vector-sharp print stylesheets tailored for high-resolution document export.
- **Payment Processing**: Integrated Razorpay checkout workflow for certificate claim processing.

### 5. 🤖 Streaming AI Tutor (4-Key Groq Failover)
- **Ultra-Fast Streaming**: Sub-second token delivery powered by Groq SDK (Llama 3.3 70B & 8B models).
- **Multi-Key Round-Robin Rotation**: Rotates through 4 independent API keys with automatic failover, eliminating rate limits and single-point failures.
- **Lesson-Context Aware**: Ingests current topic summaries to provide targeted explanations without leaking answers.
- **Credit Quota Management**: Built-in daily credit allocation system with plan upgrades.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Wouter |
| **Animation & UX** | Framer Motion, Canvas Confetti, Radix UI Primitives |
| **Backend** | Express 5, Node.js, TSX (Dev), ESBuild (Prod Bundle) |
| **Database & Auth** | Supabase (PostgreSQL, Row-Level Security, Auth) |
| **AI Inference** | Groq Cloud SDK, Google GenAI SDK (Gemini) |
| **Payments** | Razorpay (Node SDK & Client-Side Checkout) |
| **Utilities** | QRCode, Sonner, clsx, tailwind-merge |

---

## 📁 Repository Structure

```
lernex-ai/
├── Courses/                  # Standalone local course catalogs & fallbacks
│   ├── index.ts              # Course registry
│   ├── test-1.json           # Python Programming Masterclass
│   ├── test-2.json           # Core Java & OOP Masterclass
│   ├── test-3.json           # C Programming & Systems Architecture
│   ├── test-4.json           # Modern C++ & Object-Oriented Design
│   ├── test-5.json           # Responsive HTML5 & CSS3 Masterclass
│   ├── test-6.json           # SQL & Relational Database Architecture
│   ├── test-7.json           # Fast-Track Python & Web Sprint
│   └── test-quick.json       # 1-Click Verification Test Course
├── public/                   # Public static assets & vectors
├── scripts/                  # Curriculum generators & Supabase seeding utilities
│   ├── push_all_courses_to_supabase.ts
│   └── audit_all_courses.ts
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AcademicCertificate.tsx # Guilloche certificate renderer
│   │   ├── AIChatPanel.tsx   # Floating AI tutor assistant
│   │   ├── CourseProgressBar.tsx   # Top navigation & progress bar
│   │   ├── LessonContent.tsx # Lesson reader & completion controller
│   │   ├── ModuleSidebar.tsx # Collapsible curriculum drawer
│   │   └── QuizSection.tsx   # Randomized checkpoint quiz modal
│   ├── context/              # Global React contexts (Auth, Credits)
│   ├── lib/                  # Client utilities (Supabase, Certificates, Exams)
│   ├── pages/                # Application routes
│   │   ├── Dashboard.tsx     # Student learning dashboard
│   │   ├── Browse.tsx        # Course catalog & search
│   │   ├── Learning.tsx      # Core lesson workspace
│   │   ├── FinalExam.tsx     # Proctored examination room
│   │   ├── CertificateCheckoutPage.tsx # Certificate claim & Razorpay flow
│   │   ├── VerifyCertificate.tsx       # Public QR verification portal
│   │   └── Auth.tsx          # Authentication (Email/Password, Google)
│   ├── App.tsx               # Route declarations & protected route guards
│   ├── main.tsx              # Application DOM entry point
│   └── index.css             # Tailwind base styles & custom components
├── server.ts                 # Express backend API & Vite development proxy
├── supabase_master_schema.sql# PostgreSQL database schema & RLS policies
├── .env.example              # Environment variables template
├── package.json              # Dependencies and execution scripts
├── tailwind.config.js        # Design tokens & color palette
├── vite.config.ts            # Vite bundler configuration
└── README.md                 # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn** / **pnpm**
- A **Supabase** project (free tier works)
- At least one **Groq API Key** (from [console.groq.com](https://console.groq.com/)) or a **Gemini API Key**

---

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/lernex-ai.git
   cd lernex-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the provided `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your credentials:
   ```env
   # LLM Keys
   GROQ_API_KEY_1=gsk_your_groq_key_here
   GEMINI_API_KEY=your_gemini_key_here

   # Supabase
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

   # Payments (Optional for testing)
   RAZORPAY_KEY_ID=rzp_test_xxxx
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxx
   ```

4. **Initialize Database (Optional)**:
   Run the SQL statements in `supabase_master_schema.sql` within your Supabase SQL Editor to provision tables, foreign keys, and Row-Level Security (RLS) policies.

5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

---

## 📜 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Boots the full-stack server (`server.ts`) via `tsx` with Vite middleware |
| `npm run build` | Compiles client assets (`vite build`) and bundles backend server (`esbuild`) to `dist/server.cjs` |
| `npm run start` | Runs the compiled production server (`node dist/server.cjs`) |
| `npm run typecheck`| Runs TypeScript compiler diagnostics across all source files |
| `npm run lint` | Validates codebase against ESLint rules |

---

## 🔒 Security & Best Practices

- **Never commit `.env`**: Credentials, service role keys, and API tokens are kept out of source control.
- **Server-Side API Keys**: AI provider keys and payment secrets reside strictly on the server (`server.ts`) and are never exposed to browser bundles.
- **Client Security**: Client-side environment variables strictly use the `VITE_` prefix for safe non-sensitive configuration.
- **Proctored Integrity**: Anti-cheat triggers use tamper-resistant event observers on the window and visibility APIs.

---

## 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software in personal and commercial applications.
