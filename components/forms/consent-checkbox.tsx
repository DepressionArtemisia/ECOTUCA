"use client";

export function ConsentCheckbox({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-12 items-start gap-3 rounded-lg border border-brand-brown/10 bg-white/70 p-3 text-sm font-bold dark:border-brand-yellow/20 dark:bg-white/5">
      <input
        className="mt-1 h-4 w-4 accent-brand-mint"
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}
