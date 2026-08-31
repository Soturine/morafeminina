import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Category } from "@/domain/catalog/types";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { cn } from "@/lib/utils";

/** Itens fixos (não-taxonomia). O catálogo vem sempre do repositório. */
const STATIC_LINKS = [
  { label: "Novidades", to: "/novidades" },
  { label: "Galeria", to: "/galeria" },
  { label: "Sobre", to: "/sobre" },
  { label: "Localização", to: "/contato" },
] as const;

export function Header({ departments = [] }: { departments?: Category[] }) {
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const catalogRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setOpen(false);
    setCatalogOpen(false);
    setMobileCatalogOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!catalogOpen) return;
    const onPointer = (event: MouseEvent) => {
      if (!catalogRef.current?.contains(event.target as Node)) setCatalogOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCatalogOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [catalogOpen]);

  const linkClass =
    "link-underline text-[0.8125rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/95 backdrop-blur"
          : "border-transparent bg-background",
      )}
    >
      <div className="shell grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Link
          to="/"
          className="min-w-0 font-display text-2xl leading-none tracking-tight text-foreground md:text-[1.75rem]"
        >
          Mora Moda
        </Link>

        <nav aria-label="Navegação principal" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className={linkClass}
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: true }}
              >
                Início
              </Link>
            </li>

            {departments.length > 0 ? (
              <li ref={catalogRef} className="relative">
                <button
                  type="button"
                  aria-expanded={catalogOpen}
                  aria-haspopup="true"
                  onClick={() => setCatalogOpen((v) => !v)}
                  className={cn(linkClass, "inline-flex items-center gap-1")}
                >
                  Catálogo
                  <ChevronDown
                    className={cn("h-3.5 w-3.5 transition-transform", catalogOpen && "rotate-180")}
                    aria-hidden="true"
                  />
                </button>

                {catalogOpen ? (
                  <div className="absolute left-1/2 top-full z-50 mt-4 w-60 -translate-x-1/2 border border-border bg-card p-2 shadow-lg">
                    <ul>
                      <li>
                        <Link
                          to="/catalogo"
                          className="block px-3 py-2 text-[0.8125rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          Ver tudo
                        </Link>
                      </li>
                      {departments.map((d) => (
                        <li key={d.id}>
                          <Link
                            to="/catalogo/$slug"
                            params={{ slug: d.slug }}
                            className="block px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            activeProps={{ className: "text-foreground" }}
                          >
                            {d.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ) : null}

            {STATIC_LINKS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={linkClass}
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <WhatsAppLink
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
            context="header"
          >
            Falar no WhatsApp
          </WhatsAppLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="inline-flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Navegação principal (mobile)" className="shell py-4">
            <ul className="flex flex-col">
              <li>
                <Link
                  to="/"
                  className="block py-3 text-base text-muted-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: true }}
                >
                  Início
                </Link>
              </li>

              {departments.length > 0 ? (
                <li>
                  <button
                    type="button"
                    aria-expanded={mobileCatalogOpen}
                    aria-controls="menu-mobile-catalogo"
                    onClick={() => setMobileCatalogOpen((v) => !v)}
                    className="flex w-full items-center justify-between py-3 text-base text-muted-foreground"
                  >
                    Catálogo
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        mobileCatalogOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {mobileCatalogOpen ? (
                    <ul id="menu-mobile-catalogo" className="mb-2 border-l border-border pl-4">
                      <li>
                        <Link to="/catalogo" className="block py-2.5 text-sm text-muted-foreground">
                          Ver tudo
                        </Link>
                      </li>
                      {departments.map((d) => (
                        <li key={d.id}>
                          <Link
                            to="/catalogo/$slug"
                            params={{ slug: d.slug }}
                            className="block py-2.5 text-sm text-muted-foreground"
                            activeProps={{ className: "text-foreground" }}
                          >
                            {d.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : null}

              {STATIC_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block py-3 text-base text-muted-foreground"
                    activeProps={{ className: "text-foreground" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <WhatsAppLink
              variant="primary"
              size="md"
              className="mt-4 w-full"
              context="header_mobile"
            >
              Falar no WhatsApp
            </WhatsAppLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
