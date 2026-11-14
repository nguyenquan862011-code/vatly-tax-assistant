import React from "react";
import { Link } from "@tanstack/react-router";
import { PanelLeft, ChevronRight, Home, Grid } from "lucide-react";
import type { LessonMeta } from "@/data/curriculum";
import { Logo } from "@/components/logo";

interface LessonHeaderProps {
  lesson?: LessonMeta;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function LessonHeader({ lesson, onToggleSidebar, isSidebarOpen }: LessonHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-[#050B18] px-3 md:px-4 text-[#F4F8FC]">
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        {/* Toggle sidebar button */}
        <button
          onClick={onToggleSidebar}
          className={`flex size-8.5 items-center justify-center rounded-md border border-[#091426] transition-colors ${
            isSidebarOpen
              ? "bg-[#091426] text-[#36D9E8]"
              : "text-[#F4F8FC]/60 hover:bg-[#091426] hover:text-[#F4F8FC]"
          }`}
          title="Ẩn / hiện giáo trình (Phím B)"
          aria-label="Ẩn / hiện giáo trình"
        >
          <PanelLeft className="size-4" />
        </button>

        {/* Unified TamGiangPhysics Brand Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 focus-visible:ring-2 focus-visible:ring-[#36D9E8] rounded-md"
          title="TamGiangPhysics — về trang chủ"
        >
          <Logo size="sm" />
        </Link>

        <span className="hidden h-4 w-px bg-[#091426] md:block" aria-hidden="true" />

        {/* Breadcrumbs */}
        {lesson && (
          <nav className="min-w-0 flex-1" aria-label="Vị trí bài học">
            <ol className="flex min-w-0 items-center gap-1 text-xs">
              <li className="hidden items-center gap-1 xl:flex shrink-0 text-[#F4F8FC]/60">
                <span>{lesson.grade}</span>
                <ChevronRight className="size-3 text-[#F4F8FC]/40" />
              </li>
              <li className="hidden items-center gap-1 lg:flex shrink-0 text-[#F4F8FC]/60">
                <span className="max-w-28 truncate">{lesson.part}</span>
                <ChevronRight className="size-3 text-[#F4F8FC]/40" />
              </li>
              <li className="hidden items-center gap-1 md:flex shrink-0 text-[#F4F8FC]/60">
                <span className="max-w-36 truncate">{lesson.lesson}</span>
                <ChevronRight className="size-3 text-[#F4F8FC]/40" />
              </li>
              <li className="flex min-w-0 items-center gap-1.5 font-medium text-[#F4F8FC]">
                <span className="truncate text-xs sm:text-sm font-semibold text-[#48D597]" title={lesson.name}>
                  {lesson.name}
                </span>
              </li>
            </ol>
          </nav>
        )}
      </div>

      {/* Right controls */}
      <div className="flex shrink-0 items-center gap-1.5">
        <Link
          to="/tai-lieu"
          className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-[#F4F8FC]/70 hover:bg-[#091426] hover:text-[#36D9E8] transition-colors"
          title="Kho tài liệu Vật lý"
        >
          <span className="hidden sm:inline">Tài liệu</span>
        </Link>
        <Link
          to="/mo-phong"
          className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-[#F4F8FC]/70 hover:bg-[#091426] hover:text-[#48D597] transition-colors"
          title="Tất cả mô phỏng"
        >
          <Grid className="size-3.5" />
          <span className="hidden sm:inline">Thư viện Lab</span>
        </Link>
        <Link
          to="/"
          className="flex size-8 items-center justify-center rounded-md text-[#F4F8FC]/70 hover:bg-[#091426] hover:text-[#F4F8FC] transition-colors"
          title="Về trang chủ"
        >
          <Home className="size-4" />
        </Link>
      </div>
    </header>
  );
}
