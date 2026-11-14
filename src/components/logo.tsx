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
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#36D9E8]/40 to-[#48D597]/40 blur-[5px] -z-10"
          aria-hidden="true"
        />
        <img
          src="/logo-tamgiang.png"
          alt="Logo Trường THPT Tam Giang"
          width={currentSize.icon}
          height={currentSize.icon}
          style={{ width: `${currentSize.icon}px`, height: `${currentSize.icon}px` }}
          className="rounded-full object-contain ring-2 ring-[#36D9E8]/50 shadow-[0_0_12px_rgba(54,217,232,0.35)] transition-transform duration-300 hover:scale-105 bg-white"
          loading="eager"
        />
      </div>

      {/* Brand Wordmark */}
      {variant !== "icon" && (
        <div className="flex flex-col leading-none">
          <div className={`font-semibold tracking-tight ${currentSize.text} text-[#F4F8FC]`}>
            <span>TamGiang</span>
            <span className="bg-gradient-to-r from-[#48D597] to-[#36D9E8] bg-clip-text text-transparent font-bold">
              Physics
            </span>
          </div>
          {showTagline ? (
            <span className={`font-mono tracking-wider text-[#36D9E8]/90 uppercase mt-1 ${currentSize.sub}`}>
              THPT Tam Giang · Digital Science Lab
            </span>
          ) : (
            <span className={`text-[#F4F8FC]/60 text-[10px] mt-0.5 font-medium tracking-tight`}>
              Trường THPT Tam Giang
            </span>
          )}
        </div>
      )}
    </div>
  );
}
