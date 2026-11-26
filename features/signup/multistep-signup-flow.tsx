"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Trash2 } from "lucide-react";
import { submitSignupApplication, type SignupApplicationResult } from "@/app/actions/signup-application";
import { EcoButton } from "@/components/brand/eco-button";
import { AutosaveIndicator } from "@/components/forms/autosave-indicator";
import { ConsentCheckbox } from "@/components/forms/consent-checkbox";
import { FormStepper } from "@/components/forms/form-stepper";
import { SignupReviewCard } from "@/components/forms/signup-review-card";
import { Badge } from "@/components/ui/badge";
import { getInvalidFields, isRequired, isVisible, type SignupData, type SignupField, type SignupRole, type SignupSection, type SignupValue } from "@/lib/data/signup-fields";

function makeInitialData(sections: SignupSection[]) {
  return sections.reduce<SignupData>((acc, section) => {
    section.fields.forEach((field) => {
      acc[field.name] = field.kind === "consent" ? false : field.kind === "checkboxGroup" ? [] : "";
    });
    return acc;
  }, {});
}

function FieldControl({
  field,
  id,
  value,
  onChange
}: {
  field: SignupField;
  id: string;
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
        id={id}
        className="field-control mt-2 min-h-28 w-full"
        name={field.name}
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (field.kind === "select") {
    return (
      <select
        aria-label={field.label}
        id={id}
        className="field-control mt-2 w-full"
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
      id={id}
        className="field-control mt-2 w-full"
      name={field.name}
      type={field.kind ?? "text"}
      placeholder={field.placeholder}
      value={String(value ?? "")}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function MultistepSignupFlow({
  applicationRole,
  title,
  eyebrow,
  description,
  storageKey,
  sections,
  asideItems,
  asideTitle = "Checklist do perfil",
  analysisTitle = "Como será analisado",
  analysisDescription = "A coordenação verifica perfil, consentimentos, aderencia ao território e necessidades de acompanhamento antes de liberar acessos completos.",
  submitLabel = "Enviar inscrição"
}: {
  applicationRole: SignupRole;
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
}) {
  const initialData = useMemo(() => makeInitialData(sections), [sections]);
  const [data, setData] = useState<SignupData>(initialData);
  const [current, setCurrent] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SignupApplicationResult | null>(null);
  const [stepError, setStepError] = useState("");
  const [draftEnabled, setDraftEnabled] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const steps = [...sections.map((section) => section.title), "Revisao"];
  const reviewStep = current >= sections.length;
  const labelByName = useMemo(() => Object.fromEntries(sections.flatMap((section) => section.fields.map((field) => [field.name, field.label]))), [sections]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as SignupData;
        setData({ ...initialData, ...parsed });
        setDraftEnabled(true);
        setSavedAt("recuperado");
      }
    } catch {}
    setHydrated(true);
  }, [initialData, storageKey]);

  const saveDraft = useCallback((values: SignupData) => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(values));
      setDraftEnabled(true);
      setSavedAt(new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    } catch {
      setStepError("O navegador não permitiu salvar o rascunho.");
    }
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated || !draftEnabled || submitted) return;
    const timeout = window.setTimeout(() => saveDraft(data), 450);
    return () => window.clearTimeout(timeout);
  }, [data, hydrated, draftEnabled, saveDraft, submitted]);

  function moveToStep(step: number) {
    setCurrent(step);
    setStepError("");
    requestAnimationFrame(() => stepHeading.current?.focus());
  }

  const currentSection = sections[current];
  const visibleFields = reviewStep ? [] : currentSection.fields.filter((field) => isVisible(field, data));
  const missingFields = getInvalidFields(visibleFields, data);
  const requiredReady = missingFields.length === 0;
  const reviewData = Object.fromEntries(
    sections.flatMap((section) => section.fields)
      .filter((field) => isVisible(field, data))
      .map((field) => [labelByName[field.name] ?? field.name, data[field.name]])
  );

  function updateField(name: string, value: SignupValue) {
    setSubmitted(false);
    setSubmitResult(null);
    setRequestId(null);
    setStepError("");
    setData((currentData) => ({ ...currentData, [name]: value }));
  }


  function clearDraft() {
    try { window.localStorage.removeItem(storageKey); } catch {}
    setData(initialData);
    setCurrent(0);
    setSavedAt(null);
    setDraftEnabled(false);
    setSubmitted(false);
    setSubmitResult(null);
    setRequestId(null);
    setStepError("");
  }

  function continueToNextStep() {
    if (!requiredReady) {
      setStepError(`Confira os campos: ${missingFields.map((field) => field.label).join(", ")}.`);
      return;
    }
    setStepError("");
    setSubmitResult(null);
    moveToStep(Math.min(current + 1, sections.length));
  }

  async function submitApplication() {
    setSubmitting(true);
    setStepError("");
    setSubmitResult(null);
    const id = requestId ?? crypto.randomUUID();
    setRequestId(id);
    try {
      const result = await submitSignupApplication({ id, role: applicationRole, data });
      setSubmitResult(result);
      setSubmitted(result.ok);
      if (result.ok && result.mode === "supabase") {
        try { window.localStorage.removeItem(storageKey); } catch {}
        setDraftEnabled(false);
        setSavedAt(null);
      }
      if (result.ok && result.mode === "prepared") saveDraft(data);
    } catch {
      setStepError("Não foi possível enviar a inscrição. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
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

          </div>
        </div>

        <div className="mt-6">
          <FormStepper steps={steps} current={current} />
        </div>

        <form className="mt-6 brand-card p-5 sm:p-6" noValidate onSubmit={(event) => { event.preventDefault(); if (submitting || submitted) return; if (reviewStep) void submitApplication(); else continueToNextStep(); }}>
          {!reviewStep ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 ref={stepHeading} tabIndex={-1} className="text-card-title">{currentSection.title}</h2>
                  <p className="mt-2 text-sm font-bold text-[var(--muted)] dark:text-brand-cream/70">{currentSection.description}</p>
                </div>
                <Badge tone="yellow">{current + 1} de {sections.length}</Badge>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {visibleFields.map((field) => {
                  const grouped = field.kind === "checkboxGroup" || field.kind === "radio";
                  const wide = grouped || field.fullWidth || field.kind === "textarea" || field.kind === "consent";
                  const id = `${applicationRole}-${field.name}`;
                  const label = <>{field.label}{isRequired(field, data) ? " *" : ""}</>;
                  const control = <FieldControl id={id} field={field} value={data[field.name] ?? ""} onChange={(value) => updateField(field.name, value)} />;
                  const hint = field.helperText ? <p className="mt-1 text-xs text-[var(--muted)]">{field.helperText}</p> : null;
                  if (grouped) return (
                    <fieldset key={field.name} className="min-w-0 md:col-span-2">
                      <legend className="text-sm font-bold">{label}</legend>
                      {control}{hint}
                    </fieldset>
                  );
                  return (
                    <div key={field.name} className={wide ? "min-w-0 md:col-span-2" : "min-w-0"}>
                      {field.kind !== "consent" && <label htmlFor={id} className="text-sm font-bold">{label}</label>}
                      {control}{hint}
                    </div>
                  );
                })}
              </div>
              {stepError ? <p role="alert" className="mt-5 rounded-lg bg-[#fae7e3] px-4 py-3 text-sm font-bold text-[#782f2b]">{stepError}</p> : null}
              {!requiredReady && !stepError ? (
                <p className="mt-5 rounded-lg bg-brand-yellow/25 px-4 py-3 text-sm font-black text-brand-brown dark:text-brand-cream">
                  Campos com * precisam ser preenchidos para continuar.
                </p>
              ) : null}
            </>
          ) : (
            <div className="space-y-4">
              <h2 ref={stepHeading} tabIndex={-1} className="text-card-title">Revise sua inscrição</h2>
              {stepError && <p role="alert">{stepError}</p>}
              {submitted ? (
                <div className="rounded-lg border border-brand-mint bg-brand-mint/12 p-5">
                  <CheckCircle2 className="text-brand-mint" size={32} />
                  <h2 className="text-card-title mt-3">{submitResult?.mode === "supabase" ? "Inscrição recebida" : "Demonstração concluída"}</h2>
                  <p className="mt-2 text-sm font-bold text-brand-brown/70 dark:text-brand-cream/75">
                    {submitResult?.message}
                  </p>
                  {submitResult?.id && <p className="mt-2 text-sm font-bold [overflow-wrap:anywhere]">Protocolo {submitResult.id}</p>}
                </div>
              ) : null}
              {submitResult && !submitResult.ok ? (
                <p role="alert" className="rounded-lg bg-[#fae7e3] px-4 py-3 text-sm font-bold text-[#782f2b]">{submitResult.message}</p>
              ) : null}
              <SignupReviewCard title="Conferir informações" data={reviewData} />
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <EcoButton type="button" variant="outline" disabled={current === 0 || submitted} onClick={() => moveToStep(Math.max(current - 1, 0))}>
              <ArrowLeft size={17} />
              Voltar
            </EcoButton>
            {!reviewStep ? (
              <EcoButton type="submit">
                Continuar
                <ArrowRight size={17} />
              </EcoButton>
            ) : (
              <EcoButton type="submit" disabled={submitting || submitted}>
                {submitting ? "Enviando..." : submitLabel}
                <CheckCircle2 size={17} />
              </EcoButton>
            )}
            {reviewStep && !submitted ? (
              <EcoButton type="button" variant="outline" onClick={() => moveToStep(0)}>Editar dados</EcoButton>
            ) : null}
            {!submitted && <EcoButton type="button" variant="outline" onClick={() => saveDraft(data)}>Salvar e continuar depois</EcoButton>}
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
