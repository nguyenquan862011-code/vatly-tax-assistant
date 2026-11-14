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
  HelpCircle,
} from "lucide-react";
import type { LessonMeta } from "@/data/curriculum";

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

  // Keyboard shortcuts: [, ], F, R, B
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
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
            <Loader2 className="size-7 animate-spin text-amber-400" />
            <span className="text-xs font-medium tracking-wide">Đang tải mô phỏng tương tác...</span>
          </div>
        )}

        <iframe
          key={`${lesson.fullPath}-${reloadKey}`}
          src={lesson.simulationUrl}
          title={lesson.name}
          onLoad={() => setIsLoading(false)}
          className="size-full border-0"
          sandbox="allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin"
          allow="fullscreen; autoplay"
        />
      </div>

      {/* Bottom control toolbar */}
      <footer className="flex h-11 shrink-0 items-center justify-between border-t border-white/10 bg-[#1a2320] px-3 text-xs text-white/80 shadow-md">
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

        {/* Center: Lesson index info */}
        <div className="hidden lg:flex items-center gap-2 text-white/60">
          <span className="truncate max-w-sm">{lesson.lesson}</span>
          <span>•</span>
          <span className="font-mono text-[11px] text-amber-400">
            Bài #{lesson.index} / 777
          </span>
        </div>

        {/* Right: Actions (Reload, Fullscreen, Open external) */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="flex h-8 items-center gap-1.5 rounded-md px-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            title="Tải lại mô phỏng (Phím R)"
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
            title="Mở mô phỏng trong tab mới"
          >
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
