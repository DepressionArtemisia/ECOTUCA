import Link from "next/link";
import { Button, buttonVariants, type ButtonProps } from "@/components/ui/button";

export function EcoButton(props: ButtonProps) {
  return <Button {...props} />;
}

type EcoLinkProps = React.ComponentProps<typeof Link> & Pick<ButtonProps, "variant" | "size">;

export function EcoLink({ className, size, variant, ...props }: EcoLinkProps) {
  return <Link className={buttonVariants({ className, size, variant })} {...props} />;
}
