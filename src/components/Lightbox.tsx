import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxItem = { src: string; alt: string };

/** Visualizador acessível: fecha no Esc, navega com setas e prende o foco. */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = items[index];

  const go = useCallback(
    (delta: number) => {
      if (items.length === 0) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Foto da loja em tamanho ampliado"
      className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/90 p-4"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center bg-background text-foreground"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {items.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={(event) => {
              event.stopPropagation();
              go(-1);
            }}
            className="absolute left-4 flex h-11 w-11 items-center justify-center bg-background text-foreground"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={(event) => {
              event.stopPropagation();
              go(1);
            }}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-background text-foreground"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      ) : null}

      <figure className="max-h-full" onClick={(event) => event.stopPropagation()}>
        <img
          src={current.src}
          alt={current.alt}
          className="max-h-[80vh] w-auto max-w-full object-contain"
        />
        <figcaption className="mt-3 text-center text-xs text-background/80">
          {current.alt} · {index + 1} de {items.length}
        </figcaption>
      </figure>
    </div>
  );
}
