import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { requireUser, setCors } from "../_lib/auth.js";
import { getBackendSupabaseAdmin } from "../_lib/supabase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const authenticatedUser = await requireUser(req);
  if (!authenticatedUser) return res.status(401).json({ error: "Authentication required" });

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      item_type,
      user_id,
      metadata = {},
    } = req.body || {};
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

    const targetUserId = user_id || authenticatedUser.id;
    if (targetUserId !== authenticatedUser.id) {
      return res.status(403).json({ error: "Payment user does not match the signed-in account" });
    }

    const admin = getBackendSupabaseAdmin();
    if (!admin) return res.status(503).json({ error: "Payment verified, but account service is not configured" });

    if (item_type === "credits") {
      const credits = Number(metadata.credits);
      if (!Number.isInteger(credits) || credits <= 0 || credits > 200) {
        return res.status(400).json({ error: "Invalid credit package" });
      }
      const { error: creditError } = await admin.rpc("add_user_credits", {
        p_user_id: targetUserId,
        p_credits: credits,
      });
      if (creditError) {
        console.error("[Razorpay Credits Save Error]:", creditError);
        return res.status(500).json({ error: "Payment verified, but credits could not be added" });
      }
    }

    if (item_type === "pro_upgrade") {
      const { error: upgradeError } = await admin.rpc("upgrade_user_to_pro", {
        p_user_id: targetUserId,
        p_days: 30,
        p_bonus_free_days: 3,
      });
      if (upgradeError) {
        console.error("[Razorpay Pro Save Error]:", upgradeError);
        return res.status(500).json({ error: "Payment verified, but Pro access could not be activated" });
      }
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
