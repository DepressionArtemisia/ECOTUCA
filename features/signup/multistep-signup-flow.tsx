"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Trash2 } from "lucide-react";
import { EcoButton } from "@/components/brand/eco-button";
import { AutosaveIndicator } from "@/components/forms/autosave-indicator";
import { ConsentCheckbox } from "@/components/forms/consent-checkbox";
import { FormStepper } from "@/components/forms/form-stepper";
import { SignupReviewCard } from "@/components/forms/signup-review-card";
import { Badge } from "@/components/ui/badge";

type FieldKind = "text" | "email" | "tel" | "date" | "textarea" | "select" | "radio" | "checkboxGroup" | "consent";

type Field = {
  name: string;
  label: string;
  kind?: FieldKind;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  requiredWhen?: { field: string; value: string | boolean };
  showWhen?: { field: string; value: string | boolean };
  helperText?: string;
  fullWidth?: boolean;
};

type SignupSection = {
  title: string;
  description: string;
  fields: Field[];
};

type SignupValue = string | boolean | string[];
type SignupData = Record<string, SignupValue>;

function makeInitialData(sections: SignupSection[]) {
  return sections.reduce<SignupData>((acc, section) => {
    section.fields.forEach((field) => {
      acc[field.name] = field.kind === "consent" ? false : field.kind === "checkboxGroup" ? [] : "";
    });
    return acc;
  }, {});
}

function isVisible(field: Field, data: SignupData) {
  if (!field.showWhen) return true;
  return data[field.showWhen.field] === field.showWhen.value;
}

function isRequired(field: Field, data: SignupData) {
  if (field.required) return true;
  if (!field.requiredWhen) return false;
  return data[field.requiredWhen.field] === field.requiredWhen.value;
}

function hasValue(field: Field, value: SignupValue) {
  if (field.kind === "consent") return Boolean(value);
  if (field.kind === "checkboxGroup") return Array.isArray(value) && value.length > 0;
  if (field.kind === "email") return String(value ?? "").includes("@");
  return String(value ?? "").trim().length > 0;
}

function FieldControl({
  field,
  value,
  onChange
}: {
  field: Field;
  value: SignupValue;
  onChange: (value: SignupValue) => void;
}) {
  if (field.kind === "consent") {
    return <ConsentCheckbox label={field.label} checked={Boolean(value)} onChange={onChange} />;
  }

  if (field.kind === "checkboxGroup") {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {(field.options ?? []).map((option) => (
          <label key={option} className="flex min-h-12 items-start gap-3 rounded-lg border border-brand-brown/10 bg-white/70 p-3 text-sm font-bold dark:border-brand-yellow/20 dark:bg-white/5">
            <input
              aria-label={option}
              className="mt-1 h-4 w-4 accent-brand-mint"
              type="checkbox"
              checked={selected.includes(option)}
              onChange={(event) => {
                onChange(event.target.checked ? [...selected, option] : selected.filter((item) => item !== option));
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.kind === "radio") {
    return (
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {(field.options ?? []).map((option) => (
          <label key={option} className="flex min-h-12 items-center gap-3 rounded-lg border border-brand-brown/10 bg-white/70 p-3 text-sm font-bold dark:border-brand-yellow/20 dark:bg-white/5">
            <input
              aria-label={option}
              className="h-4 w-4 accent-brand-mint"
              type="radio"
              name={field.name}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.kind === "textarea") {
    return (
      <textarea
        aria-label={field.label}
        className="mt-2 min-h-28 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-white/10"
        name={field.name}
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
        aria-label={field.label}
        className="mt-2 min-h-12 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-brand-dark-soft"
        name={field.name}
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
      aria-label={field.label}
      className="mt-2 min-h-12 w-full rounded-lg border border-brand-brown/15 bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-brand-mint dark:border-brand-yellow/20 dark:bg-white/10"
      name={field.name}
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
  asideItems,
  asideTitle = "Checklist do perfil",
  analysisTitle = "Como sera analisado",
  analysisDescription = "A coordenacao verifica perfil, consentimentos, aderencia ao territorio e necessidades de acompanhamento antes de liberar acessos completos.",
  submitLabel = "Enviar cadastro",
  successMessage = "Cadastro recebido. A coordenacao ECOTUCA ira analisar as informacoes e retornar pelo contato informado."
}: {
  title: string;
  eyebrow: string;
  description: string;
  storageKey: string;
  sections: SignupSection[];
  asideItems: string[];
  asideTitle?: string;
  analysisTitle?: string;
  analysisDescription?: string;
  submitLabel?: string;
  successMessage?: string;
}) {
  const initialData = useMemo(() => makeInitialData(sections), [sections]);
  const [data, setData] = useState<SignupData>(initialData);
  const [current, setCurrent] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [stepError, setStepError] = useState("");
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
  const visibleFields = reviewStep ? [] : currentSection.fields.filter((field) => isVisible(field, data));
  const missingFields = reviewStep ? [] : visibleFields
    .filter((field) => isRequired(field, data))
    .filter((field) => !hasValue(field, data[field.name]));
  const requiredReady = reviewStep || missingFields.length === 0;
  const reviewData = Object.fromEntries(
    sections.flatMap((section) => section.fields)
      .filter((field) => isVisible(field, data))
      .map((field) => [labelByName[field.name] ?? field.name, data[field.name]])
  );

  function updateField(name: string, value: SignupValue) {
    setSubmitted(false);
    setStepError("");
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
    setStepError("");
  }

  function continueToNextStep() {
    if (!requiredReady) {
      setStepError(`Preencha os campos obrigatorios: ${missingFields.map((field) => field.label).join(", ")}.`);
      return;
    }
    setStepError("");
    setCurrent((step) => Math.min(step + 1, sections.length));
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
            <Badge tone="mint">Rascunho antes da validacao</Badge>
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
                {visibleFields.map((field) => (
                  <label key={field.name} className={field.fullWidth || field.kind === "textarea" || field.kind === "consent" || field.kind === "checkboxGroup" || field.kind === "radio" ? "md:col-span-2" : undefined}>
                    {field.kind !== "consent" && (
                      <span className="text-sm font-black">
                        {field.label}
                        {isRequired(field, data) ? " *" : ""}
                      </span>
                    )}
                    <FieldControl field={field} value={data[field.name] ?? ""} onChange={(value) => updateField(field.name, value)} />
                    {field.helperText ? <span className="mt-1 block text-xs font-bold text-brand-brown/55 dark:text-brand-cream/60">{field.helperText}</span> : null}
                  </label>
                ))}
              </div>
              {stepError ? <p className="mt-5 rounded-lg bg-brand-coral px-4 py-3 text-sm font-black text-white">{stepError}</p> : null}
              {!requiredReady && !stepError ? (
                <p className="mt-5 rounded-lg bg-brand-yellow/25 px-4 py-3 text-sm font-black text-brand-brown dark:text-brand-cream">
                  Campos com * precisam ser preenchidos para continuar.
                </p>
              ) : null}
            </>
          ) : (
            <div className="space-y-4">
              {submitted ? (
                <div className="rounded-lg border border-brand-mint bg-brand-mint/12 p-5">
                  <CheckCircle2 className="text-brand-mint" size={32} />
                  <h2 className="brand-display mt-3 text-4xl">Cadastro recebido</h2>
                  <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/75">
                    {successMessage}
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
              <EcoButton type="button" variant="mint" onClick={continueToNextStep}>
                Continuar
                <ArrowRight size={17} />
              </EcoButton>
            ) : (
              <EcoButton type="button" variant="coral" onClick={() => setSubmitted(true)}>
                {submitLabel}
                <CheckCircle2 size={17} />
              </EcoButton>
            )}
            {reviewStep ? (
              <EcoButton type="button" variant="mint" onClick={() => setCurrent(0)}>Editar dados</EcoButton>
            ) : null}
            <EcoButton type="button" variant="blue" onClick={saveDraft}>Salvar e continuar depois</EcoButton>
            <EcoButton type="button" variant="outline" onClick={clearDraft}>
              <Trash2 size={17} />
              Limpar rascunho
            </EcoButton>
          </div>
        </form>
      </div>

      <aside className="desktop-form-aside space-y-4">
        <section className="premium-context-panel p-5">
          <Badge tone="yellow">{asideTitle}</Badge>
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
          <h2 className="brand-display text-3xl">{analysisTitle}</h2>
          <p className="mt-3 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/70">
            {analysisDescription}
          </p>
        </section>
      </aside>
    </div>
  );
}
