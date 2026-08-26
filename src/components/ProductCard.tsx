import { ImageOff } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { productMessage } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={product.imageAlt ?? product.name}
            width={900}
            height={1125}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageOff className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs">Foto em breve</span>
          </div>
        )}

        {(product.isNew || product.isOffer) && (
          <span className="absolute left-3 top-3 bg-background/95 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.18em] text-foreground">
            {product.isNew ? "Novidade" : "Oferta"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow">{product.category}</p>
        <h3 className="mt-1.5 text-lg leading-snug">{product.name}</h3>

        {product.price !== undefined ? (
          <p className="mt-1 text-sm text-foreground">{formatPrice(product.price)}</p>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">Consulte o preço</p>
        )}

        {product.sizes && product.sizes.length > 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Tamanhos: {product.sizes.join(" · ")}
          </p>
        ) : null}

        <WhatsAppLink
          variant="outline"
          size="sm"
          className="mt-4 w-full"
          message={productMessage(product.name)}
          context={product.id}
          onClick={() => track("product_interest_click", { product: product.id })}
        >
          Tenho interesse
        </WhatsAppLink>
      </div>
    </article>
  );
}
