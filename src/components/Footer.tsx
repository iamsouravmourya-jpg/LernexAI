import { useState } from 'react';
import { footerLinks } from '../data';
import { useAuth } from '@/context/AuthContext';
import { GraduationCap, Twitter, Linkedin, Youtube, Instagram, Mail, MapPin, Smartphone, Apple, CheckCircle2, Loader2 } from 'lucide-react';
import { useLocation } from 'wouter';
import { Reveal, MagneticButton } from './anim';

export default function Footer() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error('Subscription could not be saved. Please try again.');
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Subscription could not be saved.');
    }
  };

  const getLinkRoute = (label: string): string | null => {
    switch (label) {
      // Platform
      case 'All Courses':
        return '/browse';
      case 'Learning Paths':
        return '/learning-paths';
      case 'Live Sandboxes':
        return '/sandboxes';
      case 'AI Tutor':
        return '/ai-tutor';
      case 'Certificates':
        return '/verify';
      case 'Mobile App':
        return '/mobile-app';

      // Company
      case 'About Founder':
      case 'About Us':
        return '/about-founder';
      case 'Careers':
        return '/careers';
      case 'Blog':
        return '/blog';
      case 'Press Kit':
        return '/press';
      case 'Contact':
        return '/contact';
      case 'Investors':
        return '/investors';

      // Resources
      case 'Help Center':
        return user ? '/support' : '/auth?next=/support';
      case 'Community Forum':
        return '/community';
      case 'API Docs':
        return '/docs';
      case 'Status Page':
        return '/status';
      case 'System Requirements':
        return '/system-requirements';
      case 'Scholarships':
        return '/scholarships';

      // Legal
      case 'Privacy Policy':
        return '/privacy';
      case 'Terms of Service':
        return '/terms';
      case 'Cookie Policy':
        return '/cookies';
      case 'Refund Policy':
        return '/refund';
      case 'Accessibility':
        return '/accessibility';
      case 'GDPR':
        return '/gdpr';
      default:
        return null;
    }
  };
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-ink-950 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Newsletter band */}
        <Reveal variant="up">
          <div className="mb-16 grid items-center gap-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-r from-cyan-500/10 via-emerald-500/5 to-cyan-500/10 dark:from-cyan-500/5 dark:to-emerald-500/5 p-8 shadow-sm dark:shadow-none lg:grid-cols-2 lg:p-12">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Get weekly <span className="text-cyan-600 dark:text-cyan-400">learning tips</span> in your inbox
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Get actionable advice, new course alerts, and practical coding tips delivered to your inbox.
              </p>
            </div>
            <div>
              {status === 'success' ? (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 p-5 text-emerald-800 dark:text-emerald-300 animate-fade-in shadow-sm">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="text-sm font-bold">Thanks for subscribing!</div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-400/80">You're on the list for weekly learning tips & course updates.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="you@email.com"
                      disabled={status === 'submitting'}
                      className="flex-1 rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-ink-800 px-5 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-colors focus:border-cyan-500/60 dark:focus:border-cyan-500/40 shadow-sm dark:shadow-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-7 py-3.5 text-sm font-bold text-ink-950 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-ink-950" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="px-3 text-xs font-semibold text-rose-500 dark:text-rose-400 animate-fade-in">
                      {errorMsg}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </Reveal>

        {/* Main footer grid */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/');
              }}
              className="flex items-center gap-2.5 group text-slate-900"
            >
              {/* Official LernexAI Logo Icon */}
              <img 
                src="/lernexai-logo.svg" 
                alt="LernexAI" 
                className="h-10 w-10 shrink-0 rounded-xl shadow-md shadow-orange-500/15 transition-transform group-hover:scale-105 object-contain" 
              />
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-[#FF671F] via-[#0437F2] to-[#046A38] bg-clip-text text-transparent">
                LernexAI
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Master practical skills with interactive AI. Learn by doing, not by watching.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4 text-cyan-600 dark:text-cyan-400/60" />
                <button onClick={() => setLocation(user ? '/support' : '/auth?next=/support')} className="text-left hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Contact support through Help Center
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400/60" />
                Delhi, India
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {[Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="/about-founder"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 shadow-sm dark:shadow-none transition-colors hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* App badges (Under Development - Coming Soon) */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setLocation('/mobile-app')}
                className="group relative flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2 text-slate-700 dark:text-slate-300 shadow-sm transition-all hover:border-cyan-500/40 hover:shadow-md"
                title="iOS App in Active Development"
              >
                <Apple className="h-5 w-5 text-slate-800 dark:text-slate-200" />
                <div className="text-left">
                  <div className="text-[9px] font-medium text-slate-500 dark:text-slate-400">Download on the</div>
                  <div className="text-xs font-bold leading-tight">App Store</div>
                </div>
                <span className="ml-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 px-2 py-0.5 text-[9px] font-extrabold text-cyan-800 dark:text-cyan-300 border border-cyan-300/50 dark:border-cyan-500/30">
                  Soon
                </span>
              </button>

              <button
                type="button"
                onClick={() => setLocation('/mobile-app')}
                className="group relative flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3.5 py-2 text-slate-700 dark:text-slate-300 shadow-sm transition-all hover:border-cyan-500/40 hover:shadow-md"
                title="Android App in Active Development"
              >
                <Smartphone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div className="text-left">
                  <div className="text-[9px] font-medium text-slate-500 dark:text-slate-400">Get it on</div>
                  <div className="text-xs font-bold leading-tight">Google Play</div>
                </div>
                <span className="ml-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 text-[9px] font-extrabold text-emerald-800 dark:text-emerald-300 border border-emerald-300/50 dark:border-emerald-500/30">
                  Soon
                </span>
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-4 text-sm font-bold text-slate-900 dark:text-white">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => {
                    const route = getLinkRoute(link);
                    return (
                      <li key={link}>
                        {route ? (
                          <button
                            onClick={() => setLocation(route)}
                            className="text-left text-sm text-slate-600 dark:text-slate-400 transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                          >
                            {link}
                          </button>
                        ) : (
                          <a
                            href="#"
                            className="text-sm text-slate-600 dark:text-slate-400 transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                          >
                            {link}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 dark:border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 LernexAI Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">Made with care in Delhi, India</span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
