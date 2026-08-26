import { Link } from "@tanstack/react-router";
import { navigation, site } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="shell grid gap-10 py-14 md:grid-cols-3 md:py-16">
        <div>
          <p className="font-display text-2xl">Mora Moda Feminina e Infantil</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Moda feminina e infantil em Jacareí - SP, com variedade, qualidade e atendimento
            próximo.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="eyebrow">Navegação</h2>
          <ul className="mt-4 space-y-2.5">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { context: "footer" })}
                className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                WhatsApp
              </a>
            </li>
            {site.links.facebook ? (
              <li>
                <a
                  href={site.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("facebook_click")}
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Facebook
                </a>
              </li>
            ) : null}
            {site.links.instagram ? (
              <li>
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("instagram_click")}
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Instagram
                </a>
              </li>
            ) : null}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Loja física</h2>
          <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
            <p>
              {site.address.street} - {site.address.district}
            </p>
            <p>
              {site.address.city} - {site.address.state}
            </p>
            <p>CEP {site.address.postalCode}</p>
            <p className="pt-2">
              <a
                href={`tel:${site.phone.e164}`}
                className="link-underline transition-colors hover:text-foreground"
              >
                {site.phone.display}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="shell py-6">
          <p className="text-xs text-muted-foreground">
            © {year} Mora Moda Feminina e Infantil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
