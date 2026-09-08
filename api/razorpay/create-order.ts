import type { VercelRequest, VercelResponse } from "@vercel/node";
import Razorpay from "razorpay";
import { requireUser, setCors } from "../_lib/auth";

function getRazorpayInstance() {
  const key_id = (
    process.env.RAZORPAY_KEY_ID ||
    process.env.VITE_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY ||
    ""
  ).trim();

  const key_secret = (
    process.env.RAZORPAY_KEY_SECRET ||
    process.env.RAZORPAY_SECRET ||
    ""
  ).trim();

  const isRealKey = Boolean(
    key_id &&
    (key_id.startsWith("rzp_live_") || key_id.startsWith("rzp_test_")) &&
    !key_id.includes("demo12345678")
  );

  if (isRealKey && key_secret) {
    try {
      return {
        client: new Razorpay({ key_id, key_secret }),
        key_id,
        key_secret,
        is_mock: false,
      };
    } catch (e) {
      console.warn("[Razorpay Init Warning]:", e);
    }
  }

  return {
    client: null,
    key_id: key_id || "rzp_test_sandbox_fallback",
    key_secret: key_secret || "",
    is_mock: !isRealKey,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!(await requireUser(req))) return res.status(401).json({ error: "Authentication required" });

  try {
    const { amount, currency = "INR", receipt, notes = {}, purpose = "ai_credits" } = req.body || {};

    let numAmount = Number(amount);
    if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ error: "A valid payment amount is required" });
    } else if (numAmount < 1000) {
      numAmount = Math.round(numAmount * 100);
    }

    const allowedAmounts: Record<string, number[]> = {
      pro_subscription: [49900],
      certificate: [9900],
      ai_credits: [4900, 9900, 17900, 29900],
    };
    if (!(allowedAmounts[purpose] || []).includes(numAmount)) {
      return res.status(400).json({ error: "Invalid amount for the selected product" });
    }

    const { client, key_id, is_mock } = getRazorpayInstance();
    const orderReceipt = receipt || `rcpt_${purpose}_${Date.now()}`;

    if (client && !is_mock) {
      try {
        const order = await client.orders.create({
          amount: numAmount,
          currency: currency || "INR",
          receipt: orderReceipt,
          notes: typeof notes === "object" ? notes : { purpose },
        });

        return res.status(200).json({
          success: true,
          id: order.id,
          order_id: order.id,
          amount: order.amount,
          currency: order.currency || "INR",
          receipt: order.receipt,
          status: order.status || "created",
          key_id: key_id,
          is_mock: false,
        });
      } catch (sdkError: any) {
        console.warn("[Razorpay Vercel SDK Order Fallback]:", sdkError?.message || sdkError);
      }
    }

    return res.status(503).json({ error: "Payment service is not configured" });
  } catch (err: any) {
    console.error("[Create Razorpay Order Vercel Error]:", err);
    return res.status(500).json({ error: "Unable to create payment order" });
  }
}
