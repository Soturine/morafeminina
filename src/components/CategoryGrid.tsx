import { Link } from "@tanstack/react-router";
import { storePhotos } from "@/data/store-photos";
import { SmartImage } from "@/components/SmartImage";
import { Section, SectionHeading } from "@/components/Section";

type Category = {
  title: string;
  text: string;
  to: "/feminino" | "/infantil" | "/novidades" | "/galeria";
  image: string;
  alt: string;
};

const categories: Category[] = [
  {
    title: "Moda Feminina",
    text: "Vestidos, calças, blusas e looks para diferentes momentos.",
    to: "/feminino",
    image: storePhotos.femininoVestidos.src,
    alt: storePhotos.femininoVestidos.alt,
  },
  {
    title: "Moda Infantil",
    text: "Do enxoval de bebê aos vestidos de festa das crianças.",
    to: "/infantil",
    image: storePhotos.infantilFesta.src,
    alt: storePhotos.infantilFesta.alt,
  },
  {
    title: "Novidades",
    text: "O que a loja está publicando agora no Instagram.",
    to: "/novidades",
    image: storePhotos.vitrineManequins.src,
    alt: storePhotos.vitrineManequins.alt,
  },
  {
    title: "Galeria da loja",
    text: "Fotos reais do interior, das araras e da fachada.",
    to: "/galeria",
    image: storePhotos.interiorAraras.src,
    alt: storePhotos.interiorAraras.alt,
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
              <SmartImage
                src={category.image}
                alt={category.alt}
                className="aspect-3/4"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <h3 className="mt-4 text-xl">{category.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {category.text}
              </p>
              <span className="link-underline mt-3 inline-block text-[0.75rem] uppercase tracking-[0.16em] text-foreground">
                Ver mais
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
