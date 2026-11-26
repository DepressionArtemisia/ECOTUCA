import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const files = [
  "supabase/schema.sql",
  "supabase/rls.sql",
  "supabase/storage.sql"
];

const combined = files
  .map((file) => {
    const path = resolve(process.cwd(), file);
    return `-- ==================================================\n-- ${file}\n-- ==================================================\n\n${readFileSync(path, "utf8")}`;
  })
  .join("\n\n");

const outPath = resolve(process.cwd(), "supabase/combined-apply.sql");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `-- Schema and policies only. Fixture data is separate.\nBEGIN;\n\n${combined}\n\nCOMMIT;\n`, "utf8");

console.log("ECOTUCA Supabase SQL prepared");
console.log({
  output: "supabase/combined-apply.sql",
  automaticApply: false,
  reason:
    "Automatic SQL execution is intentionally disabled. Review and run the SQL in Supabase SQL Editor to avoid destructive or unintended changes.",
  order: files
});
