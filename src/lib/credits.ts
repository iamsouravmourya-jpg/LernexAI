export interface CreditPackage {
  id: string;
  credits: number;
  price: number; // in INR
  amountPaise: number; // in paise for Razorpay
  title: string;
  perChat: string;
  badge?: string;
  popular?: boolean;
  validity: string;
  description: string;
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: "credits_20",
    credits: 20,
    price: 49,
    amountPaise: 4900,
    title: "20 AI Chats",
    perChat: "₹2.45 / chat",
    badge: "Starter Pack",
    popular: false,
    validity: "Valid for 1 Year (365 Days)",
    description: "Quick top-up for exam practice, quick doubts & code checks • Rolls over daily",
  },
  {
    id: "credits_50",
    credits: 50,
    price: 99,
    amountPaise: 9900,
    title: "50 AI Chats",
    perChat: "₹1.98 / chat",
    badge: "Most Popular",
    popular: true,
    validity: "Valid for 1 Year (365 Days)",
    description: "Great value for active students tackling complex problem sets • Rolls over daily",
  },
  {
    id: "credits_100",
    credits: 100,
    price: 179,
    amountPaise: 17900,
    title: "100 AI Chats",
    perChat: "₹1.79 / chat",
    badge: "Best Value",
    popular: false,
    validity: "Valid for 1 Year (365 Days)",
    description: "Comprehensive boost for deep learning & multi-project mastery • Rolls over daily",
  },
  {
    id: "credits_200",
    credits: 200,
    price: 299,
    amountPaise: 29900,
    title: "200 AI Chats",
    perChat: "₹1.49 / chat",
    badge: "Power Learner",
    popular: false,
    validity: "Valid for 1 Year (365 Days)",
    description: "Maximum savings for extensive AI tutoring & unlimited questions • Rolls over daily",
  },
];

const CREDITS_EVENT = "lernexai_credits_updated";

export interface PurchasedCreditBatch {
  id: string;
  credits: number;
  purchasedAt: string; // ISO date
  expiresAt: string; // ISO date (365 days / 1 year from purchase)
}

function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export interface ChatUsageStatus {
  usedToday: number;
  dailyLimit: number;
  extraCredits: number;
  remainingDaily: number;
  totalAvailable: number;
  isExhausted: boolean;
  isPro: boolean;
  earliestExpiryDate?: string | null;
}

/**
 * Clean and return active, non-expired credit batches (1-year / 365 days validity).
 * Unused credits roll over day-to-day and stay valid for 365 days.
 */
function getActiveCreditBatches(userKey: string): { batches: PurchasedCreditBatch[]; totalCredits: number } {
  const batchesStorageKey = `lernexai_credit_batches_${userKey}`;
  const legacyStorageKey = `lernexai_credits_${userKey}`;
  const nowMs = Date.now();

  let batches: PurchasedCreditBatch[] = [];

  try {
    const rawBatches = localStorage.getItem(batchesStorageKey);
    if (rawBatches) {
      const parsed: PurchasedCreditBatch[] = JSON.parse(rawBatches);
      if (Array.isArray(parsed)) {
        // Filter out expired batches (older than 365 days)
        batches = parsed.filter((b) => {
          const expMs = new Date(b.expiresAt).getTime();
          return !isNaN(expMs) && expMs > nowMs && b.credits > 0;
        });
      }
    } else {
      // Migrate legacy raw number to a 1-year batch if exists
      const legacyRaw = localStorage.getItem(legacyStorageKey);
      if (legacyRaw) {
        const legacyCredits = parseInt(legacyRaw, 10) || 0;
        if (legacyCredits > 0) {
          const oneYearLater = new Date(nowMs + 365 * 24 * 60 * 60 * 1000).toISOString();
          batches = [
            {
              id: `legacy_${Date.now()}`,
              credits: legacyCredits,
              purchasedAt: new Date().toISOString(),
              expiresAt: oneYearLater,
            },
          ];
          localStorage.setItem(batchesStorageKey, JSON.stringify(batches));
        }
      }
    }
  } catch (err) {
    console.warn("Storage access failed in getActiveCreditBatches:", err);
  }

  const totalCredits = batches.reduce((sum, b) => sum + b.credits, 0);
  return { batches, totalCredits };
}

function saveCreditBatches(userKey: string, batches: PurchasedCreditBatch[]) {
  const batchesStorageKey = `lernexai_credit_batches_${userKey}`;
  const legacyStorageKey = `lernexai_credits_${userKey}`;
  const total = batches.reduce((sum, b) => sum + b.credits, 0);

  try {
    localStorage.setItem(batchesStorageKey, JSON.stringify(batches));
    localStorage.setItem(legacyStorageKey, String(total));
  } catch (err) {
    console.warn("Storage write failed in saveCreditBatches:", err);
  }
}

export function getDailyChatStatus(userId?: string | null, isPro = false): ChatUsageStatus {
  const dailyLimit = isPro ? 50 : 10;
  const userKey = userId || "guest_user";
  const dateKey = getTodayKey();
  const usageStorageKey = `lernexai_usage_${userKey}_${dateKey}`;

  let usedToday = 0;

  try {
    const rawUsage = localStorage.getItem(usageStorageKey);
    if (rawUsage) {
      usedToday = Math.max(0, parseInt(rawUsage, 10) || 0);
    }
  } catch (err) {
    console.warn("Storage access failed in getDailyChatStatus:", err);
  }

  const { batches, totalCredits: extraCredits } = getActiveCreditBatches(userKey);

  const remainingDaily = Math.max(0, dailyLimit - usedToday);
  const totalAvailable = remainingDaily + extraCredits;
  const isExhausted = totalAvailable <= 0;

  // Find earliest expiration date among active batches
  let earliestExpiryDate: string | null = null;
  if (batches.length > 0) {
    const sorted = [...batches].sort(
      (a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
    );
    earliestExpiryDate = sorted[0].expiresAt;
  }

  return {
    usedToday,
    dailyLimit,
    extraCredits,
    remainingDaily,
    totalAvailable,
    isExhausted,
    isPro,
    earliestExpiryDate,
  };
}

export function incrementChatUsage(userId?: string | null, isPro = false): ChatUsageStatus {
  const dailyLimit = isPro ? 50 : 10;
  const userKey = userId || "guest_user";
  const dateKey = getTodayKey();
  const usageStorageKey = `lernexai_usage_${userKey}_${dateKey}`;

  let usedToday = 0;

  try {
    const rawUsage = localStorage.getItem(usageStorageKey);
    usedToday = rawUsage ? Math.max(0, parseInt(rawUsage, 10) || 0) : 0;

    const { batches } = getActiveCreditBatches(userKey);

    if (usedToday < dailyLimit) {
      // Use free daily allowance first
      usedToday += 1;
      localStorage.setItem(usageStorageKey, String(usedToday));
    } else if (batches.length > 0) {
      // Consume from the earliest expiring purchased credit batch
      const sortedBatches = [...batches].sort(
        (a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
      );

      for (const batch of sortedBatches) {
        if (batch.credits > 0) {
          batch.credits -= 1;
          break;
        }
      }

      // Remove fully consumed batches
      const remainingBatches = sortedBatches.filter((b) => b.credits > 0);
      saveCreditBatches(userKey, remainingBatches);
    }
  } catch (err) {
    console.warn("Storage write failed in incrementChatUsage:", err);
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CREDITS_EVENT, { detail: { userKey } }));
  }

  return getDailyChatStatus(userId, isPro);
}

/**
 * Add purchased credits with a 1-year (365 days) validity window.
 * Credits roll over day after day until 365 days have passed.
 */
export function addPurchasedCredits(userId: string | null | undefined, creditAmount: number): number {
  const userKey = userId || "guest_user";
  const { batches } = getActiveCreditBatches(userKey);

  const now = new Date();
  const oneYearExpiry = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString();

  const newBatch: PurchasedCreditBatch = {
    id: `batch_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    credits: creditAmount,
    purchasedAt: now.toISOString(),
    expiresAt: oneYearExpiry,
  };

  batches.push(newBatch);
  saveCreditBatches(userKey, batches);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CREDITS_EVENT, { detail: { userKey, added: creditAmount } }));
  }

  const total = batches.reduce((sum, b) => sum + b.credits, 0);
  return total;
}

export function subscribeToCredits(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = () => callback();
  window.addEventListener(CREDITS_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(CREDITS_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
