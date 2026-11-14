import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  BookOpen,
  Sparkles,
  Layers,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

export const Route = createFileRoute("/tai-lieu")({
  head: () => ({
    meta: [
      { title: "Kho tài liệu Vật lý | TamGiangPhysics" },
      {
        name: "description",
        content:
          "Kho tài liệu Vật lý TamGiangPhysics: Sách giáo khoa, chuyên đề, công thức định luật, đề thi và tài liệu thí nghiệm chuẩn hóa.",
      },
      { property: "og:title", content: "Kho tài liệu Vật lý | TamGiangPhysics" },
      {
        property: "og:description",
        content:
          "Kho tài liệu Vật lý TamGiangPhysics: Sách giáo khoa, chuyên đề, công thức định luật, đề thi và tài liệu thí nghiệm chuẩn hóa.",
      },
    ],
  }),
  component: TaiLieuPage,
});

interface DocumentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  grade: "10" | "11" | "12" | "all";
  gradeLabel: string;
  topic: string;
  format: "PDF" | "DOCX" | "SLIDE";
  fileSize: string;
  updatedAt: string;
  isNew?: boolean;
  downloadUrl?: string;
  previewUrl?: string;
}

const CATEGORIES = [
  "Tất cả danh mục",
  "Sách giáo khoa Vật lý",
  "Tài liệu ôn tập",
  "Chuyên đề Vật lý",
  "Công thức và định luật",
  "Đề kiểm tra và đề thi",
  "Tài liệu thí nghiệm",
  "Đề thi học sinh giỏi",
  "Tài liệu nâng cao",
];

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: "doc-1",
    title: "Sổ tay hệ thống hóa công thức Vật lý 10, 11, 12",
    description: "Tổng hợp toàn bộ công thức trọng tâm từ Cơ học, Sóng, Điện từ đến Nhiệt học và Vật lý hiện đại.",
    category: "Công thức và định luật",
    grade: "all",
    gradeLabel: "Toàn cấp THPT",
    topic: "Tổng hợp toàn khóa",
    format: "PDF",
    fileSize: "4.8 MB",
    updatedAt: "Tháng 11/2026",
    isNew: true,
  },
  {
    id: "doc-2",
    title: "Chuyên đề Quang hình học & Tán sắc ánh sáng qua lăng kính",
    description: "Lý thuyết chi tiết, định luật khúc xạ, công thức lăng kính và phương pháp phân tích góc lệch cực tiểu.",
    category: "Chuyên đề Vật lý",
    grade: "11",
    gradeLabel: "Lớp 11",
    topic: "Quang học",
    format: "PDF",
    fileSize: "3.2 MB",
    updatedAt: "Tháng 11/2026",
    isNew: true,
  },
  {
    id: "doc-3",
    title: "Cẩm nang hướng dẫn thực hành & xử lý sai số thí nghiệm Vật lý",
    description: "Quy chuẩn an toàn phòng thí nghiệm, phương pháp đo đạc và cách xác định sai số dụng cụ, sai số ngẫu nhiên.",
    category: "Tài liệu thí nghiệm",
    grade: "10",
    gradeLabel: "Lớp 10",
    topic: "Thực nghiệm & Sai số",
    format: "PDF",
    fileSize: "2.6 MB",
    updatedAt: "Tháng 10/2026",
  },
  {
    id: "doc-4",
    title: "Bộ đề ôn tập & Đánh giá năng lực môn Vật lý THPT",
    description: "Hệ thống câu hỏi trắc nghiệm đúng/sai, trắc nghiệm nhiều lựa chọn và bài tập tự luận có lời giải mẫu chi tiết.",
    category: "Đề kiểm tra và đề thi",
    grade: "12",
    gradeLabel: "Lớp 12",
    topic: "Luyện thi tốt nghiệp",
    format: "PDF",
    fileSize: "5.4 MB",
    updatedAt: "Tháng 11/2026",
    isNew: true,
  },
  {
    id: "doc-5",
    title: "Chuyên đề Dao động điều hòa & Giao thoa sóng cơ học",
    description: "Phân tích bản chất hiện tượng giao thoa hai nguồn, sóng dừng và đồ thị li độ - thời gian trong dao động.",
    category: "Chuyên đề Vật lý",
    grade: "11",
    gradeLabel: "Lớp 11",
    topic: "Sóng & Dao động",
    format: "PDF",
    fileSize: "3.9 MB",
    updatedAt: "Tháng 10/2026",
  },
  {
    id: "doc-6",
    title: "Tài liệu bồi dưỡng học sinh giỏi: Cơ học chất điểm nâng cao",
    description: "Các bài toán chuyển động ném xiên trên mặt phẳng nghiêng, va chạm đàn hồi và định luật bảo toàn động lượng.",
    category: "Đề thi học sinh giỏi",
    grade: "10",
    gradeLabel: "Lớp 10",
    topic: "Cơ học nâng cao",
    format: "PDF",
    fileSize: "4.1 MB",
    updatedAt: "Tháng 09/2026",
  },
  {
    id: "doc-7",
    title: "Đề cương ôn tập kiểm tra giữa kỳ & cuối kỳ Vật lý 10",
    description: "Tổng hợp lý thuyết trọng tâm 4 chủ đề mở đầu môn Vật lý, kèm bảng tóm tắt đại lượng và đơn vị đo SI.",
    category: "Tài liệu ôn tập",
    grade: "10",
    gradeLabel: "Lớp 10",
    topic: "Cơ học phần 1",
    format: "DOCX",
    fileSize: "1.8 MB",
    updatedAt: "Tháng 10/2026",
  },
  {
    id: "doc-8",
    title: "Bài giảng chuyên đề Khí lý tưởng & Các định luật chất khí",
    description: "Slide minh họa mô hình phân tử khí, phương trình Clapeyron - Mendeleev và các quá trình đẳng nhiệt, đẳng tích.",
    category: "Tài liệu nâng cao",
    grade: "12",
    gradeLabel: "Lớp 12",
    topic: "Chất khí & Nhiệt học",
    format: "SLIDE",
    fileSize: "6.2 MB",
    updatedAt: "Tháng 10/2026",
  },
];

function TaiLieuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả danh mục");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreviewDoc, setActivePreviewDoc] = useState<DocumentItem | null>(null);

  const filteredDocuments = useMemo(() => {
    return INITIAL_DOCUMENTS.filter((doc) => {
      const matchSearch =
        searchQuery === "" ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.topic.toLowerCase().includes(searchQuery.toLowerCase());

      const matchGrade =
        selectedGrade === "all" || doc.grade === "all" || doc.grade === selectedGrade;

      const matchCategory =
        selectedCategory === "Tất cả danh mục" || doc.category === selectedCategory;

      const matchFormat = selectedFormat === "all" || doc.format === selectedFormat;

      return matchSearch && matchGrade && matchCategory && matchFormat;
    });
  }, [searchQuery, selectedGrade, selectedCategory, selectedFormat]);

  const recentDocuments = useMemo(() => {
    return INITIAL_DOCUMENTS.filter((d) => d.isNew).slice(0, 3);
  }, []);

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
        {/* Header Hero */}
        <section className="relative overflow-hidden border-b border-[#091426] bg-gradient-to-b from-[#091426]/50 via-[#050B18] to-[#050B18] px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#48D597]/30 bg-[#48D597]/10 px-3.5 py-1.5 text-xs font-medium text-[#48D597]">
              <BookOpen className="size-3.5" />
              <span>THƯ VIỆN KHOA HỌC SỐ</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              KHO TÀI LIỆU VẬT LÝ
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#36D9E8] font-medium sm:text-base">
              Tri thức được hệ thống hóa – Kiến thức được kết nối – Tư duy được khai mở.
            </p>

            <p className="mx-auto max-w-xl text-xs leading-relaxed text-[#F4F8FC]/70">
              Tổng hợp sách giáo khoa, sổ tay công thức, chuyên đề phân tích hiện tượng và đề thi chọn lọc dành riêng cho học sinh đam mê Vật lý.
            </p>

            {/* Search Input */}
            <div className="mx-auto mt-6 max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 size-4 text-[#36D9E8]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tài liệu theo tên, chuyên đề hoặc nội dung..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-[#091426] bg-[#091426]/70 py-3.5 pl-11 pr-4 text-sm text-[#F4F8FC] placeholder-[#F4F8FC]/40 outline-none transition-all focus:border-[#36D9E8] focus:ring-1 focus:ring-[#36D9E8]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Content Area */}
        <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          {/* Filter Bar */}
          <div className="space-y-4 rounded-xl border border-[#091426] bg-[#091426]/40 p-4 sm:p-5 backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Grade Chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-[#F4F8FC]/60 mr-1 flex items-center gap-1">
                  <GraduationCap className="size-3.5" /> Khối lớp:
                </span>
                {[
                  { id: "all", label: "Tất cả" },
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

              {/* Format Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#F4F8FC]/60">Định dạng:</span>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="rounded-lg border border-[#091426] bg-[#050B18] px-3 py-1.5 text-xs text-[#F4F8FC] outline-none focus:border-[#36D9E8]"
                >
                  <option value="all">Tất cả định dạng</option>
                  <option value="PDF">PDF Document</option>
                  <option value="DOCX">Word DOCX</option>
                  <option value="SLIDE">Slide bài giảng</option>
                </select>
              </div>
            </div>

            {/* Category horizontal scrolling buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-[#091426] pt-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "border border-[#36D9E8] bg-[#36D9E8]/10 text-[#36D9E8]"
                      : "text-[#F4F8FC]/60 hover:text-[#F4F8FC] hover:bg-[#050B18]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Newest updates spotlight */}
          {searchQuery === "" && selectedCategory === "Tất cả danh mục" && selectedGrade === "all" && (
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#36D9E8]" />
                <h2 className="text-sm font-semibold tracking-wider text-[#36D9E8] uppercase">
                  Tài liệu mới cập nhật
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="relative overflow-hidden rounded-xl border border-[#091426] bg-[#091426]/30 p-4 transition-all hover:border-[#48D597]/40"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#F4F8FC]/50 mb-2">
                      <span className="font-mono text-[#48D597]">{doc.format}</span>
                      <span>{doc.gradeLabel}</span>
                    </div>
                    <h3 className="line-clamp-2 text-sm font-semibold text-[#F4F8FC]">
                      {doc.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-[#F4F8FC]/60">
                      {doc.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#091426] text-[11px]">
                      <span className="text-[#F4F8FC]/40">{doc.fileSize}</span>
                      <button
                        type="button"
                        onClick={() => setActivePreviewDoc(doc)}
                        className="inline-flex items-center gap-1 text-[#36D9E8] hover:underline"
                      >
                        <Eye className="size-3" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Documents Grid or Empty State */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-mono text-[#F4F8FC]/60">
                Tìm thấy {filteredDocuments.length} tài liệu phù hợp
              </span>
            </div>

            {filteredDocuments.length === 0 ? (
              <div className="rounded-2xl border border-[#091426] bg-[#091426]/30 p-12 text-center space-y-3">
                <BookOpen className="mx-auto size-10 text-[#36D9E8]/50" />
                <h3 className="text-base font-semibold text-[#F4F8FC]">
                  Thư viện đang được cập nhật
                </h3>
                <p className="text-xs text-[#F4F8FC]/60 max-w-md mx-auto">
                  Những tài liệu mới sẽ sớm được bổ sung. Bạn có thể chọn danh mục khác hoặc quay lại sau!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col justify-between rounded-xl border border-[#091426] bg-[#091426]/40 p-5 transition-all hover:border-[#36D9E8]/40 hover:bg-[#091426]/60"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-md border border-[#36D9E8]/30 bg-[#36D9E8]/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#36D9E8]">
                            <FileText className="size-3" />
                            {doc.format}
                          </span>
                          <span className="rounded-md border border-[#48D597]/30 bg-[#48D597]/10 px-2 py-0.5 text-[10px] font-medium text-[#48D597]">
                            {doc.gradeLabel}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#F4F8FC]/40">
                          {doc.fileSize}
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-[#F4F8FC] leading-snug">
                        {doc.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-[#F4F8FC]/70">
                        {doc.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-[#F4F8FC]/50">
                        <span>Chuyên mục: <strong>{doc.category}</strong></span>
                        <span>·</span>
                        <span>Chủ đề: {doc.topic}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#091426] pt-3">
                      <span className="text-[11px] text-[#F4F8FC]/40 flex items-center gap-1">
                        <Calendar className="size-3" />
                        {doc.updatedAt}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActivePreviewDoc(doc)}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#091426] bg-[#050B18] px-3 py-1.5 text-xs font-medium text-[#F4F8FC] hover:border-[#36D9E8]/40 hover:text-[#36D9E8] transition-colors"
                        >
                          <Eye className="size-3" />
                          <span>Xem trước</span>
                        </button>
                        <a
                          href={`mailto:nguyenquan862011@gmail.com?subject=Yêu cầu tải tài liệu: ${encodeURIComponent(doc.title)}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#48D597]/40 bg-[#48D597]/10 px-3 py-1.5 text-xs font-medium text-[#48D597] hover:bg-[#48D597]/20 transition-colors"
                        >
                          <Download className="size-3" />
                          <span>Tải tài liệu</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Preview Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-[#091426] bg-[#050B18] p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#091426] pb-3">
              <div>
                <span className="font-mono text-xs text-[#36D9E8]">Xem trước tài liệu</span>
                <h3 className="mt-1 text-base font-semibold text-[#F4F8FC]">
                  {activePreviewDoc.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="text-[#F4F8FC]/60 hover:text-[#F4F8FC] p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-[#F4F8FC]/80">
              <div className="rounded-lg bg-[#091426]/60 p-3 space-y-1.5 border border-[#091426]">
                <p><strong>Khối lớp:</strong> {activePreviewDoc.gradeLabel}</p>
                <p><strong>Chuyên mục:</strong> {activePreviewDoc.category}</p>
                <p><strong>Chủ đề:</strong> {activePreviewDoc.topic}</p>
                <p><strong>Định dạng file:</strong> {activePreviewDoc.format} ({activePreviewDoc.fileSize})</p>
                <p><strong>Ngày cập nhật:</strong> {activePreviewDoc.updatedAt}</p>
              </div>

              <p className="text-xs text-[#F4F8FC]/70">
                {activePreviewDoc.description}
              </p>

              <div className="rounded-lg border border-[#48D597]/30 bg-[#48D597]/10 p-3 text-xs text-[#48D597]">
                Tài liệu được biên soạn và chuẩn hóa bởi TamGiangPhysics. Bạn có thể tải trực tiếp hoặc gửi yêu cầu để nhận bản in độ nét cao.
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-[#091426] pt-4">
              <button
                type="button"
                onClick={() => setActivePreviewDoc(null)}
                className="rounded-lg px-4 py-2 text-xs font-medium text-[#F4F8FC]/70 hover:text-[#F4F8FC]"
              >
                Đóng
              </button>
              <a
                href={`mailto:nguyenquan862011@gmail.com?subject=Tải tài liệu: ${encodeURIComponent(activePreviewDoc.title)}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#48D597] px-4 py-2 text-xs font-semibold text-[#050B18] hover:bg-[#48D597]/90 transition-colors"
              >
                <Download className="size-3.5" />
                <span>Nhận tài liệu qua Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
