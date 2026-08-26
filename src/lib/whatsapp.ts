import { site } from "@/data/site";

/** Monta uma URL oficial wa.me com mensagem pré-preenchida. */
export function whatsappUrl(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.phone.digits}?text=${encodeURIComponent(message)}`;
}

export function productMessage(productName: string): string {
  return `Olá! Vi a peça ${productName} no site da Mora Moda e gostaria de saber mais sobre tamanhos, cores e disponibilidade.`;
}
