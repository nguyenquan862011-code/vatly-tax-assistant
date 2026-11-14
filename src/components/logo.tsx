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
    md: { icon: 38, text: "text-lg", sub: "text-[10px]" },
    lg: { icon: 50, text: "text-2xl", sub: "text-xs" },
    xl: { icon: 64, text: "text-3xl", sub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official THPT Tam Giang Emblem Badge */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src="/logo-tamgiang.png"
          alt="Biểu trưng Trường THPT Tam Giang"
          width={currentSize.icon}
          height={currentSize.icon}
          style={{ width: `${currentSize.icon}px`, height: `${currentSize.icon}px` }}
          className="rounded-full object-contain border border-[#E2E8F0] dark:border-[#243248] shadow-xs bg-white transition-transform duration-200 hover:scale-105"
          loading="eager"
        />
      </div>

      {/* Brand Wordmark */}
      {variant !== "icon" && (
        <div className="flex flex-col leading-none">
          <div className={`font-bold tracking-tight ${currentSize.text} text-[#172033] dark:text-white`}>
            <span>TamGiang</span>
            <span className="text-[#1558C9] dark:text-[#60A5FA] ml-0.5">
              Physics
            </span>
          </div>
          {showTagline ? (
            <span className={`font-mono tracking-wider text-[#0F766E] dark:text-[#2DD4BF] uppercase mt-1 font-semibold ${currentSize.sub}`}>
              THPT Tam Giang · Digital Science Lab
            </span>
          ) : (
            <span className={`text-[#526176] dark:text-[#AAB6C8] text-[10px] mt-0.5 font-medium tracking-tight`}>
              Trường THPT Tam Giang • 1976
            </span>
          )}
        </div>
      )}
    </div>
  );
}
