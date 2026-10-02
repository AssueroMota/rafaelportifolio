export const experiences = [
  {
    period: "2022 - presente",
    location: "Remoto",
    role: "Desenvolvedor Full Stack Senior",
    company: "Vercel",
    logo: "/companies/vercel.svg",
    logoAlt: "Logo da Vercel",
    logoMonochrome: true,
    headline: "Do planejamento ao produto em producao.",
    description:
      "Desenvolvimento de produtos SaaS de ponta a ponta: interfaces React, servicos Node.js, modelagem com MongoDB, integracoes e publicacao em nuvem.",
    responsibilities: ["Interfaces e fluxos completos do produto", "APIs, documentos e consultas com MongoDB", "Integracoes, testes e entrega em producao"],
    tags: ["Node.js", "React", "MongoDB", "AWS"],
  },
  {
    period: "2019 - 2022",
    location: "Belo Horizonte, MG",
    role: "Desenvolvedor Full Stack",
    company: "GitHub",
    logo: "/companies/github.svg",
    logoAlt: "Logo do GitHub",
    logoMonochrome: true,
    headline: "Experiencias conectadas a sistemas completos.",
    description:
      "Construcao de plataformas com autenticacao, dashboards, integracoes externas e rotinas assincronas, acompanhando a entrega da interface aos servicos.",
    responsibilities: ["Dashboards e jornadas de usuarios", "Autenticacao, permissoes e integracoes", "Rotinas assincronas e ambientes Docker"],
    tags: ["TypeScript", "REST APIs", "MongoDB", "Docker"],
  },
  {
    period: "2016 - 2019",
    location: "Belo Horizonte, MG",
    role: "Desenvolvedor Web",
    company: "DigitalOcean",
    logo: "/companies/digitalocean.svg",
    logoAlt: "Logo da DigitalOcean",
    headline: "Sistemas que fazem parte do dia a dia.",
    description:
      "Sites, sistemas internos e paineis administrativos conectados a MySQL, gateways de pagamento e ERPs.",
    tags: ["JavaScript", "Python", "MySQL", "Linux"],
    responsibilities: ["Sites e paineis administrativos", "Conexao com pagamentos e ERPs", "Manutencao e evolucao de sistemas internos"],
  },
];

export const skills = [
  { name: "JavaScript", icon: "javascript", group: "frontend" },
  { name: "TypeScript", icon: "typescript", group: "frontend" },
  { name: "React", icon: "react", group: "frontend" },
  { name: "Next.js", icon: "nextjs", group: "frontend" },
  { name: "HTML5", icon: "html5", group: "frontend" },
  { name: "CSS3", icon: "css3", group: "frontend" },
  { name: "Sass / SCSS", icon: "sass", group: "frontend" },
  { name: "Vite", icon: "vitejs", group: "frontend" },
  { name: "Node.js", icon: "nodejs", group: "backend" },
  { name: "Express", icon: "express", group: "backend" },
  { name: "GraphQL", icon: "graphql", group: "backend" },
  { name: "Python", icon: "python", group: "backend" },
  { name: "MongoDB", icon: "mongodb", group: "data" },
  { name: "Mongoose", icon: "mongoose", group: "data" },
  { name: "Redis", icon: "redis", group: "data" },
  { name: "MySQL", icon: "mysql", group: "data" },
  { name: "Docker", icon: "docker", group: "infra" },
  { name: "Git", icon: "git", group: "infra" },
  { name: "AWS", icon: "amazonwebservices", group: "infra" },
  { name: "Linux", icon: "linux", group: "infra" },
];

export const stackGroups = [
  {
    id: "frontend",
    title: "Interfaces",
    description: "Experiencia, interacao e produto.",
  },
  {
    id: "backend",
    title: "Servicos e APIs",
    description: "Regras de negocio e integracoes.",
  },
  {
    id: "data",
    title: "Dados",
    description: "MongoDB como banco de escolha.",
  },
  {
    id: "infra",
    title: "Entrega e operacao",
    description: "Do ambiente local a producao.",
  },
].map((group) => ({
  ...group,
  items: skills.filter((skill) => skill.group === group.id).map((skill) => skill.name),
}));

export const projects = [
  {
    id: "01",
    name: "Plane",
    category: "Sistemas",
    image: "/projects/plane.webp",
    poster: "/projects/plane-poster.png",
    video: "/projects/plane-demo.webm",
    videoKind: "illustration",
    imageAlt: "Quadro de tarefas e cronograma do Plane",
    imageSource: "https://media.docs.plane.so/GitHub-readme/github-work-items.webp",
    repository: "https://github.com/makeplane/plane",
    website: "https://plane.so",
    description:
      "Sistema de produto com tarefas, ciclos, documentos e camada colaborativa.",
    tags: ["Django", "React", "APIs"],
    overview:
      "Gestao de projetos com multiplas entidades, permissoes, eventos e colaboracao em tempo real.",
    features: [
      "Modelagem de tarefas, ciclos, modulos e documentos.",
      "Camadas web, API e persistencia separadas.",
      "Fluxos pensados para equipes e operacao continua.",
    ],
  },
  {
    id: "02",
    name: "Cal.diy",
    category: "Web",
    image: "/projects/cal-diy.gif",
    poster: "/projects/cal-diy-poster.png",
    video: "/projects/cal-diy-demo.webm",
    imageAlt: "Tela de reserva de horarios publicada pelo projeto Cal.diy",
    imageSource:
      "https://github.com/calcom/cal.diy/assets/8019099/407e727e-ff19-4ca4-bcae-049dca05cf02",
    repository: "https://github.com/calcom/cal.diy",
    website: "https://cal.diy",
    description:
      "Agendamento com disponibilidade, regras de negocio e integracoes externas.",
    tags: ["Next.js", "tRPC", "Prisma"],
    overview:
      "Agendamento conectado a calendarios, regras de disponibilidade, emails transacionais e consistencia de dados.",
    features: [
      "Fluxo de reserva com estados claros para o usuario.",
      "Integracoes com calendarios e videochamadas.",
      "Base self-hosted com evolucao comunitaria.",
    ],
  },
  {
    id: "03",
    name: "Medusa Store",
    category: "Web",
    image: "/projects/medusa.png",
    poster: "/projects/medusa-poster.png",
    video: "/projects/medusa-demo.webm",
    videoSource: "https://next.medusajs.com/dk/products/hoodie",
    imageAlt: "Catalogo de produtos da Medusa Store",
    imageSource: "https://next.medusajs.com",
    repository: "https://github.com/medusajs/nextjs-starter-medusa",
    website: "https://next.medusajs.com",
    description:
      "E-commerce com catalogo, carrinho, checkout e backend headless.",
    tags: ["Next.js", "TypeScript", "Commerce"],
    overview:
      "Loja com regras de produtos, variantes, pedidos, checkout, contas e integracao com servicos de pagamento.",
    features: [
      "Catalogo com produtos, variantes e colecoes.",
      "Carrinho, checkout e area de cliente.",
      "Separacao entre storefront e servicos de comercio.",
    ],
  },
  {
    id: "04",
    name: "Immich",
    category: "Aplicativos",
    image: "/projects/immich.png",
    poster: "/projects/immich-poster.png",
    video: "/projects/immich-demo.webm",
    videoKind: "illustration",
    imageAlt: "Galeria de fotos e telas mobile do Immich",
    imageSource:
      "https://raw.githubusercontent.com/immich-app/immich/main/design/immich-screenshots.png",
    repository: "https://github.com/immich-app/immich",
    website: "https://immich.app",
    description:
      "Aplicativo com backup, processamento de arquivos e servidor proprio.",
    tags: ["Mobile", "Workers", "Self-hosted"],
    overview:
      "Experiencia mobile com upload de arquivos, processamento em segundo plano e busca eficiente.",
    features: [
      "Backup de fotos e videos pelo aplicativo.",
      "Processamento assicrono e organizacao por albuns.",
      "Busca, reconhecimento facial e visualizacao no mapa.",
    ],
  },
  {
    id: "05",
    name: "Firefly III",
    category: "Sistemas",
    image: "/projects/firefly.png",
    poster: "/projects/firefly-poster.png",
    video: "/projects/firefly-demo.webm",
    videoKind: "illustration",
    imageAlt: "Dashboard financeiro do Firefly III com contas e despesas",
    imageSource:
      "https://raw.githubusercontent.com/firefly-iii/firefly-iii/develop/.github/assets/img/imac-complete.png",
    repository: "https://github.com/firefly-iii/firefly-iii",
    website: "https://firefly-iii.org",
    description:
      "Gestao financeira com contas, regras, importacao e relatorios.",
    tags: ["REST API", "Docker", "Relatorios"],
    overview:
      "Gestao financeira com regras de negocio, seguranca de dados, importacao e visualizacao operacional.",
    features: [
      "Contas, categorias, orcamentos e transacoes.",
      "Relatorios de receitas, despesas e recorrencias.",
      "Importacao de dados e regras automaticas.",
    ],
  },
  {
    id: "06",
    name: "Activepieces",
    category: "Sistemas",
    image: "/projects/activepieces.png",
    poster: "/projects/activepieces-poster.png",
    video: "/projects/activepieces-demo.webm",
    videoSource: "https://raw.githubusercontent.com/activepieces/activepieces/main/docs/resources/visual-builder.gif",
    imageAlt: "Editor visual de automacoes do Activepieces com ramificacoes",
    imageSource:
      "https://raw.githubusercontent.com/activepieces/activepieces/main/docs/resources/screenshots/branch.png",
    repository: "https://github.com/activepieces/activepieces",
    website: "https://activepieces.com",
    description:
      "Automacoes com eventos, jobs, conectores e execucoes rastreaveis.",
    tags: ["TypeScript", "Integracoes", "Jobs"],
    overview:
      "Plataforma que conecta servicos, processa eventos e registra execucoes de automacoes.",
    features: [
      "Fluxos visuais com loops e ramificacoes.",
      "Integracoes que podem ser expandidas por conectores.",
      "Execucoes versionadas e novas tentativas automaticas.",
    ],
  },
];
