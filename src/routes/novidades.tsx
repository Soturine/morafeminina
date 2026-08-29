import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { newProductsQuery } from "@/features/catalog/queries";
import { Catalog } from "@/components/Catalog";
import { InstagramSection } from "@/components/InstagramSection";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Section, SectionHeading } from "@/components/Section";

const title = "Novidades | Mora Moda Feminina e Infantil em Jacareí";
const description =
  "Acompanhe as novidades da Mora Moda, em Jacareí - SP: publicações recentes do Instagram @mora.feminina e fotos atuais da loja.";

export const Route = createFileRoute("/novidades")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(newProductsQuery());
  },
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
  const { data: arrivals } = useSuspenseQuery(newProductsQuery());

  return (
    <>
      <Section className="pb-0">
        <SectionHeading
          eyebrow="Chegou na loja"
          as="h1"
          title="Novidades"
          description="As novidades da Mora Moda são anunciadas no Instagram da loja. Abaixo estão as publicações mais recentes do perfil oficial."
        />
        {arrivals.length > 0 ? (
          <div className="mt-10">
            <Catalog products={arrivals} />
          </div>
        ) : null}
      </Section>

      <InstagramSection initialCount={6} />
      <PhotoGallery
        eyebrow="Galeria"
        title="Fotos recentes da loja"
        description="Imagens reais publicadas na ficha da loja no Google."
        initialCount={8}
        showLoadMore={false}
      />
    </>
  );
}
