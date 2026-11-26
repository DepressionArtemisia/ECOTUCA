import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { readJsonStorage, writeJsonStorage } from "@/lib/data/fallback";

export type VideoProgressPayload = {
  userId: string;
  lessonId: string;
  currentTime: number;
  duration: number;
  percent: number;
  completed: boolean;
  updatedAt: string;
};

export function progressStorageKey(userId: string, lessonId: string) {
  return `ecotuca:video-progress:${userId}:${lessonId}`;
}

export function readLocalProgress(userId: string, lessonId: string) {
  return readJsonStorage<VideoProgressPayload | null>(progressStorageKey(userId, lessonId), null);
}

export function saveLocalProgress(payload: VideoProgressPayload) {
  writeJsonStorage(progressStorageKey(payload.userId, payload.lessonId), payload);
}

export async function loadBestProgress(userId: string, lessonId: string) {
  const local = readLocalProgress(userId, lessonId);

  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !isUuid(userId) || !isUuid(lessonId)) return { progress: local, source: "localStorage" as const };
    const { data, error } = await supabase
      .from("lesson_progress")
      .select("progress_percent, last_position_seconds, total_duration_seconds, completed_at, updated_at, last_watched_at")
      .eq("user_id", userId)
      .eq("lesson_id", lessonId)
      .maybeSingle();
    if (error || !data) return { progress: local, source: "localStorage" as const };

    const supabaseProgress: VideoProgressPayload = {
      userId,
      lessonId,
      currentTime: data.last_position_seconds ?? 0,
      duration: data.total_duration_seconds ?? local?.duration ?? 0,
      percent: Number(data.progress_percent ?? 0),
      completed: Boolean(data.completed_at),
      updatedAt: data.updated_at ?? data.last_watched_at ?? new Date().toISOString()
    };

    if (!local) return { progress: supabaseProgress, source: "supabase" as const };
    return new Date(supabaseProgress.updatedAt) > new Date(local.updatedAt)
      ? { progress: supabaseProgress, source: "supabase" as const }
      : { progress: local, source: "localStorage" as const };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Progress load fallback", error);
    }
    return { progress: local, source: "localStorage" as const };
  }
}

export async function saveProgress(payload: VideoProgressPayload) {
  saveLocalProgress(payload);

  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !isUuid(payload.userId) || !isUuid(payload.lessonId)) {
      return { ok: true, source: "localStorage" as const };
    }

    const { error } = await supabase.from("lesson_progress").upsert({
      user_id: payload.userId,
      lesson_id: payload.lessonId,
      status: payload.completed ? "completed" : payload.percent > 0 ? "in_progress" : "not_started",
      progress_percent: payload.percent,
      watched_seconds: Math.floor(payload.currentTime),
      last_position_seconds: Math.floor(payload.currentTime),
      total_duration_seconds: Math.floor(payload.duration),
      completed_at: payload.completed ? new Date().toISOString() : null,
      last_watched_at: payload.updatedAt,
      updated_at: payload.updatedAt
    }, { onConflict: "user_id,lesson_id" });

    if (error) throw error;
    return { ok: true, source: "supabase" as const };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Progress Supabase save failed, localStorage kept", error);
    }
    return { ok: true, source: "localStorage" as const };
  }
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
