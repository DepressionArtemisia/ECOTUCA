import { cn } from "@/lib/utils";

export function PerifaCard({ children, className }: {
  children: React.ReactNode;
  tone?: "yellow" | "coral" | "blue" | "orange" | "mint";
  className?: string;
}) {
  return <div className={cn("brand-card min-w-0 p-4 sm:p-5", className)}>{children}</div>;
}
