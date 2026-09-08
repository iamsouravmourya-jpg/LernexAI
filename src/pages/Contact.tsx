import { useState } from "react";
import { Link } from "wouter";
import { 
  Mail, 
  Send, 
  MessageSquare,
  Clock, 
  CheckCircle, 
  MapPin, 
  ArrowLeft,
  LifeBuoy,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText, 
  MagneticButton 
} from "@/components/anim";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "Course Query",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Please sign in before contacting the sales/support team.");
      const response = await fetch('/api/support/submit-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({
          category: formData.category,
          subject: formData.subject || `${formData.category} inquiry`,
          message: formData.message,
          userEmail: formData.email,
          userName: formData.name,
        }),
      });
      if (!response.ok) throw new Error('Message could not be sent. Please try again.');
      setSubmitted(true);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Message could not be sent.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-700 font-sans relative overflow-hidden">
      <PageEffects />
      <ScrollProgress />
      <Navbar />

      <main className="relative pt-28 pb-20">
        <MeshGradientBackground />

        {/* Top Header & Breadcrumb */}
        <section className="relative mx-auto max-w-7xl px-6 py-12">
          <Reveal variant="up">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/">
                <button className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-500/60 hover:text-cyan-600">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </button>
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 px-3.5 py-1 text-xs font-semibold text-cyan-700">
                <span className="relative flex h-2 w-2">
                  <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Support Team Active • Avg Response &lt; 15 mins</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Banner Card */}
          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-xl text-ink-950">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    24/7 Global Student Desk
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Get in <GradientText text="Touch" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Have questions about courses, certifications, technical doubts, or custom enterprise team plans? Our technical team is here to assist.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col gap-3">
                  <Link
                    href="/support"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-50 px-5 py-3 text-xs font-bold text-cyan-700 transition-all hover:bg-cyan-100 shadow-sm"
                  >
                    <LifeBuoy className="h-4 w-4" />
                    Open Help Center
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Main Grid: Form + Info Cards */}
        <section className="mx-auto max-w-7xl px-6 grid gap-10 lg:grid-cols-12">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7">
            <Reveal variant="up" delay={150}>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:border-cyan-500/40 transition-all">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  Fill out this quick form and our developer support team will respond directly to your email.
                </p>

                {submitted ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-50 p-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, <span className="text-cyan-700 font-semibold">{formData.name}</span>. A confirmation ticket has been logged and our mentors will reply to <span className="text-cyan-700 font-semibold">{formData.email}</span> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", category: "Course Query", message: "" });
                      }}
                      className="mt-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-cyan-500/40 shadow-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@domain.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">Inquiry Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                        >
                          <option value="Course Query">Course Curriculum & Paths</option>
                          <option value="Certificate">Certificate Verification</option>
                          <option value="Technical Sandbox">Sandbox or Code Issue</option>
                          <option value="Billing & Refund">Billing or Refund Request</option>
                          <option value="College Partnership">College / Campus Partnership</option>
                          <option value="Other">Other Query</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">Subject</label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Short summary of query"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">Message / Doubt Details *</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your query or problem in detail..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                      />
                    </div>

                    <div className="pt-2">
                      <MagneticButton className="w-full justify-center">
                        <Send className="h-4 w-4" />
                        {sending ? "Sending Message..." : "Dispatch Message to Support"}
                      </MagneticButton>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Channels & Office Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Points */}
            <Reveal variant="up" delay={200}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <LifeBuoy className="h-5 w-5 text-cyan-600" />
                  Direct Channels
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <Mail className="h-5 w-5 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-500">Founder & Student Support</span>
                      <p className="text-sm font-semibold text-slate-900">Use the Help Center ticket flow</p>
                      <p className="text-xs text-slate-500">Authenticated support requests are tracked there.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <Clock className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-500">Operating Hours</span>
                      <p className="text-sm font-semibold text-slate-900">Monday – Sunday: 9:00 AM – 11:00 PM IST</p>
                      <p className="text-xs text-slate-500">AI Tutor operates 24/7 inside your course sandbox</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <MapPin className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-500">Headquarters</span>
                      <p className="text-sm font-semibold text-slate-900">LernexAI Technologies Pvt. Ltd.</p>
                      <p className="text-xs text-slate-500">Connaught Place, New Delhi, Delhi 110001, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Help Center link card */}
            <Reveal variant="up" delay={250}>
              <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-6 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="h-6 w-6 text-cyan-600 shrink-0" />
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Looking for Instant Answers?</h4>
                    <p className="mt-1 text-xs text-slate-600">
                      Check our comprehensive Help Center FAQ database covering exam criteria, refunds, sandbox errors, and QR certificate downloads.
                    </p>
                  </div>
                </div>
                <Link href="/support">
                  <button className="mt-2 w-full rounded-full border border-cyan-500/30 bg-cyan-100 py-2.5 text-xs font-bold text-cyan-800 hover:bg-cyan-200 transition-all">
                    Browse Help Center
                  </button>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
