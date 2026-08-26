import { Star } from "lucide-react";
import { site, testimonials } from "@/data/site";
import { Section, SectionHeading } from "@/components/Section";

export function Reviews() {
  return (
    <Section tone="sand">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Prova social" title="Quem compra, recomenda" />

          <div className="mt-8">
            <p className="font-display text-6xl leading-none">
              {site.rating.value.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}
            </p>
            <div className="mt-3 flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {site.rating.count} avaliações no {site.rating.source}
            </p>
            {site.links.googleProfile ? (
              <a
                href={site.links.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-block text-[0.8125rem] uppercase tracking-[0.14em] text-foreground"
              >
                Ver avaliações no Google
              </a>
            ) : null}
          </div>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.text} className="border-l border-accent/40 pl-5">
              <blockquote className="font-display text-xl leading-snug text-foreground">
                “{t.text}”
              </blockquote>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Avaliação no Google
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
