import React from "react";
import { Link } from "@tanstack/react-router";
import { PanelLeft, ChevronRight, Home, Grid } from "lucide-react";
import type { LessonMeta } from "@/data/curriculum";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { AudioController } from "@/components/audio-controller";

interface LessonHeaderProps {
  lesson?: LessonMeta;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function LessonHeader({ lesson, onToggleSidebar, isSidebarOpen }: LessonHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#153325] dark:border-[#12261C] bg-[#091A13] dark:bg-[#06120D] px-3 md:px-4 text-[#EDF5ED]">
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        {/* Toggle sidebar button */}
        <button
          onClick={onToggleSidebar}
          className={`flex size-8.5 items-center justify-center rounded-md border border-white/10 transition-colors ${
            isSidebarOpen
              ? "bg-white/10 text-[#C8ED78] border-[#38A875]/40"
              : "text-[#EDF5ED]/70 hover:bg-white/5 hover:text-white"
          }`}
          title="Ẩn / hiện giáo trình (Phím B)"
          aria-label="Ẩn / hiện giáo trình"
        >
          <PanelLeft className="size-4" />
        </button>

        {/* Unified TamGiangPhysics Brand Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#38A875] rounded-md"
          title="TamGiangPhysics — về trang chủ"
        >
          <Logo size="sm" />
        </Link>

        <span className="hidden h-4 w-px bg-white/10 md:block" aria-hidden="true" />

        {/* Breadcrumbs */}
        {lesson && (
          <nav className="min-w-0 flex-1" aria-label="Vị trí bài học">
            <ol className="flex min-w-0 items-center gap-1 text-xs">
              <li className="hidden items-center gap-1 xl:flex shrink-0 text-[#EDF5ED]/60">
                <span>{lesson.grade}</span>
                <ChevronRight className="size-3 text-[#EDF5ED]/40" />
              </li>
              <li className="hidden items-center gap-1 lg:flex shrink-0 text-[#EDF5ED]/60">
                <span className="max-w-28 truncate">{lesson.part}</span>
                <ChevronRight className="size-3 text-[#EDF5ED]/40" />
              </li>
              <li className="hidden items-center gap-1 md:flex shrink-0 text-[#EDF5ED]/60">
                <span className="max-w-36 truncate">{lesson.lesson}</span>
                <ChevronRight className="size-3 text-[#EDF5ED]/40" />
              </li>
              <li className="flex min-w-0 items-center gap-1.5 font-medium text-[#EDF5ED]">
                <span
                  className="truncate text-xs sm:text-sm font-semibold text-[#72CF91]"
                  title={lesson.name}
                >
                  {lesson.name}
                </span>
              </li>
            </ol>
          </nav>
        )}
      </div>

      {/* Right controls */}
      <div className="flex shrink-0 items-center gap-2">
        <AudioController />
        <ThemeToggle />
        <Link
          to="/tai-lieu"
          className="hidden sm:flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-[#EDF5ED]/70 hover:bg-white/5 hover:text-[#C8ED78] transition-colors"
          title="Kho tài liệu Vật lý"
        >
          <span>Tài liệu</span>
        </Link>
        <Link
          to="/mo-phong"
          className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-[#EDF5ED]/70 hover:bg-white/5 hover:text-[#72CF91] transition-colors"
          title="Tất cả mô phỏng"
        >
          <Grid className="size-3.5" />
          <span className="hidden sm:inline">Phòng Lab</span>
        </Link>
        <Link
          to="/"
          className="flex size-8 items-center justify-center rounded-md text-[#EDF5ED]/70 hover:bg-white/5 hover:text-white transition-colors"
          title="Về trang chủ"
        >
          <Home className="size-4" />
        </Link>
      </div>
    </header>
  );
}
