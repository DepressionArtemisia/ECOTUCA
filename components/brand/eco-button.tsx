import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EcoButton({ className, ...props }: ButtonProps) {
  return <Button className={cn("shadow-soft active:translate-y-px", className)} {...props} />;
}
