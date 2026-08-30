import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { departmentsQuery } from "@/features/catalog/queries";
import { Section, SectionHeading } from "@/components/Section";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";

const title = "Catálogo | Mora Moda Feminina e Infantil em Jacareí";
const description =
  "Departamentos do catálogo da Mora Moda, em Jacareí - SP: feminino, infantil, bebê, enxoval, acessórios e mais.";

export const Route = createFileRoute("/catalogo/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(departmentsQuery());
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/catalogo" },
    ],
    links: [{ rel: "canonical", href: "/catalogo" }],
  }),
  component: CatalogoIndex,
  errorComponent: () => (
    <Section>
      <SectionHeading as="h1" title="Não foi possível carregar o catálogo" />
    </Section>
  ),
  notFoundComponent: () => (
    <Section>
      <SectionHeading as="h1" title="Catálogo indisponível" />
    </Section>
  ),
});

function CatalogoIndex() {
  const { data: departments } = useSuspenseQuery(departmentsQuery());

  return (
    <Section>
      <SectionHeading
        eyebrow="Catálogo"
        as="h1"
        title="Departamentos"
        description="Navegue pelos departamentos da loja. As peças exibidas são uma amostra do que está disponível em Jacareí."
      />
      {departments.length === 0 ? (
        <div className="mt-10">
          <EmptyState />
        </div>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <Reveal as="li" key={d.id} delay={(i % 3) * 70}>
              <Link
                to="/catalogo/$slug"
                params={{ slug: d.slug }}
                className="group block h-full border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <h2 className="text-xl transition-colors group-hover:text-primary">{d.name}</h2>
                {d.description ? (
                  <p className="mt-2 text-sm text-muted-foreground">{d.description}</p>
                ) : null}
              </Link>
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
