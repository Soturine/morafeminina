/**
 * Fronteira principal do catálogo.
 *
 * Hoje:   UI → queries → CatalogRepository → StaticCatalogRepository
 * Futuro: UI → queries → CatalogRepository → MoraCoreCatalogRepository → API
 */
import type { CatalogFilters, Category, Product } from "./types";

export type NewProductsOptions = { limit?: number; departmentSlug?: string };
export type FeaturedProductsOptions = { limit?: number };
export type CategoryListOptions = { parentId?: string; onlyVisible?: boolean };

export interface CatalogRepository {
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;
  listProducts(filters?: CatalogFilters): Promise<Product[]>;
  listCategories(options?: CategoryListOptions): Promise<Category[]>;
  listDepartments(options?: CategoryListOptions): Promise<Category[]>;
  listNewProducts(options?: NewProductsOptions): Promise<Product[]>;
  listFeaturedProducts(options?: FeaturedProductsOptions): Promise<Product[]>;
  /**
   * Mais vendidos depende de dados de venda (Mora Core). Enquanto não
   * existirem, a implementação retorna lista vazia — nunca um ranking inventado.
   */
  listBestSellers(options?: FeaturedProductsOptions): Promise<Product[]>;
}
