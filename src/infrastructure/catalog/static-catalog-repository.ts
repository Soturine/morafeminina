/**
 * Implementação atual do `CatalogRepository`: adapta os dados legados de
 * `src/data/products.ts` (fotos reais + metadados de demonstração) para o
 * domínio canônico.
 *
 * Regras aplicadas aqui:
 * - todo item legado entra como `dataStatus: "demonstration"`;
 * - preço legado vira centavos com `verified: false` (não é preço comercial);
 * - `sizes[]`/`colors[]` viram variantes demonstrativas com
 *   `availability: "unknown"` — nunca estoque real;
 * - o `id` legado (já em formato slug) é reutilizado como slug estável.
 *
 * Trocar para o Mora Core = criar outra implementação desta interface.
 */
import {
  products as legacyProducts,
  type Product as LegacyProduct,
} from "@/data/products";
import type {
  CatalogRepository,
  CategoryListOptions,
  FeaturedProductsOptions,
  NewProductsOptions,
} from "@/domain/catalog/repository";
import type {
  Audience,
  CatalogFilters,
  Category,
  Product,
  ProductImage,
  ProductVariant,
} from "@/domain/catalog/types";
import { toCents } from "@/domain/catalog/money";
import {
  categoryId as makeCategoryId,
  departmentById,
  departments,
  resolveDepartmentId,
  slugify,
} from "./taxonomy";

function audienceFor(departmentId: string): Audience {
  switch (departmentId) {
    case "dep-feminino":
      return "feminino";
    case "dep-juvenil":
      return "juvenil";
    case "dep-bebe":
    case "dep-enxoval":
      return "bebe";
    case "dep-infantil":
      return "infantil";
    default:
      return "unissex";
  }
}

function imagesFor(legacy: LegacyProduct): ProductImage[] {
  if (!legacy.image) return [];
  const image: ProductImage = {
    id: `${legacy.id}-1`,
    src: legacy.image,
    position: 0,
    alt: legacy.imageAlt ?? legacy.name,
    role: "primary",
  };
  if (legacy.imageLarge) image.srcLarge = legacy.imageLarge;
  return [image];
}

/**
 * Variantes demonstrativas: os dados legados não sabem quais combinações
 * existem de fato, então cada eixo vira uma variante independente com
 * disponibilidade desconhecida (sem produto cartesiano falso).
 */
function variantsFor(legacy: LegacyProduct): ProductVariant[] {
  const variants: ProductVariant[] = [];
  const sizes = legacy.sizes ?? [];
  const colors = legacy.colors ?? [];

  if (sizes.length === 0 && colors.length === 0) return variants;

  if (sizes.length > 0 && colors.length > 0) {
    for (const color of colors) {
      for (const size of sizes) {
        variants.push({
          id: `${legacy.id}--${slugify(color)}--${slugify(size)}`,
          active: true,
          attributes: { color, size },
          availability: "unknown",
        });
      }
    }
    return variants;
  }

  for (const size of sizes) {
    variants.push({
      id: `${legacy.id}--${slugify(size)}`,
      active: true,
      attributes: { size },
      availability: "unknown",
    });
  }
  for (const color of colors) {
    variants.push({
      id: `${legacy.id}--${slugify(color)}`,
      active: true,
      attributes: { color },
      availability: "unknown",
    });
  }
  return variants;
}

function adapt(legacy: LegacyProduct): Product {
  const departmentId = resolveDepartmentId(legacy.segment, legacy.category);
  const product: Product = {
    id: legacy.id,
    slug: legacy.id,
    name: legacy.name,
    departmentId,
    categoryId: makeCategoryId(departmentId, legacy.category),
    audience: audienceFor(departmentId),
    images: imagesFor(legacy),
    variants: variantsFor(legacy),
    dataStatus: "demonstration",
    publishStatus: "published",
    tags: legacy.isNew ? ["novidade"] : [],
  };

  if (legacy.ageRange) product.ageRange = { label: legacy.ageRange };
  if (legacy.price !== undefined) {
    product.pricing = {
      currentPriceCents: toCents(legacy.price),
      currency: "BRL",
      verified: false,
      ...(legacy.originalPrice !== undefined
        ? { originalPriceCents: toCents(legacy.originalPrice) }
        : {}),
    };
  }
  return product;
}

const allProducts: Product[] = legacyProducts.map(adapt);

/** Categorias derivadas dos produtos existentes (nunca grupos vazios). */
const allCategories: Category[] = (() => {
  const map = new Map<string, Category>();
  for (const legacy of legacyProducts) {
    const departmentId = resolveDepartmentId(legacy.segment, legacy.category);
    const id = makeCategoryId(departmentId, legacy.category);
    if (map.has(id)) continue;
    map.set(id, {
      id,
      slug: slugify(legacy.category),
      name: legacy.category,
      parentId: departmentId,
      sortOrder: map.size,
      active: true,
      visibleOnWebsite: true,
    });
  }
  return [...map.values()];
})();

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matches(product: Product, filters: CatalogFilters): boolean {
  if (filters.onlyPublished !== false && product.publishStatus !== "published") return false;
  if (filters.departmentSlug) {
    const department = departments.find((d) => d.slug === filters.departmentSlug);
    if (!department || product.departmentId !== department.id) return false;
  }
  if (filters.categoryId && product.categoryId !== filters.categoryId) return false;
  if (filters.audience && product.audience !== filters.audience) return false;
  if (filters.tag && !(product.tags ?? []).includes(filters.tag)) return false;
  if (filters.search) {
    const category = allCategories.find((c) => c.id === product.categoryId)?.name ?? "";
    const haystack = normalize(`${product.name} ${category}`);
    if (!haystack.includes(normalize(filters.search.trim()))) return false;
  }
  return true;
}

export class StaticCatalogRepository implements CatalogRepository {
  async getProductBySlug(slug: string): Promise<Product | null> {
    return allProducts.find((p) => p.slug === slug) ?? null;
  }

  async getProductById(id: string): Promise<Product | null> {
    return allProducts.find((p) => p.id === id) ?? null;
  }

  async listProducts(filters: CatalogFilters = {}): Promise<Product[]> {
    const list = allProducts.filter((p) => matches(p, filters));
    return filters.limit ? list.slice(0, filters.limit) : list;
  }

  async listCategories(options: CategoryListOptions = {}): Promise<Category[]> {
    return allCategories.filter((c) => {
      if (options.parentId && c.parentId !== options.parentId) return false;
      if (options.onlyVisible !== false && !(c.active && c.visibleOnWebsite)) return false;
      return true;
    });
  }

  /** Só devolve departamentos publicáveis que realmente têm produto. */
  async listDepartments(options: CategoryListOptions = {}): Promise<Category[]> {
    return departments
      .filter((d) => {
        if (options.onlyVisible !== false && !(d.active && d.visibleOnWebsite)) return false;
        return allProducts.some((p) => p.departmentId === d.id);
      })
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  /**
   * Novidades vêm de `publishedAt`/`firstAvailableAt` quando existirem.
   * Nos dados atuais só existe a marcação legada, exposta como tag "novidade".
   */
  async listNewProducts(options: NewProductsOptions = {}): Promise<Product[]> {
    const dated = allProducts
      .filter((p) => p.firstAvailableAt ?? p.publishedAt)
      .sort((a, b) =>
        (b.firstAvailableAt ?? b.publishedAt ?? "").localeCompare(
          a.firstAvailableAt ?? a.publishedAt ?? "",
        ),
      );
    const tagged = allProducts.filter((p) => (p.tags ?? []).includes("novidade"));
    const list = (dated.length > 0 ? dated : tagged).filter((p) => {
      if (!options.departmentSlug) return true;
      const department = departments.find((d) => d.slug === options.departmentSlug);
      return department ? p.departmentId === department.id : false;
    });
    return options.limit ? list.slice(0, options.limit) : list;
  }

  async listFeaturedProducts(options: FeaturedProductsOptions = {}): Promise<Product[]> {
    const explicit = allProducts.filter((p) => p.featured);
    const list = explicit.length > 0 ? explicit : allProducts;
    return list.slice(0, options.limit ?? 4);
  }

  /** Sem dados de venda não existe ranking — lista vazia é a resposta honesta. */
  async listBestSellers(): Promise<Product[]> {
    return [];
  }
}

export const staticCatalogRepository = new StaticCatalogRepository();

export function departmentName(departmentId?: string): string | undefined {
  return departmentId ? departmentById(departmentId)?.name : undefined;
}

export function categoryName(categoryId?: string): string | undefined {
  return categoryId ? allCategories.find((c) => c.id === categoryId)?.name : undefined;
}

/** Usado por sitemap/testes: todos os slugs de produto publicados. */
export function allProductSlugs(): string[] {
  return allProducts.map((p) => p.slug);
}
