import { PublicShell } from "@/components/layout/public-shell";
import { DemoUserSwitcher } from "@/components/demo/demo-user-switcher";
import { LoginForm } from "@/features/auth/login-form";

export default function LoginPage() {
  return (
    <PublicShell>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[.8fr_1.2fr]">
        <LoginForm />
        <DemoUserSwitcher />
      </section>
    </PublicShell>
  );
}
