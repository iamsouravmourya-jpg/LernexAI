import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ComingSoonProvider } from "@/context/ComingSoonContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";

// Pages
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import AuthCallback from "@/pages/AuthCallback";
import Dashboard from "@/pages/Dashboard";
import Browse from "@/pages/Browse";
import CourseDetail from "@/pages/CourseDetail";
import MyLearning from "@/pages/MyLearning";
import AiBuilder from "@/pages/AiBuilder";
import Learning from "@/pages/Learning";
import FinalExam from "@/pages/FinalExam";
import Certificates from "@/pages/Certificates";
import CertificateCheckoutPage from "@/pages/CertificateCheckoutPage";
import VerifyCertificate from "@/pages/VerifyCertificate";
import Upgrade from "@/pages/Upgrade";
import Support from "@/pages/Support";
import Settings from "@/pages/Settings";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";
import AboutFounder from "@/pages/AboutFounder";
import Careers from "@/pages/Careers";
import Blog from "@/pages/Blog";
import Press from "@/pages/Press";
import Investors from "@/pages/Investors";
import Community from "@/pages/Community";
import ApiDocs from "@/pages/ApiDocs";
import StatusPage from "@/pages/StatusPage";
import SystemRequirements from "@/pages/SystemRequirements";
import Scholarships from "@/pages/Scholarships";
import CookiePolicy from "@/pages/CookiePolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import Accessibility from "@/pages/Accessibility";
import Gdpr from "@/pages/Gdpr";
import LearningPaths from "@/pages/LearningPaths";
import Sandboxes from "@/pages/Sandboxes";
import AiTutorPage from "@/pages/AiTutorPage";
import Leaderboard from "@/pages/Leaderboard";
import MobileApp from "@/pages/MobileApp";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/auth");
    }
  }, [loading, user, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-cyan-400 border-t-transparent mx-auto mb-4" />
          <p className="text-slate-400 text-sm font-medium">Checking your session...</p>
        </div>
      </div>
    );
  }

  return user ? <Component /> : null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/contact" component={Contact} />
      <Route path="/about-founder" component={AboutFounder} />
      <Route path="/about" component={AboutFounder} />
      <Route path="/about-us" component={AboutFounder} />
      <Route path="/verify" component={VerifyCertificate} />
      <Route path="/support" component={Support} />
      <Route path="/careers" component={Careers} />
      <Route path="/blog" component={Blog} />
      <Route path="/press" component={Press} />
      <Route path="/investors" component={Investors} />
      <Route path="/community" component={Community} />
      <Route path="/docs" component={ApiDocs} />
      <Route path="/status" component={StatusPage} />
      <Route path="/system-requirements" component={SystemRequirements} />
      <Route path="/scholarships" component={Scholarships} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route path="/refund" component={RefundPolicy} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/gdpr" component={Gdpr} />
      <Route path="/learning-paths" component={LearningPaths} />
      <Route path="/sandboxes" component={Sandboxes} />
      <Route path="/ai-tutor" component={AiTutorPage} />
      <Route path="/mobile-app" component={MobileApp} />
      <Route path="/auth" component={Auth} />
      <Route path="/auth/callback" component={AuthCallback} />

      {/* Protected Routes */}
      <Route path="/upgrade">
        {() => <ProtectedRoute component={Upgrade} />}
      </Route>
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/app/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/browse">
        {() => <ProtectedRoute component={Browse} />}
      </Route>
      <Route path="/app/courses">
        {() => <ProtectedRoute component={Browse} />}
      </Route>
      <Route path="/course/:id">
        {() => <ProtectedRoute component={CourseDetail} />}
      </Route>
      <Route path="/my-learning">
        {() => <ProtectedRoute component={MyLearning} />}
      </Route>
      <Route path="/ai-builder">
        {() => <ProtectedRoute component={AiBuilder} />}
      </Route>
      <Route path="/learning/:courseId">
        {() => <ProtectedRoute component={Learning} />}
      </Route>
      <Route path="/final-exam/:courseId">
        {() => <ProtectedRoute component={FinalExam} />}
      </Route>
      <Route path="/certificate">
        {() => <ProtectedRoute component={Certificates} />}
      </Route>
      {/* Leaderboard feature temporarily disabled for future release */}
      <Route path="/leaderboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/app/leaderboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/certificate/:courseId">
        {() => <ProtectedRoute component={CertificateCheckoutPage} />}
      </Route>
      <Route path="/settings">
        {() => <ProtectedRoute component={Settings} />}
      </Route>
      <Route path="/profile">
        {() => <ProtectedRoute component={Settings} />}
      </Route>
      <Route path="/account">
        {() => <ProtectedRoute component={Settings} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <LanguageProvider>
            <ComingSoonProvider>
              <ScrollToTop />
              <ErrorBoundary>
                <Router />
              </ErrorBoundary>
              <Toaster />
              <Analytics />
            </ComingSoonProvider>
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
