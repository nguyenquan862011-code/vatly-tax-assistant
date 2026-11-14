import React, { useState, useEffect, useRef, useId, useCallback } from "react";
import { Play, Pause, RotateCcw, Waves, HelpCircle } from "lucide-react";

interface Point {
  x: number;
  y: number;
}

function dist(p1: Point, p2: Point): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function formatNum(val: number, decimals = 1): string {
  return val.toFixed(decimals).replace(".", ",");
}

function clampPoint(p: Point): Point {
  return {
    x: Math.min(23.4, Math.max(0.6, p.x)),
    y: Math.min(17.4, Math.max(0.6, p.y)),
  };
}

export function WaveInterferenceExperiment() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeDraggingRef = useRef<"s1" | "s2" | null>(null);

  const [sources, setSources] = useState<{ s1: Point; s2: Point }>({
    s1: { x: 9, y: 9 },
    s2: { x: 15, y: 9 },
  });
  const [wavelength, setWavelength] = useState<number>(1.6);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [probe, setProbe] = useState<Point | null>(null);

  const animStateRef = useRef<{ time: number; last: number }>({ time: 0, last: 0 });

  // Calculate distance between S1 and S2 (in cm on 24x18 grid)
  const sourceDist = dist(sources.s1, sources.s2);

  // Number of maxima between S1 and S2
  const P = Math.max(0, Math.ceil(sourceDist / wavelength - 1e-9) - 1);
  const maxInterferenceCount = 2 * P + 1;

  // Maxima offsets along the center-line
  const maximaOffsets = Array.from({ length: maxInterferenceCount }, (_, i) => (wavelength / 2) * (i - P));

  // Midpoint & unit direction
  const midX = (sources.s1.x + sources.s2.x) / 2;
  const midY = (sources.s1.y + sources.s2.y) / 2;
  const dirX = sourceDist > 0 ? (sources.s2.x - sources.s1.x) / sourceDist : 1;
  const dirY = sourceDist > 0 ? (sources.s2.y - sources.s1.y) / sourceDist : 0;

  // Probe point analysis
  let probeInfo: {
    d1: number;
    d2: number;
    diff: number;
    ratio: number;
    order: number;
    verdict: "max" | "min" | "between";
  } | null = null;

  if (probe) {
    const d1 = dist(probe, sources.s1);
    const d2 = dist(probe, sources.s2);
    const diff = d2 - d1;
    const ratio = diff / wavelength;
    const order = Math.round(ratio);
    const maxErr = Math.abs(ratio - order);
    const minErr = Math.abs(Math.abs(ratio) - (Math.floor(Math.abs(ratio)) + 0.5));

    let verdict: "max" | "min" | "between" = "between";
    if (maxErr < 0.1) {
      verdict = "max";
    } else if (minErr < 0.1) {
      verdict = "min";
    }

    probeInfo = { d1, d2, diff, ratio, order, verdict };
  }

  // Precomputed phase buffer
  const offscreenBufferRef = useRef<{
    a: Float32Array;
    b: Float32Array;
    offscreen: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    imgData: ImageData;
  } | null>(null);

  // Rebuild spatial wave table when sources or wavelength change
  useEffect(() => {
    let buf = offscreenBufferRef.current;
    if (!buf) {
      const off = document.createElement("canvas");
      off.width = 200;
      off.height = 150;
      const ctx = off.getContext("2d")!;
      buf = {
        a: new Float32Array(30000),
        b: new Float32Array(30000),
        offscreen: off,
        ctx,
        imgData: ctx.createImageData(200, 150),
      };
      offscreenBufferRef.current = buf;
    }

    const { a, b } = buf;
    const k = (2 * Math.PI) / wavelength;
    const s1 = sources.s1;
    const s2 = sources.s2;

    for (let e = 0; e < 150; e += 1) {
      const py = ((e + 0.5) / 150) * 18;
      for (let t = 0; t < 200; t += 1) {
        const px = ((t + 0.5) / 200) * 24;
        const d_1 = Math.hypot(px - s1.x, py - s1.y);
        const d_2 = Math.hypot(px - s2.x, py - s2.y);
        const idx = 200 * e + t;
        a[idx] = (Math.cos(k * d_1) + Math.cos(k * d_2)) / 2;
        b[idx] = (Math.sin(k * d_1) + Math.sin(k * d_2)) / 2;
      }
    }
  }, [sources, wavelength]);

  // Main animation render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Palette: dark teal -> deep water -> bright lime crest
    const palette = new Uint8ClampedArray(768);
    // Color stops: dark emerald (15, 35, 28) -> teal surface (24, 72, 58) -> lime bright (170, 255, 60)
    for (let i = 0; i < 256; i++) {
      const t = i / 255;
      let r: number, g: number, b: number;
      if (t < 0.5) {
        const f = t * 2;
        r = 15 + (24 - 15) * f;
        g = 35 + (72 - 35) * f;
        b = 28 + (58 - 28) * f;
      } else {
        const f = (t - 0.5) * 2;
        r = 24 + (170 - 24) * f;
        g = 72 + (255 - 72) * f;
        b = 58 + (60 - 58) * f;
      }
      palette[3 * i] = r;
      palette[3 * i + 1] = g;
      palette[3 * i + 2] = b;
    }

    let animId = 0;
    const omega = 2 * Math.PI * 0.6; // 0.6 Hz wave frequency

    const renderFrame = () => {
      const buf = offscreenBufferRef.current;
      if (!buf) return;
      const { a, b, offscreen, ctx: offCtx, imgData } = buf;
      const curTime = animStateRef.current.time;

      const cosW = Math.cos(omega * curTime);
      const sinW = Math.sin(omega * curTime);

      const data = imgData.data;
      for (let i = 0; i < 30000; i++) {
        const amp = (a[i] * cosW + b[i] * sinW + 1) * 127.5;
        const colorIdx = Math.max(0, Math.min(255, amp | 0));
        const pOffset = colorIdx * 3;
        const dOffset = i * 4;
        data[dOffset] = palette[pOffset];
        data[dOffset + 1] = palette[pOffset + 1];
        data[dOffset + 2] = palette[pOffset + 2];
        data[dOffset + 3] = 255;
      }

      offCtx.putImageData(imgData, 0, 0);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
    };

    const tick = (now: number) => {
      if (animStateRef.current.last) {
        const delta = Math.min(now - animStateRef.current.last, 64) / 1000;
        animStateRef.current.time += delta;
      }
      animStateRef.current.last = now;
      renderFrame();
      if (isAnimating) {
        animId = requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      renderFrame();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (isAnimating) {
      animStateRef.current.last = 0;
      animId = requestAnimationFrame(tick);
    } else {
      renderFrame();
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [isAnimating]);

  // Pointer event coordinate mapping (relative to 24x18 grid)
  const getGridCoords = useCallback((e: React.PointerEvent<SVGSVGElement>): Point => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 24,
      y: ((e.clientY - rect.top) / rect.height) * 18,
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const pt = getGridCoords(e);
    if (activeDraggingRef.current) {
      const clamped = clampPoint(pt);
      setSources((prev) => ({
        ...prev,
        [activeDraggingRef.current!]: clamped,
      }));
    } else {
      setProbe(pt);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!activeDraggingRef.current) {
      setProbe(getGridCoords(e));
    }
  };

  const handlePointerUp = () => {
    activeDraggingRef.current = null;
  };

  const handlePointerLeave = () => {
    if (!activeDraggingRef.current) {
      setProbe(null);
    }
  };

  // Keyboard adjustment on source node
  const handleSourceKeyDown = (sourceKey: "s1" | "s2", e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 1.0 : 0.2;
    const deltaMap: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const delta = deltaMap[e.key];
    if (!delta) return;
    e.preventDefault();
    setSources((prev) => {
      const cur = prev[sourceKey];
      return {
        ...prev,
        [sourceKey]: clampPoint({ x: cur.x + delta[0], y: cur.y + delta[1] }),
      };
    });
  };

  // Preset handlers
  const handleReset = () => {
    setSources({ s1: { x: 9, y: 9 }, s2: { x: 15, y: 9 } });
    setWavelength(1.6);
    setIsAnimating(true);
    setProbe(null);
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDist = parseFloat(e.target.value);
    const half = newDist / 2;
    setSources({
      s1: { x: midX - half * dirX, y: midY - half * dirY },
      s2: { x: midX + half * dirX, y: midY + half * dirY },
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col overflow-hidden rounded-3xl border border-lab-line bg-lab-surface shadow-xl"
    >
      {/* Header bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-lab-line px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-lab-green/10 text-lab-green">
            <Waves className="size-4" />
          </span>
          <h2 className="text-sm font-semibold tracking-tight">Giao thoa hai nguồn kết hợp</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-lab-tint px-2.5 py-1 font-mono text-[10px] whitespace-nowrap text-lab-green">
            <span className="size-1.5 animate-pulse rounded-full bg-lab-green" aria-hidden="true" />
            TƯƠNG TÁC THỰC
          </span>
        </div>
      </header>

      {/* Main Simulation Viewport (Canvas + SVG Overlay) */}
      <div className="relative aspect-[4/3] border-b border-lab-line bg-[#0f231c]">
        {/* Canvas water wave field */}
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Mặt nước giao thoa: hai nguồn cách nhau ${formatNum(sourceDist)} cm, bước sóng ${formatNum(wavelength)} cm`}
          className="absolute inset-0 size-full"
        />

        {/* Interactive SVG overlay */}
        <svg
          viewBox="0 0 24 18"
          className="absolute inset-0 size-full cursor-crosshair select-none"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
        >
          {/* Baseline S1 - S2 */}
          <line
            x1={sources.s1.x}
            y1={sources.s1.y}
            x2={sources.s2.x}
            y2={sources.s2.y}
            className="stroke-white/50"
            strokeWidth="0.08"
            strokeDasharray="0.3 0.2"
          />

          {/* Maxima nodes along S1-S2 segment */}
          {maximaOffsets.map((offset, idx) => (
            <circle
              key={idx}
              cx={midX + dirX * offset}
              cy={midY + dirY * offset}
              r="0.18"
              className="fill-lab-deep stroke-lab-lime"
              strokeWidth="0.08"
            />
          ))}

          {/* Probe Point M and distance rays */}
          {probe && probeInfo && (
            <g className="pointer-events-none">
              <line
                x1={sources.s1.x}
                y1={sources.s1.y}
                x2={probe.x}
                y2={probe.y}
                className="stroke-amber-300"
                strokeWidth="0.08"
                strokeDasharray="0.3 0.2"
              />
              <line
                x1={sources.s2.x}
                y1={sources.s2.y}
                x2={probe.x}
                y2={probe.y}
                className="stroke-amber-300"
                strokeWidth="0.08"
                strokeDasharray="0.3 0.2"
              />
              <circle
                cx={probe.x}
                cy={probe.y}
                r="0.45"
                className={
                  probeInfo.verdict === "max"
                    ? "fill-lab-lime stroke-lab-deep"
                    : probeInfo.verdict === "min"
                    ? "fill-lab-deep stroke-lab-lime"
                    : "fill-white/80 stroke-lab-deep"
                }
                strokeWidth="0.12"
              />
              <text
                x={probe.x + 0.6}
                y={probe.y - 0.5}
                className="fill-white font-mono text-[0.85px] font-bold drop-shadow-md"
              >
                M
              </text>
            </g>
          )}

          {/* Draggable Source S1 */}
          <g
            role="button"
            tabIndex={0}
            aria-label="Nguồn S₁ — kéo hoặc dùng phím mũi tên để di chuyển"
            className="cursor-grab touch-none outline-none active:cursor-grabbing"
            onPointerDown={(e) => {
              e.stopPropagation();
              activeDraggingRef.current = "s1";
              e.currentTarget.ownerSVGElement?.setPointerCapture(e.pointerId);
            }}
            onKeyDown={(e) => handleSourceKeyDown("s1", e)}
          >
            <circle
              cx={sources.s1.x}
              cy={sources.s1.y}
              r="0.75"
              className="origin-center animate-pulse fill-lab-lime/50"
            />
            <circle
              cx={sources.s1.x}
              cy={sources.s1.y}
              r="0.45"
              className="fill-lab-deep stroke-lab-lime"
              strokeWidth="0.12"
            />
            <text
              x={sources.s1.x}
              y={sources.s1.y - 0.8}
              textAnchor="middle"
              className="fill-white font-mono text-[0.85px] font-bold drop-shadow-md"
            >
              S₁
            </text>
          </g>

          {/* Draggable Source S2 */}
          <g
            role="button"
            tabIndex={0}
            aria-label="Nguồn S₂ — kéo hoặc dùng phím mũi tên để di chuyển"
            className="cursor-grab touch-none outline-none active:cursor-grabbing"
            onPointerDown={(e) => {
              e.stopPropagation();
              activeDraggingRef.current = "s2";
              e.currentTarget.ownerSVGElement?.setPointerCapture(e.pointerId);
            }}
            onKeyDown={(e) => handleSourceKeyDown("s2", e)}
          >
            <circle
              cx={sources.s2.x}
              cy={sources.s2.y}
              r="0.75"
              className="origin-center animate-pulse fill-lab-lime/50"
            />
            <circle
              cx={sources.s2.x}
              cy={sources.s2.y}
              r="0.45"
              className="fill-lab-deep stroke-lab-lime"
              strokeWidth="0.12"
            />
            <text
              x={sources.s2.x}
              y={sources.s2.y - 0.8}
              textAnchor="middle"
              className="fill-white font-mono text-[0.85px] font-bold drop-shadow-md"
            >
              S₂
            </text>
          </g>
        </svg>
      </div>

      {/* Live Measurement Info Bar */}
      <div className="border-b border-lab-line bg-lab-surface/80 px-4 py-3 text-xs sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-lab-subtle font-mono text-[11px]">
            <span>
              Khoảng cách <strong className="text-lab-ink font-semibold">{formatNum(sourceDist)} cm</strong>
            </span>
            <span>•</span>
            <span>
              Bước sóng λ = <strong className="text-lab-ink font-semibold">{formatNum(wavelength)} cm</strong>
            </span>
            <span>•</span>
            <span>
              Cực đại trên đoạn: <strong className="text-lab-green font-bold">{maxInterferenceCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAnimating((a) => !a)}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-lab-line bg-lab-surface px-2.5 text-[11px] font-medium text-lab-ink hover:bg-lab-line/40 transition-colors"
            >
              {isAnimating ? <Pause className="size-3 text-amber-500" /> : <Play className="size-3 text-lab-green" />}
              {isAnimating ? "Tạm dừng" : "Tiếp tục"}
            </button>
            <button
              onClick={handleReset}
              className="inline-flex h-7 items-center gap-1 rounded-md border border-lab-line bg-lab-surface px-2.5 text-[11px] font-medium text-lab-ink hover:bg-lab-line/40 transition-colors"
              title="Đặt lại thông số mặc định"
            >
              <RotateCcw className="size-3" />
              Đặt lại
            </button>
          </div>
        </div>

        {/* Probe analysis message */}
        <p className="mt-2 text-xs leading-5 text-lab-subtle" aria-live="polite">
          {probeInfo ? (
            <span>
              Điểm M:{" "}
              <span className="font-mono text-lab-ink font-semibold">
                d₂ − d₁ = {formatNum(Math.abs(probeInfo.diff), 2)} cm ({formatNum(Math.abs(probeInfo.ratio), 2)}λ)
              </span>{" "}
              →{" "}
              {probeInfo.verdict === "max" ? (
                <strong className="font-bold text-lab-green">
                  Cực đại giao thoa {probeInfo.order === 0 ? "trung tâm (k = 0)" : `bậc ${Math.abs(probeInfo.order)}`}
                </strong>
              ) : probeInfo.verdict === "min" ? (
                <strong className="font-bold text-amber-500">
                  Cực tiểu giao thoa (đứng yên)
                </strong>
              ) : (
                <span className="text-lab-ink">Vị trí dao động với biên độ trung gian</span>
              )}
            </span>
          ) : (
            <span>
              Rê chuột hoặc chạm vào mặt nước để phân tích điểm M. Cực đại khi{" "}
              <span className="font-mono text-lab-ink font-medium">d₂ − d₁ = kλ</span>, cực tiểu khi{" "}
              <span className="font-mono text-lab-ink font-medium">d₂ − d₁ = (k + 0,5)λ</span>.
            </span>
          )}
        </p>
      </div>

      {/* Control Sliders */}
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:px-6 sm:py-4">
        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-lab-ink">Khoảng cách hai nguồn S₁ - S₂</span>
            <span className="font-mono font-semibold text-lab-green">{formatNum(sourceDist)} cm</span>
          </div>
          <input
            type="range"
            min="4.0"
            max="8.0"
            step="0.2"
            value={sourceDist}
            onChange={handleDistanceChange}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-lab-line accent-lab-green"
          />
          <div className="mt-1 flex justify-between text-[10px] text-lab-subtle font-mono">
            <span>4,0 cm</span>
            <span>6,0 cm</span>
            <span>8,0 cm</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-lab-ink">Bước sóng λ</span>
            <span className="font-mono font-semibold text-lab-green">{formatNum(wavelength)} cm</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="3.0"
            step="0.1"
            value={wavelength}
            onChange={(e) => setWavelength(parseFloat(e.target.value))}
            className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-lab-line accent-lab-green"
          />
          <div className="mt-1 flex justify-between text-[10px] text-lab-subtle font-mono">
            <span>1,0 cm</span>
            <span>2,0 cm</span>
            <span>3,0 cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
