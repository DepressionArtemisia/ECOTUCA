"use client";

import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EcoButton } from "@/components/brand/eco-button";
import { useAuth } from "@/features/auth/auth-provider";
import { accountHome } from "@/lib/data/auth";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setMessage("");
    try {
      const result = await login(String(form.get("email")).trim(), String(form.get("password")));
      if (result.ok) router.push(accountHome(result.user));
      else setMessage(result.message);
    } catch {
      setMessage("Não foi possível entrar agora. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="brand-card p-6 sm:p-9">
      <h1 className="text-display-lg">Entrar</h1>
      <p className="mt-3 text-[var(--muted)]">Use o e-mail informado no seu cadastro.</p>
      <div className="mt-6 space-y-4">
        <label className="block text-sm font-bold">
          E-mail
          <input name="email" type="email" autoComplete="username" required className="field-control mt-2 w-full" />
        </label>
        <label htmlFor="login-password" className="block text-sm font-bold">Senha</label>
        <div className="!mt-2 flex gap-2">
          <input id="login-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="field-control min-w-0 flex-1" />
          <button type="button" className="icon-control" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      {message && <p className="mt-4 text-sm font-semibold" role="alert">{message}</p>}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <EcoButton type="submit" disabled={loading}><LogIn size={17} />{loading ? "Entrando…" : "Entrar"}</EcoButton>
        <Link href="/recuperar-senha" className="inline-action text-sm">Esqueci minha senha</Link>
      </div>
    </form>
  );
}
