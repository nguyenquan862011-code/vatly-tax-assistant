import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import { PrismDispersionExperiment } from "@/components/prism-dispersion-experiment";
import { ShowcaseTopics } from "@/components/showcase-topics";
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
  Eye,
  Menu,
  X,
  Sliders,
  CheckCircle2,
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
    title: "Tán sắc ánh sáng",
    domain: "Quang học",
    description: "Khảo sát hiện tượng tia sáng trắng phân tách thành dải quang phổ 7 màu khi truyền qua lăng kính thủy tinh.",
    href: "/mo-phong/lop-11/song/chu-de-3-giao-thoa-song/bai-2-giao-thoa-anh-sang/1-ly-thuyet-giao-thoa-anh-sang-trang",
    icon: Sparkles,
    color: "#36D9E8",
  },
  {
    id: "pendulum",
    title: "Con lắc đơn",
    domain: "Dao động & Sóng",
    description: "Tương tác với chiều dài dây, gia tốc trọng trường g và góc lệch ban đầu để phân tích chu kỳ dao động điều hòa.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-3-sai-so-trong-phep-do/2-vd6-do-chu-ki-con-lac-don",
    icon: Activity,
    color: "#48D597",
  },
  {
    id: "projectile",
    title: "Chuyển động ném xiên",
    domain: "Cơ học",
    description: "Phân tích quỹ đạo parabol, tầm bay xa, tầm bay cao phụ thuộc vào vận tốc đầu v₀ và góc ném α.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong/bai-6-chuyen-dong-nem/1-ly-thuyet-chuyen-dong-nem",
    icon: Compass,
    color: "#36D9E8",
  },
  {
    id: "hooke",
    title: "Định luật Hooke",
    domain: "Cơ học",
    description: "Khảo sát mối quan hệ tuyến tính giữa lực đàn hồi và độ biến dạng lò xo trong giới hạn đàn hồi.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-3-sai-so-trong-phep-do/1-ly-thuyet-sai-so-trong-phep-do",
    icon: Sliders,
    color: "#48D597",
  },
  {
    id: "standing-wave",
    title: "Sóng dừng",
    domain: "Sóng cơ",
    description: "Quan sát các nút sóng, bụng sóng và điều kiện hình thành sóng dừng trên sợi dây hai đầu cố định.",
    href: "/mo-phong/lop-11/song/chu-de-4-song-dung/bai-1-song-dung/1-ly-thuyet-song-dung",
    icon: Radio,
    color: "#36D9E8",
  },
  {
    id: "electric-field",
    title: "Điện trường & Lực Lorentz",
    domain: "Điện học & Từ trường",
    description: "Mô phỏng quỹ đạo chuyển động của hạt mang điện tích trong điện trường đều và từ trường vuông góc.",
    href: "/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-2-luc-tu/2-vd9-proton-trong-dien-truong-va-tu-truong",
    icon: Zap,
    color: "#48D597",
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
    desc: "Khúc xạ, Phản xạ toàn phần, Lăng kính, Thấu kính & Quang phổ ánh sáng",
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
    <div className="flex min-h-screen flex-col bg-[#050B18] text-[#F4F8FC]">
      {/* 4.1 Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#091426] bg-[#050B18]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2">
            <Logo size="md" />
          </a>

          <nav className="hidden items-center gap-6 md:flex text-sm font-medium">
            <a href="#phuong-phap" className="text-[#F4F8FC]/70 hover:text-[#48D597] transition-colors">
              Phương pháp học
            </a>
            <a href="#cach-hoc" className="text-[#F4F8FC]/70 hover:text-[#48D597] transition-colors">
              Cách học
            </a>
            <a href="#mo-phong-tieu-bieu" className="text-[#F4F8FC]/70 hover:text-[#48D597] transition-colors">
              Ví dụ mô phỏng
            </a>
            <a href="/tai-lieu" className="text-[#F4F8FC]/70 hover:text-[#36D9E8] transition-colors">
              Kho tài liệu Vật lý
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/mo-phong"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#36D9E8]/40 bg-[#36D9E8]/10 px-4 py-2 text-xs font-semibold text-[#36D9E8] transition-all hover:bg-[#36D9E8]/20 hover:border-[#36D9E8]"
            >
              <span>Vào phòng Lab</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-[#F4F8FC] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-b border-[#091426] bg-[#050B18] px-5 py-4 md:hidden space-y-3">
            <a href="#phuong-phap" className="block text-sm text-[#F4F8FC]/80 py-1" onClick={() => setMobileMenuOpen(false)}>
              Phương pháp học
            </a>
            <a href="#cach-hoc" className="block text-sm text-[#F4F8FC]/80 py-1" onClick={() => setMobileMenuOpen(false)}>
              Cách học
            </a>
            <a href="#mo-phong-tieu-bieu" className="block text-sm text-[#F4F8FC]/80 py-1" onClick={() => setMobileMenuOpen(false)}>
              Ví dụ mô phỏng
            </a>
            <a href="/tai-lieu" className="block text-sm text-[#36D9E8] py-1 font-medium" onClick={() => setMobileMenuOpen(false)}>
              Kho tài liệu Vật lý
            </a>
            <a
              href="/mo-phong"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#36D9E8] pt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Vào phòng Lab ↗
            </a>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 4.2 Hero Section */}
        <section className="relative overflow-hidden border-b border-[#091426] bg-gradient-to-b from-[#091426]/40 via-[#050B18] to-[#050B18] px-5 py-12 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Left Column */}
              <div className="space-y-6 lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#48D597]/30 bg-[#48D597]/10 px-3.5 py-1.5 text-xs font-medium text-[#48D597]">
                  <Sparkles className="size-3.5" />
                  <span>✦ KHÁM PHÁ VẬT LÝ THEO CÁCH HOÀN TOÀN MỚI</span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.15]">
                  Đừng chỉ học Vật lý.{" "}
                  <span className="bg-gradient-to-r from-[#48D597] via-[#36D9E8] to-[#48D597] bg-clip-text text-transparent">
                    Hãy khám phá cách thế giới vận hành.
                  </span>
                </h1>

                <p className="text-sm leading-relaxed text-[#F4F8FC]/75 sm:text-base">
                  TamGiangPhysics giúp bạn tiếp cận kiến thức Vật lý thông qua quan sát, thực nghiệm và mô phỏng trực quan. Không chỉ ghi nhớ công thức, bạn còn có thể khám phá bản chất của những hiện tượng đang diễn ra xung quanh.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="/mo-phong"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#48D597] to-[#36D9E8] px-5 py-3 text-xs font-bold text-[#050B18] shadow-lg shadow-[#48D597]/20 transition-all hover:scale-[1.02] hover:shadow-[#36D9E8]/30"
                  >
                    <span>Bắt đầu thí nghiệm</span>
                    <ArrowUpRight className="size-4" />
                  </a>

                  <a
                    href="#phuong-phap"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#091426] bg-[#091426]/60 px-5 py-3 text-xs font-semibold text-[#F4F8FC] backdrop-blur-md transition-all hover:bg-[#091426] hover:border-[#36D9E8]/40"
                  >
                    <span>Khám phá phương pháp</span>
                    <span className="text-[#36D9E8]">↓</span>
                  </a>
                </div>

                <div className="flex items-center gap-6 pt-2 font-mono text-xs text-[#F4F8FC]/60">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#48D597]" />
                    <span>777+ Bài học thực nghiệm</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[#36D9E8]" />
                    <span>Tương tác thời gian thực</span>
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

        {/* 4.3 Phòng thí nghiệm số */}
        <section id="phong-thi-nghiem" className="border-b border-[#091426] bg-[#050B18] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#48D597]">
                Phòng thí nghiệm kỹ thuật số
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-[#F4F8FC]">
                KHÁM PHÁ PHÒNG THÍ NGHIỆM SỐ
              </h2>
              <p className="text-sm text-[#F4F8FC]/70">
                Thử nghiệm, quan sát và khám phá các quy luật vật lý thông qua những mô phỏng trực quan.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LAB_EXPERIMENTS.map((exp) => {
                const IconComponent = exp.icon;
                return (
                  <div
                    key={exp.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#091426] bg-[#091426]/40 p-6 transition-all duration-300 hover:border-[#36D9E8]/50 hover:bg-[#091426]/70 hover:shadow-xl hover:shadow-[#36D9E8]/5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#36D9E8]/30 bg-[#36D9E8]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#36D9E8]">
                          {exp.domain}
                        </span>
                        <div className="rounded-lg bg-[#050B18] p-2 text-[#48D597] border border-[#091426] group-hover:border-[#48D597]/40 transition-colors">
                          <IconComponent className="size-4" />
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-[#F4F8FC] group-hover:text-[#36D9E8] transition-colors">
                        {exp.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-[#F4F8FC]/65">
                        {exp.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#091426] flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#F4F8FC]/40">Mô phỏng tương tác</span>
                      <a
                        href={exp.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#48D597] group-hover:translate-x-0.5 transition-transform hover:underline"
                      >
                        <span>Khám phá ngay</span>
                        <ArrowRight className="size-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4.4 Phương pháp học tập */}
        <section id="phuong-phap" className="border-b border-[#091426] bg-[#091426]/20 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#36D9E8]">
                Phương pháp sư phạm hiện đại
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-[#F4F8FC]">
                HIỂU BẢN CHẤT – LÀM CHỦ VẬT LÝ
              </h2>
              <p className="text-sm text-[#F4F8FC]/70">
                Ba bước tiếp cận giúp chuyển hóa công thức khô khan thành trực giác khoa học sâu sắc.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative rounded-2xl border border-[#091426] bg-[#050B18] p-6 shadow-xl space-y-4">
                <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#48D597]/10 border border-[#48D597]/30 text-[#48D597] font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-base font-bold text-[#F4F8FC]">QUAN SÁT</h3>
                <p className="text-xs leading-relaxed text-[#F4F8FC]/70">
                  Tiếp cận các hiện tượng vật lý thông qua hình ảnh và mô phỏng trực quan. Nhìn thấy đường truyền ánh sáng, xung sóng, đường sức điện và sự biến dạng.
                </p>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#48D597]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Trực quan hóa hiện tượng</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl border border-[#091426] bg-[#050B18] p-6 shadow-xl space-y-4">
                <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#36D9E8]/10 border border-[#36D9E8]/30 text-[#36D9E8] font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-base font-bold text-[#F4F8FC]">KHÁM PHÁ</h3>
                <p className="text-xs leading-relaxed text-[#F4F8FC]/70">
                  Tương tác với các tham số để nhận biết sự thay đổi của hiện tượng. Tự mình thay đổi góc tới, tần số sóng hay khối lượng vật để rút ra quy luật.
                </p>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#36D9E8]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Tự chủ thí nghiệm</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-2xl border border-[#091426] bg-[#050B18] p-6 shadow-xl space-y-4">
                <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#48D597]/10 border border-[#48D597]/30 text-[#48D597] font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-base font-bold text-[#F4F8FC]">LÝ GIẢI</h3>
                <p className="text-xs leading-relaxed text-[#F4F8FC]/70">
                  Hiểu bản chất, công thức và quy luật vật lý đằng sau mỗi hiện tượng. Gắn kết phương trình toán học với chuyển động thực tế trong đời sống.
                </p>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#48D597]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Làm chủ tri thức</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4.5 Không gian tri thức */}
        <section id="cach-hoc" className="border-b border-[#091426] bg-[#050B18] px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#48D597]">
                Hệ thống kiến thức THPT
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-[#F4F8FC]">
                KHÔNG GIAN TRI THỨC VẬT LÝ
              </h2>
              <p className="text-sm text-[#F4F8FC]/70">
                Toàn bộ chương trình chuẩn hóa được phân loại theo các phân ngành khoa học cốt lõi.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {KNOWLEDGE_DOMAINS.map((domain) => {
                const IconComponent = domain.icon;
                return (
                  <a
                    key={domain.name}
                    href={domain.href}
                    className="group block rounded-xl border border-[#091426] bg-[#091426]/30 p-5 transition-all hover:border-[#48D597]/40 hover:bg-[#091426]/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="rounded-md border border-[#48D597]/30 bg-[#48D597]/10 px-2 py-0.5 font-mono text-[10px] font-medium text-[#48D597]">
                        {domain.grade}
                      </span>
                      <IconComponent className="size-4 text-[#36D9E8] transition-transform group-hover:scale-110" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#F4F8FC] group-hover:text-[#48D597] transition-colors">
                      {domain.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#F4F8FC]/60 line-clamp-2">
                      {domain.desc}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Existing Showcase Section with 10 Featured Topics */}
        <section id="mo-phong-tieu-bieu" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#36D9E8]">
                Giáo trình tương tác
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#F4F8FC] sm:text-4xl">
                Chọn chuyên đề. Bấm chạy.
              </h2>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#F4F8FC]/70 sm:text-sm">
                Mô phỏng từ giáo trình 777 bài học, chạy mượt mà ngay trong trình duyệt. Mỗi bài học mở đầu bằng lý thuyết, tiếp nối bằng ví dụ thực nghiệm từng bước.
              </p>
            </div>
            <a
              href="/mo-phong"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#36D9E8]/40 bg-[#36D9E8]/10 px-4 py-2.5 text-xs font-semibold text-[#36D9E8] hover:bg-[#36D9E8]/20 transition-all"
            >
              <span>Xem cả 777 mô phỏng</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          <ShowcaseTopics />
        </section>
      </main>

      {/* 7. Developer Footer placed at the very end */}
      <Footer />
    </div>
  );
}
