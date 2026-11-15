import { useMatches as useImportedMatches, useRouterState } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { audioManager } from "../lib/audio-manager";
import { AutoplayPromptBanner } from "../components/audio-controller";
import { APP_CONFIG } from "../lib/config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Trang không tồn tại</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Đường dẫn bạn yêu cầu không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Không thể tải trang
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Đã xảy ra lỗi trong quá trình xử lý. Bạn có thể tải lại trang hoặc quay về trang chủ.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Thử lại
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TamGiangPhysics — Nền tảng học tập & mô phỏng Vật lý hiện đại" },
      {
        name: "description",
        content:
          "TamGiangPhysics: Nền tảng học tập và khám phá Vật lý trực quan, hiện đại mang phong cách phòng thí nghiệm kỹ thuật số.",
      },
      { name: "author", content: "Trần Đình Nguyên Quân" },
      {
        property: "og:title",
        content: "TamGiangPhysics — Nền tảng học tập & mô phỏng Vật lý hiện đại",
      },
      {
        property: "og:description",
        content:
          "TamGiangPhysics: Nền tảng học tập và khám phá Vật lý trực quan, hiện đại mang phong cách phòng thí nghiệm kỹ thuật số.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", type: "image/png", href: "/logo-tamgiang.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    importedDocument?: {
      html?: import("react").HTMLAttributes<HTMLHtmlElement> & Record<`data-${string}`, string>;
      body?: import("react").HTMLAttributes<HTMLBodyElement> & Record<`data-${string}`, string>;
    };
  }
}

function RootShell({ children }: { children: ReactNode }) {
  const importedDocument = useImportedMatches({
    select: (matches) => matches.at(-1)?.staticData.importedDocument,
  });

  return (
    <html lang="vi" {...importedDocument?.html}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('tamgiang_theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <style href="site-import-inline" precedence="imported-inline">
          {"@layer imported-inline;"}
        </style>
        <HeadContent />
      </head>
      <body
        {...importedDocument?.body}
        className="min-h-screen bg-background text-foreground antialiased selection:bg-[#16845A]/20 selection:text-[#075C40] dark:selection:bg-[#38A875]/30 dark:selection:text-[#72CF91]"
      >
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Intelligent Background Audio Synchronization with route changes
  useEffect(() => {
    audioManager.onRouteChanged(pathname);
  }, [pathname]);

  // Attempt gentle autoplay when visiting homepage initially (if not disabled by user)
  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      try {
        const isExplicitlyDisabled =
          localStorage.getItem(APP_CONFIG.backgroundAudio.storageKeyEnabled) === "false";
        if (!isExplicitlyDisabled) {
          audioManager.play().catch((err) => {
            console.debug("[TamGiang Audio] Initial autoplay blocked by browser policy:", err);
          });
        }
      } catch (err) {
        console.warn("[TamGiang Audio] Storage read notice:", err);
      }
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <AutoplayPromptBanner />
    </QueryClientProvider>
  );
}
