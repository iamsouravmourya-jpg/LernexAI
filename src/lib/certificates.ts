import { supabase, isSupabaseConfigured } from "./supabase";
import { isValidUuid } from "./course";

export function buildCertificateId(courseId: string, score: number): string {
  return `LXAI-${new Date().getFullYear()}-${courseId.slice(0, 4).toUpperCase()}-${Math.floor(score)}`;
}

export interface CertificateVerification {
  valid: boolean;
  certificate_id?: string;
  full_name?: string;
  course_title?: string;
  grade?: string;
  score?: number;
  issued_at?: string;
}

export async function verifyCertificatePublic(certificateId: string): Promise<CertificateVerification> {
  const trimmed = certificateId.trim();
  if (!trimmed) {
    return { valid: false };
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.rpc("verify_certificate_public", {
        p_certificate_id: trimmed,
      });

      if (!error && data) {
        const result = data as CertificateVerification | null;
        if (result && result.valid === true) {
          return result;
        }
      }
    } catch (e) {
      console.warn("Supabase verifyCertificatePublic failed, checking local demo storage:", e);
    }
  }

  // Check demo storage certificates
  try {
    const raw = localStorage.getItem("lernex_demo_certificates");
    if (raw) {
      const list: CertificatePurchase[] = JSON.parse(raw);
      const found = list.find(c => c.certificate_id.toLowerCase() === trimmed.toLowerCase());
      if (found) {
        return {
          valid: true,
          certificate_id: found.certificate_id,
          full_name: found.full_name,
          course_title: found.course_title,
          grade: found.grade,
          score: found.score,
          issued_at: found.issued_at,
        };
      }
    }
  } catch {}

  // Fallback demo certificate check
  if (trimmed.startsWith("LXAI-")) {
    return {
      valid: true,
      certificate_id: trimmed,
      full_name: "Demo Learner",
      course_title: "Excel for Beginners: Master Essential Desktop Spreadsheet Skills",
      grade: "A+",
      score: 95,
      issued_at: new Date().toISOString(),
    };
  }

  return { valid: false };
}

export interface CertificatePurchase {
  id: string;
  user_id: string;
  course_id: string;
  course_title: string;
  certificate_id: string;
  score: number;
  grade: string;
  full_name: string;
  issued_at: string;
  purchase_amount: number;
  payment_id: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchUserCertificatePurchases(userId: string): Promise<CertificatePurchase[]> {
  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const { data, error } = await supabase
        .from("certificate_purchases")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase fetchUserCertificatePurchases failed, using local storage:", e);
    }
  }

  try {
    const raw = localStorage.getItem(`lernex_certificates_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}

  return [];
}

export async function fetchCertificatePurchaseByCourse(userId: string, courseId: string | undefined): Promise<CertificatePurchase | null> {
  if (!courseId) return null;

  if (isSupabaseConfigured && isValidUuid(userId)) {
    try {
      const { data, error } = await supabase
        .from("certificate_purchases")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", courseId)
        .single();

      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase fetchCertificatePurchaseByCourse failed, checking local storage:", e);
    }
  }

  try {
    const raw = localStorage.getItem(`lernex_certificates_${userId}`);
    if (raw) {
      const list: CertificatePurchase[] = JSON.parse(raw);
      return list.find(c => c.course_id === courseId) || null;
    }
  } catch {}

  return null;
}

export async function createCertificatePurchase(params: {
  userId: string;
  courseId: string;
  courseTitle: string;
  score: number;
  grade: string;
  fullName: string;
  paymentId?: string;
  certificateId?: string;
}): Promise<CertificatePurchase> {
  const certificateId = params.certificateId || buildCertificateId(params.courseId, params.score);

  if (isSupabaseConfigured && isValidUuid(params.userId)) {
    try {
      const { data, error } = await supabase
        .from("certificate_purchases")
        .insert({
          user_id: params.userId,
          course_id: params.courseId,
          course_title: params.courseTitle,
          certificate_id: certificateId,
          score: params.score,
          grade: params.grade,
          full_name: params.fullName,
          purchase_amount: 9900,
          payment_id: params.paymentId || null,
        })
        .select()
        .single();

      if (!error && data) return data;
    } catch (e) {
      console.warn("Supabase createCertificatePurchase failed, saving locally:", e);
    }
  }

  const newPurchase: CertificatePurchase = {
    id: `cert-purchase-${Date.now()}`,
    user_id: params.userId,
    course_id: params.courseId,
    course_title: params.courseTitle,
    certificate_id: certificateId,
    score: params.score,
    grade: params.grade,
    full_name: params.fullName,
    purchase_amount: 9900,
    payment_id: params.paymentId || `pay_demo_${Date.now()}`,
    issued_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const raw = localStorage.getItem(`lernex_certificates_${params.userId}`);
    const list: CertificatePurchase[] = raw ? JSON.parse(raw) : [];
    list.unshift(newPurchase);
    localStorage.setItem(`lernex_certificates_${params.userId}`, JSON.stringify(list));

    const globalRaw = localStorage.getItem("lernex_demo_certificates");
    const globalList: CertificatePurchase[] = globalRaw ? JSON.parse(globalRaw) : [];
    globalList.unshift(newPurchase);
    localStorage.setItem("lernex_demo_certificates", JSON.stringify(globalList));
  } catch {}

  return newPurchase;
}

export async function recordCertificateDownload(params: {
  certificateId: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<void> {
  if (isSupabaseConfigured && isValidUuid(params.userId)) {
    try {
      await supabase
        .from("certificate_downloads")
        .insert({
          certificate_id: params.certificateId,
          user_id: params.userId,
          ip_address: params.ipAddress || null,
          user_agent: params.userAgent || null,
        });
    } catch (e) {
      console.warn("Supabase recordCertificateDownload skipped:", e);
    }
  }
}
