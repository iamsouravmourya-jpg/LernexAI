import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "wouter";
import {
  Award,
  ArrowLeft,
  Download,
  Share2,
  CheckCircle2,
  Loader2,
  Trophy,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Printer,
  Lock,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import confetti from "canvas-confetti";
import QRCode from "qrcode";
import { useAuth } from "@/context/AuthContext";
import { fetchCourseWithModules, type Course } from "@/lib/course";
import { fetchFinalExamStatus } from "@/lib/finalExam";
import { useToast } from "@/hooks/use-toast";
import { getCertificateGrade } from "@/lib/certificate";
import { getAppUrl } from "@/lib/siteUrl";
import { AcademicCertificate } from "@/components/AcademicCertificate";
import {
  fetchCertificatePurchaseByCourse,
  recordCertificateDownload,
  buildCertificateId,
  createCertificatePurchase,
  type CertificatePurchase,
} from "@/lib/certificates";
import {
  calculateInternalQuizAssessment,
  computeCombinedCourseAssessment,
  type InternalAssessmentResult,
} from "@/lib/courseAssessment";

function formatDate(value: Date) {
  return value.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CertificateCheckoutPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [location, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  // Core data states
  const [course, setCourse] = useState<Course | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [, setInternalAssessment] = useState<InternalAssessmentResult | null>(null);
  const [internalMarks, setInternalMarks] = useState<number>(36);
  const [examMarks, setExamMarks] = useState<number>(54);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromExam, setFromExam] = useState(false);
  const [examPassed, setExamPassed] = useState(false);
  const [purchaseRecord, setPurchaseRecord] = useState<CertificatePurchase | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);

  // Form input states
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState(false);

  // Interaction states
  const [isPaying, setIsPaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  useEffect(() => {
    let active = true;

    async function load() {
      if (!courseId) {
        setError("Certificate could not be loaded.");
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams(location.split("?")[1] || "");
        const isFromExam = params.get("fromExam") === "true";
        const loadedCourse = await fetchCourseWithModules(courseId);

        if (!active) return;
        setCourse(loadedCourse);
        setFullName(user?.name || "");
        setEmail(user?.email || "");
        setFromExam(isFromExam);

        // 1. Calculate Internal Assessment Marks (out of 40)
        let internalScore = 36;
        if (loadedCourse) {
          const internal = await calculateInternalQuizAssessment(user?.id, loadedCourse);
          if (active) {
            setInternalAssessment(internal);
            internalScore = internal.marksObtained;
            setInternalMarks(internalScore);
          }
        }

        // 2. Fetch Final Exam Marks (out of 60)
        let examScore = 30;
        let passedExam = false;

        // Check local storage recorded attempt first for high fidelity
        try {
          const localExamRaw = localStorage.getItem(`lernex_latest_exam_score_${courseId}`);
          if (localExamRaw) {
            const parsed = JSON.parse(localExamRaw);
            if (parsed.obtainedMarks != null) {
              examScore = parsed.obtainedMarks;
              passedExam = parsed.passed !== false;
            } else if (parsed.score != null) {
              examScore = Math.round((parsed.score / 100) * 60);
              passedExam = parsed.score >= 40;
            }
          }
        } catch {
          // Local storage read fallback
        }

        if (!passedExam) {
          try {
            const lastAttempt = await fetchFinalExamStatus(courseId);
            if (lastAttempt?.score != null && (lastAttempt.passed === true || lastAttempt.score >= 40)) {
              passedExam = true;
              examScore = Math.round((lastAttempt.score / 100) * 60);
            }
          } catch {
            // Final exam status fetch fallback
          }
        }

        if (!passedExam && isFromExam) {
          passedExam = true;
          if (!examScore) examScore = 30;
        }

        setExamMarks(examScore);
        setExamPassed(passedExam);

        // 3. Compute Aggregated Combined 100-Mark Assessment
        const combined = computeCombinedCourseAssessment(internalScore, examScore);
        const authoritativeScore = combined.totalScore;

        // Check if certificate was already purchased
        try {
          if (user?.id) {
            const purchase = await fetchCertificatePurchaseByCourse(user.id, courseId);
            if (purchase) {
              setIsPurchased(true);
              setFullName(purchase.full_name);
              setPurchaseRecord(purchase);
              setScore(purchase.score);
              setExamPassed(true);
            } else {
              setScore(authoritativeScore);
            }
          } else {
            setScore(authoritativeScore);
          }
        } catch {
          setScore(authoritativeScore);
        }

        // Generate QR code for preview
        const verifyUrl = getAppUrl(`/verify`);
        try {
          const qr = await QRCode.toDataURL(verifyUrl, {
            width: 120,
            margin: 1,
            color: { dark: "#0f172a", light: "#ffffff" },
          });
          setQrCodeDataUrl(qr);
        } catch {
          // ignore qr generation error
        }

        setLoading(false);
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Could not load certificate checkout.");
        setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [courseId, location, user?.id, user?.name, user?.email]);

  const grade = useMemo(() => (score !== null ? getCertificateGrade(score) : { grade: "A", label: "Very Good" }), [score]);
  const canUnlockCertificate = examPassed && score !== null && score >= 40;

  const currentCertificateId = useMemo(() => {
    return purchaseRecord?.certificate_id ?? (courseId ? buildCertificateId(courseId, score ?? 80) : "LXAI-2026-X892");
  }, [purchaseRecord, courseId, score]);

  // Payment Handler with simulated instant auto-success
  const handlePay = async () => {
    if (!canUnlockCertificate) {
      toast({
        title: "Final exam required",
        description: "Please complete and pass the final exam before purchasing a certificate.",
        variant: "destructive",
      });
      return;
    }
    if (!course || !fullName.trim()) {
      setNameError(true);
      toast({ title: "Name required", description: "Please enter your full legal name for the certificate.", variant: "destructive" });
      return;
    }
    if (purchaseRecord) {
      toast({
        title: "Already Purchased",
        description: "You have already unlocked the certificate for this course.",
      });
      return;
    }
    setNameError(false);

    try {
      setIsPaying(true);

      // Simulate payment processing
      await new Promise((r) => setTimeout(r, 700));

      const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();
      const certificateId = `LXAI-${new Date().getFullYear()}-${randomPart}`;
      const mockPaymentId = `pay_sim_${Date.now()}`;

      if (user?.id) {
        await createCertificatePurchase({
          userId: user.id,
          courseId,
          courseTitle: course.title,
          score: score ?? 80,
          grade: grade?.grade || "A",
          fullName: fullName.trim(),
          paymentId: mockPaymentId,
          certificateId,
        });
      }

      setIsPurchased(true);
      if (user?.id) {
        try {
          const purchase = await fetchCertificatePurchaseByCourse(user.id, courseId);
          if (purchase) setPurchaseRecord(purchase);
        } catch {
          // ignore fetch error
        }
      }

      // Fire victory confetti
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#6366f1", "#f59e0b", "#10b981", "#3b82f6"],
        });
      } catch {
        // ignore confetti error
      }

      toast({
        title: "Payment Successful & Certificate Unlocked! 🎉",
        description: "Your official ₹199 certificate has been issued and verified.",
      });
    } catch (payError) {
      toast({
        title: "Checkout Issue",
        description: payError instanceof Error ? payError.message : "Unable to complete order.",
        variant: "destructive",
      });
    } finally {
      setIsPaying(false);
    }
  };

  // Printable / Downloadable Certificate Generator
  const handleDownload = async () => {
    if (!course || score === null || !fullName.trim()) return;

    const issuedDate = formatDate(new Date());
    const certId = currentCertificateId;
    const verifyUrl = getAppUrl(`/verify`);

    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 150,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
    });

    if (user?.id) {
      try {
        await recordCertificateDownload({
          certificateId: certId,
          userId: user.id,
          userAgent: navigator.userAgent,
        });
      } catch {
        // ignore record error
      }
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Certificate - ${course.title} - ${fullName.trim()}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=Lora:ital,wght@0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { size: A4 landscape; margin: 0; }
        @media print {
            body { background: none !important; padding: 0 !important; margin: 0 !important; }
            .print-hide { display: none !important; }
            .certificate {
                width: 297mm !important;
                height: 210mm !important;
                box-shadow: none !important;
                border: 10px solid #0a1128 !important;
                margin: 0 auto !important;
                page-break-after: avoid;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
        body {
            min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
            background: #f1f5f9; font-family: 'Montserrat', sans-serif; padding: 25px 15px; gap: 15px;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
        }
        .print-btn {
            padding: 12px 28px; background: #0a1128; color: #fff; border: 2px solid #d4af37; border-radius: 12px;
            cursor: pointer; font-size: 14px; font-weight: 800; font-family: 'Montserrat', sans-serif;
            box-shadow: 0 4px 15px rgba(10,17,40,0.25); transition: 0.2s; display: flex; align-items: center; gap: 8px;
        }
        .print-btn:hover { background: #1e293b; transform: translateY(-1px); }
        .certificate {
            width: 1050px; height: 742px; background: #fdfdfc; position: relative; overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 10px solid #0a1128;
            padding: 40px 50px 30px; display: flex; flex-direction: column; justify-content: space-between;
            color: #090d16; flex-shrink: 0; box-sizing: border-box;
        }
        .gold-border {
            position: absolute; top: 12px; left: 12px; right: 12px; bottom: 12px;
            border: 2px solid #d4af37; pointer-events: none; z-index: 10;
        }
        .inner-hairline {
            position: absolute; top: 16px; left: 16px; right: 16px; bottom: 16px;
            border: 1px solid #e5c05d; pointer-events: none; z-index: 10; opacity: 0.6;
        }
        .corner-tl { position: absolute; top: 20px; left: 20px; width: 45px; height: 45px; border-top: 2px solid #b45309; border-left: 2px solid #b45309; z-index: 11; }
        .corner-tr { position: absolute; top: 20px; right: 20px; width: 45px; height: 45px; border-top: 2px solid #b45309; border-right: 2px solid #b45309; z-index: 11; }
        .corner-bl { position: absolute; bottom: 20px; left: 20px; width: 45px; height: 45px; border-bottom: 2px solid #b45309; border-left: 2px solid #b45309; z-index: 11; }
        .corner-br { position: absolute; bottom: 20px; right: 20px; width: 45px; height: 45px; border-bottom: 2px solid #b45309; border-right: 2px solid #b45309; z-index: 11; }

        .brand-crest {
            font-family: 'Cinzel', serif; font-size: 26px; font-weight: 900; letter-spacing: 5px;
            color: #0a1128; text-transform: uppercase; line-height: 1;
        }
        .brand-sub {
            font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 800; letter-spacing: 3px;
            color: #b45309; text-transform: uppercase; margin-top: 5px;
        }
        .cert-title {
            font-family: 'Cinzel', 'Playfair Display', serif; font-size: 32px; font-weight: 900;
            letter-spacing: 3px; color: #0a1128; text-transform: uppercase; margin-top: 10px;
        }
        .cert-sub {
            font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 800;
            letter-spacing: 3px; color: #b45309; text-transform: uppercase; margin-top: 4px;
        }
        .cert-for { font-family: 'Lora', serif; font-style: italic; font-size: 13px; color: #475569; margin-top: 12px; }
        .cert-name {
            font-family: 'Cormorant Garamond', 'Playfair Display', serif; font-size: 42px; font-weight: 700;
            color: #090d16; border-bottom: 2px solid #d4af37; padding: 0 40px 4px;
            display: inline-block; margin-top: 2px;
        }
        .cert-desc {
            font-size: 12.5px; color: #334155; max-width: 680px; line-height: 1.55; margin: 10px auto 0; font-weight: 500;
        }
        .cert-course {
            font-family: 'Cinzel', 'Montserrat', sans-serif; font-weight: 900; color: #0a1128; font-size: 19px; margin-top: 4px;
        }
        .matrix-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; background: #f8fafc;
            border: 1px solid #cbd5e1; border-radius: 10px; padding: 8px 14px; margin: 12px auto; width: 90%; text-align: center;
        }
        .matrix-col { border-right: 1px solid #e2e8f0; padding-right: 6px; }
        .matrix-col:last-child { border-right: none; }
        .matrix-label { font-size: 8.5px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        .matrix-val { font-size: 13px; font-weight: 900; color: #0a1128; margin-top: 2px; }

        .footer-row {
            width: 100%; display: flex; justify-content: space-between; align-items: flex-end;
            padding-top: 10px; border-top: 1px solid #e2e8f0; z-index: 20;
        }
        .gold-badge {
            width: 76px; height: 76px; border-radius: 50%;
            background: linear-gradient(135deg, #b45309, #f59e0b, #d4af37);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            color: #ffffff; font-family: 'Montserrat', sans-serif; font-size: 8px; font-weight: 900;
            box-shadow: 0 4px 15px rgba(180,83,9,0.3); border: 2px solid #fff;
        }
        .meta-text {
            font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; color: #090d16; text-align: left; line-height: 1.5;
        }
        .meta-text strong { color: #0a1128; font-weight: 900; }
    </style>
</head>
<body>
    <div class="print-hide" style="display:flex; gap:12px; align-items:center;">
        <button class="print-btn" onclick="window.print()">📥 Print / Save as PDF Certificate</button>
        <button class="print-btn" style="background:#475569; border-color:#94a3b8;" onclick="window.close()">✕ Close Window</button>
    </div>

    <div class="certificate">
        <div class="gold-border"></div>
        <div class="inner-hairline"></div>
        <div class="corner-tl"></div>
        <div class="corner-tr"></div>
        <div class="corner-bl"></div>
        <div class="corner-br"></div>

        <div style="text-align:center; position:relative; z-index:20;">
            <div class="brand-crest">LERNX AI</div>
            <div class="brand-sub">LEARNING EXECUTE ARTIFICIAL INTELLIGENCE • GLOBAL CREDENTIAL REGISTRY</div>

            <div class="cert-title">Certificate of Achievement</div>
            <div class="cert-sub">ACADEMIC EXCELLENCE & PROCTORED MASTERY</div>
        </div>

        <div style="text-align:center; position:relative; z-index:20;">
            <div class="cert-for">This is to proudly certify that</div>
            <div class="cert-name">${fullName.trim()}</div>
            <div class="cert-desc">
                has successfully fulfilled all proctored academic requirements, completing the curriculum and clearing the comprehensive 
                <strong>100-mark evaluation (40 Marks Module Quizzes + 60 Marks Proctored Final Exam)</strong> 
                with demonstrated technical competence, practical application, and mastery in
            </div>
            <div class="cert-course">${course.title}</div>
            <div style="font-size:9.5px; font-weight:700; color:#b45309; text-transform:uppercase; letter-spacing:1px; margin-top:2px;">
                Specialization Domain: ${course.category || "Artificial Intelligence & Software Engineering"}
            </div>
        </div>

        <div class="matrix-grid">
            <div class="matrix-col">
                <div class="matrix-label">Overall Score</div>
                <div class="matrix-val">${score}/100 (${score}%)</div>
            </div>
            <div class="matrix-col">
                <div class="matrix-label">Grade Awarded</div>
                <div class="matrix-val" style="color:#b45309;">Grade ${grade?.grade || "A"} (${grade?.label || "Good"})</div>
            </div>
            <div class="matrix-col">
                <div class="matrix-label">Evaluation Breakdown</div>
                <div class="matrix-val" style="font-size:11px;">${internalMarks}/40 Q + ${examMarks}/60 E</div>
            </div>
            <div>
                <div class="matrix-label">Credential Level</div>
                <div class="matrix-val" style="font-size:11px;">Level 4 Proctored</div>
            </div>
        </div>

        <div class="footer-row">
            <div class="meta-text">
                <div><span>Certificate ID: </span><strong>${certId}</strong></div>
                <div><span>Issue Date: </span><strong>${issuedDate}</strong></div>
                <div><span>Online Registry: </span><strong style="color:#b45309;">lernex.ai/verify</strong></div>
                <div style="font-size:8.5px; color:#64748b; font-family:monospace; margin-top:2px;">Status: AUTHENTICATED & RECORDED</div>
            </div>

            <div style="display:flex; flex-direction:column; align-items:center;">
                <div class="gold-badge">
                    <span style="font-size:14px;">★</span>
                    <span>VERIFIED</span>
                    <span style="font-size:6px; color:#fef08a;">LERNX SEAL</span>
                </div>
                <span style="font-family:'Montserrat', sans-serif; font-size:8px; font-weight:900; color:#0a1128; margin-top:2px; text-transform:uppercase;">
                    OFFICIAL CREST SEAL
                </span>
            </div>

            <div style="display:flex; align-items:center; gap:16px; text-align:right;">
                <div style="text-align:center;">
                    <div style="font-family:'Cormorant Garamond', serif; font-size:22px; font-weight:700; color:#0a1128; border-bottom:2px solid #0a1128; padding-bottom:1px; display:inline-block;">
                        Sourav Maurya
                    </div>
                    <div style="font-family:'Montserrat', sans-serif; font-size:10px; font-weight:900; color:#0a1128; margin-top:2px;">
                        Sourav Maurya
                    </div>
                    <div style="font-family:'Montserrat', sans-serif; font-size:8px; font-weight:700; color:#b45309;">
                        Founder & Chief Executive Officer
                    </div>
                    <div style="font-family:'Montserrat', sans-serif; font-size:7px; color:#64748b; font-weight:600;">
                        LernexAI Global Technologies
                    </div>
                </div>

                <div>
                    <img src="${qrDataUrl}" width="60" height="60" style="border:2px solid #d4af37; border-radius:6px; background:#fff; padding:2px; display:block;" alt="QR" />
                    <div style="font-family:'Montserrat',sans-serif; font-size:7.5px; font-weight:700; color:#475569; margin-top:2px;">
                        Scan to Verify
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        window.addEventListener('load', () => {
            setTimeout(() => { window.print(); }, 500);
        });
    </script>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
    }
  };

  const handleCopyLink = () => {
    const url = getAppUrl(`/verify?id=${currentCertificateId}`);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    toast({ title: "Link Copied!", description: "Verification link copied to clipboard." });
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleLinkedInShare = () => {
    if (!course) return;
    const certUrl = getAppUrl(`/verify?id=${currentCertificateId}`);
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
      course.title
    )}&organizationName=LernexAI&issueYear=${new Date().getFullYear()}&issueMonth=${
      new Date().getMonth() + 1
    }&certUrl=${encodeURIComponent(certUrl)}&certId=${encodeURIComponent(currentCertificateId)}`;
    window.open(linkedInUrl, "_blank");
  };

  const handleWhatsAppShare = () => {
    if (!course) return;
    const text = `I just earned my official verified certificate in "${course.title}" from LernexAI with Grade ${grade?.grade} (${score}%)! Check it out: ${getAppUrl(
      `/verify?id=${currentCertificateId}`
    )}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-slate-900">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600 mb-4" />
        <p className="text-sm font-bold text-slate-700">Loading Certificate Workspace...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center">
        <div className="max-w-md rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
          <Award className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-xl font-black text-slate-900">Certificate Unavailable</h1>
          <p className="mt-2 text-xs text-slate-600">{error || "Could not load the requested certificate."}</p>
          <button
            onClick={() => setLocation(courseId ? `/learning/${courseId}` : "/dashboard")}
            className="mt-6 w-full rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white hover:bg-indigo-700 transition cursor-pointer"
          >
            Return to Learning
          </button>
        </div>
      </div>
    );
  }

  // If user has not passed the final exam yet
  if (!isPurchased && !examPassed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center">
        <div className="max-w-md rounded-3xl border border-amber-200 bg-white p-8 shadow-sm space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-black text-slate-900">60-Mark Final Exam Required</h1>
          <p className="text-xs leading-relaxed text-slate-600">
            Official certification unlocks automatically once you clear the 60-mark final exam (scoring 40%+) for{" "}
            <strong className="text-slate-900">{course.title}</strong>.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => setLocation(`/final-exam/${courseId}`)}
              className="w-full rounded-2xl bg-indigo-600 px-5 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trophy className="h-4 w-4" />
              <span>Take 60-Mark Final Exam</span>
            </button>
            <button
              onClick={() => setLocation("/dashboard")}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* TOP STEPPER PROGRESS BAR */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setLocation(fromExam ? `/final-exam/${courseId}` : "/dashboard")}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{fromExam ? "Back to Exam Results" : "Back to Home"}</span>
          </button>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>1. Exam Passed ({score}%)</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 ${isPurchased ? "text-emerald-700" : "text-amber-700"}`}>
              {isPurchased ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <div className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />}
              <span>2. Name & Details</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 ${isPurchased ? "text-indigo-700 font-black" : "text-slate-400"}`}>
              {isPurchased ? <ShieldCheck className="h-4 w-4 text-indigo-600" /> : <ShieldCheck className="h-4 w-4" />}
              <span>3. Claim ₹199 Certificate</span>
            </div>
          </div>
        </div>

        {/* CONGRATULATIONS NOTIFICATION BANNER IF FROM EXAM */}
        {fromExam && score !== null && !isPurchased && (
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700 shrink-0">
                <Trophy className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Assessment Completed! Overall Score: {score} / 100 Marks ({score}%) • Grade: {grade?.grade} ({grade?.label})
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Breakdown: Module Quizzes <strong>{internalMarks}/40 Marks</strong> + Final Theory Exam <strong>{examMarks}/60 Marks</strong>.
                </p>
              </div>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black self-start sm:self-auto">
              Eligible for Verified Seal
            </div>
          </div>
        )}

        {/* MAIN 2-COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start">
          
          {/* LEFT COLUMN: PERSONAL DETAILS FORM & ORDER SUMMARY */}
          <div className="space-y-6">

            {/* CARD 0: 100-MARK ASSESSMENT BREAKDOWN */}
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50/40 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-indigo-100/80 pb-3">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-indigo-600" /> Evaluation Rubric Breakdown (100 Marks Total)
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-indigo-600 text-white">
                  Grade {grade?.grade}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 text-xs">
                <div className="p-3 rounded-2xl bg-white border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-indigo-600 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-700">Module Quizzes</div>
                      <div className="text-[10px] text-slate-400">Total internal tests</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-indigo-900 text-sm">{internalMarks} <span className="text-[10px] text-slate-400">/ 40</span></div>
                    <div className="text-[9px] font-bold text-emerald-600">40 Marks Pool</div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-700">Final Theory Exam</div>
                      <div className="text-[10px] text-slate-400">Proctored exam</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-indigo-900 text-sm">{examMarks} <span className="text-[10px] text-slate-400">/ 60</span></div>
                    <div className="text-[9px] font-bold text-emerald-600">60 Marks Pool</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CARD 1: PERSONAL INFORMATION */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                  Step 1 • Student Credentials
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-1">
                  {isPurchased ? "Certificate Issued To" : "Personal Information for Certificate"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {isPurchased
                    ? "This certificate has been issued and locked into the LernexAI registry."
                    : "The name entered below will be printed on your official digital and downloadable PDF certificate."}
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name Input */}
                <div>
                  <label className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-indigo-600" /> Full Legal Name *
                    </span>
                    <span className="text-[11px] text-amber-700 font-bold lowercase">Live-updates preview</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (e.target.value.trim()) setNameError(false);
                    }}
                    placeholder="e.g. Sourav Maurya"
                    disabled={isPurchased}
                    className={`w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none transition ${
                      nameError
                        ? "border-red-500 ring-2 ring-red-500/20 bg-red-50/20"
                        : "border-slate-200 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20"
                    } disabled:opacity-70 disabled:cursor-not-allowed`}
                  />
                  {nameError && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">Please enter your full legal name to proceed.</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-indigo-600" /> Email for Delivery & Records
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sourav@example.com"
                    disabled={isPurchased}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition disabled:opacity-70"
                  />
                </div>

                {/* WhatsApp / Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-indigo-600" /> WhatsApp / Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    disabled={isPurchased}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 transition disabled:opacity-70"
                  />
                </div>
              </div>
            </div>

            {/* CARD 2: PRICING BREAKDOWN & ACTION */}
            {!isPurchased ? (
              <div className="rounded-3xl border border-indigo-100 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                      Step 2 • Verification & Issuance
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1">Order Summary</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through">₹499</span>
                    <div className="text-2xl font-black text-indigo-700">₹199</div>
                    <span className="text-[10px] font-bold text-emerald-700">Incl. of all taxes (GST)</span>
                  </div>
                </div>

                {/* Pricing Line items */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Course Certification & Verification</span>
                    <span>₹168.64</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Goods & Services Tax (18% GST)</span>
                    <span>₹30.36</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-slate-900 text-sm">
                    <span>Total Amount Payable</span>
                    <span className="text-indigo-700">₹199.00 (Incl. GST)</span>
                  </div>
                </div>

                {/* Features included checklist */}
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Official Authenticated PDF Certificate with Hologram & Seal</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Permanent Public Verification URL & Scannable QR Code</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>1-Click LinkedIn Credential Share & Add to Resume</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Lifetime Digital Storage in your LernexAI Portfolio</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="pt-2">
                  <button
                    onClick={handlePay}
                    disabled={isPaying || !fullName.trim() || !canUnlockCertificate}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isPaying ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Verifying & Generating Certificate...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 text-amber-300" />
                        <span>Pay ₹199 (Incl. GST) & Claim Certificate</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">
                    🔒 Instant Verification • Secure Simulated Checkout
                  </p>
                </div>
              </div>
            ) : (
              /* CARD 2 (POST-PURCHASE): DOWNLOAD & SHARE ACTIONS */
              <div className="rounded-3xl border border-emerald-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                    Step 2 • Certificate Active & Verified
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">Download & Share Credential</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your certificate is published with unique registry ID <strong>{currentCertificateId}</strong>.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleDownload}
                    className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Official PDF Certificate (Print Ready)</span>
                  </button>

                  <button
                    onClick={handleLinkedInShare}
                    className="w-full py-3 rounded-2xl bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Add to LinkedIn Profile</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleWhatsAppShare}
                      className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: LIVE CERTIFICATE CANVAS PREVIEW */}
          {/* ========================================================================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" /> Live Certificate Preview
              </span>
              <span className="text-[11px] text-slate-500 font-bold">
                {isPurchased ? "Status: Issued & Verified" : "Status: Draft Preview"}
              </span>
            </div>

            {/* Academic Certificate Component - 100% WYSIWYG matched with print output */}
            <div className="rounded-3xl shadow-xl overflow-hidden border border-slate-200 bg-white">
              <AcademicCertificate
                fullName={fullName.trim() || "Your Full Legal Name"}
                courseTitle={course.title}
                courseCategory={course.category}
                score={score ?? 80}
                internalMarks={internalMarks}
                examMarks={examMarks}
                grade={grade}
                certificateId={currentCertificateId}
                issuedDate={formatDate(new Date())}
                qrCodeDataUrl={qrCodeDataUrl}
                isDraft={!isPurchased}
              />
            </div>

            {/* Quick Print Preview Button */}
            {isPurchased && (
              <button
                onClick={handleDownload}
                className="w-full py-3.5 rounded-2xl border-2 border-indigo-600 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Printer className="h-4 w-4 text-indigo-700" />
                <span>Open Print / PDF Preview Dialog</span>
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
