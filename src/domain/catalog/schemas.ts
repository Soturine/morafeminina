/**
 * Schemas Zod do contrato de catálogo.
 *
 * Uso principal: validar payload externo (futura API do Mora Core) na fronteira.
 * O repositório estático interno não revalida a cada leitura — a validação
 * pesada fica reservada para dados não confiáveis.
 */
import { z } from "zod";

export const audienceSchema = z.enum(["feminino", "juvenil", "infantil", "bebe", "unissex"]);
export const dataStatusSchema = z.enum(["verified", "demonstration"]);
export const publishStatusSchema = z.enum(["draft", "published", "archived"]);
export const availabilitySchema = z.enum(["in_stock", "low_stock", "out_of_stock", "unknown"]);

export const productImageSchema = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  srcLarge: z.string().min(1).optional(),
  alt: z.string(),
  position: z.number().int().nonnegative(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  role: z.enum(["primary", "gallery", "detail", "variant"]).optional(),
});

export const pricingSchema = z.object({
  currentPriceCents: z.number().int().nonnegative().optional(),
  originalPriceCents: z.number().int().nonnegative().optional(),
  currency: z.literal("BRL"),
  verified: z.boolean(),
});

export const productVariantSchema = z.object({
  id: z.string().min(1),
  sku: z.string().min(1).optional(),
  barcode: z.string().min(1).optional(),
  active: z.boolean(),
  attributes: z.record(z.string().optional()),
  pricing: pricingSchema.optional(),
  availability: availabilitySchema,
  imageIds: z.array(z.string()).optional(),
});

export const categorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  parentId: z.string().min(1).optional(),
  sortOrder: z.number().int(),
  active: z.boolean(),
  visibleOnWebsite: z.boolean(),
  description: z.string().optional(),
  image: z.object({ src: z.string(), alt: z.string() }).optional(),
  seo: z.object({ title: z.string().optional(), description: z.string().optional() }).optional(),
});

export const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  departmentId: z.string().optional(),
  categoryId: z.string().optional(),
  subcategoryId: z.string().optional(),
  audience: audienceSchema.optional(),
  ageRange: z
    .object({
      label: z.string(),
      minMonths: z.number().int().nonnegative().optional(),
      maxMonths: z.number().int().nonnegative().optional(),
    })
    .optional(),
  images: z.array(productImageSchema),
  variants: z.array(productVariantSchema),
  pricing: pricingSchema.optional(),
  dataStatus: dataStatusSchema,
  publishStatus: publishStatusSchema,
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional(),
  firstAvailableAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const productListSchema = z.array(productSchema);
export const categoryListSchema = z.array(categorySchema);
