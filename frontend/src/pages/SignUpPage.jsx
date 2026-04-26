import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import VeloxLogo from "../components/VeloxLogo";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] overflow-hidden relative flex flex-col lg:flex-row font-sans">
      {/* Left Side: Form Area */}
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-8 lg:p-12 relative z-10 bg-[#050505]">

        <div className="w-full max-w-sm flex flex-col items-center space-y-5">
          {/* Logo & Heading */}
          <div className="flex flex-col items-center gap-2 text-center">
            <VeloxLogo size={80} className="drop-shadow-[0_0_10px_rgba(74,222,128,0.2)]" />
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-white tracking-tight">Create Identity</h1>
              <p className="text-white/40 text-sm font-medium">Join the lightning fast network</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black ml-1 text-white/30 uppercase tracking-[0.3em]">Full Name</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  className="w-full h-13 pl-14 pr-8 rounded-full border border-white/5 bg-white/[0.03] text-white placeholder:text-white/10 focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all text-sm shadow-inner"
                  placeholder="User Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black ml-1 text-white/30 uppercase tracking-[0.3em]">Identity</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  className="w-full h-13 pl-14 pr-8 rounded-full border border-white/5 bg-white/[0.03] text-white placeholder:text-white/10 focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all text-sm shadow-inner"
                  placeholder="user@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black ml-1 text-white/30 uppercase tracking-[0.3em]">Secret Key</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-13 pl-14 pr-16 rounded-full border border-white/5 bg-white/[0.03] text-white placeholder:text-white/10 focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all text-sm shadow-inner"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-full bg-white text-black font-black text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-white/5 disabled:opacity-50 mt-4"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin size-5" />
                  <span>Creating Identity...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-white/20 text-sm font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline ml-1">
                Access Session
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: AuthImagePattern */}
      <div className="w-1/2 h-full">
        <AuthImagePattern
          title="Join the Speed"
          subtitle="Be part of the fastest growing communication network. Secure, private, and beautiful."
        />
      </div>

      {/* Global Contact Us Bubble */}
      <div className="absolute bottom-8 right-8 z-30 hidden lg:block">
        <button className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all shadow-lg">
          Contact us
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;