import { storePhotos } from "@/data/store-photos";

/**
 * Catálogo de vitrine da loja.
 *
 * As fotos são reais (galeria pública da loja). Preços, tamanhos e cores são
 * valores de referência cadastrados para demonstração da vitrine — a loja pode
 * ajustar cada item aqui, e a confirmação final acontece sempre pelo WhatsApp
 * (é o que o aviso `PRICE_DISCLAIMER` comunica na interface).
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
  /** Preço anterior — exibido riscado quando maior que `price`. */
  originalPrice?: number;
  /** Tamanhos disponíveis. Deixe vazio para não exibir. */
  sizes?: string[];
  /** Cores disponíveis (texto livre). */
  colors?: string[];
  /** Faixa etária — usado apenas no catálogo infantil. */
  ageRange?: string;
  /** Caminho da imagem. Deixe `undefined` para o card exibir o estado sem foto. */
  image?: string;
  imageAlt?: string;
  isNew?: boolean;
  isOffer?: boolean;
};

export const PRICE_DISCLAIMER =
  "Preços e tamanhos são de referência e podem variar conforme o estoque da loja. Confirme a disponibilidade pelo WhatsApp.";

export const products: Product[] = [
  {
    id: "vestido-midi-fluido",
    name: "Vestido midi fluido",
    segment: "feminino",
    category: "Vestidos",
    price: 189.9,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Off-white", "Terracota"],
    image: storePhotos.femininoVestidos.src,
    imageAlt: storePhotos.femininoVestidos.alt,
    isNew: true,
  },
  {
    id: "vestido-manequim-verao",
    name: "Vestido de verão estampado",
    segment: "feminino",
    category: "Vestidos",
    price: 159.9,
    originalPrice: 199.9,
    sizes: ["P", "M", "G"],
    colors: ["Estampado"],
    image: storePhotos.manequimLook.src,
    imageAlt: storePhotos.manequimLook.alt,
    isOffer: true,
  },
  {
    id: "calca-alfaiataria",
    name: "Calça de alfaiataria",
    segment: "feminino",
    category: "Calças",
    price: 149.9,
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Preto", "Bege", "Marrom"],
    image: storePhotos.femininoCalcas.src,
    imageAlt: storePhotos.femininoCalcas.alt,
  },
  {
    id: "blusa-dia-a-dia",
    name: "Blusa canelada básica",
    segment: "feminino",
    category: "Blusas",
    price: 79.9,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Areia", "Verde oliva"],
    image: storePhotos.femininoLook.src,
    imageAlt: storePhotos.femininoLook.alt,
    isNew: true,
  },
  {
    id: "look-vitrine-completo",
    name: "Look completo de vitrine",
    segment: "feminino",
    category: "Looks",
    price: 249.9,
    sizes: ["P", "M", "G"],
    image: storePhotos.vitrineManequins.src,
    imageAlt: storePhotos.vitrineManequins.alt,
  },
  {
    id: "conjunto-araras",
    name: "Conjunto de tricô",
    segment: "feminino",
    category: "Conjuntos",
    price: 219.9,
    originalPrice: 259.9,
    sizes: ["P", "M", "G"],
    colors: ["Areia", "Grafite"],
    image: storePhotos.interiorAraras.src,
    imageAlt: storePhotos.interiorAraras.alt,
    isOffer: true,
  },
  {
    id: "acessorios-femininos",
    name: "Acessórios e bijuterias",
    segment: "feminino",
    category: "Acessórios",
    price: 39.9,
    image: storePhotos.acessorios.src,
    imageAlt: storePhotos.acessorios.alt,
  },
  {
    id: "vestidos-infantis-de-festa",
    name: "Vestido infantil de festa em tule",
    segment: "infantil",
    category: "Vestidos",
    price: 179.9,
    sizes: ["2", "4", "6", "8"],
    ageRange: "2 a 8 anos",
    colors: ["Rosé", "Off-white"],
    image: storePhotos.infantilFesta.src,
    imageAlt: storePhotos.infantilFesta.alt,
    isNew: true,
  },
  {
    id: "vestidos-infantis-festa-2",
    name: "Vestido infantil de ocasião",
    segment: "infantil",
    category: "Vestidos",
    price: 149.9,
    originalPrice: 189.9,
    sizes: ["4", "6", "8", "10"],
    ageRange: "4 a 10 anos",
    image: storePhotos.infantilFesta2.src,
    imageAlt: storePhotos.infantilFesta2.alt,
    isOffer: true,
  },
  {
    id: "enxoval-e-bodies",
    name: "Body de algodão para bebê",
    segment: "infantil",
    category: "Bebê",
    price: 49.9,
    sizes: ["RN", "P", "M", "G"],
    ageRange: "0 a 12 meses",
    colors: ["Branco", "Bege"],
    image: storePhotos.infantilBodies.src,
    imageAlt: storePhotos.infantilBodies.alt,
  },
  {
    id: "enxoval-prateleiras",
    name: "Kit enxoval de maternidade",
    segment: "infantil",
    category: "Bebê",
    price: 129.9,
    ageRange: "0 a 12 meses",
    image: storePhotos.enxovalPrateleiras.src,
    imageAlt: storePhotos.enxovalPrateleiras.alt,
  },
  {
    id: "roupas-infantis",
    name: "Conjunto infantil do dia a dia",
    segment: "infantil",
    category: "Conjuntos",
    price: 89.9,
    sizes: ["2", "4", "6", "8", "10"],
    ageRange: "2 a 10 anos",
    image: storePhotos.interiorInfantil.src,
    imageAlt: storePhotos.interiorInfantil.alt,
    isNew: true,
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

export function getOffers(): Product[] {
  return products.filter((p) => p.isOffer);
}

export function getFeatured(): Product[] {
  return products.slice(0, 4);
}

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Parcelamento sugerido exibido abaixo do preço. */
export function installments(value: number, times = 3): string {
  return `ou ${times}x de ${formatPrice(value / times)} sem juros`;
}
