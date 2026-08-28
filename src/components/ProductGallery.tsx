import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { SmartImage } from "@/components/SmartImage";
import { ProductZoom } from "@/components/ProductZoom";
import type { ProductImage } from "@/domain/catalog/types";
import { cn } from "@/lib/utils";

/**
 * Galeria da página de produto: miniaturas, lente de aumento no desktop
 * (hover) e visualizador em tela cheia com pinça/arraste no celular.
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);

  const active = images[Math.min(index, images.length - 1)];
  if (!active) {
    return <SmartImage src="" alt={name} className="aspect-4/5 w-full" />;
  }

  const large = active.srcLarge ?? active.src;

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse md:items-start">
      <div
        className="group relative flex-1"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setLens({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }}
        onMouseLeave={() => setLens(null)}
      >
        <SmartImage src={active.src} alt={active.alt} className="frame aspect-4/5 w-full" eager />

        {lens ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block"
            style={{
              backgroundImage: `url(${large})`,
              backgroundSize: "220%",
              backgroundPosition: `${lens.x}% ${lens.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : null}

        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label={`Ampliar foto de ${name}`}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
        >
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
        </button>

        {zoomOpen ? (
          <ProductZoom
            src={large}
            alt={active.alt}
            caption={name}
            onClose={() => setZoomOpen(false)}
          />
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul className="flex gap-3 md:w-20 md:flex-col" aria-label="Outras fotos do produto">
          {images.map((image, i) => (
            <li key={image.id} className="w-16 shrink-0 md:w-full">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1} de ${images.length}`}
                aria-current={i === index}
                className={cn(
                  "block w-full overflow-hidden rounded-sm border transition-colors",
                  i === index ? "border-accent" : "border-border hover:border-primary/40",
                )}
              >
                <SmartImage src={image.src} alt={image.alt} className="aspect-4/5 w-full" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
