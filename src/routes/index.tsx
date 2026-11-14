import type { CSSProperties } from "react";
import { Fragment } from "react";
import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import capturedCSS from "../styles/site.css?raw";

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
  const [activeSlide0, setActiveSlide0] = useState(0);
  const [sampleLessonOpen, setSampleLessonOpen] = useState(false);
  const [wavePlaying, setWavePlaying] = useState(true);
  const [wavelength, setWavelength] = useState(1.6);
  const [sources, setSources] = useState({ first: { x: 9, y: 9 }, second: { x: 15, y: 9 } });
  const draggingSource = useRef<"first" | "second" | null>(null);
  const carouselContent0 = (<>
{activeSlide0 === 0 && <Fragment key={0}>
<div className={"-mx-5 flex \x73nap-x gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:max-h-[38rem] \x6cg:\x66lex-col lg:overflow-y-auto lg:px-0 lg:pr-2"} role="tablist" aria-label="Chuyên đề" aria-orientation="vertical">
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-lab-green/\x340 \x62g-lab-surface \x73hadow-lg \x73hadow-lab-green/\x35"} onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveSlide0(0); }} id="_R_2lbriuplb_-tab-lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly" type="button" role="tab" aria-selected="true" aria-controls="_R_2lbriuplb_-panel" tabIndex={0} data-site-import-carousel-tab="0-0">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 10 · Chủ đề 1<span>19</span></span>
    <span className="mt-1 block text-sm font-semibold text-lab-green">GIỚI THIỆU MỤC ĐÍCH HỌC TẬP MÔN VẬT LÝ</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-1">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 10 · Chủ đề 2<span>137</span></span>
    <span className="mt-1 block text-sm font-semibold">MÔ TẢ CHUYỂN ĐỘNG</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-10/co-hoc-phan-1/chu-de-3-luc-va-chuyen-dong" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-2">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 10 · Chủ đề 3<span>89</span></span>
    <span className="mt-1 block text-sm font-semibold">LỰC VÀ CHUYỂN ĐỘNG</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-11/song/chu-de-1-song-co" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-3">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 11 · Chủ đề 1<span>47</span></span>
    <span className="mt-1 block text-sm font-semibold">SÓNG CƠ</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-11/song/chu-de-2-song-dien-tu" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-4">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 11 · Chủ đề 2<span>5</span></span>
    <span className="mt-1 block text-sm font-semibold">SÓNG ĐIỆN TỪ</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-11/song/chu-de-3-giao-thoa-song" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-5">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 11 · Chủ đề 3<span>71</span></span>
    <span className="mt-1 block text-sm font-semibold">GIAO THOA SÓNG</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-11/song/chu-de-4-song-dung" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-6">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 11 · Chủ đề 4<span>39</span></span>
    <span className="mt-1 block text-sm font-semibold">SÓNG DỪNG</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-12/chat-khi" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-7">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 12 · Chuyên đề<span>159</span></span>
    <span className="mt-1 block text-sm font-semibold">CHẤT KHÍ</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-12/nhiet-hoc" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-8">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 12 · Chuyên đề<span>80</span></span>
    <span className="mt-1 block text-sm font-semibold">NHIỆT HỌC</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveSlide0(1); }} id="_R_2lbriuplb_-tab-lop-12/tu-truong" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-9">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 12 · Chuyên đề<span>131</span></span>
    <span className="mt-1 block text-sm font-semibold">TỪ TRƯỜNG</span>
  </button>
</div>
<div className={"min-w-0 rounded-[1.75rem] \x62order \x62order-lab-line \x62g-lab-surface p-4 \x6dotion-safe:\x61nimate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:p-5"} id="_R_2lbriuplb_-panel" role="tabpanel" aria-labelledby="_R_2lbriuplb_-tab-lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly">
  <div className={"relative aspect-[16/10] overflow-hidden rounded-2xl \x62order \x62order-lab-line \x62g-lab-paper"}>
    {sampleLessonOpen ? (
      <iframe
        className="absolute inset-0 size-full border-0 bg-background"
        src="https://vatly.ai/api/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly"
        title="Bài 1. Làm quen với môn Vật lý — Lý thuyết"
        sandbox="allow-scripts allow-popups allow-forms allow-pointer-lock"
        allow="autoplay"
      />
    ) : (
    <button className={"group absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden \x62g-lab-deep text-lab-on-deep \x6futline-none \x66ocus-visible:\x72ing-4 \x66ocus-visible:\x72ing-lab-lime \x66ocus-visible:\x72ing-inset"} type="button" aria-label="Chạy thử ngay tại đây" onClick={() => setSampleLessonOpen(true)}>
      <span className="lab-grid absolute inset-0 opacity-20" aria-hidden="true" />
      <span className={"absolute size-72 \x61nimate-lab-spin rounded-full \x62order \x62order-dashed \x62order-lab-lime/\x325"} aria-hidden="true" />
      <span className={"absolute size-[26rem] \x61nimate-lab-spin-reverse rounded-full \x62order \x62order-lab-lime/\x310"} aria-hidden="true" />
      <span className="relative flex size-20 items-center justify-center">
        <span className={"absolute inset-0 \x61nimate-lab-pulse rounded-full \x62g-lab-lime/\x340"} aria-hidden="true" />
        <span className={"relative flex size-16 items-center justify-center rounded-full \x62g-lab-lime text-lab-deep \x73hadow-2xl transition-transform \x67roup-hover:\x73cale-110 \x6dotion-reduce:\x74ransform-none"}>
          <svg className={"ml-1 size-7 \x66ill-current"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
          </svg>
        </span>
      </span>
      <span className="relative max-w-sm px-6 text-center">
        <span className="block text-xs tracking-[0.2em] text-lab-lime uppercase">Chạy thử ngay tại đây</span>
        <span className="mt-2 block text-lg leading-snug font-semibold">Làm quen với môn Vật lý</span>
      </span>
    </button>
    )}
  </div>
  <div className="mt-5 flex flex-wrap items-end justify-between gap-4 px-1">
    <div className="min-w-0">
      <h3 className="text-xl font-semibold tracking-tight">GIỚI THIỆU MỤC ĐÍCH HỌC TẬP MÔN VẬT LÝ</h3>
      <svg className="h-1.5 overflow-hidden rounded-full mt-3 w-60" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="3 Lý thuyết, 10 Ví dụ, 3 Bài tập, 3 Luyện tập">
        <rect className={"\x66ill-kind-theory"} x="0" y="0" width="15.505263157894737" height="4" rx="1" />
        <rect className={"\x66ill-kind-example"} x="16.105263157894736" y="0" width="51.68421052631579" height="4" rx="1" />
        <rect className={"\x66ill-kind-exercise"} x="68.38947368421051" y="0" width="15.505263157894737" height="4" rx="1" />
        <rect className={"\x66ill-kind-practice"} x="84.49473684210524" y="0" width="15.505263157894737" height="4" rx="1" />
      </svg>
    </div>
    <a className={"group inline-flex min-h-10 items-center gap-1.5 rounded-full \x62g-lab-green px-4 text-sm font-medium text-lab-on-green transition-colors \x68over:\x62g-lab-green/\x390 \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x72ing-offset-2 \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly">Học trọn chuyên đề (19 bài)<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
  </div>
  <ul className={"mt-5 grid gap-2 \x62order-t \x62order-lab-line pt-4 sm:grid-cols-2"}>
    <li>
      <a className={"group flex h-full items-start gap-3 rounded-xl p-2.5 text-sm transition-colors \x68over:\x62g-lab-tint \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/2-vd1-vat-ly-trong-cac-linh-vuc">
        <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312 mt-0.5"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />VD1</span>
        <span className={"\x6cine-clamp-2 flex-1"}>Vật lý trong các lĩnh vực</span>
        <svg className={"mt-0.5 size-4 shrink-0 text-lab-subtle transition-colors \x67roup-hover:\x74ext-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </li>
    <li>
      <a className={"group flex h-full items-start gap-3 rounded-xl p-2.5 text-sm transition-colors \x68over:\x62g-lab-tint \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/2-vd2-doi-tuong-nghien-cuu-cua-cac-phan-nganh">
        <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312 mt-0.5"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />VD2</span>
        <span className={"\x6cine-clamp-2 flex-1"}>Đối tượng nghiên cứu của các phân ngành</span>
        <svg className={"mt-0.5 size-4 shrink-0 text-lab-subtle transition-colors \x67roup-hover:\x74ext-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </li>
    <li>
      <a className={"group flex h-full items-start gap-3 rounded-xl p-2.5 text-sm transition-colors \x68over:\x62g-lab-tint \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-3-sai-so-trong-phep-do/2-vd1-nguyen-nhan-gay-sai-so">
        <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312 mt-0.5"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />VD1</span>
        <span className={"\x6cine-clamp-2 flex-1"}>Nguyên nhân gây sai số</span>
        <svg className={"mt-0.5 size-4 shrink-0 text-lab-subtle transition-colors \x67roup-hover:\x74ext-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </li>
    <li>
      <a className={"group flex h-full items-start gap-3 rounded-xl p-2.5 text-sm transition-colors \x68over:\x62g-lab-tint \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-3-sai-so-trong-phep-do/2-vd2-sai-so-dung-cu-cua-hai-thuoc">
        <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312 mt-0.5"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />VD2</span>
        <span className={"\x6cine-clamp-2 flex-1"}>Sai số dụng cụ của hai thước</span>
        <svg className={"mt-0.5 size-4 shrink-0 text-lab-subtle transition-colors \x67roup-hover:\x74ext-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </li>
  </ul>
</div>
</Fragment>}
{activeSlide0 === 1 && <Fragment key={1}>
<div className={"-mx-5 flex \x73nap-x gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:max-h-[38rem] \x6cg:\x66lex-col lg:overflow-y-auto lg:px-0 lg:pr-2"} role="tablist" aria-label="Chuyên đề" aria-orientation="vertical">
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveSlide0(0); }} id="_R_2lbriuplb_-tab-lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-0">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 10 · Chủ đề 1<span>19</span></span>
    <span className="mt-1 block text-sm font-semibold">GIỚI THIỆU MỤC ĐÍCH HỌC TẬP MÔN VẬT LÝ</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-1">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 10 · Chủ đề 2<span>137</span></span>
    <span className="mt-1 block text-sm font-semibold">MÔ TẢ CHUYỂN ĐỘNG</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-10/co-hoc-phan-1/chu-de-3-luc-va-chuyen-dong" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-2">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 10 · Chủ đề 3<span>89</span></span>
    <span className="mt-1 block text-sm font-semibold">LỰC VÀ CHUYỂN ĐỘNG</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-11/song/chu-de-1-song-co" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-3">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 11 · Chủ đề 1<span>47</span></span>
    <span className="mt-1 block text-sm font-semibold">SÓNG CƠ</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-11/song/chu-de-2-song-dien-tu" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-4">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 11 · Chủ đề 2<span>5</span></span>
    <span className="mt-1 block text-sm font-semibold">SÓNG ĐIỆN TỪ</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-11/song/chu-de-3-giao-thoa-song" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-5">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 11 · Chủ đề 3<span>71</span></span>
    <span className="mt-1 block text-sm font-semibold">GIAO THOA SÓNG</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-11/song/chu-de-4-song-dung" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-6">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 11 · Chủ đề 4<span>39</span></span>
    <span className="mt-1 block text-sm font-semibold">SÓNG DỪNG</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-12/chat-khi" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-7">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 12 · Chuyên đề<span>159</span></span>
    <span className="mt-1 block text-sm font-semibold">CHẤT KHÍ</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-transparent \x68over:\x62g-lab-surface/\x370"} id="_R_2lbriuplb_-tab-lop-12/nhiet-hoc" type="button" role="tab" aria-selected="false" aria-controls="_R_2lbriuplb_-panel" tabIndex={-1} data-site-import-carousel-tab="0-8">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 12 · Chuyên đề<span>80</span></span>
    <span className="mt-1 block text-sm font-semibold">NHIỆT HỌC</span>
  </button>
  <button className={"w-64 shrink-0 \x73nap-start rounded-2xl \x62order px-4 py-3 text-left transition-all \x6futline-none \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green lg:w-full \x62order-lab-green/\x340 \x62g-lab-surface \x73hadow-lg \x73hadow-lab-green/\x35"} onClick={event => { event.preventDefault(); event.stopPropagation(); setActiveSlide0(1); }} id="_R_2lbriuplb_-tab-lop-12/tu-truong" type="button" role="tab" aria-selected="true" aria-controls="_R_2lbriuplb_-panel" tabIndex={0} data-site-import-carousel-tab="0-9">
    <span className={"flex items-center justify-between \x66ont-mono text-[10px] tracking-wider text-lab-subtle uppercase"}>Lớp 12 · Chuyên đề<span>131</span></span>
    <span className="mt-1 block text-sm font-semibold text-lab-green">TỪ TRƯỜNG</span>
  </button>
</div>
<div className={"min-w-0 rounded-[1.75rem] \x62order \x62order-lab-line \x62g-lab-surface p-4 \x6dotion-safe:\x61nimate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:p-5"} id="_R_2lbriuplb_-panel" role="tabpanel" aria-labelledby="_R_2lbriuplb_-tab-lop-12/tu-truong">
  <div className={"relative aspect-[16/10] overflow-hidden rounded-2xl \x62order \x62order-lab-line \x62g-lab-paper"}>
    <button className={"group absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden \x62g-lab-deep text-lab-on-deep \x6futline-none \x66ocus-visible:\x72ing-4 \x66ocus-visible:\x72ing-lab-lime \x66ocus-visible:\x72ing-inset"} type="button">
      <span className="lab-grid absolute inset-0 opacity-20" aria-hidden="true" />
      <span className={"absolute size-72 \x61nimate-lab-spin rounded-full \x62order \x62order-dashed \x62order-lab-lime/\x325"} aria-hidden="true" />
      <span className={"absolute size-[26rem] \x61nimate-lab-spin-reverse rounded-full \x62order \x62order-lab-lime/\x310"} aria-hidden="true" />
      <span className="relative flex size-20 items-center justify-center">
        <span className={"absolute inset-0 \x61nimate-lab-pulse rounded-full \x62g-lab-lime/\x340"} aria-hidden="true" />
        <span className={"relative flex size-16 items-center justify-center rounded-full \x62g-lab-lime text-lab-deep \x73hadow-2xl transition-transform \x67roup-hover:\x73cale-110 \x6dotion-reduce:\x74ransform-none"}>
          <svg className={"ml-1 size-7 \x66ill-current"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
          </svg>
        </span>
      </span>
      <span className="relative max-w-sm px-6 text-center">
        <span className="block text-xs tracking-[0.2em] text-lab-lime uppercase">Chạy thử ngay tại đây</span>
        <span className="mt-2 block text-lg leading-snug font-semibold">Từ trường - Cảm ứng từ</span>
      </span>
    </button>
  </div>
  <div className="mt-5 flex flex-wrap items-end justify-between gap-4 px-1">
    <div className="min-w-0">
      <h3 className="text-xl font-semibold tracking-tight">TỪ TRƯỜNG</h3>
      <svg className="h-1.5 overflow-hidden rounded-full mt-3 w-60" viewBox="0 0 100 4" preserveAspectRatio="none" role="img" aria-label="13 Lý thuyết, 67 Ví dụ, 15 Bài tập, 36 Luyện tập">
        <rect className={"\x66ill-kind-theory"} x="0" y="0" width="9.745038167938931" height="4" rx="1" />
        <rect className={"\x66ill-kind-example"} x="10.345038167938931" y="0" width="50.22442748091603" height="4" rx="1" />
        <rect className={"\x66ill-kind-exercise"} x="61.16946564885496" y="0" width="11.244274809160306" height="4" rx="1" />
        <rect className={"\x66ill-kind-practice"} x="73.01374045801526" y="0" width="26.986259541984737" height="4" rx="1" />
      </svg>
    </div>
    <a className={"group inline-flex min-h-10 items-center gap-1.5 rounded-full \x62g-lab-green px-4 text-sm font-medium text-lab-on-green transition-colors \x68over:\x62g-lab-green/\x390 \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x72ing-offset-2 \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-1-tu-truong-cam-ung-tu/1-ly-thuyet-tu-truong-cam-ung-tu">Học trọn chuyên đề (131 bài)<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-0.\x35"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
  </div>
  <ul className={"mt-5 grid gap-2 \x62order-t \x62order-lab-line pt-4 sm:grid-cols-2"}>
    <li>
      <a className={"group flex h-full items-start gap-3 rounded-xl p-2.5 text-sm transition-colors \x68over:\x62g-lab-tint \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-1-tu-truong-cam-ung-tu/2-vd1-cam-ung-tu-cua-day-dan-thang">
        <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312 mt-0.5"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />VD1</span>
        <span className={"\x6cine-clamp-2 flex-1"}>Cảm ứng từ của dây dẫn thẳng</span>
        <svg className={"mt-0.5 size-4 shrink-0 text-lab-subtle transition-colors \x67roup-hover:\x74ext-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </li>
    <li>
      <a className={"group flex h-full items-start gap-3 rounded-xl p-2.5 text-sm transition-colors \x68over:\x62g-lab-tint \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-1-tu-truong-cam-ung-tu/2-vd2-cam-ung-tu-cua-day-vuong-goc-mat-phang-hinh-ve">
        <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312 mt-0.5"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />VD2</span>
        <span className={"\x6cine-clamp-2 flex-1"}>Cảm ứng từ của dây vuông góc mặt phẳng hình vẽ</span>
        <svg className={"mt-0.5 size-4 shrink-0 text-lab-subtle transition-colors \x67roup-hover:\x74ext-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </li>
    <li>
      <a className={"group flex h-full items-start gap-3 rounded-xl p-2.5 text-sm transition-colors \x68over:\x62g-lab-tint \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-1-tu-truong-cam-ung-tu/2-vd3-duong-suc-tu-cua-dong-dien-tron">
        <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312 mt-0.5"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />VD3</span>
        <span className={"\x6cine-clamp-2 flex-1"}>Đường sức từ của dòng điện tròn</span>
        <svg className={"mt-0.5 size-4 shrink-0 text-lab-subtle transition-colors \x67roup-hover:\x74ext-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </li>
    <li>
      <a className={"group flex h-full items-start gap-3 rounded-xl p-2.5 text-sm transition-colors \x68over:\x62g-lab-tint \x66ocus-visible:\x72ing-2 \x66ocus-visible:\x72ing-lab-green \x66ocus-visible:\x6futline-none"} href="/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-1-tu-truong-cam-ung-tu/2-vd4-duong-suc-tu-cua-ong-day">
        <span className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-1.5 py-0.5 \x66ont-mono text-[10px] leading-4 font-medium \x74ext-foreground/\x380 \x62g-kind-example/\x312 mt-0.5"}><span className={"size-1.5 rounded-full \x62g-kind-example"} aria-hidden="true" />VD4</span>
        <span className={"\x6cine-clamp-2 flex-1"}>Đường sức từ của ống dây</span>
        <svg className={"mt-0.5 size-4 shrink-0 text-lab-subtle transition-colors \x67roup-hover:\x74ext-lab-green"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </li>
  </ul>
</div>
</Fragment>}
</>);
  return (
    <>
      <style>{capturedCSS}</style>
      <div className={"flex min-h-screen w-full flex-col \x62g-lab-paper text-lab-ink"}>
        <a className={"\x73r-only z-50 rounded-lg \x62g-lab-green px-4 py-3 text-lab-on-green \x66ocus:\x6eot-sr-only \x66ocus:\x66ixed focus:top-3 focus:left-3"} href="#main-content">Bỏ qua điều hướng</a>
        <ImportedHeader />
        <main className="flex-1" id="main-content">
          <ImportedSectionNgHCThu />
          <div className={"overflow-hidden \x62order-b \x62order-lab-line \x62g-lab-deep py-4 text-lab-on-deep [mask-image:linear-gradient(90deg,rgba(0,0,0,0),rgb(0,0,0)_10%,rgb(0,0,0)_90%,rgba(0,0,0,0))]"} aria-hidden="true">
            <div className={"flex w-max \x61nimate-lab-marquee hover:[animation-play-state:paused]"}>
              <ul className="flex shrink-0 items-center">
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className="text-sm font-semibold tracking-[0.2em] text-lab-lime uppercase">Phân tích</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>v = λf</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>d₂ − d₁ = kλ</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>i = λD / a</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className="text-sm font-semibold tracking-[0.2em] text-lab-lime uppercase">Bản chất</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>pV = nRT</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>ΔU = A + Q</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>p₁V₁ = p₂V₂</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className="text-sm font-semibold tracking-[0.2em] text-lab-lime uppercase">Tái hiện</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>ℓ = kλ / 2</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>u = A cos(ωt − 2πx/λ)</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>Wđ = 3kT / 2</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className="text-sm font-semibold tracking-[0.2em] text-lab-lime uppercase">Vận dụng</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>L = 10 lg(I / I₀)</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>V / T = const</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
              </ul>
              <ul className="flex shrink-0 items-center">
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className="text-sm font-semibold tracking-[0.2em] text-lab-lime uppercase">Phân tích</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>v = λf</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>d₂ − d₁ = kλ</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>i = λD / a</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className="text-sm font-semibold tracking-[0.2em] text-lab-lime uppercase">Bản chất</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>pV = nRT</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>ΔU = A + Q</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>p₁V₁ = p₂V₂</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className="text-sm font-semibold tracking-[0.2em] text-lab-lime uppercase">Tái hiện</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>ℓ = kλ / 2</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>u = A cos(ωt − 2πx/λ)</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>Wđ = 3kT / 2</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className="text-sm font-semibold tracking-[0.2em] text-lab-lime uppercase">Vận dụng</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>L = 10 lg(I / I₀)</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
                <li className="flex items-center gap-8 pr-8 whitespace-nowrap">
                  <span className={"\x66ont-mono text-sm \x74ext-lab-on-deep/\x380"}>V / T = const</span>
                  <svg className={"size-3.5 \x74ext-lab-lime/\x350"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                </li>
              </ul>
            </div>
          </div>
          <ImportedSectionBaTrCT />
          <ImportedSectionBTHC />
          <section className={"mx-auto max-w-6xl \x73croll-mt-20 px-5 py-16 sm:px-8 md:py-24"} id="giao-trinh" aria-labelledby="showcase-title">
            <div className="lab-reveal mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className={"\x66ont-mono text-[11px] tracking-[0.2em] text-lab-green uppercase"}>Ví dụ mô phỏng</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl" id="showcase-title">Chọn chuyên đề. Bấm chạy.</h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-lab-subtle">Mô phỏng thật từ giáo trình, chạy ngay trong trang. Mỗi chuyên đề mở đầu bằng lý thuyết, tiếp nối bằng các ví dụ được phân tích từng bước.</p>
              </div>
              <a className={"group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-lab-green \x75nderline-offset-4 \x68over:\x75nderline \x66ocus-visible:\x72ounded \x66ocus-visible:\x6futline-2 \x66ocus-visible:\x6futline-offset-4 \x66ocus-visible:\x6futline-lab-green"} href="/mo-phong">Xem cả 777 mô phỏng<svg className={"size-4 transition-transform \x67roup-hover:\x74ranslate-x-1"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
            </div>
            <div className="grid gap-6 lg:grid-cols-[19rem_1fr]" data-site-import-carousel-root="1">{carouselContent0}</div>
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
      setAccountOpen(false);
      setNavOpen(false);
      if (navOpen) navTriggerRef.current?.focus();
      else accountTriggerRef.current?.focus();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
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

  const closeMenus = () => {
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
              onClick={() => {
                setAccountOpen((open) => !open);
                setNavOpen(false);
              }}
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
              onClick={() => {
                setNavOpen((open) => !open);
                setAccountOpen(false);
              }}
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
          <section className={"overflow-hidden rounded-[1.75rem] \x62order \x62order-lab-line \x62g-lab-surface \x73hadow-[\x30_30px_80px_-30px_var(\x2d-lab-shadow)]"} aria-labelledby="_R_2k5briuplb_-title" data-site-import-carousel-root="0">
            <header className="flex items-center justify-between gap-3 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className={"flex size-8 items-center justify-center rounded-lg \x62g-lab-tint text-lab-green"}>
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                  </svg>
                </span>
                <h2 className="text-sm font-semibold" id="_R_2k5briuplb_-title">Giao thoa hai nguồn kết hợp</h2>
              </div>
              <span className={"flex shrink-0 items-center gap-1.5 rounded-full \x62g-lab-tint px-2.5 py-1 \x66ont-mono text-[10px] whitespace-nowrap text-lab-green"}><span className={"size-1.5 \x61nimate-pulse rounded-full \x62g-lab-green"} aria-hidden="true" />TƯƠNG TÁC</span>
            </header>
            <div className={"relative aspect-[4/3] \x62order-y \x62order-lab-line"}>
              <picture style={{ display: "contents" }}>
                <source media="(max-width: 767px)" srcSet="data:image/webp;base64,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" />
                <img className="absolute inset-0 size-full" style={{ width: "100%", height: "100%" }} role="img" aria-label="Mặt nước giao thoa: hai nguồn cách nhau 6,0 cm, bước sóng 1,6 cm" width="519" height="387" src="data:image/webp;base64,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" data-site-import-static-fallback="canvas" alt="" />
              </picture>
              <svg className="absolute inset-0 size-full cursor-crosshair" viewBox="0 0 24 18">
                <line className={"\x73troke-lab-ink/\x350"} x1="9" y1="9" x2="15" y2="9" strokeWidth="0.06" strokeDasharray="0.25 0.2" />
                <circle className={"\x66ill-lab-ink \x73troke-lab-lime"} cx="9.6" cy="9" r="0.16" strokeWidth="0.06" />
                <circle className={"\x66ill-lab-ink \x73troke-lab-lime"} cx="10.4" cy="9" r="0.16" strokeWidth="0.06" />
                <circle className={"\x66ill-lab-ink \x73troke-lab-lime"} cx="11.2" cy="9" r="0.16" strokeWidth="0.06" />
                <circle className={"\x66ill-lab-ink \x73troke-lab-lime"} cx="12" cy="9" r="0.16" strokeWidth="0.06" />
                <circle className={"\x66ill-lab-ink \x73troke-lab-lime"} cx="12.8" cy="9" r="0.16" strokeWidth="0.06" />
                <circle className={"\x66ill-lab-ink \x73troke-lab-lime"} cx="13.6" cy="9" r="0.16" strokeWidth="0.06" />
                <circle className={"\x66ill-lab-ink \x73troke-lab-lime"} cx="14.4" cy="9" r="0.16" strokeWidth="0.06" />
                <g className={"cursor-grab touch-none \x6futline-none active:cursor-grabbing [&:\x66ocus-visible>\x63ircle:\x6cast-of-type]:\x73troke-lab-lime"} role="button" tabIndex={0} aria-label="Nguồn S₁ — kéo hoặc dùng phím mũi tên để di chuyển">
                  <circle className={"\x6frigin-center \x61nimate-lab-pulse \x66ill-lab-lime/\x360 [transform-box:fill-box]"} cx="9" cy="9" r="0.7" />
                  <circle className={"\x66ill-lab-deep \x73troke-lab-surface"} cx="9" cy="9" r="0.5" strokeWidth="0.14" />
                  <text className={"\x66ill-lab-ink \x66ont-mono text-[0.75px] font-bold"} x="9" y="8.1" textAnchor="middle">S₁</text>
                </g>
                <g className={"cursor-grab touch-none \x6futline-none active:cursor-grabbing [&:\x66ocus-visible>\x63ircle:\x6cast-of-type]:\x73troke-lab-lime"} role="button" tabIndex={0} aria-label="Nguồn S₂ — kéo hoặc dùng phím mũi tên để di chuyển">
                  <circle className={"\x6frigin-center \x61nimate-lab-pulse \x66ill-lab-lime/\x360 [transform-box:fill-box]"} cx="15" cy="9" r="0.7" />
                  <circle className={"\x66ill-lab-deep \x73troke-lab-surface"} cx="15" cy="9" r="0.5" strokeWidth="0.14" />
                  <text className={"\x66ill-lab-ink \x66ont-mono text-[0.75px] font-bold"} x="15" y="8.1" textAnchor="middle">S₂</text>
                </g>
              </svg>
              <p className={"pointer-events-none absolute top-3 left-3 rounded-full \x62g-lab-surface/\x385 px-2.5 py-1 text-[10px] text-lab-subtle \x62ackdrop-blur"}>Kéo S₁, S₂ · rê chuột để đo</p>
            </div>
            <div className={"grid gap-3 \x62order-t \x62order-lab-line px-5 py-4 text-xs sm:grid-cols-[auto_1fr] \x73m:\x69tems-center"}>
              <p className={"flex items-baseline gap-2 rounded-xl \x62g-lab-tint px-3 py-2"}>
                <span className={"\x66ont-mono text-2xl font-semibold text-lab-green"}>7</span>
                <span className="leading-tight text-lab-subtle">cực đại trên S₁S₂<span className={"block \x66ont-mono text-[10px]"}>S₁S₂ = 6,0 cm · λ = 1,6 cm</span></span>
              </p>
              <p className="min-h-10 leading-5 text-lab-subtle" aria-live="polite">Rê chuột hoặc chạm vào mặt nước để phân tích điểm M. Cực đại khi <span className={"\x66ont-mono"}>d₂ − d₁ = kλ</span>.</p>
            </div>
            <div className={"flex items-center gap-3 \x62order-t \x62order-lab-line px-5 py-3"}>
              <label className="shrink-0 text-xs font-medium" htmlFor="_R_2k5briuplb_-lambda">Bước sóng <span className={"\x66ont-mono text-lab-green"}>λ</span></label>
              <input className={"lab-range h-8 min-w-0 flex-1 cursor-pointer \x61ccent-lab-green"} id="_R_2k5briuplb_-lambda" type="range" min="0.8" max="3.2" step="0.2" aria-valuetext="1,6 xentimét" defaultValue="1.6" />
              <output className={"w-14 text-right \x66ont-mono text-xs text-lab-green"} htmlFor="_R_2k5briuplb_-lambda">1,6 cm</output>
              <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-9 text-lab-green \x68over:\x62g-lab-tint"} aria-label="Chạy sóng" aria-pressed="true">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              </button>
              <button className={"inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all \x6futline-none \x66ocus-visible:\x62order-ring \x66ocus-visible:\x72ing-[\x33px] \x66ocus-visible:\x72ing-ring/\x350 \x64isabled:\x70ointer-events-none disabled:opacity-50 \x61ria-invalid:\x62order-destructive \x61ria-invalid:\x72ing-destructive/\x320 \x64ark:\x61ria-invalid:\x72ing-destructive/\x340 [&\x5fsvg]:\x70ointer-events-none [&\x5fsvg]:\x73hrink-0 [&\x5fsvg:\x6eot([\x63lass*='\x73ize-'])]:\x73ize-4 hover:text-accent-foreground \x64ark:\x68over:\x62g-accent/\x350 size-9 text-lab-subtle \x68over:\x62g-lab-tint"} aria-label="Đặt lại thí nghiệm">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            </div>
          </section>
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
