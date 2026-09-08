import { useState, ReactNode } from "react";
import { useAuth, isDemoUser } from "@/context/AuthContext";
import { Link, useLocation } from "wouter";
import { 
  Menu, 
  X, 
  LogOut, 
  Home, 
  Compass, 
  BookOpen, 
  Sparkles,
  Award, 
  Crown,
  Trophy,
  Database,
  HelpCircle,
  Search,
  Bell,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Settings,
  User,
  GraduationCap
} from "lucide-react";
import AccountDetailsModal from "@/components/AccountDetailsModal";
import NotificationCenter from "@/components/NotificationCenter";
import { supabase } from "@/lib/supabase";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerBreadcrumb?: string;
}

export default function DashboardLayout({ children, title, subtitle, headerBreadcrumb }: DashboardLayoutProps) {
  const { user, logout, refreshUser } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const handleSaveAccountDetails = async (data: { first_name: string; last_name: string; phone: string; avatar?: string; bio?: string }) => {
    if (!user) return;

    const isValidUuid = user.id ? /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id) : false;

    if (isDemoUser(user) || !isValidUuid || localStorage.getItem("lernex_demo_user")) {
      const updatedUser = {
        ...user,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone || undefined,
        name: [data.first_name, data.last_name].filter(Boolean).join(" ") || user.name,
        avatar: data.avatar || user.avatar,
      };
      localStorage.setItem("lernex_demo_user", JSON.stringify(updatedUser));
      await refreshUser();
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          phone: data.phone || null
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Failed to update account:', updateError);
        return;
      }
      await refreshUser();
    } catch (err) {
      console.error('Account update error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setLocation('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const workspaceNav = [
    {
      label: "Home",
      href: "/dashboard",
      icon: Home,
      active: location === "/dashboard" || location === "/app/dashboard",
    },
    {
      label: "My learning",
      href: "/my-learning",
      icon: BookOpen,
      active: location === "/my-learning",
    },
    {
      label: "AI course builder",
      href: "/ai-builder",
      icon: Sparkles,
      active: location === "/ai-builder",
      badge: "SOON",
    },
    {
      label: "Browse courses",
      href: "/browse",
      icon: Compass,
      active: location === "/browse" || location === "/app/courses",
    },
  ];

  const yourSpaceNav = [
    {
      label: "Certificates",
      href: "/certificate",
      icon: Award,
      active: location === "/certificate" || location.startsWith("/certificate/"),
    },
    {
      label: "Upgrade Pro",
      href: "/upgrade",
      icon: Crown,
      active: location === "/upgrade",
      badge: user?.plan_type === "pro" ? "PRO" : "₹499",
    },
    {
      label: "Help center",
      href: "/support",
      icon: HelpCircle,
      active: location === "/support",
    },
  ];

  // User initials
  const initials = user?.name
    ? user.name.split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : isDemoUser(user)
    ? "DS"
    : "ST";

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans lg:flex overflow-x-hidden">
      
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity" 
          onClick={() => setMobileMenuOpen(false)} 
          aria-hidden="true" 
        />
      )}

      {/* LEFT SIDEBAR - HIGH VISIBILITY & BOLD STRUCTURE */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 flex flex-col justify-between bg-white border-r-2 border-slate-200/90 shadow-md transition-all duration-300 ease-in-out h-screen ${
          isCollapsed ? "w-20" : "w-64"
        } ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* TOP BRAND HEADER (MATCHING LANDING PAGE) */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between h-20 px-5 border-b border-slate-200/80 bg-slate-50/50">
            <Link href="/dashboard" className="flex items-center gap-2.5 cursor-pointer group overflow-hidden">
              {/* Official LernexAI Logo Icon */}
              <img 
                src="/lernexai-logo.svg" 
                alt="LernexAI" 
                className="h-10 w-10 shrink-0 rounded-xl shadow-md shadow-orange-500/15 transition-transform group-hover:scale-105 object-contain" 
              />
              {/* Indian Tricolor Brand Text */}
              {(!isCollapsed || mobileMenuOpen) && (
                <div className="flex flex-col whitespace-nowrap transition-opacity duration-200">
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-[#FF671F] via-[#0437F2] to-[#046A38] bg-clip-text text-transparent">
                    LernexAI
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Collapse Toggle */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4 stroke-[2.5]" /> : <ChevronLeft className="w-4 h-4 stroke-[2.5]" />}
            </button>

            {/* Mobile Close Button */}
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(false)} 
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200/70 hover:text-slate-900" 
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <div className="p-4 space-y-6 flex-1">
            {/* WORKSPACE SECTION */}
            <div>
              {(!isCollapsed || mobileMenuOpen) && (
                <div className="px-3.5 mb-2.5 text-[11px] font-black tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                  WORKSPACE
                </div>
              )}
              <nav className="space-y-1.5">
                {workspaceNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      title={isCollapsed ? item.label : undefined}
                      className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-black text-sm tracking-tight transition-all duration-200 group cursor-pointer ${
                        item.active
                          ? "bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-md shadow-teal-700/30"
                          : "text-slate-800 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 font-bold"
                      } ${isCollapsed && !mobileMenuOpen ? "justify-center px-0" : ""}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 stroke-[2.5] transition-transform group-hover:scale-110 ${item.active ? "text-white" : "text-slate-700 group-hover:text-slate-950"}`} />
                      
                      {(!isCollapsed || mobileMenuOpen) && (
                        <span className="truncate flex-1 font-bold tracking-tight text-slate-900 group-hover:text-black">{item.label}</span>
                      )}

                      {(!isCollapsed || mobileMenuOpen) && item.badge && (
                        <span className={`px-2 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider ${
                          item.active 
                            ? "bg-white/20 text-white" 
                            : "bg-teal-100 text-teal-900 border border-teal-200"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* YOUR SPACE SECTION */}
            <div>
              {(!isCollapsed || mobileMenuOpen) && (
                <div className="px-3.5 mb-2.5 text-[11px] font-black tracking-wider text-slate-800 dark:text-slate-200 uppercase">
                  YOUR SPACE
                </div>
              )}
              <nav className="space-y-1.5">
                {yourSpaceNav.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-black text-sm tracking-tight transition-all duration-200 group cursor-pointer ${
                        item.active
                          ? "bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-md shadow-teal-700/30"
                          : "text-slate-800 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 font-bold"
                      } ${isCollapsed && !mobileMenuOpen ? "justify-center px-0" : ""}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 stroke-[2.5] transition-transform group-hover:scale-110 ${item.active ? "text-white" : "text-slate-700 group-hover:text-slate-950"}`} />
                      
                      {(!isCollapsed || mobileMenuOpen) && (
                        <span className="truncate flex-1 font-bold tracking-tight text-slate-900 group-hover:text-black">{item.label}</span>
                      )}
                    </div>
                  );

                  if (item.onClick) {
                    return (
                      <div key={item.label} onClick={() => { item.onClick(); setMobileMenuOpen(false); }}>
                        {content}
                      </div>
                    );
                  }

                  return (
                    <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      {content}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* BOTTOM AI PROMO CARD */}
        {(!isCollapsed || mobileMenuOpen) && (
          <div className="p-4">
            <Link href="/ai-builder" onClick={() => setMobileMenuOpen(false)} className="block">
              <div className="rounded-3xl p-4 bg-teal-50 border border-teal-200/90 hover:border-teal-400 transition-all group shadow-xs cursor-pointer">
                <div className="flex items-center gap-2 text-teal-900 text-xs font-extrabold mb-1">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                  <span>AI Course Studio (Roadmap)</span>
                </div>
                <p className="text-xs text-slate-600 mb-2 leading-relaxed font-medium">
                  Custom AI Curriculum Builder coming in future update.
                </p>
                <div className="text-xs font-bold text-teal-800 group-hover:text-teal-950 flex items-center gap-1.5 transition-colors">
                  <span>View Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={`min-w-0 flex-1 min-h-screen transition-all duration-300 ${
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      }`}>
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(true)} 
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:text-slate-900 hover:border-teal-500 lg:hidden cursor-pointer shrink-0" 
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {headerBreadcrumb ? (
              <span className="text-sm font-bold text-slate-700 hidden sm:inline-block">
                {headerBreadcrumb}
              </span>
            ) : null}

            {/* Global Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && globalSearch.trim()) {
                    setLocation(`/app/courses?q=${encodeURIComponent(globalSearch.trim())}`);
                  }
                }}
                placeholder="Search courses, skills, or topics"
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:border-teal-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Notifications Center */}
            <NotificationCenter user={user} />

            {/* User Profile Avatar with Initials */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center border border-teal-200 hover:ring-2 hover:ring-teal-400 transition-all cursor-pointer shadow-sm"
              >
                {initials}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-12 w-60 bg-white rounded-2xl border border-slate-200 shadow-2xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <div className="font-bold text-sm text-slate-900 truncate">
                      {user?.name || user?.email?.split('@')[0] || (isDemoUser(user) ? "Demo Student" : "Student")}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {user?.email || (isDemoUser(user) ? "demo@lernexai.com" : "")}
                    </div>
                    {isDemoUser(user) && (
                      <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Demo Mode
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => { setProfileDropdownOpen(false); setAccountDetailsOpen(true); }}
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-all flex items-center gap-2.5 cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={async () => { setProfileDropdownOpen(false); await handleLogout(); }}
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50 transition-all flex items-center gap-2.5 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 sm:p-8 lg:p-10 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>

      <AccountDetailsModal
        isOpen={accountDetailsOpen}
        onClose={() => setAccountDetailsOpen(false)}
        user={{
          id: user?.id || "",
          email: user?.email || "",
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone: user?.phone,
          name: user?.name,
          avatar: user?.avatar,
          plan_type: user?.plan_type,
          created_at: user?.created_at,
        }}
        onSave={handleSaveAccountDetails}
      />
    </div>
  );
}
