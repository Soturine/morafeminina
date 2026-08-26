import { Link } from "@tanstack/react-router";
import catFeminino from "@/assets/cat-feminino.jpg";
import catInfantil from "@/assets/cat-infantil.jpg";
import catNovidades from "@/assets/cat-novidades.jpg";
import catOfertas from "@/assets/cat-ofertas.jpg";
import { Section, SectionHeading } from "@/components/Section";

type Category = {
  title: string;
  text: string;
  to: "/feminino" | "/infantil" | "/novidades";
  search?: { oferta: boolean };
  image: string;
  alt: string;
};

const categories: Category[] = [
  {
    title: "Moda Feminina",
    text: "Roupas para diferentes estilos, momentos e ocasiões.",
    to: "/feminino",
    image: catFeminino,
    alt: "Arara com peças femininas em tons neutros",
  },
  {
    title: "Moda Infantil",
    text: "Peças bonitas, confortáveis e pensadas para acompanhar cada fase.",
    to: "/infantil",
    image: catInfantil,
    alt: "Pilha de roupas infantis dobradas em tons neutros",
  },
  {
    title: "Novidades",
    text: "Os últimos produtos que chegaram à loja.",
    to: "/novidades",
    image: catNovidades,
    alt: "Peças de roupa novas dispostas sobre uma poltrona clara",
  },
  {
    title: "Ofertas",
    text: "Seleção de oportunidades e preços especiais.",
    to: "/novidades",
    image: catOfertas,
    alt: "Roupas dobradas com etiqueta de papel",
  },
];

export function CategoryGrid() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Categorias"
        title="Encontre seu estilo"
        description="Da peça do dia a dia ao look de ocasião, com opções para você e para as crianças."
      />

      <ul className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <li key={category.title}>
            <Link to={category.to} className="group block">
              <div className="aspect-3/4 overflow-hidden bg-secondary">
                <img
                  src={category.image}
                  alt={category.alt}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-4 text-xl">{category.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{category.text}</p>
              <span className="link-underline mt-3 inline-block text-[0.75rem] uppercase tracking-[0.16em] text-foreground">
                Ver peças
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
