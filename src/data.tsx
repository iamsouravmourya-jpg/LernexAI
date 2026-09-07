import {
  Code2, Palette, BarChart3, Megaphone, Camera, Briefcase,
  Brain, Cpu, ShieldCheck, Zap, Users, Clock,
  TrendingUp, MessageSquare, FileText, Award, Globe,
  BookOpen, Target, Lightbulb, Rocket, Lock,
  GraduationCap, Building2, Layers, GitBranch,
  Server, Smartphone, Database, Wifi,
  Network, Gauge, Repeat,
} from 'lucide-react';

export const stats = [
  { value: 100, suffix: '%', label: 'Practical Sandboxes', icon: Cpu },
  { value: 20, suffix: '+', label: 'AI Curated Courses', icon: BookOpen },
  { value: 24, suffix: '/7', label: 'Hinglish AI Tutor', icon: MessageSquare },
  { value: 0, prefix: '₹', suffix: ' FREE', label: 'Base Course Fee', icon: Zap },
];

export const trustBadges = [
  '100% Practical AI Learning',
  'Live Code Sandboxes',
  'QR-Verified Certificates',
  'Hinglish AI Tutor 24/7',
  'Instant Doubt Clearing',
  'Adaptive Learning Engine',
  'Build Real Projects',
  'Zero Setup Required',
];

export const keyBenefits = [
  {
    icon: Cpu,
    title: 'Live In-Browser Sandboxes',
    desc: 'Write and run real code in your browser — no setup, no installations, no friction. Instant feedback on every line.',
    accent: 'from-cyan-500 to-teal-500',
  },
  {
    icon: MessageSquare,
    title: 'Instant Hinglish Doubt Resolution',
    desc: 'Our AI tutor explains concepts in Hindi + English mix. Ask "ye kaise work karta hai?" and get a clear answer in seconds.',
    accent: 'from-emerald-500 to-green-500',
  },
  {
    icon: ShieldCheck,
    title: 'QR-Verified Certificates',
    desc: 'Every certificate carries a unique QR code linked to a public verification page. Authentic and tamper-proof.',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Adaptive Learning Paths',
    desc: 'The AI tracks your progress, identifies weak areas, and auto-adjusts difficulty. You always learn at the right pace.',
    accent: 'from-rose-500 to-pink-500',
  },
];

export const problems = [
  {
    icon: Clock,
    title: '20-Hour Video Dumps',
    desc: 'You sit through endless lectures, retain almost nothing, and waste weeks of your life.',
  },
  {
    icon: FileText,
    title: 'Theoretical-Only Content',
    desc: 'You watch tutorials but never touch the tools. When it\'s time to build, you freeze.',
  },
  {
    icon: Lightbulb,
    title: 'No Instant Doubt Support',
    desc: 'You get stuck at 11 PM, post on a forum, and wait 3 days for a reply that may not even help.',
  },
  {
    icon: Award,
    title: 'Fake-Looking Certificates',
    desc: 'You earn a certificate that employers ignore because anyone could have generated it.',
  },
];

export const featuredCourses = [
  {
    id: 'course-test-1-python',
    title: 'Python Programming Masterclass',
    instructor: 'AI Learning Engine',
    duration: '24 Hours',
    level: 'Beginner',
    rating: 5.0,
    learners: 'Interactive Sandbox',
    price: '₹0 FREE',
    originalPrice: 'Market Value ₹9,999',
    tags: ['Python 3', 'OOP', 'Data Structures', 'Algorithms'],
    color: 'from-cyan-600 to-teal-600',
    icon: Code2,
  },
  {
    id: 'course-test-2-java',
    title: 'Complete Core Java & OOP Masterclass',
    instructor: 'AI Learning Engine',
    duration: '32 Hours',
    level: 'Intermediate',
    rating: 5.0,
    learners: 'Interactive Sandbox',
    price: '₹0 FREE',
    originalPrice: 'Market Value ₹12,999',
    tags: ['Core Java', 'JVM Internals', 'OOP Pillars', 'Collections'],
    color: 'from-amber-600 to-orange-600',
    icon: Cpu,
  },
  {
    id: 'course-test-3-c',
    title: 'Mastering C Programming & Systems Architecture',
    instructor: 'AI Learning Engine',
    duration: '36 Hours',
    level: 'Intermediate',
    rating: 5.0,
    learners: 'Interactive Sandbox',
    price: '₹0 FREE',
    originalPrice: 'Market Value ₹14,999',
    tags: ['C99 / C11', 'Memory Layout', 'Pointers', 'Data Structures'],
    color: 'from-blue-600 to-indigo-600',
    icon: Server,
  },
  {
    id: 'course-test-4-cpp',
    title: 'Mastering Modern C++ & Object-Oriented Architecture',
    instructor: 'AI Learning Engine',
    duration: '45 Hours',
    level: 'Intermediate',
    rating: 5.0,
    learners: 'Interactive Sandbox',
    price: '₹0 FREE',
    originalPrice: 'Market Value ₹15,999',
    tags: ['Modern C++20', 'Smart Pointers', 'STL Containers', 'Game OOP'],
    color: 'from-purple-600 to-indigo-600',
    icon: Layers,
  },
  {
    id: 'course-test-5-html-css',
    title: 'Modern Responsive Web Design: HTML5 & CSS3 Masterclass',
    instructor: 'AI Learning Engine',
    duration: '38 Hours',
    level: 'Beginner',
    rating: 5.0,
    learners: 'Live Web Preview',
    price: '₹0 FREE',
    originalPrice: 'Market Value ₹8,999',
    tags: ['HTML5 Semantic', 'CSS Grid', 'Flexbox', 'Responsive UI'],
    color: 'from-emerald-600 to-teal-600',
    icon: Palette,
  },
  {
    id: 'course-test-6-sql',
    title: 'Mastering SQL & Relational Database Architecture',
    instructor: 'AI Learning Engine',
    duration: '40 Hours',
    level: 'Beginner',
    rating: 5.0,
    learners: 'Interactive DB Engine',
    price: '₹0 FREE',
    originalPrice: 'Market Value ₹11,999',
    tags: ['PostgreSQL / MySQL', 'JOINs', 'Indexing', 'ACID Transactions'],
    color: 'from-rose-600 to-orange-600',
    icon: Database,
  },
];

export const subjects = [
  { name: 'Coding & Development', icon: Code2, courses: 0, color: 'bg-cyan-500' },
  { name: 'Data & Analytics', icon: BarChart3, courses: 0, color: 'bg-amber-500' },
  { name: 'AI & Machine Learning', icon: Brain, courses: 0, color: 'bg-sky-500' },
  { name: 'Design & Frontend', icon: Palette, courses: 0, color: 'bg-emerald-500' },
];

export const features = [
  {
    icon: Brain,
    title: 'AI-Powered Personalization',
    desc: 'Our AI engine analyzes your learning patterns, identifies knowledge gaps, and creates a custom path. Every lesson adapts to your pace and style.',
    points: ['Smart difficulty adjustment', 'Weak-area identification', 'Personalized revision schedules'],
  },
  {
    icon: Cpu,
    title: 'Real-Time Code Execution',
    desc: 'No more "setup your environment" tutorials. Write, run, and debug code directly in the browser with instant feedback and AI-assisted error explanations.',
    points: ['30+ language sandboxes', 'Live AI debugging', 'Instant output preview'],
  },
  {
    icon: MessageSquare,
    title: '24/7 Hinglish AI Tutor',
    desc: 'Stuck at midnight? Our AI tutor is always available. Ask questions in Hindi, English, or Hinglish — get contextual, code-aware answers instantly.',
    points: ['Natural language queries', 'Code-aware explanations', 'Context from your current lesson'],
  },
  {
    icon: ShieldCheck,
    title: 'Blockchain-Verified Certificates',
    desc: 'Every certificate is cryptographically signed and QR-verifiable. Employers scan and authenticate in seconds — no more "is this real?" doubts.',
    points: ['Unique QR per certificate', 'Public verification page', 'Tamper-proof records'],
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Take a Skill Assessment',
    desc: 'A 5-minute AI-powered test evaluates your current level and identifies the perfect starting point.',
    icon: Target,
  },
  {
    step: '02',
    title: 'Get Your Personalized Path',
    desc: 'The AI creates a custom learning roadmap with daily goals, milestones, and project assignments.',
    icon: Rocket,
  },
  {
    step: '03',
    title: 'Learn by Doing',
    desc: 'Interactive lessons, live sandboxes, and real-world projects. No passive video watching.',
    icon: Cpu,
  },
  {
    step: '04',
    title: 'Earn & Verify',
    desc: 'Complete projects, pass assessments, and receive a QR-verified certificate to showcase your skills.',
    icon: Award,
  },
];

export const certificateFeatures = [
  { icon: ShieldCheck, text: 'Cryptographically signed with unique QR code' },
  { icon: Globe, text: 'Linked to a public verification page' },
  { icon: Lock, text: 'Tamper-proof — cannot be forged or duplicated' },
  { icon: Award, text: 'Publicly verifiable credential on any web browser' },
];

export const pricingPlans = [
  {
    name: 'Free Plan',
    price: '₹0',
    period: 'Forever Free',
    desc: 'Perfect for exploring curated courses and daily interactive learning.',
    features: [
      'Access to Free foundational courses',
      '10 Daily AI Mentor questions',
      'Full course progress tracking',
      'Unlimited lesson sandboxes',
    ],
    cta: 'Start Learning Free',
    popular: false,
  },
  {
    name: 'Pro Plan',
    price: '₹499',
    period: '30 Days + 3 Days Free',
    desc: 'Full AI capabilities, instant verified credentials, and custom AI courses.',
    features: [
      'Unlimited access to all courses',
      '50 Daily AI Mentor queries',
      '5 AI-Generated Custom Courses / Month',
      'Free Verified Certificates included',
      'One-time payment • No auto-debit',
    ],
    cta: 'Get Pro Access',
    popular: true,
  },
  {
    name: 'AI Chat Credits',
    price: '₹29 - ₹179',
    period: '1-Year Validity',
    desc: 'Instant top-up packs (20, 50, 100, 200 chats) with daily rollover guarantee.',
    features: [
      'Valid for full 365 Days',
      'Daily rollover of unused chats',
      'Instant balance update via Razorpay',
      'Works on both Free and Pro plans',
    ],
    cta: 'Buy Credits',
    popular: false,
  },
];

export const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Full-Stack Student',
    avatar: 'AM',
    color: 'bg-cyan-500',
    text: 'The live sandboxes were a game-changer. I went from struggling with syntax to building complete web apps. The Hinglish AI tutor literally feels like having a senior developer available 24/7.',
    rating: 5,
  },
  {
    name: 'Sneha Patel',
    role: 'Frontend Learner',
    avatar: 'SP',
    color: 'bg-emerald-500',
    text: 'I tried 3 other platforms before LernexAI. The difference is night and day — I actually build things in the browser instead of just watching passive videos.',
    rating: 5,
  },
  {
    name: 'Karan Malhotra',
    role: 'Python & Data Student',
    avatar: 'KM',
    color: 'bg-amber-500',
    text: 'The adaptive learning path is super accurate. It knows exactly where I struggle and guides me with interactive quizzes and practical tasks.',
    rating: 5,
  },
  {
    name: 'Divya Nair',
    role: 'Self-Taught Coder',
    avatar: 'DN',
    color: 'bg-rose-500',
    text: 'The QR-verified certificate is fantastic. Anyone can scan the QR code to verify my course completion and quiz scores on a public link.',
    rating: 5,
  },
  {
    name: 'Rohit Verma',
    role: 'College Student',
    avatar: 'RV',
    color: 'bg-teal-500',
    text: 'LernexAI helps me practice code directly in my browser. The sandboxes let me build real portfolio projects that speak louder than textbook theory.',
    rating: 5,
  },
  {
    name: 'Ananya Iyer',
    role: 'AI & Web Learner',
    avatar: 'AI',
    color: 'bg-sky-500',
    text: 'The AI tutor explained complex JavaScript closures in Hinglish and it finally clicked after months of confusion. Highly recommended!',
    rating: 5,
  },
];

export const faqs = [
  {
    q: 'Are the foundational courses really ₹0 Free?',
    a: 'Yes! All core AI-curated courses are 100% Free with interactive browser sandboxes and 10 daily AI mentor questions.',
  },
  {
    q: 'Is there any auto-debit or hidden subscription fee?',
    a: 'No! There are strictly NO auto-debits or hidden recurring charges. Every plan upgrade is a 100% manual one-time payment. Once your 33 days are complete, you choose if and when you want to extend.',
  },
  {
    q: 'How is LernexAI different from YouTube or generic platforms?',
    a: 'Instead of watching passive 20-hour video dumps, you learn by doing in live browser sandboxes with 24/7 Hinglish AI tutor guidance and QR-verified certificates.',
  },
  {
    q: 'Are the certificates really verifiable?',
    a: 'Yes! Every certificate carries a unique QR code linked to a public verification page with your name, course title, completion date, and score.',
  },
  {
    q: 'What if I get stuck at night?',
    a: 'Our AI tutor is available 24/7, understands Hinglish ("ye code kyu fail ho raha hai?"), and provides instant contextual guidance.',
  },
];

export const footerLinks = {
  Platform: ['All Courses', 'Learning Paths', 'Live Sandboxes', 'AI Tutor', 'Certificates'],
  Company: ['About Founder', 'Blog', 'Contact'],
  Resources: ['Help Center', 'API Docs', 'Status Page', 'System Requirements'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
};

export const aiDemoSteps = [
  { label: 'User asks', text: 'React mein useEffect cleanup function kaise likhe?', type: 'user' as const },
  { label: 'AI responds', text: 'Cleanup function tab run hota hai jab component unmount hota hai ya dependency change ho. Example:', type: 'ai' as const },
  { label: 'AI shows code', text: `useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);`, type: 'code' as const },
  { label: 'AI explains', text: 'Yahan clearInterval(id) cleanup hai — jab component unmount hoga, interval automatically clear ho jayega. Memory leak prevent ho gaya!', type: 'ai' as const },
];

export const useCases = [
  {
    icon: GraduationCap,
    title: 'Students & Beginners',
    desc: 'Bridge the gap between theory and industry. Build a real project portfolio in browser sandboxes.',
    stat: '100% Practical Sandboxes',
    accent: 'from-cyan-500 to-teal-500',
  },
  {
    icon: Briefcase,
    title: 'Working Professionals',
    desc: 'Upskill in modern tech stacks without quitting your job. Bite-sized AI lessons on your schedule.',
    stat: 'Self-Paced Learning',
    accent: 'from-emerald-500 to-green-500',
  },
  {
    icon: Building2,
    title: 'Self-Learners & Coders',
    desc: 'Get instant 24/7 Hinglish AI answers whenever you hit a bug or syntax issue.',
    stat: 'Instant AI Answers',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    icon: Rocket,
    title: 'Career Switchers',
    desc: 'Coming from a non-tech background? Our AI tutor starts you from zero and guides you step-by-step.',
    stat: 'Zero Prerequisites Needed',
    accent: 'from-rose-500 to-pink-500',
  },
];

export const featureMatrix: {
  feature: string;
  icon: typeof Cpu;
  lernex: boolean;
  udemy: boolean | 'partial';
  coursera: boolean | 'partial';
  youtube: boolean;
}[] = [
  {
    feature: 'Live Code Sandboxes',
    icon: Cpu,
    lernex: true,
    udemy: false,
    coursera: false,
    youtube: false,
  },
  {
    feature: '24/7 AI Tutor (Hinglish)',
    icon: MessageSquare,
    lernex: true,
    udemy: false,
    coursera: false,
    youtube: false,
  },
  {
    feature: 'Adaptive Learning Paths',
    icon: Brain,
    lernex: true,
    udemy: false,
    coursera: 'partial',
    youtube: false,
  },
  {
    feature: 'QR-Verified Certificates',
    icon: ShieldCheck,
    lernex: true,
    udemy: false,
    coursera: false,
    youtube: false,
  },
  {
    feature: 'Real-World Projects',
    icon: Layers,
    lernex: true,
    udemy: 'partial',
    coursera: true,
    youtube: false,
  },
  {
    feature: '100% Free Base Courses',
    icon: Zap,
    lernex: true,
    udemy: false,
    coursera: false,
    youtube: true,
  },
];

export const metricsROI = [
  {
    icon: TrendingUp,
    value: 0,
    suffix: '₹',
    label: 'Base Course Fee',
    desc: 'All foundational AI courses are 100% free',
  },
  {
    icon: Clock,
    value: 100,
    suffix: '%',
    label: 'Practical Learning',
    desc: 'Learn by writing real code in live browser sandboxes',
  },
  {
    icon: Gauge,
    value: 24,
    suffix: '/7',
    label: 'AI Tutor Support',
    desc: 'Instant doubt clearance in Hinglish anytime',
  },
  {
    icon: ShieldCheck,
    value: 1,
    suffix: '-Click',
    label: 'Verified Certificate',
    desc: 'Authentic QR verification for every completed course',
  },
];

export const learningPathSteps = [
  {
    week: 'Week 1-2',
    title: 'Foundation',
    desc: 'Core concepts, syntax, and fundamentals. AI assessment identifies your gaps and fills them.',
    icon: BookOpen,
    color: 'from-cyan-500 to-teal-500',
  },
  {
    week: 'Week 3-6',
    title: 'Build & Practice',
    desc: 'Hands-on projects in live sandboxes. Every lesson ends with a working, deployable project.',
    icon: Cpu,
    color: 'from-emerald-500 to-green-500',
  },
  {
    week: 'Week 7-10',
    title: 'Advanced Topics',
    desc: 'Deep dives into architecture, best practices, and production-grade patterns.',
    icon: Layers,
    color: 'from-amber-500 to-orange-500',
  },
  {
    week: 'Week 11-14',
    title: 'Capstone & Career',
    desc: 'Build a job-ready portfolio project, polish your resume, and prepare for technical interviews.',
    icon: Award,
    color: 'from-rose-500 to-pink-500',
  },
];

export const comparisonData = {
  lernex: {
    name: 'LernexAI',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    points: [
      'Learn by doing in live browser sandboxes',
      '24/7 AI tutor in Hinglish — instant answers',
      'QR-verified, cryptographically signed certificates',
      'Adaptive paths that adjust to your pace',
      'Industry-aligned project portfolio for career growth',
      'High-engagement interactive modules vs passive video dumps',
    ],
  },
  others: {
    name: 'Traditional Platforms',
    color: 'text-slate-400',
    bg: 'bg-white/5',
    border: 'border-white/10',
    points: [
      'Passive video watching — no hands-on practice',
      'Forum-based support — 2-3 day response times',
      'Generic PDF certificates anyone can forge',
      'One-size-fits-all curriculum',
      'No project guidance or real-world portfolio building',
      'Low completion rates due to passive video lectures',
    ],
  },
};

export const techStack = [
  { icon: Code2, name: 'React', color: 'text-cyan-400' },
  { icon: Server, name: 'Node.js', color: 'text-emerald-400' },
  { icon: Database, name: 'PostgreSQL', color: 'text-sky-400' },
  { icon: Smartphone, name: 'React Native', color: 'text-teal-400' },
  { icon: GitBranch, name: 'Git & CI/CD', color: 'text-amber-400' },
  { icon: Wifi, name: 'WebSockets', color: 'text-rose-400' },
  { icon: Brain, name: 'TensorFlow', color: 'text-orange-400' },
  { icon: Network, name: 'GraphQL', color: 'text-pink-400' },
];

export const partnerLogos = [
  'Razorpay', 'Swiggy', 'Flipkart', 'Zomato', 'PhonePe',
  'Paytm', 'CRED', 'Meesho', 'Groww', 'Unacademy',
];
