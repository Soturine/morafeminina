import { Instagram } from "lucide-react";
import { site } from "@/data/site";
import { getInstagramEmbeds } from "@/data/instagram";
import { Section, SectionHeading } from "@/components/Section";
import { ButtonAnchor } from "@/components/Button";
import lojaInterior from "@/assets/loja-interior.jpg";
import detalhe from "@/assets/detalhe.jpg";
import fachada from "@/assets/fachada.jpg";
import produto1 from "@/assets/produto-1.jpg";
import produto3 from "@/assets/produto-3.jpg";
import produto5 from "@/assets/produto-5.jpg";

const gallery = [
  { src: lojaInterior, alt: "Interior da loja com araras de roupas em tons neutros" },
  { src: produto1, alt: "Peça de moda feminina em tom neutro" },
  { src: detalhe, alt: "Detalhe de tecido de uma peça da loja" },
  { src: produto3, alt: "Peça de moda feminina exposta na loja" },
  { src: fachada, alt: "Fachada da loja Mora Moda em Jacareí" },
  { src: produto5, alt: "Peça de moda infantil disponível na loja" },
];

export function InstagramSection() {
  const embeds = getInstagramEmbeds();
  const profile = site.links.instagram;

  return (
    <Section tone="sand" id="instagram">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="@mora.feminina"
          title="A loja por dentro, todos os dias"
          description="Novidades, looks e promoções chegam primeiro no nosso Instagram."
        />
        <ButtonAnchor href={profile} target="_blank" rel="noopener noreferrer" variant="outline" size="md">
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Seguir no Instagram
        </ButtonAnchor>
      </div>

      {embeds.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {embeds.map((post) => (
            <li key={post.url} className="overflow-hidden border border-border bg-background">
              <iframe
                title={`Publicação do Instagram da ${site.shortName}`}
                src={post.embedUrl}
                loading="lazy"
                scrolling="no"
                className="h-[520px] w-full border-0"
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gallery.map((item) => (
            <li key={item.alt}>
              <a
                href={profile}
                target="_blank"
                rel="noopener noreferrer"
                className="group block aspect-square overflow-hidden bg-secondary"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
