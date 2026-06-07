import { cn } from "@/lib/utils";

export function TerritoryShapes({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="none">
        <path
          d="M-80 510 C160 420 226 610 430 530 C638 450 740 280 960 334 C1080 364 1160 306 1280 250"
          fill="none"
          stroke="#FCC224"
          strokeWidth="10"
          strokeLinecap="round"
          opacity=".36"
        />
        <path
          d="M-40 228 C160 172 300 274 462 226 C620 180 740 92 932 150 C1062 190 1152 140 1260 78"
          fill="none"
          stroke="#2ACCB5"
          strokeWidth="8"
          strokeLinecap="round"
          opacity=".32"
        />
        <path
          d="M160 626 L246 560 L330 610 L420 520 L512 590"
          fill="none"
          stroke="#E9635D"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".28"
        />
        <path
          d="M760 624 L840 544 L934 584 L1000 498 L1106 550"
          fill="none"
          stroke="#335595"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".32"
        />
      </svg>
    </div>
  );
}
