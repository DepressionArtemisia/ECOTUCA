"use client";

import Link from "next/link";
import { LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/auth-provider";
import type { CurrentUser } from "@/lib/data/auth";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("aluno@ecotuca.local");
  const [password, setPassword] = useState("Demo@123456");
  const [message, setMessage] = useState("Acesso preparado para contas reais, com modo de demonstracao para esta reuniao.");
  const [source, setSource] = useState<"supabase" | "demo">("demo");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    setSource(result.source);
    setMessage(result.message);
    if (result.ok) {
      router.push(resolveLanding(result.user));
    }
  }

  return (
    <form onSubmit={submit} className="rounded-lg bg-brand-brown p-6 text-brand-cream shadow-glow">
      <Badge tone={source === "supabase" ? "mint" : "yellow"}>{source === "supabase" ? "Base conectada" : "Modo demonstracao"}</Badge>
      <h1 className="brand-display mt-5 text-6xl text-brand-yellow">Entrar</h1>
      <p className="mt-4 text-brand-cream/75">{message}</p>
      <div className="mt-6 space-y-3">
        <label className="block">
          <span className="text-sm font-black">E-mail</span>
          <div className="mt-1 flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-brand-brown">
            <Mail size={18} />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-transparent text-sm font-bold outline-none"
            />
          </div>
        </label>
        <label className="block">
          <span className="text-sm font-black">Senha</span>
          <input
            value={password}
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 h-12 w-full rounded-lg bg-white px-4 text-sm font-bold text-brand-brown outline-none"
          />
        </label>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <EcoButton variant="mint" type="submit" disabled={loading}>
          <LogIn size={17} />
          {loading ? "Entrando..." : "Entrar"}
        </EcoButton>
        <Link href="/cadastro">
          <EcoButton type="button" variant="outline">Criar cadastro</EcoButton>
        </Link>
      </div>
    </form>
  );
}

function resolveLanding(user?: CurrentUser) {
  if (!user) return "/app/aluno";
  if (user.status === "pending") return "/app/aguardando-aprovacao";
  if (user.role === "admin" || user.role === "super_admin") return "/app/admin";
  if (user.role === "teacher") return "/app/professor";
  if (user.role === "guide") return "/app/guia";
  if (user.role === "tourist") return "/app/turista";
  return "/app/aluno";
}
