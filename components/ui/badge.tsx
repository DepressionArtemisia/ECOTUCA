import { cn } from "@/lib/utils";

const tones = {
  yellow: "bg-[#faedbd] text-[#654600] dark:bg-[#513c1d] dark:text-[#ffe188]",
  coral: "bg-[#fae7e3] text-[#782f2b] dark:bg-[#512d2a] dark:text-[#ffc0b9]",
  blue: "bg-[#e8eef9] text-[#23447e] dark:bg-[#263754] dark:text-[#c5d9ff]",
  orange: "bg-[#fae8d6] text-[#743b1d] dark:bg-[#4f3527] dark:text-[#ffd0a4]",
  mint: "bg-[#dff3ec] text-[#075748] dark:bg-[#16443b] dark:text-[#a8e9d8]",
  brown: "bg-[var(--surface-alt)] text-[var(--foreground)]"
};

export function Badge({ children, tone = "brown", className }: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return <span className={cn("inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold leading-snug [overflow-wrap:anywhere]", tones[tone], className)}>{children}</span>;
}
