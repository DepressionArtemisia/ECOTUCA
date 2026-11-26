"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { createRouteBooking } from "@/lib/data/bookings";

export function RouteInterestForm({ routeSlug }: { routeSlug: string }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setMessage("");
    setBusy(true);
    try {
      await createRouteBooking({
        routeSlug,
        name: String(data.get("name")).trim(),
        email: String(data.get("email")).trim(),
        phone: "",
        preferredDate: String(data.get("date")),
        peopleCount: Number(data.get("people")),
        message: ""
      });
      setSubmitted(true);
      setMessage("O interesse foi registrado neste navegador para demonstração.");
    } catch {
      setMessage("Não foi possível registrar o interesse agora.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="brand-card p-5">
      <h2 className="text-card-title">Simular interesse na visita</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">Use dados fictícios para conhecer o fluxo de solicitação.</p>
      {!submitted && (
        <form className="mt-4 space-y-3" onSubmit={submit}>
          <label className="block text-sm font-bold">Nome
            <input name="name" required maxLength={120} className="field-control mt-1 w-full" />
          </label>
          <label className="block text-sm font-bold">E-mail
            <input name="email" type="email" required className="field-control mt-1 w-full" />
          </label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <label className="block text-sm font-bold">Data sugerida
              <input name="date" type="date" className="field-control mt-1 w-full min-w-0" />
            </label>
            <label className="block text-sm font-bold">Pessoas
              <input name="people" type="number" min={1} max={40} defaultValue={1} required className="field-control mt-1 w-full" />
            </label>
          </div>
          <EcoButton type="submit" disabled={busy}><Send size={16} aria-hidden="true" />{busy ? "Registrando…" : "Registrar simulação"}</EcoButton>
        </form>
      )}
      {message && <p role="status" className="mt-3 rounded-lg bg-[var(--surface-alt)] p-3 text-sm">{message}</p>}
    </section>
  );
}
