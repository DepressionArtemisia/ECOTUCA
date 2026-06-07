"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type OfficialLogoProps = {
  brand?: "ecotuca" | "perifa";
  variant?: "horizontal" | "vertical" | "symbol" | "tagline";
  tone?: "color" | "positive" | "negative";
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
  className?: string;
};

const assets = {
  ecotuca: {
    horizontal: "/brand/official/png/ecotuca-horizontal.png",
    vertical: "/brand/official/png/ecotuca-vertical.png",
    symbol: "/brand/official/png/simbolo-ecotuca.png",
    tagline: "/brand/official/png/ecotuca-horizontal-tagline.png"
  },
  perifa: {
    horizontal: "/brand/official/png/perifa-ecotour-horizontal.png",
    vertical: "/brand/official/png/perifa-ecotour-vertical.png",
    symbol: "/brand/official/png/simbolo-perifa.png",
    tagline: "/brand/official/png/perifa-ecotour-horizontal.png"
  }
} as const;

const dimensions = {
  horizontal: { width: 920, height: 240 },
  vertical: { width: 640, height: 720 },
  symbol: { width: 512, height: 512 },
  tagline: { width: 1120, height: 300 }
} as const;

const sizes = {
  sm: {
    horizontal: "w-36",
    vertical: "w-24",
    symbol: "h-9 w-9",
    tagline: "w-44"
  },
  md: {
    horizontal: "w-48",
    vertical: "w-32",
    symbol: "h-11 w-11",
    tagline: "w-64"
  },
  lg: {
    horizontal: "w-64",
    vertical: "w-40",
    symbol: "h-16 w-16",
    tagline: "w-80 max-w-full sm:w-96"
  },
  xl: {
    horizontal: "w-80",
    vertical: "w-52",
    symbol: "h-24 w-24",
    tagline: "w-80 max-w-full sm:w-[34rem]"
  }
} as const;

export function OfficialLogo({
  brand = "ecotuca",
  variant = "horizontal",
  tone = "color",
  size = "md",
  priority = false,
  className
}: OfficialLogoProps) {
  const [failed, setFailed] = useState(false);
  const label = brand === "ecotuca" ? "ECOTUCA" : "Perifa Ecotour";
  const src = assets[brand][variant];
  const dim = dimensions[variant];
  const shouldFrame = tone === "negative" && variant !== "symbol";

  if (failed) {
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
        sizes[size][variant],
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
        onError={() => setFailed(true)}
        className={cn("object-contain", variant === "symbol" ? "h-full w-full" : "h-auto w-full")}
        sizes="(max-width: 768px) 180px, 280px"
      />
    </span>
  );
}
