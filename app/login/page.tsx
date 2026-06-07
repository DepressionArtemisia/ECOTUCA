import { PublicShell } from "@/components/layout/public-shell";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { DemoUserSwitcher } from "@/components/demo/demo-user-switcher";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <PublicShell>
      <section className="brand-surface relative overflow-hidden">
        <BrandPattern intensity="soft" />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[.8fr_1.2fr]">
          <LoginForm />
          <DemoUserSwitcher />
        </div>
      </section>
    </PublicShell>
  );
}
