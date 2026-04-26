import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, ArrowLeft } from "lucide-react";
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
    <div className="h-screen pt-20 bg-[#050505] overflow-y-auto">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-[#0c0c0e] rounded-3xl p-8 space-y-8 border border-white/5 shadow-2xl relative">
          {/* Back Arrow */}
          <Link
            to="/"
            className="absolute left-6 top-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <ArrowLeft className="size-5 text-white/50 group-hover:text-white transition-colors" />
          </Link>

          <div className="text-center">
            <h1 className="text-3xl font-black text-white tracking-tight">Profile</h1>
            <p className="mt-2 text-white/40 font-medium">Manage your identity information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-36 rounded-full object-cover border-4 border-white/5 shadow-2xl"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-white hover:scale-110
                  p-3 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-xl
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
            <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.2em]">
              {isUpdatingProfile ? "Processing Upload..." : "Update Avatar Image"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-[10px] font-black ml-1 text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                <User className="w-3 h-3" />
                Full Name
              </div>
              <p className="px-6 py-4 bg-white/[0.03] rounded-2xl border border-white/5 text-white font-medium">{authUser?.fullName}</p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-black ml-1 text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </div>
              <p className="px-6 py-4 bg-white/[0.03] rounded-2xl border border-white/5 text-white font-medium">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-8 bg-white/[0.02] rounded-3xl p-8 border border-white/[0.03]">
            <h2 className="text-[11px] font-black mb-6 text-white/30 uppercase tracking-[0.3em]">Account Metadata</h2>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <span className="text-white/40">Member Since</span>
                <span className="text-white/80">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-white/40">Access Status</span>
                <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;