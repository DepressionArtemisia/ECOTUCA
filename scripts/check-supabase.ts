import { createClient } from "@supabase/supabase-js";
import { loadLocalEnv, maskedStatus, requireEnv } from "./supabase-script-utils";

loadLocalEnv();

async function main() {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY"
  ];

  console.log("ECOTUCA Supabase check");
  console.log(required.map(maskedStatus));

  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  const serviceRole = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  const anonClient = createClient(url, anonKey);
  const adminClient = createClient(url, serviceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const authCheck = await adminClient.auth.admin.listUsers({ page: 1, perPage: 1 });
  if (authCheck.error) {
    throw new Error(`Auth admin check failed: ${authCheck.error.message}`);
  }

  const profilesCheck = await anonClient.from("profiles").select("id", {
    count: "exact",
    head: true
  });

  console.log({
    authAdminReachable: true,
    profilesTableReachable: !profilesCheck.error,
    profilesTableMessage: profilesCheck.error?.message ?? "ok",
    note: "No secret values were printed."
  });
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
