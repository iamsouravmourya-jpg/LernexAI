import { useState, useEffect } from "react";
import { 
  X, 
  Save, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  RefreshCw, 
  Copy, 
  Check, 
  Zap, 
  Sliders
} from "lucide-react";

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    name?: string;
    avatar?: string;
    plan_type?: string;
    created_at?: string;
  };
  onSave: (data: { first_name: string; last_name: string; phone: string; avatar?: string }) => Promise<void>;
}

export default function AccountDetailsModal({ isOpen, onClose, user, onSave }: AccountDetailsModalProps) {
  // Profile Form State
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [avatarSeed, setAvatarSeed] = useState(user.name || "Learner");

  // General UI state
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFirstName(user.first_name || user.name?.split(" ")[0] || "");
      setLastName(user.last_name || user.name?.split(" ").slice(1).join(" ") || "");
      setPhone(user.phone || "");
      setAvatarSeed(user.name || user.email?.split("@")[0] || "Learner");
      setShowSuccess(false);
    }
  }, [isOpen, user]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(user.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleGenerateNewAvatar = () => {
    const seeds = ["Alex", "Jordan", "Priya", "Arjun", "Kavya", "Rohan", "Dev", "Maya", "Sam"];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + Math.floor(Math.random() * 100);
    setAvatarSeed(randomSeed);
  };

  const currentAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}&backgroundColor=e2e8f0`;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        avatar: currentAvatarUrl,
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Failed to save account settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden border border-slate-200/80 my-8 flex flex-col">
        
        {/* HEADER HERO BANNER */}
        <div className="relative bg-teal-700 p-6 sm:p-8 text-white shrink-0">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-teal-600/30 rounded-full blur-2xl" />
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
            {/* Avatar & Change Button */}
            <div className="relative group shrink-0">
              <img
                src={currentAvatarUrl}
                alt="Avatar"
                className="w-20 h-20 rounded-2xl border-2 border-white/80 object-cover bg-white shadow-xl"
              />
              <button
                type="button"
                onClick={handleGenerateNewAvatar}
                className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-teal-800 text-white shadow-md hover:scale-110 transition-transform cursor-pointer"
                title="Randomize Avatar Preset"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-center sm:text-left space-y-1 flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white truncate">
                  {firstName ? `${firstName} ${lastName}` : "Learner Profile"}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30 text-xs font-bold">
                  <Zap className="w-3 h-3 text-teal-200" /> Pro Member
                </span>
              </div>

              <p className="text-teal-100 text-xs truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* PROFILE FORM */}
        <form onSubmit={handleSave} className="flex-1 flex flex-col">
          <div className="p-6 sm:p-8 space-y-5 flex-1">
            
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-base">Account Information</h3>
            </div>

            {/* FIRST NAME */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500 transition-all font-medium text-slate-900 bg-slate-50"
                placeholder="First Name"
                required
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Last Name / Surname
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500 transition-all font-medium text-slate-900 bg-slate-50"
                placeholder="Last Name"
                required
              />
            </div>

            {/* EMAIL READONLY WITH COPY */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium overflow-hidden">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-teal-700 hover:bg-white/50 transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* PHONE NUMBER */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-500 transition-all font-medium text-slate-900 bg-slate-50"
                  required
                />
              </div>
            </div>

          </div>

          {/* FOOTER ACTION BAR */}
          <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold shadow-lg shadow-teal-500/20 hover:bg-teal-800 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* SUCCESS POPUP OVERLAY */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50 p-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-8 w-8 animate-bounce" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Saved Successfully!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Your profile updates and contact details have been stored safely.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
