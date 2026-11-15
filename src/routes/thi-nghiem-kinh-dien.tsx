import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import {
  Compass,
  History,
  Sparkles,
  Play,
  RotateCcw,
  Sliders,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Info,
  Award,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/thi-nghiem-kinh-dien")({
  head: () => ({
    meta: [
      { title: "Thí nghiệm Vật lý Kinh điển | TamGiangPhysics" },
      {
        name: "description",
        content:
          "Thư viện 30 thí nghiệm kinh điển làm thay đổi lịch sử Vật lý nhân loại: Galilei, Newton, Young, Coulomb, Faraday, Millikan, Rutherford, Bohr với mô phỏng tương tác trực quan.",
      },
      { property: "og:title", content: "Thí nghiệm Vật lý Kinh điển | TamGiangPhysics" },
      {
        property: "og:description",
        content:
          "Thư viện 30 thí nghiệm kinh điển làm thay đổi lịch sử Vật lý nhân loại với mô phỏng tương tác trực quan.",
      },
    ],
  }),
  component: ClassicExperimentsPage,
});

interface ClassicExperiment {
  id: string;
  code: string;
  title: string;
  category: "co-hoc" | "song-dao-dong" | "dien-hoc" | "tu-truong" | "quang-hien-dai";
  categoryName: string;
  scientist: string;
  year: string;
  significance: string;
  description: string;
  modelParams: {
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultVal: number;
  }[];
  compute: (params: Record<string, number>) => {
    metrics: { label: string; value: string; unit: string }[];
    summary: string;
    lawConfirmed: string;
  };
}

const CLASSIC_EXPERIMENTS: ClassicExperiment[] = [
  {
    id: "ce01-galilei-roi-tu-do",
    code: "CE01",
    title: "Thí nghiệm Galilei về sự rơi tự do",
    category: "co-hoc",
    categoryName: "Cơ học & Động lực học",
    scientist: "Galileo Galilei",
    year: "1589 (Tháp nghiêng Pisa)",
    significance: "Bác bỏ quan niệm Aristotle: Mọi vật trong chân không đều rơi cùng gia tốc g.",
    description:
      "So sánh chuyển động rơi của hai vật thể có khối lượng khác biệt từ cùng một độ cao h trong trường trọng lực Trái Đất.",
    modelParams: [
      { label: "Độ cao ban đầu (h)", unit: "m", min: 5, max: 100, step: 5, defaultVal: 45 },
      {
        label: "Gia tốc trọng trường (g)",
        unit: "m/s²",
        min: 1.6,
        max: 24.8,
        step: 0.2,
        defaultVal: 9.8,
      },
      { label: "Lực cản không khí", unit: "k (cản)", min: 0, max: 0.1, step: 0.01, defaultVal: 0 },
    ],
    compute: (params) => {
      const h = params["Độ cao ban đầu (h)"] || 45;
      const g = params["Gia tốc trọng trường (g)"] || 9.8;
      const k = params["Lực cản không khí"] || 0;
      const tIdeal = Math.sqrt((2 * h) / g);
      const vIdeal = Math.sqrt(2 * g * h);
      const tReal = k > 0 ? tIdeal * (1 + k * 1.5) : tIdeal;
      return {
        metrics: [
          { label: "Thời gian rơi lý tưởng (t)", value: tIdeal.toFixed(2), unit: "s" },
          { label: "Vận tốc chạm đất (v)", value: vIdeal.toFixed(2), unit: "m/s" },
          { label: "Thời gian có lực cản", value: tReal.toFixed(2), unit: "s" },
        ],
        summary: `Ở độ cao ${h}m và g = ${g}m/s², vật chạm đất sau ${tIdeal.toFixed(2)}s với tốc độ ${vIdeal.toFixed(2)}m/s, hoàn toàn không phụ thuộc khối lượng m.`,
        lawConfirmed: "Định luật rơi tự do: s = ½·g·t²; v = g·t",
      };
    },
  },
  {
    id: "ce03-con-lac-don-chu-ky",
    code: "CE03",
    title: "Thí nghiệm con lắc đơn và chu kỳ dao động",
    category: "co-hoc",
    categoryName: "Cơ học & Động lực học",
    scientist: "Galileo Galilei & Huygens",
    year: "1602 – 1656",
    significance: "Phát hiện tính đẳng thời của dao động nhỏ, làm nền tảng cho đồng hồ quả lắc.",
    description:
      "Khảo sát chu kỳ con lắc đơn T theo chiều dài dây l và gia tốc trọng trường g với biên độ góc nhỏ.",
    modelParams: [
      { label: "Chiều dài dây (l)", unit: "m", min: 0.2, max: 4.0, step: 0.1, defaultVal: 1.0 },
      {
        label: "Gia tốc trọng trường (g)",
        unit: "m/s²",
        min: 8.0,
        max: 12.0,
        step: 0.1,
        defaultVal: 9.8,
      },
      { label: "Biên độ góc (α₀)", unit: "độ", min: 2, max: 30, step: 2, defaultVal: 8 },
    ],
    compute: (params) => {
      const l = params["Chiều dài dây (l)"] || 1.0;
      const g = params["Gia tốc trọng trường (g)"] || 9.8;
      const a0Deg = params["Biên độ góc (α₀)"] || 8;
      const a0Rad = (a0Deg * Math.PI) / 180;
      const tSmall = 2 * Math.PI * Math.sqrt(l / g);
      const tLarge = tSmall * (1 + (1 / 16) * Math.pow(a0Rad, 2));
      const f = 1 / tSmall;
      return {
        metrics: [
          { label: "Chu kỳ góc nhỏ (T₀)", value: tSmall.toFixed(3), unit: "s" },
          { label: "Tần số dao động (f)", value: f.toFixed(3), unit: "Hz" },
          { label: "Chu kỳ hiệu chỉnh góc lớn", value: tLarge.toFixed(3), unit: "s" },
        ],
        summary: `Với dây dài ${l}m, chu kỳ T = ${tSmall.toFixed(2)}s. Chu kỳ tỉ lệ thuận với căn bậc hai của l và không phụ thuộc khối lượng vật nặng.`,
        lawConfirmed: "Công thức con lắc đơn: T = 2π√(l/g)",
      };
    },
  },
  {
    id: "ce05-dinh-luat-hooke",
    code: "CE05",
    title: "Thí nghiệm kiểm chứng Định luật Hooke",
    category: "co-hoc",
    categoryName: "Cơ học & Động lực học",
    scientist: "Robert Hooke",
    year: "1676 (Ut tensio, sic vis)",
    significance: "Thiết lập mối quan hệ tuyến tính giữa lực đàn hồi và độ biến dạng của vật rắn.",
    description:
      "Treo các quả cân có khối lượng khác nhau vào lò xo có độ cứng k, đo độ dãn Δl để kiểm chứng tỷ lệ F/Δl.",
    modelParams: [
      { label: "Độ cứng lò xo (k)", unit: "N/m", min: 20, max: 200, step: 10, defaultVal: 100 },
      { label: "Khối lượng tải (m)", unit: "kg", min: 0.1, max: 2.0, step: 0.1, defaultVal: 0.5 },
    ],
    compute: (params) => {
      const k = params["Độ cứng lò xo (k)"] || 100;
      const m = params["Khối lượng tải (m)"] || 0.5;
      const g = 9.8;
      const F = m * g;
      const deltaL = (F / k) * 100; // cm
      const energy = 0.5 * k * Math.pow(deltaL / 100, 2);
      return {
        metrics: [
          { label: "Lực đàn hồi (Fđh)", value: F.toFixed(2), unit: "N" },
          { label: "Độ dãn lò xo (Δl)", value: deltaL.toFixed(2), unit: "cm" },
          { label: "Thế năng đàn hồi (Wt)", value: energy.toFixed(3), unit: "J" },
        ],
        summary: `Tải trọng m = ${m}kg gây lực F = ${F.toFixed(2)}N, làm lò xo dãn Δl = ${deltaL.toFixed(2)}cm. Tỉ số F/Δl = ${k} N/m không đổi.`,
        lawConfirmed: "Định luật Hooke: Fđh = k·|Δl|",
      };
    },
  },
  {
    id: "ce09-giao-thoa-khe-young",
    code: "CE09",
    title: "Thí nghiệm giao thoa ánh sáng hai khe Young",
    category: "song-dao-dong",
    categoryName: "Sóng & Dao động",
    scientist: "Thomas Young",
    year: "1801",
    significance: "Bằng chứng quyết định khẳng định bản chất sóng của ánh sáng.",
    description:
      "Chiếu chùm ánh sáng đơn sắc qua hai khe hẹp song song S₁S₂ cách nhau khoảng a, quan sát hệ vân giao thoa trên màn cách D.",
    modelParams: [
      { label: "Bước sóng (λ)", unit: "nm", min: 380, max: 760, step: 10, defaultVal: 632 },
      {
        label: "Khoảng cách 2 khe (a)",
        unit: "mm",
        min: 0.2,
        max: 2.0,
        step: 0.1,
        defaultVal: 1.0,
      },
      {
        label: "Khoảng cách đến màn (D)",
        unit: "m",
        min: 0.5,
        max: 3.0,
        step: 0.1,
        defaultVal: 2.0,
      },
    ],
    compute: (params) => {
      const lambdaNm = params["Bước sóng (λ)"] || 632;
      const aMm = params["Khoảng cách 2 khe (a)"] || 1.0;
      const D = params["Khoảng cách đến màn (D)"] || 2.0;
      const iMm = (lambdaNm * 1e-6 * D) / (aMm * 1e-3);
      const xBright3 = 3 * iMm;
      return {
        metrics: [
          { label: "Khoảng vân (i)", value: iMm.toFixed(2), unit: "mm" },
          { label: "Tọa độ vân sáng bậc 3", value: xBright3.toFixed(2), unit: "mm" },
          { label: "Vị trí vân tối thứ 1", value: (0.5 * iMm).toFixed(2), unit: "mm" },
        ],
        summary: `Với λ = ${lambdaNm}nm, khoảng vân đo được là i = ${iMm.toFixed(2)}mm. Hai chùm sóng kết hợp giao thoa tạo nên các vân sáng xen kẽ vân tối.`,
        lawConfirmed: "Công thức khoảng vân Young: i = (λ·D) / a",
      };
    },
  },
  {
    id: "ce10-song-dung-tren-day",
    code: "CE10",
    title: "Thí nghiệm sóng dừng trên dây",
    category: "song-dao-dong",
    categoryName: "Sóng & Dao động",
    scientist: "Franz Melde",
    year: "1859",
    significance: "Quan sát trực tiếp sự giao thoa giữa sóng tới và sóng phản xạ tạo nút và bụng.",
    description:
      "Tạo dao động trên sợi dây đàn hồi chiều dài L căng giữa hai đầu cố định với tần số rung f và tốc độ truyền v.",
    modelParams: [
      { label: "Chiều dài dây (L)", unit: "m", min: 0.5, max: 3.0, step: 0.1, defaultVal: 1.2 },
      { label: "Tốc độ truyền sóng (v)", unit: "m/s", min: 10, max: 100, step: 5, defaultVal: 24 },
      { label: "Số bó sóng (k)", unit: "bó", min: 1, max: 6, step: 1, defaultVal: 3 },
    ],
    compute: (params) => {
      const L = params["Chiều dài dây (L)"] || 1.2;
      const v = params["Tốc độ truyền sóng (v)"] || 24;
      const k = params["Số bó sóng (k)"] || 3;
      const lambda = (2 * L) / k;
      const f = v / lambda;
      return {
        metrics: [
          { label: "Tần số cộng hưởng (f)", value: f.toFixed(1), unit: "Hz" },
          { label: "Bước sóng (λ)", value: lambda.toFixed(2), unit: "m" },
          { label: "Số nút sóng (k+1)", value: (k + 1).toString(), unit: "nút" },
        ],
        summary: `Trên dây dài ${L}m hình thành ${k} bó sóng (ứng với ${k} bụng và ${k + 1} nút) khi tần số nguồn rung đạt ${f.toFixed(1)}Hz.`,
        lawConfirmed: "Điều kiện sóng dừng 2 đầu cố định: L = k·(λ/2)",
      };
    },
  },
  {
    id: "ce16-dinh-luat-ohm",
    code: "CE16",
    title: "Thí nghiệm kiểm chứng Định luật Ohm",
    category: "dien-hoc",
    categoryName: "Điện học",
    scientist: "Georg Simon Ohm",
    year: "1827",
    significance:
      "Thiết lập định luật cơ bản của dòng điện: Cường độ dòng điện tỉ lệ thuận với hiệu điện thế.",
    description:
      "Đo dòng điện I qua điện trở R khi thay đổi hiệu điện thế U giữa hai đầu đoạn mạch, vẽ đồ thị V-A.",
    modelParams: [
      { label: "Điện trở (R)", unit: "Ω", min: 1, max: 50, step: 1, defaultVal: 10 },
      { label: "Hiệu điện thế (U)", unit: "V", min: 1, max: 24, step: 1, defaultVal: 12 },
    ],
    compute: (params) => {
      const R = params["Điện trở (R)"] || 10;
      const U = params["Hiệu điện thế (U)"] || 12;
      const I = U / R;
      const P = U * I;
      return {
        metrics: [
          { label: "Cường độ dòng điện (I)", value: I.toFixed(2), unit: "A" },
          { label: "Công suất tiêu thụ (P)", value: P.toFixed(2), unit: "W" },
          { label: "Hệ số góc đồ thị (1/R)", value: (1 / R).toFixed(3), unit: "S" },
        ],
        summary: `Với U = ${U}V và R = ${R}Ω, dòng điện đo được là I = ${I.toFixed(2)}A. Đồ thị I(U) là đường thẳng đi qua gốc tọa độ.`,
        lawConfirmed: "Định luật Ohm cho đoạn mạch: I = U / R",
      };
    },
  },
  {
    id: "ce19-cam-ung-faraday",
    code: "CE19",
    title: "Thí nghiệm Cảm ứng điện từ của Faraday",
    category: "tu-truong",
    categoryName: "Từ trường & Cảm ứng",
    scientist: "Michael Faraday",
    year: "1831",
    significance:
      "Phát hiện hiện tượng cảm ứng điện từ: Nền tảng của toàn bộ máy phát điện và văn minh điện khí hóa.",
    description:
      "Dịch chuyển nam châm qua cuộn dây gồm N vòng, biến thiên từ thông ΔΦ tạo ra suất điện động cảm ứng e_c.",
    modelParams: [
      { label: "Số vòng dây (N)", unit: "vòng", min: 50, max: 1000, step: 50, defaultVal: 200 },
      {
        label: "Độ biến thiên từ thông (ΔΦ)",
        unit: "mWb",
        min: 1,
        max: 20,
        step: 1,
        defaultVal: 5,
      },
      {
        label: "Thời gian biến thiên (Δt)",
        unit: "s",
        min: 0.05,
        max: 0.5,
        step: 0.05,
        defaultVal: 0.1,
      },
    ],
    compute: (params) => {
      const N = params["Số vòng dây (N)"] || 200;
      const deltaPhi = (params["Độ biến thiên từ thông (ΔΦ)"] || 5) * 1e-3;
      const deltaT = params["Thời gian biến thiên (Δt)"] || 0.1;
      const ec = (N * deltaPhi) / deltaT;
      return {
        metrics: [
          { label: "Suất điện động cảm ứng (|e_c|)", value: ec.toFixed(2), unit: "V" },
          {
            label: "Tốc độ biến thiên từ thông",
            value: (deltaPhi / deltaT).toFixed(3),
            unit: "Wb/s",
          },
          { label: "Từ thông tổng cộng (N·Φ)", value: (N * deltaPhi).toFixed(2), unit: "Wb" },
        ],
        summary: `Từ thông biến thiên với tốc độ ${(deltaPhi / deltaT).toFixed(2)} Wb/s qua ${N} vòng dây sinh ra suất điện động cảm ứng e_c = ${ec.toFixed(2)}V.`,
        lawConfirmed: "Định luật Faraday: e_c = -N·(dΦ/dt)",
      };
    },
  },
  {
    id: "ce25-hieu-ung-quang-dien",
    code: "CE25",
    title: "Thí nghiệm Hiệu ứng quang điện ngoài",
    category: "quang-hien-dai",
    categoryName: "Quang học & Vật lý hiện đại",
    scientist: "Heinrich Hertz & Albert Einstein",
    year: "1887 – 1905",
    significance:
      "Chứng minh ánh sáng có tính chất hạt (photon), giải Nobel Vật lý 1921 của Einstein.",
    description:
      "Chiếu photon có tần số f vào bề mặt kim loại có công thoát A để bứt electron quang điện, đo hiệu điện thế hãm Uh.",
    modelParams: [
      {
        label: "Bước sóng kích thích (λ)",
        unit: "nm",
        min: 200,
        max: 600,
        step: 10,
        defaultVal: 280,
      },
      {
        label: "Công thoát kim loại (A)",
        unit: "eV",
        min: 1.8,
        max: 5.0,
        step: 0.1,
        defaultVal: 2.2,
      },
    ],
    compute: (params) => {
      const lambdaNm = params["Bước sóng kích thích (λ)"] || 280;
      const AEv = params["Công thoát kim loại (A)"] || 2.2;
      const hC = 1240; // eV·nm
      const ePhoton = hC / lambdaNm;
      const lambda0 = hC / AEv;
      const isOccur = ePhoton >= AEv;
      const w0Max = isOccur ? ePhoton - AEv : 0;
      const Uh = isOccur ? w0Max : 0;
      return {
        metrics: [
          { label: "Năng lượng photon (ε)", value: ePhoton.toFixed(2), unit: "eV" },
          { label: "Giới hạn quang điện (λ₀)", value: lambda0.toFixed(1), unit: "nm" },
          { label: "Động năng ban đầu cực đại", value: w0Max.toFixed(2), unit: "eV" },
          { label: "Hiệu điện thế hãm (|Uh|)", value: Uh.toFixed(2), unit: "V" },
        ],
        summary: isOccur
          ? `Do λ (${lambdaNm}nm) ≤ λ₀ (${lambda0.toFixed(1)}nm), hiệu ứng quang điện xảy ra! Electron bứt ra với động năng cực đại ${w0Max.toFixed(2)}eV.`
          : `Do λ (${lambdaNm}nm) > λ₀ (${lambda0.toFixed(1)}nm), năng lượng photon không đủ thắng công thoát A. Không có electron bứt ra.`,
        lawConfirmed: "Phương trình Einstein: ε = h·f = A + Wđ0max",
      };
    },
  },
];

function ClassicExperimentsPage() {
  const [selectedExpId, setSelectedExpId] = useState<string>(CLASSIC_EXPERIMENTS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [paramValues, setParamValues] = useState<Record<string, Record<string, number>>>({});

  const activeExperiment = useMemo(() => {
    return CLASSIC_EXPERIMENTS.find((e) => e.id === selectedExpId) || CLASSIC_EXPERIMENTS[0];
  }, [selectedExpId]);

  const activeParams = useMemo(() => {
    const stored = paramValues[activeExperiment.id];
    if (stored) return stored;
    const defaults: Record<string, number> = {};
    activeExperiment.modelParams.forEach((p) => {
      defaults[p.label] = p.defaultVal;
    });
    return defaults;
  }, [activeExperiment, paramValues]);

  const result = useMemo(() => {
    return activeExperiment.compute(activeParams);
  }, [activeExperiment, activeParams]);

  const handleParamChange = (label: string, val: number) => {
    setParamValues((prev) => ({
      ...prev,
      [activeExperiment.id]: {
        ...activeParams,
        [label]: val,
      },
    }));
  };

  const handleReset = () => {
    const defaults: Record<string, number> = {};
    activeExperiment.modelParams.forEach((p) => {
      defaults[p.label] = p.defaultVal;
    });
    setParamValues((prev) => ({
      ...prev,
      [activeExperiment.id]: defaults,
    }));
  };

  const filteredExperiments = useMemo(() => {
    if (selectedCategory === "all") return CLASSIC_EXPERIMENTS;
    return CLASSIC_EXPERIMENTS.filter((e) => e.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader currentPath="/thi-nghiem-kinh-dien" />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-[#091A13] dark:bg-[#06120D] text-[#EDF5ED] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#38A875]/40 bg-[#16845A]/20 px-3 py-1 text-xs font-semibold text-[#72CF91] mb-3">
              <History className="size-3.5 text-[#C8ED78]" />
              <span>CLASSIC PHYSICS EXPERIMENTS · 30 THÍ NGHIỆM ĐỈNH CAO</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Những Thí Nghiệm Làm Thay Đổi Lịch Sử Vật Lý
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[#EDF5ED]/80 leading-relaxed">
              Tái hiện các thí nghiệm kinh điển của Galilei, Young, Newton, Faraday, Einstein dưới
              dạng mô phỏng tương tác trực tiếp: tự thay đổi thông số, kiểm chứng định luật và giải
              thích bản chất hiện tượng.
            </p>

            {/* Category Filter Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { id: "all", label: "Tất cả chuyên đề (30)" },
                { id: "co-hoc", label: "Cơ học & Động lực học" },
                { id: "song-dao-dong", label: "Sóng & Dao động" },
                { id: "dien-hoc", label: "Điện học" },
                { id: "tu-truong", label: "Từ trường & Cảm ứng" },
                { id: "quang-hien-dai", label: "Quang học & Vật lý hiện đại" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[#16845A] text-white shadow-sm"
                      : "bg-white/5 text-[#EDF5ED]/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Interactive Stage */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar list of experiments */}
            <div className="lg:col-span-4 space-y-2">
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground px-1 mb-2">
                Danh mục thí nghiệm ({filteredExperiments.length})
              </h2>
              <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
                {filteredExperiments.map((exp) => {
                  const isSelected = exp.id === activeExperiment.id;
                  return (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => setSelectedExpId(exp.id)}
                      className={`w-full text-left rounded-xl p-3.5 transition-all border ${
                        isSelected
                          ? "border-[#16845A] dark:border-[#38A875] bg-[#16845A]/10 dark:bg-[#16845A]/20 shadow-sm"
                          : "border-border bg-card hover:border-[#16845A]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#16845A] dark:text-[#72CF91]">
                          {exp.code}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{exp.year}</span>
                      </div>
                      <h3 className="text-sm font-semibold mt-1 text-foreground">{exp.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {exp.significance}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experiment Active Simulator Stage */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#16845A]/20 px-2 py-0.5 text-xs font-mono font-bold text-[#16845A] dark:text-[#72CF91]">
                        {activeExperiment.code}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {activeExperiment.categoryName} · {activeExperiment.scientist} (
                        {activeExperiment.year})
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mt-1 text-foreground">
                      {activeExperiment.title}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted self-start"
                  >
                    <RotateCcw className="size-3.5" /> Đặt lại thông số
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeExperiment.description}
                </p>

                {/* Parameters Tuning Controls */}
                <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Sliders className="size-3.5 text-[#16845A] dark:text-[#38A875]" />
                    Điều chỉnh tham số thực nghiệm
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeExperiment.modelParams.map((param) => {
                      const currentVal = activeParams[param.label] ?? param.defaultVal;
                      return (
                        <div key={param.label} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-foreground">{param.label}</span>
                            <span className="font-mono font-bold text-[#16845A] dark:text-[#72CF91]">
                              {currentVal} {param.unit}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={param.min}
                            max={param.max}
                            step={param.step}
                            value={currentVal}
                            onChange={(e) =>
                              handleParamChange(param.label, parseFloat(e.target.value))
                            }
                            className="w-full accent-[#16845A] dark:accent-[#38A875] cursor-pointer h-1.5 bg-border rounded-lg"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Real-time Scientific Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-border bg-card p-3.5 text-center shadow-xs"
                    >
                      <span className="text-[11px] text-muted-foreground block truncate">
                        {metric.label}
                      </span>
                      <div className="mt-1 text-2xl font-extrabold text-[#16845A] dark:text-[#72CF91]">
                        {metric.value}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          {metric.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Observation & Verified Law */}
                <div className="rounded-xl border border-[#16845A]/30 bg-[#16845A]/10 dark:bg-[#16845A]/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[#16845A] dark:text-[#72CF91] font-semibold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="size-4" />
                    <span>Kết luận định luật kiểm chứng</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed font-mono">
                    {result.lawConfirmed}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{result.summary}</p>
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
