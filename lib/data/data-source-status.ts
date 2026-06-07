import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export type DataSourceStatus = {
  supabaseConfigured: boolean;
  supabaseReachable?: boolean;
  usingFallback: boolean;
  localStorageActive: boolean;
  label: "Supabase conectado" | "Modo demo" | "Fallback local";
};

export function getDataSourceStatusSync(): DataSourceStatus {
  const supabaseConfigured = isSupabaseConfigured();
  return {
    supabaseConfigured,
    supabaseReachable: undefined,
    usingFallback: true,
    localStorageActive: typeof window !== "undefined",
    label: supabaseConfigured ? "Modo demo" : "Fallback local"
  };
}

export async function checkDataSourceStatus(): Promise<DataSourceStatus> {
  const supabaseConfigured = isSupabaseConfigured();
  if (!supabaseConfigured) {
    return {
      supabaseConfigured: false,
      supabaseReachable: false,
      usingFallback: true,
      localStorageActive: typeof window !== "undefined",
      label: "Fallback local"
    };
  }

  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) throw new Error("Supabase client unavailable");
    const { error } = await supabase.from("tour_routes").select("id", { head: true, count: "exact" });
    const reachable = !error;
    return {
      supabaseConfigured: true,
      supabaseReachable: reachable,
      usingFallback: !reachable,
      localStorageActive: typeof window !== "undefined",
      label: reachable ? "Supabase conectado" : "Modo demo"
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("ECOTUCA data source check failed, using fallback", error);
    }
    return {
      supabaseConfigured: true,
      supabaseReachable: false,
      usingFallback: true,
      localStorageActive: typeof window !== "undefined",
      label: "Modo demo"
    };
  }
}
