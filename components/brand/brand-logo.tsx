import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="ECOTUCA inicio">
      <Image src="/brand/symbol-ecotuca.png" alt="" width={44} height={44} className="h-11 w-11 rounded-lg" priority />
      {!compact && (
        <span className="leading-none">
          <span className="brand-display block text-2xl text-brand-brown dark:text-brand-yellow">ECOTUCA</span>
          <span className="text-xs font-black uppercase text-brand-brown/70 dark:text-brand-cream">Perifa Ecotour</span>
        </span>
      )}
    </Link>
  );
}
