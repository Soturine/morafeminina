/**
 * Adaptação domínio → apresentação.
 *
 * A UI não formata preço nem interpreta variantes sozinha: tudo passa por
 * aqui, então regras como "preço não verificado" ficam em um lugar só.
 */
import { discountPercent, formatCents, fromCents } from "@/domain/catalog/money";
import type { Product } from "@/domain/catalog/types";
import {
  categoryName as lookupCategoryName,
  departmentName as lookupDepartmentName,
} from "@/infrastructure/catalog/static-catalog-repository";

export const PRICE_DISCLAIMER =
  "Preços e tamanhos são de referência e podem variar conforme o estoque da loja. Confirme a disponibilidade pelo WhatsApp.";

export const DEMONSTRATION_NOTICE =
  "Item de demonstração da vitrine: as fotos são reais da loja, mas preço, tamanhos e cores devem ser confirmados pelo WhatsApp.";

export type ProductView = {
  id: string;
  slug: string;
  name: string;
  categoryName?: string;
  departmentName?: string;
  image?: string;
  imageLarge?: string;
  imageAlt: string;
  /** Valor em reais — usado apenas por filtros de faixa de preço. */
  priceValue?: number;
  priceLabel?: string;
  originalPriceLabel?: string;
  installmentsLabel?: string;
  discount?: number;
  priceVerified: boolean;
  sizes: string[];
  colors: string[];
  ageLabel?: string;
  isNew: boolean;
  isDemonstration: boolean;
};

function uniqueAttribute(product: Product, key: "size" | "color"): string[] {
  const values: string[] = [];
  for (const variant of product.variants) {
    if (!variant.active) continue;
    const value = variant.attributes[key];
    if (value && !values.includes(value)) values.push(value);
  }
  return values;
}

export function installmentsLabel(amountCents: number, times = 3): string {
  return `ou ${times}x de ${formatCents(Math.round(amountCents / times))} sem juros`;
}

export function toProductView(product: Product): ProductView {
  const primary = product.images[0];
  const pricing = product.pricing;
  const current = pricing?.currentPriceCents;
  const original = pricing?.originalPriceCents;

  const view: ProductView = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    imageAlt: primary?.alt ?? product.name,
    priceVerified: pricing?.verified ?? false,
    sizes: uniqueAttribute(product, "size"),
    colors: uniqueAttribute(product, "color"),
    isNew: (product.tags ?? []).includes("novidade"),
    isDemonstration: product.dataStatus === "demonstration",
  };

  const categoryName = lookupCategoryName(product.categoryId);
  if (categoryName) view.categoryName = categoryName;
  const departmentName = lookupDepartmentName(product.departmentId);
  if (departmentName) view.departmentName = departmentName;

  if (primary) {
    view.image = primary.src;
    view.imageLarge = primary.srcLarge ?? primary.src;
  }
  if (product.ageRange?.label) view.ageLabel = product.ageRange.label;

  if (current !== undefined) {
    view.priceValue = fromCents(current);
    view.priceLabel = formatCents(current);
    view.installmentsLabel = installmentsLabel(current);
    if (original !== undefined && original > current) {
      view.originalPriceLabel = formatCents(original);
      const percent = discountPercent(current, original);
      if (percent) view.discount = percent;
    }
  }

  return view;
}

export function toProductViews(products: Product[]): ProductView[] {
  return products.map(toProductView);
}
