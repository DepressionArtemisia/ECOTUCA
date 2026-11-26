import { z } from "zod";

type FieldKind = "text" | "email" | "tel" | "date" | "textarea" | "select" | "radio" | "checkboxGroup" | "consent";

export type SignupField = {
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

export type SignupSection = { title: string; description: string; fields: SignupField[] };
export type SignupValue = string | boolean | string[];
export type SignupData = Record<string, SignupValue>;
export type SignupRole = "student" | "teacher" | "guide" | "tourist";

const email = z.string().email().max(254);

export function isVisible(field: SignupField, data: SignupData) {
  return !field.showWhen || data[field.showWhen.field] === field.showWhen.value;
}

export function isRequired(field: SignupField, data: SignupData) {
  return field.required === true || Boolean(field.requiredWhen && data[field.requiredWhen.field] === field.requiredWhen.value);
}

export function validateField(field: SignupField, value: SignupValue | undefined, required: boolean) {
  if (value === undefined || value === "" || value === false || (Array.isArray(value) && !value.length)) return !required;
  if (field.kind === "consent") return value === true;
  if (field.kind === "checkboxGroup") return Array.isArray(value) && value.every((option) => field.options?.includes(option));
  if (typeof value !== "string" || !value.trim()) return false;
  if (field.kind === "email") return email.safeParse(value.trim()).success;
  if (field.kind === "tel") return value.replace(/\D/g, "").length >= 8;
  if (field.kind === "date") return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value));
  if (field.kind === "radio" || field.kind === "select") return field.options?.includes(value) ?? false;
  return true;
}

export function getInvalidFields(fields: SignupField[], data: SignupData) {
  return fields.filter((field) => isVisible(field, data) && !validateField(field, data[field.name], isRequired(field, data)));
}
