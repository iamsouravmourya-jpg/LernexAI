import { useEffect, useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { MagneticButton } from './anim';

const navLinks = [
  { label: 'Courses', href: '#subjects' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'Compare', href: '#compare' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setOpen(false);
      const targetId = href.replace('#', '');
      if (location === '/') {
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        window.location.hash = targetId;
        setLocation(`/${href}`);
      }
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (location === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              setLocation('/');
            }
          }}
          className="flex items-center gap-2.5 group"
        >
          {/* Official LernexAI Logo Icon */}
          <img 
            src="/lernexai-logo.svg" 
            alt="LernexAI" 
            className="h-10 w-10 shrink-0 rounded-xl shadow-md shadow-orange-500/15 transition-transform group-hover:scale-105 object-contain" 
          />
          {/* Indian Tricolor Brand Text */}
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-[#FF671F] via-[#0437F2] to-[#046A38] bg-clip-text text-transparent">
              LernexAI
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-cyan-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button
              onClick={() => setLocation('/dashboard')}
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900 px-2 py-1"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => setLocation('/auth')}
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900 px-2 py-1"
            >
              Sign In
            </button>
          )}
          <MagneticButton
            onClick={() => setLocation(user ? '/dashboard' : '/auth')}
            className="text-xs font-black shadow-md shadow-cyan-500/20"
          >
            {user ? 'Go to Dashboard' : 'Get Started Free'}
          </MagneticButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            className="text-slate-900 p-1"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-6 py-4 md:hidden shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                setOpen(false);
                handleLinkClick(e, link.href);
              }}
              className="block py-3 text-sm font-medium text-slate-700 hover:text-cyan-600"
            >
              {link.label}
            </a>
          ))}
          {user ? (
            <button
              onClick={() => {
                setOpen(false);
                setLocation('/dashboard');
              }}
              className="mt-2 block w-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 py-3 text-center text-sm font-bold text-ink-950"
            >
              Go to Dashboard
            </button>
          ) : (
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setLocation('/auth');
                }}
                className="block w-full py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setLocation('/auth');
                }}
                className="block w-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 py-3 text-center text-sm font-bold text-ink-950"
              >
                Get Started Free
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
