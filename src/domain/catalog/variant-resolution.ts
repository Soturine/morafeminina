/**
 * Resolução de variantes: regra reutilizável e testável, fora da UI.
 *
 * Garante que só combinações realmente existentes possam ser selecionadas
 * (nunca um estado impossível como "Preto / G" quando essa variante não existe).
 */
import type { Product, ProductImage, ProductVariant } from "./types";

export type VariantSelection = Record<string, string | undefined>;

export type VariantOption = {
  value: string;
  available: boolean;
};

export type VariantAxis = {
  key: string;
  label: string;
  options: VariantOption[];
};

const AXIS_LABELS: Record<string, string> = {
  color: "Cor",
  size: "Tamanho",
  model: "Modelo",
  ageLabel: "Idade",
};

const AXIS_ORDER = ["color", "model", "size", "ageLabel"];

function activeVariants(product: Product): ProductVariant[] {
  return product.variants.filter((v) => v.active);
}

/** Eixos existentes, na ordem canônica, apenas com valores realmente presentes. */
export function getVariantAxes(product: Product, selection: VariantSelection = {}): VariantAxis[] {
  const variants = activeVariants(product);
  const keys = new Set<string>();
  for (const variant of variants) {
    for (const [key, value] of Object.entries(variant.attributes)) {
      if (value) keys.add(key);
    }
  }

  const ordered = [...keys].sort((a, b) => {
    const ia = AXIS_ORDER.indexOf(a);
    const ib = AXIS_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  return ordered.map((key) => {
    const values: string[] = [];
    for (const variant of variants) {
      const value = variant.attributes[key];
      if (value && !values.includes(value)) values.push(value);
    }

    const others = Object.entries(selection).filter(([k, v]) => k !== key && v);

    return {
      key,
      label: AXIS_LABELS[key] ?? key,
      options: values.map((value) => ({
        value,
        available: variants.some(
          (variant) =>
            variant.attributes[key] === value &&
            others.every(([k, v]) => variant.attributes[k] === v),
        ),
      })),
    };
  });
}

/** Variante que satisfaz exatamente a seleção atual, se houver uma só. */
export function resolveVariant(
  product: Product,
  selection: VariantSelection,
): ProductVariant | null {
  const entries = Object.entries(selection).filter(([, v]) => v);
  const matches = activeVariants(product).filter((variant) =>
    entries.every(([k, v]) => variant.attributes[k] === v),
  );
  if (matches.length === 1) return matches[0] ?? null;
  if (entries.length > 0 && matches.length > 1) return null;
  return matches.length === 1 ? (matches[0] ?? null) : null;
}

/** Remove seleções que se tornaram impossíveis depois de mudar um eixo. */
export function sanitizeSelection(
  product: Product,
  selection: VariantSelection,
  changedKey?: string,
): VariantSelection {
  const variants = activeVariants(product);
  const next: VariantSelection = {};
  const keys = Object.keys(selection).sort((a, b) =>
    a === changedKey ? -1 : b === changedKey ? 1 : 0,
  );

  for (const key of keys) {
    const value = selection[key];
    if (!value) continue;
    const candidate = { ...next, [key]: value };
    const possible = variants.some((variant) =>
      Object.entries(candidate).every(([k, v]) => variant.attributes[k] === v),
    );
    if (possible) next[key] = value;
  }
  return next;
}

/** Imagens específicas da variante, com fallback para as imagens do produto. */
export function imagesForVariant(product: Product, variant: ProductVariant | null): ProductImage[] {
  if (variant?.imageIds?.length) {
    const specific = product.images.filter((image) => variant.imageIds?.includes(image.id));
    if (specific.length > 0) return specific;
  }
  return product.images;
}
