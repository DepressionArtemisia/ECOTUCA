import { PublicShell } from "@/components/layout/public-shell";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { PhoneMockup } from "@/components/mobile/phone-mockup";

export default function DemoMobilePage() {
  return (
    <PublicShell>
      <section className="brand-surface relative overflow-hidden">
        <BrandPattern intensity="soft" />
        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6">
          <PhoneMockup />
        </div>
      </section>
    </PublicShell>
  );
}
