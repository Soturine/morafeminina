import { storePhotos } from "@/data/store-photos";

/**
 * Peças em destaque na loja.
 *
 * Todas as fotos são reais (galeria pública da loja). Não há preços, tamanhos
 * ou estoque cadastrados porque essas informações não foram fornecidas pela
 * loja — os campos existem no tipo e a interface se adapta quando forem
 * preenchidos. Nunca preencha com valores estimados.
 *
 * Esta é a única fonte de dados de produtos do site. Para migrar futuramente
 * para um backend basta substituir `getProducts()` por uma chamada remota que
 * devolva o mesmo tipo `Product`.
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
    id: "vestidos-femininos",
    name: "Vestidos femininos",
    segment: "feminino",
    category: "Vestidos",
    image: storePhotos.femininoVestidos.src,
    imageAlt: storePhotos.femininoVestidos.alt,
  },
  {
    id: "calcas-femininas",
    name: "Calças femininas",
    segment: "feminino",
    category: "Calças",
    image: storePhotos.femininoCalcas.src,
    imageAlt: storePhotos.femininoCalcas.alt,
  },
  {
    id: "blusas-e-looks",
    name: "Blusas e looks do dia a dia",
    segment: "feminino",
    category: "Blusas",
    image: storePhotos.femininoLook.src,
    imageAlt: storePhotos.femininoLook.alt,
  },
  {
    id: "looks-de-vitrine",
    name: "Looks montados na vitrine",
    segment: "feminino",
    category: "Looks",
    image: storePhotos.manequimLook.src,
    imageAlt: storePhotos.manequimLook.alt,
  },
  {
    id: "vestidos-infantis-de-festa",
    name: "Vestidos infantis de festa",
    segment: "infantil",
    category: "Vestidos",
    image: storePhotos.infantilFesta.src,
    imageAlt: storePhotos.infantilFesta.alt,
  },
  {
    id: "vestidos-infantis-festa-2",
    name: "Vestidos infantis para ocasiões especiais",
    segment: "infantil",
    category: "Vestidos",
    image: storePhotos.infantilFesta2.src,
    imageAlt: storePhotos.infantilFesta2.alt,
  },
  {
    id: "enxoval-e-bodies",
    name: "Bodies e enxoval de bebê",
    segment: "infantil",
    category: "Bebê",
    image: storePhotos.infantilBodies.src,
    imageAlt: storePhotos.infantilBodies.alt,
  },
  {
    id: "roupas-infantis",
    name: "Roupas e itens infantis",
    segment: "infantil",
    category: "Infantil",
    image: storePhotos.enxovalPrateleiras.src,
    imageAlt: storePhotos.enxovalPrateleiras.alt,
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
