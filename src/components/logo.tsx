import type { CSSProperties } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "compact";
  showTagline?: boolean;
}

export function Logo({
  className = "",
  size = "md",
  variant = "full",
  showTagline = false,
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 24, text: "text-base", sub: "text-[9px]" },
    md: { icon: 32, text: "text-lg", sub: "text-[10px]" },
    lg: { icon: 42, text: "text-2xl", sub: "text-xs" },
    xl: { icon: 54, text: "text-3xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Scientific Atomic & Wave Orbital Symbol */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tg-cyan-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#36D9E8" />
            <stop offset="100%" stopColor="#48D597" />
          </linearGradient>
          <linearGradient id="tg-emerald-cyan" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#48D597" />
            <stop offset="100%" stopColor="#36D9E8" />
          </linearGradient>
          <radialGradient id="tg-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#36D9E8" stopOpacity="1" />
            <stop offset="50%" stopColor="#48D597" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#050B18" stopOpacity="0" />
          </radialGradient>
          <filter id="tg-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer subtle orbital field */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#tg-cyan-emerald)"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          strokeDasharray="4 6"
        />

        {/* First Electron / Energy Orbit (30 deg) */}
        <ellipse
          cx="50"
          cy="50"
          rx="40"
          ry="15"
          transform="rotate(-30 50 50)"
          stroke="url(#tg-cyan-emerald)"
          strokeWidth="2.5"
          strokeOpacity="0.85"
          filter="url(#tg-glow)"
        />

        {/* Second Electron / Wave Orbit (90 deg) */}
        <ellipse
          cx="50"
          cy="50"
          rx="40"
          ry="15"
          transform="rotate(90 50 50)"
          stroke="url(#tg-emerald-cyan)"
          strokeWidth="2.5"
          strokeOpacity="0.85"
          filter="url(#tg-glow)"
        />

        {/* Third Electron / Wave Orbit (150 deg) */}
        <ellipse
          cx="50"
          cy="50"
          rx="40"
          ry="15"
          transform="rotate(30 50 50)"
          stroke="url(#tg-cyan-emerald)"
          strokeWidth="2.5"
          strokeOpacity="0.85"
          filter="url(#tg-glow)"
        />

        {/* Orbiting Quantum Particles */}
        <circle cx="82" cy="32" r="3.5" fill="#36D9E8" filter="url(#tg-glow)" />
        <circle cx="50" cy="12" r="3" fill="#48D597" filter="url(#tg-glow)" />
        <circle cx="18" cy="32" r="3.5" fill="#36D9E8" filter="url(#tg-glow)" />

        {/* Nucleus / Core Energy Glow */}
        <circle cx="50" cy="50" r="14" fill="url(#tg-core-glow)" opacity="0.6" />
        <circle cx="50" cy="50" r="7" fill="url(#tg-cyan-emerald)" filter="url(#tg-glow)" />
        <circle cx="50" cy="50" r="3" fill="#F4F8FC" />
      </svg>

      {/* Brand Wordmark */}
      {variant !== "icon" && (
        <div className="flex flex-col leading-none">
          <div className={`font-semibold tracking-tight ${currentSize.text} text-[#F4F8FC]`}>
            <span>TamGiang</span>
            <span className="bg-gradient-to-r from-[#48D597] to-[#36D9E8] bg-clip-text text-transparent font-bold">
              Physics
            </span>
          </div>
          {showTagline && (
            <span className={`font-mono tracking-wider text-[#36D9E8]/80 uppercase mt-0.5 ${currentSize.sub}`}>
              Digital Science Lab
            </span>
          )}
        </div>
      )}
    </div>
  );
}
