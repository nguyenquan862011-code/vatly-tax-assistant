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
  Clock,
  HelpCircle,
  FileCheck,
  AlertCircle,
  Trash2,
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Submissions and Grading state
  const [submissions, setSubmissions] = useState<StoredSubmission[]>([]);
  const [activeResult, setActiveResult] = useState<StoredSubmission | null>(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Load history on mount and lesson change
  useEffect(() => {
    setSubmissions(getSubmissionsHistory(lesson.fullPath));
  }, [lesson.fullPath]);

  // Reset loading when lesson changes or reloads
  useEffect(() => {
    setIsLoading(true);
  }, [lesson.fullPath, reloadKey]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Listen for submission events posted from iframe bridge
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === "TAMGIANG_SUBMISSION_RESULT" && e.data.payload) {
        const payload = e.data.payload as SubmissionPayload;
        const saved = saveSubmission(payload);
        setSubmissions(getSubmissionsHistory(lesson.fullPath));
        setActiveResult(saved);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [lesson.fullPath]);

  // Keyboard shortcuts: [, ], F, R, B
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "[" && lesson.prevLessonPath) {
        e.preventDefault();
        navigate({ to: "/mo-phong/$", params: { _splat: lesson.prevLessonPath } });
      } else if (e.key === "]" && lesson.nextLessonPath) {
        e.preventDefault();
        navigate({ to: "/mo-phong/$", params: { _splat: lesson.nextLessonPath } });
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        setReloadKey((k) => k + 1);
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "b" && onToggleSidebar) {
        e.preventDefault();
        onToggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lesson, navigate, onToggleSidebar]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error("Exit fullscreen error:", err);
      });
    }
  };

  // Route iframe through our own same-origin server proxy with TamGiang branding & bridge
  const proxiedSimulationUrl = `/api/mo-phong/${lesson.fullPath}`;

  const latestAttempt = submissions[0];

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-0 flex-1 flex-col bg-[#141a18] text-foreground select-none"
    >
      {/* Simulation Frame Container */}
      <div className="relative flex-1 overflow-hidden bg-[#141a18]">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#141a18]/90 text-white/80">
            <Loader2 className="size-7 animate-spin text-[#36D9E8]" />
            <span className="text-xs font-medium tracking-wide">Đang tải phòng thí nghiệm tương tác...</span>
          </div>
        )}

        <iframe
          key={`${lesson.fullPath}-${reloadKey}`}
          src={proxiedSimulationUrl}
          title={lesson.name}
          onLoad={() => setIsLoading(false)}
          className="size-full border-0"
          sandbox="allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin allow-modals allow-downloads"
          allow="fullscreen; autoplay"
        />
      </div>

      {/* Bottom control toolbar */}
      <footer className="flex h-11 shrink-0 items-center justify-between border-t border-white/10 bg-[#091426] px-3 text-xs text-white/80 shadow-md">
        {/* Left: Navigation previous / next */}
        <div className="flex items-center gap-1">
          {lesson.prevLessonPath ? (
            <Link
              to="/mo-phong/$"
              params={{ _splat: lesson.prevLessonPath }}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
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
              className="inline-flex h-8 items-center gap-1 rounded-md px-2.5 font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
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
            Phím tắt: <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px] font-mono">[</kbd>{" "}
            <kbd className="rounded bg-white/10 px-1 py-0.5 text-[10px] font-mono">]</kbd>
          </span>
        </div>

        {/* Center: Submission and Lesson index info */}
        <div className="flex items-center gap-2 text-white/80">
          {latestAttempt ? (
            <button
              type="button"
              onClick={() => setActiveResult(latestAttempt)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#48D597]/40 bg-[#48D597]/10 px-2.5 py-1 text-[11px] font-semibold text-[#48D597] hover:bg-[#48D597]/20 transition-all"
            >
              <Trophy className="size-3" />
              <span>Điểm gần nhất: {latestAttempt.score.toFixed(1)}/10</span>
            </button>
          ) : (
            <span className="hidden lg:inline text-[11px] text-white/50">
              Bài #{lesson.index} / 777 · {lesson.grade}
            </span>
          )}
        </div>

        {/* Right: Actions (History, Reload, Fullscreen, Open external) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowHistoryModal(true)}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[#36D9E8] hover:bg-[#36D9E8]/10 transition-colors"
            title="Xem lịch sử bài làm"
          >
            <History className="size-3.5" />
            <span className="hidden sm:inline text-xs font-medium">Lịch sử bài làm</span>
            {submissions.length > 0 && (
              <span className="rounded-full bg-[#36D9E8] px-1.5 py-0.2 text-[10px] font-bold text-[#050B18]">
                {submissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            title="Tải lại (Phím R)"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline text-xs">Tải lại</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
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

      {/* Submission Success & Result Modal */}
      {activeResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-[#48D597]/40 bg-[#050B18] p-6 text-[#F4F8FC] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-[#091426] pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#48D597]/20 text-[#48D597]">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F4F8FC]">
                    NỘP BÀI THÀNH CÔNG & ĐÃ CHẤM ĐIỂM
                  </h3>
                  <p className="text-xs text-[#36D9E8] font-mono">
                    Hệ thống TamGiangPhysics đã ghi nhận bài làm
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveResult(null)}
                className="text-[#F4F8FC]/60 hover:text-[#F4F8FC] p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Score Big Display */}
            <div className="rounded-xl border border-[#48D597]/30 bg-gradient-to-br from-[#48D597]/10 to-[#36D9E8]/10 p-5 text-center space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#48D597]">
                KẾT QUẢ ĐẠT ĐƯỢC
              </span>
              <div className="text-4xl font-extrabold text-[#F4F8FC]">
                {activeResult.score.toFixed(1)} <span className="text-xl text-[#36D9E8]">/ 10</span>
              </div>
              <p className="text-xs text-[#F4F8FC]/70">
                Thang điểm 10 chuẩn THPT · Chế độ:{" "}
                <strong className="text-[#F4F8FC]">
                  {activeResult.mode === "thi" ? "Thi thật có bấm giờ" : "Ôn luyện"}
                </strong>
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="rounded-lg border border-[#091426] bg-[#091426]/60 p-3">
                <span className="text-[#F4F8FC]/50 block text-[11px]">Số câu đúng</span>
                <span className="text-base font-bold text-[#48D597]">
                  {activeResult.correctCount}
                </span>
              </div>
              <div className="rounded-lg border border-[#091426] bg-[#091426]/60 p-3">
                <span className="text-[#F4F8FC]/50 block text-[11px]">Tổng số câu</span>
                <span className="text-base font-bold text-[#F4F8FC]">
                  {activeResult.totalQuestions}
                </span>
              </div>
              <div className="rounded-lg border border-[#091426] bg-[#091426]/60 p-3">
                <span className="text-[#F4F8FC]/50 block text-[11px]">Thời gian làm</span>
                <span className="text-base font-bold text-[#36D9E8] font-mono">
                  {activeResult.timeSpent || "00:00"}
                </span>
              </div>
            </div>

            {/* Detailed sections breakdown if present */}
            {(activeResult.p1 || activeResult.p2 || activeResult.p3) && (
              <div className="rounded-lg border border-[#091426] bg-[#091426]/40 p-3 text-xs space-y-1.5">
                <span className="text-[11px] font-semibold text-[#36D9E8] block uppercase">
                  Chi tiết từng phần:
                </span>
                {activeResult.p1 && (
                  <div className="flex justify-between text-[#F4F8FC]/80">
                    <span>Phần I: Trắc nghiệm</span>
                    <span className="font-mono">
                      {activeResult.p1.correct} / {activeResult.p1.total} câu
                    </span>
                  </div>
                )}
                {activeResult.p2 && (
                  <div className="flex justify-between text-[#F4F8FC]/80">
                    <span>Phần II: Đúng / Sai</span>
                    <span className="font-mono">
                      {activeResult.p2.correct} / {activeResult.p2.total} ý
                    </span>
                  </div>
                )}
                {activeResult.p3 && (
                  <div className="flex justify-between text-[#F4F8FC]/80">
                    <span>Phần III: Trả lời ngắn</span>
                    <span className="font-mono">
                      {activeResult.p3.correct} / {activeResult.p3.total} câu
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[#091426] pt-4 text-xs">
              <span className="text-[#F4F8FC]/40 text-[11px]">
                Mã bài nộp: <span className="font-mono">{activeResult.id}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveResult(null)}
                  className="rounded-lg border border-[#091426] bg-[#091426] px-4 py-2 font-medium text-[#F4F8FC] hover:bg-[#091426]/80"
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
          <div className="w-full max-w-xl rounded-2xl border border-[#091426] bg-[#050B18] p-6 text-[#F4F8FC] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#091426] pb-3">
              <div className="flex items-center gap-2">
                <History className="size-5 text-[#36D9E8]" />
                <h3 className="text-base font-bold text-[#F4F8FC]">
                  Lịch sử làm bài: {lesson.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="text-[#F4F8FC]/60 hover:text-[#F4F8FC] p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            {submissions.length === 0 ? (
              <div className="rounded-xl border border-[#091426] bg-[#091426]/30 p-8 text-center space-y-2">
                <FileCheck className="mx-auto size-8 text-[#36D9E8]/40" />
                <p className="text-sm font-semibold text-[#F4F8FC]">Chưa có bài nộp nào cho bài học này</p>
                <p className="text-xs text-[#F4F8FC]/60">
                  Hãy hoàn thành các câu hỏi trong mô phỏng bài tập và nhấn &ldquo;Nộp bài&rdquo; để lưu kết quả.
                </p>
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                {submissions.map((sub, idx) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between rounded-xl border border-[#091426] bg-[#091426]/50 p-3.5 transition-colors hover:border-[#36D9E8]/40"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#48D597]">
                          Lần #{submissions.length - idx}
                        </span>
                        <span className="text-[11px] text-[#F4F8FC]/50">
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
                      <p className="text-xs text-[#F4F8FC]/70">
                        Đúng {sub.correctCount} / {sub.totalQuestions} câu · Thời gian làm: {sub.timeSpent}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-lg border border-[#48D597]/30 bg-[#48D597]/10 px-2.5 py-1 text-sm font-extrabold text-[#48D597]">
                        {sub.score.toFixed(1)}/10
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setShowHistoryModal(false);
                          setActiveResult(sub);
                        }}
                        className="text-xs text-[#36D9E8] hover:underline"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[#091426] pt-3 text-xs">
              <span className="text-[#F4F8FC]/40 text-[11px]">
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
                className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:underline"
              >
                <Trash2 className="size-3" />
                <span>Xóa lịch sử</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
