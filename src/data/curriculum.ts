import rawCurriculum from "./curriculum.json";

export interface LessonMeta {
  id: string;
  index: number;
  name: string;
  slug: string;
  slugPath: string[];
  fullPath: string;
  grade: string;
  gradeSlug: string;
  part: string;
  partSlug: string;
  topic: string;
  topicSlug: string;
  lesson: string;
  lessonSlug: string;
  kind: "theory" | "example" | "exercise" | "practice" | "other";
  simulationUrl: string;
  prevLessonPath: string | null;
  nextLessonPath: string | null;
}

export interface CurriculumNode {
  kind: "grade" | "part" | "topic" | "lesson" | string;
  name: string;
  slug: string;
  slugPath?: string[];
  children?: CurriculumNode[];
}

export interface CurriculumData {
  total: number;
  tree: CurriculumNode[];
  lessons: Record<string, LessonMeta>;
}

export const curriculum = rawCurriculum as unknown as CurriculumData;

export function getLessonByPath(fullPath: string): LessonMeta | undefined {
  // Normalize path by stripping leading/trailing slashes
  const normalized = fullPath.replace(/^\/+|\/+$/g, "");
  return curriculum.lessons[normalized];
}

export function getAllLessons(): LessonMeta[] {
  return Object.values(curriculum.lessons);
}

export function searchLessons(query: string): LessonMeta[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return getAllLessons().filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.lesson.toLowerCase().includes(q) ||
      l.topic.toLowerCase().includes(q),
  );
}
