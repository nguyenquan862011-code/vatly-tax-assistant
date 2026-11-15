import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, ArrowRight, RotateCcw, Maximize2, ExternalLink } from "lucide-react";

export interface ShowcaseTopic {
  id: string;
  badge: string;
  count: number;
  title: string;
  sampleLessonName: string;
  sampleLessonPath: string;
  simulationUrl: string;
  theory: number;
  example: number;
  exercise: number;
  practice: number;
}

export const SHOWCASE_TOPICS: ShowcaseTopic[] = [
  {
    id: "lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly",
    badge: "Lớp 10 · Chủ đề 1",
    count: 19,
    title: "GIỚI THIỆU MỤC ĐÍCH HỌC TẬP MÔN VẬT LÝ",
    sampleLessonName: "Làm quen với môn Vật lý",
    sampleLessonPath:
      "lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly",
    theory: 3,
    example: 10,
    exercise: 3,
    practice: 3,
  },
  {
    id: "lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong",
    badge: "Lớp 10 · Chủ đề 2",
    count: 137,
    title: "MÔ TẢ CHUYỂN ĐỘNG",
    sampleLessonName: "Độ dịch chuyển - Quãng đường đi được",
    sampleLessonPath:
      "lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong/bai-1-do-dich-chuyen-quang-duong-di-duoc/1-ly-thuyet-do-dich-chuyen-quang-duong-di-duoc",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-10/co-hoc-phan-1/chu-de-2-mo-ta-chuyen-dong/bai-1-do-dich-chuyen-quang-duong-di-duoc/1-ly-thuyet-do-dich-chuyen-quang-duong-di-duoc",
    theory: 6,
    example: 40,
    exercise: 9,
    practice: 82,
  },
  {
    id: "lop-10/co-hoc-phan-1/chu-de-3-luc-va-chuyen-dong",
    badge: "Lớp 10 · Chủ đề 3",
    count: 89,
    title: "LỰC VÀ CHUYỂN ĐỘNG",
    sampleLessonName: "Tổng hợp và phân tích lực",
    sampleLessonPath:
      "lop-10/co-hoc-phan-1/chu-de-3-luc-va-chuyen-dong/bai-1-tong-hop-va-phan-tich-luc/1-ly-thuyet-tong-hop-va-phan-tich-luc",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-10/co-hoc-phan-1/chu-de-3-luc-va-chuyen-dong/bai-1-tong-hop-va-phan-tich-luc/1-ly-thuyet-tong-hop-va-phan-tich-luc",
    theory: 4,
    example: 52,
    exercise: 6,
    practice: 27,
  },
  {
    id: "lop-11/song/chu-de-1-song-co",
    badge: "Lớp 11 · Chủ đề 1",
    count: 47,
    title: "SÓNG CƠ",
    sampleLessonName: "Mô tả sóng",
    sampleLessonPath: "lop-11/song/chu-de-1-song-co/bai-1-mo-ta-song/1-ly-thuyet-mo-ta-song",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-11/song/chu-de-1-song-co/bai-1-mo-ta-song/1-ly-thuyet-mo-ta-song",
    theory: 3,
    example: 18,
    exercise: 5,
    practice: 21,
  },
  {
    id: "lop-11/song/chu-de-2-song-dien-tu",
    badge: "Lớp 11 · Chủ đề 2",
    count: 5,
    title: "SÓNG ĐIỆN TỪ",
    sampleLessonName: "Sóng điện từ",
    sampleLessonPath:
      "lop-11/song/chu-de-2-song-dien-tu/bai-1-song-dien-tu/1-ly-thuyet-song-dien-tu",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-11/song/chu-de-2-song-dien-tu/bai-1-song-dien-tu/1-ly-thuyet-song-dien-tu",
    theory: 1,
    example: 0,
    exercise: 1,
    practice: 3,
  },
  {
    id: "lop-11/song/chu-de-3-giao-thoa-song",
    badge: "Lớp 11 · Chủ đề 3",
    count: 71,
    title: "GIAO THOA SÓNG",
    sampleLessonName: "Giao thoa sóng cơ",
    sampleLessonPath:
      "lop-11/song/chu-de-3-giao-thoa-song/bai-1-giao-thoa-song-co/1-ly-thuyet-giao-thoa-song-co",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-11/song/chu-de-3-giao-thoa-song/bai-1-giao-thoa-song-co/1-ly-thuyet-giao-thoa-song-co",
    theory: 4,
    example: 41,
    exercise: 6,
    practice: 20,
  },
  {
    id: "lop-11/song/chu-de-4-song-dung",
    badge: "Lớp 11 · Chủ đề 4",
    count: 39,
    title: "SÓNG DỪNG",
    sampleLessonName: "Sóng dừng",
    sampleLessonPath: "lop-11/song/chu-de-4-song-dung/bai-1-song-dung/1-ly-thuyet-song-dung",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-11/song/chu-de-4-song-dung/bai-1-song-dung/1-ly-thuyet-song-dung",
    theory: 1,
    example: 29,
    exercise: 2,
    practice: 7,
  },
  {
    id: "lop-12/chat-khi/chu-de-1-chat-khi",
    badge: "Lớp 12 · Chuyên đề",
    count: 159,
    title: "CHẤT KHÍ",
    sampleLessonName: "Thuyết động học phân tử khí lí tưởng",
    sampleLessonPath:
      "lop-12/chat-khi/chu-de-1-chat-khi/bai-1-thuyet-dong-hoc-phan-tu-khi-ly-tuong/1-ly-thuyet-thuyet-dong-hoc-phan-tu-khi-ly-tuong",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-12/chat-khi/chu-de-1-chat-khi/bai-1-thuyet-dong-hoc-phan-tu-khi-ly-tuong/1-ly-thuyet-thuyet-dong-hoc-phan-tu-khi-ly-tuong",
    theory: 12,
    example: 53,
    exercise: 13,
    practice: 81,
  },
  {
    id: "lop-12/nhiet-hoc/chu-de-1-nhiet-hoc",
    badge: "Lớp 12 · Chuyên đề",
    count: 80,
    title: "NHIỆT HỌC",
    sampleLessonName: "Thang nhiệt độ - Nhiệt kế",
    sampleLessonPath:
      "lop-12/nhiet-hoc/chu-de-1-nhiet-hoc/bai-1-thang-nhiet-do-nhiet-ke/1-ly-thuyet-thang-nhiet-do-nhiet-ke",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-12/nhiet-hoc/chu-de-1-nhiet-hoc/bai-1-thang-nhiet-do-nhiet-ke/1-ly-thuyet-thang-nhiet-do-nhiet-ke",
    theory: 5,
    example: 9,
    exercise: 7,
    practice: 59,
  },
  {
    id: "lop-12/tu-truong/chu-de-1-tu-truong",
    badge: "Lớp 12 · Chuyên đề",
    count: 131,
    title: "TỪ TRƯỜNG",
    sampleLessonName: "Từ trường - Cảm ứng từ",
    sampleLessonPath:
      "lop-12/tu-truong/chu-de-1-tu-truong/bai-1-tu-truong-cam-ung-tu/1-ly-thuyet-tu-truong-cam-ung-tu",
    simulationUrl:
      "https://vatly.ai/api/mo-phong/lop-12/tu-truong/chu-de-1-tu-truong/bai-1-tu-truong-cam-ung-tu/1-ly-thuyet-tu-truong-cam-ung-tu",
    theory: 13,
    example: 67,
    exercise: 15,
    practice: 36,
  },
];

export function ShowcaseTopics() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [simulationOpen, setSimulationOpen] = useState<boolean>(false);
  const current = SHOWCASE_TOPICS[activeIndex];

  const handleSelectTopic = (index: number) => {
    setActiveIndex(index);
    setSimulationOpen(false);
  };

  // Percentage for progress breakdown
  const total = current.theory + current.example + current.exercise + current.practice;
  const pTheory = (current.theory / total) * 100;
  const pExample = (current.example / total) * 100;
  const pExercise = (current.exercise / total) * 100;
  const pPractice = (current.practice / total) * 100;

  return (
    <div className="grid gap-6 lg:grid-cols-[19rem_1fr]" data-site-import-carousel-root="1">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="Chuyên đề"
        aria-orientation="vertical"
        className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:max-h-[38rem] lg:flex-col lg:overflow-y-auto lg:px-0 lg:pr-2"
      >
        {SHOWCASE_TOPICS.map((topic, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={topic.id}
              id={`tab-${topic.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls="showcase-panel"
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelectTopic(idx)}
              className={`w-64 shrink-0 snap-start rounded-2xl border px-4 py-3 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-lab-green lg:w-full ${
                isSelected
                  ? "border-lab-green/40 bg-lab-surface shadow-lg shadow-lab-green/5"
                  : "border-transparent hover:bg-lab-surface/70"
              }`}
            >
              <span className="flex items-center justify-between font-mono text-[10px] tracking-wider text-lab-subtle uppercase">
                {topic.badge}
                <span className={isSelected ? "text-lab-green font-semibold" : ""}>
                  {topic.count}
                </span>
              </span>
              <span
                className={`mt-1 block text-sm font-semibold transition-colors ${
                  isSelected ? "text-lab-green" : "text-lab-ink"
                }`}
              >
                {topic.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Panel */}
      <div
        id="showcase-panel"
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="min-w-0 rounded-[1.75rem] border border-lab-line bg-lab-surface p-4 sm:p-5"
      >
        {/* Viewport Frame */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-lab-line bg-lab-paper">
          {simulationOpen ? (
            <div className="relative size-full">
              <iframe
                src={current.simulationUrl}
                title={`${current.title} — ${current.sampleLessonName}`}
                className="absolute inset-0 size-full border-0 bg-background"
                sandbox="allow-scripts allow-popups allow-forms allow-pointer-lock allow-same-origin"
                allow="fullscreen; accelerometer; gyroscope; autoplay"
              />
              {/* Floating controls */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-lg border border-lab-line bg-lab-surface/90 p-1 shadow-lg backdrop-blur">
                <Link
                  to="/mo-phong/$"
                  params={{ _splat: current.sampleLessonPath }}
                  className="flex size-7 items-center justify-center rounded-md text-lab-subtle hover:bg-lab-line/40 hover:text-lab-ink"
                  title="Mở toàn màn hình trong trình xem"
                >
                  <Maximize2 className="size-3.5" />
                </Link>
                <a
                  href={current.simulationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-7 items-center justify-center rounded-md text-lab-subtle hover:bg-lab-line/40 hover:text-lab-ink"
                  title="Mở trong tab mới"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSimulationOpen(true)}
              aria-label={`Chạy thử mô phỏng: ${current.sampleLessonName}`}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden bg-lab-deep text-lab-on-deep outline-none focus-visible:ring-4 focus-visible:ring-lab-lime focus-visible:ring-inset"
            >
              <span aria-hidden="true" className="lab-grid absolute inset-0 opacity-20" />
              <span
                aria-hidden="true"
                className="absolute size-72 animate-lab-spin rounded-full border border-dashed border-lab-lime/25"
              />
              <span
                aria-hidden="true"
                className="absolute size-[26rem] animate-lab-spin-reverse rounded-full border border-lab-lime/10"
              />
              <span className="relative flex size-20 items-center justify-center">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-lab-pulse rounded-full bg-lab-lime/40"
                />
                <span className="relative flex size-16 items-center justify-center rounded-full bg-lab-lime text-lab-deep shadow-2xl transition-transform group-hover:scale-110 motion-reduce:transform-none">
                  <Play className="ml-1 size-7 fill-current" />
                </span>
              </span>
              <span className="relative max-w-sm px-6 text-center">
                <span className="block text-xs tracking-[0.2em] text-lab-lime uppercase font-mono">
                  Chạy thử ngay tại đây
                </span>
                <span className="mt-2 block text-lg leading-snug font-semibold text-white">
                  {current.sampleLessonName}
                </span>
              </span>
            </button>
          )}
        </div>

        {/* Footer Meta */}
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 px-1">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold tracking-tight">{current.title}</h3>
            {/* Visual ratio bar */}
            <div className="mt-3 flex h-1.5 w-60 overflow-hidden rounded-full bg-lab-line/40">
              <div
                style={{ width: `${pTheory}%` }}
                className="bg-emerald-500"
                title={`${current.theory} Lý thuyết`}
              />
              <div
                style={{ width: `${pExample}%` }}
                className="bg-sky-500"
                title={`${current.example} Ví dụ`}
              />
              <div
                style={{ width: `${pExercise}%` }}
                className="bg-amber-500"
                title={`${current.exercise} Bài tập`}
              />
              <div
                style={{ width: `${pPractice}%` }}
                className="bg-indigo-500"
                title={`${current.practice} Luyện tập`}
              />
            </div>
            <p className="mt-2 text-xs text-lab-subtle">
              {current.theory} Lý thuyết · {current.example} Ví dụ · {current.exercise} Bài tập ·{" "}
              {current.practice} Luyện tập
            </p>
          </div>

          <Link
            to="/mo-phong/$"
            params={{ _splat: current.sampleLessonPath }}
            className="group inline-flex items-center gap-1.5 rounded-full border border-lab-line bg-lab-paper px-4 py-2 text-xs font-medium text-lab-ink hover:border-lab-green hover:text-lab-green transition-all"
          >
            Khám phá chuyên đề
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
