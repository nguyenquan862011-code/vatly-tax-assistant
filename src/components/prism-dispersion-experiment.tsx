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
  { name: "Lam", color: "#36D9E8", glow: "rgba(54, 217, 232, 0.6)", n: 1.529 },
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

  const redPhysics = calculatePrismPhysics(1.512, angleDeg);
  const violetPhysics = calculatePrismPhysics(1.543, angleDeg);
  const dispersionAngle =
    violetPhysics && redPhysics
      ? Math.abs(violetPhysics.deviationDeg - redPhysics.deviationDeg).toFixed(2)
      : "1.85";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;
      timeRef.current += 0.02;

      // Handle HiDPI
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

      // 1. Background Grid & Scientific Ambiance
      ctx.fillStyle = "#050B18";
      ctx.fillRect(0, 0, width, height);

      // Subtle coordinate grid
      ctx.strokeStyle = "rgba(54, 217, 232, 0.04)";
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

      // 2. Prism Geometry (Centered Equilateral Triangle)
      const prismSide = Math.min(width, height) * 0.46;
      const prismH = (prismSide * Math.sqrt(3)) / 2;
      const cx = width * 0.44;
      const cy = height * 0.52;

      const pTop = { x: cx, y: cy - (2 / 3) * prismH };
      const pLeft = { x: cx - prismSide / 2, y: cy + (1 / 3) * prismH };
      const pRight = { x: cx + prismSide / 2, y: cy + (1 / 3) * prismH };

      // Normal vectors
      // Face 1 (pLeft to pTop): Vector (pTop.x - pLeft.x, pTop.y - pLeft.y)
      // Normal 1 points outward (up-left)
      const f1Vec = { x: pTop.x - pLeft.x, y: pTop.y - pLeft.y };
      const f1Len = Math.hypot(f1Vec.x, f1Vec.y);
      const f1Unit = { x: f1Vec.x / f1Len, y: f1Vec.y / f1Len };
      // Outward normal to face 1: rotate f1Unit by -90 deg
      const n1 = { x: -f1Unit.y, y: f1Unit.x };

      // Face 2 (pTop to pRight):
      const f2Vec = { x: pRight.x - pTop.x, y: pRight.y - pTop.y };
      const f2Len = Math.hypot(f2Vec.x, f2Vec.y);
      const f2Unit = { x: f2Vec.x / f2Len, y: f2Vec.y / f2Len };
      // Outward normal to face 2
      const n2 = { x: -f2Unit.y, y: f2Unit.x };

      // Incident point on Face 1: around 55% from pTop down to pLeft
      const incidentPoint = {
        x: pTop.x + (pLeft.x - pTop.x) * 0.52,
        y: pTop.y + (pLeft.y - pTop.y) * 0.52,
      };

      // Draw Glass Prism Background & Glow
      const prismGrad = ctx.createLinearGradient(pTop.x, pTop.y, pRight.x, pRight.y);
      prismGrad.addColorStop(0, "rgba(54, 217, 232, 0.12)");
      prismGrad.addColorStop(0.5, "rgba(72, 213, 151, 0.08)");
      prismGrad.addColorStop(1, "rgba(9, 20, 38, 0.4)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pTop.x, pTop.y);
      ctx.lineTo(pLeft.x, pLeft.y);
      ctx.lineTo(pRight.x, pRight.y);
      ctx.closePath();
      ctx.fillStyle = prismGrad;
      ctx.fill();

      // Prism glowing edge
      ctx.strokeStyle = "rgba(54, 217, 232, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#36D9E8";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // Normal line at Face 1
      if (showLabels) {
        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "rgba(244, 248, 252, 0.25)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(incidentPoint.x - n1.x * 45, incidentPoint.y - n1.y * 45);
        ctx.lineTo(incidentPoint.x + n1.x * 45, incidentPoint.y + n1.y * 45);
        ctx.stroke();
        ctx.restore();
      }

      if (isBeamOn) {
        // 3. Incident White Beam
        // Angle of incidence i1 relative to inward normal
        const i1Rad = (angleDeg * Math.PI) / 180;
        // Inward normal is -n1
        // Rotate inward normal by -i1Rad (clockwise/counter-clockwise depending on face tilt)
        const face1Angle = Math.atan2(f1Vec.y, f1Vec.x); // face direction
        const normal1Angle = face1Angle - Math.PI / 2; // outward normal angle
        const incidentAngle = normal1Angle + Math.PI - i1Rad;

        const beamLen = width * 0.38;
        const sourcePoint = {
          x: incidentPoint.x - Math.cos(incidentAngle) * beamLen,
          y: incidentPoint.y - Math.sin(incidentAngle) * beamLen,
        };

        // Draw incoming intense white/cyan beam with glow
        ctx.save();
        ctx.shadowColor = "#36D9E8";
        ctx.shadowBlur = 12;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(sourcePoint.x, sourcePoint.y);
        ctx.lineTo(incidentPoint.x, incidentPoint.y);
        ctx.stroke();

        // Inner core of beam
        ctx.strokeStyle = "#36D9E8";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Animated photon particles along incident ray
        const pulseOffset = (timeRef.current * 40) % 30;
        for (let d = pulseOffset; d < beamLen; d += 30) {
          const px = sourcePoint.x + Math.cos(incidentAngle) * d;
          const py = sourcePoint.y + Math.sin(incidentAngle) * d;
          ctx.fillStyle = "#36D9E8";
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // 4. Refraction Inside Prism and Exit Dispersion
        SPECTRUM_COLORS.forEach((colorItem, idx) => {
          const physics = calculatePrismPhysics(colorItem.n, angleDeg);
          if (!physics) return;

          // Inside prism ray angle
          // r1 is angle with normal. Ray vector angle inside:
          const rayInsideAngle = normal1Angle + Math.PI - physics.r1;

          // Find intersection with Face 2 (line pTop to pRight)
          // Line 1: incidentPoint + t * dir
          // Line 2: pTop + s * f2Unit
          const dx = Math.cos(rayInsideAngle);
          const dy = Math.sin(rayInsideAngle);

          // 2D line intersection between ray and face 2
          const x1 = incidentPoint.x;
          const y1 = incidentPoint.y;
          const x2 = incidentPoint.x + dx * 300;
          const y2 = incidentPoint.y + dy * 300;
          const x3 = pTop.x;
          const y3 = pTop.y;
          const x4 = pRight.x;
          const y4 = pRight.y;

          const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
          if (Math.abs(denom) < 0.001) return;

          const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
          const exitPoint = {
            x: x1 + t * (x2 - x1),
            y: y1 + t * (y2 - y1),
          };

          // Draw ray inside prism
          ctx.save();
          ctx.strokeStyle = colorItem.color;
          ctx.lineWidth = 1.8;
          ctx.shadowColor = colorItem.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.moveTo(incidentPoint.x, incidentPoint.y);
          ctx.lineTo(exitPoint.x, exitPoint.y);
          ctx.stroke();
          ctx.restore();

          // Exit refraction angle at Face 2
          const face2Angle = Math.atan2(f2Vec.y, f2Vec.x);
          const normal2Angle = face2Angle - Math.PI / 2; // outward normal of face 2
          // Exit ray bends away from normal by i2
          const exitRayAngle = normal2Angle + physics.i2;

          const exitLen = width * 0.42;
          const endPoint = {
            x: exitPoint.x + Math.cos(exitRayAngle) * exitLen,
            y: exitPoint.y + Math.sin(exitRayAngle) * exitLen,
          };

          // Draw dispersing spectrum ray
          ctx.save();
          ctx.strokeStyle = colorItem.color;
          ctx.lineWidth = 2.2;
          ctx.shadowColor = colorItem.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(exitPoint.x, exitPoint.y);
          ctx.lineTo(endPoint.x, endPoint.y);
          ctx.stroke();

          // Small spectral color tag at ray terminus if labels on
          if (showLabels && (idx === 0 || idx === SPECTRUM_COLORS.length - 1)) {
            ctx.fillStyle = colorItem.color;
            ctx.font = "10px var(--font-geist-mono, monospace)";
            ctx.fillText(
              idx === 0 ? "Tia Đỏ (D = " + physics.deviationDeg.toFixed(1) + "°)" : "Tia Tím (D = " + physics.deviationDeg.toFixed(1) + "°)",
              endPoint.x + 8,
              endPoint.y + (idx === 0 ? -4 : 8)
            );
          }
          ctx.restore();
        });

        // 5. Annotations & Visual Badges
        if (showLabels) {
          ctx.save();
          ctx.font = "11px var(--font-geist-mono, monospace)";
          ctx.fillStyle = "#36D9E8";

          // Label incident beam
          ctx.fillText("Tia sáng trắng tới", sourcePoint.x + 10, sourcePoint.y - 12);
          ctx.fillStyle = "#F4F8FC";
          ctx.fillText(`Góc tới i₁ = ${angleDeg}°`, sourcePoint.x + 10, sourcePoint.y + 4);

          // Label apex angle
          ctx.fillStyle = "#48D597";
          ctx.fillText("Lăng kính A = 60°", pTop.x - 48, pTop.y - 12);

          // Label spectrum
          ctx.fillStyle = "#36D9E8";
          ctx.fillText("Quang phổ tán sắc", width * 0.72, cy - 60);
          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [angleDeg, isBeamOn, showLabels]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#091426] bg-[#050B18]/90 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
      {/* Top Header & Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#091426] pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-[#48D597] animate-pulse" />
          <h3 className="font-mono text-xs font-semibold tracking-wider text-[#F4F8FC] uppercase">
            Mô phỏng: Tán sắc ánh sáng qua lăng kính
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsBeamOn(!isBeamOn)}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              isBeamOn
                ? "bg-[#36D9E8]/20 text-[#36D9E8] border border-[#36D9E8]/40"
                : "bg-[#091426] text-[#F4F8FC]/50 hover:text-[#F4F8FC]"
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
                ? "bg-[#48D597]/20 text-[#48D597] border border-[#48D597]/40"
                : "bg-[#091426] text-[#F4F8FC]/50 hover:text-[#F4F8FC]"
            }`}
            title="Bật/Tắt nhãn chú thích"
          >
            <span>Nhãn</span>
          </button>

          <button
            type="button"
            onClick={resetSimulation}
            className="inline-flex items-center justify-center rounded-md bg-[#091426] p-1.5 text-[#F4F8FC]/70 hover:text-[#F4F8FC] hover:bg-[#091426]/80 transition-colors"
            title="Đặt lại mô phỏng"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative mt-3 h-[280px] sm:h-[320px] w-full overflow-hidden rounded-xl border border-[#091426] bg-[#050B18]">
        <canvas ref={canvasRef} className="size-full block" />

        {/* Live Physics Measurement Overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 pointer-events-none">
          <div className="rounded-lg border border-[#091426] bg-[#050B18]/80 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-[#F4F8FC]/60">Góc tới: </span>
            <span className="font-mono text-xs font-semibold text-[#36D9E8]">{angleDeg}°</span>
          </div>
          <div className="rounded-lg border border-[#091426] bg-[#050B18]/80 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-[#F4F8FC]/60">Góc tán sắc (ΔD): </span>
            <span className="font-mono text-xs font-semibold text-[#48D597]">~{dispersionAngle}°</span>
          </div>
          <div className="hidden sm:block rounded-lg border border-[#091426] bg-[#050B18]/80 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-[#F4F8FC]/60">Thủy tinh Crown: </span>
            <span className="font-mono text-xs text-[#F4F8FC]">n = 1.512 - 1.543</span>
          </div>
        </div>
      </div>

      {/* Angle Slider Control */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="prism-angle" className="flex items-center gap-1.5 font-medium text-[#F4F8FC]">
            <Sliders className="size-3.5 text-[#36D9E8]" />
            <span>Điều chỉnh góc tới tia sáng (i₁)</span>
          </label>
          <span className="font-mono font-semibold text-[#36D9E8]">{angleDeg}°</span>
        </div>
        <input
          id="prism-angle"
          type="range"
          min="30"
          max="62"
          step="1"
          value={angleDeg}
          onChange={(e) => setAngleDeg(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#091426] accent-[#36D9E8]"
        />
        <div className="flex justify-between font-mono text-[10px] text-[#F4F8FC]/40">
          <span>30° (Tán sắc góc rộng)</span>
          <span>48° (Góc tiêu chuẩn)</span>
          <span>62° (Cận phản xạ)</span>
        </div>
      </div>

      {/* Physics Explanation Accordion */}
      <div className="mt-3 pt-3 border-t border-[#091426]">
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex w-full items-center justify-between text-xs text-[#36D9E8] hover:text-[#48D597] transition-colors"
        >
          <span className="inline-flex items-center gap-1.5 font-medium">
            <Info className="size-3.5" />
            <span>Giải thích hiện tượng tán sắc ánh sáng</span>
          </span>
          <span className="font-mono text-[11px]">{showExplanation ? "Thu gọn ▲" : "Xem thêm ▼"}</span>
        </button>

        {showExplanation && (
          <div className="mt-2.5 rounded-lg border border-[#091426] bg-[#091426]/50 p-3 text-xs leading-relaxed text-[#F4F8FC]/80 animate-in fade-in duration-300">
            <p className="mb-1.5 font-medium text-[#F4F8FC]">
              Hiện tượng tán sắc ánh sáng qua lăng kính:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-[#F4F8FC]/70">
              <li>
                <strong>Ánh sáng trắng</strong> là hỗn hợp của vô số ánh sáng đơn sắc có màu biến thiên liên tục từ đỏ đến tím.
              </li>
              <li>
                <strong>Chiết suất môi trường trong suốt</strong> biến thiên theo bước sóng: chiết suất lớn nhất đối với tia tím (n<sub>tím</sub> ≈ 1.543) và nhỏ nhất đối với tia đỏ (n<sub>đỏ</sub> ≈ 1.512).
              </li>
              <li>
                Theo định luật khúc xạ ánh sáng, tia tím bị bẻ cong lệch nhiều nhất về phía đáy lăng kính, còn tia đỏ bị lệch ít nhất, tạo thành dải màu cầu vồng liên tục.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
