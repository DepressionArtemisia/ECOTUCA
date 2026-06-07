import { learningTracks } from "@/lib/mock-data/ecotuca";

export function getMockLessonById(id: string) {
  return learningTracks.flatMap((track) => track.lessons).find((lesson) => lesson.id === id);
}
