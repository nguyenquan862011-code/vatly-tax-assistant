import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getLessonByPath } from "@/data/curriculum";
import { LessonHeader } from "@/components/lesson-header";
import { CurriculumSidebar } from "@/components/curriculum-sidebar";
import { SimulationViewer } from "@/components/simulation-viewer";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/mo-phong_/$")({
  head: ({ params }) => {
    const lesson = getLessonByPath(params._splat || "");
    const title = lesson
      ? `${lesson.name} — Mô phỏng Vật Lý | TamGiangPhysics`
      : "Mô phỏng Vật Lý | TamGiangPhysics";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: lesson
            ? `${lesson.name} - ${lesson.topic} (${lesson.grade}). Nền tảng học tập & mô phỏng Vật lý tương tác TamGiangPhysics.`
            : "Nền tảng học tập & mô phỏng Vật lý tương tác TamGiangPhysics",
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: lesson
            ? `${lesson.name} - ${lesson.topic} (${lesson.grade}). Nền tảng học tập & mô phỏng Vật lý tương tác TamGiangPhysics.`
            : "Nền tảng học tập & mô phỏng Vật lý tương tác TamGiangPhysics",
        },
      ],
    };
  },
  component: DynamicLessonRoute,
});

function DynamicLessonRoute() {
  const { _splat } = Route.useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const lesson = getLessonByPath(_splat || "");

  if (!lesson) {
    return (
      <div className="flex h-dvh flex-col bg-background text-foreground">
        <LessonHeader
          onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
          isSidebarOpen={isSidebarOpen}
        />
        <div className="relative flex flex-1 min-h-0">
          <CurriculumSidebar
            currentPath={_splat || ""}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((v) => !v)}
          />
          <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md space-y-4">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <AlertCircle className="size-6" />
              </div>
              <h1 className="text-xl font-bold">Không tìm thấy bài học</h1>
              <p className="text-xs text-muted-foreground">
                Đường dẫn{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                  /mo-phong/{_splat}
                </code>{" "}
                không khớp với bài học nào trong giáo trình 777 bài.
              </p>
              <div className="pt-2">
                <Link
                  to="/mo-phong"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <ArrowLeft className="size-4" />
                  Quay lại Thư viện mô phỏng
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <LessonHeader
        lesson={lesson}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="relative flex min-h-0 flex-1">
        <CurriculumSidebar
          currentPath={lesson.fullPath}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((v) => !v)}
        />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col" id="simulation-content">
          <SimulationViewer
            lesson={lesson}
            onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
          />
        </main>
      </div>
    </div>
  );
}
