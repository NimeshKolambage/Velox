import React from "react";
import DecryptedText from "./DecryptedText";

const AuthImagePattern = ({ title, subtitle }) => {
  // Mapping your custom avatars from the public folder
  const avatarImages = [
    "/images-removebg-preview.png",
    "/images__1_-removebg-preview (1).png",
    "/images__2_-removebg-preview.png",
    "/images__3_-removebg-preview.png",
    "/images__4_-removebg-preview.png",
    "/images__5_-removebg-preview.png",
    "/images__6_-removebg-preview.png",
    "/images__7_-removebg-preview.png",
    "/images__8_-removebg-preview.png",
  ];

  // Modern background gradients to make the avatars pop
  const backgrounds = [
    "bg-blue-500/10", "bg-emerald-500/10", "bg-orange-500/10",
    "bg-purple-500/10", "bg-cyan-500/10", "bg-yellow-500/10",
    "bg-pink-500/10", "bg-lime-500/10", "bg-violet-500/10"
  ];

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-[#050505] p-12 w-full h-full relative overflow-hidden">
      <div className="max-w-md w-full relative z-10">
        {/* 3x3 Grid of Boxes with Your Custom Avatars */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {avatarImages.map((imgSrc, i) => (
            <div
              key={i}
              className={`aspect-square rounded-[28px] bg-white/[0.02] border border-white/[0.05] flex items-center justify-center relative overflow-hidden group transition-all duration-500 hover:scale-105 hover:bg-white/[0.04] hover:border-white/10
              ${i % 2 === 0 ? "animate-pulse" : ""}`}
            >
              {/* Soft Ambient Background for Avatar */}
              <div className={`absolute inset-4 rounded-full blur-2xl opacity-20 ${backgrounds[i]}`} />

              {/* Your Custom Avatar Image */}
              <img 
                src={imgSrc} 
                alt={`Avatar ${i + 1}`}
                className="w-20 h-20 object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Bottom Glow Detail */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>

        {/* Text Content with Decrypt Animation */}
        <div className="text-center space-y-4 min-h-[100px]">
          <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">
            <DecryptedText text={title} speed={100} delay={500} loop={true} />
          </h2>
          <p className="text-white/40 text-lg leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Dynamic Glow Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
    </div>
  );
};

export default AuthImagePattern;