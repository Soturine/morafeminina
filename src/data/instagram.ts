/**
 * Publicações do Instagram exibidas no site.
 *
 * Cole aqui os links das publicações que você quer mostrar
 * (abra o post no Instagram e copie a URL da barra de endereços).
 * Ex.: "https://www.instagram.com/p/CxYzAbCdEfG/"
 *
 * Com links preenchidos, o site mostra as fotos reais das publicações
 * (feed oficial incorporado do Instagram). Enquanto a lista estiver vazia,
 * exibimos uma galeria da loja com link para o perfil.
 */
export const instagramPosts: string[] = [];

/** Extrai o código da publicação a partir da URL (/p/, /reel/ ou /tv/). */
export function getInstagramShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  return match?.[1] ?? null;
}

export function getInstagramEmbeds(): { url: string; embedUrl: string }[] {
  return instagramPosts
    .map((url) => {
      const shortcode = getInstagramShortcode(url);
      return shortcode
        ? { url, embedUrl: `https://www.instagram.com/p/${shortcode}/embed/captioned/` }
        : null;
    })
    .filter((item): item is { url: string; embedUrl: string } => item !== null);
}
