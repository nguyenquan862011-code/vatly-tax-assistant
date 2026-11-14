import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { APP_CONFIG } from "@/lib/config";
import {
  Search,
  BookOpen,
  ExternalLink,
  ChevronRight,
  FolderOpen,
  FileText,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Info,
  Menu,
  X,
  Compass,
} from "lucide-react";

export const Route = createFileRoute("/tai-lieu")({
  head: () => ({
    meta: [
      { title: "Kho tài liệu Vật lý THPT | TamGiangPhysics" },
      {
        name: "description",
        content:
          "Thư viện tài liệu Vật lý THPT TamGiangPhysics: Kho tài liệu Google Drive tổng hợp kiến thức, lý thuyết và công thức Vật lí THPT phục vụ quá trình học tập và ôn luyện.",
      },
      { property: "og:title", content: "Kho tài liệu Vật lý THPT | TamGiangPhysics" },
      {
        property: "og:description",
        content:
          "Thư viện tài liệu Vật lý THPT TamGiangPhysics: Kho tài liệu Google Drive tổng hợp kiến thức, lý thuyết và công thức Vật lí THPT phục vụ quá trình học tập và ôn luyện.",
      },
    ],
  }),
  component: TaiLieuPage,
});

interface DriveCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  topics: string[];
  status: "active" | "updating";
  grade: "10" | "11" | "12" | "all";
  gradeLabel: string;
  driveFolderUrl: string;
}

const DRIVE_CATEGORIES: DriveCategory[] = [
  {
    id: "cat-cong-thuc",
    name: "CÔNG THỨC VẬT LÝ THPT",
    code: "CT-THPT",
    description:
      "Tổng hợp toàn bộ công thức trọng tâm từ Cơ học, Sóng, Điện - Từ đến Nhiệt học và Vật lý hiện đại. Tóm tắt theo bảng biểu dễ tra cứu và ghi nhớ.",
    topics: ["Toàn bộ công thức 10-11-12", "Sơ đồ tư duy định luật", "Bảng đại lượng & Đơn vị SI"],
    status: "active",
    grade: "all",
    gradeLabel: "Khối 10, 11, 12",
    driveFolderUrl: APP_CONFIG.googleDriveFolderUrl,
  },
  {
    id: "cat-ly-thuyet",
    name: "LÝ THUYẾT LÝ THPT",
    code: "LT-THPT",
    description:
      "Hệ thống hóa bản chất các hiện tượng vật lý, định nghĩa, định luật và giải thích ứng dụng thực tế. Soạn thảo chuẩn theo chương trình giáo dục phổ thông.",
    topics: ["Cơ học & Động lực học", "Dao động & Sóng cơ", "Điện trường & Từ trường", "Quang học & Lăng kính"],
    status: "active",
    grade: "all",
    gradeLabel: "Toàn cấp THPT",
    driveFolderUrl: APP_CONFIG.googleDriveFolderUrl,
  },
  {
    id: "cat-de-thi",
    name: "ĐỀ THI & BÀI TẬP ÔN LUYỆN",
    code: "DT-ONLUYEN",
    description:
      "Tuyển tập đề kiểm tra học kỳ, đề thi tốt nghiệp THPT, bài tập phân loại mức độ nhận biết - thông hiểu - vận dụng - vận dụng cao kèm lời giải chi tiết.",
    topics: ["Đề thi học kỳ 1 & 2", "Đề tham khảo tốt nghiệp THPT", "Bài tập trắc nghiệm đúng/sai", "Bài tập điền số ngắn"],
    status: "active",
    grade: "all",
    gradeLabel: "Các khối lớp",
    driveFolderUrl: APP_CONFIG.googleDriveFolderUrl,
  },
  {
    id: "cat-lop-10",
    name: "CHUYÊN ĐỀ VẬT LÝ LỚP 10",
    code: "CD-LOP10",
    description:
      "Trọn bộ tài liệu Vật lý 10: Động học, Động lực học Newton, Mômen lực, Năng lượng, Công - Công suất, Định luật bảo toàn động lượng và Năng lượng.",
    topics: ["Chuyển động thẳng & Biến đổi", "3 Định luật Newton", "Công & Năng lượng", "Chuyển động tròn đều"],
    status: "active",
    grade: "10",
    gradeLabel: "Khối 10",
    driveFolderUrl: APP_CONFIG.googleDriveFolderUrl,
  },
  {
    id: "cat-lop-11",
    name: "CHUYÊN ĐỀ VẬT LÝ LỚP 11",
    code: "CD-LOP11",
    description:
      "Trọn bộ tài liệu Vật lý 11: Dao động điều hòa, Sóng cơ & Sóng âm, Giao thoa sóng, Sóng dừng, Điện trường, Điện thế, Tụ điện & Dòng điện không đổi.",
    topics: ["Con lắc lò xo & Con lắc đơn", "Giao thoa & Tán sắc ánh sáng", "Điện tích & Định luật Coulomb", "Mạch điện một chiều"],
    status: "active",
    grade: "11",
    gradeLabel: "Khối 11",
    driveFolderUrl: APP_CONFIG.googleDriveFolderUrl,
  },
  {
    id: "cat-lop-12",
    name: "CHUYÊN ĐỀ VẬT LÝ LỚP 12",
    code: "CD-LOP12",
    description:
      "Trọn bộ tài liệu Vật lý 12: Thuyết động học phân tử, Nhiệt động lực học, Từ trường, Cảm ứng điện từ, Vật lý hạt nhân và Năng lượng liên kết.",
    topics: ["Các định luật chất khí", "Lực từ & Cảm ứng điện từ", "Hiện tượng phóng xạ", "Phản ứng phân hạch & Nhiệt hạch"],
    status: "active",
    grade: "12",
    gradeLabel: "Khối 12",
    driveFolderUrl: APP_CONFIG.googleDriveFolderUrl,
  },
];

function TaiLieuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDriveEmbed, setShowDriveEmbed] = useState(false);

  const filteredCategories = DRIVE_CATEGORIES.filter((cat) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      cat.name.toLowerCase().includes(q) ||
      cat.code.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.topics.some((t) => t.toLowerCase().includes(q));

    const matchGrade =
      selectedGrade === "all" || cat.grade === "all" || cat.grade === selectedGrade;

    return matchSearch && matchGrade;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      {/* 1. Header Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-lg">
            <Logo size="md" />
          </a>

          <nav className="hidden items-center gap-6 md:flex text-xs font-semibold text-muted-foreground">
            <a href="/#phuong-phap" className="hover:text-[#1558C9] dark:hover:text-[#60A5FA] transition-colors">
              Phương pháp học
            </a>
            <a href="/#phong-thi-nghiem" className="hover:text-[#1558C9] dark:hover:text-[#60A5FA] transition-colors">
              Phòng thí nghiệm
            </a>
            <a href="/#cach-hoc" className="hover:text-[#1558C9] dark:hover:text-[#60A5FA] transition-colors">
              Khối kiến thức
            </a>
            <a href="/tai-lieu" className="text-[#1558C9] dark:text-[#60A5FA] font-bold border-b-2 border-[#1558C9] dark:border-[#60A5FA] pb-1">
              Kho tài liệu Vật lý
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href="/mo-phong"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted"
            >
              <Compass className="size-3.5 text-[#1558C9] dark:text-[#60A5FA]" />
              <span>Vào phòng Lab</span>
              <ExternalLink className="size-3 opacity-60" />
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-card px-5 py-4 md:hidden space-y-3 animate-in fade-in duration-150">
            <a href="/#phuong-phap" className="block text-sm font-medium text-foreground py-1" onClick={() => setMobileMenuOpen(false)}>
              Phương pháp học
            </a>
            <a href="/#phong-thi-nghiem" className="block text-sm font-medium text-foreground py-1" onClick={() => setMobileMenuOpen(false)}>
              Phòng thí nghiệm
            </a>
            <a href="/#cach-hoc" className="block text-sm font-medium text-foreground py-1" onClick={() => setMobileMenuOpen(false)}>
              Khối kiến thức
            </a>
            <a href="/tai-lieu" className="block text-sm font-bold text-[#1558C9] dark:text-[#60A5FA] py-1" onClick={() => setMobileMenuOpen(false)}>
              Kho tài liệu Vật lý
            </a>
            <a
              href="/mo-phong"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#1558C9] py-2.5 text-xs font-bold text-white shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Vào phòng Lab ({APP_CONFIG.totalLessons} bài)</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        )}
      </header>

      <main className="flex-1 pb-20">
        {/* 2. Hero Section: Bright Academic */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#F6F9FE] via-[#FFFFFF] to-[#FFFFFF] dark:from-[#182235]/40 dark:via-[#101827] dark:to-[#101827] px-5 py-12 sm:px-8 sm:py-16 transition-colors duration-200">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#EAF2FF] dark:bg-[#1E2D42] px-4 py-1.5 text-xs font-bold text-[#1558C9] dark:text-[#60A5FA]">
              <BookOpen className="size-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
              <span>GOOGLE DRIVE · THƯ VIỆN KHOA HỌC SỐ</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-[#172033] dark:text-white">
              THƯ VIỆN TÀI LIỆU VẬT LÍ THPT
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#1558C9] dark:text-[#60A5FA] font-bold sm:text-base">
              Kho tài liệu tổng hợp kiến thức, lý thuyết và công thức Vật lí THPT phục vụ quá trình học tập và ôn luyện.
            </p>

            <p className="mx-auto max-w-xl text-xs leading-relaxed text-muted-foreground">
              Toàn bộ tài liệu chính thức được lưu trữ tập trung trên Google Drive của TamGiangPhysics. Bạn có thể mở trực tiếp thư mục công khai để xem và tải về tài liệu chuẩn định dạng PDF.
            </p>

            {/* Prominent Google Drive CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={APP_CONFIG.googleDriveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-[#1558C9] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#1558C9]/25 transition-all hover:bg-[#1146a1] hover:scale-[1.02]"
              >
                <FolderOpen className="size-4" />
                <span>Mở toàn bộ Kho Google Drive</span>
                <ExternalLink className="size-4" />
              </a>

              <button
                type="button"
                onClick={() => setShowDriveEmbed(!showDriveEmbed)}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <FileText className="size-4 text-[#0F766E] dark:text-[#2DD4BF]" />
                <span>{showDriveEmbed ? "Ẩn khung xem Google Drive" : "Xem trước trong trang (Embed)"}</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-[#0F766E] dark:text-[#2DD4BF]" />
              <span>Kho tài liệu chính thức của Trường THPT Tam Giang</span>
            </div>
          </div>
        </section>

        {/* 3. Search and Grade Filter Bar */}
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm công thức, chuyên đề, lớp 10, 11, 12..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              />
            </div>

            {/* Grade Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: "all", label: "Tất cả chuyên đề" },
                { id: "10", label: "Lớp 10" },
                { id: "11", label: "Lớp 11" },
                { id: "12", label: "Lớp 12" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedGrade(tab.id)}
                  className={`rounded-lg px-3.5 py-2 font-semibold transition-colors whitespace-nowrap ${
                    selectedGrade === tab.id
                      ? "bg-[#1558C9] text-white shadow-xs"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Google Drive Embed Preview */}
          {showDriveEmbed && (
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-6 space-y-3 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className="size-4 text-[#1558C9] dark:text-[#60A5FA]" />
                  <h3 className="text-sm font-bold text-foreground">
                    Khung xem trực tiếp Google Drive
                  </h3>
                </div>
                <a
                  href={APP_CONFIG.googleDriveFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1558C9] dark:text-[#60A5FA] hover:underline"
                >
                  <span>Mở tab mới</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-border bg-secondary">
                <iframe
                  src={APP_CONFIG.googleDriveEmbedUrl}
                  title="Google Drive Folder TamGiangPhysics"
                  className="size-full border-0"
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                Lưu ý: Nếu Google Drive yêu cầu đăng nhập hoặc không hiển thị do chính sách bảo mật trình duyệt, vui lòng bấm nút "Mở toàn bộ Kho Google Drive" ở trên để truy cập trực tiếp.
              </p>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-b border-border pb-3">
            <span>Hiển thị <strong>{filteredCategories.length}</strong> danh mục tài liệu</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-[#1558C9] dark:text-[#60A5FA] font-semibold hover:underline"
              >
                Xóa bộ lọc tìm kiếm
              </button>
            )}
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-xs transition-all hover:border-[#1558C9]/40 hover:shadow-md group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-[#EAF2FF] dark:bg-[#1E2D42] px-2.5 py-1 font-mono text-xs font-bold text-[#1558C9] dark:text-[#60A5FA] border border-[#2563EB]/20">
                      {cat.code}
                    </span>
                    <span className="rounded-full bg-[#F0FDF4] dark:bg-[#064E3B]/40 px-2 py-0.5 text-[11px] font-semibold text-[#0F766E] dark:text-[#2DD4BF] border border-[#0F766E]/20">
                      {cat.gradeLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-[#1558C9] dark:group-hover:text-[#60A5FA] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>

                  <div className="pt-2 border-t border-border">
                    <div className="text-[11px] font-semibold text-foreground mb-1.5">
                      Chủ đề chính trong thư mục:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-secondary px-2 py-1 text-[11px] text-muted-foreground border border-border"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <a
                    href={cat.driveFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1558C9] dark:text-[#60A5FA] hover:underline"
                  >
                    <span>Mở thư mục Drive</span>
                    <ExternalLink className="size-3.5" />
                  </a>

                  <a
                    href={cat.driveFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#1558C9] hover:bg-[#1146a1] text-white px-3 py-1.5 text-xs font-semibold shadow-xs"
                  >
                    Tải tài liệu ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Transparency Note as strictly required */}
          <div className="mt-12 rounded-2xl border border-border bg-[#F0FDF4] dark:bg-[#064E3B]/30 p-6 sm:p-8 space-y-2">
            <div className="flex items-center gap-2 text-[#0F766E] dark:text-[#2DD4BF]">
              <Info className="size-4 shrink-0" />
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                THÔNG TIN KHO LƯU TRỮ VẬT LÝ TAMGIANGPHYSICS
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-foreground">
              Toàn bộ bài giảng, tài liệu tóm tắt và ngân hàng đề thi được lưu trữ trực tiếp trên thư mục Google Drive chính thức do ban biên soạn môn Vật lý trường THPT Tam Giang quản lý. Khi giáo viên cập nhật thêm bài giảng mới trên Google Drive, bạn chỉ cần mở link thư mục để xem ngay phiên bản mới nhất.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
