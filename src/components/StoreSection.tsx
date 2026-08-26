import { MapPin, Phone, Clock, Store, PackageCheck, Truck } from "lucide-react";
import { site } from "@/data/site";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { ButtonAnchor } from "@/components/Button";
import { MapEmbed } from "@/components/MapEmbed";
import { track } from "@/lib/analytics";
import { Section, SectionHeading } from "@/components/Section";

const purchaseOptions = [
  { icon: Store, label: "Compre na loja", text: "Atendimento presencial em Jacareí - SP." },
  { icon: PackageCheck, label: "Retire na loja", text: "Escolha pelo WhatsApp e retire quando puder." },
  { icon: Truck, label: "Entrega", text: "Consulte disponibilidade e condições de entrega." },
];

export function StoreSection({
  title = "Venha conhecer a Moda Moda",
  eyebrow = "Loja física",
  as = "h2",
}: {
  title?: string;
  eyebrow?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Section tone="default">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        as={as}
        description="Estamos na Cidade Salvador, em Jacareí. Passe para ver as peças de perto ou fale com a gente pelo WhatsApp."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="text-lg">Endereço</h3>
                <address className="mt-1 text-sm not-italic leading-relaxed text-muted-foreground">
                  {site.address.street} - {site.address.district}
                  <br />
                  {site.address.city} - {site.address.state}
                  <br />
                  CEP {site.address.postalCode}
                </address>
              </div>
            </li>

            <li className="flex gap-4">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="text-lg">WhatsApp e telefone</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <a href={`tel:${site.phone.e164}`} className="link-underline hover:text-foreground">
                    {site.phone.display}
                  </a>
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="text-lg">Horário</h3>
                {site.openingHours.length > 0 ? (
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    {site.openingHours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.hours}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Consulte nosso horário pelo WhatsApp
                  </p>
                )}
              </div>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonAnchor
              href={site.links.googleDirections}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("directions_click")}
              variant="primary"
              size="md"
            >
              Como chegar
            </ButtonAnchor>
            <WhatsAppLink variant="outline" size="md" context="localizacao">
              Falar no WhatsApp
            </WhatsAppLink>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {purchaseOptions.map((option) => (
              <li key={option.label}>
                <option.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="mt-3 text-base">{option.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{option.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <MapEmbed className="min-h-80 overflow-hidden border border-border bg-secondary" />
      </div>
    </Section>
  );
}
