import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { EmptyState } from "@/components/EmptyState";
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

function FilterGroup({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="eyebrow mb-3">{legend}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export function Catalog({
  products,
  showAgeFilter = false,
}: {
  products: Product[];
  showAgeFilter?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [onlyNew, setOnlyNew] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [products],
  );
  const sizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes ?? []))),
    [products],
  );
  const ages = useMemo(
    () => Array.from(new Set(products.map((p) => p.ageRange).filter(Boolean) as string[])),
    [products],
  );
  const priceRanges = useMemo(
    () =>
      PRICE_RANGES.filter((range) =>
        products.some((p) => p.price !== undefined && p.price >= range.min && p.price < range.max),
      ),
    [products],
  );
  const hasNew = useMemo(() => products.some((p) => p.isNew), [products]);

  const filtered = useMemo(() => {
    const normalized = query
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (size && !(p.sizes ?? []).includes(size)) return false;
      if (age && p.ageRange !== age) return false;
      if (onlyNew && !p.isNew) return false;
      if (price) {
        const range = PRICE_RANGES.find((r) => r.id === price);
        if (range) {
          if (p.price === undefined) return false;
          if (p.price < range.min || p.price >= range.max) return false;
        }
      }
      if (normalized) {
        const haystack = `${p.name} ${p.category}`
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        if (!haystack.includes(normalized)) return false;
      }
      return true;
    });
  }, [products, category, size, price, age, onlyNew, query]);

  const hasFilters =
    categories.length > 1 || sizes.length > 0 || priceRanges.length > 1 || hasNew || (showAgeFilter && ages.length > 0);

  if (products.length === 0) {
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

            {showAgeFilter && ages.length > 0 ? (
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
        <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
