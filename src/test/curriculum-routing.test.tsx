import { describe, expect, it } from "vitest";
import { getLessonByPath, curriculum, searchLessons } from "@/data/curriculum";

describe("Curriculum data & dynamic routing", () => {
  it("contains exactly 777 lessons across grades 10, 11, and 12", () => {
    expect(curriculum.total).toBe(777);
    expect(Object.keys(curriculum.lessons).length).toBe(777);
  });

  it("correctly retrieves a Grade 10 lesson", () => {
    const lesson = getLessonByPath(
      "lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly"
    );
    expect(lesson).toBeDefined();
    expect(lesson?.grade).toBe("Lớp 10");
    expect(lesson?.simulationUrl).toBe(
      "https://vatly.ai/api/mo-phong/lop-10/co-hoc-phan-1/chu-de-1-gioi-thieu-muc-dich-hoc-tap-mon-vat-ly/bai-1-lam-quen-voi-mon-vat-ly/1-ly-thuyet-lam-quen-voi-mon-vat-ly"
    );
    expect(lesson?.nextLessonPath).toBeDefined();
  });

  it("correctly retrieves a Grade 11 lesson (previously missing)", () => {
    const lesson = getLessonByPath(
      "lop-11/song/chu-de-1-song-co/bai-1-mo-ta-song/1-ly-thuyet-mo-ta-song"
    );
    expect(lesson).toBeDefined();
    expect(lesson?.grade).toBe("Lớp 11");
    expect(lesson?.part).toBe("SÓNG");
  });

  it("correctly retrieves a Grade 12 lesson (previously missing)", () => {
    const lesson = getLessonByPath(
      "lop-12/chat-khi/chu-de-1-chat-khi/bai-1-thuyet-dong-hoc-phan-tu-khi-ly-tuong/1-ly-thuyet-thuyet-dong-hoc-phan-tu-khi-ly-tuong"
    );
    expect(lesson).toBeDefined();
    expect(lesson?.grade).toBe("Lớp 12");
  });

  it("supports real-time search across lessons", () => {
    const results = searchLessons("giao thoa");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].simulationUrl).toContain("giao-thoa");
  });
});
