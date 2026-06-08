import Image from "next/image";
import { BrandPattern } from "@/components/brand/brand-pattern";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RichPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  badgeTone?: "yellow" | "coral" | "blue" | "orange" | "mint" | "brown";
  children?: React.ReactNode;
  className?: string;
};

export function RichPageHeader({
  eyebrow,
  title,
  description,
  image = "/media/territory/complexo-alemao/complexo-alemao-panorama-acediscovery-cc-by-4.jpg",
  imageAlt = "Vista territorial do Complexo do Alemao",
  badgeTone = "yellow",
  children,
  className
}: RichPageHeaderProps) {
  return (
    <section className={cn("premium-page-header relative overflow-hidden", className)}>
      <Image src={image} alt={imageAlt} fill priority className="object-cover opacity-18 dark:opacity-20" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/95 via-brand-brown/86 to-brand-blue/35" />
      <BrandPattern intensity="soft" className="opacity-25" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 text-brand-cream sm:px-6 lg:py-16">
        <Badge tone={badgeTone}>{eyebrow}</Badge>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,.65fr)] lg:items-end">
          <div>
            <h1 className="brand-display max-w-5xl text-5xl text-brand-yellow sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base font-bold text-brand-cream/82 sm:text-lg">{description}</p>
          </div>
          {children ? <div className="premium-context-panel text-brand-brown dark:text-brand-cream">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
