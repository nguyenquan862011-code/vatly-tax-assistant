import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import {
  Compass,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  Table,
  LineChart,
  Download,
  PlusCircle,
  Trash2,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/thiet-ke-thi-nghiem")({
  head: () => ({
    meta: [
      { title: "Thiết kế Thí nghiệm (Experiment Designer) | TamGiangPhysics" },
      {
        name: "description",
        content:
          "Công cụ tự thiết kế phương án thí nghiệm Vật lý số: Tự chọn biến độc lập, ghi nhận bảng dữ liệu thực nghiệm, tính toán sai số và vẽ đồ thị hồi quy.",
      },
    ],
  }),
  component: ExperimentDesignerPage,
});

interface ExperimentModel {
  id: string;
  name: string;
  description: string;
  formula: string;
  independentVar: string;
  independentUnit: string;
  dependentVar: string;
  dependentUnit: string;
  computedConstantName: string;
  computedUnit: string;
  standardTrueValue: number;
  generateReading: (inputVal: number) => number;
}

const DESIGNER_MODELS: ExperimentModel[] = [
  {
    id: "free-fall-g",
    name: "Xác định gia tốc rơi tự do (g) từ độ cao và thời gian rơi",
    description:
      "Thả rơi vật từ các độ cao h khác nhau trong môi trường không lực cản, dùng cổng quang điện đo thời gian t rơi tương ứng.",
    formula: "g = 2·h / t²",
    independentVar: "Độ cao rơi (h)",
    independentUnit: "m",
    dependentVar: "Thời gian rơi (t)",
    dependentUnit: "s",
    computedConstantName: "Gia tốc trọng trường (g)",
    computedUnit: "m/s²",
    standardTrueValue: 9.81,
    generateReading: (h) => {
      // t = sqrt(2h / 9.81) + small measurement noise
      const idealT = Math.sqrt((2 * h) / 9.81);
      const noise = (Math.random() - 0.5) * 0.02;
      return Math.max(0.1, idealT + noise);
    },
  },
  {
    id: "pendulum-g",
    name: "Xác định gia tốc trọng trường (g) bằng con lắc đơn",
    description:
      "Đo chu kỳ dao động T của con lắc đơn với các chiều dài dây l khác nhau ở góc lệch nhỏ.",
    formula: "g = 4π²·l / T²",
    independentVar: "Chiều dài dây (l)",
    independentUnit: "m",
    dependentVar: "Chu kỳ dao động (T)",
    dependentUnit: "s",
    computedConstantName: "Gia tốc trọng trường (g)",
    computedUnit: "m/s²",
    standardTrueValue: 9.81,
    generateReading: (l) => {
      const idealT = 2 * Math.PI * Math.sqrt(l / 9.81);
      const noise = (Math.random() - 0.5) * 0.015;
      return Math.max(0.1, idealT + noise);
    },
  },
  {
    id: "hooke-k",
    name: "Khảo sát định luật Hooke và xác định độ cứng lò xo (k)",
    description:
      "Treo các tải trọng F khác nhau vào lò xo thẳng đứng, dùng thước đo độ dãn Δl tương ứng.",
    formula: "k = F / Δl",
    independentVar: "Lực tác dụng (F)",
    independentUnit: "N",
    dependentVar: "Độ dãn lò xo (Δl)",
    dependentUnit: "m",
    computedConstantName: "Độ cứng lò xo (k)",
    computedUnit: "N/m",
    standardTrueValue: 80.0,
    generateReading: (f) => {
      // deltaL = F / 80 + noise
      const idealDeltaL = f / 80.0;
      const noise = (Math.random() - 0.5) * 0.001;
      return Math.max(0.005, idealDeltaL + noise);
    },
  },
  {
    id: "ohm-r",
    name: "Khảo sát định luật Ohm và đo điện trở chưa biết (R_x)",
    description:
      "Thay đổi điện áp U cấp vào hai đầu dây dẫn và dùng ampe kế đo cường độ dòng điện I qua mạch.",
    formula: "R_x = U / I",
    independentVar: "Hiệu điện thế (U)",
    independentUnit: "V",
    dependentVar: "Cường độ dòng điện (I)",
    dependentUnit: "A",
    computedConstantName: "Điện trở dây dẫn (R)",
    computedUnit: "Ω",
    standardTrueValue: 15.0,
    generateReading: (u) => {
      // I = U / 15 + noise
      const idealI = u / 15.0;
      const noise = (Math.random() - 0.5) * 0.01;
      return Math.max(0.01, idealI + noise);
    },
  },
];

interface MeasurementRow {
  trial: number;
  inputVal: number;
  measuredVal: number;
  calculatedConstant: number;
}

function ExperimentDesignerPage() {
  const [selectedModelId, setSelectedModelId] = useState<string>(DESIGNER_MODELS[0].id);
  const [inputValue, setInputValue] = useState<number>(1.0);
  const [trials, setTrials] = useState<MeasurementRow[]>([]);

  const activeModel = useMemo(() => {
    return DESIGNER_MODELS.find((m) => m.id === selectedModelId) || DESIGNER_MODELS[0];
  }, [selectedModelId]);

  const handleAddModelTrial = () => {
    const reading = activeModel.generateReading(inputValue);
    let calculated = 0;
    if (activeModel.id === "free-fall-g") {
      calculated = (2 * inputValue) / (reading * reading);
    } else if (activeModel.id === "pendulum-g") {
      calculated = (4 * Math.PI * Math.PI * inputValue) / (reading * reading);
    } else if (activeModel.id === "hooke-k") {
      calculated = inputValue / reading;
    } else if (activeModel.id === "ohm-r") {
      calculated = inputValue / reading;
    }

    const newRow: MeasurementRow = {
      trial: trials.length + 1,
      inputVal: inputValue,
      measuredVal: reading,
      calculatedConstant: calculated,
    };
    setTrials((prev) => [...prev, newRow]);
  };

  const handleClearTrials = () => {
    setTrials([]);
  };

  const stats = useMemo(() => {
    if (trials.length === 0) return null;
    const values = trials.map((t) => t.calculatedConstant);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    const absErrors = values.map((v) => Math.abs(v - avg));
    const meanAbsError = absErrors.reduce((sum, e) => sum + e, 0) / values.length;
    const relativeError = (meanAbsError / avg) * 100;
    const deviationFromStandard =
      Math.abs((avg - activeModel.standardTrueValue) / activeModel.standardTrueValue) * 100;

    return {
      average: avg,
      meanAbsError,
      relativeError,
      deviationFromStandard,
    };
  }, [trials, activeModel]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader currentPath="/thiet-ke-thi-nghiem" />

      <main className="flex-1 pb-16">
        {/* Hero */}
        <section className="border-b border-border bg-[#091A13] dark:bg-[#06120D] text-[#EDF5ED] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#38A875]/40 bg-[#16845A]/20 px-3 py-1 text-xs font-semibold text-[#72CF91] mb-3">
              <Compass className="size-3.5 text-[#C8ED78]" />
              <span>EXPERIMENT DESIGNER · PHÒNG THIẾT KẾ PHƯƠNG ÁN THỰC NGHIỆM</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Tự Thiết Kế Thí Nghiệm & Xử Lý Số Liệu
            </h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-[#EDF5ED]/80 leading-relaxed">
              Tự chọn mô hình khoa học, điều chỉnh biến độc lập, thực hiện các lượt đo, tính sai số
              tuyệt đối và sai số tỉ đối theo chuẩn phương pháp nghiên cứu thực nghiệm Vật lý.
            </p>
          </div>
        </section>

        {/* Studio Body */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Controls: Select Model & Inputs */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  1. Chọn mô hình thực nghiệm
                </h3>

                <div className="space-y-2">
                  {DESIGNER_MODELS.map((m) => {
                    const isSelected = m.id === activeModel.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedModelId(m.id);
                          setTrials([]);
                        }}
                        className={`w-full text-left rounded-xl p-3 text-xs transition-all border ${
                          isSelected
                            ? "border-[#16845A] dark:border-[#38A875] bg-[#16845A]/10 text-foreground font-semibold"
                            : "border-border bg-card hover:bg-secondary/40 text-muted-foreground"
                        }`}
                      >
                        <p className="font-semibold text-foreground">{m.name}</p>
                        <p className="font-mono text-[11px] text-[#16845A] dark:text-[#72CF91] mt-1">
                          {m.formula}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Input adjuster */}
                <div className="border-t border-border pt-4 space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    2. Biến độc lập: {activeModel.independentVar}
                  </h4>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="100"
                      value={inputValue}
                      onChange={(e) => setInputValue(parseFloat(e.target.value) || 0.1)}
                      className="w-28 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-mono font-bold text-foreground"
                    />
                    <span className="text-xs text-muted-foreground">
                      {activeModel.independentUnit}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddModelTrial}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#16845A] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#38A875] transition-colors shadow-sm"
                  >
                    <PlusCircle className="size-4" /> Ghi nhận 1 lần đo vào bảng
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Data Table & Analysis */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Bảng Số Liệu Thực Nghiệm
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      Công thức suy luận: {activeModel.formula}
                    </p>
                  </div>

                  {trials.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearTrials}
                      className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:underline"
                    >
                      <Trash2 className="size-3.5" /> Xóa tất cả lần đo
                    </button>
                  )}
                </div>

                {/* Data Table */}
                {trials.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border p-8 text-center text-xs text-muted-foreground">
                    <Table className="mx-auto size-8 text-muted-foreground/40 mb-2" />
                    Chưa có lần đo nào. Hãy chọn giá trị biến độc lập và nhấn &ldquo;Ghi nhận 1 lần
                    đo&rdquo;.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="border-b border-border text-muted-foreground font-mono">
                        <tr>
                          <th className="py-2 px-3">Lần đo #</th>
                          <th className="py-2 px-3">
                            {activeModel.independentVar} ({activeModel.independentUnit})
                          </th>
                          <th className="py-2 px-3">
                            {activeModel.dependentVar} ({activeModel.dependentUnit})
                          </th>
                          <th className="py-2 px-3">
                            {activeModel.computedConstantName} ({activeModel.computedUnit})
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {trials.map((t) => (
                          <tr key={t.trial} className="hover:bg-secondary/30">
                            <td className="py-2 px-3 font-mono font-bold text-[#16845A] dark:text-[#72CF91]">
                              #{t.trial}
                            </td>
                            <td className="py-2 px-3 font-mono">{t.inputVal.toFixed(2)}</td>
                            <td className="py-2 px-3 font-mono">{t.measuredVal.toFixed(3)}</td>
                            <td className="py-2 px-3 font-mono font-semibold">
                              {t.calculatedConstant.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Error Analysis Card */}
                {stats && (
                  <div className="rounded-xl border border-[#16845A]/30 bg-[#16845A]/10 dark:bg-[#16845A]/20 p-5 space-y-3">
                    <div className="flex items-center gap-2 text-[#16845A] dark:text-[#72CF91] font-semibold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="size-4" />
                      <span>Xử lý sai số phép đo (N = {trials.length} lần)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                      <div className="rounded-lg bg-card border border-border p-3">
                        <span className="text-muted-foreground block text-[11px]">
                          Giá trị trung bình ({activeModel.computedConstantName})
                        </span>
                        <span className="text-lg font-bold text-foreground">
                          {stats.average.toFixed(2)}{" "}
                          <span className="text-xs font-normal">{activeModel.computedUnit}</span>
                        </span>
                      </div>

                      <div className="rounded-lg bg-card border border-border p-3">
                        <span className="text-muted-foreground block text-[11px]">
                          Sai số tuyệt đối trung bình (Δ)
                        </span>
                        <span className="text-lg font-bold text-[#16845A] dark:text-[#72CF91]">
                          ±{stats.meanAbsError.toFixed(3)}
                        </span>
                      </div>

                      <div className="rounded-lg bg-card border border-border p-3">
                        <span className="text-muted-foreground block text-[11px]">
                          Sai số tỉ đối (δ%)
                        </span>
                        <span className="text-lg font-bold text-[#16845A] dark:text-[#72CF91]">
                          {stats.relativeError.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-foreground font-mono pt-1">
                      Kết quả báo cáo thực nghiệm:{" "}
                      <strong>
                        X = ({stats.average.toFixed(2)} ± {stats.meanAbsError.toFixed(2)}){" "}
                        {activeModel.computedUnit} (với độ lệch chuẩn so với giá trị chuẩn:{" "}
                        {stats.deviationFromStandard.toFixed(2)}%)
                      </strong>
                    </p>
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
