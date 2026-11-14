import { Logo } from "@/components/logo";
import { Mail, ArrowUpRight, Compass, BookOpen, Layers } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#153325] dark:border-[#12261C] bg-[#091A13] dark:bg-[#06120D] text-[#EDF5ED] transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand & Mission column */}
          <div className="space-y-4 md:col-span-5">
            <a
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38A875]"
            >
              <Logo size="md" showTagline />
            </a>
            <p className="max-w-md text-xs leading-relaxed text-[#EDF5ED]/75">
              Nền tảng học tập và khám phá Vật lý trực quan, hiện đại mang phong cách phòng thí nghiệm kỹ thuật số. Nhìn thấy để hiểu sâu bản chất thế giới tự nhiên.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#38A875]/30 bg-[#16845A]/15 px-2.5 py-1 text-[11px] font-medium text-[#72CF91]">
                <span className="size-1.5 rounded-full bg-[#38A875] animate-pulse" />
                Phòng Lab Số 777+ Mô phỏng
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8ED78]/30 bg-[#C8ED78]/10 px-2.5 py-1 text-[11px] font-medium text-[#C8ED78]">
                Kho tài liệu chuẩn hóa THPT
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#72CF91]">
              Khám phá
            </h4>
            <ul className="space-y-2 text-xs text-[#EDF5ED]/80">
              <li>
                <a
                  href="/mo-phong"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C8ED78]"
                >
                  <Compass className="size-3.5 text-[#38A875]" />
                  Phòng thí nghiệm số
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="/tai-lieu"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C8ED78]"
                >
                  <BookOpen className="size-3.5 text-[#38A875]" />
                  Kho tài liệu Vật lý
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="/#phuong-phap"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[#C8ED78]"
                >
                  <Layers className="size-3.5 text-[#38A875]" />
                  Phương pháp học tập 3 bước
                </a>
              </li>
            </ul>
          </div>

          {/* Developer information */}
          <div className="space-y-3 md:col-span-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#C8ED78] flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#38A875]" />
              ĐỒNG HÀNH & PHÁT TRIỂN
            </h4>
            <p className="text-xs leading-relaxed text-[#EDF5ED]/80">
              Mình là Quân — người phát triển TamGiangPhysics với mong muốn giúp việc học Vật lý trở nên trực quan và dễ hiểu hơn. Nền tảng vẫn đang được hoàn thiện từng ngày, rất mong nhận được góp ý, báo lỗi hoặc ý tưởng tính năng mới từ bạn để website ngày càng tốt hơn!
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${APP_CONFIG.contactEmail}`}
                className="group inline-flex items-center gap-2 rounded-lg border border-[#38A875]/40 bg-[#16845A]/20 px-3 py-1.5 text-xs font-medium text-[#72CF91] transition-all hover:bg-[#16845A]/30 hover:border-[#38A875]"
              >
                <Mail className="size-3.5 text-[#72CF91] transition-transform group-hover:scale-110" />
                <span>
                  Gửi góp ý qua Email:{" "}
                  <strong className="underline underline-offset-2 text-white">
                    {APP_CONFIG.contactEmail}
                  </strong>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-[#EDF5ED]/60">
            © {APP_CONFIG.copyrightYear} Phát triển bởi {APP_CONFIG.developerName}.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#EDF5ED]/50">
            <span>TamGiangPhysics · Modern Scientific UI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
