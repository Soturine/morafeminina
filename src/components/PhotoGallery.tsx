import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { storePhotoList } from "@/data/store-photos";
import { googleMapsPhotos, googlePhotoUrl } from "@/data/google-maps-photos";
import { SmartImage } from "@/components/SmartImage";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { Button, ButtonAnchor } from "@/components/Button";
import { Section, SectionHeading } from "@/components/Section";

type GalleryTag = "fachada" | "interior" | "feminino" | "infantil" | "bebe" | "acessorios";

type GalleryPhoto = { id: string; thumb: string; full: string; alt: string; tags: GalleryTag[] };

const TAG_LABELS: { id: GalleryTag; label: string }[] = [
  { id: "fachada", label: "Fachada" },
  { id: "interior", label: "Interior da loja" },
  { id: "feminino", label: "Moda feminina" },
  { id: "infantil", label: "Moda infantil" },
  { id: "bebe", label: "Bebê e enxoval" },
  { id: "acessorios", label: "Acessórios" },
];

/** Curadoria manual de índices da galeria pública por tema. */
const GOOGLE_TAGS: Record<GalleryTag, number[]> = {
  fachada: [140, 178, 179, 194],
  interior: [110, 119, 123, 126, 127, 135, 138, 160, 161, 168, 196, 199, 206, 210, 211, 214, 219, 220, 244, 250],
  feminino: [49, 53, 57, 64, 71, 79, 90, 96, 102, 105, 129, 131, 132, 143, 146, 147, 150, 151, 157, 158, 173, 187, 190, 197, 202, 203, 205, 207, 209, 216, 235],
  infantil: [8, 9, 15, 18, 20, 27, 29, 33, 39, 44, 45, 48, 66, 120, 121, 125, 134, 148, 172, 175, 223, 224, 237, 249],
  bebe: [2, 34, 50, 122, 128, 136, 137, 163, 165, 182, 191, 200, 217, 218, 227, 231, 246],
  acessorios: [35, 184, 185, 186, 212, 215, 221, 228, 234, 241, 245],
};

const OWN_TAGS: Record<string, GalleryTag[]> = {
  fachada: ["fachada"],
  "fachada-lateral": ["fachada"],
  "interior-araras": ["interior", "feminino"],
  "interior-loja": ["interior"],
  "interior-infantil": ["interior", "infantil"],
  "feminino-vestidos": ["feminino"],
  "feminino-calcas": ["feminino"],
  "feminino-look": ["feminino"],
  "vitrine-manequins": ["feminino", "interior"],
  "manequim-look": ["feminino"],
  "infantil-bodies": ["infantil", "bebe"],
  "infantil-festa": ["infantil"],
  "infantil-festa-2": ["infantil"],
  "enxoval-prateleiras": ["bebe"],
  acessorios: ["acessorios"],
};

/** Fotos próprias primeiro, depois a galeria pública do Google (camada trocável). */
function buildPhotos(): GalleryPhoto[] {
  const own: GalleryPhoto[] = storePhotoList.map((photo) => ({
    id: photo.id,
    thumb: photo.src,
    full: photo.src,
    alt: photo.alt,
    tags: OWN_TAGS[photo.id] ?? [],
  }));

  const google: GalleryPhoto[] = googleMapsPhotos.map((photo, i) => ({
    id: photo.id,
    thumb: googlePhotoUrl(photo, 600, 600),
    full: googlePhotoUrl(photo, 1400, 1400),
    alt: `Foto ${i + 1} da ${site.shortName} publicada na galeria do Google Maps`,
    tags: TAG_LABELS.filter((t) => GOOGLE_TAGS[t.id].includes(i)).map((t) => t.id),
  }));

  return [...own, ...google];
}

export function PhotoGallery({
  initialCount = 12,
  step = 24,
  showLoadMore = true,
  eyebrow = "Galeria",
  title = "A loja por dentro",
  description = "Fotografias reais da Mora Moda, na Cidade Salvador, em Jacareí.",
  tone = "default",
}: {
  initialCount?: number;
  step?: number;
  showLoadMore?: boolean;
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "default" | "sand";
}) {
  const all = useMemo(buildPhotos, []);
  const [tag, setTag] = useState<GalleryTag | null>(null);
  const [visible, setVisible] = useState(initialCount);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = useMemo(
    () => (tag ? all.filter((p) => p.tags.includes(tag)) : all),
    [all, tag],
  );

  const shown = photos.slice(0, visible);
  const items: LightboxItem[] = shown.map((photo) => ({ src: photo.full, alt: photo.alt }));

  return (
    <Section tone={tone} id="galeria">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ButtonAnchor
          href={site.links.googleProfile}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          size="md"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Ver mais fotos no Google
        </ButtonAnchor>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {[{ id: null as GalleryTag | null, label: "Todas" }, ...TAG_LABELS].map((t) => {
          const active = tag === t.id;
          return (
            <button
              key={t.label}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setTag(t.id);
                setVisible(initialCount);
              }}
              className={
                active
                  ? "h-9 rounded-full border border-primary bg-primary px-4 text-xs uppercase tracking-[0.12em] text-primary-foreground"
                  : "h-9 rounded-full border border-border bg-card px-4 text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted-foreground" role="status">
        {photos.length} {photos.length === 1 ? "foto" : "fotos"}
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {shown.map((photo, index) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group block w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`Ampliar: ${photo.alt}`}
            >
              <SmartImage
                src={photo.thumb}
                alt={photo.alt}
                className="aspect-square"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {showLoadMore && visible < photos.length ? (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="md" onClick={() => setVisible((v) => v + step)}>
            Ver mais fotos ({photos.length - visible} restantes)
          </Button>
        </div>
      ) : null}

      {lightboxIndex !== null ? (
        <Lightbox
          items={items}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      ) : null}
    </Section>
  );
}
