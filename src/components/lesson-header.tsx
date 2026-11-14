import React from "react";
import { Link } from "@tanstack/react-router";
import { PanelLeft, ChevronRight, Home, Grid } from "lucide-react";
import type { LessonMeta } from "@/data/curriculum";

interface LessonHeaderProps {
  lesson?: LessonMeta;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function LessonHeader({ lesson, onToggleSidebar, isSidebarOpen }: LessonHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-3 md:px-4">
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        {/* Toggle sidebar button */}
        <button
          onClick={onToggleSidebar}
          className={`flex size-8.5 items-center justify-center rounded-md border border-border transition-colors ${
            isSidebarOpen
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
          title="Ẩn / hiện giáo trình (Phím B)"
          aria-label="Ẩn / hiện giáo trình"
        >
          <PanelLeft className="size-4" />
        </button>

        {/* Brand */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          title="Vật Lý AI — về trang chủ"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#fbfaf6] p-1 shadow-xs ring-1 ring-border">
            <img
              src="/site-assets/ff989603c215dec7-57cb04569c9a4790b0d0a4da1edbd171.png"
              alt="VatLy.ai logo"
              className="size-full object-contain"
            />
          </span>
          <span className="hidden text-sm font-bold tracking-tight text-foreground sm:inline-block">
            VatLy.ai
          </span>
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
              <li className="flex min-w-0 items-center gap-1.5 font-medium text-foreground">
                <span className="truncate text-xs sm:text-sm font-semibold" title={lesson.name}>
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
          to="/mo-phong"
          className="flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title="Tất cả mô phỏng"
        >
          <Grid className="size-3.5" />
          <span className="hidden sm:inline">Thư viện</span>
        </Link>
        <Link
          to="/"
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          title="Về trang chủ"
        >
          <Home className="size-4" />
        </Link>
      </div>
    </header>
  );
}
