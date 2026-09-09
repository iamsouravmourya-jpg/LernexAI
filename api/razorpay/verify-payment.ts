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

    const generatedSignature = crypto
        .createHmac("sha256", key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    const receivedSignature = String(razorpay_signature);
    if (
      receivedSignature.length !== generatedSignature.length ||
      !crypto.timingSafeEqual(Buffer.from(generatedSignature), Buffer.from(receivedSignature))
    ) {
      return res.status(400).json({ error: "Payment signature verification failed" });
    }

    const targetUserId = user_id || authenticatedUser.id;
    if (targetUserId !== authenticatedUser.id) {
      return res.status(403).json({ error: "Payment user does not match the signed-in account" });
    }

    const admin = getBackendSupabaseAdmin();
    if (!admin) return res.status(503).json({ error: "Payment verified, but account service is not configured" });

    const key_id = (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "").trim();
    if (!key_id) return res.status(503).json({ error: "Payment gateway is not configured" });

    const razorpayAuth = `Basic ${Buffer.from(`${key_id}:${key_secret}`).toString("base64")}`;
    const orderResponse = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(razorpay_order_id)}`, {
      headers: { Authorization: razorpayAuth },
    });
    const razorpayOrder = await orderResponse.json();
    if (!orderResponse.ok || razorpayOrder.id !== razorpay_order_id) {
      return res.status(400).json({ error: "Razorpay order could not be verified" });
    }

    const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(razorpay_payment_id)}`, {
      headers: { Authorization: razorpayAuth },
    });
    const razorpayPayment = await paymentResponse.json();
    if (!paymentResponse.ok || razorpayPayment.order_id !== razorpay_order_id) {
      return res.status(400).json({ error: "Razorpay payment does not match this order" });
    }

    const amountPaise = Number(razorpayOrder.amount);
    const creditPackages: Record<number, number> = { 4900: 20, 9900: 50, 17900: 100, 29900: 200 };
    const productType = amountPaise === 49900
      ? "pro_upgrade"
      : amountPaise === 19900
        ? "certificate"
        : creditPackages[amountPaise]
          ? "credits"
          : null;
    if (!productType) return res.status(400).json({ error: "Unsupported payment amount" });

    if (item_type && item_type !== productType) {
      return res.status(400).json({ error: "Payment product does not match the Razorpay order" });
    }

    const credits = productType === "credits" ? creditPackages[amountPaise] : null;
    if (productType === "credits" && metadata.credits !== undefined && Number(metadata.credits) !== credits) {
      return res.status(400).json({ error: "Credit package does not match the Razorpay order" });
    }

    const { data: existingTransaction } = await admin
      .from("payment_transactions")
      .select("status")
      .eq("razorpay_payment_id", razorpay_payment_id)
      .maybeSingle();
    if (existingTransaction?.status === "processed") {
      return res.status(200).json({ success: true, message: "Payment was already processed", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
    }

    if (!existingTransaction) {
      const { error: transactionError } = await admin.from("payment_transactions").insert({
        user_id: targetUserId,
        razorpay_order_id,
        razorpay_payment_id,
        product_type: productType,
        amount_paise: amountPaise,
        credits,
        metadata,
      });
      if (transactionError && transactionError.code !== "23505") {
        console.error("[Payment Transaction Error]:", transactionError);
        return res.status(500).json({ error: "Payment verified, but transaction could not be recorded" });
      }
    }

    if (productType === "credits") {
      const { error: creditError } = await admin.rpc("add_user_credits", {
        p_user_id: targetUserId,
        p_credits: credits as number,
      });
      if (creditError) {
        console.error("[Razorpay Credits Save Error]:", creditError);
        return res.status(500).json({ error: "Payment verified, but credits could not be added" });
      }
    }

    if (productType === "pro_upgrade") {
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

    if (productType === "certificate") {
      const courseId = String(metadata.course_id || "").trim();
      const courseTitle = String(metadata.course_title || "").trim();
      const fullName = String(metadata.full_name || "").trim();
      const score = Number(metadata.score);
      if (!courseId || !courseTitle || !fullName || !Number.isFinite(score) || score < 40 || score > 100) {
        return res.status(400).json({ error: "Certificate details are incomplete or invalid" });
      }
      const certificateId = `LXAI-${new Date().getFullYear()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
      const grade = String(metadata.grade || "").trim() || (score >= 80 ? "A" : score >= 60 ? "B" : "C");
      const { error: certificateError } = await admin.from("certificate_purchases").insert({
        id: `cert-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
        user_id: targetUserId,
        course_id: courseId,
        course_title: courseTitle,
        certificate_id: certificateId,
        score,
        grade,
        full_name: fullName,
        purchase_amount: amountPaise,
        payment_id: razorpay_payment_id,
      });
      if (certificateError && certificateError.code !== "23505") {
        console.error("[Certificate Save Error]:", certificateError);
        return res.status(500).json({ error: "Payment verified, but certificate could not be issued" });
      }
    }

    await admin.from("payment_transactions").update({ status: "processed", processed_at: new Date().toISOString() }).eq("razorpay_payment_id", razorpay_payment_id);

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
