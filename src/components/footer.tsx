import { Logo } from "@/components/logo";
import { Mail, ArrowUpRight, Compass, BookOpen, Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#091426] bg-[#050B18] text-[#F4F8FC]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand & Mission column */}
          <div className="space-y-4 md:col-span-5">
            <a href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#36D9E8]">
              <Logo size="md" showTagline />
            </a>
            <p className="max-w-md text-xs leading-relaxed text-[#F4F8FC]/70">
              Nền tảng học tập và khám phá Vật lý trực quan, hiện đại mang phong cách phòng thí nghiệm kỹ thuật số. Nhìn thấy để hiểu sâu bản chất thế giới tự nhiên.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#48D597]/30 bg-[#48D597]/10 px-2.5 py-1 text-[11px] font-medium text-[#48D597]">
                <span className="size-1.5 rounded-full bg-[#48D597] animate-pulse" />
                Phòng Lab Số 777+ Mô phỏng
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#36D9E8]/30 bg-[#36D9E8]/10 px-2.5 py-1 text-[11px] font-medium text-[#36D9E8]">
                Kho tài liệu chuẩn hóa
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#36D9E8]">
              Khám phá
            </h4>
            <ul className="space-y-2 text-xs text-[#F4F8FC]/80">
              <li>
                <a
                  href="/mo-phong"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#48D597]"
                >
                  <Compass className="size-3.5 text-[#48D597]" />
                  Phòng thí nghiệm số
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="/tai-lieu"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#48D597]"
                >
                  <BookOpen className="size-3.5 text-[#36D9E8]" />
                  Kho tài liệu Vật lý
                  <ArrowUpRight className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="/#phuong-phap"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#48D597]"
                >
                  <Layers className="size-3.5 text-[#48D597]" />
                  Phương pháp học tập
                </a>
              </li>
            </ul>
          </div>

          {/* Exact Developer info as specified */}
          <div className="space-y-3 md:col-span-4 rounded-xl border border-[#091426] bg-[#091426]/60 p-5 backdrop-blur-sm">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#48D597] flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#48D597]" />
              ĐỒNG HÀNH & PHÁT TRIỂN
            </h4>
            <p className="text-xs leading-relaxed text-[#F4F8FC]/80">
              Mình là Quân — người phát triển TamGiangPhysics với mong muốn giúp việc học Vật lý trở nên trực quan và dễ hiểu hơn. Nền tảng vẫn đang được hoàn thiện từng ngày, rất mong nhận được góp ý, báo lỗi hoặc ý tưởng tính năng mới từ bạn để website ngày càng tốt hơn!
            </p>
            <div className="pt-1">
              <a
                href="mailto:nguyenquan862011@gmail.com"
                className="group inline-flex items-center gap-2 rounded-lg border border-[#36D9E8]/40 bg-[#36D9E8]/10 px-3 py-1.5 text-xs font-medium text-[#36D9E8] transition-all hover:bg-[#36D9E8]/20 hover:border-[#36D9E8]"
              >
                <Mail className="size-3.5 text-[#36D9E8] transition-transform group-hover:scale-110" />
                <span>Gửi góp ý qua Email: <strong className="underline underline-offset-2">nguyenquan862011@gmail.com</strong></span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#091426] pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-[#F4F8FC]/60">
            © 2026 Phát triển bởi Trần Đình Nguyên Quân.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#F4F8FC]/50">
            <span>TamGiangPhysics · Premium Dark Scientific UI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
