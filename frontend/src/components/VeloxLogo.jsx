import React from "react";

const VeloxLogo = ({ size = 40, className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sleeker Dark Container */}
        <rect width="100" height="100" rx="30" fill="#0C0C0E" />
        
        {/* Subtle Inner Gradient Detail */}
        <rect x="2" y="2" width="96" height="96" rx="28" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

        {/* Minimalist Glowing Green Chat Bubble */}
        <g filter="url(#modernGlow)">
          <path
            d="M50 25C36.1929 25 25 36.1929 25 50C25 56.5 27.5 62.5 31.5 67L27 75L36 71.5C39.5 73.5 44.5 75 50 75C63.8071 75 75 63.8071 75 50C75 36.1929 63.8071 25 50 25Z"
            fill="#4ADE80"
          />
        </g>

        {/* Sharper Black Lightning Bolt */}
        <path
          d="M54 36L38 54H48L44 68L60 50H50L54 36Z"
          fill="#000000"
        />

        <defs>
          <filter id="modernGlow" x="0" y="0" width="200%" height="200%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default VeloxLogo;
