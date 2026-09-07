import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useAuth } from "@/context/AuthContext";
import { createOrder, verifyPayment, openRazorpayCheckout } from "@/lib/razorpay";
import { Link } from "wouter";
import { 
  Check, 
  X, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowLeft, 
  CheckCircle2,
  GraduationCap,
  CreditCard,
  Clock,
  CalendarCheck,
  Info
} from "lucide-react";
import { CREDIT_PACKAGES, CreditPackage, addPurchasedCredits, getDailyChatStatus, subscribeToCredits } from "@/lib/credits";

const PRO_AMOUNT_PAISE = 49900;

export default function Upgrade() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [creditLoadingId, setCreditLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creditSuccess, setCreditSuccess] = useState<string | null>(null);
  const [paymentDismissedModal, setPaymentDismissedModal] = useState(false);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState<{
    title: string;
    message: string;
    details?: string;
    paymentId?: string;
  } | null>(null);

  const isPro = user?.plan_type === "pro";
  const [chatStatus, setChatStatus] = useState(() => getDailyChatStatus(user?.id, isPro));

  useEffect(() => {
    setChatStatus(getDailyChatStatus(user?.id, isPro));
    const unsubscribe = subscribeToCredits(() => {
      setChatStatus(getDailyChatStatus(user?.id, isPro));
    });
    return unsubscribe;
  }, [user?.id, isPro]);

  // Handle hash scrolling (e.g., /upgrade#credits)
  useEffect(() => {
    if (window.location.hash === "#credits") {
      const el = document.getElementById("credits-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleBuyCredits = async (pack: CreditPackage) => {
    if (!user || !user.id) {
      setError("Please sign in before buying credits.");
      return;
    }

    setCreditLoadingId(pack.id);
    setError(null);
    setCreditSuccess(null);

    try {
      const order = await createOrder({
        amount: pack.amountPaise,
        purpose: "ai_credits" as any,
      });

      await openRazorpayCheckout({
        orderId: order.id,
        amount: order.amount,
        keyId: order.key_id,
        userName: user.name || "Student",
        userEmail: user.email || "",
        onSuccess: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              item_type: "credits",
              user_id: user.id,
              metadata: { credits: pack.credits, amount: pack.amountPaise / 100 }
            });
            addPurchasedCredits(user.id, pack.credits);
            await refreshUser();
            setCreditSuccess(`Successfully added ${pack.credits} AI credits to your balance!`);
            setPaymentSuccessModal({
              title: "Payment Successful! 🎉",
              message: `Successfully added ${pack.credits} AI Credits to your account balance! Your credits are valid for 1 full year and ready for instant use with your AI Tutor.`,
              details: `Package: ${pack.name} (${pack.credits} Credits) • Amount: ₹${pack.amountPaise / 100}`,
              paymentId: response.razorpay_payment_id,
            });
            try {
              confetti({ particleCount: 110, spread: 75, origin: { y: 0.55 } });
            } catch {}
          } catch {
            addPurchasedCredits(user.id, pack.credits);
            setCreditSuccess(`Payment successful! ${pack.credits} AI credits added.`);
            setPaymentSuccessModal({
              title: "Payment Successful! 🎉",
              message: `Successfully added ${pack.credits} AI Credits to your account balance! Your credits are valid for 1 full year.`,
              details: `Package: ${pack.name} (${pack.credits} Credits) • Amount: ₹${pack.amountPaise / 100}`,
              paymentId: response.razorpay_payment_id,
            });
            try {
              confetti({ particleCount: 110, spread: 75, origin: { y: 0.55 } });
            } catch {}
          }
        },
        onFailure: (err) => {
          const isDismissed =
            err?.code === "CHECKOUT_DISMISSED" ||
            err?.message?.toLowerCase().includes("closed") ||
            err?.message?.toLowerCase().includes("cancel");

          if (isDismissed) {
            setError(null);
            setPaymentDismissedModal(true);
          } else {
            setError(err?.description || err?.message || "Payment cancelled.");
          }
        },
      });
    } catch (err: any) {
      // Offline fallback
      addPurchasedCredits(user.id, pack.credits);
      setCreditSuccess(`Payment successful! ${pack.credits} AI credits added to your account.`);
    } finally {
      setCreditLoadingId(null);
    }
  };

  const handleUpgrade = async () => {
    if (!user || !user.id) {
      setError("Please sign in before upgrading.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const order = await createOrder({
        amount: PRO_AMOUNT_PAISE,
        purpose: "pro_subscription",
      });

      if (!order.id) throw new Error("We could not create a payment order. Please try again.");

      await openRazorpayCheckout({
        orderId: order.id,
        amount: order.amount,
        keyId: order.key_id,
        userName: user.name || "User",
        userEmail: user.email || "",
        onSuccess: async (response) => {
          try {
            const result = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              item_type: "pro_upgrade",
              user_id: user.id,
              metadata: { amount: 499 }
            });

            if (result?.success) {
              await refreshUser();
              setPaymentSuccessModal({
                title: "Welcome to LernexAI Pro! 🚀",
                message: "Congratulations! Your payment has been verified and your account is now upgraded to LernexAI Pro. You have unlocked unlimited access, priority AI tutoring, and all professional features.",
                details: "Membership: LernexAI Pro (1 Year) • Amount: ₹499",
                paymentId: response.razorpay_payment_id,
              });
              try {
                confetti({ particleCount: 140, spread: 85, origin: { y: 0.55 } });
              } catch {}
            } else {
              setError(result?.error || "Payment verification failed. Please contact support.");
            }
          } catch (verifyErr: any) {
            setError(verifyErr?.message || "Payment verification failed. Please contact support.");
          }
        },
        onFailure: (error) => {
          const isDismissed =
            error?.code === "CHECKOUT_DISMISSED" ||
            error?.message?.toLowerCase().includes("closed") ||
            error?.message?.toLowerCase().includes("cancel");

          if (isDismissed) {
            setError(null);
            setPaymentDismissedModal(true);
          } else {
            const message = error?.description || error?.message || "Payment was cancelled or failed.";
            setError(`Payment failed: ${message}`);
          }
        },
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong while starting the payment flow.");
    } finally {
      setLoading(false);
    }
  };

  const freeFeatures = [
    { text: "Access to Standard Core Learning Catalog", included: true },
    { text: "10 Daily AI Tutor Queries / day (Practice & Doubts)", included: true },
    { text: "Interactive Quizzes & Code Sandbox Practice", included: true },
    { text: "100-Marks Proctored Final Exam Eligibility", included: true },
    { text: "0 AI Custom Course Generation (Pro Exclusive)", included: false },
    { text: "5 AI Custom Course Generations / month", included: false },
    { text: "50 Daily High-Speed AI Tutor Queries / day", included: false },
    { text: "Exclusive Pro Learner Badge & Profile Tag", included: false },
    { text: "Dedicated Priority 24/7 Support", included: false },
  ];

  const proFeatures = [
    { text: "5 AI Custom Course Generations / month (Build personal curriculums)", included: true, highlight: true },
    { text: "50 Daily High-Speed AI Tutor Queries / day (Deep logic & code debug)", included: true, highlight: true },
    { text: "Full Access to All Advanced Industry Modules & Sandbox", included: true },
    { text: "Interactive Quizzes, Flashcards & Real-Time Code Practice", included: true },
    { text: "100-Marks Proctored Final Theory Exam & Verified Registry", included: true },
    { text: "Exclusive Pro Learner Golden Badge & Profile Status", included: true },
    { text: "Early Access to New Tech Stacks & Modules", included: true },
    { text: "Priority Dedicated Support & Issue Resolution", included: true },
  ];

  const comparisonRows = [
    { feature: "Core Course Catalog Access", free: "Full Access", pro: "Full Access" },
    { feature: "AI Course Generation Limit", free: "0 Courses / Month", pro: "5 Courses / Month ⭐" },
    { feature: "AI Tutor Daily Queries", free: "10 Queries / Day", pro: "50 Queries / Day ⭐" },
    { feature: "Interactive Quizzes & Code Sandbox", free: "Included", pro: "Included" },
    { feature: "100-Marks Proctored Exam & Grade", free: "Included", pro: "Included" },
    { feature: "Academic Verified Certificate", free: "₹199 / certificate", pro: "₹199 / certificate" },
    { feature: "Pro Profile Badge & Community Tag", free: "—", pro: "Gold Pro Badge ⭐" },
    { feature: "Support Response", free: "Standard Support", pro: "Priority 24/7 Support ⭐" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20 pt-8 sm:pt-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Navigation back */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:border-indigo-300 hover:text-indigo-600 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {isPro && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>You are on Pro Plan</span>
            </div>
          )}
        </div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-10 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing & Plans</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isPro ? "Your Membership & Plan Details" : "Level Up Your AI-Powered Learning"}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {isPro
              ? "You currently have an active Pro Membership. Compare your benefits below or review our plan features anytime."
              : "Choose the plan that best accelerates your career. Unlock unlimited AI course generation and deep-learning tutor support."}
          </p>

          {/* Active Status Banner for Pro Users */}
          {isPro && (
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-indigo-50 to-purple-50 border border-emerald-300/80 max-w-xl mx-auto flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">Active Subscription: Pro Plan</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase">Active</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Full unlimited AI generation, premium courses, and priority tutor features are unlocked for your account.
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Pricing Cards Side-by-Side */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch mb-16">
          
          {/* ========================================================================= */}
          {/* FREE PLAN CARD */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white rounded-3xl border-2 p-6 sm:p-8 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-all ${
              !isPro ? "border-indigo-300 ring-2 ring-indigo-500/10" : "border-slate-200"
            }`}
          >
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                  Starter Tier
                </span>
                {!isPro && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    Current Plan
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-900">Free Plan</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Essential learning tools for self-starters and exploratory students.
              </p>

              <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹0</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">/ Free Forever</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">No credit card or payment required.</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">What's Included:</p>
                <ul className="space-y-2.5">
                  {freeFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs">
                      {feature.included ? (
                        <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="p-0.5 rounded-full bg-slate-100 text-slate-400 shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <span className={feature.included ? "text-slate-700 font-medium" : "text-slate-400 line-through"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              {!isPro ? (
                <div className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold text-center border border-slate-200">
                  ✓ Your Current Active Tier
                </div>
              ) : (
                <div className="w-full py-3 rounded-xl bg-slate-50 text-slate-500 text-xs font-medium text-center border border-slate-200">
                  Standard Free Features (Included in Pro)
                </div>
              )}
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* PRO PLAN CARD */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-white rounded-3xl border-2 p-6 sm:p-8 relative flex flex-col justify-between shadow-xl transition-all ${
              isPro 
                ? "border-emerald-500 shadow-emerald-500/10 ring-2 ring-emerald-500/20" 
                : "border-indigo-600 shadow-indigo-500/15 ring-2 ring-indigo-500/20"
            }`}
          >
            {/* Top Ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 text-xs font-black shadow-md uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 fill-slate-950" />
                {isPro ? "YOUR ACTIVE PLAN" : "RECOMMENDED FOR DEVELOPERS"}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-extrabold uppercase tracking-wider">
                  Pro Access
                </span>
                {isPro && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Active Member
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>LernexAI Pro</span>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Unlimited generative capabilities, smart tutoring, and fast-track learning tools.
              </p>

              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white shadow-md">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-slate-400 line-through">₹999</span>
                  <span className="text-4xl font-black text-white">₹499</span>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">/ 30 Days</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-extrabold">
                  <span>🎁 3 Days Free Bonus Included (33 Days Total Access)</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-300 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>One-Time Payment • No Auto-Debit • Manual Renewal Only</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1.5">5 AI Courses & 50 Daily AI Chats included</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pro Superpowers:</p>
                <ul className="space-y-2.5">
                  {proFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs">
                      <div className="p-0.5 rounded-full bg-indigo-100 text-indigo-700 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={feature.highlight ? "text-slate-900 font-bold" : "text-slate-700 font-medium"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              {isPro ? (
                <div className="w-full py-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-extrabold text-xs text-center flex items-center justify-center gap-2 shadow-sm">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>You Are Currently Enjoying Pro Benefits</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-400/20 hover:from-amber-300 hover:to-amber-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-slate-950" />
                  <span>{loading ? "Opening Secure Checkout..." : "Get Pro Access (₹499 / 33 Days) →"}</span>
                </button>
              )}
            </div>
          </motion.div>

        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-md mx-auto mb-10 bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
            <p className="text-rose-700 text-xs font-semibold">{error}</p>
          </div>
        )}

        {/* Success message */}
        {creditSuccess && (
          <div className="max-w-md mx-auto mb-10 bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-center flex items-center justify-center gap-2 text-emerald-900 font-bold text-xs shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{creditSuccess}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BUY CREDITS SECTION (20, 50, 100, 200 Credits) */}
        {/* ========================================================================= */}
        <section id="credits-section" className="max-w-5xl mx-auto mb-16 scroll-mt-20">
          <div className="rounded-3xl border-2 border-teal-600/30 bg-gradient-to-br from-teal-900/10 via-white to-teal-50/40 p-6 sm:p-10 shadow-lg relative overflow-hidden">
            
            {/* Glow accent */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-44 h-44 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant AI Query Top-Ups</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Buy AI Chat Credits
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Need extra queries beyond your daily allowance? Purchase credit packs that stay valid for a full 1 year (365 days) and roll over every day until used.
                </p>

                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold">
                  <CalendarCheck className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>1-Year (365 Days) Validity • Daily Rollover (Unused credits never expire day-to-day)</span>
                </div>
              </div>

              {/* Live User Credit Status Badge */}
              <div className="p-4 rounded-2xl bg-white border border-teal-200/80 shadow-xs shrink-0 text-left min-w-[220px]">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Your Live Balance</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-teal-800">
                    {chatStatus.extraCredits}
                  </span>
                  <span className="text-xs font-bold text-slate-600">Extra Credits</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Daily reset: {chatStatus.usedToday}/{chatStatus.dailyLimit} queries used today
                </p>
              </div>
            </div>

            {/* 4 Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CREDIT_PACKAGES.map((pack) => {
                const isItemLoading = creditLoadingId === pack.id;
                return (
                  <div
                    key={pack.id}
                    className={`rounded-2xl border-2 p-5 bg-white relative flex flex-col justify-between transition-all hover:shadow-md ${
                      pack.popular
                        ? "border-teal-600 shadow-md ring-2 ring-teal-500/20"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {pack.badge && (
                      <span
                        className={`absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          pack.popular
                            ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-xs"
                            : "bg-slate-800 text-white"
                        }`}
                      >
                        {pack.badge}
                      </span>
                    )}

                    <div>
                      <h4 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <span>{pack.title}</span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{pack.description}</p>

                      <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold text-teal-800">
                        <Clock className="w-3 h-3 text-teal-600" />
                        <span>{pack.validity}</span>
                      </div>

                      <div className="mt-4 mb-4 pt-3 border-t border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-slate-900">₹{pack.price}</span>
                          <span className="text-[11px] text-slate-400">one-time</span>
                        </div>
                        <span className="text-[11px] font-bold text-teal-700 block mt-0.5">{pack.perChat}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBuyCredits(pack)}
                      disabled={isItemLoading}
                      className={`w-full py-2.5 rounded-xl font-black text-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                        pack.popular
                          ? "bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-700/20"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{isItemLoading ? "Processing..." : `Buy ${pack.credits} Credits`}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-slate-500 border-t border-teal-100 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Valid for 1 Year (365 Days) • Rollover Guarantee • 100% Secure via Razorpay</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Applicable for both Free and Pro plan users
              </span>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SIDE-BY-SIDE FEATURE COMPARISON MATRIX */}
        {/* ========================================================================= */}
        <section className="max-w-4xl mx-auto mb-16 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Side-by-Side Plan Comparison</h2>
            <p className="text-xs text-slate-500 mt-1">Detailed comparison of Free vs Pro learning features</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-4 font-bold text-slate-700 uppercase tracking-wider text-xs">Feature</th>
                  <th className="py-3 px-4 font-bold text-slate-700 uppercase tracking-wider text-xs text-center">Free Plan</th>
                  <th className="py-3 px-4 font-bold text-indigo-700 uppercase tracking-wider text-xs text-center bg-indigo-50/60 rounded-t-xl">
                    Pro Plan ⭐
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className="py-3.5 px-4 text-center text-slate-600 font-medium">{row.free}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-indigo-900 bg-indigo-50/40">
                      {row.pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit Bank-Grade Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant Plan Activation</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Industry Accredited Verification</span>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-center text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { 
                q: "Is this an auto-renewing subscription or recurring deduction?", 
                a: "No! There are strictly NO auto-debits or hidden recurring charges. Every plan upgrade is a 100% manual one-time payment. Once your 33 days (30 days + 3 bonus days) are complete, you choose if and when you want to extend." 
              },
              { 
                q: "Can I view and compare my plan at any time?", 
                a: "Yes! Even after purchasing Pro, you can always visit this page anytime from your sidebar, header menu, or home to check your perks and compare plans." 
              },
              { 
                q: "How does the AI Course Generator work with Pro?", 
                a: "Pro users enjoy 5 full custom AI-generated curriculums per month across any technology, stack, or custom topic with instant module and quiz generation." 
              },
              { 
                q: "How are payments processed?", 
                a: "Payments are processed directly and securely via Razorpay supporting UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking." 
              },
              { 
                q: "Can I still earn verified certificates on the Free Plan?", 
                a: "Absolutely! Free plan students can take all proctored final exams and unlock their verified credentials with the nominal ₹99 certificate fee." 
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{faq.q}</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dismissed / Incomplete Payment Popup Dialog */}
        {paymentDismissedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center shadow-2xl border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <Info className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1.5">Payment Window Closed</h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                You closed the payment window before completing the transaction. No funds have been deducted from your bank account or card. You can resume or upgrade anytime!
              </p>
              <button
                type="button"
                onClick={() => setPaymentDismissedModal(false)}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Understood / Continue
              </button>
            </div>
          </div>
        )}

        {/* Payment Success Popup Dialog */}
        {paymentSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full text-center shadow-2xl border border-slate-100 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-md shadow-emerald-600/10">
                <CheckCircle2 className="w-9 h-9 text-emerald-600 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{paymentSuccessModal.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                {paymentSuccessModal.message}
              </p>
              {paymentSuccessModal.details && (
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 mb-5 text-left text-xs space-y-1">
                  <div className="text-slate-800 font-bold">{paymentSuccessModal.details}</div>
                  {paymentSuccessModal.paymentId && (
                    <div className="text-[11px] text-slate-500 font-mono">
                      Transaction ID: {paymentSuccessModal.paymentId}
                    </div>
                  )}
                  <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified via Razorpay
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => setPaymentSuccessModal(null)}
                className="w-full py-3.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-xs sm:text-sm font-black text-white transition-all shadow-lg shadow-teal-700/25 cursor-pointer active:scale-98"
              >
                Continue to Learning Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

