import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import VeloxLogo from "../components/VeloxLogo";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen w-screen bg-[#050505] overflow-hidden relative flex flex-col lg:flex-row font-sans">
      {/* Left Side: Form Area */}
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-8 lg:p-16 relative z-10 bg-[#050505]">

        <div className="w-full max-w-sm flex flex-col items-center space-y-6">
          {/* Logo & Heading */}
          <div className="flex flex-col items-center gap-2 text-center">
            <VeloxLogo size={100} className="drop-shadow-[0_0_10px_rgba(74,222,128,0.2)]" />
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-white tracking-tight">Welcome Back</h1>
              <p className="text-white/40 text-base font-medium">Access your lightning fast workspace</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black ml-1 text-white/30 uppercase tracking-[0.3em]">Identity</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="w-full h-14 pl-14 pr-8 rounded-full border border-white/5 bg-white/[0.03] text-white placeholder:text-white/10 focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all text-base shadow-inner"
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
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full h-14 pl-14 pr-16 rounded-full border border-white/5 bg-white/[0.03] text-white placeholder:text-white/10 focus:border-primary/40 focus:bg-white/[0.06] outline-none transition-all text-base shadow-inner"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 hover:text-white transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-full bg-white text-black font-black text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-white/5 disabled:opacity-50 mt-4"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin size-5" />
                  <span>Initiating...</span>
                </div>
              ) : (
                "Initiate Session"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-white/20 text-sm font-medium">
              New to Velox?{" "}
              <Link to="/signup" className="text-primary font-bold hover:underline ml-1">
                Create Identity
              </Link>
            </p>
          </div>
        </div>

        {/* Contact Us Bubble (Bottom Right of Left Side) */}
        <div className="absolute bottom-8 right-8 lg:hidden">
          <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/50 text-xs font-bold hover:bg-white/10 transition-all">
            Contact us
          </button>
        </div>
      </div>

      {/* Right Side: AuthImagePattern */}
      <div className="w-1/2 h-full">
        <AuthImagePattern
          title="Experience the Speed"
          subtitle="Connect with the world at lightning fast speeds. Secure, private, and beautiful."
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

export default LoginPage;