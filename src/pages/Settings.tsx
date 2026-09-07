import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  RefreshCw, 
  Save,
  Check,
  Zap,
  Sliders
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  // Profile Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarSeed, setAvatarSeed] = useState("Learner");

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || user.name?.split(" ")[0] || "");
      setLastName(user.last_name || user.name?.split(" ").slice(1).join(" ") || "");
      setPhone(user.phone || "");
      setAvatarSeed(user.name || user.email?.split("@")[0] || "Learner");
    }
  }, [user]);

  const currentAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}&backgroundColor=e2e8f0`;

  const handleGenerateNewAvatar = () => {
    const seeds = ["Alex", "Jordan", "Priya", "Arjun", "Kavya", "Rohan", "Dev", "Maya", "Sam"];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + Math.floor(Math.random() * 100);
    setAvatarSeed(randomSeed);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (updateUser) {
        await updateUser({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          avatar: currentAvatarUrl,
        });
      }
      setSavedSuccess(true);
      toast({
        title: "Settings Saved",
        description: "Your profile details have been updated successfully.",
      });
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update profile settings.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl">

        {/* HEADER */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-teal-600" />
            <span>Account Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl font-normal leading-relaxed">
            Manage your personal profile details and contact information.
          </p>
        </div>

        {/* PROFILE CARD */}
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            
            {/* Avatar section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
              <div className="relative">
                <img
                  src={currentAvatarUrl}
                  alt="Avatar"
                  className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-slate-200 object-cover"
                />
                <button
                  type="button"
                  onClick={handleGenerateNewAvatar}
                  className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-teal-700 text-white hover:bg-teal-800 transition shadow-md cursor-pointer"
                  title="Generate Random Avatar"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-base font-bold text-slate-900">
                  {firstName || "Learner"} {lastName}
                </h3>
                <p className="text-xs text-slate-500">{user?.email}</p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-700 text-[11px] font-bold uppercase">
                    <Zap className="w-3 h-3 text-teal-600" />
                    Pro Learner Account
                  </span>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Last Name / Surname</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-500 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : savedSuccess ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{savedSuccess ? "Saved Successfully!" : "Save Profile Changes"}</span>
              </button>
            </div>

          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}
