import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Maximize2,
  Minimize2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Trophy,
  History,
  X,
  FileCheck,
  AlertCircle,
  Trash2,
  HelpCircle,
  RefreshCw,
  Share2,
} from "lucide-react";
import type { LessonMeta } from "@/data/curriculum";
import {
  saveSubmission,
  getSubmissionsHistory,
  clearSubmissionsHistory,
  type StoredSubmission,
  type SubmissionPayload,
} from "@/lib/submission-service";

interface SimulationViewerProps {
  lesson: LessonMeta;
  onToggleSidebar?: () => void;
}

export function SimulationViewer({ lesson, onToggleSidebar }: SimulationViewerProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadTimedOut, setLoadTimedOut] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Submissions and Grading state
  const [submissions, setSubmissions] = useState<StoredSubmission[]>([]);
  const [activeResult, setActiveResult] = useState<StoredSubmission | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Load history on mount and lesson change
  useEffect(() => {
    setSubmissions(getSubmissionsHistory(lesson.fullPath));
  }, [lesson.fullPath]);

  // Reset loading and error when lesson changes or reloads
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setLoadTimedOut(false);

    // Watchdog timer: If iframe doesn't load within 12s, offer fallback
    const timer = setTimeout(() => {
      setLoadTimedOut(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, [lesson.fullPath, reloadKey]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "[" && lesson.prevLessonPath) {
        e.preventDefault();
        navigate({ to: "/mo-phong/$", params: { _splat: lesson.prevLessonPath } });
      } else if (e.key === "]" && lesson.nextLessonPath) {
        e.preventDefault();
        navigate({ to: "/mo-phong/$", params: { _splat: lesson.nextLessonPath } });
      } else if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        onToggleSidebar?.();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        handleRetry();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "?") {
        e.preventDefault();
        setShowHelpModal((v) => !v);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lesson, navigate, onToggleSidebar]);

  // Message listener for auto-grading bridge from iframe simulation
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return;

      if (e.data.type === "VATLY_SUBMIT_RESULT" || e.data.type === "EXAM_SUBMISSION_RESULT") {
        const payload = e.data.payload as SubmissionPayload;
        if (payload) {
          const stored = saveSubmission(lesson.fullPath, payload);
          setSubmissions((prev) => [stored, ...prev.filter((s) => s.id !== stored.id)]);
          setActiveResult(stored);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [lesson.fullPath]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.error("Exit fullscreen error:", err);
      });
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setLoadTimedOut(false);
    setIsLoading(true);
    setReloadKey((k) => k + 1);
  };

  const proxiedSimulationUrl = `/api/mo-phong/${encodeURIComponent(lesson.simulationUrl)}`;
  const latestAttempt = submissions[0];

  return (
    <div
      ref={containerRef}
      className={`relative flex min-h-0 flex-1 flex-col bg-[#070E0B] text-[#EDF5ED] ${
        isFullscreen ? "h-screen w-screen" : "h-full"
      }`}
    >
      {/* Simulation Iframe viewport */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {/* Loading overlay with subtle spinner */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070E0B]/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 text-center px-4 max-w-sm">
              <Loader2 className="size-8 animate-spin text-[#38A875]" />
              <p className="font-mono text-xs text-[#EDF5ED]/80">
                Đang khởi tạo buồng thí nghiệm Vật lý số...
              </p>
              <p className="text-[11px] text-[#A5B7A8]">
                {lesson.name} · {lesson.grade}
              </p>

              {loadTimedOut && (
                <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 animate-in fade-in">
                  <p className="mb-2">Nguồn mô phỏng phản hồi chậm hoặc đang bảo trì máy chủ.</p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="rounded-lg bg-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-200 hover:bg-amber-500/30"
                    >
                      Thử tải lại
                    </button>
                    <a
                      href={lesson.simulationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-[#16845A] px-2.5 py-1 text-xs font-medium text-white hover:bg-[#38A875]"
                    >
                      Mở trong tab mới <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Fallback Viewport */}
        {hasError ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#070E0B] p-6 text-center">
            <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-6 space-y-4">
              <AlertCircle className="mx-auto size-10 text-red-400" />
              <div>
                <h3 className="text-base font-bold text-white">
                  Không thể tải mô phỏng trong khung nhúng
                </h3>
                <p className="mt-1 text-xs text-[#EDF5ED]/80">
                  Chính sách bảo mật (X-Frame-Options / CSP) hoặc đường truyền từ máy chủ nguồn tạm
                  thời bị gián đoạn.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                >
                  <RefreshCw className="size-3.5" /> Thử lại
                </button>
                <a
                  href={lesson.simulationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#16845A] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#38A875]"
                >
                  <ExternalLink className="size-3.5" /> Mở trực tiếp bài học
                </a>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            key={`${lesson.fullPath}-${reloadKey}`}
            src={proxiedSimulationUrl}
            title={lesson.name}
            onLoad={() => {
              setIsLoading(false);
              setLoadTimedOut(false);
            }}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
            className="size-full border-0"
            sandbox="allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin allow-modals allow-downloads"
            allow="fullscreen; autoplay"
          />
        )}
      </div>

      {/* Bottom control toolbar */}
      <footer className="flex h-11 shrink-0 items-center justify-between border-t border-[#153325] dark:border-[#12261C] bg-[#091A13] dark:bg-[#06120D] px-3 text-xs text-[#EDF5ED]/80 shadow-md">
        {/* Left: Navigation previous / next */}
        <div className="flex items-center gap-1">
          {lesson.prevLessonPath ? (
            <Link
              to="/mo-phong/$"
              params={{ _splat: lesson.prevLessonPath }}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 font-medium text-[#EDF5ED]/90 hover:bg-white/10 hover:text-white transition-colors"
              title="Bài trước (Phím [)"
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Bài trước</span>
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 font-medium text-white/30 cursor-not-allowed"
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Bài trước</span>
            </button>
          )}

          {lesson.nextLessonPath ? (
            <Link
              to="/mo-phong/$"
              params={{ _splat: lesson.nextLessonPath }}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 font-medium text-[#EDF5ED]/90 hover:bg-white/10 hover:text-white transition-colors"
              title="Bài sau (Phím ])"
            >
              <span className="hidden sm:inline">Bài sau</span>
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 font-medium text-white/30 cursor-not-allowed"
            >
              <span className="hidden sm:inline">Bài sau</span>
              <ChevronRight className="size-4" />
            </button>
          )}

          <span className="hidden md:inline text-[11px] text-white/40 pl-2">
            Phím: <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px] font-mono">[</kbd>{" "}
            <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px] font-mono">]</kbd>
          </span>
        </div>

        {/* Center: Submission and Lesson index info */}
        <div className="flex items-center gap-2 text-[#EDF5ED]">
          {latestAttempt ? (
            <button
              type="button"
              onClick={() => setActiveResult(latestAttempt)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#38A875]/40 bg-[#16845A]/20 px-2.5 py-1 text-[11px] font-semibold text-[#72CF91] hover:bg-[#16845A]/30 transition-all"
            >
              <Trophy className="size-3 text-[#C8ED78]" />
              <span>Điểm gần nhất: {latestAttempt.score.toFixed(1)}/10</span>
            </button>
          ) : (
            <span className="hidden lg:inline text-[11px] text-white/50">
              Bài #{lesson.index} / 777 · {lesson.grade}
            </span>
          )}
        </div>

        {/* Right: Actions (History, Help, Reload, Fullscreen, Open external) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowHistoryModal(true)}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[#72CF91] hover:bg-white/10 transition-colors"
            title="Xem lịch sử bài làm"
          >
            <History className="size-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Lịch sử</span>
            {submissions.length > 0 && (
              <span className="rounded-full bg-[#38A875] px-1.5 py-0.2 text-[10px] font-bold text-white">
                {submissions.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="flex size-8 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            title="Phím tắt & Hướng dẫn (Phím ?)"
            aria-label="Hướng dẫn phím tắt"
          >
            <HelpCircle className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={handleRetry}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[#EDF5ED]/80 hover:bg-white/10 hover:text-white transition-colors"
            title="Tải lại mô phỏng (Phím R)"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline text-xs">Tải lại</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[#EDF5ED]/80 hover:bg-white/10 hover:text-white transition-colors"
            title={isFullscreen ? "Thu nhỏ (Phím F)" : "Toàn màn hình (Phím F)"}
          >
            {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            <span className="hidden sm:inline text-xs">
              {isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
            </span>
          </button>

          <a
            href={lesson.simulationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-8 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white transition-colors"
            title="Mở trong tab mới"
          >
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </footer>

      {/* Keyboard Shortcuts Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-[#38A875]/40 bg-[#0B1511] p-6 text-[#EDF5ED] shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#2B4033] pb-3">
              <div className="flex items-center gap-2 text-[#72CF91]">
                <HelpCircle className="size-5" />
                <h3 className="text-base font-bold text-white">Phím tắt phòng Lab</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-white/60 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[#A5B7A8]">Chuyển sang bài trước</span>
                <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-[#C8ED78]">[</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[#A5B7A8]">Chuyển sang bài sau</span>
                <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-[#C8ED78]">]</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[#A5B7A8]">Đóng/Mở thanh giáo trình</span>
                <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-[#C8ED78]">B</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[#A5B7A8]">Tải lại mô phỏng hiện tại</span>
                <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-[#C8ED78]">R</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[#A5B7A8]">Toàn màn hình / Thu nhỏ</span>
                <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-[#C8ED78]">F</kbd>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-[#A5B7A8]">Hiện bảng phím tắt này</span>
                <kbd className="rounded bg-white/10 px-2 py-0.5 font-mono text-[#C8ED78]">?</kbd>
              </div>
            </div>

            <div className="border-t border-[#2B4033] pt-3 text-right">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="rounded-lg bg-[#16845A] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#38A875]"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission Success & Result Modal */}
      {activeResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-[#38A875]/40 bg-[#0B1511] p-6 text-[#EDF5ED] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-[#2B4033] pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#16845A]/20 text-[#72CF91]">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#EDF5ED]">
                    NỘP BÀI THÀNH CÔNG & ĐÃ CHẤM ĐIỂM
                  </h3>
                  <p className="text-xs text-[#72CF91] font-mono">
                    Hệ thống TamGiangPhysics đã ghi nhận bài làm
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveResult(null)}
                className="text-[#EDF5ED]/60 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Score Big Display */}
            <div className="rounded-xl border border-[#38A875]/30 bg-gradient-to-br from-[#16845A]/15 to-[#38A875]/10 p-5 text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#72CF91]">
                KẾT QUẢ ĐẠT ĐƯỢC
              </span>
              <div className="text-4xl font-extrabold text-[#EDF5ED]">
                {activeResult.score.toFixed(1)} <span className="text-xl text-[#C8ED78]">/ 10</span>
              </div>
              <p className="text-xs text-[#EDF5ED]/70">
                Thang điểm 10 chuẩn THPT · Chế độ:{" "}
                <strong className="text-white">
                  {activeResult.mode === "thi" ? "Thi thật có bấm giờ" : "Ôn luyện"}
                </strong>
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="rounded-lg border border-[#2B4033] bg-[#15271E] p-3">
                <span className="text-[#A5B7A8] block text-[11px]">Số câu đúng</span>
                <span className="text-base font-bold text-[#72CF91]">
                  {activeResult.correctCount}
                </span>
              </div>
              <div className="rounded-lg border border-[#2B4033] bg-[#15271E] p-3">
                <span className="text-[#A5B7A8] block text-[11px]">Tổng số câu</span>
                <span className="text-base font-bold text-[#EDF5ED]">
                  {activeResult.totalQuestions}
                </span>
              </div>
              <div className="rounded-lg border border-[#2B4033] bg-[#15271E] p-3">
                <span className="text-[#A5B7A8] block text-[11px]">Thời gian làm</span>
                <span className="text-base font-bold text-[#C8ED78] font-mono">
                  {activeResult.timeSpent || "00:00"}
                </span>
              </div>
            </div>

            {/* Detailed sections breakdown if present */}
            {(activeResult.p1 || activeResult.p2 || activeResult.p3) && (
              <div className="rounded-lg border border-[#2B4033] bg-[#15271E]/60 p-3 text-xs space-y-1.5">
                <span className="text-[11px] font-semibold text-[#72CF91] block uppercase">
                  Chi tiết từng phần:
                </span>
                {activeResult.p1 && (
                  <div className="flex justify-between text-[#EDF5ED]/80">
                    <span>Phần I: Trắc nghiệm</span>
                    <span className="font-mono">
                      {activeResult.p1.correct} / {activeResult.p1.total} câu
                    </span>
                  </div>
                )}
                {activeResult.p2 && (
                  <div className="flex justify-between text-[#EDF5ED]/80">
                    <span>Phần II: Đúng / Sai</span>
                    <span className="font-mono">
                      {activeResult.p2.correct} / {activeResult.p2.total} ý
                    </span>
                  </div>
                )}
                {activeResult.p3 && (
                  <div className="flex justify-between text-[#EDF5ED]/80">
                    <span>Phần III: Trả lời ngắn</span>
                    <span className="font-mono">
                      {activeResult.p3.correct} / {activeResult.p3.total} câu
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[#2B4033] pt-4 text-xs">
              <span className="text-[#A5B7A8] text-[11px]">
                Mã bài nộp: <span className="font-mono">{activeResult.id}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveResult(null)}
                  className="rounded-lg border border-[#2B4033] bg-[#15271E] px-4 py-2 font-medium text-white hover:bg-[#1B3025] transition-colors"
                >
                  Đóng & Xem đáp án
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submissions History Dialog */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl border border-[#2B4033] bg-[#0B1511] p-6 text-[#EDF5ED] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#2B4033] pb-3">
              <div className="flex items-center gap-2">
                <History className="size-5 text-[#72CF91]" />
                <h3 className="text-base font-bold text-[#EDF5ED]">
                  Lịch sử làm bài: {lesson.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="text-white/60 hover:text-white p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            {submissions.length === 0 ? (
              <div className="rounded-xl border border-[#2B4033] bg-[#15271E]/50 p-8 text-center space-y-2">
                <FileCheck className="mx-auto size-8 text-[#72CF91]/40" />
                <p className="text-sm font-semibold text-white">
                  Chưa có bài nộp nào cho bài học này
                </p>
                <p className="text-xs text-[#A5B7A8]">
                  Hãy hoàn thành các câu hỏi trong mô phỏng bài tập và nhấn &ldquo;Nộp bài&rdquo; để
                  lưu kết quả.
                </p>
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                {submissions.map((sub, idx) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between rounded-xl border border-[#2B4033] bg-[#15271E] p-3.5 transition-colors hover:border-[#38A875]/40"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#72CF91]">
                          Lần #{submissions.length - idx}
                        </span>
                        <span className="text-[11px] text-[#A5B7A8]">
                          {new Date(sub.submittedAt).toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          ·{" "}
                          {new Date(sub.submittedAt).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-[#EDF5ED]/70">
                        Đúng {sub.correctCount} / {sub.totalQuestions} câu · Thời gian làm:{" "}
                        {sub.timeSpent}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-lg border border-[#38A875]/30 bg-[#16845A]/20 px-2.5 py-1 text-sm font-extrabold text-[#72CF91]">
                        {sub.score.toFixed(1)}/10
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setShowHistoryModal(false);
                          setActiveResult(sub);
                        }}
                        className="text-xs text-[#C8ED78] hover:underline"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[#2B4033] pt-3 text-xs">
              <span className="text-[#A5B7A8] text-[11px]">
                Tổng cộng {submissions.length} lần nộp bài được lưu
              </span>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Xóa toàn bộ lịch sử làm bài trong trình duyệt này?")) {
                    clearSubmissionsHistory();
                    setSubmissions([]);
                  }
                }}
                className="text-xs text-red-400 hover:text-red-300 hover:underline flex items-center gap-1"
              >
                <Trash2 className="size-3" />
                Xóa lịch sử bài học này
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
