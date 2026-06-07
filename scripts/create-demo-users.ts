import { createInterface } from "node:readline/promises";
import { createClient } from "@supabase/supabase-js";
import { demoUsers } from "../lib/mock-data/ecotuca";
import type { DemoUser } from "../types/domain";
import { loadLocalEnv, requireEnv } from "./supabase-script-utils";

loadLocalEnv();

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const yes = args.has("--yes") || process.env.ECOTUCA_CONFIRM_CREATE_USERS === "yes";

type SupabaseAdminClient = ReturnType<typeof createAdminClient>;

function createAdminClient(url: string, serviceRole: string) {
  return createClient(url, serviceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

async function main() {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRole = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const supabase = createAdminClient(url, serviceRole);

  console.log("ECOTUCA demo auth users. No secret values will be printed.");
  console.log(dryRun ? "Mode: dry-run, no remote changes." : "Mode: write, remote users/profiles may be created or updated.");

  if (!dryRun && !yes) {
    await requireConfirmation();
  }

  const listed = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listed.error) throw listed.error;
  const existingUsers = new Map(listed.data.users.map((user) => [user.email?.toLowerCase(), user]));
  const summary: Array<Record<string, string>> = [];

  for (const user of demoUsers) {
    const existing = existingUsers.get(user.email.toLowerCase());

    if (dryRun) {
      summary.push({
        email: user.email,
        role: user.role,
        status: user.status,
        auth: existing ? "would-update" : "would-create",
        profile: "would-upsert",
        specificProfile: specificProfileTable(user) ?? "none"
      });
      continue;
    }

    const authUser = existing
      ? await updateAuthUser(supabase, existing.id, user)
      : await createAuthUser(supabase, user);

    if (!authUser.id) {
      summary.push({
        email: user.email,
        role: user.role,
        status: user.status,
        auth: "failed",
        profile: "skipped",
        specificProfile: "skipped"
      });
      continue;
    }

    const profileResult = await upsertProfile(supabase, authUser.id, user);
    const specificResult = await ensureSpecificProfile(supabase, authUser.id, user);

    summary.push({
      email: user.email,
      role: user.role,
      status: user.status,
      auth: existing ? "updated" : "created",
      profile: profileResult,
      specificProfile: specificResult
    });
  }

  console.table(summary);
}

async function requireConfirmation() {
  if (!process.stdin.isTTY) {
    throw new Error("Interactive confirmation unavailable. Re-run with --yes only when you are sure.");
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const answer = await rl.question("Type CRIAR USUARIOS ECOTUCA to create/update demo users: ");
    if (answer.trim() !== "CRIAR USUARIOS ECOTUCA") {
      throw new Error("Confirmation not provided. No changes were made.");
    }
  } finally {
    rl.close();
  }
}

async function createAuthUser(supabase: SupabaseAdminClient, user: DemoUser) {
  const created = await supabase.auth.admin.createUser({
    email: user.email,
    password: user.password,
    email_confirm: true,
    user_metadata: authMetadata(user)
  });

  if (created.error) {
    console.log({ email: user.email, status: "auth-create-error", message: created.error.message });
    return { id: "" };
  }

  return { id: created.data.user?.id ?? "" };
}

async function updateAuthUser(supabase: SupabaseAdminClient, userId: string, user: DemoUser) {
  const updated = await supabase.auth.admin.updateUserById(userId, {
    password: user.password,
    email_confirm: true,
    user_metadata: authMetadata(user)
  });

  if (updated.error) {
    console.log({ email: user.email, status: "auth-update-error", message: updated.error.message });
    return { id: "" };
  }

  return { id: userId };
}

function authMetadata(user: DemoUser) {
  return {
    full_name: user.name,
    role: user.role,
    status: user.status
  };
}

async function upsertProfile(supabase: SupabaseAdminClient, userId: string, user: DemoUser) {
  const result = await supabase.from("profiles").upsert(
    {
      id: userId,
      full_name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      bio: user.highlight,
      updated_at: new Date().toISOString()
    },
    { onConflict: "id" }
  );

  return result.error ? `profile-error: ${result.error.message}` : "ready";
}

async function ensureSpecificProfile(supabase: SupabaseAdminClient, userId: string, user: DemoUser) {
  const table = specificProfileTable(user);
  if (!table) return "not-needed";

  const existing = await supabase.from(table).select("id").eq("user_id", userId).maybeSingle();
  if (existing.error) return `${table}-select-error: ${existing.error.message}`;

  const payload = specificProfilePayload(userId, user);
  const result = existing.data?.id
    ? await supabase.from(table).update(payload).eq("id", existing.data.id)
    : await supabase.from(table).insert(payload);

  return result.error ? `${table}-error: ${result.error.message}` : `${table}-ready`;
}

function specificProfileTable(user: DemoUser) {
  if (user.role === "student") return "student_profiles";
  if (user.role === "teacher") return "teacher_profiles";
  if (user.role === "guide") return "guide_profiles";
  if (user.role === "tourist") return "tourist_profiles";
  return null;
}

function specificProfilePayload(userId: string, user: DemoUser): Record<string, unknown> {
  if (user.role === "student") {
    return {
      user_id: userId,
      education_level: "Ensino medio",
      interests: ["ecoturismo", "agenda 2030"],
      approved_at: user.status === "approved" ? new Date().toISOString() : null
    };
  }

  if (user.role === "teacher") {
    return {
      user_id: userId,
      expertise: ["educacao ambiental", "formacao comunitaria"],
      short_bio: user.highlight
    };
  }

  if (user.role === "guide") {
    return {
      user_id: userId,
      specialties: ["Serra da Misericordia", "biodiversidade", "memoria local"],
      certificates: ["Guia Local ECOTUCA"],
      languages: ["Portugues"],
      rating: 4.9,
      available: true
    };
  }

  return {
    user_id: userId,
    origin_city: "Rio de Janeiro",
    origin_country: "Brasil",
    interests: ["ecoturismo", "roteiros comunitarios"]
  };
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
