import React, { forwardRef } from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

export interface AcademicCertificateProps {
  fullName: string;
  courseTitle: string;
  courseCategory?: string;
  score: number;
  internalMarks?: number;
  examMarks?: number;
  grade?: {
    grade: string;
    label: string;
    description?: string;
  };
  certificateId: string;
  issuedDate: string;
  qrCodeDataUrl?: string;
  isDraft?: boolean;
}

export const AcademicCertificate = forwardRef<HTMLDivElement, AcademicCertificateProps>(
  (
    {
      fullName,
      courseTitle,
      courseCategory = "Artificial Intelligence & Software Engineering",
      score,
      internalMarks = 36,
      examMarks = 54,
      grade = { grade: "A", label: "Very Good" },
      certificateId,
      issuedDate,
      qrCodeDataUrl,
      isDraft = false,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        id="printable-academic-certificate"
        className="academic-certificate-container w-full max-w-[1000px] aspect-[1.414/1] bg-[#fdfdfc] text-[#090d16] relative overflow-hidden rounded-2xl shadow-2xl border-[8px] border-[#0a1128] p-6 sm:p-10 flex flex-col justify-between select-none mx-auto print:m-0 print:w-[297mm] print:h-[210mm] print:max-w-none print:shadow-none print:border-[10px] print:border-[#0a1128] print:rounded-none"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* ========================================================================= */}
        {/* ORNATE BORDERS & BACKGROUND WATERMARK (Guilloche / Security pattern) */}
        {/* ========================================================================= */}
        {/* Outer Gold Accent Border */}
        <div className="absolute inset-2 sm:inset-3 border-2 border-[#d4af37] pointer-events-none rounded-xl print:rounded-none z-10 opacity-90" />
        {/* Inner Fine Gold Hairline */}
        <div className="absolute inset-3 sm:inset-4 border border-[#e5c05d] pointer-events-none rounded-lg print:rounded-none z-10 opacity-60" />

        {/* Decorative Corner Ornaments */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#b45309] pointer-events-none z-20" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#b45309] pointer-events-none z-20" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#b45309] pointer-events-none z-20" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#b45309] pointer-events-none z-20" />

        {/* Security Background Pattern / Seal Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035] z-0">
          <svg viewBox="0 0 500 500" className="w-[85%] h-[85%]">
            <circle cx="250" cy="250" r="230" stroke="#0a1128" strokeWidth="4" fill="none" />
            <circle cx="250" cy="250" r="215" stroke="#0a1128" strokeWidth="1" strokeDasharray="6,6" fill="none" />
            <circle cx="250" cy="250" r="170" stroke="#0a1128" strokeWidth="2" fill="none" />
            <text x="250" y="240" textAnchor="middle" fontSize="38" fontWeight="bold" fill="#0a1128" letterSpacing="4">
              LERNX AI ACADEMY
            </text>
            <text x="250" y="280" textAnchor="middle" fontSize="22" fontWeight="600" fill="#0a1128" letterSpacing="6">
              VERIFIED CREDENTIAL
            </text>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* 1. INSTITUTIONAL CREST & HEADER */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex flex-col items-center text-center">
          {/* Top Crest / Shield */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0a1128] via-[#1e293b] to-[#0a1128] p-0.5 shadow-md flex items-center justify-center border border-[#d4af37]">
              <div className="w-full h-full rounded-lg bg-[#0a1128] flex items-center justify-center text-[#d4af37]">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div className="text-left">
              <div
                className="text-lg sm:text-2xl font-black tracking-[0.25em] text-[#0a1128] uppercase leading-none"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                LERNX AI
              </div>
              <div className="text-[8px] sm:text-[9.5px] font-bold text-[#b45309] uppercase tracking-[0.22em] mt-1">
                LEARNING EXECUTE ARTIFICIAL INTELLIGENCE • GLOBAL CREDENTIAL REGISTRY
              </div>
            </div>
          </div>

          {/* Certificate Main Title */}
          <div className="mt-3 sm:mt-4">
            <h1
              className="text-xl sm:text-3xl lg:text-4xl font-black uppercase text-[#0a1128] tracking-[0.12em]"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              Certificate of Achievement
            </h1>
            <div className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-[0.3em] text-[#b45309] mt-1 flex items-center justify-center gap-2">
              <span className="h-px w-6 sm:w-12 bg-[#b45309] inline-block" />
              <span>ACADEMIC EXCELLENCE & PROCTORED MASTERY</span>
              <span className="h-px w-6 sm:w-12 bg-[#b45309] inline-block" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. RECIPIENT & CITATION SECTION */}
        {/* ========================================================================= */}
        <div className="relative z-20 text-center my-auto py-2">
          <p
            className="text-xs sm:text-sm italic text-[#475569]"
            style={{ fontFamily: "'Lora', 'Cormorant Garamond', serif" }}
          >
            This is to proudly certify that
          </p>

          {/* Student Full Name */}
          <div className="my-1 sm:my-2">
            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#090d16] px-6 py-1 inline-block border-b-2 border-[#d4af37]"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              {fullName.trim() || "Student Full Legal Name"}
            </h2>
          </div>

          {/* Citation Body */}
          <p className="text-[11px] sm:text-[13px] text-[#334155] max-w-2xl mx-auto leading-relaxed mt-2 sm:mt-3 font-medium">
            has successfully fulfilled all proctored academic requirements, completing the curriculum and clearing the comprehensive 
            <strong className="text-[#090d16] font-bold"> 100-mark evaluation (40 Marks Module Quizzes + 60 Marks Proctored Final Exam) </strong> 
            with demonstrated technical competence, practical application, and mastery in
          </p>

          {/* Course Name */}
          <div className="mt-2">
            <div
              className="text-base sm:text-xl lg:text-2xl font-black text-[#0a1128] tracking-tight"
              style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
            >
              {courseTitle}
            </div>
            <div className="text-[9px] sm:text-[10px] font-bold text-[#b45309] uppercase tracking-wider mt-0.5">
              Specialization Domain: {courseCategory}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TRANSCRIPT & PERFORMANCE MATRIX (Coursera / Great Learning Style) */}
        {/* ========================================================================= */}
        <div className="relative z-20 my-2">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-xl p-2 sm:p-3 text-center shadow-xs">
            <div className="border-r border-[#e2e8f0] pr-1">
              <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#64748b]">Overall Score</div>
              <div className="text-xs sm:text-base font-black text-[#0a1128] mt-0.5">{score}/100 ({score}%)</div>
            </div>
            <div className="border-r border-[#e2e8f0] pr-1">
              <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#64748b]">Grade Awarded</div>
              <div className="text-xs sm:text-base font-black text-[#b45309] mt-0.5">
                Grade {grade?.grade || "A"} ({grade?.label || "Good"})
              </div>
            </div>
            <div className="border-r border-[#e2e8f0] pr-1">
              <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#64748b]">Evaluation Breakdown</div>
              <div className="text-[10px] sm:text-xs font-bold text-[#0a1128] mt-0.5">
                {internalMarks}/40 Q + {examMarks}/60 E
              </div>
            </div>
            <div>
              <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#64748b]">Credential Level</div>
              <div className="text-[10px] sm:text-xs font-extrabold text-[#0a1128] mt-0.5">
                Level 4 Proctored
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. FOOTER: VERIFICATION METADATA, GOLD EMBOSSED SEAL & FOUNDER SIGNATURE */}
        {/* ========================================================================= */}
        <div className="relative z-20 pt-3 border-t border-[#e2e8f0] flex items-end justify-between gap-4">
          
          {/* Left: Credential Metadata */}
          <div className="text-left text-[9px] sm:text-[11px] text-[#090d16] space-y-0.5 font-semibold">
            <div>
              <span className="text-[#64748b] font-normal">Certificate ID: </span>
              <strong className="text-[#0a1128] font-black">{certificateId}</strong>
            </div>
            <div>
              <span className="text-[#64748b] font-normal">Issue Date: </span>
              <strong className="text-[#0a1128] font-black">{issuedDate}</strong>
            </div>
            <div>
              <span className="text-[#64748b] font-normal">Online Registry: </span>
              <strong className="text-[#b45309] font-black">lernex.ai/verify</strong>
            </div>
            <div className="text-[8px] sm:text-[9px] text-[#94a3b8] font-mono">
              Status: {isDraft ? "PREVIEW DRAFT" : "AUTHENTICATED & RECORDED"}
            </div>
          </div>

          {/* Center: 3D Official Embossed Gold Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#b45309] via-[#f59e0b] to-[#d4af37] p-1 shadow-lg flex items-center justify-center border-2 border-white">
              <div className="w-full h-full rounded-full border border-dashed border-[#fef3c7] flex flex-col items-center justify-center text-white text-center p-1 bg-gradient-to-b from-[#b45309]/90 to-[#78350f]">
                <Sparkles className="w-3.5 h-3.5 text-[#fef08a]" />
                <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase">VERIFIED</span>
                <span className="text-[6px] sm:text-[7px] font-bold text-[#fef08a] uppercase">LERNX SEAL</span>
              </div>
            </div>
            <div className="text-[8px] sm:text-[9px] font-black uppercase text-[#0a1128] tracking-wider mt-1">
              OFFICIAL CREST SEAL
            </div>
          </div>

          {/* Right: Founder Signature & High-Res QR Code */}
          <div className="flex items-center gap-3 sm:gap-4 text-right">
            {/* Signature Block */}
            <div className="text-center">
              <div
                className="text-xl sm:text-2xl font-bold text-[#0a1128] border-b-2 border-[#0a1128] pb-0.5 leading-none px-2"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', cursive, serif" }}
              >
                Sourav Maurya
              </div>
              <div className="text-[10px] sm:text-[11px] font-black text-[#0a1128] tracking-tight mt-1">
                Sourav Maurya
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold text-[#b45309] leading-tight">
                Founder & Chief Executive Officer
              </div>
              <div className="text-[7px] sm:text-[8px] text-[#64748b] font-semibold">
                LernexAI Global Technologies
              </div>
            </div>

            {/* QR Code */}
            <div className="text-center">
              {qrCodeDataUrl ? (
                <img
                  src={qrCodeDataUrl}
                  alt="Verification QR"
                  className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-[#d4af37] rounded-lg p-0.5 bg-white shadow-xs inline-block"
                />
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 border border-slate-300 rounded-lg" />
              )}
              <div className="text-[7px] sm:text-[8px] font-bold text-[#475569] mt-0.5">
                Scan to Verify
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
);

AcademicCertificate.displayName = "AcademicCertificate";
