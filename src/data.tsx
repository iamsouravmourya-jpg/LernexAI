import {
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Code2,
  Cpu,
  Database,
  FileText,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  Network,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Target,
  TrendingUp,
  Wifi,
  XCircle,
  Zap,
} from 'lucide-react';

export const stats = [
  { value: 7, suffix: '', label: 'Sandbox Languages', icon: Cpu },
  { value: 8, suffix: '', label: 'Course Tracks in Codebase', icon: BookOpen },
  { value: 3, suffix: '', label: 'Learning Modes', icon: MessageSquare },
  { value: 0, prefix: 'Rs.', suffix: ' FREE', label: 'Base Course Fee', icon: Zap },
];

export const trustBadges = [
  'Practical course lessons', 'Live code sandboxes', 'QR-verifiable certificates',
  'Hinglish AI Tutor', 'Course quizzes', 'Progress tracking',
  'Final assessments', 'Supabase-backed accounts',
];

export const keyBenefits = [
  { icon: Cpu, title: 'Live In-Browser Sandboxes', desc: 'Write and run supported code in your browser with course-specific practice and previews.', accent: 'from-cyan-500 to-teal-500' },
  { icon: MessageSquare, title: 'Hinglish AI Tutor', desc: 'Ask programming questions in Hindi, English, or Hinglish with lesson context when available.', accent: 'from-emerald-500 to-green-500' },
  { icon: ShieldCheck, title: 'QR-Verifiable Certificates', desc: 'Eligible certificates include a unique ID and a public verification page with course details.', accent: 'from-amber-500 to-orange-500' },
  { icon: Zap, title: 'Progress & Practice Tracking', desc: 'Keep lesson completion, quizzes, final assessments, and certificate records connected to your account.', accent: 'from-rose-500 to-pink-500' },
];

export const problems = [
  { icon: Clock, title: 'Long Passive Lessons', desc: 'Watching tutorials without practice makes it difficult to retain concepts or build confidently.' },
  { icon: FileText, title: 'Theory Without Practice', desc: 'Reading concepts is only the beginning; learners also need a place to write and test code.' },
  { icon: Lightbulb, title: 'No Instant Doubt Support', desc: 'A stuck learner needs contextual guidance instead of waiting for a generic forum reply.' },
  { icon: Award, title: 'Unverifiable Certificates', desc: 'A completion record is more useful when its certificate details can be checked publicly.' },
];

export const featuredCourses = [
  { id: 'course-test-1-python', title: 'Python Programming Masterclass', instructor: 'LernexAI course catalog', duration: '24 Hours', level: 'Beginner', rating: 0, learners: 'Interactive Sandbox', price: 'Rs.0 FREE', originalPrice: '', tags: ['Python 3', 'OOP', 'Data Structures', 'Algorithms'], color: 'from-cyan-600 to-teal-600', icon: Code2 },
  { id: 'course-test-2-java', title: 'Complete Core Java & OOP Masterclass', instructor: 'LernexAI course catalog', duration: '32 Hours', level: 'Intermediate', rating: 0, learners: 'Interactive Sandbox', price: 'Rs.0 FREE', originalPrice: '', tags: ['Core Java', 'JVM Internals', 'OOP Pillars', 'Collections'], color: 'from-amber-600 to-orange-600', icon: Cpu },
  { id: 'course-test-3-c', title: 'Mastering C Programming & Systems Architecture', instructor: 'LernexAI course catalog', duration: '36 Hours', level: 'Intermediate', rating: 0, learners: 'Interactive Sandbox', price: 'Rs.0 FREE', originalPrice: '', tags: ['C99 / C11', 'Memory Layout', 'Pointers', 'Data Structures'], color: 'from-blue-600 to-indigo-600', icon: Server },
  { id: 'course-test-4-cpp', title: 'Mastering Modern C++ & Object-Oriented Architecture', instructor: 'LernexAI course catalog', duration: '45 Hours', level: 'Intermediate', rating: 0, learners: 'Interactive Sandbox', price: 'Rs.0 FREE', originalPrice: '', tags: ['Modern C++20', 'Smart Pointers', 'STL Containers', 'Game OOP'], color: 'from-purple-600 to-indigo-600', icon: Layers },
  { id: 'course-test-5-html-css', title: 'Modern Responsive Web Design: HTML5 & CSS3 Masterclass', instructor: 'LernexAI course catalog', duration: '38 Hours', level: 'Beginner', rating: 0, learners: 'Live Web Preview', price: 'Rs.0 FREE', originalPrice: '', tags: ['HTML5 Semantic', 'CSS Grid', 'Flexbox', 'Responsive UI'], color: 'from-emerald-600 to-teal-600', icon: Palette },
  { id: 'course-test-6-sql', title: 'Mastering SQL & Relational Database Architecture', instructor: 'LernexAI course catalog', duration: '40 Hours', level: 'Beginner', rating: 0, learners: 'Interactive DB Engine', price: 'Rs.0 FREE', originalPrice: '', tags: ['PostgreSQL / MySQL', 'JOINs', 'Indexing', 'ACID Transactions'], color: 'from-rose-600 to-orange-600', icon: Database },
];

export const subjects = [
  { name: 'Coding & Development', icon: Code2, courses: 0, color: 'bg-cyan-500' },
  { name: 'Data & Analytics', icon: BarChart3, courses: 0, color: 'bg-amber-500' },
  { name: 'AI & Machine Learning', icon: Brain, courses: 0, color: 'bg-sky-500' },
  { name: 'Design & Frontend', icon: Palette, courses: 0, color: 'bg-emerald-500' },
];

export const features = [
  { icon: Brain, title: 'Learning Records in One Place', desc: 'Use lesson context, quizzes, progress records, and the AI Tutor together during a course.', points: ['Lesson progress tracking', 'Module quizzes', 'Final assessment flow'] },
  { icon: Cpu, title: 'Real-Time Code Practice', desc: 'Write and test supported code directly in the browser with course-specific feedback and previews.', points: ['JavaScript / Node.js', 'Python, Java, C, C++', 'HTML/CSS and SQL'] },
  { icon: MessageSquare, title: 'Hinglish AI Tutor', desc: 'Ask questions in Hindi, English, or Hinglish and include the current lesson context when asking.', points: ['Natural language queries', 'Code-aware explanations', 'Current lesson context'] },
  { icon: ShieldCheck, title: 'QR-Verifiable Certificates', desc: 'Certificate IDs can be checked through the public verification page with course and assessment details.', points: ['Unique certificate ID', 'Public verification page', 'Course and score details'] },
];

export const howItWorks = [
  { step: '01', title: 'Choose a Course', desc: 'Start with one of the course tracks currently available in the LernexAI catalog.', icon: Target },
  { step: '02', title: 'Complete Lessons & Quizzes', desc: 'Work through structured lessons and module quizzes while your progress is recorded.', icon: Rocket },
  { step: '03', title: 'Practice in the Sandbox', desc: 'Use the browser sandbox modes supported by the course to test concepts as you learn.', icon: Cpu },
  { step: '04', title: 'Assess & Verify', desc: 'Complete the final assessment and use the public certificate verification page when eligible.', icon: Award },
];

export const certificateFeatures = [
  { icon: ShieldCheck, text: 'Unique certificate ID with QR code' },
  { icon: Globe, text: 'Linked to a public verification page' },
  { icon: Lock, text: 'Public verification details' },
  { icon: Award, text: 'Checkable from any web browser' },
];

export const pricingPlans = [
  { name: 'Free Plan', price: 'Rs.0', period: 'Forever Free', desc: 'Explore curated courses and daily interactive learning.', features: ['Free foundational courses', '10 daily AI Tutor questions', 'Course progress tracking', 'Available lesson sandboxes'], cta: 'Start Learning Free', popular: false },
  { name: 'Pro Plan', price: 'Rs.499', period: '30 Days + 3 Days Free', desc: 'More AI Tutor capacity and access to Pro features.', features: ['Access to Pro course features', '50 daily AI Tutor queries', 'AI Course Studio access where enabled', 'Manual one-time payment', 'No automatic renewal'], cta: 'Get Pro Access', popular: true },
  { name: 'AI Chat Credits', price: 'Rs.49 - Rs.299', period: '1-Year Validity', desc: 'Top-up packs for additional AI Tutor questions.', features: ['20, 50, 100, or 200 chat packs', 'Valid for 365 days', 'Razorpay checkout', 'Works with Free and Pro plans'], cta: 'Buy Credits', popular: false },
];

export const testimonials = [
  { name: 'Course lessons', role: 'Available now', avatar: 'CL', color: 'bg-cyan-500', text: 'Follow structured lessons across Python, Java, C, C++, web design, and SQL with practical exercises.', rating: 0 },
  { name: 'Interactive sandboxes', role: 'Available now', avatar: 'IS', color: 'bg-emerald-500', text: 'Run supported code directly in the browser with JavaScript, Python, Java, C, C++, HTML/CSS, and SQL modes.', rating: 0 },
  { name: 'AI Tutor', role: 'Authenticated learners', avatar: 'AI', color: 'bg-amber-500', text: 'Ask programming questions in English, Hindi, or Hinglish with lesson context included in the request.', rating: 0 },
  { name: 'Assessments', role: 'Course completion flow', avatar: 'AS', color: 'bg-rose-500', text: 'Module quizzes and proctored final assessments support the course completion flow.', rating: 0 },
  { name: 'Progress records', role: 'Supabase-backed accounts', avatar: 'PR', color: 'bg-teal-500', text: 'Authenticated learners can keep profile, course progress, quiz, and certificate records connected to their account.', rating: 0 },
  { name: 'Support desk', role: 'Help Center', avatar: 'SD', color: 'bg-sky-500', text: 'Submit course, account, billing, or technical requests through the Help Center and follow ticket status.', rating: 0 },
];

export const faqs = [
  { q: 'Which courses are currently available?', a: 'The current catalog includes Python, Java, C, C++, HTML/CSS, SQL, and test/quick verification tracks. The Browse page is the source of truth for availability.' },
  { q: 'How does Pro access work?', a: 'Pro access starts through a manual Razorpay payment. The current plan lists 30 days plus 3 bonus days; check the payment screen for the active offer.' },
  { q: 'What does LernexAI include?', a: 'LernexAI combines structured lessons, quizzes, browser sandboxes, an AI Tutor, progress tracking, and a final assessment flow.' },
  { q: 'Can certificates be verified?', a: 'Eligible certificates include a unique certificate ID and can be checked through the public verification page with course and assessment details.' },
  { q: 'What languages can I use with the AI Tutor?', a: 'The AI Tutor accepts English, Hindi, and Hinglish questions and uses current lesson context when available.' },
];

export const footerLinks = {
  Platform: ['All Courses', 'Learning Paths', 'Live Sandboxes', 'AI Tutor', 'Certificates'],
  Company: ['About Founder', 'Blog', 'Contact'],
  Resources: ['Help Center', 'API Docs', 'Status Page', 'System Requirements'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
};

export const aiDemoSteps = [
  { label: 'User asks', text: 'React mein useEffect cleanup function kaise likhe?', type: 'user' as const },
  { label: 'AI responds', text: 'Cleanup function component unmount ya dependency change par run hota hai. Example:', type: 'ai' as const },
  { label: 'AI shows code', text: `useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);`, type: 'code' as const },
  { label: 'AI explains', text: 'clearInterval(id) cleanup hai, jo interval ko clear karta hai aur memory leak prevent karta hai.', type: 'ai' as const },
];

export const useCases = [
  { icon: GraduationCap, title: 'Students & Beginners', desc: 'Build foundational programming skills with structured lessons, quizzes, and sandbox practice.', stat: 'Course foundations', accent: 'from-cyan-500 to-teal-500' },
  { icon: Briefcase, title: 'Working Professionals', desc: 'Practice modern programming concepts in focused sessions around your schedule.', stat: 'Self-paced learning', accent: 'from-emerald-500 to-green-500' },
  { icon: Building2, title: 'Self-Learners & Coders', desc: 'Ask the AI Tutor for contextual help when you hit a bug or syntax issue.', stat: 'Contextual AI help', accent: 'from-amber-500 to-orange-500' },
  { icon: Rocket, title: 'Career Switchers', desc: 'Start from the fundamentals and build confidence through guided practice.', stat: 'Beginner-friendly tracks', accent: 'from-rose-500 to-pink-500' },
];

export const featureMatrix: { feature: string; icon: typeof Cpu; lernex: boolean; udemy: boolean | 'partial'; coursera: boolean | 'partial'; youtube: boolean }[] = [
  { feature: 'Live Code Sandboxes', icon: Cpu, lernex: true, udemy: false, coursera: false, youtube: false },
  { feature: 'Hinglish AI Tutor', icon: MessageSquare, lernex: true, udemy: false, coursera: false, youtube: false },
  { feature: 'Progress Tracking', icon: Brain, lernex: true, udemy: 'partial', coursera: true, youtube: false },
  { feature: 'QR-Verifiable Certificates', icon: ShieldCheck, lernex: true, udemy: false, coursera: false, youtube: false },
  { feature: 'Course Assessments', icon: Layers, lernex: true, udemy: 'partial', coursera: true, youtube: false },
  { feature: 'Free Base Courses', icon: Zap, lernex: true, udemy: false, coursera: false, youtube: true },
];

export const metricsROI = [
  { icon: TrendingUp, value: 0, suffix: 'Rs.', label: 'Base Course Fee', desc: 'The listed foundational courses are free.' },
  { icon: Clock, value: 7, suffix: '', label: 'Sandbox Languages', desc: 'Practice modes currently supported by the browser sandbox.' },
  { icon: MessageSquare, value: 3, suffix: '', label: 'Learning Modes', desc: 'Lessons, quizzes, and final assessments work together.' },
  { icon: ShieldCheck, value: 1, suffix: '-ID', label: 'Certificate Verification', desc: 'Eligible certificates include a unique ID and public lookup.' },
];

export const learningPathSteps = [
  { week: 'Start', title: 'Foundation', desc: 'Learn core concepts, syntax, and fundamentals from a selected course.', icon: BookOpen, color: 'from-cyan-500 to-teal-500' },
  { week: 'Practice', title: 'Build & Practice', desc: 'Use lessons, quizzes, and browser sandboxes to apply what you learn.', icon: Cpu, color: 'from-emerald-500 to-green-500' },
  { week: 'Assess', title: 'Final Assessment', desc: 'Review your progress and complete the course assessment flow.', icon: Layers, color: 'from-amber-500 to-orange-500' },
  { week: 'Verify', title: 'Certificate Check', desc: 'Use the public verification page for eligible certificates.', icon: Award, color: 'from-rose-500 to-pink-500' },
];

export const comparisonData = {
  lernex: { name: 'LernexAI', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', points: ['Structured lessons and quizzes', 'Browser-based code practice', 'Hinglish AI Tutor support', 'Progress and assessment records', 'Public certificate verification where eligible'] },
  others: { name: 'Other learning options', color: 'text-slate-400', bg: 'bg-white/5', border: 'border-white/10', points: ['Features vary by platform', 'Some require local setup', 'Support depends on the provider', 'Credentials and assessment models vary', 'Compare the workflow before choosing'] },
};

export const techStack = [
  { icon: Code2, name: 'React', color: 'text-cyan-400' },
  { icon: GitBranch, name: 'TypeScript', color: 'text-amber-400' },
  { icon: Server, name: 'Node.js', color: 'text-emerald-400' },
  { icon: Database, name: 'Supabase', color: 'text-sky-400' },
  { icon: Wifi, name: 'Vite', color: 'text-rose-400' },
  { icon: Palette, name: 'Tailwind CSS', color: 'text-teal-400' },
  { icon: Brain, name: 'Groq AI', color: 'text-orange-400' },
  { icon: Network, name: 'Razorpay', color: 'text-pink-400' },
];

export const partnerLogos: string[] = [];
