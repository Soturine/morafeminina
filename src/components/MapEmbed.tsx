import { site } from "@/data/site";

export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        title={`Mapa com a localização da ${site.name}`}
        src={site.links.googleMapEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-72 w-full border-0 grayscale-[0.25]"
      />
    </div>
  );
}
