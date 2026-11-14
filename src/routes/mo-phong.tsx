import { Logo } from "@/components/logo";
import { Footer } from "@/components/footer";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/pages/mo-phong.css?raw";

export const Route = createFileRoute("/mo-phong")({
  head: () => ({ meta: [{ title: "Mô phỏng Vật Lý | TamGiangPhysics" }] }),
  staticData: { importedDocument: { html: { "lang": "vi-VN", "style": { colorScheme: "light" } as import("react").CSSProperties }, body: { "className": "geist_a71539c9-module__T19VSG__variable geist_mono_8d43a2aa-module__8Li5zG__variable \x66lex \x6din-h-screen \x77-full \x66lex-col \x61ntialiased", "data-site-import-popup-incomplete": "limit" } } },
  component: Index,
});

function Index() {
  return (
    <>
      <style>{capturedCSS}</style>
      <div className={"flex h-dvh flex-col overflow-hidden \x62g-background text-foreground"} lang="vi">
        <div>
          <ImportedHeader />
        </div>
        <div className="relative flex min-h-0 flex-1">
          <ImportedAsideGiOTrNh />
          <main className="flex min-h-0 min-w-0 flex-1 flex-col" id="simulation-content">
            <div className={"min-h-0 flex-1 overflow-y-auto \x62g-lab-paper text-lab-ink"} data-site-import-scroll-root="">
              <ImportedSectionChNMT />
              <div className={"mx-auto max-w-6xl \x73pace-y-14 px-6 py-12 md:px-10"}>
                <ImportedSectionLP10 />
                <ImportedSectionLP11 />
                <ImportedSectionLP12 />
                <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                  <ImportedSectionLTrNh4 />
                  <section className={"rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface p-6"} aria-labelledby="shortcut-heading">
                    <h2 className="flex items-center gap-2 text-lg font-semibold" id="shortcut-heading"><svg className="size-5 text-lab-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 8h.01" /><path d="M12 12h.01" /><path d="M14 8h.01" /><path d="M16 12h.01" /><path d="M18 8h.01" /><path d="M6 8h.01" /><path d="M7 16h10" /><path d="M8 12h.01" /><rect width="20" height="16" x="2" y="4" rx="2" /></svg>Phím tắt</h2>
                    <ul className={"mt-4 \x73pace-y-2.\x35"}>
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-lab-subtle">Tìm bài</span>
                        <kbd className={"min-w-8 rounded-lg \x62order \x62order-lab-line \x62g-lab-paper px-2 py-0.5 text-center \x66ont-mono text-xs"}>/</kbd>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-lab-subtle">Ẩn / hiện giáo trình</span>
                        <kbd className={"min-w-8 rounded-lg \x62order \x62order-lab-line \x62g-lab-paper px-2 py-0.5 text-center \x66ont-mono text-xs"}>B</kbd>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-lab-subtle">Bài trước / bài sau</span>
                        <kbd className={"min-w-8 rounded-lg \x62order \x62order-lab-line \x62g-lab-paper px-2 py-0.5 text-center \x66ont-mono text-xs"}>[ / ]</kbd>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-lab-subtle">Toàn màn hình</span>
                        <kbd className={"min-w-8 rounded-lg \x62order \x62order-lab-line \x62g-lab-paper px-2 py-0.5 text-center \x66ont-mono text-xs"}>F</kbd>
                      </li>
                      <li className="flex items-center justify-between text-sm">
                        <span className="text-lab-subtle">Tải lại mô phỏng</span>
                        <kbd className={"min-w-8 rounded-lg \x62order \x62order-lab-line \x62g-lab-paper px-2 py-0.5 text-center \x66ont-mono text-xs"}>R</kbd>
                      </li>
                    </ul>
                  </section>
                </div>
                <ImportedAsideMuNCTh />
              </div>
              <Footer />
            </div>
          </main>
        </div>
      </div>
      <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false" />
    </>
  );
}

function ImportedHeader() {
  return (
    <header className={"flex min-h-16 shrink-0 flex-wrap items-center gap-1 \x62order-b \x62g-background px-2 pt-1 md:gap-3 md:px-4 \x6cg:\x66lex-nowrap lg:pt-0"}>
      <span className="inline-flex" data-state="closed">
        <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-9"} aria-label="Ẩn / hiện giáo trình">
          <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      </span>
      <a className="group mr-2 flex shrink-0 items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring" aria-label="TamGiangPhysics — về trang chủ" href="/">
        <Logo size="sm" />
      </a>
      <nav className="min-w-0 flex-1" aria-label="Vị trí bài học">
        <ol className="flex min-w-0 items-center gap-1 text-xs">
          <li className="text-muted-foreground">Thư viện mô phỏng</li>
        </ol>
      </nav>
      <div className={"flex w-full shrink-0 items-center justify-end gap-0.5 \x62order-t py-1 lg:w-auto \x6cg:\x62order-0 lg:py-0"}>
        <button className={"inline-flex items-center justify-center font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x62order \x62g-background \x73hadow-xs \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x62order-input \x64ark:\x62g-input/\x330 \x64ark:\x68over:\x62g-input/\x350 h-8 gap-1.5 \x68as-[>\x73vg]:\x70x-2.\x35 mr-auto shrink-0 rounded-full px-3 text-xs lg:mr-2"} aria-label="Còn 5/5 bài miễn phí · Đăng nhập">
          <span className={"hidden \x78l:\x69nline"}>Còn 5/5 bài miễn phí · Đăng nhập</span>
          <span className={"\x78l:\x68idden"} aria-hidden="true">Còn 5/5 · Đăng nhập</span>
        </button>
        <span className={"hidden \x73m:\x69nline-flex"}>
          <div className="flex items-center" aria-label="Điều hướng bài học">
            <span className="inline-flex" data-state="closed">
              <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-9"} aria-label="Bài trước" disabled>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            </span>
            <span className="inline-flex" data-state="closed">
              <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-9"} aria-label="Bài sau" disabled>
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </span>
          </div>
        </span>
        <span className={"mx-1 hidden h-5 w-px \x62g-border \x73m:\x62lock"} aria-hidden="true" />
        <span className="inline-flex" data-state="closed">
          <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-9"} aria-label="Tải lại mô phỏng" disabled>
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </span>
        <span className="inline-flex" data-state="closed">
          <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-9"} aria-label="Toàn màn hình" disabled>
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 3h6v6" />
              <path d="m21 3-7 7" />
              <path d="m3 21 7-7" />
              <path d="M9 21H3v-6" />
            </svg>
          </button>
        </span>
        <span className={"ml-1 hidden \x6dd:\x62lock"}>
          <div className={"flex flex-wrap items-center justify-center gap-2 \x6dd:\x66lex-row"}>
            <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x62order \x62g-background \x73hadow-xs \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x62order-input \x64ark:\x62g-input/\x330 \x64ark:\x68over:\x62g-input/\x350 size-9"}>
              <svg className={"hidden [\x68tml.\x64ark_&]:\x62lock"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <svg className={"hidden [\x68tml.\x6cight_&]:\x62lock"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
              </svg>
              <span className={"\x73r-only"}>Toggle theme</span>
            </button>
          </div>
        </span>
        <span className="ml-1 inline-flex shrink-0">
          <button className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x62order \x62g-background \x73hadow-xs \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x62order-input \x64ark:\x62g-input/\x330 \x64ark:\x68over:\x62g-input/\x350 size-11 rounded-full"} aria-label="Mở menu tài khoản" type="button" id="radix-_r_8_" aria-haspopup="menu" aria-expanded="false" data-state="closed">
            <svg className="size-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </button>
        </span>
      </div>
    </header>
  );
}

function ImportedAsideGiOTrNh() {
  return (
    <aside className={"fixed \x69nset-y-0 left-0 z-50 w-[21rem] max-w-[88vw] shrink-0 overflow-hidden \x62order-r \x62order-sidebar-border \x73hadow-2xl transition-[width,transform] duration-300 ease-out \x6dotion-reduce:\x74ransition-none \x6dd:\x73tatic md:z-auto \x6dd:\x73hadow-none invisible \x2dtranslate-x-full \x6dd:\x76isible \x6dd:\x74ranslate-x-0 md:w-[21rem]"} aria-labelledby="curriculum-title">
      <div className={"flex h-full w-[21rem] max-w-[88vw] flex-col \x62g-sidebar text-sidebar-foreground"}>
        <div className={"\x73pace-y-3 px-4 pt-4 pb-3"}>
          <div className="flex items-center gap-1">
            <h2 className="flex-1 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase" id="curriculum-title">Giáo trình</h2>
            <span className="inline-flex" data-state="closed">
              <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-9"} aria-label="Làm mới danh sách giáo trình">
                <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </button>
            </span>
            <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-8 \x6dd:\x68idden"} aria-label="Đóng giáo trình">
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="group/search relative">
            <label className={"\x73r-only"} htmlFor="simulation-search">Tìm bài trong giáo trình</label>
            <svg className={"pointer-events-none absolute top-1/2 left-3 size-4 \x2dtranslate-y-1/\x32 text-muted-foreground transition-colors \x67roup-focus-within/\x73earch:\x74ext-sidebar-primary"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            <input className={"w-full min-w-0 \x62order px-3 py-1 \x73hadow-xs \x6futline-none \x73election:\x62g-primary \x73election:\x74ext-primary-foreground \x66ile:\x69nline-flex \x66ile:\x68-7 \x66ile:\x62order-0 \x66ile:\x62g-transparent \x66ile:\x74ext-sm \x66ile:\x66ont-medium \x66ile:\x74ext-foreground \x70laceholder:\x74ext-muted-foreground \x64isabled:\x70ointer-events-none \x64isabled:\x63ursor-not-allowed disabled:opacity-50 md:text-sm \x64ark:\x62g-input/\x330 \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 h-10 rounded-xl \x62order-sidebar-border \x62g-sidebar-accent/\x340 pr-9 pl-9 text-sm transition-colors \x66ocus-visible:\x62g-sidebar"} id="simulation-search" autoComplete="off" placeholder="Tìm bài, dạng, “VD3”…" aria-controls="curriculum-list" type="search" defaultValue="" />
            <kbd className={"pointer-events-none absolute top-1/2 right-3 \x2dtranslate-y-1/\x32 rounded-md \x62order \x62order-sidebar-border \x62g-sidebar px-1.5 \x66ont-mono text-[11px] text-muted-foreground"}>/</kbd>
          </div>
          <div className={"relative grid rounded-xl \x62g-sidebar-accent/\x370 p-1 grid-cols-3"} role="group" aria-label="Chọn lớp">
            <span className={"absolute \x69nset-y-1 left-1 rounded-lg \x62g-sidebar \x73hadow-sm \x72ing-1 \x72ing-sidebar-border transition-transform duration-300 ease-out \x6dotion-reduce:\x74ransition-none w-[calc((100%-0.5rem)/3)] \x74ranslate-x-0"} aria-hidden="true" />
            <button className={"relative z-10 flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-colors \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-sidebar-ring \x66ocus-visible:\x6futline-none text-sidebar-foreground"} type="button" aria-pressed="true">
              <span className="truncate">Lớp 10</span>
              <span className={"\x66ont-mono text-[10px] text-sidebar-primary"}>245</span>
            </button>
            <button className={"relative z-10 flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-colors \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-sidebar-ring \x66ocus-visible:\x6futline-none text-muted-foreground hover:text-sidebar-foreground"} type="button" aria-pressed="false">
              <span className="truncate">Lớp 11</span>
              <span className={"\x66ont-mono text-[10px] \x74ext-muted-foreground/\x380"}>162</span>
            </button>
            <button className={"relative z-10 flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-2 text-xs font-medium transition-colors \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-sidebar-ring \x66ocus-visible:\x6futline-none text-muted-foreground hover:text-sidebar-foreground"} type="button" aria-pressed="false">
              <span className="truncate">Lớp 12</span>
              <span className={"\x66ont-mono text-[10px] \x74ext-muted-foreground/\x380"}>370</span>
            </button>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <header className={"\x62order-b \x62order-sidebar-border px-4 pt-1 pb-3"}>
            <p className={"\x66ont-mono text-[10px] tracking-[0.16em] text-sidebar-primary uppercase"}>Giáo trình</p>
            <h3 className="mt-0.5 text-base leading-snug font-semibold tracking-tight">CƠ HỌC – PHẦN 1</h3>
            <p className="mt-1 text-[11px] text-muted-foreground" role="status">245 mô phỏng · 3 chuyên đề</p>
          </header>
          <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-3" id="curriculum-list">
            <div className={"\x73pace-y-4 \x6dotion-safe:\x64uration-300"}>
              <ul className={"\x73pace-y-2"} aria-label="Chuyên đề">
                <li>
                  <button className={"group flex w-full items-center gap-3 rounded-2xl \x62order \x62order-transparent \x62g-sidebar-accent/\x345 px-3 py-3 text-left transition-[background-color,border-color,transform] \x6futline-none \x68over:\x62order-sidebar-primary/\x325 \x68over:\x62g-sidebar-accent \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-sidebar-ring \x61ctive:\x73cale-[\x30.\x399] disabled:cursor-default disabled:opacity-55 \x6dotion-reduce:\x74ransform-none"} type="button" aria-label="Chủ đề 1 - GIỚI THIỆU MỤC ĐÍCH HỌC TẬP MÔN VẬT LÝ, 19 mô phỏng">
                    <span className="min-w-0 flex-1">
                      <span className={"flex items-center gap-2 \x66ont-mono text-[10px] tracking-wider text-muted-foreground uppercase"}>Chủ đề 1</span>
                      <span className={"mt-0.5 \x6cine-clamp-2 text-sm font-medium"}>GIỚI THIỆU MỤC ĐÍCH HỌC TẬP MÔN VẬT LÝ</span>
                      <svg className="h-1.5 w-full overflow-hidden rounded-full mt-2.5" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="3 Lý thuyết, 10 Ví dụ, 3 Bài tập, 3 Luyện tập">
                        <rect className={"\x66ill-kind-theory"} x="0" y="0" width="15.505263157894737" height="4" rx="1" />
                        <rect className={"\x66ill-kind-example"} x="16.105263157894736" y="0" width="51.68421052631579" height="4" rx="1" />
                        <rect className={"\x66ill-kind-exercise"} x="68.38947368421051" y="0" width="15.505263157894737" height="4" rx="1" />
                        <rect className={"\x66ill-kind-practice"} x="84.49473684210524" y="0" width="15.505263157894737" height="4" rx="1" />
                      </svg>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <span className={"\x66ont-mono text-[11px] text-muted-foreground"}>19</span>
                      <svg className={"size-4 text-muted-foreground transition-transform \x67roup-hover:\x74ranslate-x-0.\x35 \x67roup-hover:\x74ext-sidebar-primary"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  </button>
                </li>
                <li>
                  <button className={"group flex w-full items-center gap-3 rounded-2xl \x62order \x62order-transparent \x62g-sidebar-accent/\x345 px-3 py-3 text-left transition-[background-color,border-color,transform] \x6futline-none \x68over:\x62order-sidebar-primary/\x325 \x68over:\x62g-sidebar-accent \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-sidebar-ring \x61ctive:\x73cale-[\x30.\x399] disabled:cursor-default disabled:opacity-55 \x6dotion-reduce:\x74ransform-none"} type="button" aria-label="Chủ đề 2 - MÔ TẢ CHUYỂN ĐỘNG, 137 mô phỏng">
                    <span className="min-w-0 flex-1">
                      <span className={"flex items-center gap-2 \x66ont-mono text-[10px] tracking-wider text-muted-foreground uppercase"}>Chủ đề 2</span>
                      <span className={"mt-0.5 \x6cine-clamp-2 text-sm font-medium"}>MÔ TẢ CHUYỂN ĐỘNG</span>
                      <svg className="h-1.5 w-full overflow-hidden rounded-full mt-2.5" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="6 Lý thuyết, 40 Ví dụ, 9 Bài tập, 82 Luyện tập">
                        <rect className={"\x66ill-kind-theory"} x="0" y="0" width="4.3007299270073" height="4" rx="1" />
                        <rect className={"\x66ill-kind-example"} x="4.9007299270072995" y="0" width="28.671532846715326" height="4" rx="1" />
                        <rect className={"\x66ill-kind-exercise"} x="34.17226277372263" y="0" width="6.45109489051095" height="4" rx="1" />
                        <rect className={"\x66ill-kind-practice"} x="41.22335766423358" y="0" width="58.77664233576643" height="4" rx="1" />
                      </svg>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <span className={"\x66ont-mono text-[11px] text-muted-foreground"}>137</span>
                      <svg className={"size-4 text-muted-foreground transition-transform \x67roup-hover:\x74ranslate-x-0.\x35 \x67roup-hover:\x74ext-sidebar-primary"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  </button>
                </li>
                <li>
                  <button className={"group flex w-full items-center gap-3 rounded-2xl \x62order \x62order-transparent \x62g-sidebar-accent/\x345 px-3 py-3 text-left transition-[background-color,border-color,transform] \x6futline-none \x68over:\x62order-sidebar-primary/\x325 \x68over:\x62g-sidebar-accent \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-sidebar-ring \x61ctive:\x73cale-[\x30.\x399] disabled:cursor-default disabled:opacity-55 \x6dotion-reduce:\x74ransform-none"} type="button" aria-label="Chủ đề 3 - LỰC VÀ CHUYỂN ĐỘNG, 89 mô phỏng">
                    <span className="min-w-0 flex-1">
                      <span className={"flex items-center gap-2 \x66ont-mono text-[10px] tracking-wider text-muted-foreground uppercase"}>Chủ đề 3</span>
                      <span className={"mt-0.5 \x6cine-clamp-2 text-sm font-medium"}>LỰC VÀ CHUYỂN ĐỘNG</span>
                      <svg className="h-1.5 w-full overflow-hidden rounded-full mt-2.5" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="4 Lý thuyết, 52 Ví dụ, 6 Bài tập, 27 Luyện tập">
                        <rect className={"\x66ill-kind-theory"} x="0" y="0" width="4.413483146067415" height="4" rx="1" />
                        <rect className={"\x66ill-kind-example"} x="5.013483146067415" y="0" width="57.375280898876404" height="4" rx="1" />
                        <rect className={"\x66ill-kind-exercise"} x="62.98876404494382" y="0" width="6.620224719101124" height="4" rx="1" />
                        <rect className={"\x66ill-kind-practice"} x="70.20898876404493" y="0" width="29.791011235955057" height="4" rx="1" />
                      </svg>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1">
                      <span className={"\x66ont-mono text-[11px] text-muted-foreground"}>89</span>
                      <svg className={"size-4 text-muted-foreground transition-transform \x67roup-hover:\x74ranslate-x-0.\x35 \x67roup-hover:\x74ext-sidebar-primary"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <footer className={"\x73pace-y-3 \x62order-t \x62order-sidebar-border p-3"}>
          <a className={"group relative flex items-center gap-3 overflow-hidden rounded-2xl \x62g-lab-deep p-3 text-lab-on-deep transition-transform \x6futline-none \x68over:\x2dtranslate-y-0.\x35 \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-lime \x6dotion-reduce:\x74ransform-none"} href="/tai-lieu">
            <span className={"absolute -top-8 -right-8 size-24 \x61nimate-lab-spin rounded-full \x62order \x62order-dashed \x62order-lab-lime/\x330"} aria-hidden="true" />
            <span className={"flex size-9 shrink-0 items-center justify-center rounded-xl \x62g-lab-lime text-lab-deep"}>
              <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                <path d="M22 10v6" />
                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] tracking-wider text-lab-lime uppercase">Phương pháp nghiên cứu</span>
              <span className="block truncate text-xs font-semibold">TamGiangPhysics — Khám phá bản chất</span>
            </span>
            <svg className={"size-4 shrink-0 text-lab-lime transition-transform \x67roup-hover:\x74ranslate-x-0.\x35 \x67roup-hover:\x2dtranslate-y-0.\x35"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
            <span className={"\x73r-only"}>(mở trang trung tâm trong tab mới)</span>
          </a>
          <div className="flex items-center justify-between px-1">
            <a className={"inline-flex min-h-9 items-center gap-2 rounded-md text-xs text-muted-foreground transition-colors hover:text-sidebar-foreground \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-sidebar-ring \x66ocus-visible:\x6futline-none"} href="#"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>Tổng quan thư viện</a>
            <span className={"hidden text-[11px] text-muted-foreground \x6dd:\x69nline"}><kbd className={"\x72ounded \x62order \x62order-sidebar-border px-1 \x66ont-mono"}>B</kbd> thu gọn</span>
            <span className={"\x6dd:\x68idden"}>
              <div className={"flex flex-wrap items-center justify-center gap-2 \x6dd:\x66lex-row"}>
                <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x62order \x62g-background \x73hadow-xs \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x62order-input \x64ark:\x62g-input/\x330 \x64ark:\x68over:\x62g-input/\x350 size-9"}>
                  <svg className={"hidden [\x68tml.\x64ark_&]:\x62lock"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                  <svg className={"hidden [\x68tml.\x6cight_&]:\x62lock"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                  </svg>
                  <span className={"\x73r-only"}>Toggle theme</span>
                </button>
              </div>
            </span>
          </div>
        </footer>
      </div>
    </aside>
  );
}

function ImportedSectionChNMT() {
  return (
    <section className={"relative overflow-hidden \x62order-b"} aria-labelledby="welcome-title">
      <div className="lab-grid absolute inset-0 [mask-image:radial-gradient(80%_70%_at_50%_40%,rgb(0,0,0)_40%,rgba(0,0,0,0)_100%)]" aria-hidden="true" />
      <div className={"absolute -top-32 -left-24 size-96 \x61nimate-lab-aurora rounded-full \x62g-lab-green/\x315 \x62lur-3xl"} aria-hidden="true" />
      <div className={"absolute -right-20 -bottom-40 size-96 \x61nimate-lab-aurora rounded-full \x62g-lab-lime/\x320 \x62lur-3xl [animation-delay:-9s]"} aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 md:px-10 md:py-16 lg:grid-cols-[1.25fr_1fr]">
        <div className={"\x6dotion-safe:\x61nimate-in \x6dotion-safe:\x64uration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-4"}>
          <p className={"inline-flex items-center gap-2 rounded-full \x62order \x62order-lab-line \x62g-lab-surface/\x380 px-3 py-1.5 text-xs font-medium text-lab-green \x62ackdrop-blur"}><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></svg>Phòng thí nghiệm Vật Lý Phân Tích</p>
          <h1 className={"mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.04em] md:text-5xl \x78l:\x74ext-[\x33.\x35rem]"} id="welcome-title">Chọn một hiện tượng.<br /><span className="lab-text-shine">Mổ xẻ đến tận bản chất.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-lab-subtle">Mỗi bài được tái hiện thành mô phỏng — từ lý thuyết, ví dụ đến luyện tập. Thay đổi thông số, quan sát và tự rút ra quy luật thay vì học thuộc công thức.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68as-[>\x73vg]:\x70x-4 h-12 rounded-full \x62g-lab-green px-6 text-lab-on-green \x73hadow-lg \x73hadow-lab-green/\x320 \x68over:\x62g-lab-green/\x390"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly">Bắt đầu từ bài đầu tiên <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
            <button className={"inline-flex h-12 items-center gap-3 rounded-full \x62order \x62order-lab-line \x62g-lab-surface/\x380 pr-2 pl-5 text-sm text-lab-subtle \x62ackdrop-blur transition-colors \x68over:\x62order-lab-green/\x340 hover:text-lab-ink \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button"><svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></svg>Tìm bài, dạng toán…<kbd className={"rounded-full \x62g-lab-tint px-2.5 py-1 \x66ont-mono text-xs text-lab-green"}>/</kbd></button>
          </div>
          <dl className={"mt-10 grid max-w-lg grid-cols-3 gap-4 \x62order-t \x62order-lab-line pt-6"}>
            <div>
              <dd className={"\x66ont-mono text-3xl font-semibold tracking-tight text-lab-ink"}>3</dd>
              <dt className="mt-1 text-xs text-lab-subtle">lớp học</dt>
            </div>
            <div>
              <dd className={"\x66ont-mono text-3xl font-semibold tracking-tight text-lab-ink"}>10</dd>
              <dt className="mt-1 text-xs text-lab-subtle">chuyên đề</dt>
            </div>
            <div>
              <dd className={"\x66ont-mono text-3xl font-semibold tracking-tight text-lab-ink"}>777</dd>
              <dt className="mt-1 text-xs text-lab-subtle">mô phỏng</dt>
            </div>
          </dl>
        </div>
        <div className={"relative aspect-square w-full mx-auto hidden max-w-sm \x6cg:\x62lock"} aria-hidden="true">
          <svg className="absolute inset-0 size-full text-lab-green" viewBox="0 0 400 400" fill="none">
            <circle className={"\x73troke-lab-line"} cx="200" cy="200" r="190" strokeDasharray="2 8" />
            <g className={"\x6frigin-center [transform-box:view-box] \x61nimate-lab-spin [animation-duration:14s]"}>
              <circle cx="200" cy="200" r="70" stroke="currentColor" strokeOpacity="0.22" />
              <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="35 420" />
              <circle className={"\x66ill-lab-lime \x73troke-lab-green"} cx="270" cy="200" r="7" strokeWidth="2" />
            </g>
            <g className={"\x6frigin-center [transform-box:view-box] \x61nimate-lab-spin-reverse [animation-duration:22s]"}>
              <circle cx="200" cy="200" r="112" stroke="currentColor" strokeOpacity="0.22" />
              <circle cx="200" cy="200" r="112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="56 672" />
              <circle className={"\x66ill-lab-lime \x73troke-lab-green"} cx="114.20302237067447" cy="271.9922122848924" r="7" strokeWidth="2" />
            </g>
            <g className={"\x6frigin-center [transform-box:view-box] \x61nimate-lab-spin [animation-duration:34s]"}>
              <circle cx="200" cy="200" r="154" stroke="currentColor" strokeOpacity="0.22" />
              <circle cx="200" cy="200" r="154" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="77 924" />
              <circle className={"\x66ill-lab-lime \x73troke-lab-green"} cx="173.25818063929273" cy="48.33960603611996" r="7" strokeWidth="2" />
            </g>
            <circle className={"\x6frigin-center \x61nimate-lab-pulse \x66ill-lab-green/\x325 [transform-box:fill-box]"} cx="200" cy="200" r="26" />
            <circle className={"\x66ill-lab-green"} cx="200" cy="200" r="22" />
            <path className={"\x73troke-lab-on-green"} d="M188 200h24M200 188v24" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className={"absolute \x61nimate-lab-float rounded-full \x62order \x62order-lab-line \x62g-lab-surface/\x385 px-3 py-1.5 \x66ont-mono text-xs text-lab-green \x73hadow-lg \x73hadow-lab-green/\x35 \x62ackdrop-blur top-[8%] left-[2%] [animation-delay:0s]"}>v = λf</span>
          <span className={"absolute \x61nimate-lab-float rounded-full \x62order \x62order-lab-line \x62g-lab-surface/\x385 px-3 py-1.5 \x66ont-mono text-xs text-lab-green \x73hadow-lg \x73hadow-lab-green/\x35 \x62ackdrop-blur top-[18%] right-[0%] [animation-delay:-2s]"}>pV = nRT</span>
          <span className={"absolute \x61nimate-lab-float rounded-full \x62order \x62order-lab-line \x62g-lab-surface/\x385 px-3 py-1.5 \x66ont-mono text-xs text-lab-green \x73hadow-lg \x73hadow-lab-green/\x35 \x62ackdrop-blur bottom-[14%] left-[6%] [animation-delay:-4s]"}>i = λD / a</span>
          <span className={"absolute \x61nimate-lab-float rounded-full \x62order \x62order-lab-line \x62g-lab-surface/\x385 px-3 py-1.5 \x66ont-mono text-xs text-lab-green \x73hadow-lg \x73hadow-lab-green/\x35 \x62ackdrop-blur bottom-[4%] right-[8%] [animation-delay:-5.5s]"}>d₂ − d₁ = kλ</span>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionLP10() {
  return (
    <section aria-labelledby="grade-0">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight" id="grade-0">Lớp 10</h2>
        <span className="text-xs text-lab-subtle">3 chuyên đề</span>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">01</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Chủ đề 1</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly">GIỚI THIỆU MỤC ĐÍCH HỌC TẬP MÔN VẬT LÝ</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="3 Lý thuyết, 10 Ví dụ, 3 Bài tập, 3 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="15.505263157894737" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="16.105263157894736" y="0" width="51.68421052631579" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="68.38947368421051" y="0" width="15.505263157894737" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="84.49473684210524" y="0" width="15.505263157894737" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />3 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />10 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />3 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />3 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của GIỚI THIỆU MỤC ĐÍCH HỌC TẬP MÔN VẬT LÝ trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">02</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Chủ đề 2</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong/bai-1-do-dich-chuyen-quang-duong-di-duoc/1-ly-thuyet-do-dich-chuyen-quang-duong-di-duoc">MÔ TẢ CHUYỂN ĐỘNG</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="6 Lý thuyết, 40 Ví dụ, 9 Bài tập, 82 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="4.3007299270073" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="4.9007299270072995" y="0" width="28.671532846715326" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="34.17226277372263" y="0" width="6.45109489051095" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="41.22335766423358" y="0" width="58.77664233576643" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />6 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />40 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />9 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />82 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của MÔ TẢ CHUYỂN ĐỘNG trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">03</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Chủ đề 3</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-3-luc-va-chuyen-dong/bai-1-tong-hop-va-phan-tich-luc/1-ly-thuyet-tong-hop-va-phan-tich-luc">LỰC VÀ CHUYỂN ĐỘNG</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="4 Lý thuyết, 52 Ví dụ, 6 Bài tập, 27 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="4.413483146067415" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="5.013483146067415" y="0" width="57.375280898876404" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="62.98876404494382" y="0" width="6.620224719101124" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="70.20898876404493" y="0" width="29.791011235955057" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />4 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />52 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />6 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />27 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của LỰC VÀ CHUYỂN ĐỘNG trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
      </ul>
    </section>
  );
}

function ImportedSectionLP11() {
  return (
    <section aria-labelledby="grade-1">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight" id="grade-1">Lớp 11</h2>
        <span className="text-xs text-lab-subtle">4 chuyên đề</span>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">01</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Chủ đề 1</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-11/song/chu-de-1-song-co/bai-1-mo-ta-song/1-ly-thuyet-mo-ta-song">SÓNG CƠ</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="3 Lý thuyết, 18 Ví dụ, 5 Bài tập, 21 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="6.268085106382978" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="6.868085106382978" y="0" width="37.60851063829787" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="45.07659574468085" y="0" width="10.446808510638299" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="56.12340425531915" y="0" width="43.87659574468085" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />3 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />18 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />5 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />21 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của SÓNG CƠ trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">02</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Chủ đề 2</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-11/song/chu-de-2-song-dien-tu/bai-1-song-dien-tu/1-ly-thuyet-song-dien-tu">SÓNG ĐIỆN TỪ</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="1 Lý thuyết, 1 Bài tập, 3 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="19.76" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="20.360000000000003" y="0" width="19.76" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="40.720000000000006" y="0" width="59.279999999999994" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />1 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />1 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />3 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của SÓNG ĐIỆN TỪ trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">03</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Chủ đề 3</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-11/song/chu-de-3-giao-thoa-song/bai-1-giao-thoa-song-co/1-ly-thuyet-giao-thoa-song-co">GIAO THOA SÓNG</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="4 Lý thuyết, 41 Ví dụ, 6 Bài tập, 20 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="5.532394366197184" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="6.132394366197183" y="0" width="56.70704225352113" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="63.439436619718315" y="0" width="8.298591549295775" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="72.33802816901408" y="0" width="27.661971830985916" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />4 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />41 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />6 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />20 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của GIAO THOA SÓNG trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">04</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Chủ đề 4</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-11/song/chu-de-4-song-dung/bai-1-song-dung/1-ly-thuyet-song-dung">SÓNG DỪNG</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="1 Lý thuyết, 29 Ví dụ, 2 Bài tập, 7 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="2.517948717948718" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="3.117948717948718" y="0" width="73.02051282051282" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="76.73846153846154" y="0" width="5.035897435897436" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="82.37435897435897" y="0" width="17.625641025641027" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />1 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />29 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />2 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />7 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của SÓNG DỪNG trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
      </ul>
    </section>
  );
}

function ImportedSectionLP12() {
  return (
    <section aria-labelledby="grade-2">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight" id="grade-2">Lớp 12</h2>
        <span className="text-xs text-lab-subtle">3 chuyên đề</span>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">★</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Lớp 12</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-12/chat-khi/chu-de-1-chat-khi/bai-1-thuyet-dong-hoc-phan-tu-khi-ly-tuong/1-ly-thuyet-thuyet-dong-hoc-phan-tu-khi-ly-tuong">CHẤT KHÍ</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="12 Lý thuyết, 53 Ví dụ, 13 Bài tập, 81 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="7.411320754716981" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="8.011320754716982" y="0" width="32.733333333333334" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="41.34465408805032" y="0" width="8.028930817610062" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="49.97358490566038" y="0" width="50.026415094339626" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />12 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />53 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />13 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />81 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của CHẤT KHÍ trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">★</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Lớp 12</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-12/nhiet-hoc/chu-de-1-nhiet-hoc/bai-1-thang-nhiet-do-nhiet-ke/1-ly-thuyet-thang-nhiet-do-nhiet-ke">NHIỆT HỌC</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="5 Lý thuyết, 9 Ví dụ, 7 Bài tập, 59 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="6.1375" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="6.7375" y="0" width="11.047500000000001" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="18.385" y="0" width="8.5925" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="27.5775" y="0" width="72.4225" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />5 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />9 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />7 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />59 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của NHIỆT HỌC trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-xl \x68over:\x73hadow-lab-green/\x35 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="relative flex h-full flex-col overflow-hidden p-5">
              <span className={"pointer-events-none absolute -top-5 -right-1 \x66ont-mono text-[5.5rem] leading-none font-bold text-lab-tint transition-colors \x67roup-hover:\x74ext-lab-green/\x310"} aria-hidden="true">★</span>
              <p className={"relative \x66ont-mono text-[10px] tracking-[0.16em] text-lab-green uppercase"}>Lớp 12</p>
              <h3 className="relative mt-1.5 pr-10 text-lg leading-snug font-semibold tracking-tight">
                <a className={"\x6futline-none \x61fter:\x61bsolute \x61fter:\x69nset-0 \x61fter:\x72ounded-3xl \x66ocus-visible:\x61fter:\x72ing-2 \x66ocus-visible:\x61fter:\x72ing-lab-green"} href="/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-1-tu-truong-cam-ung-tu/1-ly-thuyet-tu-truong-cam-ung-tu">TỪ TRƯỜNG</a>
              </h3>
              <svg className="h-1.5 w-full overflow-hidden rounded-full relative mt-4" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="13 Lý thuyết, 67 Ví dụ, 15 Bài tập, 36 Luyện tập">
                <rect className={"\x66ill-kind-theory"} x="0" y="0" width="9.745038167938931" height="4" rx="1" />
                <rect className={"\x66ill-kind-example"} x="10.345038167938931" y="0" width="50.22442748091603" height="4" rx="1" />
                <rect className={"\x66ill-kind-exercise"} x="61.16946564885496" y="0" width="11.244274809160306" height="4" rx="1" />
                <rect className={"\x66ill-kind-practice"} x="73.01374045801526" y="0" width="26.986259541984737" height="4" rx="1" />
              </svg>
              <ul className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-lab-subtle">
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-theory"} />13 lý thuyết</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-example"} />67 ví dụ</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-exercise"} />15 bài tập</li>
                <li className="flex items-center gap-1.5"><span className={"size-1.5 rounded-full \x62g-kind-practice"} />36 luyện tập</li>
              </ul>
              <footer className="relative mt-auto flex items-center justify-between gap-2 pt-5">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-lab-green">Bắt đầu<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></span>
                <button className={"relative z-10 inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-xs text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} type="button" aria-label="Xem danh sách bài của TỪ TRƯỜNG trong giáo trình"><svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5h13" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="M3 10a2 2 0 0 0 2 2h3" /><path d="M3 5v12a2 2 0 0 0 2 2h3" /></svg>Danh sách bài</button>
              </footer>
            </article>
          </div>
        </li>
      </ul>
    </section>
  );
}

function ImportedSectionLTrNh4() {
  return (
    <section className={"rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface p-6"} aria-labelledby="path-title">
      <h2 className="text-lg font-semibold tracking-tight" id="path-title">Lộ trình 4 bước trong mỗi bài</h2>
      <p className="mt-1 text-sm text-lab-subtle">Giáo trình được sắp theo đúng trình tự học hiệu quả — màu sắc giúp bạn nhận ra ngay.</p>
      <ol className="relative mt-6 grid gap-5 sm:grid-cols-4 sm:gap-3">
        <span className={"absolute top-4 right-[12%] left-[12%] hidden h-px \x62g-gradient-to-r \x66rom-kind-theory \x76ia-kind-exercise \x74o-kind-practice opacity-50 \x73m:\x62lock"} aria-hidden="true" />
        <li className={"relative flex gap-3 \x73m:\x66lex-col \x73m:\x69tems-center \x73m:\x74ext-center"}>
          <span className={"relative flex size-8 shrink-0 items-center justify-center rounded-full \x66ont-mono text-xs font-semibold text-lab-surface \x72ing-4 \x72ing-lab-surface \x62g-kind-theory"}>1</span>
          <span>
            <span className="block text-sm font-medium">Lý thuyết<span className={"ml-1.5 \x66ont-mono text-xs text-lab-subtle"}>52</span></span>
            <span className="mt-0.5 block text-xs leading-5 text-lab-subtle">Quan sát hiện tượng, hiểu bản chất</span>
          </span>
        </li>
        <li className={"relative flex gap-3 \x73m:\x66lex-col \x73m:\x69tems-center \x73m:\x74ext-center"}>
          <span className={"relative flex size-8 shrink-0 items-center justify-center rounded-full \x66ont-mono text-xs font-semibold text-lab-surface \x72ing-4 \x72ing-lab-surface \x62g-kind-example"}>2</span>
          <span>
            <span className="block text-sm font-medium">Ví dụ<span className={"ml-1.5 \x66ont-mono text-xs text-lab-subtle"}>319</span></span>
            <span className="mt-0.5 block text-xs leading-5 text-lab-subtle">Phân tích từng bước qua mô phỏng</span>
          </span>
        </li>
        <li className={"relative flex gap-3 \x73m:\x66lex-col \x73m:\x69tems-center \x73m:\x74ext-center"}>
          <span className={"relative flex size-8 shrink-0 items-center justify-center rounded-full \x66ont-mono text-xs font-semibold text-lab-surface \x72ing-4 \x72ing-lab-surface \x62g-kind-exercise"}>3</span>
          <span>
            <span className="block text-sm font-medium">Bài tập<span className={"ml-1.5 \x66ont-mono text-xs text-lab-subtle"}>67</span></span>
            <span className="mt-0.5 block text-xs leading-5 text-lab-subtle">Tự tái hiện và kiểm chứng</span>
          </span>
        </li>
        <li className={"relative flex gap-3 \x73m:\x66lex-col \x73m:\x69tems-center \x73m:\x74ext-center"}>
          <span className={"relative flex size-8 shrink-0 items-center justify-center rounded-full \x66ont-mono text-xs font-semibold text-lab-surface \x72ing-4 \x72ing-lab-surface \x62g-kind-practice"}>4</span>
          <span>
            <span className="block text-sm font-medium">Luyện tập<span className={"ml-1.5 \x66ont-mono text-xs text-lab-subtle"}>339</span></span>
            <span className="mt-0.5 block text-xs leading-5 text-lab-subtle">Vận dụng theo mức độ P1 → P3</span>
          </span>
        </li>
      </ol>
    </section>
  );
}

function ImportedAsideMuNCTh() {
  return (
    <aside className="relative overflow-hidden rounded-3xl border border-[#091426] bg-[#050B18] p-8 text-[#F4F8FC] shadow-xl" aria-labelledby="lab-guide-title">
      <div className="relative max-w-xl space-y-3">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-[#36D9E8] uppercase">Phòng Thí Nghiệm Số TamGiangPhysics</p>
        <h2 className="text-xl font-bold tracking-tight text-[#F4F8FC] md:text-2xl" id="lab-guide-title">Học thông qua quan sát và tương tác</h2>
        <p className="text-xs leading-relaxed text-[#F4F8FC]/70">
          Toàn bộ 777 bài học và mô phỏng được biên soạn bám sát chương trình giáo dục phổ thông mới, giúp học sinh nhìn thấy chuyển động, sóng và trường lực một cách sống động.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <a href="/tai-lieu" className="inline-flex items-center gap-1.5 rounded-full bg-[#48D597] px-4 py-2 text-xs font-semibold text-[#050B18] hover:bg-[#48D597]/90 transition-colors">
            <span>Mở Kho tài liệu Vật lý</span>
            <span>↗</span>
          </a>
          <a href="/#phuong-phap" className="inline-flex items-center gap-1.5 rounded-full border border-[#091426] bg-[#091426] px-4 py-2 text-xs font-medium text-[#F4F8FC] hover:border-[#36D9E8]/40 transition-colors">
            <span>Tìm hiểu phương pháp học</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
