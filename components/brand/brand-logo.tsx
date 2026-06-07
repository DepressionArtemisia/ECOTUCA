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
    <Link href="/" className={cn("inline-flex min-w-0 items-center", className)} aria-label="ECOTUCA inicio">
      <OfficialLogo
        brand="ecotuca"
        variant={compact ? "symbol" : "horizontal"}
        tone={tone}
        size={compact ? "md" : "sm"}
        priority
      />
    </Link>
  );
}
