import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowUp } from "lucide-react";

/**
 * ScrollToTop
 * 1. Automatically scrolls to top (or to hash target) on every route navigation.
 * 2. Provides a sleek, floating "Back to Top" button when scrolled down.
 */
export default function ScrollToTop() {
  const [location] = useLocation();
  const [showButton, setShowButton] = useState(false);

  // 1. Reset scroll position on route change
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const targetId = hash.replace("#", "");
      // Allow the DOM of the target page a frame to mount
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    // Standard route change: immediately jump to the absolute top
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location]);

  // 2. Track scroll position for the floating button
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowButton(window.scrollY > 350);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      id="global-scroll-to-top"
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center h-11 w-11 rounded-full border border-cyan-500/30 bg-ink-900/90 text-cyan-400 shadow-xl shadow-cyan-950/50 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500 hover:text-ink-950 active:scale-95 ${
        showButton
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      title="Back to top"
    >
      <ArrowUp className="h-5 w-5 stroke-[2.5]" />
    </button>
  );
}
