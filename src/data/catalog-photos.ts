/**
 * Fotos reais da galeria pública da loja usadas no catálogo de vitrine.
 *
 * Cada item aponta para uma foto de `googleMapsPhotos` (coleta enviada pela
 * loja) e recebe uma descrição escrita a partir do que aparece na imagem.
 * Nenhuma URL é inventada: a origem continua sendo a galeria pública.
 */
import { googleMapsPhotos, googlePhotoUrl, type GooglePhoto } from "@/data/google-maps-photos";

export type CatalogPhoto = { src: string; srcLarge: string; alt: string };

function pick(index: number, alt: string): CatalogPhoto {
  const photo = googleMapsPhotos[index] as GooglePhoto;
  return {
    src: googlePhotoUrl(photo, 800, 1000),
    srcLarge: googlePhotoUrl(photo, 1600, 2000),
    alt,
  };
}

export const catalogPhotos = {
  // Infantil
  conjuntoJeansBebe: pick(2, "Conjunto jeans para bebê com camiseta e macacão"),
  jardineiraVermelha: pick(8, "Conjunto infantil vermelho com jardineira e blusa de urso"),
  conjuntoPeluciaRosa: pick(9, "Conjunto infantil felpudo em bege e rosa"),
  moletomLaranja: pick(15, "Conjunto de moletom infantil laranja e azul-marinho"),
  moletomBebeAzul: pick(34, "Conjunto de moletom com capuz para bebê em azul e cinza"),
  pijamaEstampado: pick(39, "Pijama infantil de algodão com estampa colorida"),
  jaquetaCollege: pick(44, "Jaqueta college jeans infantil com capuz"),
  pijamaRosa: pick(45, "Conjunto de pijama infantil rosa estampado"),
  mantaNuvem: pick(50, "Manta de bebê cinza com estampa de nuvem"),
  vestidoInfantilRosa: pick(66, "Vestidos infantis de festa em tule rosa na arara"),
  vestidosFestaArara: pick(120, "Vestidos infantis de festa em vermelho e off-white"),
  bolsinhasCoelho: pick(18, "Bolsinhas infantis de coelho em vermelho e off-white"),
  sandaliaDourada: pick(20, "Sandália infantil dourada de festa com brilho"),
  babucheAzul: pick(27, "Babuche infantil azul-marinho"),
  papeteInfantil: pick(29, "Papete infantil azul com fechamento em velcro"),
  botinhaRosa: pick(33, "Botinha infantil rosa com detalhe de coração"),
  sandaliasInfantis: pick(48, "Sandálias infantis masculinas expostas na loja"),

  // Feminino
  vestidosPretos: pick(49, "Arara com vestidos femininos pretos e estampados"),
  conjuntoVermelho: pick(64, "Conjunto feminino com blusa de corações e short vermelho"),
  moletomCinza: pick(71, "Blusa de moletom feminina cinza mescla"),
  calcadosFemininos: pick(79, "Sapatilhas e rasteirinhas femininas expostas na loja"),
  saiasArara: pick(90, "Arara com saias e peças femininas em cores lisas"),
  jeansFeminino: pick(96, "Short jeans e calça jeans feminina expostos na loja"),
  vestidosColoridos: pick(102, "Arara com vestidos femininos em cores vivas"),
  blusasColoridas: pick(105, "Arara com blusas femininas em várias cores"),
  tenisPlataforma: pick(53, "Tênis feminino rosa com solado plataforma"),
  jaquetaRosa: pick(57, "Jaqueta de moletom feminina rosa com zíper"),
  toucasTrico: pick(35, "Toucas de tricô em preto e off-white"),
} satisfies Record<string, CatalogPhoto>;
