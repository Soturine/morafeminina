import { createFileRoute } from "@tanstack/react-router";
import { storePhotos } from "@/data/store-photos";
import { SmartImage } from "@/components/SmartImage";
import { site } from "@/data/site";
import { Section, SectionHeading } from "@/components/Section";
import { Highlights } from "@/components/Highlights";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { ButtonLink } from "@/components/Button";

const title = "Sobre a Mora Moda | Loja de Roupas em Jacareí";
const description =
  "Conheça a Mora Moda Feminina e Infantil: variedade, qualidade e preços acessíveis em moda feminina e infantil para as famílias de Jacareí - SP.";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sobre" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

/**
 * Substitua as imagens abaixo pelas fotos reais da loja (fachada, interior,
 * araras, equipe) mantendo as mesmas proporções.
 */
const gallery = [
  storePhotos.interiorAraras,
  storePhotos.femininoVestidos,
  storePhotos.interiorInfantil,
  storePhotos.enxovalPrateleiras,
];

function SobrePage() {
  return (
    <>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Sobre a Mora Moda" as="h1" title={site.about.title} />
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
              {site.about.text}
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              A loja fica na Cidade Salvador, em Jacareí, e atende quem prefere comprar
              pessoalmente, retirar o pedido ou consultar a possibilidade de entrega.
            </p>
            {site.institutional.story ? (
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                {site.institutional.story}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contato" variant="primary" size="md">
                Ver localização
              </ButtonLink>
              <WhatsAppLink variant="outline" size="md" context="sobre">
                Falar no WhatsApp
              </WhatsAppLink>
            </div>
          </div>

          <SmartImage
            src={storePhotos.fachada.src}
            alt={storePhotos.fachada.alt}
            width={storePhotos.fachada.width}
            height={storePhotos.fachada.height}
            className="aspect-3/4"
          />
        </div>
      </Section>

      <Section tone="default" className="pt-0">
        <ul className="grid gap-5 sm:grid-cols-2">
          {gallery.map((item) => (
            <li key={item.id}>
              <SmartImage
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="aspect-4/3"
              />
            </li>
          ))}
        </ul>
      </Section>

      <Highlights />
    </>
  );
}
