import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { getBySegment } from "@/data/products";
import { Catalog } from "@/components/Catalog";
import { Section, SectionHeading } from "@/components/Section";
import { track } from "@/lib/analytics";

const title = "Moda Feminina em Jacareí | Moda Moda Feminina";
const description =
  "Vestidos, blusas, conjuntos e calças femininas na Moda Moda, em Jacareí - SP. Veja as peças e fale no WhatsApp para tamanhos, cores e disponibilidade.";

export const Route = createFileRoute("/feminino")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/feminino" },
    ],
    links: [{ rel: "canonical", href: "/feminino" }],
  }),
  component: FemininoPage,
});

function FemininoPage() {
  useEffect(() => {
    track("catalog_view", { segment: "feminino" });
  }, []);

  return (
    <Section>
      <SectionHeading
        eyebrow="Catálogo"
        as="h1"
        title="Moda feminina"
        description="Peças para diferentes estilos, momentos e ocasiões. As peças abaixo são uma amostra do que está na loja — a variedade completa você confere pessoalmente ou pelo WhatsApp."
      />
      <div className="mt-10">
        <Catalog products={getBySegment("feminino")} />
      </div>
    </Section>
  );
}
