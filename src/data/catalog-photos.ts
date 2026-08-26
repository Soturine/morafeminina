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
  shortMagenta: pick(202, "Short feminino magenta com amarração"),
  blusaTricoRosa: pick(205, "Blusa de tricô feminina em rosa claro"),
  regatasColoridas: pick(207, "Regatas femininas canelada em várias cores"),
  blusaBrancaLaise: pick(209, "Blusa feminina branca com detalhe em laise"),
  calcaPantalonaBranca: pick(190, "Calça pantalona feminina off-white"),
  jeansArara: pick(187, "Arara com calças jeans femininas"),
  shortCinza: pick(216, "Short feminino cinza de moletom"),
  camisetaPretaOnca: pick(203, "Camiseta preta feminina com estampa de onça"),
  vestidoAzulBabados: pick(129, "Vestido feminino azul com babados"),

  // Acessórios
  bonesOculos: pick(184, "Bonés e óculos de sol expostos na loja"),
  mochilasEstampadas: pick(185, "Mochilas escolares estampadas penduradas na loja"),
  bolsasParede: pick(186, "Bolsas femininas expostas na parede da loja"),
  bijuterias: pick(212, "Cartelas de bijuterias e acessórios na loja"),

  // Infantil e bebê
  camisetaLooneyRosa: pick(125, "Camiseta infantil rosa com estampa Looney Tunes"),
  vestidosInfantisEstampados: pick(148, "Arara com vestidos infantis estampados"),
  conjuntoSocialMenino: pick(134, "Conjunto social infantil masculino com colete"),
  bodiesBebeArara: pick(163, "Bodies e conjuntos de bebê embalados na arara"),
  camisetasInfantisEmbaladas: pick(249, "Camisetas infantis lilás embaladas na loja"),
  shortJeansInfantil: pick(223, "Shorts jeans infantis expostos na loja"),
  enxovalRosa: pick(217, "Enxoval de bebê em tons de rosa nas prateleiras"),
  kitsBebeAzul: pick(191, "Kits de enxoval e acessórios de bebê em azul"),
  higieneBebe: pick(200, "Acessórios de higiene e cuidado para bebê"),
  toucasInfantis: pick(237, "Toucas infantis de tricô com bichinhos"),
} satisfies Record<string, CatalogPhoto>;
