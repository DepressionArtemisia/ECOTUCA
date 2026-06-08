"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type OfficialLogoProps = {
  brand?: "ecotuca" | "perifa";
  variant?: "horizontal" | "vertical" | "symbol" | "tagline";
  tagline?: boolean;
  tone?: "color" | "positive" | "negative";
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
  className?: string;
};

// from-manual assets are preferred for demo.
const fromManualAssets = {
  ecotuca: {
    horizontal: "/brand/official/from-manual/png/ecotuca-horizontal-logo-only-from-manual.png",
    horizontalTagline: "/brand/official/from-manual/png/ecotuca-horizontal-tagline-from-manual.png",
    vertical: "/brand/official/from-manual/png/ecotuca-vertical-logo-only-from-manual.png",
    verticalTagline: "/brand/official/from-manual/png/ecotuca-vertical-tagline-from-manual.png",
    symbol: "/brand/official/from-manual/png/ecotuca-symbol-from-manual.png",
    negative: "/brand/official/from-manual/png/ecotuca-negative-from-manual.png"
  },
  perifa: {
    horizontal: "/brand/official/from-manual/png/perifa-ecotour-horizontal-from-manual.png",
    horizontalTagline: "/brand/official/from-manual/png/perifa-ecotour-horizontal-from-manual.png",
    vertical: "/brand/official/from-manual/png/perifa-ecotour-vertical-from-manual.png",
    verticalTagline: "/brand/official/from-manual/png/perifa-ecotour-vertical-from-manual.png",
    symbol: "/brand/official/from-manual/png/perifa-symbol-from-manual.png",
    negative: "/brand/official/from-manual/png/perifa-negative-from-manual.png"
  }
} as const;

// temporary lockups are fallback only.
const temporaryLockups = {
  ecotuca: {
    horizontal: "/brand/temporary-lockups/png/ecotuca-horizontal.png",
    horizontalTagline: "/brand/temporary-lockups/png/ecotuca-horizontal-tagline.png",
    vertical: "/brand/temporary-lockups/png/ecotuca-vertical.png",
    verticalTagline: "/brand/temporary-lockups/png/ecotuca-vertical-tagline.png",
    symbol: "/brand/temporary-lockups/png/simbolo-ecotuca.png",
    negative: "/brand/temporary-lockups/png/ecotuca-horizontal-tagline.png"
  },
  perifa: {
    horizontal: "/brand/temporary-lockups/png/perifa-ecotour-horizontal.png",
    horizontalTagline: "/brand/temporary-lockups/png/perifa-ecotour-horizontal.png",
    vertical: "/brand/temporary-lockups/png/perifa-ecotour-vertical.png",
    verticalTagline: "/brand/temporary-lockups/png/perifa-ecotour-vertical.png",
    symbol: "/brand/temporary-lockups/png/simbolo-perifa.png",
    negative: "/brand/temporary-lockups/png/perifa-ecotour-horizontal.png"
  }
} as const;

const dimensions = {
  ecotuca: {
    horizontal: { width: 1255, height: 693 },
    horizontalTagline: { width: 1255, height: 858 },
    vertical: { width: 725, height: 871 },
    verticalTagline: { width: 789, height: 1098 },
    symbol: { width: 768, height: 534 },
    negative: { width: 785, height: 458 }
  },
  perifa: {
    horizontal: { width: 1298, height: 758 },
    horizontalTagline: { width: 1298, height: 758 },
    vertical: { width: 812, height: 1017 },
    verticalTagline: { width: 812, height: 1017 },
    symbol: { width: 546, height: 701 },
    negative: { width: 785, height: 506 }
  }
} as const;

const sizes = {
  sm: {
    horizontal: "h-12",
    vertical: "h-14",
    symbol: "h-9 w-14",
    tagline: "h-14"
  },
  md: {
    horizontal: "h-16",
    vertical: "h-20",
    symbol: "h-11 w-16",
    tagline: "h-20"
  },
  lg: {
    horizontal: "h-24",
    vertical: "h-32",
    symbol: "h-16 w-24",
    tagline: "h-28"
  },
  xl: {
    horizontal: "h-32",
    vertical: "h-44",
    symbol: "h-24 w-36",
    tagline: "h-36"
  }
} as const;

type AssetKey = keyof typeof dimensions.ecotuca;

function resolveAssetKey({
  brand,
  variant,
  tone,
  tagline
}: {
  brand: "ecotuca" | "perifa";
  variant: NonNullable<OfficialLogoProps["variant"]>;
  tone: NonNullable<OfficialLogoProps["tone"]>;
  tagline?: boolean;
}): AssetKey {
  if (tone === "negative" && variant !== "symbol") return "negative";
  if (variant === "symbol") return "symbol";
  if (variant === "tagline") return "horizontalTagline";
  if (variant === "vertical") return tagline || brand === "ecotuca" ? "verticalTagline" : "vertical";
  return tagline ? "horizontalTagline" : "horizontal";
}

export function OfficialLogo({
  brand = "ecotuca",
  variant = "horizontal",
  tagline,
  tone = "color",
  size = "md",
  priority = false,
  className
}: OfficialLogoProps) {
  const [assetIndex, setAssetIndex] = useState(0);
  const label = brand === "ecotuca" ? "ECOTUCA" : "Perifa Ecotour";
  const assetKey = resolveAssetKey({ brand, variant, tone, tagline });
  const srcOptions = [
    fromManualAssets[brand][assetKey],
    temporaryLockups[brand][assetKey]
  ];
  const src = srcOptions[assetIndex];
  const dim = dimensions[brand][assetKey];
  const displayVariant = variant === "tagline" || assetKey === "horizontalTagline" || assetKey === "negative" ? "tagline" : variant;
  const shouldFrame = assetIndex > 0 && tone === "negative";

  if (!src) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-brand-brown/10 bg-brand-cream px-2 py-1 text-brand-brown shadow-sm",
          size === "lg" && "px-3 py-2",
          size === "xl" && "px-4 py-3",
          className
        )}
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-brown text-sm font-black text-brand-yellow">
          {brand === "ecotuca" ? "E" : "P"}
        </span>
        {variant !== "symbol" ? (
          <span className="leading-tight">
            <span className="brand-display block text-xl">{label}</span>
            <span className="block text-[11px] font-black uppercase text-brand-brown/70">
              {brand === "ecotuca" ? "Escola de ecoturismo" : "Ecoturismo comunitario"}
            </span>
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center justify-center",
        sizes[size][displayVariant],
        shouldFrame && "rounded-lg bg-brand-cream/95 px-2 py-1 shadow-sm",
        className
      )}
    >
      <Image
        src={src}
        alt={label}
        width={dim.width}
        height={dim.height}
        priority={priority}
        onError={() => setAssetIndex((current) => current + 1)}
        className="h-full w-auto max-w-full object-contain"
        sizes="(max-width: 768px) 180px, 280px"
      />
    </span>
  );
}
