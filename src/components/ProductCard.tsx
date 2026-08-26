import { useState } from "react";
import { MessageCircle, ZoomIn } from "lucide-react";
import { formatPrice, installments, type Product } from "@/data/products";
import { SmartImage } from "@/components/SmartImage";
import { ProductZoom } from "@/components/ProductZoom";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { productMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function Badge({ children, tone }: { children: React.ReactNode; tone: "new" | "offer" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.18em] backdrop-blur-sm",
        tone === "new"
          ? "bg-background/90 text-foreground"
          : "bg-accent text-accent-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.price !== undefined && product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null;

  const [zoomOpen, setZoomOpen] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);

  const image = product.image ?? "";
  const imageLarge = product.imageLarge ?? image;
  const alt = product.imageAlt ?? product.name;

  return (
    <article className="card-premium group flex h-full flex-col overflow-hidden">
      <div
        className="relative"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setLens({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }}
        onMouseLeave={() => setLens(null)}
      >
        <SmartImage
          src={image}
          alt={alt}
          className="aspect-4/5 w-full"
          imgClassName="transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />

        {image && lens ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block"
            style={{
              backgroundImage: `url(${imageLarge})`,
              backgroundSize: "220%",
              backgroundPosition: `${lens.x}% ${lens.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : null}

        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label={`Ampliar foto de ${product.name}`}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
        >
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isNew ? <Badge tone="new">Novidade</Badge> : null}
          {discount ? <Badge tone="offer">-{discount}%</Badge> : null}
        </div>

        {zoomOpen ? (
          <ProductZoom
            src={imageLarge}
            alt={alt}
            caption={product.name}
            onClose={() => setZoomOpen(false)}
          />
        ) : null}


        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-lg:hidden">
          <WhatsAppLink
            variant="primary"
            size="sm"
            className="w-full shadow-lg"
            message={productMessage(product.name)}
            context={product.id}
            onClick={() => track("product_interest_click", { product: product.id })}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Comprar pelo WhatsApp
          </WhatsAppLink>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="eyebrow">{product.category}</p>
        <h3 className="mt-1.5 text-lg leading-snug">{product.name}</h3>

        {product.price !== undefined ? (
          <div className="mt-2">
            <div className="flex flex-wrap items-baseline gap-2">
              {product.originalPrice && product.originalPrice > product.price ? (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}
              <span className="font-display text-2xl leading-none text-foreground">
                {formatPrice(product.price)}
              </span>
            </div>
            <p className="mt-1 text-[0.7rem] text-muted-foreground">
              {installments(product.price)}
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">Consulte o preço</p>
        )}

        {product.sizes && product.sizes.length > 0 ? (
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

        {product.colors && product.colors.length > 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">Cores: {product.colors.join(" · ")}</p>
        ) : null}

        {product.ageRange ? (
          <p className="mt-1 text-xs text-muted-foreground">Faixa etária: {product.ageRange}</p>
        ) : null}

        <div className="mt-auto pt-4 lg:hidden">
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

        <span className="mt-auto hidden lg:block" aria-hidden="true" />
      </div>
    </article>
  );
}
