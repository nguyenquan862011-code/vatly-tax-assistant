import { useEffect, useRef, useState } from "react";
import { RotateCcw, Lightbulb, Info, Sparkles, Sliders } from "lucide-react";

interface SpectrumColor {
  name: string;
  color: string;
  glow: string;
  n: number; // refractive index
}

const SPECTRUM_COLORS: SpectrumColor[] = [
  { name: "Đỏ", color: "#FF3344", glow: "rgba(255, 51, 68, 0.6)", n: 1.512 },
  { name: "Cam", color: "#FF8822", glow: "rgba(255, 136, 34, 0.6)", n: 1.516 },
  { name: "Vàng", color: "#FFDD22", glow: "rgba(255, 221, 34, 0.6)", n: 1.519 },
  { name: "Lục", color: "#33DD66", glow: "rgba(51, 221, 102, 0.6)", n: 1.524 },
  { name: "Lam", color: "#38A875", glow: "rgba(56, 168, 117, 0.6)", n: 1.529 },
  { name: "Chàm", color: "#3366FF", glow: "rgba(51, 102, 255, 0.6)", n: 1.535 },
  { name: "Tím", color: "#AA33FF", glow: "rgba(170, 51, 255, 0.6)", n: 1.543 },
];

export function PrismDispersionExperiment() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angleDeg, setAngleDeg] = useState<number>(48); // Angle of incidence i1 (degrees)
  const [isBeamOn, setIsBeamOn] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const resetSimulation = () => {
    setAngleDeg(48);
    setIsBeamOn(true);
    setShowLabels(true);
  };

  // Calculate angles for a given refractive index n
  const calculatePrismPhysics = (n: number, i1Deg: number) => {
    const A = (60 * Math.PI) / 180; // 60-degree equilateral prism
    const i1 = (i1Deg * Math.PI) / 180;

    // Snell's Law at face 1: sin(i1) = n * sin(r1)
    const sinR1 = Math.sin(i1) / n;
    if (Math.abs(sinR1) > 1) return null;
    const r1 = Math.asin(sinR1);

    // Geometry inside prism: r1 + r2 = A
    const r2 = A - r1;

    // Snell's Law at face 2: n * sin(r2) = sin(i2)
    const sinI2 = n * Math.sin(r2);
    if (Math.abs(sinI2) > 1) return null; // Total internal reflection
    const i2 = Math.asin(sinI2);

    // Total deviation angle D = i1 + i2 - A
    const D = i1 + i2 - A;

    return {
      r1Deg: (r1 * 180) / Math.PI,
      r2Deg: (r2 * 180) / Math.PI,
      i2Deg: (i2 * 180) / Math.PI,
      deviationDeg: (D * 180) / Math.PI,
      r1,
      r2,
      i2,
      D,
    };
  };

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;
      timeRef.current += 0.02;

      // Handle High DPI canvas
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Dark Optical Chamber Background (constant physics environment)
      ctx.fillStyle = "#070E0B";
      ctx.fillRect(0, 0, width, height);

      // Subtle laboratory optical grid
      ctx.strokeStyle = "rgba(56, 168, 117, 0.05)";
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Prism Geometry (Centered in the viewport)
      const cx = width * 0.48;
      const cy = height * 0.52;
      const prismSide = Math.min(width * 0.38, height * 0.65, 180);
      const hPrism = (prismSide * Math.sqrt(3)) / 2;

      // Vertices of the equilateral triangle
      const pTop = { x: cx, y: cy - hPrism * 0.62 };
      const pLeft = { x: cx - prismSide / 2, y: cy + hPrism * 0.38 };
      const pRight = { x: cx + prismSide / 2, y: cy + hPrism * 0.38 };

      // Normal vector of Face 1 (pTop to pLeft)
      const f1Vec = { x: pLeft.x - pTop.x, y: pLeft.y - pTop.y };
      const f1Len = Math.hypot(f1Vec.x, f1Vec.y);
      const n1 = { x: -f1Vec.y / f1Len, y: f1Vec.x / f1Len }; // normal pointing outward/left

      // Normal vector of Face 2 (pTop to pRight)
      const f2Vec = { x: pRight.x - pTop.x, y: pRight.y - pTop.y };
      const f2Len = Math.hypot(f2Vec.x, f2Vec.y);
      const n2 = { x: f2Vec.y / f2Len, y: -f2Vec.x / f2Len }; // normal pointing outward/right

      // Incident point on Face 1: around 55% from pTop down to pLeft
      const incidentPoint = {
        x: pTop.x + (pLeft.x - pTop.x) * 0.52,
        y: pTop.y + (pLeft.y - pTop.y) * 0.52,
      };

      // Draw Glass Prism Background & Glow
      const prismGrad = ctx.createLinearGradient(pTop.x, pTop.y, pRight.x, pRight.y);
      prismGrad.addColorStop(0, "rgba(56, 168, 117, 0.15)");
      prismGrad.addColorStop(0.5, "rgba(200, 237, 120, 0.08)");
      prismGrad.addColorStop(1, "rgba(11, 21, 17, 0.4)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pTop.x, pTop.y);
      ctx.lineTo(pLeft.x, pLeft.y);
      ctx.lineTo(pRight.x, pRight.y);
      ctx.closePath();
      ctx.fillStyle = prismGrad;
      ctx.fill();

      // Prism glowing edge
      ctx.strokeStyle = "rgba(56, 168, 117, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#38A875";
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();

      // Normal line at Face 1
      if (showLabels) {
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(237, 245, 237, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(incidentPoint.x - n1.x * 45, incidentPoint.y - n1.y * 45);
        ctx.lineTo(incidentPoint.x + n1.x * 45, incidentPoint.y + n1.y * 45);
        ctx.stroke();
        ctx.restore();
      }

      if (isBeamOn) {
        // 3. Incident White Beam
        const i1Rad = (angleDeg * Math.PI) / 180;
        const face1Angle = Math.atan2(f1Vec.y, f1Vec.x);
        const normal1Angle = face1Angle - Math.PI / 2;
        const incidentAngle = normal1Angle + Math.PI - i1Rad;

        const beamLen = width * 0.38;
        const sourcePoint = {
          x: incidentPoint.x - Math.cos(incidentAngle) * beamLen,
          y: incidentPoint.y - Math.sin(incidentAngle) * beamLen,
        };

        // Draw incoming intense white/green beam with glow
        ctx.save();
        ctx.shadowColor = "#C8ED78";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(sourcePoint.x, sourcePoint.y);
        ctx.lineTo(incidentPoint.x, incidentPoint.y);
        ctx.stroke();

        ctx.strokeStyle = "#C8ED78";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // 4. Refraction inside prism & Emergent Spectrum
        SPECTRUM_COLORS.forEach((item, index) => {
          const phys = calculatePrismPhysics(item.n, angleDeg);
          if (!phys) return;

          const r1Rad = phys.r1;
          const refractedAngle = normal1Angle + r1Rad;

          // Ray path inside prism to Face 2
          const rayLenInside = prismSide * 0.65;
          const exitPoint = {
            x: incidentPoint.x + Math.cos(refractedAngle) * rayLenInside,
            y: incidentPoint.y + Math.sin(refractedAngle) * rayLenInside,
          };

          // Draw ray inside prism
          ctx.save();
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.moveTo(incidentPoint.x, incidentPoint.y);
          ctx.lineTo(exitPoint.x, exitPoint.y);
          ctx.stroke();
          ctx.restore();

          // Emergent ray from Face 2
          const face2Angle = Math.atan2(f2Vec.y, f2Vec.x);
          const normal2Angle = face2Angle + Math.PI / 2;
          const i2Rad = phys.i2;
          const emergentAngle = normal2Angle - i2Rad;

          const emergentLen = width * 0.45;
          const targetPoint = {
            x: exitPoint.x + Math.cos(emergentAngle) * emergentLen,
            y: exitPoint.y + Math.sin(emergentAngle) * emergentLen,
          };

          // Draw emergent spectral fan ray with optical glow
          ctx.save();
          ctx.shadowColor = item.color;
          ctx.shadowBlur = 8;
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(exitPoint.x, exitPoint.y);
          ctx.lineTo(targetPoint.x, targetPoint.y);
          ctx.stroke();
          ctx.restore();

          // Label color at screen edge
          if (showLabels && (index === 0 || index === 3 || index === 6)) {
            ctx.save();
            ctx.font = "10px JetBrains Mono, monospace";
            ctx.fillStyle = item.color;
            ctx.fillText(
              `${item.name} (${item.n.toFixed(3)})`,
              targetPoint.x - 10,
              targetPoint.y + 4,
            );
            ctx.restore();
          }
        });

        // 5. Annotations
        if (showLabels) {
          ctx.save();
          ctx.font = "11px Inter, sans-serif";
          ctx.fillStyle = "#EDF5ED";
          ctx.fillText("Tia sáng trắng", sourcePoint.x + 10, sourcePoint.y - 10);

          ctx.fillStyle = "#38A875";
          ctx.fillText("Lăng kính A = 60°", pTop.x - 48, pTop.y - 12);

          ctx.fillStyle = "#C8ED78";
          ctx.fillText("Quang phổ tán sắc", width * 0.7, cy - 60);
          ctx.restore();
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [angleDeg, isBeamOn, showLabels]);

  const redPhys = calculatePrismPhysics(1.512, angleDeg);
  const violetPhys = calculatePrismPhysics(1.543, angleDeg);
  const dispersionAngle =
    redPhys && violetPhys
      ? Math.abs(violetPhys.deviationDeg - redPhys.deviationDeg).toFixed(2)
      : "0.00";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-lg transition-colors">
      {/* Top Header & Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-[#16845A] dark:bg-[#38A875] animate-pulse" />
          <h3 className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
            Mô phỏng: Tán sắc ánh sáng qua lăng kính
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsBeamOn(!isBeamOn)}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              isBeamOn
                ? "bg-[#16845A]/15 dark:bg-[#38A875]/20 text-[#16845A] dark:text-[#72CF91] border border-[#16845A]/30 dark:border-[#38A875]/40"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Bật/Tắt chùm sáng"
          >
            <Lightbulb className="size-3" />
            <span>{isBeamOn ? "Tia sáng BẬT" : "Tia sáng TẮT"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowLabels(!showLabels)}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              showLabels
                ? "bg-[#C8ED78]/30 dark:bg-[#C8ED78]/20 text-[#075C40] dark:text-[#C8ED78] border border-[#C8ED78]/60 dark:border-[#C8ED78]/30 font-semibold"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Bật/Tắt nhãn chú thích"
          >
            <span>Nhãn</span>
          </button>

          <button
            type="button"
            onClick={resetSimulation}
            className="inline-flex items-center justify-center rounded-md bg-muted p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            title="Đặt lại mô phỏng"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas in Dark Optical Chamber (preserves raw physics) */}
      <div className="relative mt-3 h-[280px] sm:h-[320px] w-full overflow-hidden rounded-xl border border-black/20 bg-[#070E0B]">
        <canvas ref={canvasRef} className="size-full block" />

        {/* Live Physics Measurement Overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 pointer-events-none">
          <div className="rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-white/60">Góc tới: </span>
            <span className="font-mono text-xs font-semibold text-[#C8ED78]">{angleDeg}°</span>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-white/60">Góc tán sắc (ΔD): </span>
            <span className="font-mono text-xs font-semibold text-[#72CF91]">
              ~{dispersionAngle}°
            </span>
          </div>
          <div className="hidden sm:block rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-white/60">Thủy tinh Crown: </span>
            <span className="font-mono text-xs text-white">n = 1.512 - 1.543</span>
          </div>
        </div>
      </div>

      {/* Controls: Slider for Angle of incidence i1 */}
      <div className="mt-4 flex flex-col gap-2 rounded-xl bg-secondary p-3 border border-border">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="flex items-center gap-1.5 text-foreground">
            <Sliders className="size-3.5 text-[#16845A] dark:text-[#38A875]" />
            Điều chỉnh góc tới chùm sáng (i₁):
          </span>
          <span className="font-mono font-bold text-[#16845A] dark:text-[#72CF91]">
            {angleDeg}°
          </span>
        </div>

        <input
          type="range"
          min="32"
          max="68"
          step="1"
          value={angleDeg}
          onChange={(e) => setAngleDeg(parseInt(e.target.value, 10))}
          className="w-full accent-[#16845A] dark:accent-[#38A875] cursor-pointer"
        />

        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>32° (Góc hẹp)</span>
          <span className="font-mono text-[10px]">Định luật khúc xạ: sin(i₁) = n · sin(r₁)</span>
          <span>68° (Góc rộng)</span>
        </div>
      </div>

      {/* Physics Explanation Dropdown */}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Info className="size-3.5 text-[#16845A] dark:text-[#38A875]" />
            Bản chất vật lý: Vì sao ánh sáng trắng bị tách màu?
          </span>
          <span className="text-[11px] text-muted-foreground">
            {showExplanation ? "Ẩn bớt" : "Xem chi tiết"}
          </span>
        </button>

        {showExplanation && (
          <div className="mt-2 space-y-2 rounded-lg border border-border bg-secondary p-3 text-xs leading-relaxed text-muted-foreground animate-in fade-in">
            <p>
              • <strong className="text-foreground">Chiết suất phụ thuộc bước sóng:</strong> Với
              cùng một môi trường trong suốt (thủy tinh Crown), chiết suất biến thiên tăng dần từ
              ánh sáng Đỏ (bước sóng dài nhất, n = 1.512) đến Tím (bước sóng ngắn nhất, n = 1.543).
            </p>
            <p>
              • <strong className="text-foreground">Góc lệch D:</strong> Theo công thức lăng kính D
              = i₁ + i₂ - A, vì n(tím) &gt; n(đỏ) nên tia Tím bị lệch nhiều nhất về phía đáy lăng
              kính, tia Đỏ bị lệch ít nhất, tạo nên dải màu cầu vồng liên tục.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
