import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-2 text-balance rounded-sm text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-accent",
        outline: "border border-primary/25 text-primary hover:border-primary hover:bg-secondary",
        ghost: "text-primary hover:bg-secondary",
        whatsapp: "bg-whatsapp text-whatsapp-foreground hover:brightness-95",
        accent: "bg-accent text-accent-foreground hover:brightness-110",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonAnchor({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"a"> & Variants) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
