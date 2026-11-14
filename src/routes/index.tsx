import { WaveInterferenceExperiment } from "@/components/wave-interference-experiment";
import { ShowcaseTopics } from "@/components/showcase-topics";
import type { CSSProperties } from "react";
import { Fragment } from "react";
import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";
import { calculateInterferenceMaxima } from "../lib/wave-experiment";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VatLy.ai — Nhìn thấy để hiểu sâu hơn" },
      {
        name: "description",
        content:
          "Khám phá Vật Lý Phân Tích qua mô phỏng tương tác, bài học trực quan và các chuyên đề dành cho học sinh.",
      },
      { property: "og:title", content: "VatLy.ai — Nhìn thấy để hiểu sâu hơn" },
      {
        property: "og:description",
        content:
          "Khám phá Vật Lý Phân Tích qua mô phỏng tương tác, bài học trực quan và các chuyên đề dành cho học sinh.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  staticData: { importedDocument: { html: { "className": "light", "lang": "vi-VN", "style": { colorScheme: "light" } as import("react").CSSProperties }, body: { "className": "geist_a71539c9-module__T19VSG__variable geist_mono_8d43a2aa-module__8Li5zG__variable \x66lex \x6din-h-screen \x77-full \x66lex-col \x61ntialiased", "data-site-import-popup-incomplete": "limit" } } },
  component: Index,
});

function Index() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <ImportedHeader />
        <main className="flex-1">
          <ImportedSectionNgHCThu />
          <ImportedSectionHCKiN />
          <ImportedSectionGiTrNh />
          <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8" aria-labelledby="showcase-title">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs tracking-wider text-lab-green uppercase">Thư viện mô phỏng</span>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl" id="showcase-title">Chọn chuyên đề. Bấm chạy.</h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-lab-subtle">Mô phỏng thật từ giáo trình, chạy ngay trong trang. Mỗi chuyên đề mở đầu bằng lý thuyết, tiếp nối bằng các ví dụ được phân tích từng bước.</p>
              </div>
              <a className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-lab-green underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lab-green" href="/mo-phong">
                Xem cả 777 mô phỏng
                <svg className="size-4 transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </a>
            </div>
            <ShowcaseTopics />
          </section>
          <ImportedSectionHCTrC />
          <ImportedSectionIUGS />
        </main>
        <ImportedFooter />
      </div>
      <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false" />

    </>
  );
}

function ImportedHeader() {
  const [accountOpen, setAccountOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const accountOpenRef = useRef(false);
  const navOpenRef = useRef(false);
  const [themeDark, setThemeDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const accountTriggerRef = useRef<HTMLButtonElement>(null);
  const navTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeDark);
    document.documentElement.classList.toggle("light", !themeDark);
  }, [themeDark]);

  useEffect(() => {
    if (!accountOpen && !navOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      accountOpenRef.current = false;
      navOpenRef.current = false;
      setAccountOpen(false);
      setNavOpen(false);
      if (navOpen) navTriggerRef.current?.focus();
      else accountTriggerRef.current?.focus();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        accountOpenRef.current = false;
        navOpenRef.current = false;
        setAccountOpen(false);
        setNavOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [accountOpen, navOpen]);

  const openAccountMenu = () => {
    const next = !accountOpenRef.current;
    accountOpenRef.current = next;
    navOpenRef.current = false;
    setAccountOpen(next);
    setNavOpen(false);
  };

  const openNavigationMenu = () => {
    const next = !navOpenRef.current;
    navOpenRef.current = next;
    accountOpenRef.current = false;
    setNavOpen(next);
    setAccountOpen(false);
  };

  const closeMenus = () => {
    accountOpenRef.current = false;
    navOpenRef.current = false;
    setAccountOpen(false);
    setNavOpen(false);
  };

  return (
    <header ref={headerRef} className={"sticky top-0 z-40 \x62order-b \x62order-lab-line \x62g-lab-paper/\x375 \x62ackdrop-blur-xl \x62ackdrop-saturate-150"}>
      <div className="relative mx-auto flex h-18 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <a className={"group flex shrink-0 items-center gap-2.5 rounded-lg \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4 \x66ocus-visible:\x6futline-lab-green"} aria-label="VatLy.ai — Trang chủ" href="/">
          <div className="inline-flex items-center gap-2.5">
            <span className={"flex shrink-0 items-center justify-center \x62g-[#\x66bfaf6] \x73hadow-xs \x72ing-1 \x72ing-lab-line/\x340 transition-transform duration-200 \x67roup-hover:\x73cale-105 size-10 rounded-xl p-1.5"}>
              <img className="size-full object-contain" style={{ color: "transparent" }} alt="" width="24" height="28" decoding="async" src="/site-assets/ff989603c215dec7-57cb04569c9a4790b0d0a4da1edbd171.png" />
            </span>
            <span className="flex flex-col text-left">
              <span className="block text-foreground text-lg font-semibold tracking-tight">VatLy.ai</span>
              <span className={"hidden \x66ont-mono tracking-widest text-lab-subtle \x78l:\x62lock text-[9px]"}>HỌC QUA TRẢI NGHIỆM</span>
            </span>
          </div>
        </a>
        <nav className={"ml-auto hidden items-center gap-1 \x6cg:\x66lex"} aria-label="Điều hướng chính">
          <a className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x64ark:\x68over:\x62g-accent/\x350 py-2 \x68as-[>\x73vg]:\x70x-3 h-11 rounded-full px-3.5 text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green"} href="/#phuong-phap">Phương pháp</a>
          <a className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x64ark:\x68over:\x62g-accent/\x350 py-2 \x68as-[>\x73vg]:\x70x-3 h-11 rounded-full px-3.5 text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green"} href="/#cach-hoc">Cách học</a>
          <a className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x64ark:\x68over:\x62g-accent/\x350 py-2 \x68as-[>\x73vg]:\x70x-3 h-11 rounded-full px-3.5 text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green"} href="/#giao-trinh">Ví dụ mô phỏng</a>
          <a className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x64ark:\x68over:\x62g-accent/\x350 py-2 \x68as-[>\x73vg]:\x70x-3 h-11 rounded-full px-3.5 text-lab-subtle transition-colors \x68over:\x62g-lab-tint hover:text-lab-green"} href="/#vat-ly-sieu-nham">Học cùng VLSN</a>
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <div className={"hidden \x73m:\x62lock"}>
            <div className={"flex flex-wrap items-center justify-center gap-2 \x6dd:\x66lex-row"}>
              <button onClick={() => setThemeDark((dark) => !dark)} aria-label="Toggle theme" title="Toggle theme" className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x62order-destructive \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x62order \x62g-background \x73hadow-xs \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x62order-input \x64ark:\x62g-input/\x330 \x64ark:\x68over:\x62g-input/\x350 size-9"}>
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
              </button>
            </div>
          </div>
          <div className="relative" data-import-header-menu>
            <button
              ref={accountTriggerRef}
              className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x62order \x62g-background \x73hadow-xs \x68over:\x62g-accent hover:text-accent-foreground \x64ark:\x62order-input \x64ark:\x62g-input/\x330 \x64ark:\x68over:\x62g-input/\x350 size-11 rounded-full"}
              aria-label="Mở menu tài khoản"
              type="button"
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              aria-controls="account-menu"
              data-state={accountOpen ? "open" : "closed"}
              onClick={openAccountMenu}
            >
              <svg className="size-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 20a6 6 0 0 0-12 0" />
                <circle cx="12" cy="10" r="4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </button>
            {accountOpen && (
              <div id="account-menu" className="absolute right-0 top-full z-50 mt-1 w-40 rounded-md border bg-popover p-1 text-popover-foreground shadow-md" role="menu" aria-label="Tài khoản">
                <a className="relative flex min-h-8 items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground" role="menuitem" href="/sign-in?next=%2F" onClick={closeMenus}>
                  Đăng nhập
                </a>
              </div>
            )}
          </div>
          <a className={"shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 py-2 \x68as-[>\x73vg]:\x70x-3 hidden h-11 rounded-full \x62g-lab-green px-5 text-lab-on-green transition-colors \x68over:\x62g-lab-green/\x390 \x6cg:\x69nline-flex"} href="/mo-phong">Vào phòng lab <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
          <div className="relative lg:hidden" data-import-header-menu>
            <button
              ref={navTriggerRef}
              className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-11 text-lab-ink \x68over:\x62g-lab-tint"}
              aria-label="Mở menu điều hướng"
              type="button"
              aria-haspopup="menu"
              aria-expanded={navOpen}
              aria-controls="navigation-menu"
              data-state={navOpen ? "open" : "closed"}
              onClick={openNavigationMenu}
            >
              <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
            {navOpen && (
              <nav id="navigation-menu" className="absolute right-0 top-full z-50 mt-2 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md" aria-label="Khám phá Vật Lý">
                <div className="px-2 py-1.5 text-sm font-medium">Khám phá Vật Lý</div>
                <a className="flex min-h-11 items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus:bg-accent" href="/" onClick={closeMenus}>Trang chủ</a>
                <a className="flex min-h-11 items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus:bg-accent" href="/#phuong-phap" onClick={closeMenus}>Phương pháp</a>
                <a className="flex min-h-11 items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus:bg-accent" href="/#cach-hoc" onClick={closeMenus}>Cách học</a>
                <a className="flex min-h-11 items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus:bg-accent" href="/#giao-trinh" onClick={closeMenus}>Ví dụ mô phỏng</a>
                <a className="flex min-h-11 items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus:bg-accent" href="/#vat-ly-sieu-nham" onClick={closeMenus}>Học cùng VLSN</a>
                <a className="flex min-h-11 items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent focus:bg-accent" href="/mo-phong" onClick={closeMenus}>Vào phòng lab</a>
                <div className="mt-1 border-t px-2 pt-2">
                  <span className="block px-2 py-1.5 text-sm font-medium">Giao diện</span>
                  <button onClick={() => setThemeDark((dark) => !dark)} aria-label="Toggle theme" title="Toggle theme" className="mx-auto inline-flex size-9 items-center justify-center rounded-md border bg-background shadow-xs transition-colors hover:bg-accent">
                    <svg className={"hidden [\x68tml.\x64ark_&]:\x62lock size-4"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                    <svg className={"hidden [\x68tml.\x6cight_&]:\x62lock size-4"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                    </svg>
                  </button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function ImportedSectionNgHCThu() {
  const [wavePlaying, setWavePlaying] = useState(true);
  const [wavelength, setWavelength] = useState(1.6);
  const [sources, setSources] = useState({ first: { x: 9, y: 9 }, second: { x: 15, y: 9 } });
  const draggingSource = useRef<"first" | "second" | null>(null);
  const sourceDistance = Math.hypot(sources.second.x - sources.first.x, sources.second.y - sources.first.y);
  const maximaCount = calculateInterferenceMaxima(sourceDistance, wavelength);
  const formattedWavelength = wavelength.toFixed(1).replace(".", ",");
  const formattedDistance = sourceDistance.toFixed(1).replace(".", ",");
  return (
    <section className={"relative overflow-hidden \x62order-b \x62order-lab-line"} aria-labelledby="hero-title">
      <div className="lab-grid absolute inset-0 [mask-image:radial-gradient(80%_70%_at_50%_40%,rgb(0,0,0)_40%,rgba(0,0,0,0)_100%)]" aria-hidden="true" />
      <div className={"absolute -top-40 -left-32 size-[34rem] \x61nimate-lab-aurora rounded-full \x62g-lab-green/\x312 \x62lur-3xl"} aria-hidden="true" />
      <div className={"absolute top-1/3 -right-40 size-[30rem] \x61nimate-lab-aurora rounded-full \x62g-lab-lime/\x325 \x62lur-3xl [animation-delay:-8s]"} aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-14 sm:px-8 md:pt-16 lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:pb-20">
        <div>
          <a className={"group inline-flex items-center gap-2 rounded-full \x62order \x62order-lab-line \x62g-lab-surface/\x380 py-1 pr-3 pl-1 text-xs text-lab-subtle \x62ackdrop-blur transition-colors \x68over:\x62order-lab-green/\x340 hover:text-lab-ink \x6dotion-safe:\x61nimate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 \x6dotion-safe:\x64uration-700 [animation-fill-mode:both]"} href="/#vat-ly-sieu-nham"><span className={"inline-flex items-center gap-1 rounded-full \x62g-lab-green px-2 py-0.5 font-medium text-lab-on-green"}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" /><path d="M20 2v4" /><path d="M22 4h-4" /><circle cx="4" cy="20" r="2" /></svg> Mới</span>Phương pháp Vật Lý Phân Tích · Vật Lý Siêu Nhẩm<svg className={"size-3.5 transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
          <h1 className={"mt-7 text-[2.75rem] leading-[1.04] font-semibold tracking-[-0.05em] sm:text-6xl \x78l:\x74ext-[\x34.\x33rem] \x6dotion-safe:\x61nimate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 \x6dotion-safe:\x64uration-700 [animation-fill-mode:both] [animation-delay:120ms]"} id="hero-title">Đừng học thuộc<br />Vật Lý. Hãy <span className="relative inline-block"><span className="lab-text-shine">phân tích</span><svg className="absolute -bottom-2 left-0 h-3 w-full text-lab-lime" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true"><path className={"\x61nimate-lab-draw [animation-delay:600ms]"} style={{ strokeDashoffset: "0px" } as CSSProperties} d="M3 9 C 80 2, 200 2, 297 8" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="320" /></svg></span> nó.</h1>
          <p className={"mt-7 max-w-lg text-base leading-7 text-lab-subtle sm:text-lg sm:leading-8 \x6dotion-safe:\x61nimate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 \x6dotion-safe:\x64uration-700 [animation-fill-mode:both] [animation-delay:240ms]"}>Mỗi hiện tượng được tái hiện thành mô phỏng để bạn tự tay thay đổi, quan sát và lý giải — đi sâu vào <strong className="font-medium text-lab-ink">bản chất</strong> thay vì áp công thức máy móc.</p>
          <div className={"mt-8 flex flex-wrap items-center gap-3 \x6dotion-safe:\x61nimate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 \x6dotion-safe:\x64uration-700 [animation-fill-mode:both] [animation-delay:360ms]"}>
            <a className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68as-[>\x73vg]:\x70x-4 group h-12 rounded-full \x62g-lab-green px-6 text-lab-on-green \x73hadow-lg \x73hadow-lab-green/\x325 transition-[background-color,transform] \x68over:\x2dtranslate-y-0.\x35 \x68over:\x62g-lab-green/\x390 \x6dotion-reduce:\x74ransform-none"} href="/mo-phong">Vào phòng thí nghiệm<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-0.\x35 \x67roup-hover:\x2dtranslate-y-0.\x35"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
            <a className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 \x68as-[>\x73vg]:\x70x-4 h-12 rounded-full px-5 text-lab-ink \x68over:\x62g-lab-tint"} href="/#phuong-phap">Xem phương pháp <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg></a>
          </div>
          <dl className={"mt-12 grid max-w-md grid-cols-3 gap-6 \x62order-t \x62order-lab-line pt-6 \x6dotion-safe:\x61nimate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 \x6dotion-safe:\x64uration-700 [animation-fill-mode:both] [animation-delay:480ms]"}>
            <div>
              <dd className={"\x66ont-mono text-3xl font-semibold tracking-tight"}>
                <span className="tabular-nums" aria-hidden="true">777</span>
                <span className={"\x73r-only"}>777</span>
              </dd>
              <dt className="mt-1 text-xs text-lab-subtle">mô phỏng</dt>
            </div>
            <div>
              <dd className={"\x66ont-mono text-3xl font-semibold tracking-tight"}>
                <span className="tabular-nums" aria-hidden="true">10</span>
                <span className={"\x73r-only"}>10</span>
              </dd>
              <dt className="mt-1 text-xs text-lab-subtle">chuyên đề</dt>
            </div>
            <div>
              <dd className={"\x66ont-mono text-3xl font-semibold tracking-tight"}>
                <span className="tabular-nums" aria-hidden="true">03</span>
                <span className={"\x73r-only"}>3</span>
              </dd>
              <dt className="mt-1 text-xs text-lab-subtle">khối lớp</dt>
            </div>
          </dl>
        </div>
        <div className={"relative min-w-0 \x6dotion-safe:\x61nimate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 \x6dotion-safe:\x64uration-700 [animation-fill-mode:both] [animation-delay:300ms]"}>
          <p className="absolute -top-7 right-4 flex items-center gap-1.5 text-xs text-lab-subtle" aria-hidden="true">Thử kéo nguồn sóng <svg className={"size-4 \x72otate-12 \x61nimate-lab-float text-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z" /></svg></p>
          <WaveInterferenceExperiment />
        </div>
      </div>
    </section>
  );
}

function ImportedSectionBaTrCT() {
  return (
    <section className={"mx-auto max-w-6xl \x73croll-mt-24 px-5 py-16 sm:px-8 md:py-24"} id="phuong-phap" aria-labelledby="method-title">
      <div className={"lab-reveal grid gap-6 md:grid-cols-[1.1fr_1fr] \x6dd:\x69tems-end"}>
        <div>
          <p className={"\x66ont-mono text-[11px] tracking-[0.2em] text-lab-green uppercase"}>Phương pháp</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl" id="method-title">Ba trụ cột của <span className="lab-text-shine">Vật Lý Phân Tích</span></h2>
        </div>
        <p className={"max-w-md text-sm leading-7 text-lab-subtle \x6dd:\x6austify-self-end"}>Học Vật Lý không phải là thuộc lòng công thức. Đó là nhìn ra cơ chế phía sau mỗi hiện tượng — và đủ tự tin để tái hiện nó bằng chính lập luận của mình.</p>
      </div>
      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-[1.75rem] \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-2xl \x68over:\x73hadow-lab-green/\x310 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="flex h-full flex-col p-6">
              <div className={"-mx-2 mb-6 rounded-2xl \x62g-lab-tint/\x360 px-2 py-4 transition-colors \x67roup-hover:\x62g-lab-tint"}>
                <svg className="h-auto w-full" viewBox="0 0 320 170" aria-hidden="true" fill="none">
                  <path className={"\x73troke-lab-line"} d="M60 135H290M60 135V18" strokeWidth="2" />
                  <path className={"\x73troke-lab-green"} d="M60 135L208 52" strokeWidth="4" strokeLinecap="round" />
                  <path className={"\x66ill-lab-green"} d="M220 45L211 58L204 46Z" />
                  <path className={"\x61nimate-lab-dash \x73troke-lab-subtle"} d="M220 45V135M220 45H60" strokeWidth="1.5" strokeDasharray="6 6" />
                  <path className={"\x73troke-kind-example"} d="M60 135H220" strokeWidth="5" strokeLinecap="round" />
                  <path className={"\x73troke-kind-exercise"} d="M60 135V45" strokeWidth="5" strokeLinecap="round" />
                  <path className={"fill-none \x73troke-lab-ink"} d="M95 135a35 35 0 0 0-4-17" strokeWidth="1.5" />
                  <circle className={"\x6frigin-center \x61nimate-lab-pulse \x66ill-lab-green/\x340 [transform-box:fill-box]"} cx="220" cy="45" r="6" />
                  <g className={"\x66ill-lab-ink \x66ont-mono text-[13px]"}>
                    <text x="228" y="40">F</text>
                    <text x="132" y="155">Fₓ = F cos α</text>
                    <text x="66" y="34">F<tspan className="text-[10px]" dy="4">y</tspan></text>
                    <text className="text-[11px]" x="100" y="128">α</text>
                  </g>
                </svg>
              </div>
              <p className={"\x66ont-mono text-[11px] tracking-[0.16em] text-lab-green uppercase"}>01 · Tư duy</p>
              <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight">Vật Lý Phân Tích</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-lab-subtle">Bóc tách mỗi bài toán thành chuỗi lập luận rõ ràng — không đoán mò, không nhồi dạng.</p>
              <ul className={"mt-5 \x73pace-y-2 \x62order-t \x62order-lab-line pt-4"}>
                <li className="flex gap-2 text-sm"><svg className="mt-0.5 size-4 shrink-0 text-lab-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Hiện tượng → đại lượng → định luật</li>
                <li className="flex gap-2 text-sm"><svg className="mt-0.5 size-4 shrink-0 text-lab-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Lập phương trình từ bản chất, không từ mẹo</li>
              </ul>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-[1.75rem] \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-2xl \x68over:\x73hadow-lab-green/\x310 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="flex h-full flex-col p-6">
              <div className={"-mx-2 mb-6 rounded-2xl \x62g-lab-tint/\x360 px-2 py-4 transition-colors \x67roup-hover:\x62g-lab-tint"}>
                <svg className="h-auto w-full" viewBox="0 0 320 170" aria-hidden="true" fill="none">
                  <g>
                    <path className={"\x73troke-lab-line"} d="M40 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:0s] \x66ill-lab-green"} cx="40" cy="80" r="7" strokeWidth="3" />
                  </g>
                  <g>
                    <path className={"\x73troke-lab-line"} d="M70 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:-0.27s] \x66ill-lab-green"} cx="70" cy="80" r="7" strokeWidth="3" />
                  </g>
                  <g>
                    <path className={"\x73troke-lab-line"} d="M100 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:-0.53s] \x66ill-lab-green"} cx="100" cy="80" r="7" strokeWidth="3" />
                  </g>
                  <g>
                    <path className={"\x73troke-lab-line"} d="M130 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:-0.8s] \x66ill-lab-green"} cx="130" cy="80" r="7" strokeWidth="3" />
                  </g>
                  <g>
                    <path className={"\x73troke-lab-line"} d="M160 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:-1.07s] \x66ill-lab-lime \x73troke-lab-green"} cx="160" cy="80" r="9" strokeWidth="3" />
                  </g>
                  <g>
                    <path className={"\x73troke-lab-line"} d="M190 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:-1.33s] \x66ill-lab-green"} cx="190" cy="80" r="7" strokeWidth="3" />
                  </g>
                  <g>
                    <path className={"\x73troke-lab-line"} d="M220 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:-1.6s] \x66ill-lab-green"} cx="220" cy="80" r="7" strokeWidth="3" />
                  </g>
                  <g>
                    <path className={"\x73troke-lab-line"} d="M250 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:-1.87s] \x66ill-lab-green"} cx="250" cy="80" r="7" strokeWidth="3" />
                  </g>
                  <g>
                    <path className={"\x73troke-lab-line"} d="M280 50V110" strokeDasharray="2 4" />
                    <circle className={"\x61nimate-lab-bob [animation-delay:-2.13s] \x66ill-lab-green"} cx="280" cy="80" r="7" strokeWidth="3" />
                  </g>
                  <circle className={"fill-none \x73troke-lab-green"} cx="160" cy="80" r="26" strokeWidth="2" strokeDasharray="4 4" />
                  <text className={"\x66ill-lab-ink \x66ont-mono text-[11px]"} x="190" y="40">dao động tại chỗ</text>
                  <g className={"\x61nimate-lab-slide-x"}>
                    <path className={"fill-none \x73troke-kind-example"} d="M105 145H215m-10-6 10 6-10 6" strokeWidth="2.5" />
                    <text className={"\x66ill-lab-subtle \x66ont-mono text-[11px]"} x="118" y="163">năng lượng truyền đi</text>
                  </g>
                </svg>
              </div>
              <p className={"\x66ont-mono text-[11px] tracking-[0.16em] text-lab-green uppercase"}>02 · Chiều sâu</p>
              <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight">Chuyên sâu hiện tượng, hiểu bản chất</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-lab-subtle">Nhìn vào bên trong: phần tử chỉ dao động tại chỗ, năng lượng mới truyền đi. Hiểu vì sao, công thức tự xuất hiện.</p>
              <ul className={"mt-5 \x73pace-y-2 \x62order-t \x62order-lab-line pt-4"}>
                <li className="flex gap-2 text-sm"><svg className="mt-0.5 size-4 shrink-0 text-lab-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Tránh bẫy lý thuyết nhờ hiểu cơ chế</li>
                <li className="flex gap-2 text-sm"><svg className="mt-0.5 size-4 shrink-0 text-lab-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Nhớ lâu vì biết công thức đến từ đâu</li>
              </ul>
            </article>
          </div>
        </li>
        <li className="lab-reveal">
          <div className={"lab-spotlight group h-full rounded-[1.75rem] \x62order \x62order-lab-line \x62g-lab-surface transition-[border-color,transform,box-shadow] duration-300 \x68over:\x2dtranslate-y-1 \x68over:\x62order-lab-green/\x335 \x68over:\x73hadow-2xl \x68over:\x73hadow-lab-green/\x310 \x6dotion-reduce:\x74ransform-none isolate"}>
            <article className="flex h-full flex-col p-6">
              <div className={"-mx-2 mb-6 rounded-2xl \x62g-lab-tint/\x360 px-2 py-4 transition-colors \x67roup-hover:\x62g-lab-tint"}>
                <svg className="h-auto w-full" viewBox="0 0 320 170" aria-hidden="true" fill="none">
                  <rect className={"\x66ill-lab-paper \x73troke-lab-line"} x="20" y="8" width="280" height="118" rx="14" strokeWidth="2" />
                  <path className={"fill-none \x73troke-lab-green/\x340"} d="M118 90a52 52 0 0 0 84 0" strokeWidth="2" strokeDasharray="4 5" />
                  <path className={"\x73troke-lab-ink"} d="M130 20H190" strokeWidth="3" strokeLinecap="round" />
                  <g className={"[transform-origin:160px_20px] \x61nimate-lab-swing [transform-box:view-box]"}>
                    <path className={"\x73troke-lab-ink"} d="M160 20V92" strokeWidth="2" />
                    <circle className={"\x66ill-lab-lime \x73troke-lab-green"} cx="160" cy="98" r="11" strokeWidth="3" />
                  </g>
                  <path className={"\x66ill-lab-green"} d="M30 138l12 7-12 7z" />
                  <path className={"\x73troke-lab-line"} d="M58 145H292" strokeWidth="4" strokeLinecap="round" />
                  <circle className={"\x61nimate-lab-scrub \x66ill-lab-surface \x73troke-lab-green"} cx="64" cy="145" r="7" strokeWidth="3" />
                  <text className={"\x66ill-lab-subtle \x66ont-mono text-[11px]"} x="288" y="30" textAnchor="end">T = 2π√(ℓ/g)</text>
                </svg>
              </div>
              <p className={"\x66ont-mono text-[11px] tracking-[0.16em] text-lab-green uppercase"}>03 · Trải nghiệm</p>
              <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight">Tái hiện bằng mô phỏng</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-lab-subtle">Mỗi ví dụ, mỗi câu luyện tập đều được dựng lại thành thí nghiệm để bạn kiểm chứng bằng chính mắt mình.</p>
              <ul className={"mt-5 \x73pace-y-2 \x62order-t \x62order-lab-line pt-4"}>
                <li className="flex gap-2 text-sm"><svg className="mt-0.5 size-4 shrink-0 text-lab-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Kéo, thả, đổi thông số tức thì</li>
                <li className="flex gap-2 text-sm"><svg className="mt-0.5 size-4 shrink-0 text-lab-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>Chạy ngay trên trình duyệt, không cài đặt</li>
              </ul>
            </article>
          </div>
        </li>
      </ul>
    </section>
  );
}

function ImportedSectionBTHC() {
  return (
    <section className={"\x73croll-mt-20 \x62order-y \x62order-lab-line \x62g-lab-tint/\x340"} id="cach-hoc" aria-labelledby="study-title">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={"\x6cg:\x73ticky lg:top-28 lg:self-start"}>
          <p className={"\x66ont-mono text-[11px] tracking-[0.2em] text-lab-green uppercase"}>Cách học Lý tốt</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl" id="study-title">Bớt học vẹt.<br />Thêm những “à, ra thế!”</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-lab-subtle">Mỗi chuyên đề trong phòng thí nghiệm đi theo đúng bốn bước dưới đây — màu sắc trong giáo trình giúp bạn luôn biết mình đang ở đâu.</p>
          <figure className={"mt-8 rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface p-6"}>
            <svg className="size-6 text-lab-green" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
              <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
            </svg>
            <blockquote className="mt-3 text-lg leading-relaxed font-medium tracking-tight">Thầy dạy cách học — trò học cách học. Đi sâu vào bản chất hiện tượng chứ không chỉ áp dụng công thức.</blockquote>
            <figcaption className="mt-4 text-xs text-lab-subtle">Triết lý giảng dạy của Vật Lý Siêu Nhẩm · Định hướng đúng · Truyền cảm hứng · Rồi mới dạy học</figcaption>
          </figure>
        </div>
        <ol className={"relative \x73pace-y-5"}>
          <span className={"lab-grow-y absolute top-6 bottom-6 left-[1.6rem] w-0.5 rounded-full \x62g-gradient-to-b \x66rom-kind-theory \x76ia-kind-example \x76ia-60% \x74o-kind-practice"} aria-hidden="true" />
          <li className="lab-reveal relative flex gap-5">
            <span className={"relative z-10 flex size-[3.25rem] shrink-0 items-center justify-center rounded-2xl \x66ont-mono text-lg font-semibold text-lab-surface \x73hadow-lg \x72ing-4 \x72ing-lab-paper \x62g-kind-theory"}>01</span>
            <div className={"flex-1 rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface p-5 transition-colors \x68over:\x62order-lab-green/\x330"}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">Quan sát trước, công thức sau</h3>
                <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-theory/\x312"}><span className={"size-1.5 rounded-full \x62g-kind-theory"} aria-hidden="true" />Lý thuyết · 52</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-lab-subtle">Mở mô phỏng lý thuyết và để hiện tượng tự kể câu chuyện trước khi đọc định nghĩa.</p>
            </div>
          </li>
          <li className="lab-reveal relative flex gap-5">
            <span className={"relative z-10 flex size-[3.25rem] shrink-0 items-center justify-center rounded-2xl \x66ont-mono text-lg font-semibold text-lab-surface \x73hadow-lg \x72ing-4 \x72ing-lab-paper \x62g-kind-example"}>02</span>
            <div className={"flex-1 rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface p-5 transition-colors \x68over:\x62order-lab-green/\x330"}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">Hỏi “vì sao?” đến tận cùng</h3>
                <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />Ví dụ · 319</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-lab-subtle">Đại lượng nào thay đổi, vì sao thay đổi? Theo dõi lời giải được phân tích từng bước trên mô phỏng.</p>
            </div>
          </li>
          <li className="lab-reveal relative flex gap-5">
            <span className={"relative z-10 flex size-[3.25rem] shrink-0 items-center justify-center rounded-2xl \x66ont-mono text-lg font-semibold text-lab-surface \x73hadow-lg \x72ing-4 \x72ing-lab-paper \x62g-kind-exercise"}>03</span>
            <div className={"flex-1 rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface p-5 transition-colors \x68over:\x62order-lab-green/\x330"}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">Dự đoán rồi kiểm chứng</h3>
                <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-exercise/\x314"}><span className={"size-1.5 rounded-full \x62g-kind-exercise"} aria-hidden="true" />Bài tập · 67</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-lab-subtle">Đoán kết quả trước khi bấm chạy. Sai ở đâu, hiểu ở đó — đó là lúc kiến thức bám rễ.</p>
            </div>
          </li>
          <li className="lab-reveal relative flex gap-5">
            <span className={"relative z-10 flex size-[3.25rem] shrink-0 items-center justify-center rounded-2xl \x66ont-mono text-lg font-semibold text-lab-surface \x73hadow-lg \x72ing-4 \x72ing-lab-paper \x62g-kind-practice"}>04</span>
            <div className={"flex-1 rounded-3xl \x62order \x62order-lab-line \x62g-lab-surface p-5 transition-colors \x68over:\x62order-lab-green/\x330"}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">Luyện tập theo mức độ</h3>
                <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-practice/\x312"}><span className={"size-1.5 rounded-full \x62g-kind-practice"} aria-hidden="true" />Luyện tập · 339</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-lab-subtle">Đi từ P1 đến P3 với từng câu được tái hiện, tự đối chiếu đáp án thay vì chỉ xem lời giải.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function ImportedSectionHCTrC() {
  return (
    <section className={"\x73croll-mt-20 px-3 py-6 sm:px-5"} id="vat-ly-sieu-nham" aria-labelledby="partner-title">
      <div className={"relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] \x62g-lab-deep text-lab-on-deep"}>
        <div className="lab-grid absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className={"absolute -top-40 -left-20 size-[32rem] \x61nimate-lab-aurora rounded-full \x62g-lab-green/\x340 \x62lur-3xl"} aria-hidden="true" />
        <div className={"absolute -right-24 -bottom-48 size-[30rem] \x61nimate-lab-aurora rounded-full \x62g-lab-lime/\x315 \x62lur-3xl [animation-delay:-7s]"} aria-hidden="true" />
        <div className="relative grid gap-12 px-6 py-14 sm:px-10 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:px-16">
          <div className="lab-reveal">
            <p className={"inline-flex items-center gap-2 rounded-full \x62order \x62order-lab-lime/\x330 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-lab-lime uppercase"}>Đối tác đào tạo · Tài trợ</p>
            <h2 className="mt-5 text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-5xl" id="partner-title">Học trực tiếp cùng<br /><span className="text-lab-lime">Vật Lý Siêu Nhẩm</span></h2>
            <p className={"mt-5 max-w-lg text-sm leading-7 \x74ext-lab-on-deep/\x375 sm:text-base"}>Trung tâm luyện thi Vật Lý cấp 2, cấp 3 và Đại học tại Hà Nội, nơi phát triển phương pháp <strong className="text-lab-on-deep">Vật Lý Phân Tích</strong> — đi sâu vào bản chất hiện tượng, rèn kỷ luật và bản năng tự học.</p>
            <dl className="mt-8 grid grid-cols-3 gap-3">
              <div className={"rounded-2xl \x62order \x62order-lab-on-deep/\x310 \x62g-lab-on-deep/\x35 p-4 \x62ackdrop-blur"}>
                <dd className={"\x66ont-mono text-2xl font-semibold text-lab-lime sm:text-3xl"}>~20</dd>
                <dt className={"mt-1 text-xs leading-5 \x74ext-lab-on-deep/\x370"}><span className="font-medium text-lab-on-deep">năm</span> kinh nghiệm luyện thi của Thầy Trần Quý</dt>
              </div>
              <div className={"rounded-2xl \x62order \x62order-lab-on-deep/\x310 \x62g-lab-on-deep/\x35 p-4 \x62ackdrop-blur"}>
                <dd className={"\x66ont-mono text-2xl font-semibold text-lab-lime sm:text-3xl"}>10+</dd>
                <dt className={"mt-1 text-xs leading-5 \x74ext-lab-on-deep/\x370"}><span className="font-medium text-lab-on-deep">thủ khoa</span> được đào tạo trong giai đoạn 2019 – 2023</dt>
              </div>
              <div className={"rounded-2xl \x62order \x62order-lab-on-deep/\x310 \x62g-lab-on-deep/\x35 p-4 \x62ackdrop-blur"}>
                <dd className={"\x66ont-mono text-2xl font-semibold text-lab-lime sm:text-3xl"}>24/7</dd>
                <dt className={"mt-1 text-xs leading-5 \x74ext-lab-on-deep/\x370"}><span className="font-medium text-lab-on-deep">trợ giảng</span> là thủ khoa các trường THPT top đầu Hà Nội</dt>
              </div>
            </dl>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Các lớp đang tuyển sinh">
              <li className={"rounded-full \x62g-lab-on-deep/\x310 px-3 py-1 text-xs"}>KHTN 7 · 8 · 9</li>
              <li className={"rounded-full \x62g-lab-on-deep/\x310 px-3 py-1 text-xs"}>Lớp 10</li>
              <li className={"rounded-full \x62g-lab-on-deep/\x310 px-3 py-1 text-xs"}>Lớp 11</li>
              <li className={"rounded-full \x62g-lab-on-deep/\x310 px-3 py-1 text-xs"}>Lớp 12</li>
              <li className={"rounded-full \x62g-lab-on-deep/\x310 px-3 py-1 text-xs"}>Luyện thi ĐH · ĐGTD</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className={"group inline-flex h-12 items-center gap-2 rounded-full \x62g-lab-lime px-6 text-sm font-semibold text-lab-deep \x73hadow-xl \x73hadow-lab-lime/\x320 transition-transform \x68over:\x2dtranslate-y-0.\x35 \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-on-deep \x66ocus-visible:\x6futline-none \x6dotion-reduce:\x74ransform-none"} href={"https://www.vatlysieunham.edu.vn/?utm_source=vatly.ai&utm_medium=referral&utm_campaign=lab"} rel="noopener sponsored" target="_blank">Đăng ký tư vấn miễn phí<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-0.\x35 \x67roup-hover:\x2dtranslate-y-0.\x35"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
              <a className={"inline-flex h-12 items-center gap-2 rounded-full \x62order \x62order-lab-on-deep/\x320 px-5 text-sm font-medium transition-colors \x68over:\x62g-lab-on-deep/\x310 \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-lime \x66ocus-visible:\x6futline-none"} href="tel:+84888853399"><svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" /></svg>{" "}088 885 3399</a>
              <a className={"inline-flex size-12 items-center justify-center rounded-full \x62order \x62order-lab-on-deep/\x320 transition-colors \x68over:\x62g-lab-on-deep/\x310 \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-lime \x66ocus-visible:\x6futline-none"} aria-label="Fanpage Vật Lý Siêu Nhẩm" href="https://www.facebook.com/Vatlysieunham" rel="noopener" target="_blank">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="lab-reveal relative flex flex-col gap-5">
            <svg className={"absolute -top-2 right-0 hidden size-36 \x74ext-lab-lime/\x380 \x6cg:\x62lock"} viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="_S_1_" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <g className={"\x6frigin-center \x61nimate-lab-spin [transform-box:view-box]"}>
                <text className={"\x66ill-current \x66ont-mono text-[11px] tracking-[0.14em] uppercase"}>
                  <textPath {...({ href: "#_S_1_" } as any)}>Định hướng đúng · Truyền cảm hứng · Rồi mới dạy học · </textPath>
                </text>
              </g>
              <circle className={"fill-none \x73troke-current"} cx="100" cy="100" r="46" strokeDasharray="2 6" />
              <text className={"\x66ill-current text-[26px] font-bold tracking-tight"} x="100" y="108" textAnchor="middle">VLSN</text>
            </svg>
            <div className={"rounded-3xl \x62order \x62order-lab-on-deep/\x310 \x62g-lab-on-deep/\x35 p-6 \x62ackdrop-blur lg:mt-24"}>
              <h3 className="text-sm font-semibold tracking-wide text-lab-lime">Vì sao học sinh tin chọn?</h3>
              <ul className={"mt-4 \x73pace-y-3"}>
                <li className="flex gap-3 text-sm leading-6"><span className={"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full \x62g-lab-lime text-lab-deep"}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>Lộ trình cá nhân hóa sau bài kiểm tra đầu vào</li>
                <li className="flex gap-3 text-sm leading-6"><span className={"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full \x62g-lab-lime text-lab-deep"}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>Mất gốc? Kèm riêng miễn phí đến khi theo kịp lớp</li>
                <li className="flex gap-3 text-sm leading-6"><span className={"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full \x62g-lab-lime text-lab-deep"}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>Video bài giảng và livestream chữa câu vận dụng cao mỗi tuần</li>
                <li className="flex gap-3 text-sm leading-6"><span className={"mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full \x62g-lab-lime text-lab-deep"}><svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg></span>Phụ huynh theo dõi sát sao tình hình học tập của con</li>
              </ul>
            </div>
            <address className={"rounded-3xl \x62order \x62order-lab-on-deep/\x310 p-6 text-sm not-italic"}>
              <p className="text-xs font-semibold tracking-wide text-lab-lime">3 cơ sở tại Hà Nội</p>
              <ul className={"mt-3 \x73pace-y-2.\x35 \x74ext-lab-on-deep/\x380"}>
                <li className="flex gap-2.5"><svg className="mt-0.5 size-4 shrink-0 text-lab-lime" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>Tầng 3, số 10 Tạ Quang Bửu, Hai Bà Trưng, Hà Nội</li>
                <li className="flex gap-2.5"><svg className="mt-0.5 size-4 shrink-0 text-lab-lime" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>176 Xã Đàn 2, Đống Đa, Hà Nội</li>
                <li className="flex gap-2.5"><svg className="mt-0.5 size-4 shrink-0 text-lab-lime" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>Số 46, ngõ 30 Tạ Quang Bửu, Hai Bà Trưng, Hà Nội</li>
              </ul>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImportedSectionIUGS() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24" aria-labelledby="start-title">
      <div className={"lab-reveal relative grid items-center gap-10 overflow-hidden rounded-[2rem] \x62order \x62order-lab-line \x62g-lab-surface px-7 py-12 md:grid-cols-[1.2fr_1fr] md:px-14"}>
        <div className="lab-grid absolute inset-0 [mask-image:radial-gradient(80%_70%_at_50%_40%,rgb(0,0,0)_40%,rgba(0,0,0,0)_100%)]" aria-hidden="true" />
        <div className="relative">
          <p className={"\x66ont-mono text-[11px] tracking-[0.2em] text-lab-green uppercase"}>Mỗi câu hỏi là một thí nghiệm</p>
          <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-[-0.04em] text-balance sm:text-5xl" id="start-title">Điều gì sẽ xảy ra nếu…?</h2>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Một vài câu hỏi để bắt đầu">
            <li className={"rounded-full \x62order \x62order-lab-line \x62g-lab-paper px-3.5 py-1.5 text-sm text-lab-subtle transition-colors \x68over:\x62order-lab-green/\x340 hover:text-lab-green"}>Tăng tần số?</li>
            <li className={"rounded-full \x62order \x62order-lab-line \x62g-lab-paper px-3.5 py-1.5 text-sm text-lab-subtle transition-colors \x68over:\x62order-lab-green/\x340 hover:text-lab-green"}>Nén khí đẳng nhiệt?</li>
            <li className={"rounded-full \x62order \x62order-lab-line \x62g-lab-paper px-3.5 py-1.5 text-sm text-lab-subtle transition-colors \x68over:\x62order-lab-green/\x340 hover:text-lab-green"}>Dịch màn ra xa?</li>
            <li className={"rounded-full \x62order \x62order-lab-line \x62g-lab-paper px-3.5 py-1.5 text-sm text-lab-subtle transition-colors \x68over:\x62order-lab-green/\x340 hover:text-lab-green"}>Đổi bước sóng?</li>
          </ul>
          <p className="mt-6 max-w-md text-sm leading-7 text-lab-subtle">Câu trả lời không nằm ở cuối sách — nó nằm trong thí nghiệm bạn sắp tự tay chạy.</p>
          <a className={"inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 \x68as-[>\x73vg]:\x70x-4 group mt-8 h-12 rounded-full \x62g-lab-green px-6 text-lab-on-green \x73hadow-lg \x73hadow-lab-green/\x325 \x68over:\x62g-lab-green/\x390"} href="/mo-phong">Mở phòng thí nghiệm<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-0.\x35 \x67roup-hover:\x2dtranslate-y-0.\x35"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
        </div>
        <div className={"aspect-square w-full relative mx-auto hidden max-w-xs \x6dd:\x62lock"} aria-hidden="true">
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

function ImportedFooter() {
  return (
    <footer className={"\x62order-t \x62order-lab-line"}>
      <div className={"mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:px-8 \x6dd:\x66lex-row \x6dd:\x69tems-center \x6dd:\x6austify-between"}>
        <div>
          <a className={"group inline-flex min-h-11 items-center gap-2 \x72ounded text-sm font-semibold \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4 \x66ocus-visible:\x6futline-lab-green"} aria-label="VatLy.ai — Trang chủ" href="/">
            <div className="inline-flex items-center gap-2.5">
              <span className={"flex shrink-0 items-center justify-center \x62g-[#\x66bfaf6] \x73hadow-xs \x72ing-1 \x72ing-lab-line/\x340 transition-transform duration-200 \x67roup-hover:\x73cale-105 size-8 rounded-lg p-1"}>
                <img className="size-full object-contain" style={{ color: "transparent" }} alt="" loading="lazy" width="19" height="22" decoding="async" src="/site-assets/ff989603c215dec7-57cb04569c9a4790b0d0a4da1edbd171.png" />
              </span>
              <span className="flex flex-col text-left">
                <span className="block text-foreground text-sm font-semibold tracking-tight">VatLy.ai</span>
              </span>
            </div>
          </a>
          <p className="mt-1 text-xs text-lab-subtle">Một chút tò mò. Một thế giới để khám phá.</p>
          <p className="mt-2 text-xs text-lab-subtle">Đồng hành cùng <a className={"font-medium text-lab-green \x75nderline-offset-4 \x68over:\x75nderline \x66ocus-visible:\x72ounded \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-2 \x66ocus-visible:\x6futline-lab-green"} href={"https://www.vatlysieunham.edu.vn/?utm_source=vatly.ai&utm_medium=referral&utm_campaign=lab"} rel="noopener sponsored" target="_blank">Vật Lý Siêu Nhẩm</a> · Hotline 088 885 3399</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 text-xs text-lab-subtle" aria-label="Điều hướng cuối trang">
          <a className={"inline-flex min-h-11 items-center \x72ounded hover:text-lab-green \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4 \x66ocus-visible:\x6futline-lab-green"} href="/account-deletion">Xóa tài khoản</a>
          <a className={"inline-flex min-h-11 items-center \x72ounded hover:text-lab-green \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4 \x66ocus-visible:\x6futline-lab-green"} href="/#phuong-phap">Phương pháp</a>
          <a className={"inline-flex min-h-11 items-center \x72ounded hover:text-lab-green \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4 \x66ocus-visible:\x6futline-lab-green"} href="/#cach-hoc">Cách học</a>
          <a className={"inline-flex min-h-11 items-center \x72ounded hover:text-lab-green \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4 \x66ocus-visible:\x6futline-lab-green"} href="/mo-phong">Mô phỏng</a>
        </nav>
        <p className={"\x66ont-mono text-[10px] text-lab-subtle"}>© 2026 VatLy.ai</p>
      </div>
    </footer>
  );
}
