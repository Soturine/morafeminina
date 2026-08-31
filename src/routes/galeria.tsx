import { createFileRoute } from "@tanstack/react-router";
import { PhotoGallery } from "@/components/PhotoGallery";
import { InstagramSection } from "@/components/InstagramSection";

const title = "Galeria de fotos da loja | Mora Moda em Jacareí";
const description =
  "Fotos reais da Mora Moda Feminina e Infantil, na Cidade Salvador, em Jacareí - SP: interior da loja, araras, moda feminina, infantil e enxoval.";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/galeria" },
    ],
    links: [{ rel: "canonical", href: "/galeria" }],
  }),
  component: GaleriaPage,
});

function GaleriaPage() {
  return (
    <>
      <PhotoGallery
        headingAs="h1"
        eyebrow="Galeria"
        title="Fotos reais da loja"
        description="Um passeio pela Mora Moda: araras de moda feminina, seção infantil, enxoval e acessórios. Clique em uma foto para ampliar."
        initialCount={12}
        step={24}
      />
      <InstagramSection initialCount={3} />
    </>
  );
}
