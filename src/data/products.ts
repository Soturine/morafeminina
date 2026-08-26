import { storePhotos } from "@/data/store-photos";
import { catalogPhotos } from "@/data/catalog-photos";

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
  /** Versão em alta resolução usada no zoom. */
  imageLarge?: string;
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

  // ---- Peças fotografadas na galeria pública da loja ----
  {
    id: "vestido-preto-essencial",
    name: "Vestido preto essencial",
    segment: "feminino",
    category: "Vestidos",
    price: 169.9,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto"],
    image: catalogPhotos.vestidosPretos.src,
    imageLarge: catalogPhotos.vestidosPretos.srcLarge,
    imageAlt: catalogPhotos.vestidosPretos.alt,
  },
  {
    id: "vestido-cores-vivas",
    name: "Vestido leve em cores vivas",
    segment: "feminino",
    category: "Vestidos",
    price: 139.9,
    sizes: ["P", "M", "G"],
    colors: ["Coral", "Turquesa", "Amarelo"],
    image: catalogPhotos.vestidosColoridos.src,
    imageLarge: catalogPhotos.vestidosColoridos.srcLarge,
    imageAlt: catalogPhotos.vestidosColoridos.alt,
    isNew: true,
  },
  {
    id: "conjunto-blusa-short",
    name: "Conjunto blusa e short",
    segment: "feminino",
    category: "Conjuntos",
    price: 119.9,
    originalPrice: 149.9,
    sizes: ["P", "M", "G"],
    colors: ["Vermelho"],
    image: catalogPhotos.conjuntoVermelho.src,
    imageLarge: catalogPhotos.conjuntoVermelho.srcLarge,
    imageAlt: catalogPhotos.conjuntoVermelho.alt,
    isOffer: true,
  },
  {
    id: "moletom-feminino-cinza",
    name: "Moletom feminino cinza mescla",
    segment: "feminino",
    category: "Moletons",
    price: 99.9,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Cinza"],
    image: catalogPhotos.moletomCinza.src,
    imageLarge: catalogPhotos.moletomCinza.srcLarge,
    imageAlt: catalogPhotos.moletomCinza.alt,
  },
  {
    id: "jaqueta-moletom-rosa",
    name: "Jaqueta de moletom com zíper",
    segment: "feminino",
    category: "Moletons",
    price: 129.9,
    sizes: ["P", "M", "G"],
    colors: ["Rosé"],
    image: catalogPhotos.jaquetaRosa.src,
    imageLarge: catalogPhotos.jaquetaRosa.srcLarge,
    imageAlt: catalogPhotos.jaquetaRosa.alt,
    isNew: true,
  },
  {
    id: "saia-midi-lisa",
    name: "Saia midi lisa",
    segment: "feminino",
    category: "Saias",
    price: 109.9,
    sizes: ["P", "M", "G"],
    colors: ["Marinho", "Preto", "Areia"],
    image: catalogPhotos.saiasArara.src,
    imageLarge: catalogPhotos.saiasArara.srcLarge,
    imageAlt: catalogPhotos.saiasArara.alt,
  },
  {
    id: "jeans-feminino",
    name: "Calça e short jeans",
    segment: "feminino",
    category: "Jeans",
    price: 159.9,
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Azul escuro", "Azul claro"],
    image: catalogPhotos.jeansFeminino.src,
    imageLarge: catalogPhotos.jeansFeminino.srcLarge,
    imageAlt: catalogPhotos.jeansFeminino.alt,
  },
  {
    id: "blusas-coloridas",
    name: "Blusa de viscose colorida",
    segment: "feminino",
    category: "Blusas",
    price: 69.9,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Verde", "Vinho", "Azul"],
    image: catalogPhotos.blusasColoridas.src,
    imageLarge: catalogPhotos.blusasColoridas.srcLarge,
    imageAlt: catalogPhotos.blusasColoridas.alt,
  },
  {
    id: "tenis-plataforma",
    name: "Tênis plataforma rosé",
    segment: "feminino",
    category: "Calçados",
    price: 149.9,
    sizes: ["34", "35", "36", "37", "38"],
    colors: ["Rosé"],
    image: catalogPhotos.tenisPlataforma.src,
    imageLarge: catalogPhotos.tenisPlataforma.srcLarge,
    imageAlt: catalogPhotos.tenisPlataforma.alt,
    isNew: true,
  },
  {
    id: "rasteirinhas-femininas",
    name: "Rasteirinhas e sapatilhas",
    segment: "feminino",
    category: "Calçados",
    price: 89.9,
    sizes: ["34", "35", "36", "37", "38", "39"],
    image: catalogPhotos.calcadosFemininos.src,
    imageLarge: catalogPhotos.calcadosFemininos.srcLarge,
    imageAlt: catalogPhotos.calcadosFemininos.alt,
  },
  {
    id: "toucas-trico",
    name: "Touca de tricô",
    segment: "feminino",
    category: "Acessórios",
    price: 34.9,
    colors: ["Preto", "Off-white"],
    image: catalogPhotos.toucasTrico.src,
    imageLarge: catalogPhotos.toucasTrico.srcLarge,
    imageAlt: catalogPhotos.toucasTrico.alt,
  },

  {
    id: "vestido-infantil-tule-rosa",
    name: "Vestido infantil de tule rosa",
    segment: "infantil",
    category: "Vestidos",
    price: 169.9,
    sizes: ["2", "4", "6", "8"],
    ageRange: "2 a 8 anos",
    colors: ["Rosa"],
    image: catalogPhotos.vestidoInfantilRosa.src,
    imageLarge: catalogPhotos.vestidoInfantilRosa.srcLarge,
    imageAlt: catalogPhotos.vestidoInfantilRosa.alt,
    isNew: true,
  },
  {
    id: "vestidos-festa-natal",
    name: "Vestido infantil de festa",
    segment: "infantil",
    category: "Vestidos",
    price: 159.9,
    originalPrice: 199.9,
    sizes: ["1", "2", "3", "4"],
    ageRange: "1 a 4 anos",
    colors: ["Vermelho", "Off-white"],
    image: catalogPhotos.vestidosFestaArara.src,
    imageLarge: catalogPhotos.vestidosFestaArara.srcLarge,
    imageAlt: catalogPhotos.vestidosFestaArara.alt,
    isOffer: true,
  },
  {
    id: "conjunto-jeans-bebe",
    name: "Conjunto jeans para bebê",
    segment: "infantil",
    category: "Bebê",
    price: 99.9,
    sizes: ["RN", "P", "M", "G"],
    ageRange: "0 a 18 meses",
    image: catalogPhotos.conjuntoJeansBebe.src,
    imageLarge: catalogPhotos.conjuntoJeansBebe.srcLarge,
    imageAlt: catalogPhotos.conjuntoJeansBebe.alt,
  },
  {
    id: "jardineira-vermelha",
    name: "Conjunto jardineira em plush",
    segment: "infantil",
    category: "Bebê",
    price: 89.9,
    sizes: ["RN", "P", "M"],
    ageRange: "0 a 12 meses",
    colors: ["Vermelho"],
    image: catalogPhotos.jardineiraVermelha.src,
    imageLarge: catalogPhotos.jardineiraVermelha.srcLarge,
    imageAlt: catalogPhotos.jardineiraVermelha.alt,
  },
  {
    id: "conjunto-pelucia-rosa",
    name: "Conjunto felpudo bege e rosa",
    segment: "infantil",
    category: "Conjuntos",
    price: 109.9,
    sizes: ["1", "2", "3"],
    ageRange: "1 a 3 anos",
    image: catalogPhotos.conjuntoPeluciaRosa.src,
    imageLarge: catalogPhotos.conjuntoPeluciaRosa.srcLarge,
    imageAlt: catalogPhotos.conjuntoPeluciaRosa.alt,
    isNew: true,
  },
  {
    id: "moletom-infantil-laranja",
    name: "Conjunto de moletom infantil",
    segment: "infantil",
    category: "Moletons",
    price: 119.9,
    sizes: ["4", "6", "8", "10"],
    ageRange: "4 a 10 anos",
    colors: ["Laranja", "Marinho"],
    image: catalogPhotos.moletomLaranja.src,
    imageLarge: catalogPhotos.moletomLaranja.srcLarge,
    imageAlt: catalogPhotos.moletomLaranja.alt,
  },
  {
    id: "moletom-bebe-azul",
    name: "Conjunto moletom com capuz bebê",
    segment: "infantil",
    category: "Moletons",
    price: 94.9,
    sizes: ["P", "M", "G"],
    ageRange: "0 a 18 meses",
    colors: ["Azul", "Cinza"],
    image: catalogPhotos.moletomBebeAzul.src,
    imageLarge: catalogPhotos.moletomBebeAzul.srcLarge,
    imageAlt: catalogPhotos.moletomBebeAzul.alt,
  },
  {
    id: "jaqueta-college-jeans",
    name: "Jaqueta college jeans infantil",
    segment: "infantil",
    category: "Moletons",
    price: 139.9,
    sizes: ["6", "8", "10", "12"],
    ageRange: "6 a 12 anos",
    image: catalogPhotos.jaquetaCollege.src,
    imageLarge: catalogPhotos.jaquetaCollege.srcLarge,
    imageAlt: catalogPhotos.jaquetaCollege.alt,
  },
  {
    id: "pijama-infantil-estampado",
    name: "Pijama infantil de algodão",
    segment: "infantil",
    category: "Pijamas",
    price: 69.9,
    sizes: ["2", "4", "6", "8"],
    ageRange: "2 a 8 anos",
    image: catalogPhotos.pijamaEstampado.src,
    imageLarge: catalogPhotos.pijamaEstampado.srcLarge,
    imageAlt: catalogPhotos.pijamaEstampado.alt,
  },
  {
    id: "pijama-rosa",
    name: "Conjunto de pijama rosa",
    segment: "infantil",
    category: "Pijamas",
    price: 64.9,
    sizes: ["1", "2", "3", "4"],
    ageRange: "1 a 4 anos",
    colors: ["Rosa"],
    image: catalogPhotos.pijamaRosa.src,
    imageLarge: catalogPhotos.pijamaRosa.srcLarge,
    imageAlt: catalogPhotos.pijamaRosa.alt,
  },
  {
    id: "manta-nuvem",
    name: "Manta de bebê estampa nuvem",
    segment: "infantil",
    category: "Bebê",
    price: 79.9,
    ageRange: "0 a 12 meses",
    colors: ["Cinza"],
    image: catalogPhotos.mantaNuvem.src,
    imageLarge: catalogPhotos.mantaNuvem.srcLarge,
    imageAlt: catalogPhotos.mantaNuvem.alt,
  },
  {
    id: "sandalia-dourada-festa",
    name: "Sandália infantil dourada",
    segment: "infantil",
    category: "Calçados",
    price: 99.9,
    sizes: ["25", "26", "27", "28", "29"],
    ageRange: "2 a 8 anos",
    image: catalogPhotos.sandaliaDourada.src,
    imageLarge: catalogPhotos.sandaliaDourada.srcLarge,
    imageAlt: catalogPhotos.sandaliaDourada.alt,
    isNew: true,
  },
  {
    id: "botinha-rosa",
    name: "Botinha infantil rosa",
    segment: "infantil",
    category: "Calçados",
    price: 109.9,
    sizes: ["20", "21", "22", "23", "24"],
    ageRange: "1 a 3 anos",
    image: catalogPhotos.botinhaRosa.src,
    imageLarge: catalogPhotos.botinhaRosa.srcLarge,
    imageAlt: catalogPhotos.botinhaRosa.alt,
  },
  {
    id: "babuche-infantil",
    name: "Babuche infantil",
    segment: "infantil",
    category: "Calçados",
    price: 59.9,
    sizes: ["25", "26", "27", "28"],
    ageRange: "3 a 8 anos",
    colors: ["Azul-marinho"],
    image: catalogPhotos.babucheAzul.src,
    imageLarge: catalogPhotos.babucheAzul.srcLarge,
    imageAlt: catalogPhotos.babucheAzul.alt,
  },
  {
    id: "papete-infantil",
    name: "Papete infantil com velcro",
    segment: "infantil",
    category: "Calçados",
    price: 89.9,
    originalPrice: 109.9,
    sizes: ["21", "22", "23", "24", "25"],
    ageRange: "1 a 4 anos",
    image: catalogPhotos.papeteInfantil.src,
    imageLarge: catalogPhotos.papeteInfantil.srcLarge,
    imageAlt: catalogPhotos.papeteInfantil.alt,
    isOffer: true,
  },
  {
    id: "sandalias-infantis",
    name: "Sandálias infantis",
    segment: "infantil",
    category: "Calçados",
    price: 79.9,
    sizes: ["27", "28", "29", "30", "31"],
    ageRange: "4 a 10 anos",
    image: catalogPhotos.sandaliasInfantis.src,
    imageLarge: catalogPhotos.sandaliasInfantis.srcLarge,
    imageAlt: catalogPhotos.sandaliasInfantis.alt,
  },
  {
    id: "bolsinhas-coelho",
    name: "Bolsinha infantil de coelho",
    segment: "infantil",
    category: "Acessórios",
    price: 44.9,
    colors: ["Vermelho", "Off-white"],
    ageRange: "3 a 10 anos",
    image: catalogPhotos.bolsinhasCoelho.src,
    imageLarge: catalogPhotos.bolsinhasCoelho.srcLarge,
    imageAlt: catalogPhotos.bolsinhasCoelho.alt,
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
