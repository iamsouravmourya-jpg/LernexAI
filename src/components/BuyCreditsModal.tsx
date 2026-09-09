import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  LockKeyhole,
  Crown,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Clock,
  CalendarCheck,
  Info
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  CREDIT_PACKAGES,
  CreditPackage,
  addPurchasedCredits,
  getDailyChatStatus,
} from "@/lib/credits";
import { createOrder, openRazorpayCheckout, verifyPayment } from "@/lib/razorpay";

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  limitExhausted?: boolean;
}

export default function BuyCreditsModal({
  isOpen,
  onClose,
  title,
  subtitle,
  limitExhausted = false,
}: BuyCreditsModalProps) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedPack, setSelectedPack] = useState<CreditPackage>(CREDIT_PACKAGES[1]); // Default 50 credits
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [dismissedPopup, setDismissedPopup] = useState(false);
  const [successModal, setSuccessModal] = useState<{
    title: string;
    message: string;
    details?: string;
    paymentId?: string;
  } | null>(null);

  const isPro = user?.plan_type === "pro";
  const chatStatus = getDailyChatStatus(user?.id, isPro);

  // Safety watchdog: ensure loading state never gets stuck indefinitely
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleClose = () => {
    setLoading(false);
    setError(null);
    setDismissedPopup(false);
    onClose();
  };

  const handlePurchase = async (pack: CreditPackage) => {
    setError(null);
    setDismissedPopup(false);
    setLoading(true);

    try {
      // 1. Create order
      const order = await createOrder({
        amount: pack.amountPaise,
        purpose: "ai_credits" as any,
      });

      // 2. Open Razorpay Checkout with the exact key used by the order
      await openRazorpayCheckout({
        orderId: order.id,
        amount: order.amount,
        keyId: order.key_id,
        userName: user?.name || "Student",
        userEmail: user?.email || "student@lernexai.com",
        onSuccess: async (response) => {
          try {
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              item_type: "credits",
              user_id: user?.id,
              metadata: { credits: pack.credits, amount: pack.amountPaise / 100 }
            });

            if (!verification.success) {
              throw new Error(verification.error || "Payment could not be verified.");
            }

            // Credit added to user balance with 1-year validity
            addPurchasedCredits(user?.id, pack.credits);
            setSuccessModal({
              title: "Payment Successful! 🎉",
              message: `Successfully added ${pack.credits} AI Credits to your balance! They are valid for 1 full year and immediately ready to use.`,
              details: `Package: ${pack.name} (${pack.credits} Credits) • Amount: ₹${pack.amountPaise / 100}`,
              paymentId: response.razorpay_payment_id,
            });
            try {
              confetti({ particleCount: 110, spread: 75, origin: { y: 0.55 } });
            } catch {}
          } catch (paymentError) {
            setError(paymentError instanceof Error ? paymentError.message : "Payment could not be verified.");
          }
        },
        onFailure: (err) => {
          setLoading(false);
          const isDismissed =
            err?.code === "CHECKOUT_DISMISSED" ||
            err?.message?.toLowerCase().includes("closed") ||
            err?.message?.toLowerCase().includes("cancel");

          if (isDismissed) {
            setError(null);
            setDismissedPopup(true);
          } else {
            setError(err?.description || err?.message || "Payment failed. Please try again.");
          }
        },
      });
    } catch (err: any) {
      console.warn("Order creation notice:", err);
      setError(err instanceof Error ? err.message : "Payment order could not be created. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToUpgrade = () => {
    handleClose();
    setLocation("/upgrade#credits");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl"
        >
          {/* Close / Cut "✕" button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 mb-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
              {limitExhausted ? <LockKeyhole className="w-3.5 h-3.5 text-amber-600" /> : <Zap className="w-3.5 h-3.5 text-amber-500" />}
              <span>{limitExhausted ? "Daily Limit Exhausted" : "AI Tutor Top-Up"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {title || (limitExhausted ? "Your Daily Limit is Reached" : "Buy AI Chat Credits")}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {subtitle || (
                limitExhausted
                  ? `You've used all ${chatStatus.dailyLimit}/${chatStatus.dailyLimit} daily AI chats. Top up credits now to continue asking questions right away!`
                  : "Get instant query top-ups for uninterrupted coding mentorship, debugging, and practice."
              )}
            </p>

            {/* 1-Year Rollover Guarantee Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-[11px] font-bold">
              <CalendarCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>1-Year (365 Days) Validity • Unused credits roll over to tomorrow & future days</span>
            </div>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-sm font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
              {error}
            </div>
          )}

          {/* 4 Credit Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
            {CREDIT_PACKAGES.map((pack) => {
              const isSelected = selectedPack.id === pack.id;
              return (
                <div
                  key={pack.id}
                  onClick={() => setSelectedPack(pack)}
                  className={`relative rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-teal-700 bg-teal-50/40 shadow-md ring-2 ring-teal-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  {pack.badge && (
                    <span
                      className={`absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        pack.popular
                          ? "bg-amber-400 text-slate-950 shadow-xs"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      {pack.badge}
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <span>{pack.title}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{pack.description}</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-teal-800">
                    <Clock className="w-3 h-3 text-teal-600" />
                    <span>{pack.validity}</span>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900">₹{pack.price}</span>
                      <span className="text-[11px] text-slate-400">one-time</span>
                    </div>
                    <span className="text-[11px] font-bold text-teal-700">{pack.perChat}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={() => handlePurchase(selectedPack)}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-85"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connecting to Razorpay...</span>
                </div>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Buy {selectedPack.credits} Credits for ₹{selectedPack.price} →</span>
                </>
              )}
            </button>

            {loading && (
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-rose-600 hover:text-rose-700 underline font-semibold cursor-pointer"
                >
                  Cancel or retry payment
                </button>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
              <button
                type="button"
                onClick={handleNavigateToUpgrade}
                className="text-indigo-600 hover:text-indigo-700 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Or Upgrade to Pro (₹499/mo)</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
              >
                Cancel / Close
              </button>
            </div>
          </div>

          {/* Security & Expiry note */}
          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400 border-t border-slate-100 pt-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Instant balance activation • 1-Year validity • 100% Secure Razorpay checkout</span>
          </div>

          {/* Dismissed / Incomplete Payment Popup Dialog */}
          {dismissedPopup && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center shadow-2xl border border-slate-100 transform transition-all">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-sm">
                  <Info className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1.5">Payment Window Closed</h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  You closed the payment window before completing the transaction. No amount has been deducted from your account. You can retry whenever you are ready!
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDismissedPopup(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDismissedPopup(false);
                      if (selectedPack) handlePurchase(selectedPack);
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-xs font-black text-white transition-colors shadow-lg shadow-teal-700/20 cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Success Popup Dialog */}
          {successModal && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center shadow-2xl border border-slate-100 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-md shadow-emerald-600/10">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{successModal.title}</h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {successModal.message}
                </p>
                {successModal.details && (
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 mb-5 text-left text-xs space-y-1">
                    <div className="text-slate-800 font-bold">{successModal.details}</div>
                    {successModal.paymentId && (
                      <div className="text-[11px] text-slate-500 font-mono">
                        Transaction ID: {successModal.paymentId}
                      </div>
                    )}
                    <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified via Razorpay
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSuccessModal(null);
                    handleClose();
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-xs sm:text-sm font-black text-white transition-all shadow-lg shadow-teal-700/25 cursor-pointer active:scale-98"
                >
                  Start Using AI Credits
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
