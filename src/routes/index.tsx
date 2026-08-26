import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import lojaInterior from "@/assets/loja-interior.jpg";
import { site } from "@/data/site";
import { getFeatured } from "@/data/products";
import { ButtonLink } from "@/components/Button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Highlights } from "@/components/Highlights";
import { Reviews } from "@/components/Reviews";
import { StoreSection } from "@/components/StoreSection";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { Section, SectionHeading } from "@/components/Section";

const title = "Mora Moda Feminina e Infantil | Moda em Jacareí";
const description =
  "Moda feminina e infantil em Jacareí com variedade, qualidade e ótimos preços. Compre na loja, consulte retirada ou entrega e fale conosco pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="shell grid items-center gap-10 py-12 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div className="fade-up max-w-xl">
          <p className="eyebrow flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Loja física em Jacareí - SP
          </p>
          <h1 className="mt-5 text-balance text-4xl leading-[1.08] md:text-6xl">
            Moda para viver todos os seus momentos.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Moda feminina e infantil com variedade, qualidade e preços que combinam com você.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/feminino" variant="primary" size="lg">
              Ver coleção
            </ButtonLink>
            <WhatsAppLink variant="outline" size="lg" context="hero">
              Falar no WhatsApp
            </WhatsAppLink>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-4/3 overflow-hidden bg-secondary lg:aspect-3/4">
            <img
              src={heroImage}
              alt="Cliente vestindo uma peça de moda feminina em tom neutro"
              width={1600}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const featured = getFeatured();

  return (
    <Section tone="default">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Seleção da loja"
          title="Destaques da loja"
          description="Uma amostra do que você encontra nas araras. Fale com a gente para conhecer todas as peças disponíveis."
        />
        <Link
          to="/novidades"
          className="link-underline text-[0.75rem] uppercase tracking-[0.16em] text-foreground"
        >
          Ver novidades
        </Link>
      </div>

      {featured.length === 0 ? (
        <div className="mt-10">
          <EmptyState />
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {featured.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function AboutTeaser() {
  return (
    <Section tone="default">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden bg-secondary">
          <img
            src={lojaInterior}
            alt="Interior de loja de roupas com araras e peças em tons neutros"
            width={1408}
            height={1008}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <SectionHeading eyebrow="Sobre a Mora Moda" title={site.about.title} />
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
            {site.about.text}
          </p>
          <ButtonLink to="/sobre" variant="outline" size="md" className="mt-8">
            Conhecer a loja
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <Featured />
      <Highlights />
      <Reviews />
      <AboutTeaser />
      <StoreSection />
    </>
  );
}
