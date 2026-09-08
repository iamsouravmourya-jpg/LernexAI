import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabaseServerClient, setCors } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password, firstName, lastName, phone } = req.body || {};
    const trimmedEmail = (email || "").trim().toLowerCase();

    if (!trimmedEmail || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const supabaseAdmin = getSupabaseServerClient();
    if (!supabaseAdmin) {
      return res.status(503).json({ error: "Database authentication service unavailable." });
    }

    const fullName = [firstName?.trim(), lastName?.trim()].filter(Boolean).join(" ") || trimmedEmail.split("@")[0];

    // Create user with email_confirm: true so user is not blocked
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: trimmedEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        first_name: firstName?.trim() || "",
        last_name: lastName?.trim() || "",
        phone: phone?.trim() || "",
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedEmail)}&backgroundColor=e2e8f0`,
        plan_type: "free",
      },
    });

    if (createError) {
      const msg = createError.message || "";
      if (msg.toLowerCase().includes("already registered") || msg.toLowerCase().includes("already exists")) {
        return res.status(400).json({ error: "An account with this email already exists. Please log in." });
      }
      return res.status(400).json({ error: msg });
    }

    const newUserId = userData?.user?.id;
    if (newUserId) {
      try {
        await supabaseAdmin.from("users").upsert({
          id: newUserId,
          email: trimmedEmail,
          first_name: firstName?.trim() || "",
          last_name: lastName?.trim() || "",
          phone: phone?.trim() || "",
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(trimmedEmail)}&backgroundColor=e2e8f0`,
          plan_type: "free",
          role: "student",
          daily_chat_limit: 10,
          chats_used_today: 0,
        }, { onConflict: "id" });
      } catch (profileErr) {
        console.warn("[Register Profile Upsert Warning]:", profileErr);
      }
    }

    return res.json({
      success: true,
      message: "Account created and confirmed successfully.",
      user: userData?.user,
    });
  } catch (err: any) {
    console.error("[Register Handler Error]:", err);
    return res.status(500).json({ error: err?.message || "Registration failed" });
  }
}
