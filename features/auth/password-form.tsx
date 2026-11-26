"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function PasswordForm({ reset = false }: { reset?: boolean }) {
  const [recovery, setRecovery] = useState<"checking" | "ready" | "unavailable">("checking");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!reset) return;
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setRecovery("unavailable");
      return;
    }
    let active = true;
    let recovered = false;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" && active) {
        recovered = true;
        setRecovery("ready");
      }
    });
    const timeout = window.setTimeout(() => {
      if (active && !recovered) setRecovery("unavailable");
    }, 3500);
    return () => {
      active = false;
      window.clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [reset]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("A recuperação de senha está indisponível neste ambiente.");
      return;
    }
    const password = String(values.get("password") ?? "");
    if (reset && password !== values.get("confirmation")) {
      setMessage("As duas senhas precisam ser iguais.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      if (reset) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        await supabase.auth.signOut({ scope: "local" });
        setSaved(true);
        setMessage("Senha atualizada. Entre com sua nova senha.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(String(values.get("email")).trim(), {
          redirectTo: new URL("/nova-senha", window.location.origin).href
        });
        if (error && error.status !== 404) throw error;
        setMessage("Se houver uma conta com esse e-mail, você receberá um link. Confira também a caixa de spam.");
      }
    } catch {
      setMessage(reset ? "Não foi possível alterar a senha. Solicite um novo link e tente novamente." : "Não foi possível solicitar o link agora. Aguarde um pouco e tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  if (reset && recovery === "checking") return <p className="mt-5" role="status">Verificando o link…</p>;
  if (reset && recovery === "unavailable") {
    return <p className="mt-5">Este link está inválido ou expirado. <Link href="/recuperar-senha" className="underline underline-offset-4">Solicite outro link</Link>.</p>;
  }

  return (
    <div className="mt-5">
      {!saved && (
        <form onSubmit={submit} className="space-y-4">
          {reset ? (
            <>
              <label className="block text-sm font-bold">Nova senha
                <input className="field-control mt-2 w-full" name="password" type="password" autoComplete="new-password" minLength={8} required />
              </label>
              <label className="block text-sm font-bold">Confirme a nova senha
                <input className="field-control mt-2 w-full" name="confirmation" type="password" autoComplete="new-password" minLength={8} required />
              </label>
            </>
          ) : (
            <label className="block text-sm font-bold">E-mail
              <input className="field-control mt-2 w-full" name="email" type="email" autoComplete="email" required />
            </label>
          )}
          <EcoButton type="submit" disabled={busy}>{busy ? "Aguarde…" : reset ? "Salvar nova senha" : "Enviar link de recuperação"}</EcoButton>
        </form>
      )}
      {message && <p className="mt-4 rounded-lg bg-[var(--surface-alt)] p-3 text-sm" role="status">{message}</p>}
      <Link href="/entrar" className="inline-action mt-3 text-sm">Voltar para entrar</Link>
    </div>
  );
}
