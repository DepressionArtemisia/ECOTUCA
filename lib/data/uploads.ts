import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type UploadBucket = "avatars" | "lesson-materials" | "route-images" | "certificates";

export async function uploadDemoAwareFile(bucket: UploadBucket, path: string, file: File) {
  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) throw new Error("Supabase unavailable");
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      upsert: true
    });
    if (error) throw error;
    return { ok: true, source: "supabase" as const, path: data.path };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Upload fallback", error);
    }
    return { ok: true, source: "demo" as const, path };
  }
}
