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
      <footer className="flex h-11 shrink-0 items-center justify-between border-t border-border bg-card px-3 text-xs text-foreground shadow-xs transition-colors duration-200">
        {/* Left: Navigation previous / next */}
        <div className="flex items-center gap-1">
          {lesson.prevLessonPath ? (
            <Link
              to="/mo-phong/$"
              params={{ _splat: lesson.prevLessonPath }}
              className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 font-medium text-foreground hover:bg-muted transition-colors"
              title="Bài trước (Phím [)"
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Bài trước</span>
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 font-medium text-muted-foreground/40 cursor-not-allowed"
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">Bài trước</span>
            </button>
          )}

          {lesson.nextLessonPath ? (
            <Link
              to="/mo-phong/$"
              params={{ _splat: lesson.nextLessonPath }}
              className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 font-medium text-foreground hover:bg-muted transition-colors"
              title="Bài sau (Phím ])"
            >
              <span className="hidden sm:inline">Bài sau</span>
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <button
              disabled
              className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 font-medium text-muted-foreground/40 cursor-not-allowed"
            >
              <span className="hidden sm:inline">Bài sau</span>
              <ChevronRight className="size-4" />
            </button>
          )}

          <span className="hidden md:inline text-[11px] text-muted-foreground pl-2">
            Phím tắt: <kbd className="rounded bg-muted px-1 py-0.5 text-[10px] font-mono">[</kbd>{" "}
            <kbd className="rounded bg-muted px-1 py-0.5 text-[10px] font-mono">]</kbd>
          </span>
        </div>

        {/* Center: Submission and Lesson index info */}
        <div className="flex items-center gap-2">
          {latestAttempt ? (
            <button
              type="button"
              onClick={() => setActiveResult(latestAttempt)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0F766E]/20 bg-[#F0FDF4] dark:bg-[#064E3B]/40 px-2.5 py-1 text-[11px] font-bold text-[#0F766E] dark:text-[#2DD4BF] hover:bg-[#0F766E] hover:text-white transition-all"
            >
              <Trophy className="size-3" />
              <span>Điểm gần nhất: {latestAttempt.score.toFixed(1)}/10</span>
            </button>
          ) : (
            <span className="hidden lg:inline text-[11px] text-muted-foreground">
              Bài #{lesson.index} / 777 · {lesson.grade}
            </span>
          )}
        </div>

        {/* Right: Actions (History, Reload, Fullscreen, Open external) */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowHistoryModal(true)}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[#1558C9] dark:text-[#60A5FA] hover:bg-muted transition-colors"
            title="Xem lịch sử bài làm"
          >
            <History className="size-3.5" />
            <span className="hidden sm:inline text-xs font-semibold">Lịch sử bài làm</span>
            {submissions.length > 0 && (
              <span className="rounded-full bg-[#1558C9] px-1.5 py-0.2 text-[10px] font-bold text-white">
                {submissions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Tải lại (Phím R)"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline text-xs">Tải lại</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
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
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Mở trong tab mới"
          >
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </footer>

      {/* Submission Success & Result Modal */}
      {activeResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-[#F0FDF4] dark:bg-[#064E3B] text-[#0F766E] dark:text-[#2DD4BF]">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    NỘP BÀI THÀNH CÔNG & ĐÃ CHẤM ĐIỂM
                  </h3>
                  <p className="text-xs text-[#1558C9] dark:text-[#60A5FA] font-mono">
                    Hệ thống TamGiangPhysics đã ghi nhận bài làm
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveResult(null)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Score Big Display */}
            <div className="rounded-xl border border-[#0F766E]/30 bg-[#F0FDF4] dark:bg-[#064E3B]/30 p-5 text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
                KẾT QUẢ ĐẠT ĐƯỢC
              </span>
              <div className="text-4xl font-extrabold text-foreground">
                {activeResult.score.toFixed(1)} <span className="text-xl text-[#1558C9] dark:text-[#60A5FA]">/ 10</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Thang điểm 10 chuẩn THPT · Chế độ:{" "}
                <strong className="text-foreground">
                  {activeResult.mode === "thi" ? "Thi thật có bấm giờ" : "Ôn luyện"}
                </strong>
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="rounded-lg border border-border bg-secondary p-3">
                <span className="text-muted-foreground block text-[11px]">Số câu đúng</span>
                <span className="text-base font-bold text-[#0F766E] dark:text-[#2DD4BF]">
                  {activeResult.correctCount}
                </span>
              </div>
              <div className="rounded-lg border border-border bg-secondary p-3">
                <span className="text-muted-foreground block text-[11px]">Tổng số câu</span>
                <span className="text-base font-bold text-foreground">
                  {activeResult.totalQuestions}
                </span>
              </div>
              <div className="rounded-lg border border-border bg-secondary p-3">
                <span className="text-muted-foreground block text-[11px]">Thời gian làm</span>
                <span className="text-base font-bold text-[#1558C9] dark:text-[#60A5FA] font-mono">
                  {activeResult.timeSpent || "00:00"}
                </span>
              </div>
            </div>

            {/* Detailed sections breakdown if present */}
            {(activeResult.p1 || activeResult.p2 || activeResult.p3) && (
              <div className="rounded-lg border border-border bg-secondary p-3 text-xs space-y-1.5">
                <span className="text-[11px] font-semibold text-[#1558C9] dark:text-[#60A5FA] block uppercase">
                  Chi tiết từng phần:
                </span>
                {activeResult.p1 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Phần I: Trắc nghiệm</span>
                    <span className="font-mono text-foreground font-semibold">
                      {activeResult.p1.correct} / {activeResult.p1.total} câu
                    </span>
                  </div>
                )}
                {activeResult.p2 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Phần II: Đúng / Sai</span>
                    <span className="font-mono text-foreground font-semibold">
                      {activeResult.p2.correct} / {activeResult.p2.total} ý
                    </span>
                  </div>
                )}
                {activeResult.p3 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Phần III: Trả lời ngắn</span>
                    <span className="font-mono text-foreground font-semibold">
                      {activeResult.p3.correct} / {activeResult.p3.total} câu
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-border pt-4 text-xs">
              <span className="text-muted-foreground text-[11px]">
                Mã bài nộp: <span className="font-mono">{activeResult.id}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveResult(null)}
                  className="rounded-lg bg-[#1558C9] hover:bg-[#1146a1] px-4 py-2 font-medium text-white shadow-xs"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 text-foreground shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <History className="size-5 text-[#1558C9] dark:text-[#60A5FA]" />
                <h3 className="text-base font-bold text-foreground">
                  Lịch sử làm bài: {lesson.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            {submissions.length === 0 ? (
              <div className="rounded-xl border border-border bg-secondary p-8 text-center space-y-2">
                <FileCheck className="mx-auto size-8 text-[#1558C9]/40" />
                <p className="text-sm font-semibold text-foreground">Chưa có bài nộp nào cho bài học này</p>
                <p className="text-xs text-muted-foreground">
                  Hãy hoàn thành các câu hỏi trong mô phỏng bài tập và nhấn &ldquo;Nộp bài&rdquo; để lưu kết quả.
                </p>
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                {submissions.map((sub, idx) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-secondary p-3.5 transition-colors hover:border-[#1558C9]/40"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#0F766E] dark:text-[#2DD4BF]">
                          Lần #{submissions.length - idx}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
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
                      <p className="text-xs text-muted-foreground">
                        Đúng {sub.correctCount} / {sub.totalQuestions} câu · Thời gian làm: {sub.timeSpent}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="rounded-lg border border-[#0F766E]/20 bg-[#F0FDF4] dark:bg-[#064E3B]/40 px-2.5 py-1 text-sm font-extrabold text-[#0F766E] dark:text-[#2DD4BF]">
                        {sub.score.toFixed(1)}/10
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setShowHistoryModal(false);
                          setActiveResult(sub);
                        }}
                        className="text-xs font-semibold text-[#1558C9] dark:text-[#60A5FA] hover:underline"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
              <span className="text-muted-foreground text-[11px]">
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
                className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:underline"
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
