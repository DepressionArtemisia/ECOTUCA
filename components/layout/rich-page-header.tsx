import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Badge } from "@/components/ui/badge";

type RichPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  badgeTone?: React.ComponentProps<typeof Badge>["tone"];
  children?: React.ReactNode;
  className?: string;
};

export function RichPageHeader({ eyebrow, title, description, image, imageAlt, children, className }: RichPageHeaderProps) {
  return (
    <section className={cn("premium-page-header p-5 sm:p-8 lg:p-10", className)}>
      <div className={cn("grid items-center gap-6", (children || image) && "lg:grid-cols-[minmax(0,1fr)_minmax(0,.7fr)]")}>
        <div className="min-w-0">
          <p className="section-label"><span />{eyebrow}</p>
          <h1 className="text-display-lg mt-3">{title}</h1>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-[var(--muted)] sm:text-lg">{description}</p>
        </div>
        {children ? <div className="min-w-0 rounded-[var(--radius-card)] bg-[var(--surface-alt)]">{children}</div> : null}
        {image && !children ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-control)]">
            <Image src={image} alt={imageAlt ?? ""} fill className="object-cover" sizes="(max-width: 1023px) 90vw, 35vw" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
