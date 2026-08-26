/**
 * Camada fina de analytics.
 *
 * Nenhum tracker está instalado nesta versão e nenhum dado pessoal é coletado.
 * Quando Google Analytics, Search Console ou Meta Pixel forem adicionados,
 * basta implementar o envio dentro de `track()` — os pontos de chamada já
 * existem na interface.
 */

export type AnalyticsEvent =
  | "whatsapp_click"
  | "directions_click"
  | "product_click"
  | "product_interest_click"
  | "facebook_click"
  | "catalog_view";

export function track(event: AnalyticsEvent, payload?: Record<string, string>): void {
  if (import.meta.env.DEV) {
    console.debug("[analytics]", event, payload ?? {});
  }
}
