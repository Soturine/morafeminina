import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/Button";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { site } from "@/data/site";
import type { VariantProps } from "class-variance-authority";

type Props = ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    message?: string;
    /** Rótulo de contexto enviado para analytics futuramente. */
    context?: string;
  };

export function WhatsAppLink({
  className,
  variant = "whatsapp",
  size,
  message = site.whatsapp.defaultMessage,
  context,
  children,
  ...props
}: Props) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", context ? { context } : undefined)}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </a>
  );
}
