import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, ArrowLeft, Palette, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's the new interface looking?", isSent: false },
  { id: 2, content: "It looks incredible. The speed and design are top-notch!", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-[#050505] overflow-y-auto no-scrollbar selection:bg-primary/30 pb-20">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center px-6 lg:px-12">
        <Link 
          to="/" 
          className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all active:scale-95 group"
        >
          <ArrowLeft className="size-5 text-white/50 group-hover:text-white transition-colors" />
        </Link>
        <div className="ml-6">
          <h1 className="text-xl font-black text-white tracking-tight">Interface Settings</h1>
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Visual Environment Config</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32 max-w-6xl">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 items-start">
          
          {/* Left: Theme Selector Dashboard */}
          <div className="xl:col-span-3 bg-[#0c0c0e] rounded-[40px] p-8 border border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                <Palette className="size-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Theme Gallery</h2>
                <p className="text-white/30 text-xs font-medium">Choose your personal workspace aesthetic</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-3 p-3 rounded-[24px] transition-all duration-300
                    ${theme === t ? "bg-white/[0.08] ring-1 ring-white/20 shadow-2xl scale-105" : "hover:bg-white/[0.04]"}
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-12 w-full rounded-2xl overflow-hidden shadow-inner" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider truncate w-full text-center text-white/40 group-hover:text-white/80 transition-colors">
                    {t}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Real-time Preview */}
          <div className="xl:col-span-2 space-y-6 sticky top-32">
            <div className="bg-[#0c0c0e] rounded-[40px] p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-zinc-500/10 border border-white/10">
                  <Eye className="size-6 text-white/40" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">Live Environment</h3>
                  <p className="text-white/30 text-xs font-medium">Real-time theme visualizer</p>
                </div>
              </div>

              <div className="rounded-[32px] overflow-hidden border border-white/5 shadow-2xl" data-theme={theme}>
                <div className="bg-base-100 p-1">
                  {/* Mock Chat UI */}
                  <div className="bg-base-100 rounded-[28px] overflow-hidden shadow-2xl">
                    {/* Chat Header */}
                    <div className="px-5 py-4 border-b border-base-300/20 bg-base-100/50 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-black shadow-lg">
                          V
                        </div>
                        <div>
                          <h3 className="font-bold text-xs">Preview Mode</h3>
                          <div className="flex items-center gap-1.5">
                            <div className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                            <p className="text-[9px] font-black uppercase tracking-widest opacity-60">System Ready</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-5 space-y-4 min-h-[180px] max-h-[180px] overflow-y-auto no-scrollbar bg-base-100">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`
                              max-w-[85%] rounded-2xl p-4 shadow-sm
                              ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                            `}
                          >
                            <p className="text-xs leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-5 border-t border-base-300/20 bg-base-100/50">
                      <div className="flex gap-2">
                        <div className="flex-1 text-[10px] bg-base-200 h-10 flex items-center px-4 rounded-full opacity-50 font-medium italic">
                          Preview text input...
                        </div>
                        <div className="size-10 bg-primary rounded-full flex items-center justify-center text-primary-content shadow-lg">
                          <Send size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
              <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">
                Configuration auto-saved to cloud identity
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default SettingsPage;