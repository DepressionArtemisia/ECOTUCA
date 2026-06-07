import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-black transition focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-brown text-brand-yellow shadow-brand hover:bg-brand-brown/90 dark:bg-brand-yellow dark:text-brand-brown",
        coral: "bg-brand-coral text-white hover:bg-brand-coral/90",
        mint: "bg-brand-mint text-brand-brown hover:bg-brand-mint/90",
        blue: "bg-brand-blue text-white hover:bg-brand-blue/90",
        outline: "border-2 border-brand-brown/20 bg-white/70 text-brand-brown hover:border-brand-brown dark:border-brand-yellow/30 dark:bg-white/5 dark:text-brand-yellow"
      },
      size: {
        sm: "min-h-9 px-3 text-xs",
        md: "min-h-11 px-4",
        lg: "min-h-12 px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);

Button.displayName = "Button";

export { buttonVariants };
