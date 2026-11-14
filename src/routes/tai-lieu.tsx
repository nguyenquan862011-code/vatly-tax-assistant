import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import { APP_CONFIG } from "@/lib/config";
import {
  Search,
  BookOpen,
  Sparkles,
  ExternalLink,
  ChevronRight,
  FolderOpen,
  FileText,
  GraduationCap,
  ShieldCheck,
  Download,
  Eye,
  CheckCircle2,
  RefreshCw,
  Info,
  Menu,
  X,
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
    id: "cat-de-kiem-tra",
    name: "ĐỀ KIỂM TRA & ÔN TẬP",
    code: "KT-THPT",
    description:
      "Bộ đề trắc nghiệm chuẩn cấu trúc mới: trắc nghiệm nhiều lựa chọn, đúng/sai và câu trả lời ngắn kèm lời giải chi tiết phục vụ kiểm tra định kỳ.",
    topics: ["Đề giữa kỳ & cuối kỳ", "Luyện thi tốt nghiệp THPT", "Đề khảo sát năng lực"],
    status: "active",
    grade: "12",
    gradeLabel: "Lớp 12 & Luyện thi",
    driveFolderUrl: APP_CONFIG.googleDriveFolderUrl,
  },
  {
    id: "cat-thi-nghiem",
    name: "TÀI LIỆU THỰC HÀNH & SAI SỐ",
    code: "TN-SS",
    description:
      "Cẩm nang hướng dẫn an toàn phòng thí nghiệm, phương pháp đo lường, quy tắc làm tròn và phương pháp xử lý sai số ngẫu nhiên, sai số dụng cụ.",
    topics: ["Quy tắc an toàn Lab", "Đo thời gian rơi tự do", "Khảo sát con lắc đơn", "Khúc xạ & Tán sắc lăng kính"],
    status: "active",
    grade: "10",
    gradeLabel: "Lớp 10 & 11",
    driveFolderUrl: APP_CONFIG.googleDriveFolderUrl,
  },
];

function TaiLieuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEmbedPreview, setShowEmbedPreview] = useState(false);

  const filteredCategories = DRIVE_CATEGORIES.filter((cat) => {
    const matchSearch =
      searchQuery === "" ||
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchGrade =
      selectedGrade === "all" || cat.grade === "all" || cat.grade === selectedGrade;

    return matchSearch && matchGrade;
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#050B18] text-[#F4F8FC]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#091426] bg-[#050B18]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="inline-flex items-center gap-2">
            <Logo size="md" />
          </a>

          <nav className="hidden items-center gap-6 md:flex text-sm font-medium">
            <a href="/#phuong-phap" className="text-[#F4F8FC]/70 hover:text-[#48D597] transition-colors">
              Phương pháp học
            </a>
            <a href="/#cach-hoc" className="text-[#F4F8FC]/70 hover:text-[#48D597] transition-colors">
              Cách học
            </a>
            <a href="/#mo-phong-tieu-bieu" className="text-[#F4F8FC]/70 hover:text-[#48D597] transition-colors">
              Ví dụ mô phỏng
            </a>
            <a href="/tai-lieu" className="text-[#48D597] font-semibold border-b-2 border-[#48D597] pb-1">
              Kho tài liệu Vật lý
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/mo-phong"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#36D9E8]/40 bg-[#36D9E8]/10 px-4 py-2 text-xs font-semibold text-[#36D9E8] transition-all hover:bg-[#36D9E8]/20 hover:border-[#36D9E8]"
            >
              <span>Vào phòng Lab</span>
              <ExternalLink className="size-3" />
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

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-[#091426] bg-[#050B18] px-5 py-4 md:hidden space-y-3">
            <a href="/#phuong-phap" className="block text-sm text-[#F4F8FC]/80 py-1" onClick={() => setMobileMenuOpen(false)}>
              Phương pháp học
            </a>
            <a href="/#cach-hoc" className="block text-sm text-[#F4F8FC]/80 py-1" onClick={() => setMobileMenuOpen(false)}>
              Cách học
            </a>
            <a href="/#mo-phong-tieu-bieu" className="block text-sm text-[#F4F8FC]/80 py-1" onClick={() => setMobileMenuOpen(false)}>
              Ví dụ mô phỏng
            </a>
            <a href="/tai-lieu" className="block text-sm text-[#48D597] font-semibold py-1" onClick={() => setMobileMenuOpen(false)}>
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

      <main className="flex-1 pb-20">
        {/* Prominent Google Drive Hero Section as strictly specified in prompt */}
        <section className="relative overflow-hidden border-b border-[#091426] bg-gradient-to-b from-[#091426]/70 via-[#050B18] to-[#050B18] px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#48D597]/30 bg-[#48D597]/10 px-4 py-1.5 text-xs font-medium text-[#48D597]">
              <BookOpen className="size-3.5" />
              <span>GOOGLE DRIVE · THƯ VIỆN KHOA HỌC SỐ</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-[#F4F8FC]">
              THƯ VIỆN TÀI LIỆU VẬT LÝ THPT
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#36D9E8] font-semibold sm:text-lg">
              Kho tài liệu tổng hợp kiến thức, lý thuyết và công thức Vật lí THPT phục vụ quá trình học tập và ôn luyện.
            </p>

            <p className="mx-auto max-w-xl text-xs leading-relaxed text-[#F4F8FC]/70">
              Tri thức được hệ thống hóa – Kiến thức được kết nối – Tư duy được khai mở. Toàn bộ tài liệu chính thức được lưu trữ tập trung trên Google Drive của TamGiangPhysics, truy cập công khai và tải về nhanh chóng.
            </p>

            {/* Prominent Google Drive CTA Button */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={APP_CONFIG.googleDriveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#48D597] to-[#36D9E8] px-6 py-3.5 text-sm font-bold text-[#050B18] shadow-lg shadow-[#48D597]/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#36D9E8]/30 focus:outline-none focus:ring-2 focus:ring-[#36D9E8]"
              >
                <FolderOpen className="size-4.5" />
                <span>MỞ KHO TÀI LIỆU GOOGLE DRIVE</span>
                <ExternalLink className="size-4" />
              </a>

              <button
                type="button"
                onClick={() => setShowEmbedPreview(!showEmbedPreview)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#36D9E8]/40 bg-[#091426]/80 px-5 py-3.5 text-xs font-semibold text-[#36D9E8] hover:bg-[#36D9E8]/10 transition-colors"
              >
                <Eye className="size-4" />
                <span>{showEmbedPreview ? "Ẩn khung xem trực tiếp" : "Xem trực tiếp trên trang"}</span>
              </button>
            </div>

            {/* Drive Permission info */}
            <div className="mx-auto flex max-w-md items-center justify-center gap-2 text-[11px] text-[#F4F8FC]/60">
              <ShieldCheck className="size-3.5 text-[#48D597]" />
              <span>Quyền truy cập: <strong>Anyone with the link – Viewer</strong> (Xem và tải về miễn phí)</span>
            </div>

            {/* Search Input */}
            <div className="mx-auto mt-6 max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 size-4 text-[#36D9E8]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm danh mục: công thức, lý thuyết, đề thi, sai số..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#091426] bg-[#091426]/70 py-3.5 pl-11 pr-4 text-sm text-[#F4F8FC] placeholder-[#F4F8FC]/40 outline-none transition-all focus:border-[#36D9E8] focus:ring-1 focus:ring-[#36D9E8]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Google Drive Preview (if user toggles) */}
        {showEmbedPreview && (
          <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
            <div className="rounded-2xl border border-[#36D9E8]/30 bg-[#091426]/80 p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className="size-4 text-[#36D9E8]" />
                  <h3 className="text-sm font-semibold text-[#F4F8FC]">
                    Khung duyệt thư mục Google Drive trực tiếp
                  </h3>
                </div>
                <a
                  href={APP_CONFIG.googleDriveFolderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#48D597] hover:underline flex items-center gap-1"
                >
                  <span>Mở toàn màn hình</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
              <div className="relative h-[480px] w-full overflow-hidden rounded-xl border border-[#091426] bg-[#050B18]">
                <iframe
                  src={APP_CONFIG.googleDriveEmbedUrl}
                  title="Google Drive TamGiangPhysics"
                  className="size-full border-0"
                  allow="fullscreen"
                />
              </div>
            </div>
          </section>
        )}

        {/* Filters & Content Area */}
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          {/* Grade Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#091426] bg-[#091426]/40 p-4 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[#F4F8FC]/60 mr-1 flex items-center gap-1">
                <GraduationCap className="size-3.5" /> Lọc theo khối lớp:
              </span>
              {[
                { id: "all", label: "Tất cả khối lớp" },
                { id: "10", label: "Lớp 10" },
                { id: "11", label: "Lớp 11" },
                { id: "12", label: "Lớp 12" },
              ].map((grade) => (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => setSelectedGrade(grade.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedGrade === grade.id
                      ? "bg-[#48D597] text-[#050B18] font-semibold"
                      : "bg-[#050B18] text-[#F4F8FC]/70 hover:text-[#F4F8FC] hover:bg-[#050B18]/80 border border-[#091426]"
                  }`}
                >
                  {grade.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#36D9E8]">
              <Sparkles className="size-3.5" />
              <span>Đang cập nhật liên tục</span>
            </div>
          </div>

          {/* Drive Folders Grid */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#36D9E8]">
                Danh mục kho tài liệu Google Drive
              </h2>
              <span className="font-mono text-xs text-[#F4F8FC]/50">
                {filteredCategories.length} phân loại tài liệu
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#091426] bg-[#091426]/40 p-6 transition-all hover:border-[#36D9E8]/50 hover:bg-[#091426]/60 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#36D9E8]/30 bg-[#36D9E8]/10 px-2.5 py-1 font-mono text-[11px] font-bold text-[#36D9E8]">
                        <FolderOpen className="size-3.5" />
                        {cat.code}
                      </span>
                      <span className="rounded-md border border-[#48D597]/30 bg-[#48D597]/10 px-2 py-0.5 text-[10px] font-medium text-[#48D597]">
                        {cat.gradeLabel}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#F4F8FC] group-hover:text-[#36D9E8] transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-xs leading-relaxed text-[#F4F8FC]/75">
                      {cat.description}
                    </p>

                    <div className="pt-2 border-t border-[#091426]">
                      <span className="text-[11px] font-medium text-[#F4F8FC]/50 block mb-1.5">
                        Tài liệu tiêu biểu:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.topics.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-[#050B18] px-2 py-1 text-[11px] text-[#F4F8FC]/80 border border-[#091426]"
                          >
                            • {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#091426] pt-4">
                    <span className="text-[11px] text-[#48D597] flex items-center gap-1 font-medium">
                      <CheckCircle2 className="size-3.5" />
                      Thư mục Google Drive chính thức
                    </span>

                    <a
                      href={cat.driveFolderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#36D9E8]/10 border border-[#36D9E8]/40 px-3.5 py-1.5 text-xs font-semibold text-[#36D9E8] hover:bg-[#36D9E8]/20 transition-all"
                    >
                      <span>Mở thư mục</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drive Sync Explanation Notice as required in Section VIII */}
          <div className="mt-12 rounded-2xl border border-[#091426] bg-[#091426]/30 p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#48D597]">
              <Info className="size-4.5" />
              <span>Cơ chế cập nhật tài liệu qua Google Drive</span>
            </div>
            <p className="text-xs leading-relaxed text-[#F4F8FC]/70 max-w-3xl">
              Kho tài liệu TamGiangPhysics hiện được kết nối trực tiếp với thư mục Google Drive chính thức được cung cấp. Mọi tài liệu mới được tải lên thư mục này sẽ hiển thị ngay cho học sinh khi mở liên kết Drive. Website không sử dụng đường dẫn tệp giả hoặc nút tải giả.
            </p>
            <div className="pt-2">
              <a
                href={APP_CONFIG.googleDriveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#36D9E8] hover:underline"
              >
                <span>Mở thư mục tổng hợp trên Google Drive</span>
                <ChevronRight className="size-3" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
