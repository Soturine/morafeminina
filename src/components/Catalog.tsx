import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/domain/catalog/types";
import {
  PRICE_DISCLAIMER,
  toProductViews,
  type ProductView,
} from "@/features/catalog/view-model";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type PriceRange = { id: string; label: string; min: number; max: number };

const PRICE_RANGES: PriceRange[] = [
  { id: "ate-100", label: "Até R$ 100", min: 0, max: 100 },
  { id: "100-200", label: "R$ 100 a R$ 200", min: 100, max: 200 },
  { id: "acima-200", label: "Acima de R$ 200", min: 200, max: Infinity },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-9 rounded-full border px-4 text-xs uppercase tracking-[0.12em] transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function FilterGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="eyebrow mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Catalog({
  products,
  showAgeFilter,
}: {
  products: Product[];
  /** Por padrão a faceta aparece quando os dados tiverem faixa etária. */
  showAgeFilter?: boolean;
}) {
  const items: ProductView[] = useMemo(() => toProductViews(products), [products]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [onlyNew, setOnlyNew] = useState(false);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(items.map((p) => p.categoryName).filter(Boolean) as string[]),
      ).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [items],
  );
  const sizes = useMemo(() => {
    const letter = ["RN", "PP", "P", "M", "G", "GG", "XG"];
    return Array.from(new Set(items.flatMap((p) => p.sizes))).sort((a, b) => {
      const ia = letter.indexOf(a);
      const ib = letter.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return Number(a) - Number(b);
    });
  }, [items]);
  const ages = useMemo(
    () => Array.from(new Set(items.map((p) => p.ageLabel).filter(Boolean) as string[])),
    [items],
  );
  const colors = useMemo(
    () =>
      Array.from(new Set(items.flatMap((p) => p.colors))).sort((a, b) =>
        a.localeCompare(b, "pt-BR"),
      ),
    [items],
  );
  const priceRanges = useMemo(
    () =>
      PRICE_RANGES.filter((range) =>
        items.some(
          (p) => p.priceValue !== undefined && p.priceValue >= range.min && p.priceValue < range.max,
        ),
      ),
    [items],
  );
  const hasNew = useMemo(() => items.some((p) => p.isNew), [items]);

  const filtered = useMemo(() => {
    const normalized = normalize(query);

    return items.filter((p) => {
      if (category && p.categoryName !== category) return false;
      if (size && !p.sizes.includes(size)) return false;
      if (age && p.ageLabel !== age) return false;
      if (color && !p.colors.includes(color)) return false;
      if (onlyNew && !p.isNew) return false;
      if (price) {
        const range = PRICE_RANGES.find((r) => r.id === price);
        if (range) {
          if (p.priceValue === undefined) return false;
          if (p.priceValue < range.min || p.priceValue >= range.max) return false;
        }
      }
      if (normalized) {
        const haystack = normalize(`${p.name} ${p.categoryName ?? ""}`);
        if (!haystack.includes(normalized)) return false;
      }
      return true;
    });
  }, [items, category, size, price, age, color, onlyNew, query]);

  const ageFilterVisible = (showAgeFilter ?? true) && ages.length > 0;

  const hasFilters =
    categories.length > 1 ||
    sizes.length > 0 ||
    priceRanges.length > 1 ||
    colors.length > 1 ||
    hasNew ||
    ageFilterVisible;

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="border-y border-border py-6">
        <label className="relative block max-w-md">
          <span className="sr-only">Buscar peça pelo nome</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar peça pelo nome"
            className="h-11 w-full rounded-sm border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-accent"
          />
        </label>

        {hasFilters ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.length > 1 ? (
              <FilterGroup legend="Categoria">
                <Chip active={category === null} onClick={() => setCategory(null)}>
                  Todas
                </Chip>
                {categories.map((c) => (
                  <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                    {c}
                  </Chip>
                ))}
              </FilterGroup>
            ) : null}

            {sizes.length > 0 ? (
              <FilterGroup legend="Tamanho">
                <Chip active={size === null} onClick={() => setSize(null)}>
                  Todos
                </Chip>
                {sizes.map((s) => (
                  <Chip key={s} active={size === s} onClick={() => setSize(s)}>
                    {s}
                  </Chip>
                ))}
              </FilterGroup>
            ) : null}

            {ageFilterVisible ? (
              <FilterGroup legend="Faixa etária">
                <Chip active={age === null} onClick={() => setAge(null)}>
                  Todas
                </Chip>
                {ages.map((a) => (
                  <Chip key={a} active={age === a} onClick={() => setAge(a)}>
                    {a}
                  </Chip>
                ))}
              </FilterGroup>
            ) : null}

            {colors.length > 1 ? (
              <FilterGroup legend="Cor">
                <Chip active={color === null} onClick={() => setColor(null)}>
                  Todas
                </Chip>
                {colors.map((c) => (
                  <Chip key={c} active={color === c} onClick={() => setColor(c)}>
                    {c}
                  </Chip>
                ))}
              </FilterGroup>
            ) : null}

            {priceRanges.length > 1 ? (
              <FilterGroup legend="Preço">
                <Chip active={price === null} onClick={() => setPrice(null)}>
                  Todos
                </Chip>
                {priceRanges.map((r) => (
                  <Chip key={r.id} active={price === r.id} onClick={() => setPrice(r.id)}>
                    {r.label}
                  </Chip>
                ))}
              </FilterGroup>
            ) : null}

            {hasNew ? (
              <FilterGroup legend="Novidades">
                <Chip active={onlyNew} onClick={() => setOnlyNew((v) => !v)}>
                  Só novidades
                </Chip>
              </FilterGroup>
            ) : null}
          </div>
        ) : null}
      </div>

      <p className="mt-6 text-xs text-muted-foreground" role="status">
        {filtered.length} {filtered.length === 1 ? "peça encontrada" : "peças encontradas"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="Nenhuma peça encontrada"
            text="Tente outra busca ou fale conosco pelo WhatsApp — a loja tem muito mais peças do que conseguimos mostrar aqui."
          />
        </div>
      ) : (
        <>
          <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-xs text-muted-foreground">{PRICE_DISCLAIMER}</p>
        </>
      )}
    </div>
  );
}
