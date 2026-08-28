/**
 * Opções de query do catálogo.
 *
 * A UI nunca importa `src/data/products.ts`: ela consome estas queries, que
 * falam apenas com a interface `CatalogRepository`.
 */
import { queryOptions } from "@tanstack/react-query";
import type { CatalogFilters } from "@/domain/catalog/types";
import { staticCatalogRepository } from "@/infrastructure/catalog/static-catalog-repository";
import { catalogKeys } from "./catalog-keys";

/** Implementação ativa. Trocar aqui = trocar a fonte de dados do site inteiro. */
const repository = staticCatalogRepository;

export const productsQuery = (filters: CatalogFilters = {}) =>
  queryOptions({
    queryKey: catalogKeys.products(filters),
    queryFn: () => repository.listProducts(filters),
  });

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: catalogKeys.product(slug),
    queryFn: () => repository.getProductBySlug(slug),
  });

export const departmentsQuery = () =>
  queryOptions({
    queryKey: catalogKeys.departments(),
    queryFn: () => repository.listDepartments(),
  });

export const categoriesQuery = (parentId?: string) =>
  queryOptions({
    queryKey: catalogKeys.categories(parentId),
    queryFn: () => repository.listCategories(parentId ? { parentId } : {}),
  });

export const newProductsQuery = (options: { departmentSlug?: string; limit?: number } = {}) =>
  queryOptions({
    queryKey: catalogKeys.newProducts(options.departmentSlug, options.limit),
    queryFn: () => repository.listNewProducts(options),
  });

export const featuredProductsQuery = (limit?: number) =>
  queryOptions({
    queryKey: catalogKeys.featured(limit),
    queryFn: () => repository.listFeaturedProducts(limit ? { limit } : {}),
  });

/**
 * Mais vendidos só existe com dados de venda reais (Mora Core).
 * Enquanto não existirem, a query devolve lista vazia e a UI esconde a seção.
 */
export const bestSellersQuery = (limit?: number) =>
  queryOptions({
    queryKey: catalogKeys.bestSellers(limit),
    queryFn: () => repository.listBestSellers(limit ? { limit } : {}),
  });
