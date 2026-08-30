/**
 * Vitrine de um departamento da taxonomia.
 *
 * Uma única implementação atende `/catalogo/$slug`, `/feminino` e `/infantil`.
 * Nenhum `if (department === ...)`: tudo vem da taxonomia + CatalogRepository.
 */
import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery } from "@/features/catalog/queries";
import { departmentBySlug } from "@/infrastructure/catalog/taxonomy";
import { Catalog } from "@/components/Catalog";
import { EmptyState } from "@/components/EmptyState";
import { Section, SectionHeading } from "@/components/Section";
import { track } from "@/lib/analytics";

export function departmentFilters(slug: string) {
  return { departmentSlug: slug } as const;
}

export function DepartmentCatalog({ slug }: { slug: string }) {
  const department = departmentBySlug(slug);
  const { data: products } = useSuspenseQuery(productsQuery(departmentFilters(slug)));

  useEffect(() => {
    track("catalog_view", { segment: slug });
  }, [slug]);

  const title = department?.name ?? "Catálogo";

  return (
    <Section>
      <SectionHeading
        eyebrow="Catálogo"
        as="h1"
        title={title}
        description={
          department?.description ??
          "Peças disponíveis na loja. Confirme tamanhos e disponibilidade pelo WhatsApp."
        }
      />
      <div className="mt-10">
        {products.length === 0 ? (
          <EmptyState
            title={`Ainda não há peças de ${title} publicadas aqui`}
            text="A loja tem muito mais do que conseguimos mostrar no site. Fale conosco pelo WhatsApp para ver o que está disponível."
          />
        ) : (
          <Catalog products={products} />
        )}
      </div>
    </Section>
  );
}
