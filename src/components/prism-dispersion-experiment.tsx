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
      r1,
      r2,
      i2,
      D,
      degD: (D * 180) / Math.PI,
    };
  };

  // Calculate red and violet deviation for telemetry
  const redPhysics = calculatePrismPhysics(1.512, angleDeg);
  const violetPhysics = calculatePrismPhysics(1.543, angleDeg);
  const dispersionAngle =
    redPhysics && violetPhysics
      ? Math.abs(violetPhysics.degD - redPhysics.degD).toFixed(2)
      : "2.14";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;
      timeRef.current += 0.02;

      // Ensure crisp high-DPI rendering
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

      // Dark optical room chamber so colored dispersed rays are completely vivid
      ctx.fillStyle = "#0B1220";
      ctx.fillRect(0, 0, width, height);

      // Subtle science measurement grid in chamber
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
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

      // Prism Geometry - Centered Equilateral Triangle
      const prismSide = Math.min(width * 0.38, 160);
      const prismHeight = (prismSide * Math.sqrt(3)) / 2;
      const centerX = width * 0.44;
      const centerY = height * 0.52;

      const pTop = { x: centerX, y: centerY - prismHeight * 0.58 };
      const pLeft = { x: centerX - prismSide / 2, y: centerY + prismHeight * 0.42 };
      const pRight = { x: centerX + prismSide / 2, y: centerY + prismHeight * 0.42 };

      // Face normal vectors
      const faceLeftVector = { x: pTop.x - pLeft.x, y: pTop.y - pLeft.y };
      const faceLeftLength = Math.hypot(faceLeftVector.x, faceLeftVector.y);
      const faceLeftUnit = {
        x: faceLeftVector.x / faceLeftLength,
        y: faceLeftVector.y / faceLeftLength,
      };
      // Normal points outward-left: (-unit.y, unit.x)
      const normalLeft = { x: -faceLeftUnit.y, y: faceLeftUnit.x };

      // Incident point on left face (about 42% down from apex)
      const incidentPoint = {
        x: pTop.x - faceLeftUnit.x * faceLeftLength * 0.42,
        y: pTop.y - faceLeftUnit.y * faceLeftLength * 0.42,
      };

      // Draw Glass Prism with refractive gradient and borders
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(pTop.x, pTop.y);
      ctx.lineTo(pLeft.x, pLeft.y);
      ctx.lineTo(pRight.x, pRight.y);
      ctx.closePath();

      // Glass fill
      const glassGradient = ctx.createLinearGradient(pTop.x, pTop.y, centerX, pLeft.y);
      glassGradient.addColorStop(0, "rgba(54, 217, 232, 0.15)");
      glassGradient.addColorStop(0.5, "rgba(72, 213, 151, 0.12)");
      glassGradient.addColorStop(1, "rgba(15, 118, 110, 0.20)");
      ctx.fillStyle = glassGradient;
      ctx.fill();

      // Glass edges
      ctx.strokeStyle = "rgba(54, 217, 232, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Apex Angle Label (A = 60°)
      if (showLabels) {
        ctx.fillStyle = "rgba(220, 229, 242, 0.85)";
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText("A = 60°", pTop.x, pTop.y - 12);
        ctx.fillStyle = "rgba(96, 165, 250, 0.8)";
        ctx.fillText("Lăng kính thủy tinh", centerX, pRight.y + 18);
      }

      if (isBeamOn) {
        // Incident Ray Angle i1
        const i1Rad = (angleDeg * Math.PI) / 180;
        const normalAngle = Math.atan2(normalLeft.y, normalLeft.x);
        const rayAngleIn = normalAngle + Math.PI - i1Rad;

        const rayStartLength = Math.max(width * 0.4, 180);
        const rayStart = {
          x: incidentPoint.x + Math.cos(rayAngleIn) * rayStartLength,
          y: incidentPoint.y + Math.sin(rayAngleIn) * rayStartLength,
        };

        // Draw Normal at Face 1
        if (showLabels) {
          ctx.save();
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(
            incidentPoint.x - normalLeft.x * 35,
            incidentPoint.y - normalLeft.y * 35
          );
          ctx.lineTo(
            incidentPoint.x + normalLeft.x * 35,
            incidentPoint.y + normalLeft.y * 35
          );
          ctx.stroke();
          ctx.restore();
        }

        // Draw Incident White Light Ray with energetic photon beam glow
        ctx.save();
        ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
        ctx.shadowBlur = 10;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(rayStart.x, rayStart.y);
        ctx.lineTo(incidentPoint.x, incidentPoint.y);
        ctx.stroke();

        // Inner bright beam core
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(rayStart.x, rayStart.y);
        ctx.lineTo(incidentPoint.x, incidentPoint.y);
        ctx.stroke();
        ctx.restore();

        if (showLabels) {
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 11px ui-sans-serif, system-ui, sans-serif";
          ctx.textAlign = "right";
          ctx.fillText("Tia sáng trắng", rayStart.x + 20, rayStart.y - 12);
        }

        // Right Face Vector & Unit
        const faceRightVector = { x: pRight.x - pTop.x, y: pRight.y - pTop.y };
        const faceRightLength = Math.hypot(faceRightVector.x, faceRightVector.y);
        const faceRightUnit = {
          x: faceRightVector.x / faceRightLength,
          y: faceRightVector.y / faceRightLength,
        };
        const normalRight = { x: faceRightUnit.y, y: -faceRightUnit.x };

        // Render each spectral color through Cauchy refraction
        SPECTRUM_COLORS.forEach((item, index) => {
          const physics = calculatePrismPhysics(item.n, angleDeg);
          if (!physics) return;

          // Ray inside prism: refracts at angle r1
          const rayAngleInside = normalAngle - physics.r1;

          // Intersection with right face
          // Line from incidentPoint with rayAngleInside: P = incidentPoint + t * dInside
          // Right face line: Q = pTop + s * faceRightVector
          const dInside = {
            x: Math.cos(rayAngleInside),
            y: Math.sin(rayAngleInside),
          };

          // 2D line intersection formula
          const det = -dInside.x * faceRightVector.y + dInside.y * faceRightVector.x;
          if (Math.abs(det) < 0.0001) return;

          const dx = pTop.x - incidentPoint.x;
          const dy = pTop.y - incidentPoint.y;
          const t = (-faceRightVector.y * dx + faceRightVector.x * dy) / det;

          const exitPoint = {
            x: incidentPoint.x + dInside.x * t,
            y: incidentPoint.y + dInside.y * t,
          };

          // Ray inside prism
          ctx.save();
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 1.8;
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.moveTo(incidentPoint.x, incidentPoint.y);
          ctx.lineTo(exitPoint.x, exitPoint.y);
          ctx.stroke();
          ctx.restore();

          // Refraction at Face 2 into air
          // Normal on right face at exitPoint
          const normR = Math.atan2(normalRight.y, normalRight.x);
          const rayAngleExit = normR - physics.i2;

          const exitRayLength = Math.max(width * 0.42, 210);
          const endPoint = {
            x: exitPoint.x + Math.cos(rayAngleExit) * exitRayLength,
            y: exitPoint.y + Math.sin(rayAngleExit) * exitRayLength,
          };

          // Emergent spectral beam with glow
          ctx.save();
          ctx.shadowColor = item.glow;
          ctx.shadowBlur = 8;
          ctx.strokeStyle = item.color;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(exitPoint.x, exitPoint.y);
          ctx.lineTo(endPoint.x, endPoint.y);
          ctx.stroke();
          ctx.restore();

          // Spectral color name tag at end of ray
          if (showLabels && (index === 0 || index === SPECTRUM_COLORS.length - 1)) {
            ctx.fillStyle = item.color;
            ctx.font = "bold 10px ui-monospace, SFMono-Regular, Menlo, monospace";
            ctx.textAlign = "left";
            const tag = index === 0 ? "Tia Đỏ (lệch ít nhất)" : "Tia Tím (lệch nhiều nhất)";
            ctx.fillText(tag, endPoint.x + 6, endPoint.y + 4);
          }
        });

        // Observation Projection Screen
        const screenX = width - 20;
        ctx.save();
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        ctx.fillRect(screenX, 20, 6, height - 40);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX, 20, 6, height - 40);

        if (showLabels) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.font = "9px ui-sans-serif, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.save();
          ctx.translate(screenX - 10, height / 2);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText("MÀN QUAN SÁT QUANG PHỔ", 0, 0);
          ctx.restore();
        }
        ctx.restore();
      } else {
        // Beam is off - show instruction message in canvas
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Chùm sáng đang tắt. Bấm nút 'Tia sáng BẬT' ở trên để bắt đầu quan sát.", width / 2, height / 2);
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

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-colors duration-200">
      {/* Top Header & Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-[#0F766E] dark:bg-[#2DD4BF] animate-pulse" />
          <h3 className="font-mono text-xs font-bold tracking-wider text-foreground uppercase">
            Mô phỏng: Tán sắc ánh sáng qua lăng kính
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsBeamOn(!isBeamOn)}
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
              isBeamOn
                ? "bg-[#EAF2FF] text-[#1558C9] border border-[#2563EB]/30 dark:bg-[#1E2D42] dark:text-[#60A5FA]"
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
            className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
              showLabels
                ? "bg-[#F0FDF4] text-[#0F766E] border border-[#0F766E]/30 dark:bg-[#064E3B] dark:text-[#2DD4BF]"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title="Bật/Tắt nhãn chú thích"
          >
            <span>Nhãn</span>
          </button>

          <button
            type="button"
            onClick={resetSimulation}
            className="inline-flex items-center justify-center rounded-md bg-muted p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Đặt lại mô phỏng"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative mt-3 h-[280px] sm:h-[320px] w-full overflow-hidden rounded-xl border border-border bg-[#0B1220]">
        <canvas ref={canvasRef} className="size-full block" />

        {/* Live Physics Measurement Overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 pointer-events-none">
          <div className="rounded-lg border border-white/10 bg-[#0B1220]/85 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-white/70">Góc tới (i₁): </span>
            <span className="font-mono text-xs font-bold text-[#60A5FA]">{angleDeg}°</span>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#0B1220]/85 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-white/70">Góc tán sắc (ΔD): </span>
            <span className="font-mono text-xs font-bold text-[#2DD4BF]">~{dispersionAngle}°</span>
          </div>
          <div className="hidden sm:block rounded-lg border border-white/10 bg-[#0B1220]/85 px-2.5 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] text-white/70">Thủy tinh Crown: </span>
            <span className="font-mono text-xs text-white">n = 1.512 - 1.543</span>
          </div>
        </div>
      </div>

      {/* Angle Slider Control */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="prism-angle" className="flex items-center gap-1.5 font-semibold text-foreground">
            <Sliders className="size-3.5 text-[#1558C9] dark:text-[#60A5FA]" />
            <span>Điều chỉnh góc tới tia sáng (i₁)</span>
          </label>
          <span className="font-mono font-bold text-[#1558C9] dark:text-[#60A5FA]">{angleDeg}°</span>
        </div>
        <input
          id="prism-angle"
          type="range"
          min="30"
          max="62"
          step="1"
          value={angleDeg}
          onChange={(e) => setAngleDeg(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#E2E8F0] dark:bg-[#243248] accent-[#1558C9] dark:accent-[#60A5FA]"
        />
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>30° (Tán sắc rộng)</span>
          <span>48° (Tiêu chuẩn)</span>
          <span>62° (Cận phản xạ)</span>
        </div>
      </div>

      {/* Physics Explanation Accordion */}
      <div className="mt-3 pt-3 border-t border-border">
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex w-full items-center justify-between text-xs font-semibold text-[#1558C9] dark:text-[#60A5FA] hover:text-[#0F766E] dark:hover:text-[#2DD4BF] transition-colors"
        >
          <span className="inline-flex items-center gap-1.5">
            <Info className="size-3.5" />
            <span>Giải thích hiện tượng tán sắc ánh sáng</span>
          </span>
          <span className="font-mono text-[11px]">{showExplanation ? "Thu gọn ▲" : "Xem thêm ▼"}</span>
        </button>

        {showExplanation && (
          <div className="mt-2.5 rounded-lg border border-[#2563EB]/20 bg-[#EAF2FF] dark:bg-[#1E2D42] dark:border-[#2563EB]/30 p-3 text-xs leading-relaxed text-foreground animate-in fade-in duration-300">
            <p className="mb-1.5 font-bold text-[#172033] dark:text-white">
              Bản chất hiện tượng tán sắc ánh sáng:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>
                <strong className="text-foreground">Ánh sáng trắng</strong> là tập hợp vô số ánh sáng đơn sắc có màu biến thiên liên tục từ đỏ đến tím.
              </li>
              <li>
                <strong className="text-foreground">Chiết suất của môi trường</strong> phụ thuộc vào bước sóng: lớn nhất đối với tia tím (n<sub>tím</sub> ≈ 1.543) và nhỏ nhất đối với tia đỏ (n<sub>đỏ</sub> ≈ 1.512).
              </li>
              <li>
                Theo định luật khúc xạ ánh sáng (Snell-Descartes), góc lệch qua lăng kính của tia tím lớn nhất và tia đỏ nhỏ nhất, làm chùm sáng bị xòe rộng thành dải 7 sắc cầu vồng rực rỡ.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
