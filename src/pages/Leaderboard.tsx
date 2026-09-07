import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Trophy, 
  Gift, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Bell, 
  ShieldAlert,
  Zap,
  Star,
  Crown
} from "lucide-react";
import { Link } from "wouter";

export default function Leaderboard() {
  const [notified, setNotified] = useState(false);

  const upcomingSurprises = [
    {
      title: "Exclusive Pro Gift Vouchers",
      desc: "Top 3 learners each month receive 100% free LernexAI Pro subscription extensions.",
      icon: Gift,
      badge: "Monthly Gift",
      color: "from-amber-500 to-yellow-600",
    },
    {
      title: "Surprise AI Tech Swag & Perks",
      desc: "Top study-streak maintainers unlock high-value developer perks, vouchers & merchandise.",
      icon: Zap,
      badge: "Streak Reward",
      color: "from-teal-500 to-cyan-600",
    },
    {
      title: "Gold Verified Leaderboard Badges",
      desc: "Special cryptographic verified credentials stored securely for top performers.",
      icon: Star,
      badge: "Vault Perk",
      color: "from-purple-500 to-indigo-600",
    },
  ];

  return (
    <DashboardLayout headerBreadcrumb="Leaderboard Space">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER BADGE & TITLE */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-200">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>SPACE CLOSED FOR UPGRADE • FUTURE LAUNCH</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500 shrink-0" />
            <span>Leaderboard Space</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            This space is currently locked and undergoing upgrades. Soon, it will launch as the exclusive rewards & ranking vault for our top active learners!
          </p>
        </div>

        {/* FEATURE LOCKED CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-xl border border-slate-800">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upcoming Surprise Rewards & Gifts</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Study regularly, build daily streaks, and win surprise gifts!
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Top students who spend the most active study hours and maintain continuous daily streaks will unlock exclusive surprise gifts, free plan upgrades, and special perks distributed right here.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => setNotified(!notified)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                    notified
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-teal-600 text-white hover:bg-teal-500"
                  }`}
                >
                  {notified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Notification Set!</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4" />
                      <span>Notify Me When Leaderboard Opens</span>
                    </>
                  )}
                </button>

                <Link href="/browse">
                  <button className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer border border-white/10">
                    Keep Studying Now
                  </button>
                </Link>
              </div>
            </div>

            {/* ILLUSTRATIVE LOCK GRAPHIC */}
            <div className="shrink-0 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 text-center w-full md:w-64 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Gift className="w-8 h-8" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Target Audience</div>
                <div className="text-sm font-black text-white mt-0.5">Top Active Students Only</div>
              </div>
              <div className="pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 font-medium">
                Status: <span className="text-amber-400 font-bold">Closed for Maintenance</span>
              </div>
            </div>
          </div>
        </div>

        {/* WHAT'S COMING INSIDE LEADERBOARD */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span>What to Expect in Leaderboard</span>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
              Future Roadmap
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {upcomingSurprises.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-[11px] text-teal-700 font-bold flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
                    <span>Unlocked by High Study Activity</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM HELP FOOTER */}
        <div className="p-6 rounded-3xl bg-slate-100/80 border border-slate-200 text-center text-xs text-slate-600 font-medium">
          Start studying today to build your streak and secure your eligibility when the Leaderboard launches!
        </div>

      </div>
    </DashboardLayout>
  );
}
