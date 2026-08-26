/**
 * Fonte única de conteúdo institucional da Moda Moda Feminina.
 * Altere aqui e o site inteiro é atualizado.
 */

export const site = {
  name: "Moda Moda Feminina",
  shortName: "Moda Moda",
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
    defaultMessage: "Olá! Vim pelo site da Moda Moda e gostaria de conhecer as opções disponíveis.",
  },

  /** Links externos. Deixe string vazia para ocultar o link na interface. */
  links: {
    facebook: "https://www.facebook.com/",
    /** Cole aqui a URL oficial do perfil no Google Maps quando disponível. */
    googleProfile: "",
    /** URL de rota do Google Maps (usada em "Como chegar"). */
    googleDirections:
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent("R. Santo Ivo, 504 - Cidade Salvador, Jacareí - SP, 12312-190"),
    /** Mapa incorporado (sem chave de API, sem cookies de login). */
    googleMapEmbed:
      "https://www.google.com/maps?q=" +
      encodeURIComponent("R. Santo Ivo, 504 - Cidade Salvador, Jacareí - SP, 12312-190") +
      "&output=embed",
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
    text: "A Moda Moda nasceu para oferecer variedade, qualidade e preços acessíveis para mulheres e famílias de Jacareí. Em nossa loja você encontra opções de moda feminina e infantil para diferentes estilos e momentos, sempre com atendimento próximo e atenção a cada cliente.",
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
  { label: "Sobre", to: "/sobre" },
  { label: "Localização", to: "/contato" },
] as const;
