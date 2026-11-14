import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
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
  Radio,
  Sliders,
  CheckCircle2,
  Atom,
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
    description:
      "Khảo sát hiện tượng tia sáng trắng phân tách thành dải quang phổ 7 màu khi truyền qua lăng kính thủy tinh.",
    href: "/mo-phong/lop-11/song/chu-de-3-giao-thoa-song/bai-2-giao-thoa-anh-sang/1-ly-thuyet-giao-thoa-anh-sang-trang",
    icon: Sparkles,
  },
  {
    id: "pendulum",
    title: "Con lắc đơn",
    domain: "Dao động & Sóng",
    description:
      "Tương tác với chiều dài dây, gia tốc trọng trường g và góc lệch ban đầu để phân tích chu kỳ dao động điều hòa.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-3-sai-so-trong-phep-do/2-vd6-do-chu-ki-con-lac-don",
    icon: Activity,
  },
  {
    id: "projectile",
    title: "Chuyển động ném xiên",
    domain: "Cơ học",
    description:
      "Phân tích quỹ đạo parabol, tầm bay xa, tầm bay cao phụ thuộc vào vận tốc đầu v₀ và góc ném α.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong/bai-6-chuyen-dong-nem/1-ly-thuyet-chuyen-dong-nem",
    icon: Compass,
  },
  {
    id: "hooke",
    title: "Định luật Hooke",
    domain: "Cơ học",
    description:
      "Khảo sát mối quan hệ tuyến tính giữa lực đàn hồi và độ biến dạng lò xo trong giới hạn đàn hồi.",
    href: "/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-3-sai-so-trong-phep-do/1-ly-thuyet-sai-so-trong-phep-do",
    icon: Sliders,
  },
  {
    id: "standing-wave",
    title: "Sóng dừng trên dây",
    domain: "Sóng cơ",
    description:
      "Quan sát các nút sóng, bụng sóng và điều kiện hình thành sóng dừng trên sợi dây hai đầu cố định.",
    href: "/mo-phong/lop-11/song/chu-de-4-song-dung/bai-1-song-dung/1-ly-thuyet-song-dung",
    icon: Radio,
  },
  {
    id: "electric-field",
    title: "Điện trường & Hạt tích điện",
    domain: "Điện học & Từ trường",
    description:
      "Khảo sát quỹ đạo chuyển động của electron trong điện trường đều và tác dụng của lực Lorentz.",
    href: "/mo-phong/lop-11/dien-truong/chu-de-1-luc-tuong-tac-tinh-dien/bai-2-dien-truong/1-ly-thuyet-dien-truong",
    icon: Zap,
  },
];

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      {/* Unified Academic Header */}
      <SiteHeader currentPath="/" />

      <main className="flex-1">
        {/* Hero Section: 2-Column Academic & Scientific Layout */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/50 via-background to-background px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
              {/* Left Column: Mission, Typography, Actions, Statistics */}
              <div className="space-y-6 lg:col-span-6">
                {/* Pedagogical Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[#16845A]/30 dark:border-[#38A875]/40 bg-[#16845A]/10 dark:bg-[#38A875]/15 px-3.5 py-1.5 text-xs font-semibold text-[#075C40] dark:text-[#72CF91]">
                  <Sparkles className="size-3.5 text-[#16845A] dark:text-[#C8ED78]" />
                  <span>PHƯƠNG PHÁP HỌC VẬT LÝ THỰC NGHIỆM</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.15]">
                  Đừng chỉ học công thức.{" "}
                  <span className="text-[#16845A] dark:text-[#72CF91]">
                    Hãy quan sát cách thế giới vận hành.
                  </span>
                </h1>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base max-w-xl">
                  TamGiangPhysics mang đến trải nghiệm tiếp cận Vật lý thông qua quan sát hiện tượng, tự tay thay đổi thông số thực nghiệm và mô phỏng trực quan. Học sinh chuyển hóa từ học vẹt sang thấu hiểu bản chất định luật.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="/mo-phong"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#16845A] dark:bg-[#38A875] px-5 py-3 text-sm font-semibold text-white dark:text-[#0B1511] shadow-md hover:bg-[#126b48] dark:hover:bg-[#4ade80] transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Compass className="size-4" />
                    <span>Vào phòng thí nghiệm</span>
                    <ArrowRight className="size-4" />
                  </a>

                  <a
                    href="#phuong-phap"
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all"
                  >
                    <span>Xem phương pháp học</span>
                    <span className="text-[#16845A] dark:text-[#72CF91]">↓</span>
                  </a>
                </div>

                {/* 3 Academic Statistics Badges */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                  <div className="space-y-0.5">
                    <div className="font-mono text-2xl font-bold text-[#16845A] dark:text-[#72CF91]">
                      777+
                    </div>
                    <div className="text-xs text-muted-foreground">Bài học & Mô phỏng</div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-mono text-2xl font-bold text-[#075C40] dark:text-[#C8ED78]">
                      3 Khối
                    </div>
                    <div className="text-xs text-muted-foreground">Lớp 10 · 11 · 12 THPT</div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-mono text-2xl font-bold text-[#16845A] dark:text-[#72CF91]">
                      7 Khối
                    </div>
                    <div className="text-xs text-muted-foreground">Chuyên đề trọng tâm</div>
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

        {/* Featured Laboratory Experiments Section */}
        <section id="mo-phong-tieu-bieu" className="border-b border-border bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#16845A] dark:text-[#72CF91]">
                Phòng thí nghiệm kỹ thuật số
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                MÔ PHỎNG VẬT LÝ TIÊU BIỂU
              </h2>
              <p className="text-sm text-muted-foreground">
                Tương tác trực tiếp với các đại lượng vật lý, quan sát đồ thị biến thiên thời gian thực.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LAB_EXPERIMENTS.map((exp) => {
                const IconComponent = exp.icon;
                return (
                  <div
                    key={exp.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-[#16845A]/50 dark:hover:border-[#72CF91]/50 hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#16845A]/25 dark:border-[#38A875]/30 bg-[#16845A]/10 dark:bg-[#38A875]/15 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#075C40] dark:text-[#72CF91]">
                          {exp.domain}
                        </span>
                        <div className="rounded-lg bg-secondary p-2 text-[#16845A] dark:text-[#72CF91] border border-border group-hover:border-[#16845A]/40 transition-colors">
                          <IconComponent className="size-4" />
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-foreground group-hover:text-[#16845A] dark:group-hover:text-[#72CF91] transition-colors">
                        {exp.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                      <span className="font-mono text-[11px] text-muted-foreground">Phòng Lab THPT</span>
                      <a
                        href={exp.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#16845A] dark:text-[#72CF91] group-hover:translate-x-0.5 transition-transform hover:underline"
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

        {/* 3-Step Scientific Learning Methodology */}
        <section id="phuong-phap" className="border-b border-border bg-secondary/50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#16845A] dark:text-[#72CF91]">
                Phương pháp sư phạm 3 bước
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                HIỂU BẢN CHẤT – LÀM CHỦ VẬT LÝ
              </h2>
              <p className="text-sm text-muted-foreground">
                Chuyển hóa từ ghi nhớ thụ động sang tư duy thực nghiệm khoa học sâu sắc.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#16845A]/15 dark:bg-[#38A875]/20 border border-[#16845A]/30 text-[#16845A] dark:text-[#72CF91] font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-base font-bold text-foreground">1. Quan sát hiện tượng</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Bắt đầu bài học bằng việc chứng kiến hiện tượng vật lý chuyển động sống động qua mô phỏng, đặt câu hỏi "Vì sao nó lại diễn ra như vậy?".
                </p>
                <div className="pt-2 flex items-center gap-2 text-[11px] font-medium text-[#16845A] dark:text-[#72CF91]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Kích thích tò mò khoa học</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#075C40]/15 dark:bg-[#C8ED78]/20 border border-[#075C40]/30 text-[#075C40] dark:text-[#C8ED78] font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-base font-bold text-foreground">2. Tương tác thông số</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Tự tay kéo thanh trượt góc tới, khối lượng, điện tích, chiều dài dây để thấy sự thay đổi tức thì của đồ thị và quỹ đạo.
                </p>
                <div className="pt-2 flex items-center gap-2 text-[11px] font-medium text-[#075C40] dark:text-[#C8ED78]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Khám phá mối quan hệ định lượng</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="inline-flex items-center justify-center size-10 rounded-xl bg-[#16845A]/15 dark:bg-[#38A875]/20 border border-[#16845A]/30 text-[#16845A] dark:text-[#72CF91] font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-base font-bold text-foreground">3. Khắc sâu bản chất</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Tổng kết định luật, phân tích công thức toán học và làm các bài tập củng cố trắc nghiệm ngay trong phòng thí nghiệm.
                </p>
                <div className="pt-2 flex items-center gap-2 text-[11px] font-medium text-[#16845A] dark:text-[#72CF91]">
                  <CheckCircle2 className="size-3.5" />
                  <span>Nắm vững phương pháp giải bài</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7 Curriculum Knowledge Domains */}
        <section className="border-b border-border bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ShowcaseTopics />
          </div>
        </section>

        {/* Materials / Google Drive Promo Section */}
        <section className="border-b border-border bg-secondary/30 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-md">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
                <div className="space-y-4 md:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#16845A]/30 bg-[#16845A]/10 px-3 py-1 text-xs font-semibold text-[#075C40] dark:text-[#72CF91]">
                    <BookOpen className="size-3.5" />
                    <span>THƯ VIỆN TÀI LIỆU VẬT LÝ THPT</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                    Kho tài liệu, đề thi và sơ đồ tư duy chuẩn hóa
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
                    Toàn bộ tài liệu ôn luyện được đồng bộ qua Google Drive chính thức, bao gồm lý thuyết trọng tâm, bài tập có lời giải chi tiết và công thức giải nhanh cho cả 3 khối lớp 10, 11 và 12.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="/tai-lieu"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#16845A] dark:bg-[#38A875] px-5 py-2.5 text-xs font-semibold text-white dark:text-[#0B1511] hover:bg-[#126b48] dark:hover:bg-[#4ade80] transition-colors"
                    >
                      <BookOpen className="size-4" />
                      <span>Truy cập Kho tài liệu</span>
                      <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-border bg-secondary p-5 md:col-span-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground">
                    <span className="size-2 rounded-full bg-[#16845A] dark:bg-[#38A875]" />
                    ĐỒNG BỘ GOOGLE DRIVE
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
                      <span>Công thức trọng tâm:</span>
                      <span className="font-mono font-medium text-foreground">Lớp 10-11-12</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
                      <span>Đề thi thử & Kiểm tra:</span>
                      <span className="font-mono font-medium text-foreground">Có đáp án</span>
                    </div>
                    <div className="flex items-center justify-between pb-0.5">
                      <span>Quyền truy cập:</span>
                      <span className="font-mono font-medium text-[#16845A] dark:text-[#72CF91]">Miễn phí</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Unified Academic Footer */}
      <Footer />
    </div>
  );
}
