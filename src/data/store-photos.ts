/**
 * Fotografias reais da loja Mora Moda.
 *
 * Origem: galeria pública da ficha da loja no Google Maps. As imagens abaixo
 * foram selecionadas, otimizadas e hospedadas como assets próprios do projeto
 * (CDN), portanto não dependem de URLs temporárias do Google.
 *
 * Para trocar a origem no futuro (storage, Places API, upload da loja), basta
 * alterar este módulo — os componentes de interface continuam iguais.
 */
import interiorAraras from "@/assets/loja/interior-araras.jpg.asset.json";
import interiorLoja from "@/assets/loja/interior-loja.jpg.asset.json";
import interiorInfantil from "@/assets/loja/interior-infantil.jpg.asset.json";
import fachada from "@/assets/loja/fachada.jpg.asset.json";
import fachadaLateral from "@/assets/loja/fachada-lateral.jpg.asset.json";
import femininoVestidos from "@/assets/loja/feminino-vestidos.jpg.asset.json";
import femininoCalcas from "@/assets/loja/feminino-calcas.jpg.asset.json";
import femininoLook from "@/assets/loja/feminino-look.jpg.asset.json";
import vitrineManequins from "@/assets/loja/vitrine-manequins.jpg.asset.json";
import manequimLook from "@/assets/loja/manequim-look.jpg.asset.json";
import infantilBodies from "@/assets/loja/infantil-bodies.jpg.asset.json";
import infantilFesta from "@/assets/loja/infantil-festa.jpg.asset.json";
import infantilFesta2 from "@/assets/loja/infantil-festa-2.jpg.asset.json";
import enxovalPrateleiras from "@/assets/loja/enxoval-prateleiras.jpg.asset.json";
import acessorios from "@/assets/loja/acessorios.jpg.asset.json";

export type StorePhoto = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const p = (
  id: string,
  asset: { url: string },
  alt: string,
  width: number,
  height: number,
): StorePhoto => ({ id, src: asset.url, alt, width, height });

export const storePhotos = {
  interiorAraras: p(
    "interior-araras",
    interiorAraras,
    "Corredor da loja Mora Moda com araras de roupas femininas",
    750,
    1000,
  ),
  interiorLoja: p(
    "interior-loja",
    interiorLoja,
    "Vista interna da loja Mora Moda com prateleiras e araras",
    1000,
    750,
  ),
  interiorInfantil: p(
    "interior-infantil",
    interiorInfantil,
    "Área infantil da loja com roupas e acessórios para crianças",
    1000,
    750,
  ),
  fachada: p(
    "fachada",
    fachada,
    "Fachada da loja Mora Moda na R. Santo Ivo, em Jacareí",
    562,
    1000,
  ),
  fachadaLateral: p(
    "fachada-lateral",
    fachadaLateral,
    "Vista lateral da fachada da loja Mora Moda",
    562,
    1000,
  ),
  femininoVestidos: p(
    "feminino-vestidos",
    femininoVestidos,
    "Arara com vestidos e peças femininas leves",
    562,
    1000,
  ),
  femininoCalcas: p(
    "feminino-calcas",
    femininoCalcas,
    "Arara com calças femininas em cores variadas",
    562,
    1000,
  ),
  femininoLook: p(
    "feminino-look",
    femininoLook,
    "Peças femininas expostas em cabides na loja",
    562,
    1000,
  ),
  vitrineManequins: p(
    "vitrine-manequins",
    vitrineManequins,
    "Manequins com looks femininos na entrada da loja",
    562,
    1000,
  ),
  manequimLook: p(
    "manequim-look",
    manequimLook,
    "Manequim com look feminino de verão na loja",
    750,
    1000,
  ),
  infantilBodies: p(
    "infantil-bodies",
    infantilBodies,
    "Arara com bodies e peças de enxoval infantil",
    750,
    1000,
  ),
  infantilFesta: p(
    "infantil-festa",
    infantilFesta,
    "Vestidos infantis de festa em tule expostos na loja",
    562,
    1000,
  ),
  infantilFesta2: p(
    "infantil-festa-2",
    infantilFesta2,
    "Vestidos infantis de festa embalados na loja",
    750,
    1000,
  ),
  enxovalPrateleiras: p(
    "enxoval-prateleiras",
    enxovalPrateleiras,
    "Prateleiras com enxoval e peças infantis dobradas",
    1000,
    750,
  ),
  acessorios: p(
    "acessorios",
    acessorios,
    "Expositor com acessórios e itens infantis na loja",
    750,
    1000,
  ),
} satisfies Record<string, StorePhoto>;

/** Seleção usada na galeria e no lightbox (fotos próprias, sempre disponíveis). */
export const storePhotoList: StorePhoto[] = Object.values(storePhotos);
