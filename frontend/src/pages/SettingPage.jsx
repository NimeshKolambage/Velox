import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen bg-[#050505] overflow-y-auto pt-20">
      <div className="container mx-auto px-4 max-w-5xl pb-12">
        <div className="bg-[#0c0c0e] rounded-3xl p-8 space-y-8 border border-white/5 shadow-2xl relative">
          {/* Back Arrow */}
          <Link
            to="/"
            className="absolute left-6 top-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <ArrowLeft className="size-5 text-white/50 group-hover:text-white transition-colors" />
          </Link>

          <div className="flex flex-col gap-1 text-center">
            <h2 className="text-3xl font-black text-white tracking-tight">Appearance</h2>
            <p className="text-white/40 font-medium">Customize your visual workspace</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-2.5 p-3 rounded-2xl transition-all duration-300
                  ${theme === t ? "bg-white/[0.08] ring-1 ring-white/20 shadow-xl" : "hover:bg-white/[0.04]"}
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-10 w-full rounded-xl overflow-hidden shadow-inner" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider truncate w-full text-center text-white/40 group-hover:text-white/80 transition-colors">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>

          {/* Preview Section */}
          <div className="pt-8 border-t border-white/5">
            <h3 className="text-[11px] font-black mb-6 text-white/30 uppercase tracking-[0.3em] text-center">Live Preview</h3>
            <div className="rounded-[32px] border border-white/5 overflow-hidden bg-black/40 shadow-2xl backdrop-blur-3xl">
              <div className="p-4 sm:p-8">
                <div className="max-w-lg mx-auto">
                  {/* Mock Chat UI */}
                  <div className="bg-base-100 rounded-[24px] shadow-2xl overflow-hidden border border-base-300/20">
                    {/* Chat Header */}
                    <div className="px-5 py-4 border-b border-base-300/20 bg-base-100/50 backdrop-blur-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-black shadow-lg">
                          V
                        </div>
                        <div>
                          <h3 className="font-bold text-sm">Velox Preview</h3>
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary">System Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-6 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`
                              max-w-[80%] rounded-2xl p-4 shadow-md
                              ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                            `}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p
                              className={`
                                text-[10px] mt-2 font-medium opacity-60
                                ${message.isSent ? "text-primary-content" : "text-base-content"}
                              `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-6 border-t border-base-300/20 bg-base-100/50 backdrop-blur-md">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          className="input input-bordered flex-1 text-sm h-12 rounded-full px-6 bg-base-200/50 border-none shadow-inner"
                          placeholder="Type a message..."
                          value="This is a preview"
                          readOnly
                        />
                        <button className="btn btn-primary btn-circle h-12 w-12 min-h-0 shadow-lg shadow-primary/20">
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;