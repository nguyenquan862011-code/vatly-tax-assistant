import { describe, it, expect, beforeEach } from "vitest";
import {
  normalizeScoreToScale10,
  saveSubmission,
  getSubmissionsHistory,
  clearSubmissionsHistory,
  type SubmissionPayload,
} from "@/lib/submission-service";
import { APP_CONFIG } from "@/lib/config";

describe("Chức năng Chấm điểm & Quy đổi Điểm số (Scale 10)", () => {
  it("quy đổi điểm số chính xác theo thang 10", () => {
    expect(normalizeScoreToScale10(4, 4)).toBe(10);
    expect(normalizeScoreToScale10(0, 4)).toBe(0);
    expect(normalizeScoreToScale10(2, 4)).toBe(5);
    expect(normalizeScoreToScale10(2.5, 4)).toBe(6.25);
    expect(normalizeScoreToScale10(7, 10)).toBe(7);
    expect(normalizeScoreToScale10(8.3333, 10)).toBe(8.33);
  });

  it("xử lý an toàn khi maxScore <= 0", () => {
    expect(normalizeScoreToScale10(5, 0)).toBe(0);
    expect(normalizeScoreToScale10(5, -1)).toBe(0);
  });
});

describe("Lưu trữ Bài làm & Lịch sử Kết quả (Submission Service)", () => {
  beforeEach(() => {
    clearSubmissionsHistory();
  });

  it("lưu bài làm, tính đúng số câu đúng/sai và gắn mã bài nộp", () => {
    const payload: SubmissionPayload = {
      lessonPath: "lop-10/co-hoc-phan-1/chu-de-1/bai-1/3-bai-tap",
      title: "Bài 1. Bài tập Làm quen với môn Vật lý",
      mode: "thi",
      score: 8.5,
      rawScore: 3.4,
      maxScore: 4.0,
      correctCount: 12,
      totalQuestions: 14,
      p1: { correct: 8, total: 8 },
      p2: { correct: 3, total: 4 },
      p3: { correct: 1, total: 2 },
      timeSpent: "14:20",
      submittedAt: new Date().toISOString(),
    };

    const saved = saveSubmission(payload);
    expect(saved.id).toMatch(/^SUB-/);
    expect(saved.wrongCount).toBe(2);
    expect(saved.score).toBe(8.5);
    expect(saved.gradeStatus).toBe("graded");

    const history = getSubmissionsHistory("lop-10/co-hoc-phan-1/chu-de-1/bai-1/3-bai-tap");
    expect(history.length).toBe(1);
    expect(history[0].id).toBe(saved.id);
  });

  it("cho phép xóa lịch sử khi cần", () => {
    const payload: SubmissionPayload = {
      lessonPath: "lop-11/quang-hoc/bai-1",
      title: "Bài tập Lăng kính",
      mode: "on",
      score: 10,
      rawScore: 4,
      correctCount: 10,
      totalQuestions: 10,
      timeSpent: "05:10",
      submittedAt: new Date().toISOString(),
    };

    saveSubmission(payload);
    expect(getSubmissionsHistory().length).toBe(1);

    clearSubmissionsHistory();
    expect(getSubmissionsHistory().length).toBe(0);
  });
});

describe("Cấu hình Kho tài liệu Google Drive & Số lượng Bài học", () => {
  it("chứa liên kết Google Drive chính thức với ID thư mục chính xác", () => {
    expect(APP_CONFIG.googleDriveFolderUrl).toContain("1-80QRozdGMChyMQTfzu7IJoj5jSosztG");
    expect(APP_CONFIG.googleDriveFolderUrl).toMatch(/^https:\/\/drive\.google\.com\/drive\/folders\//);
  });

  it("xác nhận tổng số bài học chính xác là 777 bài", () => {
    expect(APP_CONFIG.totalLessons).toBe(777);
  });

  it("thông tin liên hệ chuẩn hóa", () => {
    expect(APP_CONFIG.contactEmail).toBe("nguyenquan862011@gmail.com");
    expect(APP_CONFIG.developerName).toBe("Trần Đình Nguyên Quân");
  });
});
