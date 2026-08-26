/**
 * Destaques reais do Instagram @mora.feminina.
 * `label` só é preenchido quando o significado do destaque é conhecido.
 */
export type InstagramHighlight = {
  id: string;
  name: string;
  /** Rótulo amigável quando o nome do destaque é autoexplicativo. */
  label: string | null;
  url: string;
};

export const instagramHighlights: InstagramHighlight[] = [
  {
    id: "18125965951834266",
    name: "Vestido festa",
    label: "Vestidos de festa",
    url: "https://www.instagram.com/stories/highlights/18125965951834266/",
  },
  {
    id: "18034040684905825",
    name: "Plus Size \u2728",
    label: "Plus Size",
    url: "https://www.instagram.com/stories/highlights/18034040684905825/",
  },
  {
    id: "18457408393136417",
    name: "\u23f0",
    label: null,
    url: "https://www.instagram.com/stories/highlights/18457408393136417/",
  },
  {
    id: "17938392537214238",
    name: "Higiene/Cuidados",
    label: "Higiene e cuidados",
    url: "https://www.instagram.com/stories/highlights/17938392537214238/",
  },
];
