import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Visualizador de produto com zoom: roda do mouse, pinça de dois dedos,
 * arrastar para deslocar e duplo toque/clique para aproximar.
 */
export function ProductZoom({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const stateRef = useRef({ zoom, offset });
  stateRef.current = { zoom, offset };

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; cx: number; cy: number } | null>(null);
  const lastTap = useRef(0);

  const reset = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  /** Aplica um novo zoom mantendo o ponto (px, py) fixo na tela. */
  const zoomTo = useCallback((next: number, px: number, py: number) => {
    const { zoom: z, offset: o } = stateRef.current;
    const clamped = clamp(next, MIN_ZOOM, MAX_ZOOM);
    const k = clamped / z;
    const newOffset =
      clamped === MIN_ZOOM
        ? { x: 0, y: 0 }
        : { x: px - (px - o.x) * k, y: py - (py - o.y) * k };
    setZoom(clamped);
    setOffset(newOffset);
  }, []);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const { zoom: z } = stateRef.current;
      zoomTo(z * Math.exp(-dy * 0.0025), e.clientX - rect.left, e.clientY - rect.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinch.current = {
        dist: Math.hypot(a!.x - b!.x, a!.y - b!.y),
        cx: (a!.x + b!.x) / 2,
        cy: (a!.y + b!.y) / 2,
      };
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (pointers.current.size >= 2) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a!.x - b!.x, a!.y - b!.y);
      const start = pinch.current;
      if (start && start.dist > 0) {
        zoomTo(
          stateRef.current.zoom * (dist / start.dist),
          (a!.x + b!.x) / 2 - rect.left,
          (a!.y + b!.y) / 2 - rect.top,
        );
      }
      pinch.current = { dist, cx: (a!.x + b!.x) / 2, cy: (a!.y + b!.y) / 2 };
      return;
    }

    if (stateRef.current.zoom > 1) {
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;

    const now = Date.now();
    if (pointers.current.size === 0 && now - lastTap.current < 300) {
      const rect = areaRef.current?.getBoundingClientRect();
      if (rect) {
        if (stateRef.current.zoom > 1) reset();
        else zoomTo(2.5, e.clientX - rect.left, e.clientY - rect.top);
      }
      lastTap.current = 0;
      return;
    }
    lastTap.current = now;
  };

  const stepZoom = (factor: number) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    zoomTo(stateRef.current.zoom * factor, rect.width / 2, rect.height / 2);
  };

  const body = typeof document !== "undefined" ? document.body : null;
  if (!body) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${alt}`}
      className="fixed inset-0 z-100 flex flex-col bg-foreground/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
        <p className="min-w-0 truncate text-xs uppercase tracking-[0.16em] text-background/80">
          {caption ?? alt}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => stepZoom(1 / 1.6)}
            aria-label="Reduzir zoom"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25"
          >
            <ZoomOut className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => stepZoom(1.6)}
            aria-label="Aumentar zoom"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25"
          >
            <ZoomIn className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={reset}
            aria-label="Restaurar zoom"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Fechar"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={areaRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative flex-1 touch-none select-none overflow-hidden"
        style={{ cursor: zoom > 1 ? "grab" : "zoom-in" }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
          style={{
            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
          }}
        />
      </div>

      <p className="p-3 text-center text-[0.7rem] text-background/70 sm:p-4">
        Use a roda do mouse ou dois dedos para dar zoom · arraste para mover · duplo toque para
        aproximar
      </p>
    </div>,
    body,
  );
}
