import React from "react";
import { Link } from "@tanstack/react-router";
import { PanelLeft, ChevronRight, Home, Grid, BookOpen } from "lucide-react";
import type { LessonMeta } from "@/data/curriculum";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

interface LessonHeaderProps {
  lesson?: LessonMeta;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function LessonHeader({ lesson, onToggleSidebar, isSidebarOpen }: LessonHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-3 md:px-4 text-foreground transition-colors duration-200">
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        {/* Toggle sidebar button */}
        <button
          onClick={onToggleSidebar}
          className={`flex size-8.5 items-center justify-center rounded-lg border border-border transition-colors ${
            isSidebarOpen
              ? "bg-[#EAF2FF] text-[#1558C9] dark:bg-[#1E2D42] dark:text-[#60A5FA] border-[#2563EB]/30"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
          title="Ẩn / hiện giáo trình (Phím B)"
          aria-label="Ẩn / hiện giáo trình"
        >
          <PanelLeft className="size-4" />
        </button>

        {/* Unified TamGiangPhysics Brand Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-md"
          title="TamGiangPhysics — về trang chủ"
        >
          <Logo size="sm" />
        </Link>

        <span className="hidden h-4 w-px bg-border md:block" aria-hidden="true" />

        {/* Breadcrumbs */}
        {lesson && (
          <nav className="min-w-0 flex-1" aria-label="Vị trí bài học">
            <ol className="flex min-w-0 items-center gap-1 text-xs">
              <li className="hidden items-center gap-1 xl:flex shrink-0 text-muted-foreground">
                <span>{lesson.grade}</span>
                <ChevronRight className="size-3 text-muted-foreground/60" />
              </li>
              <li className="hidden items-center gap-1 lg:flex shrink-0 text-muted-foreground">
                <span className="max-w-28 truncate">{lesson.part}</span>
                <ChevronRight className="size-3 text-muted-foreground/60" />
              </li>
              <li className="hidden items-center gap-1 md:flex shrink-0 text-muted-foreground">
                <span className="max-w-36 truncate">{lesson.lesson}</span>
                <ChevronRight className="size-3 text-muted-foreground/60" />
              </li>
              <li className="flex min-w-0 items-center gap-1.5 font-medium">
                <span className="truncate text-xs sm:text-sm font-bold text-[#1558C9] dark:text-[#60A5FA]" title={lesson.name}>
                  {lesson.name}
                </span>
              </li>
            </ol>
          </nav>
        )}
      </div>

      {/* Right controls */}
      <div className="flex shrink-0 items-center gap-1.5">
        <ThemeToggle />

        <Link
          to="/tai-lieu"
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Kho tài liệu Vật lý"
        >
          <BookOpen className="size-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
          <span className="hidden sm:inline">Tài liệu</span>
        </Link>

        <Link
          to="/mo-phong"
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Thư viện mô phỏng"
        >
          <Grid className="size-3.5 text-[#1558C9] dark:text-[#60A5FA]" />
          <span className="hidden sm:inline">Thư viện Lab</span>
        </Link>

        <Link
          to="/"
          className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title="Về trang chủ"
        >
          <Home className="size-4" />
        </Link>
      </div>
    </header>
  );
}
