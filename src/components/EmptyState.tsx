import { WhatsAppLink } from "@/components/WhatsAppLink";

export function EmptyState({
  title = "Novidades chegando por aqui",
  text = "Fale conosco pelo WhatsApp para conhecer as peças disponíveis na loja.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="border border-dashed border-border bg-card px-6 py-14 text-center">
      <h3 className="text-xl">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{text}</p>
      <WhatsAppLink variant="primary" size="sm" className="mt-6" context="empty_state">
        Falar no WhatsApp
      </WhatsAppLink>
    </div>
  );
}
