import React from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Compass, 
  X, 
  Clock, 
  BookOpen,
  ArrowRight
} from "lucide-react";

interface AiBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export default function AiBuilderModal({ isOpen, onClose, initialTopic = "" }: AiBuilderModalProps) {
  const [, setLocation] = useLocation();

  if (!isOpen) return null;

  const handleBrowseRedirect = () => {
    onClose();
    setLocation("/browse");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl z-10 p-6 sm:p-8 text-center"
        >
          {/* Close Icon in Top Right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-teal-500/20 to-emerald-500/20 border border-teal-500/30 text-teal-600 dark:text-teal-400">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Coming Soon</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            AI Course Creator is Coming Soon!
          </h2>

          {/* Subtitle / Description */}
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
            Custom AI course generation with instant sandboxes and personalized curricula is currently under active development.
          </p>

          {initialTopic && (
            <div className="mt-4 p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-800 dark:text-teal-200">
              <span className="font-semibold text-teal-900 dark:text-teal-100">Requested Topic: </span>
              <span className="italic font-bold">"{initialTopic}"</span>
            </div>
          )}

          {/* Highlights */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <BookOpen className="w-4 h-4 text-teal-500" />
              <span>Explore 6 Live Masterclasses in the meantime</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              You can start learning immediately with our full-depth live courses including Python, JavaScript, DSA, SQL, and React.
            </p>
          </div>

          {/* Bottom Action Buttons: Close & Browse Courses */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm transition cursor-pointer shadow-sm"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleBrowseRedirect}
              className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Browse Courses</span>
              <ArrowRight className="w-4 h-4 ml-auto sm:ml-0" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
