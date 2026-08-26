import { createFileRoute } from "@tanstack/react-router";
import lojaInterior from "@/assets/loja-interior.jpg";
import detalhe from "@/assets/detalhe.jpg";
import catFeminino from "@/assets/cat-feminino.jpg";
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
  {
    src: lojaInterior,
    alt: "Interior da loja com araras e peças em tons neutros",
    w: 1408,
    h: 1008,
  },
  { src: catFeminino, alt: "Arara com peças femininas", w: 1024, h: 1280 },
  { src: detalhe, alt: "Detalhe dos tecidos das peças", w: 1200, h: 900 },
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

          <div className="overflow-hidden bg-secondary">
            <img
              src={lojaInterior}
              alt="Interior da loja com araras e peças em tons neutros"
              width={1408}
              height={1008}

              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="default" className="pt-0">
        <ul className="grid gap-5 sm:grid-cols-2">
          {gallery.slice(1).map((item) => (
            <li key={item.alt} className="aspect-4/3 overflow-hidden bg-secondary">
              <img
                src={item.src}
                alt={item.alt}
                width={item.w}
                height={item.h}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </Section>

      <Highlights />
    </>
  );
}
