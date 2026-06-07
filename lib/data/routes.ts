import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { tourRoutes } from "@/lib/mock-data/ecotuca";

export async function getRouteBySlug(slug: string) {
  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) throw new Error("Supabase unavailable");
    const { data, error } = await supabase.from("tour_routes").select("*").eq("slug", slug).maybeSingle();
    if (error || !data) throw error ?? new Error("Route missing");
    return { route: data, source: "supabase" as const };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Route fallback", error);
    }
    return { route: tourRoutes.find((route) => route.slug === slug), source: "demo" as const };
  }
}
