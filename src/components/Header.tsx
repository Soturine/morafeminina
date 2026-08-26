import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background",
      )}
    >
      <div className="shell grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:h-20 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <Link
          to="/"
          className="min-w-0 font-display text-2xl leading-none tracking-tight text-foreground md:text-[1.75rem]"
        >
          Moda Moda
        </Link>

        <nav aria-label="Navegação principal" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-underline text-[0.8125rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <WhatsAppLink variant="primary" size="sm" className="hidden sm:inline-flex" context="header">
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
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}

          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Navegação principal (mobile)" className="shell py-4">
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block py-3 text-base text-muted-foreground"
                    activeProps={{ className: "text-foreground" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <WhatsAppLink variant="primary" size="md" className="mt-4 w-full" context="header_mobile">
              Falar no WhatsApp
            </WhatsAppLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
