import { notFound } from "next/navigation";
import { shouldEnforceAppAccess } from "@/lib/auth/runtime";
import { PublicShell } from "@/components/layout/public-shell";
import { DemoStatusPanel } from "@/features/demo/demo-status-panel";

export default function DemoStatusPage() {
  if (shouldEnforceAppAccess()) notFound();
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <DemoStatusPanel />
      </section>
    </PublicShell>
  );
}
