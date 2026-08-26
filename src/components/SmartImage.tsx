import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Imagem com reserva de espaço (evita layout shift) e fallback elegante
 * quando a origem externa estiver indisponível ou for removida.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  eager = false,
  sizes,
  srcSet,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  sizes?: string;
  srcSet?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-secondary", className)}>
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground">
          <ImageOff className="h-5 w-5" aria-hidden="true" />
          <span className="text-[0.7rem] uppercase tracking-[0.14em]">Foto indisponível</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          {...(width ? { width } : {})}
          {...(height ? { height } : {})}
          {...(sizes ? { sizes } : {})}
          {...(srcSet ? { srcSet } : {})}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          {...(eager ? { fetchPriority: "high" as const } : {})}
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
