import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Star } from "lucide-react";
import { site } from "@/data/site";
import { getPlaceInfo } from "@/lib/places.functions";
import { Section, SectionHeading } from "@/components/Section";
import { ButtonAnchor } from "@/components/Button";

export function GooglePhotos() {
  const fetchPlace = useServerFn(getPlaceInfo);
  const { data } = useQuery({
    queryKey: ["google-place-photos"],
    queryFn: () => fetchPlace(),
    staleTime: 1000 * 60 * 60,
  });

  if (!data?.available) return null;

  const rating = data.rating ?? site.rating.value;
  const count = data.userRatingCount ?? site.rating.count;

  return (
    <Section tone="default" id="google-fotos">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Perfil no Google"
          title="Fotos reais da loja"
          description="Imagens publicadas no perfil da loja no Google Maps."
        />
        <div className="flex items-center gap-3">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
            {rating.toFixed(1).replace(".", ",")} · {count} avaliações
          </p>
          <ButtonAnchor
            href={data.mapsUri ?? site.links.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="md"
          >
            Ver no Google
          </ButtonAnchor>
        </div>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
        {data.photos.map((photo) => (
          <li key={photo.url} className="aspect-square overflow-hidden bg-secondary">
            <img
              src={photo.url}
              alt={`Foto da ${site.shortName} publicada no Google por ${photo.attribution}`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
