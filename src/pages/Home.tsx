import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import KeyBenefits from "@/components/KeyBenefits";
import Problem from "@/components/Problem";
import FeaturedCourses from "@/components/FeaturedCourses";
import Subjects from "@/components/Subjects";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import FeatureMatrix from "@/components/FeatureMatrix";
import MetricsROI from "@/components/MetricsROI";
import LearningPath from "@/components/LearningPath";
import ComparisonSection from "@/components/ComparisonSection";
import TechStack from "@/components/TechStack";
import Certificate from "@/components/Certificate";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { PageEffects, ScrollProgress } from "@/components/anim";

function AuthRedirectScreen({ message }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-12 w-12">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-teal-200 border-t-teal-700" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-teal-600 animate-ping" />
          </div>
        </div>
        <p className="text-slate-600 text-xs font-bold tracking-tight">{message ?? "Connecting to LernexAI…"}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  const oauthCallbackSearch =
    typeof window !== "undefined" &&
    (new URL(window.location.href).searchParams.has("code") ||
      new URL(window.location.href).searchParams.has("access_token") ||
      new URL(window.location.href).searchParams.has("error") ||
      window.location.hash.includes("access_token=") ||
      window.location.hash.includes("code="))
      ? (window.location.search || "") + (window.location.hash || "")
      : null;

  useEffect(() => {
    if (oauthCallbackSearch) {
      setLocation(`/auth/callback${oauthCallbackSearch}`, { replace: true });
      return;
    }

    if (!loading && user) {
      setLocation("/dashboard", { replace: true });
    }
  }, [loading, user, setLocation, oauthCallbackSearch]);

  if (oauthCallbackSearch || loading || user) {
    return (
      <AuthRedirectScreen
        message={oauthCallbackSearch ? "Completing sign in..." : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-ink-950 text-slate-900 dark:text-white selection:bg-cyan-500/20 selection:text-cyan-700 dark:selection:text-cyan-300">
      <PageEffects />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <KeyBenefits />
        <Problem />
        <FeaturedCourses />
        <Subjects />
        <Features />
        <HowItWorks />
        <UseCases />
        <FeatureMatrix />
        <MetricsROI />
        <LearningPath />
        <ComparisonSection />
        <TechStack />
        <Certificate />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
