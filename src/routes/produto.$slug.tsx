import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { productQuery, productsQuery } from "@/features/catalog/queries";
import {
  DEMONSTRATION_NOTICE,
  PRICE_DISCLAIMER,
  toProductView,
  toProductViews,
} from "@/features/catalog/view-model";
import { formatCents } from "@/domain/catalog/money";
import {
  getVariantAxes,
  imagesForVariant,
  resolveVariant,
  sanitizeSelection,
  type VariantSelection,
} from "@/domain/catalog/variant-resolution";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto/$slug")({
  loader: async ({ params, context }) => {
    const product = await context.queryClient.ensureQueryData(productQuery(params.slug));
    if (!product) throw notFound();
    return { name: product.name, departmentId: product.departmentId };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Peça indisponível | Mora Moda" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} | Mora Moda Feminina e Infantil`;
    const description = `${loaderData.name} na Mora Moda, em Jacareí - SP. Confirme tamanhos, cores e disponibilidade pelo WhatsApp.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
  errorComponent: ProductError,
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        eyebrow="Catálogo"
        title="Peça não encontrada"
        description="Essa peça saiu da vitrine ou o endereço mudou. Veja o catálogo completo ou fale conosco pelo WhatsApp."
      />
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/feminino" className="link-underline text-sm uppercase tracking-[0.14em]">
          Moda feminina
        </Link>
        <Link to="/infantil" className="link-underline text-sm uppercase tracking-[0.14em]">
          Moda infantil
        </Link>
      </div>
    </Section>
  );
}

function ProductError() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        title="Não foi possível carregar esta peça"
        description="Tente novamente em instantes ou fale conosco pelo WhatsApp."
      />
    </Section>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQuery(slug));
  const [selection, setSelection] = useState<VariantSelection>({});

  if (!product) return <ProductNotFound />;

  const view = toProductView(product);
  const axes = getVariantAxes(product, selection);
  const variant = resolveVariant(product, selection);
  const images = imagesForVariant(product, variant);

  const selected = Object.entries(selection)
    .filter(([, v]) => v)
    .map(([, v]) => v)
    .join(" / ");

  const message = `Olá! Vi a peça ${product.name} no site da Mora Moda${
    selected ? ` (${selected})` : ""
  } e gostaria de saber mais sobre tamanhos, cores e disponibilidade.`;

  const pricing = variant?.pricing ?? product.pricing;
  const priceLabel = pricing?.currentPriceCents
    ? formatCents(pricing.currentPriceCents)
    : undefined;

  return (
    <>
      <Section className="pb-0">
        <nav aria-label="Você está aqui" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground">
                Início
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <li>
              <Link
                to={product.audience === "feminino" ? "/feminino" : "/infantil"}
                className="hover:text-foreground"
              >
                {view.departmentName ?? "Catálogo"}
              </Link>
            </li>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <li aria-current="page" className="text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <ProductGallery images={images} name={product.name} />

          <div className="lg:pt-4">
            {view.categoryName ? <p className="eyebrow">{view.categoryName}</p> : null}
            <h1 className="mt-3 text-balance text-3xl leading-tight md:text-4xl">{product.name}</h1>

            <div className="mt-6">
              {priceLabel ? (
                <>
                  <div className="flex flex-wrap items-baseline gap-3">
                    {view.originalPriceLabel ? (
                      <span className="text-sm text-muted-foreground line-through">
                        {view.originalPriceLabel}
                      </span>
                    ) : null}
                    <span className="font-display text-4xl leading-none">{priceLabel}</span>
                  </div>
                  {view.installmentsLabel ? (
                    <p className="mt-2 text-sm text-muted-foreground">{view.installmentsLabel}</p>
                  ) : null}
                </>
              ) : (
                <p className="text-base text-muted-foreground">Consulte o preço pelo WhatsApp</p>
              )}
            </div>

            {axes.length > 0 ? (
              <div className="mt-8 space-y-6">
                {axes.map((axis) => (
                  <fieldset key={axis.key}>
                    <legend className="eyebrow mb-3">{axis.label}</legend>
                    <div className="flex flex-wrap gap-2">
                      {axis.options.map((option) => {
                        const active = selection[axis.key] === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            disabled={!option.available && !active}
                            aria-pressed={active}
                            onClick={() =>
                              setSelection((prev) =>
                                sanitizeSelection(
                                  product,
                                  { ...prev, [axis.key]: active ? undefined : option.value },
                                  axis.key,
                                ),
                              )
                            }
                            className={cn(
                              "h-10 rounded-full border px-4 text-xs uppercase tracking-[0.12em] transition-colors",
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                              !option.available && !active && "cursor-not-allowed opacity-40",
                            )}
                          >
                            {option.value}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            ) : null}

            {product.ageRange?.label ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Faixa etária: {product.ageRange.label}
              </p>
            ) : null}

            <div className="mt-8">
              <WhatsAppLink
                variant="primary"
                size="lg"
                className="w-full"
                message={message}
                context={product.id}
                onClick={() => track("product_interest_click", { product: product.id })}
              >
                Falar no WhatsApp sobre esta peça
              </WhatsAppLink>
            </div>

            {product.description ? (
              <p className="mt-8 text-pretty text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            ) : null}

            <p className="mt-8 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
              {view.isDemonstration ? DEMONSTRATION_NOTICE : PRICE_DISCLAIMER}
            </p>
          </div>
        </div>
      </Section>

      <Related slug={product.slug} categoryId={product.categoryId} />
    </>
  );
}

function Related({ slug, categoryId }: { slug: string; categoryId?: string }) {
  const { data: products } = useSuspenseQuery(
    productsQuery(categoryId ? { categoryId } : {}),
  );
  const related = useMemo(
    () => toProductViews(products.filter((p) => p.slug !== slug).slice(0, 4)),
    [products, slug],
  );

  if (related.length === 0) return null;

  return (
    <Section tone="sand">
      <SectionHeading
        eyebrow="Você também pode gostar"
        title="Peças parecidas"
        description="Outras peças da mesma categoria disponíveis na loja."
      />
      <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
        {related.map((p, i) => (
          <Reveal as="li" key={p.id} delay={i * 70}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
