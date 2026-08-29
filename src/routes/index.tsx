import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { storePhotos } from "@/data/store-photos";
import { SmartImage } from "@/components/SmartImage";
import { site } from "@/data/site";
import { featuredProductsQuery, bestSellersQuery } from "@/features/catalog/queries";
import { PRICE_DISCLAIMER, toProductViews } from "@/features/catalog/view-model";
import { ButtonLink } from "@/components/Button";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Highlights } from "@/components/Highlights";
import { Reviews } from "@/components/Reviews";
import { StoreSection } from "@/components/StoreSection";
import { InstagramSection } from "@/components/InstagramSection";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

const title = "Mora Moda Feminina e Infantil | Moda em Jacareí";
const description =
  "Moda feminina e infantil em Jacareí com variedade, qualidade e ótimos preços. Compre na loja, consulte retirada ou entrega e fale conosco pelo WhatsApp.";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(featuredProductsQuery(8));
    context.queryClient.ensureQueryData(bestSellersQuery(4));
  },
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
    <section className="surface-sand relative overflow-hidden border-b border-border">
      <div className="shell grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="fade-up max-w-xl">
          <p className="eyebrow flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Loja física em Jacareí - SP
          </p>
          <h1 className="mt-5 text-balance text-4xl leading-[1.05] md:text-6xl lg:text-[4.25rem]">
            Moda para viver <em className="not-italic text-accent">todos</em> os seus momentos.
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

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              { k: "5,0 ★", v: "no Google" },
              { k: "Feminino", v: "e infantil" },
              { k: "Retirada", v: "na loja" },
            ].map((item) => (
              <div key={item.k}>
                <dt className="font-display text-xl leading-none">{item.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <SmartImage
            src="/__l5e/assets-v1/c73060c5-793c-4ee4-bfc7-b58fdcce5e85/hero-modelo.jpg"
            alt="Modelo com vestido de linho em ambiente claro e sofisticado"
            width={1008}
            height={1264}
            eager
            className="frame aspect-4/5 lg:aspect-4/5"
          />
          <SmartImage
            src={storePhotos.vitrineManequins.src}
            alt={storePhotos.vitrineManequins.alt}
            className="frame absolute -bottom-6 -left-6 hidden aspect-3/4 w-40 border-4 border-background lg:block xl:w-48"
          />
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
        <>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal as="li" key={product.id} delay={i * 80}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">{PRICE_DISCLAIMER}</p>
        </>
      )}
    </Section>
  );
}


function AboutTeaser() {
  return (
    <Section tone="default">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <SmartImage
          src={storePhotos.interiorLoja.src}
          alt={storePhotos.interiorLoja.alt}
          width={storePhotos.interiorLoja.width}
          height={storePhotos.interiorLoja.height}
          className="aspect-4/3"
        />
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
      <InstagramSection />
      <PhotoGallery initialCount={8} showLoadMore={false} />
      <StoreSection />
    </>
  );
}
