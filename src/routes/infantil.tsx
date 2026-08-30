import { createFileRoute } from "@tanstack/react-router";
import { DepartmentCatalog, departmentFilters } from "@/components/DepartmentCatalog";
import { productsQuery } from "@/features/catalog/queries";

/** Alias histórico de `/catalogo/infantil` — mesma implementação, sem duplicar lógica. */
const SLUG = "infantil";

const title = "Moda Infantil em Jacareí | Mora Moda Feminina e Infantil";
const description =
  "Roupas infantis confortáveis e bonitas na Mora Moda, em Jacareí - SP. Veja as peças e fale no WhatsApp para tamanhos, faixa etária e disponibilidade.";

export const Route = createFileRoute("/infantil")({
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
