import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { requireUser, setCors } from "../_lib/auth.js";

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
    const key_secret = (
      process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_SECRET ||
      ""
    ).trim();

    if (!key_secret || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Incomplete payment verification data" });
    }

    const generated_signature = crypto
        .createHmac("sha256", key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(generated_signature), Buffer.from(String(razorpay_signature)))) {
      return res.status(400).json({ error: "Payment signature verification failed" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id || `pay_${Date.now()}`,
    });
  } catch (err: any) {
    console.error("[Verify Razorpay Vercel Error]:", err);
    return res.status(500).json({ error: "Payment verification failed" });
  }
}
