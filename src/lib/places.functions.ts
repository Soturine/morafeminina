import { createServerFn } from "@tanstack/react-start";

export type PlacePhoto = { url: string; attribution: string };
export type PlaceInfo = {
  available: boolean;
  photos: PlacePhoto[];
  rating: number | null;
  userRatingCount: number | null;
  mapsUri: string | null;
};

const PLACE_ID = "ChIJF_0etsLLzZQRYaZzhmEpWG0";

/**
 * Fotos e avaliações reais do perfil do Google.
 * Requer o segredo GOOGLE_MAPS_API_KEY com a Places API (New) habilitada.
 * Sem a chave, retorna available:false e o site mostra o conteúdo próprio.
 */
export const getPlaceInfo = createServerFn({ method: "GET" }).handler(
  async (): Promise<PlaceInfo> => {
    const empty: PlaceInfo = {
      available: false,
      photos: [],
      rating: null,
      userRatingCount: null,
      mapsUri: null,
    };

    const apiKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!apiKey) return empty;

    try {
      const response = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "photos,rating,userRatingCount,googleMapsUri",
        },
      });

      if (!response.ok) return empty;

      const data = (await response.json()) as {
        photos?: { name: string; authorAttributions?: { displayName?: string }[] }[];
        rating?: number;
        userRatingCount?: number;
        googleMapsUri?: string;
      };

      const photos: PlacePhoto[] = (data.photos ?? []).slice(0, 6).map((photo) => ({
        url: `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=800&maxWidthPx=800&key=${apiKey}`,
        attribution: photo.authorAttributions?.[0]?.displayName ?? "Google",
      }));

      return {
        available: photos.length > 0,
        photos,
        rating: data.rating ?? null,
        userRatingCount: data.userRatingCount ?? null,
        mapsUri: data.googleMapsUri ?? null,
      };
    } catch {
      return empty;
    }
  },
);
