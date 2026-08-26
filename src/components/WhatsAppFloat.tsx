import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { context: "float" })}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}
