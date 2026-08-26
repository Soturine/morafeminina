import produto1 from "@/assets/produto-1.jpg";
import produto2 from "@/assets/produto-2.jpg";
import produto3 from "@/assets/produto-3.jpg";
import produto4 from "@/assets/produto-4.jpg";
import produto5 from "@/assets/produto-5.jpg";
import produto6 from "@/assets/produto-6.jpg";

/**
 * Catálogo demonstrativo.
 *
 * Esta é a única fonte de dados de produtos do site. Para migrar futuramente
 * para um backend (Supabase ou outro), basta substituir `getProducts()` por
 * uma chamada remota que devolva o mesmo tipo `Product` — a interface não muda.
 */

export type Segment = "feminino" | "infantil";

export type Product = {
  id: string;
  name: string;
  segment: Segment;
  /** Categoria dentro do segmento (ex.: "Vestidos"). */
  category: string;
  /** Preço em reais. Deixe `undefined` para não exibir preço. */
  price?: number;
  /** Tamanhos disponíveis. Deixe vazio para não exibir. */
  sizes?: string[];
  /** Faixa etária — usado apenas no catálogo infantil. */
  ageRange?: string;
  /** Caminho da imagem. Deixe `undefined` para o card exibir o estado sem foto. */
  image?: string;
  imageAlt?: string;
  isNew?: boolean;
  isOffer?: boolean;
};

export const products: Product[] = [
  {
    id: "vestido-midi-transpassado",
    name: "Vestido midi transpassado",
    segment: "feminino",
    category: "Vestidos",
    price: 159.9,
    sizes: ["P", "M", "G"],
    image: produto1,
    imageAlt: "Vestido midi transpassado em tom cru",
    isNew: true,
  },
  {
    id: "conjunto-tricot-canelado",
    name: "Conjunto tricot canelado",
    segment: "feminino",
    category: "Conjuntos",
    price: 189.9,
    sizes: ["P", "M", "G", "GG"],
    image: produto3,
    imageAlt: "Conjunto de tricot canelado em tom areia",
  },
  {
    id: "calca-pantalona-alfaiataria",
    name: "Calça pantalona de alfaiataria",
    segment: "feminino",
    category: "Calças",
    price: 129.9,
    sizes: ["36", "38", "40", "42"],
    image: produto4,
    imageAlt: "Calça pantalona de alfaiataria em tom caramelo claro",
    isOffer: true,
  },
  {
    id: "camisa-infantil-algodao",
    name: "Camisa infantil em algodão",
    segment: "infantil",
    category: "Camisas",
    price: 79.9,
    sizes: ["2", "4", "6"],
    ageRange: "2 a 6 anos",
    image: produto2,
    imageAlt: "Camisa infantil de algodão em tom terracota",
  },
  {
    id: "vestido-infantil-manga-bufante",
    name: "Vestido infantil manga bufante",
    segment: "infantil",
    category: "Vestidos",
    price: 89.9,
    sizes: ["1", "2", "3"],
    ageRange: "1 a 3 anos",
    image: produto5,
    imageAlt: "Vestido infantil de manga bufante em tom baunilha",
    isNew: true,
  },
  {
    id: "conjunto-infantil-moletom",
    name: "Conjunto infantil de moletom",
    segment: "infantil",
    category: "Conjuntos",
    price: 99.9,
    sizes: ["4", "6", "8"],
    ageRange: "4 a 8 anos",
    image: produto6,
    imageAlt: "Conjunto infantil de moletom terracota com calça off-white",
    isOffer: true,
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getBySegment(segment: Segment): Product[] {
  return products.filter((p) => p.segment === segment);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getFeatured(): Product[] {
  return products.slice(0, 4);
}

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
