import { Sparkles, Tag, Heart, ShoppingBag } from "lucide-react";
import { highlights } from "@/data/site";
import { Section } from "@/components/Section";

const icons = {
  sparkles: Sparkles,
  tag: Tag,
  heart: Heart,
  bag: ShoppingBag,
} as const;

export function Highlights() {
  return (
    <Section tone="muted">
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => {
          const Icon = icons[item.icon];
          return (
            <li key={item.title}>
              <Icon className="h-5 w-5 text-accent" aria-hidden="true" strokeWidth={1.5} />
              <h3 className="mt-4 text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
