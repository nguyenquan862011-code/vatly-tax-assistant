import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import {
  BookOpen,
  Search,
  Sparkles,
  Calculator,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/cong-thuc")({
  head: () => ({
    meta: [
      { title: "Kho công thức Vật lý THPT | TamGiangPhysics" },
      {
        name: "description",
        content:
          "Thư viện công thức Vật lý THPT chuẩn hóa cho Lớp 10, Lớp 11 và Lớp 12: Đầy đủ giải thích ký hiệu, đơn vị SI, điều kiện áp dụng và máy tính kiểm chứng thứ nguyên.",
      },
    ],
  }),
  component: CongThucPage,
});

interface PhysicsFormula {
  id: string;
  name: string;
  grade: "Lớp 10" | "Lớp 11" | "Lớp 12";
  topic: string;
  expression: string;
  meaning: string;
  variables: { symbol: string; name: string; unit: string }[];
  condition: string;
  calculator?: {
    calcFormula: (vals: Record<string, number>) => { result: number; unit: string };
    inputs: { symbol: string; label: string; unit: string; defaultVal: number }[];
  };
}

const FORMULA_DATABASE: PhysicsFormula[] = [
  {
    id: "f10-chuyen-dong-thang-bien-doi",
    name: "Công thức vận tốc chuyển động thẳng biến đổi đều",
    grade: "Lớp 10",
    topic: "Động học",
    expression: "v = v₀ + a·t",
    meaning:
      "Xác định vận tốc của chất điểm tại thời điểm t khi chuyển động với gia tốc a không đổi.",
    variables: [
      { symbol: "v", name: "Vận tốc tức thời", unit: "m/s" },
      { symbol: "v₀", name: "Vận tốc ban đầu", unit: "m/s" },
      { symbol: "a", name: "Gia tốc", unit: "m/s²" },
      { symbol: "t", name: "Thời gian chuyển động", unit: "s" },
    ],
    condition: "Gia tốc a = const dọc theo quỹ đạo thẳng.",
    calculator: {
      inputs: [
        { symbol: "v0", label: "Vận tốc ban đầu (v₀)", unit: "m/s", defaultVal: 5 },
        { symbol: "a", label: "Gia tốc (a)", unit: "m/s²", defaultVal: 2 },
        { symbol: "t", label: "Thời gian (t)", unit: "s", defaultVal: 4 },
      ],
      calcFormula: (vals) => ({
        result: (vals.v0 || 0) + (vals.a || 0) * (vals.t || 0),
        unit: "m/s",
      }),
    },
  },
  {
    id: "f10-dinh-luat-2-newton",
    name: "Định luật II Newton",
    grade: "Lớp 10",
    topic: "Động lực học",
    expression: "F = m·a",
    meaning:
      "Gia tốc của một vật tỉ lệ thuận với hợp lực tác dụng và tỉ lệ nghịch với khối lượng của vật.",
    variables: [
      { symbol: "F", name: "Hợp lực tác dụng", unit: "N (kg·m/s²)" },
      { symbol: "m", name: "Khối lượng vật", unit: "kg" },
      { symbol: "a", name: "Gia tốc thu được", unit: "m/s²" },
    ],
    condition: "Hệ quy chiếu quán tính; vận tốc vật rất nhỏ so với tốc độ ánh sáng (v ≪ c).",
    calculator: {
      inputs: [
        { symbol: "m", label: "Khối lượng vật (m)", unit: "kg", defaultVal: 3.5 },
        { symbol: "a", label: "Gia tốc (a)", unit: "m/s²", defaultVal: 4.0 },
      ],
      calcFormula: (vals) => ({
        result: (vals.m || 0) * (vals.a || 0),
        unit: "N",
      }),
    },
  },
  {
    id: "f10-dong-nang",
    name: "Động năng của chất điểm",
    grade: "Lớp 10",
    topic: "Năng lượng",
    expression: "Wđ = ½·m·v²",
    meaning: "Năng lượng do vật chuyển động sinh ra, luôn mang giá trị không âm.",
    variables: [
      { symbol: "Wđ", name: "Động năng", unit: "J (Joule)" },
      { symbol: "m", name: "Khối lượng", unit: "kg" },
      { symbol: "v", name: "Tốc độ của vật", unit: "m/s" },
    ],
    condition: "Vật rắn chuyển động tịnh tiến.",
    calculator: {
      inputs: [
        { symbol: "m", label: "Khối lượng (m)", unit: "kg", defaultVal: 2 },
        { symbol: "v", label: "Vận tốc (v)", unit: "m/s", defaultVal: 10 },
      ],
      calcFormula: (vals) => ({
        result: 0.5 * (vals.m || 0) * Math.pow(vals.v || 0, 2),
        unit: "J",
      }),
    },
  },
  {
    id: "f11-chu-ky-con-lac-lo-xo",
    name: "Chu kỳ dao động của con lắc lò xo",
    grade: "Lớp 11",
    topic: "Dao động điều hòa",
    expression: "T = 2π·√(m / k)",
    meaning: "Chu kỳ dao động điều hòa riêng của con lắc lò xo không ma sát.",
    variables: [
      { symbol: "T", name: "Chu kỳ dao động", unit: "s" },
      { symbol: "m", name: "Khối lượng quả nặng", unit: "kg" },
      { symbol: "k", name: "Độ cứng của lò xo", unit: "N/m" },
    ],
    condition: "Lò xo nhẹ, tuân theo định luật Hooke, bỏ qua mọi lực ma sát và cản môi trường.",
    calculator: {
      inputs: [
        { symbol: "m", label: "Khối lượng (m)", unit: "kg", defaultVal: 0.4 },
        { symbol: "k", label: "Độ cứng (k)", unit: "N/m", defaultVal: 100 },
      ],
      calcFormula: (vals) => ({
        result: 2 * Math.PI * Math.sqrt((vals.m || 0.1) / (vals.k || 1)),
        unit: "s",
      }),
    },
  },
  {
    id: "f11-dinh-luat-ohm",
    name: "Định luật Ohm cho toàn mạch",
    grade: "Lớp 11",
    topic: "Dòng điện không đổi",
    expression: "I = E / (R_N + r)",
    meaning:
      "Cường độ dòng điện chạy trong mạch kín tỉ lệ thuận với suất điện động và tỉ lệ nghịch với điện trở toàn phần.",
    variables: [
      { symbol: "I", name: "Cường độ dòng điện", unit: "A" },
      { symbol: "E", name: "Suất điện động của nguồn", unit: "V" },
      { symbol: "R_N", name: "Điện trở mạch ngoài", unit: "Ω" },
      { symbol: "r", name: "Điện trở trong của nguồn", unit: "Ω" },
    ],
    condition: "Dòng điện không đổi, nguồn điện tuyến tính.",
    calculator: {
      inputs: [
        { symbol: "E", label: "Suất điện động (E)", unit: "V", defaultVal: 12 },
        { symbol: "RN", label: "Điện trở ngoài (R_N)", unit: "Ω", defaultVal: 4 },
        { symbol: "r", label: "Điện trở trong (r)", unit: "Ω", defaultVal: 1 },
      ],
      calcFormula: (vals) => ({
        result: (vals.E || 0) / ((vals.RN || 0) + (vals.r || 0.01)),
        unit: "A",
      }),
    },
  },
  {
    id: "f12-phuong-trinh-khi-ly-tuong",
    name: "Phương trình trạng thái khí lý tưởng (Clapeyron - Mendeleev)",
    grade: "Lớp 12",
    topic: "Chất khí",
    expression: "p·V = n·R·T",
    meaning:
      "Mối liên hệ giữa áp suất, thể tích và nhiệt độ tuyệt đối của một khối lượng khí xác định.",
    variables: [
      { symbol: "p", name: "Áp suất", unit: "Pa (N/m²)" },
      { symbol: "V", name: "Thể tích", unit: "m³" },
      { symbol: "n", name: "Số mol khí", unit: "mol" },
      { symbol: "R", name: "Hằng số khí lý tưởng", unit: "8.31 J/(mol·K)" },
      { symbol: "T", name: "Nhiệt độ tuyệt đối", unit: "K" },
    ],
    condition: "Khí ở áp suất không quá cao và nhiệt độ không quá thấp.",
    calculator: {
      inputs: [
        { symbol: "n", label: "Số mol (n)", unit: "mol", defaultVal: 1.0 },
        { symbol: "T", label: "Nhiệt độ tuyệt đối (T)", unit: "K", defaultVal: 300 },
        { symbol: "V", label: "Thể tích (V)", unit: "m³", defaultVal: 0.025 },
      ],
      calcFormula: (vals) => ({
        result: ((vals.n || 1) * 8.31 * (vals.T || 300)) / (vals.V || 0.025),
        unit: "Pa",
      }),
    },
  },
];

function CongThucPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [selectedFormulaId, setSelectedFormulaId] = useState(FORMULA_DATABASE[0].id);
  const [calcInputs, setCalcInputs] = useState<Record<string, Record<string, number>>>({});

  const filteredFormulas = useMemo(() => {
    return FORMULA_DATABASE.filter((f) => {
      const matchGrade = gradeFilter === "all" || f.grade === gradeFilter;
      const matchQuery =
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.expression.toLowerCase().includes(searchTerm.toLowerCase());
      return matchGrade && matchQuery;
    });
  }, [searchTerm, gradeFilter]);

  const activeFormula = useMemo(() => {
    return (
      FORMULA_DATABASE.find((f) => f.id === selectedFormulaId) ||
      filteredFormulas[0] ||
      FORMULA_DATABASE[0]
    );
  }, [selectedFormulaId, filteredFormulas]);

  const currentCalcInputs = useMemo(() => {
    if (!activeFormula.calculator) return {};
    const stored = calcInputs[activeFormula.id];
    if (stored) return stored;
    const defaults: Record<string, number> = {};
    activeFormula.calculator.inputs.forEach((inp) => {
      defaults[inp.symbol] = inp.defaultVal;
    });
    return defaults;
  }, [activeFormula, calcInputs]);

  const calcResult = useMemo(() => {
    if (!activeFormula.calculator) return null;
    return activeFormula.calculator.calcFormula(currentCalcInputs);
  }, [activeFormula, currentCalcInputs]);

  const handleInputChange = (sym: string, val: number) => {
    setCalcInputs((prev) => ({
      ...prev,
      [activeFormula.id]: {
        ...currentCalcInputs,
        [sym]: val,
      },
    }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader currentPath="/cong-thuc" />

      <main className="flex-1 pb-16">
        {/* Hero */}
        <section className="border-b border-border bg-[#091A13] dark:bg-[#06120D] text-[#EDF5ED] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#38A875]/40 bg-[#16845A]/20 px-3 py-1 text-xs font-semibold text-[#72CF91] mb-3">
              <BookOpen className="size-3.5 text-[#C8ED78]" />
              <span>FORMULA HUB · KHO CÔNG THỨC VẬT LÝ THPT TOÀN DIỆN</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Sổ Tay Công Thức & Kiểm Chứng Thứ Nguyên
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[#EDF5ED]/80 leading-relaxed">
              Tra cứu nhanh công thức Lớp 10, 11, 12: Ký hiệu, đơn vị chuẩn SI, điều kiện áp dụng và
              công cụ tính toán kiểm tra đáp số tức thời.
            </p>

            {/* Filter pills and Search Bar */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 size-4 text-[#EDF5ED]/50" />
                <input
                  type="text"
                  placeholder="Tìm theo tên công thức, chủ đề hoặc biểu thức..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white placeholder:text-[#EDF5ED]/40 focus:border-[#38A875] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {["all", "Lớp 10", "Lớp 11", "Lớp 12"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGradeFilter(g)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      gradeFilter === g
                        ? "bg-[#16845A] text-white shadow-sm"
                        : "bg-white/5 text-[#EDF5ED]/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {g === "all" ? "Tất cả lớp" : g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar list */}
            <div className="lg:col-span-5 space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground px-1 mb-2">
                Danh sách công thức ({filteredFormulas.length})
              </h2>

              <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                {filteredFormulas.map((f) => {
                  const isSelected = f.id === activeFormula.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFormulaId(f.id)}
                      className={`w-full text-left rounded-xl p-3.5 transition-all border ${
                        isSelected
                          ? "border-[#16845A] dark:border-[#38A875] bg-[#16845A]/10 dark:bg-[#16845A]/20 shadow-sm"
                          : "border-border bg-card hover:border-[#16845A]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                          {f.grade} · {f.topic}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#16845A] dark:text-[#72CF91]">
                          {f.expression}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold mt-1 text-foreground">{f.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {f.meaning}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formula Detail & Interactive Calculator */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                <div>
                  <span className="rounded bg-[#16845A]/20 px-2.5 py-0.5 text-xs font-mono font-bold text-[#16845A] dark:text-[#72CF91]">
                    {activeFormula.grade} · {activeFormula.topic}
                  </span>
                  <h2 className="text-xl font-bold mt-2 text-foreground">{activeFormula.name}</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {activeFormula.meaning}
                  </p>

                  <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4 text-center">
                    <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                      Biểu thức giải tích
                    </span>
                    <div className="mt-1 text-2xl sm:text-3xl font-mono font-extrabold text-[#16845A] dark:text-[#72CF91]">
                      {activeFormula.expression}
                    </div>
                  </div>
                </div>

                {/* Variables & Units Table */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Giải thích đại lượng & Đơn vị chuẩn SI
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeFormula.variables.map((v) => (
                      <div
                        key={v.symbol}
                        className="rounded-lg border border-border bg-secondary/30 p-2.5 flex items-center justify-between"
                      >
                        <div>
                          <strong className="font-mono text-[#16845A] dark:text-[#72CF91] mr-1.5">
                            {v.symbol}
                          </strong>
                          <span className="text-foreground">{v.name}</span>
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {v.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condition */}
                <div className="rounded-xl border border-border bg-secondary/20 p-3 text-xs text-muted-foreground">
                  <strong className="text-foreground">Điều kiện áp dụng:</strong>{" "}
                  {activeFormula.condition}
                </div>

                {/* Interactive Instant Calculator */}
                {activeFormula.calculator && (
                  <div className="rounded-xl border border-[#16845A]/30 bg-[#16845A]/10 dark:bg-[#16845A]/20 p-4 space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#16845A] dark:text-[#72CF91] flex items-center gap-1.5">
                      <Calculator className="size-3.5" />
                      Máy tính kiểm chứng thứ nguyên tức thời
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeFormula.calculator.inputs.map((inp) => (
                        <div key={inp.symbol} className="space-y-1">
                          <label className="text-[11px] text-muted-foreground block truncate">
                            {inp.label}
                          </label>
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              step="0.1"
                              value={currentCalcInputs[inp.symbol] ?? inp.defaultVal}
                              onChange={(e) =>
                                handleInputChange(inp.symbol, parseFloat(e.target.value) || 0)
                              }
                              className="w-full rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-mono font-bold text-foreground"
                            />
                            <span className="text-[10px] text-muted-foreground">{inp.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {calcResult && (
                      <div className="mt-2 border-t border-border pt-2 flex items-center justify-between">
                        <span className="text-xs text-foreground font-medium">
                          Kết quả tính toán:
                        </span>
                        <div className="text-lg font-mono font-extrabold text-[#16845A] dark:text-[#72CF91]">
                          {calcResult.result.toFixed(2)}{" "}
                          <span className="text-xs font-normal text-muted-foreground">
                            {calcResult.unit}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
