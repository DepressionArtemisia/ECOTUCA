"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Trash2 } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { AutosaveIndicator } from "@/components/forms/autosave-indicator";
import { ConsentCheckbox } from "@/components/forms/consent-checkbox";
import { FormStepper } from "@/components/forms/form-stepper";
import { SignupReviewCard } from "@/components/forms/signup-review-card";
import { Badge } from "@/components/ui/badge";

type FieldKind = "text" | "email" | "tel" | "date" | "textarea" | "select" | "consent";

type Field = {
  name: string;
  label: string;
  kind?: FieldKind;
  placeholder?: string;
  options?: string[];
  required?: boolean;
};

type SignupSection = {
  title: string;
  description: string;
  fields: Field[];
};

type SignupData = Record<string, string | boolean>;

function makeInitialData(sections: SignupSection[]) {
  return sections.reduce<SignupData>((acc, section) => {
    section.fields.forEach((field) => {
      acc[field.name] = field.kind === "consent" ? false : "";
    });
    return acc;
  }, {});
}

function FieldControl({
  field,
  value,
  onChange
}: {
  field: Field;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}) {
  if (field.kind === "consent") {
    return <ConsentCheckbox label={field.label} checked={Boolean(value)} onChange={onChange} />;
  }

  if (field.kind === "textarea") {
    return (
      <textarea
        className="mt-2 min-h-28 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-white/10"
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onInput={(event) => onChange(event.currentTarget.value)}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (field.kind === "select") {
    return (
      <select
        className="mt-2 min-h-12 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-brand-dark-soft"
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Selecione</option>
        {(field.options ?? []).map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      className="mt-2 min-h-12 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-white/10"
      type={field.kind ?? "text"}
      placeholder={field.placeholder}
      value={String(value ?? "")}
      onInput={(event) => onChange(event.currentTarget.value)}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function MultistepSignupFlow({
  title,
  eyebrow,
  description,
  storageKey,
  sections,
  asideItems
}: {
  title: string;
  eyebrow: string;
  description: string;
  storageKey: string;
  sections: SignupSection[];
  asideItems: string[];
}) {
  const initialData = useMemo(() => makeInitialData(sections), [sections]);
  const [data, setData] = useState<SignupData>(initialData);
  const [current, setCurrent] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const steps = [...sections.map((section) => section.title), "Revisao"];
  const reviewStep = current >= sections.length;
  const labelByName = useMemo(() => Object.fromEntries(sections.flatMap((section) => section.fields.map((field) => [field.name, field.label]))), [sections]);

  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as SignupData;
        setData({ ...initialData, ...parsed });
        setSavedAt("recuperado");
      } catch {
        setData(initialData);
      }
    }
    setHydrated(true);
  }, [initialData, storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    const timeout = window.setTimeout(() => {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
      setSavedAt(new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    }, 450);
    return () => window.clearTimeout(timeout);
  }, [data, hydrated, storageKey]);

  const currentSection = sections[current];
  const requiredReady = reviewStep || currentSection.fields
    .filter((field) => field.required)
    .every((field) => {
      const value = data[field.name];
      return field.kind === "consent" ? Boolean(value) : String(value ?? "").trim().length > 0;
    });
  const reviewData = Object.fromEntries(Object.entries(data).map(([key, value]) => [labelByName[key] ?? key, value]));

  function updateField(name: string, value: string | boolean) {
    setSubmitted(false);
    setData((currentData) => ({ ...currentData, [name]: value }));
  }

  function saveDraft() {
    window.localStorage.setItem(storageKey, JSON.stringify(data));
    setSavedAt(new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
  }

  function clearDraft() {
    window.localStorage.removeItem(storageKey);
    setData(initialData);
    setCurrent(0);
    setSavedAt(null);
    setSubmitted(false);
  }

  return (
    <div className="desktop-form-shell">
      <div className="min-w-0">
        <div className="premium-page-header p-5 sm:p-8">
          <Badge tone="coral">{eyebrow}</Badge>
          <h1 className="brand-display mt-5 text-5xl sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base font-bold text-brand-brown/72 dark:text-brand-cream/74">{description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <AutosaveIndicator savedAt={savedAt} />
            <Badge tone="mint">Sem envio ao Supabase nesta etapa</Badge>
          </div>
        </div>

        <div className="mt-6">
          <FormStepper steps={steps} current={current} />
        </div>

        <form className="mt-6 brand-card p-5 sm:p-6" onSubmit={(event) => event.preventDefault()}>
          {!reviewStep ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="brand-display text-4xl">{currentSection.title}</h2>
                  <p className="mt-2 text-sm font-bold text-brand-brown/65 dark:text-brand-cream/70">{currentSection.description}</p>
                </div>
                <Badge tone="yellow">{current + 1} de {sections.length}</Badge>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {currentSection.fields.map((field) => (
                  <label key={field.name} className={field.kind === "textarea" || field.kind === "consent" ? "md:col-span-2" : undefined}>
                    {field.kind !== "consent" && (
                      <span className="text-sm font-black">
                        {field.label}
                        {field.required ? " *" : ""}
                      </span>
                    )}
                    <FieldControl field={field} value={data[field.name] ?? ""} onChange={(value) => updateField(field.name, value)} />
                  </label>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {submitted ? (
                <div className="rounded-lg border border-brand-mint bg-brand-mint/12 p-5">
                  <CheckCircle2 className="text-brand-mint" size={32} />
                  <h2 className="brand-display mt-3 text-4xl">Cadastro recebido</h2>
                  <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/75">
                    O fluxo esta pronto para apresentacao: a proxima versao conecta a validacao real da coordenacao.
                  </p>
                </div>
              ) : null}
              <SignupReviewCard title="Conferir informacoes" data={reviewData} />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <EcoButton type="button" variant="outline" disabled={current === 0} onClick={() => setCurrent((step) => Math.max(step - 1, 0))}>
              <ArrowLeft size={17} />
              Voltar
            </EcoButton>
            {!reviewStep ? (
              <EcoButton type="button" variant="mint" disabled={!requiredReady} onClick={() => setCurrent((step) => Math.min(step + 1, sections.length))}>
                Continuar
                <ArrowRight size={17} />
              </EcoButton>
            ) : (
              <EcoButton type="button" variant="coral" onClick={() => setSubmitted(true)}>
                Confirmar cadastro
                <CheckCircle2 size={17} />
              </EcoButton>
            )}
            <EcoButton type="button" variant="blue" onClick={saveDraft}>Salvar rascunho</EcoButton>
            <EcoButton type="button" variant="outline" onClick={clearDraft}>
              <Trash2 size={17} />
              Limpar
            </EcoButton>
          </div>
        </form>
      </div>

      <aside className="desktop-form-aside space-y-4">
        <section className="premium-context-panel p-5">
          <Badge tone="yellow">Checklist do perfil</Badge>
          <ul className="mt-5 space-y-3 text-sm font-bold">
            {asideItems.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-mint" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="premium-context-panel p-5">
          <h2 className="brand-display text-3xl">Como sera analisado</h2>
          <p className="mt-3 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
            A coordenacao verifica perfil, consentimentos, aderencia ao territorio e necessidades de acompanhamento antes de liberar acessos completos.
          </p>
        </section>
      </aside>
    </div>
  );
}
