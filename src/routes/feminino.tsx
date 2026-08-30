import { createFileRoute } from "@tanstack/react-router";
import { DepartmentCatalog, departmentFilters } from "@/components/DepartmentCatalog";
import { productsQuery } from "@/features/catalog/queries";

/** Alias histórico de `/catalogo/feminino` — mesma implementação, sem duplicar lógica. */
const SLUG = "feminino";

const title = "Moda Feminina em Jacareí | Mora Moda Feminina e Infantil";
const description =
  "Vestidos, blusas, conjuntos e calças femininas na Mora Moda, em Jacareí - SP. Veja as peças e fale no WhatsApp para tamanhos, cores e disponibilidade.";

export const Route = createFileRoute("/feminino")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery(departmentFilters(SLUG)));
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/catalogo/${SLUG}` },
    ],
    links: [{ rel: "canonical", href: `/catalogo/${SLUG}` }],
  }),
  component: () => <DepartmentCatalog slug={SLUG} />,
});
