import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { PrismDispersionExperiment } from "@/components/prism-dispersion-experiment";
import { APP_CONFIG } from "@/lib/config";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  BookOpen,
  Sparkles,
  Layers,
  Activity,
  Zap,
  Flame,
  Radio,
  Atom,
  Menu,
  X,
  Sliders,
  CheckCircle2,
  GraduationCap,
  FlaskConical,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TamGiangPhysics — Nền tảng học tập & mô phỏng Vật lý hiện đại" },
      {
        name: "description",
        content:
          "TamGiangPhysics: Khám phá Vật lý qua quan sát, thực nghiệm và hơn 777+ mô phỏng trực quan. Nhìn thấy để hiểu sâu bản chất thế giới tự nhiên.",
      },
      {
        property: "og:title",
        content: "TamGiangPhysics — Nền tảng học tập & mô phỏng Vật lý hiện đại",
      },
      {
        property: "og:description",
        content:
          "TamGiangPhysics: Khám phá Vật lý qua quan sát, thực nghiệm và hơn 777+ mô phỏng trực quan. Nhìn thấy để hiểu sâu bản chất thế giới tự nhiên.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const LAB_EXPERIMENTS = [
  {
    id: "dispersion",
    title: "Tán sắc ánh sáng qua lăng kính",
    domain: "Quang học",
    description: "Khảo sát hiện tượng tia sáng trắng phân tách thành dải quang phổ 7 màu khi truyền qua lăng kính thủy tinh.",
    href: "/mo-phong/lop-11/song/chu-de-3-giao-thoa-song/bai-2-giao-thoa-anh-sang/1-ly-thuyet-giao-thoa-anh-sang-trang",
    icon: Sparkles,
  },
  {
    id: "pendulum",
    title: "Khảo sát Con lắc đơn",
    domain: "Dao động & Sóng",
    description: "Tương tác với chiều dài dây l, gia tốc trọng trường g và góc lệch ban đầu để phân tích chu kỳ dao động điều hòa.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-3-sai-so-trong-phep-do/2-vd6-do-chu-ki-con-lac-don",
    icon: Activity,
  },
  {
    id: "projectile",
    title: "Chuyển động ném xiên",
    domain: "Cơ học",
    description: "Phân tích quỹ đạo parabol, tầm bay xa, tầm bay cao phụ thuộc vào vận tốc ban đầu v₀ và góc ném α.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong/bai-6-chuyen-dong-nem/1-ly-thuyet-chuyen-dong-nem",
    icon: Compass,
  },
  {
    id: "hooke",
    title: "Định luật Hooke & Lực đàn hồi",
    domain: "Cơ học",
    description: "Khảo sát mối quan hệ tuyến tính giữa lực đàn hồi và độ biến dạng của lò xo trong giới hạn đàn hồi.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-3-sai-so-trong-phep-do/1-ly-thuyet-sai-so-trong-phep-do",
    icon: Sliders,
  },
  {
    id: "standing-wave",
    title: "Sóng dừng trên sợi dây",
    domain: "Sóng cơ",
    description: "Quan sát các nút sóng, bụng sóng và điều kiện hình thành sóng dừng trên sợi dây hai đầu cố định.",
    href: "/mo-phong/lop-11/song/chu-de-4-song-dung/bai-1-song-dung/1-ly-thuyet-song-dung",
    icon: Radio,
  },
  {
    id: "electric-field",
    title: "Điện trường & Lực từ Lorentz",
    domain: "Điện học & Từ trường",
    description: "Mô phỏng quỹ đạo chuyển động của hạt mang điện tích trong điện trường đều và từ trường vuông góc.",
    href: "/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-2-luc-tu/2-vd9-proton-trong-dien-truong-va-tu-truong",
    icon: Zap,
  },
];

const KNOWLEDGE_DOMAINS = [
  {
    name: "Cơ học",
    grade: "Lớp 10",
    desc: "Động học, Động lực học chất điểm, Năng lượng & Định luật bảo toàn",
    icon: Compass,
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly",
  },
  {
    name: "Nhiệt học",
    grade: "Lớp 12",
    desc: "Thuyết động học phân tử, Nội năng & Các định luật chất khí lý tưởng",
    icon: Flame,
    href: "/mo-phong",
  },
  {
    name: "Điện học",
    grade: "Lớp 11",
    desc: "Điện tích, Điện trường, Điện thế, Tụ điện & Dòng điện không đổi",
    icon: Zap,
    href: "/mo-phong",
  },
  {
    name: "Từ trường",
    grade: "Lớp 12",
    desc: "Cảm ứng từ, Lực từ Lorentz, Hiện tượng cảm ứng điện từ Faraday",
    icon: Radio,
    href: "/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-2-luc-tu/2-vd9-proton-trong-dien-truong-va-tu-truong",
  },
  {
    name: "Quang học",
    grade: "Lớp 11",
    desc: "Khúc xạ, Phản xạ toàn phần, Lăng kính, Thấu kính & Tán sắc ánh sáng",
    icon: Sparkles,
    href: "/mo-phong/lop-11/song/chu-de-3-giao-thoa-song/bai-2-giao-thoa-anh-sang/1-ly-thuyet-giao-thoa-anh-sang-trang",
  },
  {
    name: "Dao động & Sóng",
    grade: "Lớp 11",
    desc: "Dao động điều hòa, Con lắc lò xo, Sóng cơ, Giao thoa & Sóng âm",
    icon: Activity,
    href: "/mo-phong/lop-11/song/chu-de-4-song-dung/bai-1-song-dung/1-ly-thuyet-song-dung",
  },
  {
    name: "Vật lý hiện đại",
    grade: "Lớp 12",
    desc: "Lượng tử ánh sáng, Hiệu ứng quang điện, Hạt nhân nguyên tử & Năng lượng",
    icon: Atom,
    href: "/mo-phong",
  },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      {/* 1. Header Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg">
            <Logo size="md" />
          </a>

          <nav className="hidden items-center gap-6 md:flex text-xs font-semibold text-muted-foreground">
            <a href="#phuong-phap" className="hover:text-[#1558C9] dark:hover:text-[#60A5FA] transition-colors">
              Phương pháp học
            </a>
            <a href="#phong-thi-nghiem" className="hover:text-[#1558C9] dark:hover:text-[#60A5FA] transition-colors">
              Phòng thí nghiệm
            </a>
            <a href="#cach-hoc" className="hover:text-[#1558C9] dark:hover:text-[#60A5FA] transition-colors">
              Khối kiến thức
            </a>
            <a href="/tai-lieu" className="hover:text-[#1558C9] dark:hover:text-[#60A5FA] transition-colors flex items-center gap-1">
              <BookOpen className="size-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
              <span>Kho tài liệu Drive</span>
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <a
              href="/mo-phong"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1558C9] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#1146a1]"
            >
              <FlaskConical className="size-3.5" />
              <span>Vào phòng Lab ({APP_CONFIG.totalLessons} bài)</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-card px-5 py-4 md:hidden space-y-3 animate-in fade-in duration-150">
            <a href="#phuong-phap" className="block text-sm font-medium text-foreground py-1" onClick={() => setMobileMenuOpen(false)}>
              Phương pháp học
            </a>
            <a href="#phong-thi-nghiem" className="block text-sm font-medium text-foreground py-1" onClick={() => setMobileMenuOpen(false)}>
              Phòng thí nghiệm
            </a>
            <a href="#cach-hoc" className="block text-sm font-medium text-foreground py-1" onClick={() => setMobileMenuOpen(false)}>
              Khối kiến thức
            </a>
            <a href="/tai-lieu" className="block text-sm font-semibold text-[#1558C9] dark:text-[#60A5FA] py-1" onClick={() => setMobileMenuOpen(false)}>
              Kho tài liệu Google Drive
            </a>
            <a
              href="/mo-phong"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1558C9] py-2.5 text-xs font-bold text-white shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FlaskConical className="size-4" />
              <span>Khám phá 777+ Bài học & Mô phỏng</span>
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#F6F9FE] via-[#FFFFFF] to-[#FFFFFF] dark:from-[#182235]/40 dark:via-[#101827] dark:to-[#101827] px-5 py-12 sm:px-8 sm:py-20 transition-colors duration-200">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Left Column: Heading and Brand Proposition */}
              <div className="space-y-6 lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#EAF2FF] dark:bg-[#1E2D42] dark:border-[#2563EB]/40 px-3.5 py-1.5 text-xs font-semibold text-[#1558C9] dark:text-[#60A5FA]">
                  <Sparkles className="size-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
                  <span>✦ HỌC TẬP VẬT LÝ HIỆN ĐẠI • THPT TAM GIANG</span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-[#172033] dark:text-white sm:leading-[1.15]">
                  Đừng chỉ học Vật lý.{" "}
                  <span className="text-[#1558C9] dark:text-[#60A5FA]">
                    Hãy khám phá cách thế giới vận hành.
                  </span>
                </h1>

                <p className="text-sm leading-relaxed text-[#526176] dark:text-[#DCE5F2] sm:text-base">
                  TamGiangPhysics giúp học sinh tiếp cận kiến thức Vật lý thông qua quan sát, thực nghiệm và hơn {APP_CONFIG.totalLessons} bài mô phỏng tương tác. Nhìn thấy để hiểu sâu bản chất tự nhiên, đúc kết công thức và rèn luyện tư duy khoa học vững chắc.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="/mo-phong"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1558C9] px-5 py-3 text-xs font-bold text-white shadow-md shadow-[#1558C9]/20 transition-all hover:bg-[#1146a1] hover:scale-[1.02]"
                  >
                    <span>Bắt đầu bài học</span>
                    <ArrowUpRight className="size-4" />
                  </a>

                  <a
                    href="/tai-lieu"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-xs font-semibold text-foreground transition-all hover:bg-muted"
                  >
                    <BookOpen className="size-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
                    <span>Thư viện tài liệu Drive</span>
                  </a>

                  <a
                    href="#phuong-phap"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#0F766E]/20 bg-[#F0FDF4] dark:bg-[#064E3B]/30 px-4 py-3 text-xs font-semibold text-[#0F766E] dark:text-[#2DD4BF] transition-all hover:bg-[#0F766E] hover:text-white"
                  >
                    <span>Phương pháp 3 bước ↓</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2 font-mono text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#1558C9] dark:bg-[#60A5FA]" />
                    <span className="font-semibold text-foreground">{APP_CONFIG.totalLessons}</span>
                    <span>Bài học thực nghiệm</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#0F766E] dark:bg-[#2DD4BF]" />
                    <span>Tương tác thời gian thực</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#2563EB]" />
                    <span>Chuẩn GDPT mới</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Prism Dispersion Experiment */}
              <div className="lg:col-span-6">
                <PrismDispersionExperiment />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Section: Phòng thí nghiệm ảo tiêu biểu */}
        <section id="phong-thi-nghiem" className="border-b border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20 transition-colors duration-200">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0F766E]/20 bg-[#F0FDF4] dark:bg-[#064E3B]/40 px-3 py-1 text-[11px] font-bold text-[#0F766E] dark:text-[#2DD4BF] uppercase tracking-wider">
                  Thực nghiệm & Trực quan
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
                  PHÒNG THÍ NGHIỆM VẬT LÝ SỐ
                </h2>
                <p className="max-w-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Thay vì chỉ nhìn hình vẽ tĩnh trong sách, bạn có thể tự tay thay đổi thông số, điều chỉnh góc tới, vận tốc và quan sát các quy luật vật lý vận hành ngay trên màn hình.
                </p>
              </div>

              <a
                href="/mo-phong"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1558C9] dark:text-[#60A5FA] hover:underline"
              >
                <span>Xem toàn bộ 777 bài mô phỏng</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LAB_EXPERIMENTS.map((exp) => {
                const IconComponent = exp.icon;
                return (
                  <a
                    key={exp.id}
                    href={exp.href}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:border-[#1558C9]/40 hover:shadow-md"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="rounded-xl bg-[#EAF2FF] dark:bg-[#1E2D42] p-2.5 text-[#1558C9] dark:text-[#60A5FA] border border-[#2563EB]/20 group-hover:bg-[#1558C9] group-hover:text-white transition-colors">
                          <IconComponent className="size-5" />
                        </div>
                        <span className="rounded-full bg-[#F0FDF4] dark:bg-[#064E3B]/40 px-2.5 py-0.5 text-[11px] font-semibold text-[#0F766E] dark:text-[#2DD4BF] border border-[#0F766E]/20">
                          {exp.domain}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-foreground group-hover:text-[#1558C9] dark:group-hover:text-[#60A5FA] transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {exp.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-[#1558C9] dark:text-[#60A5FA]">
                      <span>Vào thí nghiệm</span>
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Section: Phương pháp học 3 bước */}
        <section id="phuong-phap" className="border-b border-border bg-background px-5 py-16 sm:px-8 sm:py-20 transition-colors duration-200">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#EAF2FF] dark:bg-[#1E2D42] px-3.5 py-1 text-xs font-bold text-[#1558C9] dark:text-[#60A5FA] uppercase tracking-wider">
                Phương pháp sư phạm hiện đại
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                3 BƯỚC KHÁM PHÁ BẢN CHẤT VẬT LÝ
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Học Vật lý không bắt đầu bằng việc học thuộc công thức. TamGiangPhysics hướng dẫn học sinh đi từ trực giác thị giác đến đúc kết quy luật toán học.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#1558C9] font-mono text-base font-bold text-white shadow-xs">
                    01
                  </span>
                  <span className="font-mono text-xs text-[#0F766E] dark:text-[#2DD4BF] font-semibold">GIAI ĐOẠN 1</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Quan sát hiện tượng
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Tương tác với mô phỏng số, tự do thay đổi các đại lượng đầu vào (vận tốc, góc nghiêng, khối lượng, điện tích) và quan sát hiện tượng xảy ra theo thời gian thực.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#0F766E] font-mono text-base font-bold text-white shadow-xs">
                    02
                  </span>
                  <span className="font-mono text-xs text-[#1558C9] dark:text-[#60A5FA] font-semibold">GIAI ĐOẠN 2</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Đúc kết công thức & Định luật
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Phân tích đồ thị chuyển động, liên hệ giữa các đại lượng đo lường để hiểu vì sao công thức được xây dựng như vậy, thay vì chỉ học vẹt ký hiệu.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#2563EB] font-mono text-base font-bold text-white shadow-xs">
                    03
                  </span>
                  <span className="font-mono text-xs text-[#0F766E] dark:text-[#2DD4BF] font-semibold">GIAI ĐOẠN 3</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Luyện tập & Tự đánh giá
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Thực hành với hệ thống bài tập trắc nghiệm nhiều phương án, trắc nghiệm đúng/sai và điền số ngắn. Chấm điểm theo thang 10 và xem ngay lịch sử kết quả.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Section: Chương trình kiến thức THPT */}
        <section id="cach-hoc" className="border-b border-border bg-secondary px-5 py-16 sm:px-8 sm:py-20 transition-colors duration-200">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#2563EB]/20 bg-[#EAF2FF] dark:bg-[#1E2D42] px-3 py-1 text-[11px] font-bold text-[#1558C9] dark:text-[#60A5FA] uppercase tracking-wider">
                  Chương trình GDPT 2018
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
                  CÁC KHỐI KIẾN THỨC VẬT LÝ THPT
                </h2>
                <p className="max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Lộ trình kiến thức được chuẩn hóa theo từng khối lớp từ Lớp 10, Lớp 11 đến Lớp 12, dễ dàng tra cứu theo chuyên đề.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/tai-lieu"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  <BookOpen className="size-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
                  <span>Sổ tay công thức</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {KNOWLEDGE_DOMAINS.map((domain, index) => {
                const IconComponent = domain.icon;
                return (
                  <a
                    key={index}
                    href={domain.href}
                    className="group block rounded-xl border border-border bg-card p-5 shadow-xs transition-all hover:border-[#1558C9]/40 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between pb-3">
                      <div className="rounded-lg bg-[#EAF2FF] dark:bg-[#1E2D42] p-2 text-[#1558C9] dark:text-[#60A5FA] group-hover:bg-[#1558C9] group-hover:text-white transition-colors">
                        <IconComponent className="size-4" />
                      </div>
                      <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                        {domain.grade}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-foreground group-hover:text-[#1558C9] dark:group-hover:text-[#60A5FA] transition-colors">
                      {domain.name}
                    </h4>

                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {domain.desc}
                    </p>

                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#1558C9] dark:text-[#60A5FA]">
                      <span>Học chuyên đề</span>
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
