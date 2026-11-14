import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Sparkles,
  FileText,
  HelpCircle,
  FlaskConical,
} from "lucide-react";
import { curriculum, type LessonMeta, type CurriculumNode } from "@/data/curriculum";

interface CurriculumSidebarProps {
  currentPath: string;
  isOpen: boolean;
  onToggle: () => void;
}

function getKindBadge(kind: LessonMeta["kind"]) {
  switch (kind) {
    case "theory":
      return {
        label: "Lý thuyết",
        className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        dot: "bg-blue-500",
      };
    case "example":
      return {
        label: "Ví dụ",
        className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        dot: "bg-amber-500",
      };
    case "exercise":
      return {
        label: "Bài tập",
        className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-500",
      };
    case "practice":
      return {
        label: "Thực hành",
        className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        dot: "bg-purple-500",
      };
    default:
      return {
        label: "Bài học",
        className: "bg-muted text-muted-foreground border-border",
        dot: "bg-muted-foreground",
      };
  }
}

export function CurriculumSidebar({ currentPath, isOpen, onToggle }: CurriculumSidebarProps) {
  const currentLesson = curriculum.lessons[currentPath];
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGradeSlug, setActiveGradeSlug] = useState<string>(
    currentLesson?.gradeSlug || "lop-10"
  );
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  // Auto-switch grade and open accordion containing current lesson
  useEffect(() => {
    if (currentLesson) {
      setActiveGradeSlug(currentLesson.gradeSlug);
      // Auto expand part, topic, lesson
      const keysToOpen: Record<string, boolean> = {};
      if (currentLesson.partSlug) keysToOpen[currentLesson.partSlug] = true;
      if (currentLesson.topicSlug) keysToOpen[currentLesson.topicSlug] = true;
      if (currentLesson.lessonSlug) keysToOpen[currentLesson.lessonSlug] = true;
      setOpenSections((prev) => ({ ...prev, ...keysToOpen }));
    }
  }, [currentPath, currentLesson]);

  // Scroll active item into view
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [currentPath, isOpen]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return Object.values(curriculum.lessons).filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.lesson.toLowerCase().includes(q) ||
        l.topic.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activeGradeNode = useMemo(() => {
    return curriculum.tree.find((g) => g.slug === activeGradeSlug);
  }, [activeGradeSlug]);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-xs md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[21rem] max-w-[88vw] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[transform,width] duration-300 ease-out md:static md:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full md:hidden"
        }`}
        aria-label="Giáo trình mô phỏng Vật Lý"
      >
        {/* Top search & title */}
        <div className="flex shrink-0 items-center justify-between border-b border-sidebar-border px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-primary" />
            <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Giáo trình ({curriculum.total} bài)
            </h2>
          </div>
          <button
            onClick={onToggle}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:hidden"
            aria-label="Đóng giáo trình"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Search input */}
        <div className="px-3 pt-3 pb-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm bài học, mô phỏng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8.5 w-full rounded-lg border border-sidebar-border bg-sidebar-accent/50 pr-7 pl-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Grade tabs (when not searching) */}
        {!searchQuery && (
          <div className="grid grid-cols-3 gap-1 px-3 pb-2 text-xs">
            {curriculum.tree.map((grade) => {
              const isActive = grade.slug === activeGradeSlug;
              return (
                <button
                  key={grade.slug}
                  onClick={() => setActiveGradeSlug(grade.slug)}
                  className={`rounded-md py-1.5 font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-sidebar-accent/40 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  {grade.name}
                </button>
              );
            })}
          </div>
        )}

        {/* List content */}
        <div className="flex-1 overflow-y-auto px-3 pb-6">
          {searchQuery ? (
            /* Search results view */
            <div className="space-y-1 pt-1">
              <div className="px-2 py-1 text-[11px] font-medium text-muted-foreground">
                Tìm thấy {searchResults.length} bài
              </div>
              {searchResults.length === 0 ? (
                <p className="px-2 py-4 text-center text-xs text-muted-foreground">
                  Không tìm thấy bài học nào phù hợp.
                </p>
              ) : (
                searchResults.map((lesson) => {
                  const isCurrent = lesson.fullPath === currentPath;
                  const badge = getKindBadge(lesson.kind);
                  return (
                    <Link
                      key={lesson.fullPath}
                      to="/mo-phong/$"
                      params={{ _splat: lesson.fullPath }}
                      onClick={() => {
                        if (window.innerWidth < 768) onToggle();
                      }}
                      className={`group flex flex-col gap-0.5 rounded-lg px-2.5 py-2 text-xs transition-colors ${
                        isCurrent
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="truncate font-medium">{lesson.name}</span>
                        <span
                          className={`shrink-0 rounded px-1.5 py-0.2 font-mono text-[9px] border ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <span className="truncate text-[10px] text-muted-foreground">
                        {lesson.grade} • {lesson.topic}
                      </span>
                    </Link>
                  );
                })
              )}
            </div>
          ) : (
            /* Curriculum Tree View */
            <div className="space-y-3 pt-1">
              {activeGradeNode?.children?.map((part) => (
                <div key={part.slug} className="space-y-1.5">
                  <div className="px-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                    {part.name}
                  </div>

                  <div className="space-y-1">
                    {part.children?.map((chude) => {
                      const isTopicOpen =
                        openSections[chude.slug] ??
                        (currentLesson?.topicSlug === chude.slug || true);

                      return (
                        <div key={chude.slug} className="rounded-lg border border-sidebar-border/60 bg-sidebar-accent/20">
                          {/* Chủ đề toggle */}
                          <button
                            onClick={() => toggleSection(chude.slug)}
                            className="flex w-full items-center justify-between px-2.5 py-2 text-left text-xs font-semibold text-sidebar-foreground hover:bg-sidebar-accent/40 rounded-lg"
                          >
                            <span className="truncate pr-2">{chude.name}</span>
                            {isTopicOpen ? (
                              <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                            )}
                          </button>

                          {/* Chủ đề content */}
                          {isTopicOpen && (
                            <div className="space-y-1.5 px-2 pb-2">
                              {chude.children?.map((bai) => {
                                const isLessonOpen =
                                  openSections[bai.slug] ??
                                  (currentLesson?.lessonSlug === bai.slug || false);

                                return (
                                  <div key={bai.slug} className="rounded-md bg-background/50 border border-sidebar-border/40">
                                    <button
                                      onClick={() => toggleSection(bai.slug)}
                                      className="flex w-full items-center justify-between px-2 py-1.5 text-left text-[11px] font-medium text-foreground/90 hover:bg-sidebar-accent/30 rounded-md"
                                    >
                                      <span className="truncate pr-1">{bai.name}</span>
                                      {isLessonOpen ? (
                                        <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
                                      ) : (
                                        <ChevronRight className="size-3 shrink-0 text-muted-foreground" />
                                      )}
                                    </button>

                                    {isLessonOpen && (
                                      <div className="space-y-0.5 px-1 pb-1">
                                        {bai.children?.map((item) => {
                                          const slugPath =
                                            item.slugPath || [
                                              activeGradeNode.slug,
                                              part.slug,
                                              chude.slug,
                                              bai.slug,
                                              item.slug,
                                            ];
                                          const itemFullPath = slugPath.join("/");
                                          const isCurrent = itemFullPath === currentPath;
                                          const itemMeta = curriculum.lessons[itemFullPath];
                                          const badge = getKindBadge(itemMeta?.kind || "other");

                                          return (
                                            <Link
                                              key={itemFullPath}
                                              to="/mo-phong/$"
                                              params={{ _splat: itemFullPath }}
                                              ref={isCurrent ? activeItemRef : null}
                                              onClick={() => {
                                                if (window.innerWidth < 768) onToggle();
                                              }}
                                              className={`flex items-center justify-between gap-1.5 rounded-md px-2 py-1 text-[11px] transition-colors ${
                                                isCurrent
                                                  ? "bg-primary text-primary-foreground font-medium shadow-2xs"
                                                  : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                              }`}
                                            >
                                              <span className="truncate">{item.name}</span>
                                              <span
                                                className={`size-1.5 shrink-0 rounded-full ${
                                                  isCurrent ? "bg-primary-foreground" : badge.dot
                                                }`}
                                                title={badge.label}
                                              />
                                            </Link>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
