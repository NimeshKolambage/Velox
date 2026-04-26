import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, ArrowLeft, ShieldCheck, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-y-auto no-scrollbar selection:bg-primary/30">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-6 lg:px-12">
        <Link
          to="/"
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all active:scale-95 group"
        >
          <ArrowLeft className="size-5 text-white/50 group-hover:text-white transition-colors" />
        </Link>
        <div className="ml-6">
          <h1 className="text-xl font-black text-white tracking-tight">Profile</h1>

        </div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-12 flex flex-col items-center">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column: Avatar & Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#0c0c0e] rounded-[40px] p-8 border border-white/5 shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="relative group/avatar">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="size-40 rounded-full object-cover border-4 border-[#050505] shadow-2xl transition-transform duration-500 group-hover/avatar:scale-105"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-1 right-1 
                      bg-white hover:scale-110
                      p-3 rounded-full cursor-pointer 
                      transition-all duration-300 shadow-2xl
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                    `}
                  >
                    <Camera className="w-5 h-5 text-black" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 z-10">
                <h2 className="text-2xl font-black text-white tracking-tight">{authUser?.fullName}</h2>
                <p className="text-white/40 text-sm font-medium mt-1">{authUser?.email}</p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 w-full z-10">
                <div className="flex items-center justify-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                    Verified Agent
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Forms & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details Card */}
            <div className="bg-[#0c0c0e] rounded-[40px] p-8 border border-white/5 shadow-2xl space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <ShieldCheck className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">Security Credentials</h3>
                  <p className="text-white/30 text-xs font-medium">Your protected workspace identity</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black ml-1 text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                    <User className="size-3" />
                    Identification
                  </label>
                  <div className="px-6 py-4 bg-white/[0.02] rounded-2xl border border-white/5 text-white font-medium hover:bg-white/[0.04] transition-colors">
                    {authUser?.fullName}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black ml-1 text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Mail className="size-3" />
                    Digital Mail
                  </label>
                  <div className="px-6 py-4 bg-white/[0.02] rounded-2xl border border-white/5 text-white font-medium hover:bg-white/[0.04] transition-colors">
                    {authUser?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* System Info Card */}
            <div className="bg-[#0c0c0e] rounded-[40px] p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-zinc-500/10 border border-white/10">
                  <Calendar className="size-6 text-white/40" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">System Logs</h3>
                  <p className="text-white/30 text-xs font-medium">Account registration and history</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-wider">Access Created</span>
                    <span className="text-white font-bold mt-1">{authUser.createdAt?.split("T")[0]}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-wider">Session Token</span>
                    <span className="text-primary font-bold mt-1">Active</span>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <p className="text-[11px] text-white/20 font-bold uppercase tracking-widest text-center">
                    End-to-End Encryption Enabled for this Identity
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default ProfilePage;