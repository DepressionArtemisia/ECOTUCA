import { cn } from "@/lib/utils";

export function BrandGradient({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-brand-radial dark:bg-brand-dark", className)}>
      <div className="absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#FCC224,#E9635D,#2ACCB5,#335595,#FE9440)]" />
      {children}
    </section>
  );
}
