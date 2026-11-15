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
    sm: { icon: 30, text: "text-base", sub: "text-[9px]" },
    md: { icon: 36, text: "text-lg", sub: "text-[10px]" },
    lg: { icon: 48, text: "text-2xl", sub: "text-xs" },
    xl: { icon: 60, text: "text-3xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official THPT Tam Giang Emblem Badge */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#16845A]/40 to-[#C8ED78]/30 blur-[4px] -z-10"
          aria-hidden="true"
        />
        <img
          src="/logo-tamgiang.png"
          alt="Logo Trường THPT Tam Giang"
          width={currentSize.icon}
          height={currentSize.icon}
          style={{ width: `${currentSize.icon}px`, height: `${currentSize.icon}px` }}
          className="rounded-full object-contain ring-1.5 ring-[#38A875]/60 shadow-[0_0_10px_rgba(56,168,117,0.3)] transition-transform duration-300 hover:scale-105 bg-white"
          loading="eager"
        />
      </div>

      {/* Brand Wordmark */}
      {variant !== "icon" && (
        <div className="flex flex-col leading-none">
          <div className={`font-semibold tracking-tight ${currentSize.text} text-inherit`}>
            <span>TamGiang</span>
            <span className="text-[#38A875] dark:text-[#72CF91] font-bold ml-0.5">Physics</span>
          </div>
          {showTagline ? (
            <span
              className={`font-mono tracking-wider text-[#63B77A] dark:text-[#72CF91] uppercase mt-1 ${currentSize.sub}`}
            >
              THPT Tam Giang · Digital Science Lab
            </span>
          ) : (
            <span
              className={`text-inherit opacity-65 text-[10px] mt-0.5 font-medium tracking-tight`}
            >
              Trường THPT Tam Giang
            </span>
          )}
        </div>
      )}
    </div>
  );
}
