import { PublicShell } from "@/components/layout/public-shell";
import { PhoneMockup } from "@/components/mobile/phone-mockup";

export default function DemoMobilePage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
        <PhoneMockup />
      </section>
    </PublicShell>
  );
}
