import { createFileRoute } from "@tanstack/react-router";
import { getNewArrivals } from "@/data/products";
import { Catalog } from "@/components/Catalog";
import { Section, SectionHeading } from "@/components/Section";

const title = "Novidades | Mora Moda Feminina e Infantil em Jacareí";
const description =
  "As peças que acabaram de chegar à Mora Moda, em Jacareí - SP. Moda feminina e infantil com preços acessíveis. Fale no WhatsApp para saber mais.";

export const Route = createFileRoute("/novidades")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/novidades" },
    ],
    links: [{ rel: "canonical", href: "/novidades" }],
  }),
  component: NovidadesPage,
});

function NovidadesPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Chegou na loja"
        as="h1"
        title="Novidades"
        description="Peças recém-chegadas de moda feminina e infantil, atualizadas conforme a loja recebe novos produtos."
      />
      <div className="mt-10">
        <Catalog products={getNewArrivals()} />
      </div>
    </Section>
  );
}
