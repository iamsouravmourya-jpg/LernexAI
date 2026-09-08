import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireUser, setCors } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!(await requireUser(req))) return res.status(401).json({ error: "Authentication required. Please sign in again." });

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

    const key_id = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
    const key_secret = (process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET || "").trim();
    if (!key_id || !key_secret) return res.status(503).json({ error: "Payment service is not configured" });
    const orderReceipt = receipt || `rcpt_${purpose}_${Date.now()}`;

    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${key_id}:${key_secret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: numAmount,
        currency: currency || "INR",
        receipt: orderReceipt,
        notes: typeof notes === "object" ? notes : { purpose },
      }),
    });
    const order = await razorpayResponse.json();
    if (!razorpayResponse.ok || !order.id) {
      console.error("[Razorpay Order Error]:", razorpayResponse.status, order.error?.description || order);
      return res.status(502).json({ error: "Razorpay could not create the order" });
    }

    return res.status(200).json({
      success: true,
      id: order.id,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency || "INR",
      receipt: order.receipt,
      status: order.status || "created",
      key_id,
      is_mock: false,
    });
  } catch (err: any) {
    console.error("[Create Razorpay Order Vercel Error]:", err);
    return res.status(500).json({ error: "Unable to create payment order" });
  }
}
