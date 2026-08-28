/**
 * Chaves de cache do catálogo (TanStack Query).
 *
 * Toda leitura de catálogo passa por aqui — trocar a implementação do
 * `CatalogRepository` (estático → Mora Core) não muda nenhuma chave.
 */
import type { CatalogFilters } from "@/domain/catalog/types";

export const catalogKeys = {
  all: ["catalog"] as const,
  products: (filters: CatalogFilters = {}) => ["catalog", "products", filters] as const,
  product: (slug: string) => ["catalog", "product", slug] as const,
  departments: () => ["catalog", "departments"] as const,
  categories: (parentId?: string) => ["catalog", "categories", parentId ?? null] as const,
  newProducts: (departmentSlug?: string, limit?: number) =>
    ["catalog", "new", departmentSlug ?? null, limit ?? null] as const,
  featured: (limit?: number) => ["catalog", "featured", limit ?? null] as const,
  bestSellers: (limit?: number) => ["catalog", "best-sellers", limit ?? null] as const,
};
