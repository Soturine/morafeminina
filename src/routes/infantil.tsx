import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { getBySegment } from "@/data/products";
import { Catalog } from "@/components/Catalog";
import { Section, SectionHeading } from "@/components/Section";
import { track } from "@/lib/analytics";

const title = "Moda Infantil em Jacareí | Mora Moda Feminina e Infantil";
const description =
  "Roupas infantis confortáveis e bonitas na Mora Moda, em Jacareí - SP. Veja as peças e fale no WhatsApp para tamanhos, faixa etária e disponibilidade.";

export const Route = createFileRoute("/infantil")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/infantil" },
    ],
    links: [{ rel: "canonical", href: "/infantil" }],
  }),
  component: InfantilPage,
});

function InfantilPage() {
  useEffect(() => {
    track("catalog_view", { segment: "infantil" });
  }, []);

  return (
    <Section>
      <SectionHeading
        eyebrow="Catálogo"
        as="h1"
        title="Moda infantil"
        description="Peças bonitas, confortáveis e pensadas para acompanhar cada fase. Consulte tamanhos e disponibilidade pelo WhatsApp."
      />
      <div className="mt-10">
        <Catalog products={getBySegment("infantil")} showAgeFilter />
      </div>
    </Section>
  );
}
