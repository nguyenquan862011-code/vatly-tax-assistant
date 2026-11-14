/**
 * TamGiangPhysics - Dịch vụ Lưu trữ & Quản lý Kết quả Làm bài & Chấm điểm
 */

export interface QuestionBreakdown {
  correct: number;
  total: number;
  points?: number;
}

export interface SubmissionPayload {
  lessonPath: string;
  title: string;
  mode: "thi" | "on" | string;
  score: number; // Thang 10 (e.g. 8.5)
  rawScore: number;
  maxScore?: number;
  correctCount: number;
  totalQuestions: number;
  p1?: QuestionBreakdown | null; // Trắc nghiệm
  p2?: QuestionBreakdown | null; // Đúng/Sai
  p3?: QuestionBreakdown | null; // Trả lời ngắn / số
  timeSpent: string; // e.g. "12:45"
  submittedAt: string; // ISO date string
  studentId?: string;
  studentName?: string;
}

export interface StoredSubmission extends SubmissionPayload {
  id: string;
  wrongCount: number;
  unansweredCount: number;
  gradeStatus: "graded" | "pending_review";
  savedLocallyAt: string;
}

const STORAGE_KEY = "tamgiang_submissions_history_v1";
const STUDENT_ID_KEY = "tamgiang_student_id";

export function getOrCreateStudentId(): string {
  if (typeof window === "undefined") return "student-guest";
  try {
    let id = localStorage.getItem(STUDENT_ID_KEY);
    if (!id) {
      id = "TG-" + Math.random().toString(36).substring(2, 9).toUpperCase();
      localStorage.setItem(STUDENT_ID_KEY, id);
    }
    return id;
  } catch {
    return "student-guest";
  }
}

/**
 * Quy đổi và chuẩn hóa điểm số về thang 10
 */
export function normalizeScoreToScale10(raw: number, max: number): number {
  if (!max || max <= 0) return 0;
  const scaled = (raw / max) * 10;
  return Math.round(scaled * 100) / 100;
}

/**
 * Lưu bài làm vào LocalStorage bền vững
 */
export function saveSubmission(payload: SubmissionPayload): StoredSubmission {
  const studentId = payload.studentId || getOrCreateStudentId();
  const id = `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const total = payload.totalQuestions || 0;
  const correct = payload.correctCount || 0;
  const wrong = Math.max(0, total - correct);
  const unanswered = 0; // Khi thi thật học sinh đã nộp bài; các câu bỏ trống được tính là không đúng

  const record: StoredSubmission = {
    ...payload,
    id,
    studentId,
    wrongCount: wrong,
    unansweredCount: unanswered,
    gradeStatus: "graded",
    savedLocallyAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getSubmissionsHistory();
      const updated = [record, ...existing.filter((item) => item.id !== id)].slice(0, 100);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Không thể lưu kết quả vào localStorage:", err);
    }
  }

  return record;
}

/**
 * Lấy lịch sử làm bài (có thể lọc theo bài học)
 */
export function getSubmissionsHistory(lessonPath?: string): StoredSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as StoredSubmission[];
    if (!Array.isArray(list)) return [];
    if (!lessonPath) return list;

    const normPath = lessonPath.replace(/^\/+|\/+$/g, "");
    return list.filter((item) => item.lessonPath.replace(/^\/+|\/+$/g, "") === normPath);
  } catch (err) {
    console.warn("Lỗi đọc lịch sử bài làm:", err);
    return [];
  }
}

/**
 * Xóa toàn bộ lịch sử bài làm trong trình duyệt
 */
export function clearSubmissionsHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Không thể xóa lịch sử bài làm:", err);
  }
}
