import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DepartmentCatalog, departmentFilters } from "@/components/DepartmentCatalog";
import { Section, SectionHeading } from "@/components/Section";
import { productsQuery } from "@/features/catalog/queries";
import { departmentBySlug } from "@/infrastructure/catalog/taxonomy";

export const Route = createFileRoute("/catalogo/$slug")({
  loader: async ({ params, context }) => {
    const department = departmentBySlug(params.slug);
    if (!department || !department.active || !department.visibleOnWebsite) throw notFound();
    const products = await context.queryClient.ensureQueryData(
      productsQuery(departmentFilters(params.slug)),
    );
    // Mesma regra de `listDepartments`: departamento sem produto publicado não
    // é uma página pública (evita URL órfã e grupo vazio no catálogo).
    if (products.length === 0) throw notFound();
    return { name: department.name, description: department.description ?? "" };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Catálogo indisponível | Mora Moda" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.name} em Jacareí | Mora Moda Feminina e Infantil`;
    const description =
      loaderData.description ||
      `Peças de ${loaderData.name} na Mora Moda, em Jacareí - SP. Fale no WhatsApp para tamanhos e disponibilidade.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/catalogo/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/catalogo/${params.slug}` }],
    };
  },
  component: CatalogoDepartamento,
  notFoundComponent: DepartamentoNotFound,
  errorComponent: DepartamentoError,
});

function CatalogoDepartamento() {
  const { slug } = Route.useParams();
  return <DepartmentCatalog slug={slug} />;
}

function DepartamentoNotFound() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        eyebrow="Catálogo"
        title="Departamento não encontrado"
        description="Esse endereço não existe no catálogo. Veja os departamentos disponíveis."
      />
      <div className="mt-8">
        <Link to="/catalogo" className="link-underline text-sm uppercase tracking-[0.14em]">
          Ver catálogo completo
        </Link>
      </div>
    </Section>
  );
}

function DepartamentoError() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        title="Não foi possível carregar este departamento"
        description="Tente novamente em instantes ou fale conosco pelo WhatsApp."
      />
    </Section>
  );
}
