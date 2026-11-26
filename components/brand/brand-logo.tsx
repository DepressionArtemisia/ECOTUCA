import Link from "next/link";
import { OfficialLogo } from "@/components/brand/official-logo";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  compact = false,
  tone = "color"
}: {
  className?: string;
  compact?: boolean;
  tone?: "color" | "positive" | "negative";
}) {
  return (
    <Link href="/" className={cn("inline-flex min-w-0 items-center rounded-lg", tone === "color" && "default-brand-logo", className)} aria-label="ECOTUCA, início">
      <OfficialLogo
        brand="ecotuca"
        variant={compact ? "symbol" : "horizontal"}
        tone={tone}
        size={compact ? "md" : "sm"}
        priority
        className={compact ? undefined : "h-10 sm:h-12"}
      />
    </Link>
  );
}
