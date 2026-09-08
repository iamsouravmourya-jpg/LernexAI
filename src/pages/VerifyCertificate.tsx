import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link } from "wouter";
import { 
  Award, 
  CheckCircle2, 
  Loader2, 
  Search, 
  ShieldAlert, 
  XCircle, 
  QrCode, 
  ShieldCheck, 
  Share2, 
  Sparkles, 
  Check, 
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  PageEffects, 
  ScrollProgress, 
  MeshGradientBackground, 
  Reveal, 
  GradientText 
} from "@/components/anim";
import { verifyCertificatePublic, type CertificateVerification } from "@/lib/certificates";

function formatIssuedDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

export default function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertificateVerification | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id") || params.get("certificate_id");
    if (idParam) {
      setCertificateId(idParam);
      void runVerify(idParam);
    }
  }, []);

  const runVerify = useCallback(async (id: string) => {
    const trimmed = id.trim();
    if (!trimmed) {
      setError("Please enter a valid certificate ID to verify.");
      setResult(null);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const verification = await verifyCertificatePublic(trimmed);
      setResult(verification);
    } catch (verifyError) {
      setResult(null);
      setError(verifyError instanceof Error ? verifyError.message : "Verification failed due to a network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void runVerify(certificateId);
  };

  const handleQuickTest = (sampleId: string) => {
    setCertificateId(sampleId);
    void runVerify(sampleId);
  };

  const copyVerificationLink = () => {
    const shareUrl = `${window.location.origin}/verify?id=${result?.certificate_id || certificateId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-cyan-500/20 selection:text-cyan-700 font-sans relative overflow-hidden">
      <PageEffects />
      <ScrollProgress />
      <Navbar />

      <main className="relative pt-28 pb-20">
        <MeshGradientBackground />

        {/* Top Header & Breadcrumb */}
        <section className="relative mx-auto max-w-7xl px-6 py-12">
          <Reveal variant="up">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/">
                <button className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-cyan-500/60 hover:text-cyan-600">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </button>
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-50 px-3.5 py-1 text-xs font-semibold text-cyan-700">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-600" />
                <span>Public Certificate Verification</span>
              </div>
            </div>
          </Reveal>

          {/* Hero Banner Card */}
          <Reveal variant="up" delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-xl text-ink-950">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700 mb-3">
                    Public Verification Portal
                  </span>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
                    Verify <GradientText text="Credentials" />
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                    Check a LernexAI certificate ID and view the course, score, grade, and issue details stored for public verification.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Verification Form Card */}
        <section className="mx-auto max-w-4xl px-6">
          <Reveal variant="up" delay={150}>
            <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl hover:border-cyan-500/40 transition-all">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                <label htmlFor="certificate-id" className="block text-sm font-bold text-slate-900">
                  Enter Certificate ID or Scan QR Hash
                </label>
                <span className="text-xs font-medium text-slate-500">Enter the certificate ID from the certificate</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-cyan-600">
                    <QrCode className="h-5 w-5" />
                  </span>
                  <input
                    id="certificate-id"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="Enter your certificate ID"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-cyan-500 focus:bg-white"
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 transition-all cursor-pointer"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin text-white" /> : <Search className="h-5 w-5 text-white" />}
                  Verify Now
                </button>
              </div>

            </form>
          </Reveal>

          {/* Error Notice */}
          {error && (
            <Reveal variant="up">
              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
                <ShieldAlert className="mt-0.5 h-6 w-6 text-red-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-base mb-1 text-red-900">Verification Error</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </Reveal>
          )}

          {/* Success Verification Card */}
          {hasSearched && !loading && !error && result?.valid && (
            <Reveal variant="up" delay={200}>
              <div className="mt-8 rounded-3xl border border-emerald-300 bg-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                      <CheckCircle2 className="h-9 w-9" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1 border border-emerald-200">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Certificate Record Found</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{result.full_name}</h2>
                    </div>
                  </div>

                  <button
                    onClick={copyVerificationLink}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-4 w-4 text-cyan-600" />
                        <span>Share Credential</span>
                      </>
                    )}
                  </button>
                </div>

                <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <dt className="text-xs text-slate-500 font-medium mb-1">Certified Course / Program</dt>
                    <dd className="font-bold text-slate-900 text-base">{result.course_title}</dd>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <dt className="text-xs text-slate-500 font-medium mb-1">Earned Grade & Performance</dt>
                    <dd className="flex items-center gap-2">
                      <span className="font-black text-base text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">
                        Grade {result.grade}
                      </span>
                      <span className="text-slate-700 font-bold">({result.score}% Score)</span>
                    </dd>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <dt className="text-xs text-slate-500 font-medium mb-1">Issue Date</dt>
                    <dd className="font-bold text-slate-900">{result.issued_at ? formatIssuedDate(result.issued_at) : "Verified"}</dd>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <dt className="text-xs text-slate-500 font-medium mb-1">Certificate ID</dt>
                    <dd className="font-mono text-xs font-bold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200 inline-block">
                      {result.certificate_id}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-cyan-600" />
                    <span>Issued by LernexAI</span>
                  </div>
                  <Link href="/browse">
                    <span className="font-bold text-cyan-700 hover:text-cyan-800 transition-colors cursor-pointer flex items-center gap-1">
                      Browse All Certified Courses <ExternalLink className="h-3 w-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {/* Not Found State */}
          {hasSearched && !loading && !error && result && !result.valid && (
            <Reveal variant="up" delay={200}>
              <div className="mt-8 rounded-3xl border border-amber-200 bg-white p-8 sm:p-12 text-center shadow-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-4 border border-amber-200">
                  <XCircle className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Certificate Not Found</h2>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  We could not find any active verified record matching this Credential ID. Please double check the alphanumeric sequence or rescan the QR code.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setCertificateId("");
                      setHasSearched(false);
                    }}
                    className="rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Try Another ID
                  </button>
                </div>
              </div>
            </Reveal>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
