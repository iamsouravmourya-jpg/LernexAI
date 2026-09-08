import { useState, useEffect } from "react";
import { useAuth, isDemoUser } from "@/context/AuthContext";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Phone,
  ArrowLeft,
  LogIn,
  Eye,
  EyeOff,
  Terminal,
  Bot,
  Award,
  ArrowRight,
  Shield,
} from "lucide-react";
import { MeshGradientBackground, PageEffects, GradientText } from "@/components/anim";

export default function Auth() {
  const { login, signup, loginWithGoogle, logout, user } = useAuth();
  const [, setLocation] = useLocation();

  // Detect ?mode=signup or #signup from URL
  const [isSignUp, setIsSignUp] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("mode") === "signup" || params.get("trial") === "true" || window.location.hash === "#signup";
    }
    return false;
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    // If URL has ?logout=true or ?switch=true, purge session immediately
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    if (params?.get("logout") === "true" || params?.get("switch") === "true") {
      void logout();
      return;
    }

    // Only redirect if a REAL user is logged in
    if (user && !isDemoUser(user)) {
      setLocation("/dashboard", { replace: true });
    }
  }, [user, setLocation, logout]);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const nextPath = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("next")
    : null;


  const handleGoogleLogin = async () => {
    try {
      setError("");
      setGoogleLoading(true);
      await loginWithGoogle();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google login failed";
      setError(message);
      setGoogleLoading(false);
    }
  };

  if (user && !isDemoUser(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 relative overflow-hidden">
        <MeshGradientBackground />
        <div className="relative z-10 text-center">
          <div className="relative mx-auto mb-6 h-16 w-16">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
            <div className="relative h-16 w-16 rounded-full border-4 border-cyan-500/30 border-t-cyan-600 animate-spin" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            <GradientText>Redirecting to Dashboard...</GradientText>
          </h2>
          <p className="mt-2 text-sm text-slate-600">Syncing your learning sandboxes and progress</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && !termsAccepted) {
      setError("Please accept the Terms of Service and Privacy Policy to proceed with your trial.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const result = await signup(email, password, firstName, lastName, phone);
        if (!result.sessionCreated) {
          setError("Account created! Check your email to verify, then sign in to begin your trial.");
          setIsSignUp(false);
          setIsLoading(false);
          return;
        }
      } else {
        await login(email, password);
      }

      setLocation("/dashboard", { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed. Please check your credentials.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-800">
      {/* Background Ambient FX */}
      <MeshGradientBackground />
      <PageEffects />
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-10" />

      {/* LEFT SIDE - IMMERSIVE VALUE HIGHLIGHTS */}
      <div className="relative z-10 hidden lg:flex flex-1 flex-col justify-between p-12 lg:p-16 border-r border-slate-200 bg-white/70 backdrop-blur-md overflow-hidden">
        {/* Glow orbs behind left side */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-10 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />

        {/* Top bar with back to home */}
        <div>
          <Link href="/">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-500/50 hover:bg-slate-50 hover:text-cyan-700 cursor-pointer">
              <ArrowLeft className="h-3.5 w-3.5 text-cyan-600" />
              <span>Back to LernexAI</span>
            </span>
          </Link>
        </div>

        {/* Core Value Statement with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="my-auto max-w-xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 px-4 py-1.5 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
            <span className="text-xs font-semibold text-cyan-800">Next-Gen AI Interactive Academy</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-slate-900">
            Learn with speed. <br />
            <GradientText>Build with confidence.</GradientText>
          </h1>

          <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
            Experience real hands-on learning with zero boring video lectures. Code in live browser sandboxes, consult our 24/7 AI Tutor in English & Hinglish, and earn QR-verified certificates.
          </p>

          {/* Animated Feature Cards */}
          <div className="space-y-3 pt-4">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-cyan-500/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">24/7 Socratic AI Tutor</h4>
                <p className="text-xs text-slate-500">Contextual hints, code reviews, and bilingual explanations</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-emerald-500/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Live In-Browser Sandboxes</h4>
                <p className="text-xs text-slate-500">Zero setup cloud IDE for Python, TypeScript, React, and SQL</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:border-purple-500/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Tamper-Proof QR Certificates</h4>
                <p className="text-xs text-slate-500">Verifiable credentials you can proudly showcase to employers</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust & Support Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-slate-700">24/7 AI Mentorship & Live Sandboxes</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Shield className="h-3.5 w-3.5 text-cyan-600" />
            <span>256-bit encrypted auth</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - INTERACTIVE ANIMATED AUTH CARD */}
      <div className="relative z-10 flex flex-1 items-center justify-center p-6 sm:p-10 lg:p-14 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[460px]"
        >
          {/* Mobile Back Link */}
          <div className="mb-6 lg:hidden">
            <Link href="/">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:text-cyan-700 cursor-pointer">
                <ArrowLeft className="h-3.5 w-3.5 text-cyan-600" />
                <span>Back to Home</span>
              </span>
            </Link>
          </div>

          {/* Main Container */}
          <div className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl hover:border-cyan-500/40 transition-all duration-300">
            {/* TAB SELECTOR WITH FRAMER MOTION */}
            <div className="mb-6 flex rounded-2xl border border-slate-200 bg-slate-100 p-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                }}
                className={`relative flex-1 py-2.5 text-xs font-bold transition-all rounded-xl cursor-pointer ${
                  !isSignUp ? "text-slate-900 font-black" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {!isSignUp && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute inset-0 rounded-xl bg-white shadow-sm border border-slate-200/80"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  <LogIn className="h-3.5 w-3.5 text-cyan-700" />
                  Sign In
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                }}
                className={`relative flex-1 py-2.5 text-xs font-bold transition-all rounded-xl cursor-pointer ${
                  isSignUp ? "text-slate-900 font-black" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {isSignUp && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute inset-0 rounded-xl bg-white shadow-sm border border-slate-200/80"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-700" />
                  Start Free Trial
                </span>
              </button>
            </div>

            {/* Heading & Subtitle */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                {isSignUp ? (
                  <span>
                    Start Your <GradientText>14-Day Free Trial</GradientText>
                  </span>
                ) : (
                  <span>
                    Welcome <GradientText>Back</GradientText>
                  </span>
                )}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                {isSignUp
                  ? "Zero credit card required. Full instant access to courses, AI tutor, and sandboxes."
                  : "Sign in to resume your active learning path and projects."}
              </p>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-800"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue with Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading || googleLoading || (isSignUp && !termsAccepted)}
              className={`w-full h-11 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all mb-5 cursor-pointer shadow-sm ${
                isSignUp && !termsAccepted
                  ? "border-red-200 bg-red-50 text-slate-400 cursor-not-allowed"
                  : googleLoading
                  ? "border-cyan-400 bg-cyan-50 text-cyan-800 cursor-wait"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-cyan-400 active:scale-[0.98]"
              }`}
            >
              <svg className={`h-4 w-4 shrink-0 ${googleLoading ? "animate-spin" : ""}`} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
                <path fill="#EA4335" d="M12 4.81c1.6 0 3.04.55 4.19 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>
                {googleLoading
                  ? "Connecting to Google..."
                  : isSignUp && !termsAccepted
                  ? "Accept Terms below to continue with Google"
                  : "Continue with Google"}
              </span>
            </button>

            {/* Divider */}
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-center">
                <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {isSignUp ? "or start trial with email" : "or continue with email"}
                </span>
              </div>
            </div>

            {/* Email/Password Form with Transitions */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <AnimatePresence initial={false}>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3.5 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          First Name
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3 text-slate-400">
                            <User className="h-4 w-4 text-cyan-600" />
                          </span>
                          <input
                            type="text"
                            placeholder="Sourav"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full pl-10 pr-3 h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/10 transition-all"
                            required={isSignUp}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Maurya"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-3 h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/10 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <div className="flex items-center">
                        <div className="flex items-center gap-1 px-3 h-10 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs font-bold text-slate-700">
                          <span>🇮🇳 +91</span>
                        </div>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <Phone className="h-4 w-4 text-cyan-600" />
                          </span>
                          <input
                            type="tel"
                            placeholder="9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            className="w-full pl-9 pr-3 h-10 rounded-r-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/10 transition-all"
                            required={isSignUp}
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400">
                    <Mail className="h-4 w-4 text-cyan-600" />
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/10 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400">
                    <Lock className="h-4 w-4 text-cyan-600" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={isSignUp ? "Create secure password" : "Enter your password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/10 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox for Sign Up */}
              {isSignUp && (
                <div
                  className={`p-3 rounded-xl border transition-all ${
                    !termsAccepted
                      ? "border-red-200 bg-red-50"
                      : "border-emerald-200 bg-emerald-50"
                  }`}
                >
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                    />
                    <span className="text-[11px] text-slate-700 leading-relaxed font-medium">
                      I agree to the{" "}
                      <Link href="/terms" className="text-cyan-700 font-bold hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-cyan-700 font-bold hover:underline">
                        Privacy Policy
                      </Link>
                      . Includes 14-day free trial.
                      {!termsAccepted && (
                        <span className="block text-red-600 font-bold mt-0.5">
                          Please accept to activate your trial.
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={(isSignUp && !termsAccepted) || isLoading}
                className={`w-full h-11 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  (isSignUp && !termsAccepted) || isLoading
                    ? "border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white font-bold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? "Activate 14-Day Free Trial" : "Log In to Dashboard"}</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Toggle Note */}
            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => {
                  const nextState = !isSignUp;
                  setIsSignUp(nextState);
                  setTermsAccepted(false);
                  setError("");
                }}
                className="text-xs text-slate-500 hover:text-cyan-700 transition-colors cursor-pointer"
              >
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <strong className="text-cyan-700 font-bold underline underline-offset-4">
                      Sign in here
                    </strong>
                  </>
                ) : (
                  <>
                    New to LernexAI?{" "}
                    <strong className="text-cyan-700 font-bold underline underline-offset-4">
                      Start 14-Day Free Trial
                    </strong>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
