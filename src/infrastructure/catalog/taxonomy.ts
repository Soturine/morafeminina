/**
 * Taxonomia canônica da Mora (departamentos e categorias).
 *
 * Departamentos são previstos no domínio, mas só ficam visíveis no site quando
 * `active && visibleOnWebsite` E existir produto/conteúdo apropriado — a
 * verificação de conteúdo é feita pelo repositório, não aqui.
 */
import type { Category } from "@/domain/catalog/types";

export const DEPARTMENT_SLUGS = [
  "feminino",
  "juvenil",
  "infantil",
  "bebe",
  "enxoval",
  "acessorios",
  "higiene-e-cuidados",
] as const;

export type DepartmentSlug = (typeof DEPARTMENT_SLUGS)[number];

export const departments: Category[] = [
  {
    id: "dep-feminino",
    slug: "feminino",
    name: "Feminino",
    sortOrder: 1,
    active: true,
    visibleOnWebsite: true,
    description:
      "Vestidos, blusas, calças, saias e conjuntos femininos para o dia a dia e ocasiões especiais.",
  },
  {
    id: "dep-juvenil",
    slug: "juvenil",
    name: "Juvenil",
    sortOrder: 2,
    active: true,
    visibleOnWebsite: true,
    description: "Peças para o público teen, entre o infantil e o adulto.",
  },
  {
    id: "dep-infantil",
    slug: "infantil",
    name: "Infantil",
    sortOrder: 3,
    active: true,
    visibleOnWebsite: true,
    description: "Moda infantil para meninas e meninos: festa, escola, passeio e conforto.",
  },
  {
    id: "dep-bebe",
    slug: "bebe",
    name: "Bebê",
    sortOrder: 4,
    active: true,
    visibleOnWebsite: true,
    description: "Bodies, macacões, conjuntos e itens para os primeiros meses.",
  },
  {
    id: "dep-enxoval",
    slug: "enxoval",
    name: "Enxoval",
    sortOrder: 5,
    active: true,
    visibleOnWebsite: true,
    description: "Enxoval de bebê: mantas, toalhas, kits e peças de maternidade.",
  },
  {
    id: "dep-acessorios",
    slug: "acessorios",
    name: "Acessórios",
    sortOrder: 6,
    active: true,
    visibleOnWebsite: true,
    description: "Bolsas, bijuterias, óculos, bonés e complementos de look.",
  },
  {
    id: "dep-higiene-e-cuidados",
    slug: "higiene-e-cuidados",
    name: "Higiene & Cuidados",
    sortOrder: 7,
    active: true,
    visibleOnWebsite: true,
    description: "Itens de higiene e cuidados para bebês e crianças.",
  },
];

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function departmentBySlug(slug: string): Category | undefined {
  return departments.find((d) => d.slug === slug);
}

export function departmentById(id: string): Category | undefined {
  return departments.find((d) => d.id === id);
}

/**
 * Mapeia o par legado (segmento, categoria) para o departamento canônico.
 * Concentrado aqui para que nenhum componente precise de `if (segment === ...)`.
 */
const ACCESSORY_CATEGORIES = new Set(["Acessórios", "Bolsas", "Bijuterias"]);
const BABY_CATEGORIES = new Set(["Bebê", "Bodies", "Acessórios de bebê"]);
const LAYETTE_CATEGORIES = new Set(["Enxoval"]);
const HYGIENE_CATEGORIES = new Set(["Higiene", "Higiene e cuidados"]);

export function resolveDepartmentId(segment: "feminino" | "infantil", category: string): string {
  if (HYGIENE_CATEGORIES.has(category)) return "dep-higiene-e-cuidados";
  if (segment === "feminino") {
    return ACCESSORY_CATEGORIES.has(category) ? "dep-acessorios" : "dep-feminino";
  }
  if (LAYETTE_CATEGORIES.has(category)) return "dep-enxoval";
  if (BABY_CATEGORIES.has(category)) return "dep-bebe";
  return "dep-infantil";
}

export function categoryId(departmentId: string, categoryName: string): string {
  return `${departmentId}--${slugify(categoryName)}`;
}
