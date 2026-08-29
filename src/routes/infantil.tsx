import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery } from "@/features/catalog/queries";
import { Catalog } from "@/components/Catalog";
import { Section, SectionHeading } from "@/components/Section";
import { track } from "@/lib/analytics";

const title = "Moda Infantil em Jacareí | Mora Moda Feminina e Infantil";
const description =
  "Roupas infantis confortáveis e bonitas na Mora Moda, em Jacareí - SP. Veja as peças e fale no WhatsApp para tamanhos, faixa etária e disponibilidade.";

/** Vitrine infantil: infantil, juvenil, bebê e enxoval. */
const AUDIENCES = new Set(["infantil", "juvenil", "bebe"]);

export const Route = createFileRoute("/infantil")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery());
  },
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
  const { data: all } = useSuspenseQuery(productsQuery());
  const products = useMemo(
    () => all.filter((p) => AUDIENCES.has(p.audience ?? "")),
    [all],
  );

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
        <Catalog products={products} showAgeFilter />
      </div>
    </Section>
  );
}
