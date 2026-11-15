import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import {
  Award,
  Zap,
  Sliders,
  CheckCircle2,
  RotateCcw,
  Layers,
  Calculator,
  Compass,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/vdc")({
  head: () => ({
    meta: [
      { title: "Bài toán Vận dụng cao (VDC) & Mô phỏng tương tác | TamGiangPhysics" },
      {
        name: "description",
        content:
          "Trung tâm thử thách bài toán Vật lý Vận dụng cao (VDC) THPT: Tích hợp mô phỏng tương tác, tính toán định lượng nhiều giai đoạn và phân tích đồ thị chuyên sâu.",
      },
    ],
  }),
  component: VdcPage,
});

interface VdcProblem {
  id: string;
  code: string;
  grade: "Lớp 10" | "Lớp 11" | "Lớp 12";
  title: string;
  topic: string;
  difficulty: "VDC-01" | "VDC-02" | "VDC-03" | "VDC-04";
  statement: string;
  parameters: {
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultVal: number;
  }[];
  solve: (params: Record<string, number>) => {
    steps: { stepTitle: string; formula: string; resultText: string }[];
    finalAnswer: string;
    insights: string;
  };
}

const VDC_PROBLEMS: VdcProblem[] = [
  {
    id: "vdc10-01-chuyen-dong-nhieu-giai-doan",
    code: "VDC10-01",
    grade: "Lớp 10",
    title: "Chuyển động thẳng biến đổi qua 3 giai đoạn liên tiếp",
    topic: "Động học chất điểm",
    difficulty: "VDC-02",
    statement:
      "Một đoàn tàu xuất phát từ ga (v₀ = 0) chuyển động nhanh dần đều với gia tốc a₁ trong thời gian t₁, sau đó chuyển động thẳng đều trong thời gian t₂, cuối cùng hãm phanh với gia tốc a₂ cho đến khi dừng hẳn. Tính tốc độ cực đại, tổng thời gian và tổng quãng đường đi được.",
    parameters: [
      {
        label: "Gia tốc tăng tốc (a₁)",
        unit: "m/s²",
        min: 0.2,
        max: 2.0,
        step: 0.1,
        defaultVal: 0.8,
      },
      { label: "Thời gian tăng tốc (t₁)", unit: "s", min: 10, max: 60, step: 5, defaultVal: 30 },
      { label: "Thời gian chạy đều (t₂)", unit: "s", min: 20, max: 120, step: 10, defaultVal: 60 },
      {
        label: "Độ lớn gia tốc hãm (|a₂|)",
        unit: "m/s²",
        min: 0.5,
        max: 3.0,
        step: 0.1,
        defaultVal: 1.2,
      },
    ],
    solve: (p) => {
      const a1 = p["Gia tốc tăng tốc (a₁)"] || 0.8;
      const t1 = p["Thời gian tăng tốc (t₁)"] || 30;
      const t2 = p["Thời gian chạy đều (t₂)"] || 60;
      const a2 = p["Độ lớn gia tốc hãm (|a₂|)"] || 1.2;

      const vMax = a1 * t1;
      const s1 = 0.5 * a1 * t1 * t1;
      const s2 = vMax * t2;
      const t3 = vMax / a2;
      const s3 = (vMax * vMax) / (2 * a2);
      const totalS = s1 + s2 + s3;
      const totalT = t1 + t2 + t3;
      const vAvg = totalS / totalT;

      return {
        steps: [
          {
            stepTitle: "Giai đoạn 1: Nhanh dần đều",
            formula: "v₁ = a₁·t₁; s₁ = ½·a₁·t₁²",
            resultText: `v_max = ${vMax.toFixed(1)} m/s (${(vMax * 3.6).toFixed(1)} km/h); s₁ = ${s1.toFixed(1)} m`,
          },
          {
            stepTitle: "Giai đoạn 2: Chuyển động thẳng đều",
            formula: "s₂ = v_max·t₂",
            resultText: `s₂ = ${s2.toFixed(1)} m trong ${t2} s`,
          },
          {
            stepTitle: "Giai đoạn 3: Chậm dần đều đến khi dừng",
            formula: "t₃ = v_max / |a₂|; s₃ = v_max² / (2·|a₂|)",
            resultText: `t₃ = ${t3.toFixed(2)} s; s₃ = ${s3.toFixed(1)} m`,
          },
        ],
        finalAnswer: `Tổng quãng đường S = ${totalS.toFixed(1)} m · Tổng thời gian T = ${totalT.toFixed(1)} s · Tốc độ trung bình: ${vAvg.toFixed(2)} m/s`,
        insights:
          "Đồ thị v-t là hình thang. Diện tích giới hạn bởi đồ thị và trục thời gian chính là tổng quãng đường di chuyển của đoàn tàu.",
      };
    },
  },
  {
    id: "vdc10-06-mat-phang-nghieng-ma-sat",
    code: "VDC10-06",
    grade: "Lớp 10",
    title: "Vật trượt trên mặt phẳng nghiêng có ma sát và va chạm lò xo",
    topic: "Động lực học & Năng lượng",
    difficulty: "VDC-03",
    statement:
      "Vật khối lượng m trượt không vận tốc đầu từ đỉnh mặt phẳng nghiêng góc α, chiều dài d, hệ số ma sát μ. Ở chân mặt phẳng nghiêng, vật va chạm và nén lò xo có độ cứng k. Bỏ qua mất mát năng lượng khi tiếp xúc lò xo. Tính vận tốc ở chân dốc và độ nén cực đại của lò xo.",
    parameters: [
      { label: "Khối lượng vật (m)", unit: "kg", min: 0.5, max: 5.0, step: 0.5, defaultVal: 2.0 },
      { label: "Góc nghiêng (α)", unit: "độ", min: 15, max: 60, step: 5, defaultVal: 30 },
      { label: "Chiều dài dốc (d)", unit: "m", min: 1.0, max: 10.0, step: 0.5, defaultVal: 4.0 },
      { label: "Hệ số ma sát (μ)", unit: "", min: 0.05, max: 0.4, step: 0.05, defaultVal: 0.1 },
      { label: "Độ cứng lò xo (k)", unit: "N/m", min: 100, max: 1000, step: 50, defaultVal: 400 },
    ],
    solve: (p) => {
      const m = p["Khối lượng vật (m)"] || 2.0;
      const alphaDeg = p["Góc nghiêng (α)"] || 30;
      const d = p["Chiều dài dốc (d)"] || 4.0;
      const mu = p["Hệ số ma sát (μ)"] || 0.1;
      const k = p["Độ cứng lò xo (k)"] || 400;
      const g = 9.8;

      const alphaRad = (alphaDeg * Math.PI) / 180;
      const a = g * (Math.sin(alphaRad) - mu * Math.cos(alphaRad));
      const vFoot = a > 0 ? Math.sqrt(2 * a * d) : 0;
      const wD = 0.5 * m * vFoot * vFoot;
      const xMax = k > 0 ? Math.sqrt((2 * wD) / k) * 100 : 0; // cm

      return {
        steps: [
          {
            stepTitle: "Gia tốc trên mặt dốc",
            formula: "a = g·(sinα - μ·cosα)",
            resultText: `a = ${a.toFixed(2)} m/s² (Điều kiện trượt sinα > μ·cosα: thỏa mãn)`,
          },
          {
            stepTitle: "Tốc độ tại chân mặt phẳng nghiêng",
            formula: "v = √(2·a·d)",
            resultText: `v_chân = ${vFoot.toFixed(2)} m/s · Động năng Wđ = ${wD.toFixed(2)} J`,
          },
          {
            stepTitle: "Bảo toàn cơ năng khi nén lò xo",
            formula: "½·m·v² = ½·k·x_max² ⇒ x_max = v·√(m/k)",
            resultText: `Độ nén cực đại x_max = ${xMax.toFixed(2)} cm`,
          },
        ],
        finalAnswer: `Vận tốc chân dốc: ${vFoot.toFixed(2)} m/s · Độ nén cực đại lò xo: ${xMax.toFixed(2)} cm`,
        insights:
          "Công của lực ma sát làm tiêu hao một phần thế năng trọng trường thành nhiệt năng trước khi động năng chuyển hóa trọn vẹn thành thế năng đàn hồi của lò xo.",
      };
    },
  },
  {
    id: "vdc11-08-giao-thoa-song-lech-pha",
    code: "VDC11-08",
    grade: "Lớp 11",
    title: "Giao thoa hai nguồn kết hợp lệch pha góc Δφ",
    topic: "Sóng cơ học & Giao thoa",
    difficulty: "VDC-03",
    statement:
      "Hai nguồn sóng A và B trên mặt nước cách nhau khoảng AB, phát sóng có cùng biên độ a, bước sóng λ và độ lệch pha Δφ = φ₂ - φ₁. Tìm số điểm dao động với biên độ cực đại và cực tiểu trên đoạn thẳng nối hai nguồn AB.",
    parameters: [
      { label: "Khoảng cách AB", unit: "cm", min: 6, max: 24, step: 1, defaultVal: 12 },
      { label: "Bước sóng (λ)", unit: "cm", min: 1.0, max: 4.0, step: 0.2, defaultVal: 2.0 },
      { label: "Độ lệch pha (Δφ)", unit: "π rad", min: 0, max: 2, step: 0.25, defaultVal: 0.5 },
    ],
    solve: (p) => {
      const AB = p["Khoảng cách AB"] || 12;
      const lambda = p["Bước sóng (λ)"] || 2.0;
      const deltaPhiPi = p["Độ lệch pha (Δφ)"] || 0.5;

      const phaseShift = deltaPhiPi / 2;
      const minK = Math.ceil(-AB / lambda - phaseShift);
      const maxK = Math.floor(AB / lambda - phaseShift);
      const numMax = Math.max(0, maxK - minK + 1);

      const minKT = Math.ceil(-AB / lambda - phaseShift - 0.5);
      const maxKT = Math.floor(AB / lambda - phaseShift - 0.5);
      const numMin = Math.max(0, maxKT - minKT + 1);

      return {
        steps: [
          {
            stepTitle: "Phương trình hiệu đường đi cực đại",
            formula: "d₂ - d₁ = (k + Δφ/(2π))·λ; với -AB < d₂ - d₁ < AB",
            resultText: `Điều kiện k: ${(-AB / lambda - phaseShift).toFixed(2)} < k < ${(AB / lambda - phaseShift).toFixed(2)}`,
          },
          {
            stepTitle: "Vị trí cực đại trung tâm bị dịch chuyển",
            formula: "d₂ - d₁ = (Δφ / 2π)·λ khi k = 0",
            resultText: `Dịch chuyển về phía nguồn trễ pha đoạn Δx = ${(phaseShift * lambda).toFixed(2)} cm`,
          },
        ],
        finalAnswer: `Số cực đại giao thoa: ${numMax} vân · Số cực tiểu giao thoa: ${numMin} vân`,
        insights:
          "Khi hai nguồn lệch pha, vân cực đại trung tâm không còn nằm trên đường trung trực của AB mà bị dịch chuyển về phía nguồn dao động trễ pha hơn.",
      };
    },
  },
  {
    id: "vdc12-01-chu-trinh-khi-ly-tuong",
    code: "VDC12-01",
    grade: "Lớp 12",
    title: "Chu trình nhiệt động học p-V của lượng khí lý tưởng",
    topic: "Nhiệt học & Khí lý tưởng",
    difficulty: "VDC-04",
    statement:
      "Một mol khí lý tưởng đơn nguyên tử thực hiện chu trình kín gồm: (1→2) đẳng tích nâng áp suất từ p₁ lên p₂ = 2p₁; (2→3) đẳng áp dãn nở thể tích từ V₁ lên V₂ = 2V₁; (3→1) đoạn thẳng trên đồ thị p-V đưa khí về trạng thái ban đầu. Tính công toàn chu trình và hiệu suất nhiệt động.",
    parameters: [
      { label: "Áp suất ban đầu (p₁)", unit: "kPa", min: 50, max: 200, step: 10, defaultVal: 100 },
      { label: "Thể tích ban đầu (V₁)", unit: "lít", min: 10, max: 50, step: 5, defaultVal: 20 },
    ],
    solve: (p) => {
      const p1KPa = p["Áp suất ban đầu (p₁)"] || 100;
      const v1L = p["Thể tích ban đầu (V₁)"] || 20;

      const p1 = p1KPa * 1e3; // Pa
      const v1 = v1L * 1e-3; // m³

      // Cycle Work is area of triangle in p-V plane: 1/2 * base * height
      const deltaP = p1; // 2p1 - p1
      const deltaV = v1; // 2v1 - v1
      const workJ = 0.5 * deltaP * deltaV;

      // Heat received Qin in 1->2 and 2->3
      // Cv = 1.5R, Cp = 2.5R for monoatomic gas
      const q12 = 1.5 * v1 * deltaP; // Cv * n * dT = 1.5 * V * dP
      const q23 = 2.5 * 2 * p1 * deltaV; // Cp * n * dT = 2.5 * P * dV
      const qIn = q12 + q23;
      const efficiency = (workJ / qIn) * 100;

      return {
        steps: [
          {
            stepTitle: "Công sinh ra trong một chu trình (A)",
            formula: "A = Diện tích tam giác (1-2-3) = ½·(p₂ - p₁)·(V₂ - V₁)",
            resultText: `A = ½ · ${p1KPa} kPa · ${v1L} L = ${workJ.toFixed(1)} J`,
          },
          {
            stepTitle: "Nhiệt lượng khí nhận từ nguồn nóng (Q_nhận)",
            formula: "Q_nhận = Q₁₂ (đẳng tích) + Q₂₃ (đẳng áp)",
            resultText: `Q₁₂ = ${q12.toFixed(1)} J; Q₂₃ = ${q23.toFixed(1)} J ⇒ Q_nhận = ${qIn.toFixed(1)} J`,
          },
        ],
        finalAnswer: `Công chu trình A = ${workJ.toFixed(1)} J · Hiệu suất nhiệt động η = ${efficiency.toFixed(2)}%`,
        insights:
          "Công sinh ra trong chu trình khép kín bằng đúng diện tích hình học bao bởi chu trình trên hệ tọa độ p-V.",
      };
    },
  },
];

function VdcPage() {
  const [selectedProbId, setSelectedProbId] = useState<string>(VDC_PROBLEMS[0].id);
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [paramVals, setParamVals] = useState<Record<string, Record<string, number>>>({});

  const activeProblem = useMemo(() => {
    return VDC_PROBLEMS.find((p) => p.id === selectedProbId) || VDC_PROBLEMS[0];
  }, [selectedProbId]);

  const activeParams = useMemo(() => {
    const stored = paramVals[activeProblem.id];
    if (stored) return stored;
    const defaults: Record<string, number> = {};
    activeProblem.parameters.forEach((param) => {
      defaults[param.label] = param.defaultVal;
    });
    return defaults;
  }, [activeProblem, paramVals]);

  const solution = useMemo(() => {
    return activeProblem.solve(activeParams);
  }, [activeProblem, activeParams]);

  const handleParamChange = (label: string, val: number) => {
    setParamVals((prev) => ({
      ...prev,
      [activeProblem.id]: {
        ...activeParams,
        [label]: val,
      },
    }));
  };

  const filteredProblems = useMemo(() => {
    if (gradeFilter === "all") return VDC_PROBLEMS;
    return VDC_PROBLEMS.filter((p) => p.grade === gradeFilter);
  }, [gradeFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader currentPath="/vdc" />

      <main className="flex-1 pb-16">
        {/* Hero */}
        <section className="border-b border-border bg-[#091A13] dark:bg-[#06120D] text-[#EDF5ED] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#38A875]/40 bg-[#16845A]/20 px-3 py-1 text-xs font-semibold text-[#72CF91] mb-3">
              <Award className="size-3.5 text-[#C8ED78]" />
              <span>ADVANCED PHYSICS CHALLENGE · BÀI TOÁN VẬN DỤNG CAO THPT</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Phòng Thử Thách & Giải Toán Vật Lý Nâng Cao
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[#EDF5ED]/80 leading-relaxed">
              Không chỉ là bài tập có lời giải sẵn. Mỗi thử thách là một bài toán mô phỏng nhiều
              bước: thay đổi dữ kiện thực tế, kiểm tra điều kiện biên và quan sát kết quả định
              lượng.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["all", "Lớp 10", "Lớp 11", "Lớp 12"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGradeFilter(g)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    gradeFilter === g
                      ? "bg-[#16845A] text-white shadow-sm"
                      : "bg-white/5 text-[#EDF5ED]/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {g === "all" ? "Tất cả khối lớp" : g}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar list */}
            <div className="lg:col-span-4 space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground px-1 mb-2">
                Danh sách bài toán ({filteredProblems.length})
              </h2>
              <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                {filteredProblems.map((prob) => {
                  const isSelected = prob.id === activeProblem.id;
                  return (
                    <button
                      key={prob.id}
                      type="button"
                      onClick={() => setSelectedProbId(prob.id)}
                      className={`w-full text-left rounded-xl p-3.5 transition-all border ${
                        isSelected
                          ? "border-[#16845A] dark:border-[#38A875] bg-[#16845A]/10 dark:bg-[#16845A]/20 shadow-sm"
                          : "border-border bg-card hover:border-[#16845A]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#16845A] dark:text-[#72CF91]">
                          {prob.code}
                        </span>
                        <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                          {prob.grade}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold mt-1 text-foreground">{prob.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {prob.statement}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Problem Stage */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#16845A]/20 px-2 py-0.5 text-xs font-mono font-bold text-[#16845A] dark:text-[#72CF91]">
                      {activeProblem.code}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {activeProblem.grade} · {activeProblem.topic}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-2 text-foreground">{activeProblem.title}</h2>
                  <div className="mt-3 rounded-xl border border-border bg-secondary/40 p-4 text-xs sm:text-sm text-foreground leading-relaxed">
                    <strong>Đề bài:</strong> {activeProblem.statement}
                  </div>
                </div>

                {/* Parameters Tuner */}
                <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-[#16845A] dark:text-[#38A875]" />
                    Biến số dữ kiện đầu vào
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeProblem.parameters.map((p) => {
                      const val = activeParams[p.label] ?? p.defaultVal;
                      return (
                        <div key={p.label} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-foreground">{p.label}</span>
                            <span className="font-mono font-bold text-[#16845A] dark:text-[#72CF91]">
                              {val} {p.unit}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={p.min}
                            max={p.max}
                            step={p.step}
                            value={val}
                            onChange={(e) => handleParamChange(p.label, parseFloat(e.target.value))}
                            className="w-full accent-[#16845A] dark:accent-[#38A875] cursor-pointer h-1.5 bg-border rounded-lg"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step by Step Breakdown */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Calculator className="size-3.5 text-[#16845A] dark:text-[#38A875]" />
                    Phân tích hiện tượng & Các bước thiết lập
                  </h4>

                  <div className="space-y-2.5">
                    {solution.steps.map((st, idx) => (
                      <div
                        key={st.stepTitle}
                        className="rounded-xl border border-border bg-card p-3.5 text-xs space-y-1"
                      >
                        <div className="flex items-center gap-2 font-semibold text-foreground">
                          <span className="size-5 rounded-full bg-[#16845A]/20 text-[#16845A] dark:text-[#72CF91] flex items-center justify-center font-mono text-[11px]">
                            {idx + 1}
                          </span>
                          <span>{st.stepTitle}</span>
                        </div>
                        <p className="font-mono text-muted-foreground pl-7">{st.formula}</p>
                        <p className="font-semibold text-[#16845A] dark:text-[#72CF91] pl-7">
                          ➔ {st.resultText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Verdict */}
                <div className="rounded-xl border border-[#16845A]/40 bg-[#16845A]/10 dark:bg-[#16845A]/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[#16845A] dark:text-[#72CF91] font-semibold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="size-4" />
                    <span>Đáp số định lượng & Nhận xét sư phạm</span>
                  </div>
                  <p className="text-sm font-bold text-foreground">{solution.finalAnswer}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {solution.insights}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
