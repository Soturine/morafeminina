/**
 * Modelo de domínio canônico do catálogo.
 *
 * Estes tipos NÃO dependem do formato dos dados atuais (`src/data/products.ts`).
 * Quando o Mora Core existir, apenas uma nova implementação de
 * `CatalogRepository` será necessária — a UI permanece igual.
 */
import type { Currency } from "./money";

/** Público-alvo conceitual (não é o mesmo que departamento). */
export type Audience = "feminino" | "juvenil" | "infantil" | "bebe" | "unissex";

/** Confiabilidade comercial do dado exibido. */
export type DataStatus = "verified" | "demonstration";

export type PublishStatus = "draft" | "published" | "archived";

export type Availability = "in_stock" | "low_stock" | "out_of_stock" | "unknown";

export type ProductImage = {
  id: string;
  src: string;
  srcLarge?: string;
  alt: string;
  position: number;
  width?: number;
  height?: number;
  role?: "primary" | "gallery" | "detail" | "variant";
};

export type Pricing = {
  currentPriceCents?: number;
  originalPriceCents?: number;
  currency: Currency;
  /** `false` = valor de referência/demonstração; nunca publicar como preço real. */
  verified: boolean;
};

export type VariantAttributes = {
  model?: string;
  color?: string;
  size?: string;
  ageLabel?: string;
} & Record<string, string | undefined>;

export type ProductVariant = {
  id: string;
  sku?: string;
  barcode?: string;
  active: boolean;
  attributes: VariantAttributes;
  pricing?: Pricing;
  availability: Availability;
  imageIds?: string[];
};

export type CategorySeo = {
  title?: string;
  description?: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  parentId?: string;
  sortOrder: number;
  active: boolean;
  visibleOnWebsite: boolean;
  description?: string;
  image?: { src: string; alt: string };
  seo?: CategorySeo;
};

export type AgeRange = {
  label: string;
  minMonths?: number;
  maxMonths?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description?: string;

  departmentId?: string;
  categoryId?: string;
  subcategoryId?: string;
  audience?: Audience;
  ageRange?: AgeRange;

  images: ProductImage[];
  variants: ProductVariant[];
  pricing?: Pricing;

  dataStatus: DataStatus;
  publishStatus: PublishStatus;

  tags?: string[];
  featured?: boolean;

  publishedAt?: string;
  firstAvailableAt?: string;
  updatedAt?: string;
};

export type CatalogFilters = {
  departmentSlug?: string;
  categoryId?: string;
  audience?: Audience;
  search?: string;
  tag?: string;
  onlyPublished?: boolean;
  limit?: number;
};

/** Capacidades de filtro derivadas dos dados realmente presentes. */
export type CatalogFacets = {
  categories: { id: string; name: string; count: number }[];
  sizes: string[];
  colors: string[];
  ageRanges: string[];
  /** Só é `true` quando existir preço verificado — nunca filtrar por preço fictício. */
  priceFilterAvailable: boolean;
};
