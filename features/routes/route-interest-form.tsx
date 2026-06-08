"use client";

import { CalendarCheck, Send } from "lucide-react";
import { useState } from "react";
import { EcoButton } from "@/components/brand/eco-button";
import { Badge } from "@/components/ui/badge";
import { createRouteBooking, type StoredRouteBooking } from "@/lib/data/bookings";

export function RouteInterestForm({ routeSlug }: { routeSlug: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedBooking, setSavedBooking] = useState<StoredRouteBooking | null>(null);
  const [form, setForm] = useState({
    name: "Camila Ferreira",
    email: "turista@ecotuca.local",
    phone: "(21) 90000-0000",
    date: "2026-07-12",
    people: "4",
    message: "Tenho interesse em apresentar o roteiro para um grupo pequeno."
  });

  async function submit() {
    setError("");

    if (!form.name.trim() || !form.email.includes("@")) {
      setError("Informe nome e e-mail valido para a equipe retornar.");
      return;
    }

    const peopleCount = Number.parseInt(form.people, 10);
    if (!Number.isFinite(peopleCount) || peopleCount < 1) {
      setError("Informe ao menos 1 pessoa para o roteiro.");
      return;
    }

    setSaving(true);
    const booking = await createRouteBooking({
      routeSlug,
      name: form.name,
      email: form.email,
      phone: form.phone,
      preferredDate: form.date,
      peopleCount,
      message: form.message
    });
    setSaving(false);
    setSavedBooking(booking);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-brand-mint p-5 text-brand-brown shadow-card">
        <Badge tone="yellow">Solicitacao recebida</Badge>
        <div className="mt-3">
          <Badge tone={savedBooking?.source === "supabase" ? "mint" : "coral"}>
            {savedBooking?.source === "supabase" ? "Registro conectado" : "Registro de demonstracao"}
          </Badge>
        </div>
        <h2 className="brand-display mt-4 text-4xl">Equipe ECOTUCA acionada</h2>
        <p className="mt-2 text-sm font-bold">
          Solicitacao recebida. A equipe ECOTUCA entrara em contato para confirmar disponibilidade, guia, ponto de encontro e proximos passos.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-brand-yellow p-5 text-brand-brown shadow-card">
      <h2 className="brand-display text-4xl">Tenho interesse</h2>
      <p className="mt-2 text-sm font-bold">
        Envie uma solicitacao de roteiro. A equipe ECOTUCA confirma disponibilidade, guia, ponto de encontro e orientacoes de preparo.
      </p>
      <div className="mt-5 space-y-3">
        <Input label="Nome" value={form.name} onChange={(name) => setForm((current) => ({ ...current, name }))} />
        <Input label="E-mail" value={form.email} onChange={(email) => setForm((current) => ({ ...current, email }))} />
        <Input label="Telefone" value={form.phone} onChange={(phone) => setForm((current) => ({ ...current, phone }))} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input label="Data desejada" value={form.date} onChange={(date) => setForm((current) => ({ ...current, date }))} />
          <Input label="Pessoas" value={form.people} onChange={(people) => setForm((current) => ({ ...current, people }))} />
        </div>
        <label className="block">
          <span className="text-xs font-black uppercase">Mensagem</span>
          <textarea
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            className="mt-1 min-h-24 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-brand-mint"
          />
        </label>
      </div>
      {error ? <p className="mt-3 rounded-lg bg-brand-coral px-3 py-2 text-sm font-black text-white">{error}</p> : null}
      <div className="mt-5 flex flex-wrap gap-2">
        <EcoButton variant="coral" onClick={submit} disabled={saving}>
          <Send size={16} />
          {saving ? "Enviando..." : "Enviar interesse"}
        </EcoButton>
        <EcoButton variant="outline">
          <CalendarCheck size={16} />
          Ver disponibilidade
        </EcoButton>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-12 w-full rounded-lg border border-brand-brown/15 bg-white px-4 text-sm font-bold outline-none focus:border-brand-mint"
      />
    </label>
  );
}
