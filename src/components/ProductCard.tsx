import { Link } from "@tanstack/react-router";
import { SmartImage } from "@/components/SmartImage";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { productMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import type { ProductView } from "@/features/catalog/view-model";
import { cn } from "@/lib/utils";

function Badge({ children, tone }: { children: React.ReactNode; tone: "new" | "offer" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.18em] backdrop-blur-sm",
        tone === "new" ? "bg-background/90 text-foreground" : "bg-accent text-accent-foreground",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Card de vitrine: a área principal (foto + nome) navega para a página do
 * produto. O WhatsApp continua disponível como ação secundária e independente.
 */
export function ProductCard({ product }: { product: ProductView }) {
  const image = product.image ?? "";

  return (
    <article className="card-premium group flex h-full flex-col overflow-hidden">
      <div className="relative">
        <Link
          to="/produto/$slug"
          params={{ slug: product.slug }}
          aria-label={`Ver detalhes de ${product.name}`}
          onClick={() => track("product_click", { product: product.id })}
          className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <SmartImage
            src={image}
            alt={product.imageAlt}
            className="aspect-4/5 w-full"
            imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isNew ? <Badge tone="new">Novidade</Badge> : null}
          {product.discount ? <Badge tone="offer">-{product.discount}%</Badge> : null}
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-lg:hidden">
          <Link
            to="/produto/$slug"
            params={{ slug: product.slug }}
            onClick={() => track("product_click", { product: product.id })}
            className="flex h-10 w-full items-center justify-center rounded-sm bg-background/95 text-[0.6875rem] uppercase tracking-[0.16em] text-foreground shadow-lg backdrop-blur-sm transition-colors hover:bg-background"
          >
            Ver detalhes
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        {product.categoryName ? <p className="eyebrow">{product.categoryName}</p> : null}
        <h3 className="mt-1.5 text-lg leading-snug">
          <Link
            to="/produto/$slug"
            params={{ slug: product.slug }}
            onClick={() => track("product_click", { product: product.id })}
            className="link-underline"
          >
            {product.name}
          </Link>
        </h3>

        {product.priceLabel ? (
          <div className="mt-2">
            <div className="flex flex-wrap items-baseline gap-2">
              {product.originalPriceLabel ? (
                <span className="text-xs text-muted-foreground line-through">
                  {product.originalPriceLabel}
                </span>
              ) : null}
              <span className="font-display text-2xl leading-none text-foreground">
                {product.priceLabel}
              </span>
            </div>
            {product.installmentsLabel ? (
              <p className="mt-1 text-[0.7rem] text-muted-foreground">
                {product.installmentsLabel}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">Consulte o preço</p>
        )}

        {product.sizes.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tamanhos disponíveis">
            {product.sizes.map((s) => (
              <li
                key={s}
                className="rounded-sm border border-border px-2 py-0.5 text-[0.7rem] text-muted-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        ) : null}

        {product.colors.length > 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">Cores: {product.colors.join(" · ")}</p>
        ) : null}

        {product.ageLabel ? (
          <p className="mt-1 text-xs text-muted-foreground">Faixa etária: {product.ageLabel}</p>
        ) : null}

        <div className="mt-auto pt-4">
          <WhatsAppLink
            variant="outline"
            size="sm"
            className="w-full min-w-0 whitespace-normal px-2 text-center text-[0.6875rem] leading-tight tracking-[0.1em]"
            message={productMessage(product.name)}
            context={product.id}
            onClick={() => track("product_interest_click", { product: product.id })}
          >
            Comprar no WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </article>
  );
}
