import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 max-w-full items-center justify-center gap-2 rounded-[var(--radius-control)] px-4 py-2 text-center text-sm font-bold leading-snug transition-colors duration-fast disabled:pointer-events-none disabled:opacity-50 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand-yellow text-brand-brown hover:bg-[#ffcf4d]",
        coral: "border border-[#a34840] bg-[#ffebe7] text-[#722d29] hover:bg-[#ffdad3]",
        mint: "bg-brand-yellow text-brand-brown hover:bg-[#ffcf4d]",
        blue: "bg-brand-blue text-white hover:bg-[#25437a]",
        outline: "border border-[#aa9389] bg-brand-paper text-brand-brown hover:bg-[#f2ebe0] dark:border-[#9c7f73] dark:bg-[#2d201b] dark:text-brand-cream dark:hover:bg-[#392924]"
      },
      size: {
        sm: "min-h-11 px-3 text-sm",
        md: "min-h-11 px-4",
        lg: "min-h-12 px-5 text-base"
      }
    },
    defaultVariants: { variant: "primary", size: "md" }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} type={type} ref={ref} {...props} />
  )
);

Button.displayName = "Button";

export { buttonVariants };
