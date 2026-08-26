/**
 * Fonte única de conteúdo institucional da Mora Moda.
 * Altere aqui e o site inteiro é atualizado.
 */

export const site = {
  name: "Mora Moda Feminina e Infantil",
  shortName: "Mora Moda",
  tagline: "Moda feminina e infantil em Jacareí - SP",
  city: "Jacareí",
  state: "SP",

  address: {
    street: "R. Santo Ivo, 504",
    district: "Cidade Salvador",
    city: "Jacareí",
    state: "SP",
    postalCode: "12312-190",
    country: "BR",
    /** Linha completa usada em textos corridos e no schema.org */
    full: "R. Santo Ivo, 504 - Cidade Salvador, Jacareí - SP, 12312-190",
  },

  phone: {
    /** Formato E.164, usado em links tel: e wa.me */
    e164: "+5512981453977",
    /** Apenas dígitos, usado no wa.me */
    digits: "5512981453977",
    display: "(12) 98145-3977",
  },

  whatsapp: {
    defaultMessage: "Olá! Vim pelo site da Mora Moda e gostaria de conhecer as opções disponíveis.",
  },

  /** Links externos. Deixe string vazia para ocultar o link na interface. */
  links: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/mora.feminina/",
    /** Perfil oficial no Google Maps. */
    googleProfile:
      "https://www.google.com/maps/place/Sonho+de+crian%C3%A7a+(MORA+MODA+FEMININA+E+INFANTIL)/@-23.3026357,-45.9319489,75m/data=!3m1!1e3!4m6!3m5!1s0x94cdcbc2b61efd17:0x6d5829618673a661!8m2!3d-23.3026985!4d-45.9318535!16s%2Fg%2F11fm794vnm!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D",
    /** URL de rota do Google Maps (usada em "Como chegar"). */
    googleDirections:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(
        "Mora Moda Feminina e Infantil, R. Santo Ivo, 504 - Cidade Salvador, Jacareí - SP, 12312-190",
      ),
    /** Mapa incorporado (sem chave de API, sem cookies de login). */
    googleMapEmbed:
      "https://www.google.com/maps?q=" +
      encodeURIComponent(
        "Mora Moda Feminina e Infantil, R. Santo Ivo, 504 - Cidade Salvador, Jacareí - SP, 12312-190",
      ) +
      "&z=19&output=embed",
  },

  rating: {
    value: 5.0,
    count: 8,
    source: "Google",
  },

  services: ["Compras na loja", "Retirada na loja", "Entrega"],

  /**
   * Horários de funcionamento. Enquanto a lista estiver vazia, o site exibe
   * "Consulte nosso horário pelo WhatsApp" em vez de inventar horários.
   * Exemplo: [{ days: "Segunda a sexta", hours: "09h - 18h" }]
   */
  openingHours: [] as { days: string; hours: string }[],

  /** Campos institucionais opcionais — preencha quando a informação existir. */
  institutional: {
    foundedYear: "" as string,
    teamSize: "" as string,
    story: "" as string,
  },

  about: {
    title: "Moda para todas as fases",
    text: "A Mora Moda nasceu para oferecer variedade, qualidade e preços acessíveis para mulheres e famílias de Jacareí. Em nossa loja você encontra opções de moda feminina e infantil para diferentes estilos e momentos, sempre com atendimento próximo e atenção a cada cliente.",
  },
} as const;

export type Highlight = { title: string; text: string; icon: "sparkles" | "tag" | "heart" | "bag" };

export const highlights: Highlight[] = [
  {
    title: "Variedade",
    text: "Moda feminina e infantil em um só lugar.",
    icon: "sparkles",
  },
  {
    title: "Bom custo-benefício",
    text: "Peças bonitas e de qualidade com preços acessíveis.",
    icon: "tag",
  },
  {
    title: "Atendimento próximo",
    text: "Atendimento pessoal para ajudar cada cliente a encontrar o que procura.",
    icon: "heart",
  },
  {
    title: "Compre como preferir",
    text: "Compre na loja, retire seu pedido ou consulte possibilidade de entrega.",
    icon: "bag",
  },
];

export type Testimonial = { text: string };

/** Depoimentos reais informados pela loja. Não adicionar avaliações fictícias. */
export const testimonials: Testimonial[] = [
  { text: "Loja muito completa, tudo lindo e ótimos preços." },
  { text: "Muita variedade e ótimo preço também, estou muito satisfeita." },
  { text: "Muito linda essa loja, tem bastante coisas baratas." },
  {
    text: "Foi ótima experiência. Consegui comprar o que estava procurando com ótimo preço e atendimento.",
  },
  { text: "Maravilhosas roupas, qualidade ótima, atendimento excelente." },
];

export const navigation = [
  { label: "Início", to: "/" },
  { label: "Feminino", to: "/feminino" },
  { label: "Infantil", to: "/infantil" },
  { label: "Novidades", to: "/novidades" },
  { label: "Galeria", to: "/galeria" },
  { label: "Sobre", to: "/sobre" },
  { label: "Localização", to: "/contato" },
] as const;
