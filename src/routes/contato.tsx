import { createFileRoute } from "@tanstack/react-router";
import { StoreSection } from "@/components/StoreSection";

const title = "Localização e Contato | Moda Moda Feminina em Jacareí";
const description =
  "Moda Moda Feminina fica na R. Santo Ivo, 504 - Cidade Salvador, Jacareí - SP. Compre na loja, retire seu pedido ou consulte entrega. WhatsApp (12) 98145-3977.";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <StoreSection as="h1" eyebrow="Localização e contato" title="Venha conhecer a Moda Moda" />
  );
}
