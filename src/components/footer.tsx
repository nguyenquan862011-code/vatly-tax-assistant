import { Logo } from "@/components/logo";
import { APP_CONFIG } from "@/lib/config";
import { Mail, ArrowUpRight, Compass, BookOpen, Layers, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-secondary text-foreground transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand & Mission column */}
          <div className="space-y-4 md:col-span-5">
            <a href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg">
              <Logo size="md" showTagline />
            </a>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              Nền tảng học tập và khám phá Vật lý trực quan, hiện đại mang phong cách phòng thí nghiệm kỹ thuật số. Nhìn thấy để hiểu sâu bản chất thế giới tự nhiên.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0F766E]/20 bg-[#F0FDF4] dark:bg-[#064E3B]/40 px-2.5 py-1 text-[11px] font-medium text-[#0F766E] dark:text-[#2DD4BF]">
                <span className="size-1.5 rounded-full bg-[#0F766E] dark:bg-[#2DD4BF] animate-pulse" />
                Phòng Lab Số {APP_CONFIG.totalLessons}+ Bài học
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#EAF2FF] dark:bg-[#1E2D42] px-2.5 py-1 text-[11px] font-medium text-[#1558C9] dark:text-[#60A5FA]">
                Kho tài liệu Google Drive
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#1558C9] dark:text-[#60A5FA] font-bold">
              Khám phá
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <a
                  href="/mo-phong"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#1558C9] dark:hover:text-[#60A5FA]"
                >
                  <Compass className="size-3.5 text-[#1558C9] dark:text-[#60A5FA]" />
                  <span>Phòng thí nghiệm số</span>
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="/tai-lieu"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#1558C9] dark:hover:text-[#60A5FA]"
                >
                  <BookOpen className="size-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
                  <span>Kho tài liệu Vật lý</span>
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="/#phuong-phap"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#1558C9] dark:hover:text-[#60A5FA]"
                >
                  <Layers className="size-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
                  <span>Phương pháp học tập</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Exact Developer info as specified */}
          <div className="space-y-3 md:col-span-4 rounded-xl border border-border bg-card p-5 shadow-xs">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF] font-bold flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#0F766E] dark:bg-[#2DD4BF]" />
              ĐỒNG HÀNH & PHÁT TRIỂN
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Mình là {APP_CONFIG.developerName} — người phát triển TamGiangPhysics với mong muốn giúp việc học Vật lý trở nên trực quan và dễ hiểu hơn. Nền tảng vẫn đang được hoàn thiện từng ngày, rất mong nhận được góp ý, báo lỗi hoặc ý tưởng tính năng mới từ bạn!
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${APP_CONFIG.contactEmail}`}
                className="group inline-flex items-center gap-2 rounded-lg border border-[#2563EB]/30 bg-[#EAF2FF] dark:bg-[#1E2D42] px-3.5 py-2 text-xs font-semibold text-[#1558C9] dark:text-[#60A5FA] transition-all hover:bg-[#1558C9] hover:text-white dark:hover:bg-[#2563EB]"
              >
                <Mail className="size-3.5 transition-transform group-hover:scale-110" />
                <span>Gửi góp ý qua Email: <strong className="underline underline-offset-2">{APP_CONFIG.contactEmail}</strong></span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-muted-foreground">
            © {APP_CONFIG.copyrightYear} Phát triển bởi {APP_CONFIG.developerName} · Trường THPT Tam Giang.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
              Bright Academic · Modern Education Platform
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
