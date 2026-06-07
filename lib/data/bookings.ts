import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { readJsonStorage, writeJsonStorage } from "@/lib/data/fallback";

export type RouteBookingInput = {
  routeSlug: string;
  routeId?: string;
  touristId?: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  peopleCount: number;
  message: string;
};

export type StoredRouteBooking = RouteBookingInput & {
  id: string;
  status: string;
  createdAt: string;
  source: "supabase" | "localStorage" | "mock";
};

const bookingsKey = "ecotuca-route-interests";

export function listLocalBookings() {
  return readJsonStorage<StoredRouteBooking[]>(bookingsKey, []);
}

export async function createRouteBooking(input: RouteBookingInput) {
  const localRecord: StoredRouteBooking = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
    source: "localStorage"
  };

  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase || !input.routeId) throw new Error("Supabase or route_id unavailable");
    const { data, error } = await supabase
      .from("route_bookings")
      .insert({
        route_id: input.routeId,
        tourist_id: input.touristId ?? null,
        name: input.name,
        email: input.email,
        phone: input.phone,
        preferred_date: input.preferredDate || null,
        people_count: input.peopleCount,
        message: input.message,
        status: "pending"
      })
      .select("id, created_at")
      .single();

    if (error) throw error;
    return {
      ...localRecord,
      id: data.id,
      createdAt: data.created_at,
      source: "supabase" as const
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Booking Supabase save failed, storing locally", error);
    }
    const current = listLocalBookings();
    writeJsonStorage(bookingsKey, [localRecord, ...current]);
    return localRecord;
  }
}

export async function listRouteBookings() {
  const local = listLocalBookings();
  try {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) throw new Error("Supabase unavailable");
    const { data, error } = await supabase
      .from("route_bookings")
      .select("id, name, email, phone, preferred_date, people_count, message, status, created_at, route_id")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) throw error;
    const remote = (data ?? []).map((item) => ({
      id: item.id,
      routeSlug: "supabase-route",
      routeId: item.route_id,
      name: item.name,
      email: item.email,
      phone: item.phone ?? "",
      preferredDate: item.preferred_date ?? "",
      peopleCount: item.people_count ?? 1,
      message: item.message ?? "",
      status: item.status,
      createdAt: item.created_at,
      source: "supabase"
    })) as StoredRouteBooking[];
    return remote.length ? remote : local;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Booking list fallback", error);
    }
    return local;
  }
}
