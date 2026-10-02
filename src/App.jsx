import { useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpRight,
  Building2,
  Check,
  Cloud,
  Code2,
  Copy,
  Database,
  GitBranch,
  Mail,
  Menu,
  Moon,
  Pause,
  Play,
  Server,
  Sun,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import { experiences, projects, skills, stackGroups } from "./data.js";
import { downloadResume } from "./resume.js";
import { useScrollReveal } from "./useScrollReveal.js";
import "./App.css";

const currentYear = new Date().getFullYear();
const email = "rafael@macedo.dev";

const navigation = [
  { id: "inicio", label: "Inicio" },
  { id: "metodo", label: "Como trabalho" },
  { id: "stack", label: "Stack" },
  { id: "experiencia", label: "Experiencia" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

const focusAreas = [
  {
    title: "Interfaces que fazem sentido",
    text: "Experiencias responsivas, fluxos claros e atencao aos detalhes que tornam o produto simples de usar.",
    icon: Code2,
  },
  {
    title: "Dados bem modelados",
    text: "MongoDB, Mongoose, indices e agregacoes para conectar as necessidades do produto a dados bem organizados.",
    icon: Database,
  },
  {
    title: "Servicos conectados",
    text: "APIs, autenticacao, pagamentos e integracoes que conectam cada parte da experiencia com seguranca.",
    icon: Server,
  },
  {
    title: "Entrega ate producao",
    text: "Testes, Docker, CI/CD e monitoramento para acompanhar o produto depois do primeiro deploy.",
    icon: Cloud,
  },
];

const terminalLines = [
  "pnpm test --run api/orders",
  "mongodb connection: ready",
  "queue workers: 12 active",
  "deploy preview: healthy",
];

function SectionTitle({ title, text }) {
  return (
    <div className="section-title">
      <h2 data-reveal="left">{title}</h2>
      {text && <p data-reveal="up" style={{ "--reveal-delay": "80ms" }}>{text}</p>}
    </div>
  );
}

function BackendVisual() {
  return (
    <div className="backend-visual" data-reveal="right" aria-label="Painel tecnico animado">
      <div className="visual-grid" />
      <div className="pulse-ring" />
      <div className="console-window">
        <div className="console-top">
          <span />
          <span />
          <span />
          <strong>product.pipeline</strong>
        </div>
        <div className="console-body">
          <code>{"const service = await deploy({"}</code>
          <code>{"  ui: 'React + TypeScript',"}</code>
          <code>{"  api: 'Node.js',"}</code>
          <code>{"  db: 'MongoDB',"}</code>
          <code>{"  status: 'online'"}</code>
          <code>{"});"}</code>
        </div>
      </div>
      <div className="service-map">
        <span className="node node-api">
          <Server size={18} />
          API
        </span>
        <span className="node node-db">
          <Database size={18} />
          DB
        </span>
        <span className="node node-worker">
          <Workflow size={18} />
          Jobs
        </span>
        <span className="node node-cloud">
          <Cloud size={18} />
          Cloud
        </span>
      </div>
      <div className="health-panel">
        <span>
          <Activity size={16} />
          Latencia
          <strong>48ms</strong>
        </span>
        <span>
          <GitBranch size={16} />
          CI
          <strong>green</strong>
        </span>
      </div>
      <div className="log-stream" aria-hidden="true">
        {terminalLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectMedia({ project }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [near, setNear] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReducedMotion(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    const loadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setNear(true);
    }, { rootMargin: "200px" });
    const playObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    loadObserver.observe(containerRef.current);
    playObserver.observe(containerRef.current);
    return () => {
      preference.removeEventListener("change", syncPreference);
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !near) return;
    if (visible && !paused && !reducedMotion && !failed) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [visible, near, paused, reducedMotion, failed]);

  const label = playing ? `Pausar previa de ${project.name}` : `Reproduzir previa de ${project.name}`;

  return (
    <div className="project-media" ref={containerRef}>
      {failed ? (
        <img src={project.poster || project.image} alt={project.imageAlt} />
      ) : (
        <video
          ref={videoRef}
          src={near ? project.video : undefined}
          poster={project.poster || project.image}
          muted loop playsInline preload="none"
          aria-label={`Previa animada de ${project.name}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        />
      )}
      {!failed && (
        <button
          className="media-toggle icon-button"
          aria-label={label} title={label}
          onClick={(event) => {
            event.stopPropagation();
            if (playing) setPaused(true);
            else {
              setPaused(false);
              setReducedMotion(false);
              videoRef.current?.play().catch(() => setPlaying(false));
            }
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}
    </div>
  );
}

function CompanyLogo({ company }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="company-mark">
      {company.logo && !failed ? (
        <img
          className={company.logoMonochrome ? "company-logo-monochrome" : undefined}
          src={company.logo}
          alt={company.logoAlt || `Logo da ${company.company}`}
          width="36" height="36"
          onError={() => setFailed(true)}
        />
      ) : <Building2 size={24} aria-label={company.company} />}
    </span>
  );
}

function ExperienceShowcase() {
  const [selected, setSelected] = useState(0);
  const item = experiences[selected];
  return (
    <div className="experience-layout">
      <div className="company-list" data-reveal="left" role="group" aria-label="Selecionar empresa">
        {experiences.map((company, index) => (
          <button
            key={company.company}
            aria-label={`${company.company}, ${company.period}`}
            className={`company-selector ${selected === index ? "selected" : ""}`}
            aria-pressed={selected === index}
            aria-controls="experience-detail"
            onClick={() => setSelected(index)}
          >
            <CompanyLogo company={company} />
            <span><strong>{company.company}</strong><small>{company.period}</small></span>
            <ArrowUpRight size={18} />
          </button>
        ))}
        <span className="experience-note">Experiencias demonstrativas</span>
      </div>
      <div className="experience-detail" id="experience-detail" key={item.company}>
        <div className="experience-copy">
          <span className="experience-period">{item.period} / {item.location}</span>
          <h3>{item.headline}</h3>
          <p className="experience-role">{item.role} <span>em {item.company}</span></p>
          <p>{item.description}</p>
          <ul className="experience-responsibilities">
            {item.responsibilities.map((responsibility) => (
              <li key={responsibility}><Check size={16} />{responsibility}</li>
            ))}
          </ul>
          <div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    if (!ref.current.open) ref.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="dialog-top">
        <button
          className="icon-button"
          aria-label="Fechar projeto"
          title="Fechar projeto"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      <div className="dialog-layout">
        <div className="dialog-screenshot"><ProjectMedia project={project} /></div>
        <div className="dialog-content">
          <h2 id="project-dialog-title">{project.name}</h2>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h3>Leitura tecnica</h3>
          <p>{project.overview}</p>
          <h3>Pontos de arquitetura</h3>
          <ul className="project-decisions">
            {project.features.map((item) => (
              <li key={item}>
                <Check size={15} />
                {item}
              </li>
            ))}
          </ul>
          <div className="dialog-actions">
            <a
              className="button primary"
              href={project.website}
              target="_blank"
              rel="noreferrer"
            >
              Ver produto <ArrowUpRight size={17} />
            </a>
            <a
              className="button secondary"
              href={project.repository}
              target="_blank"
              rel="noreferrer"
            >
              Repositorio <ArrowUpRight size={17} />
            </a>
          </div>
          <p className="demo-note">
            Autoria da comunidade do projeto.{" "}
            <a href={project.videoSource || project.imageSource} target="_blank" rel="noreferrer">
              Fonte da midia <ArrowUpRight size={12} />
            </a>
          </p>
        </div>
      </div>
    </dialog>
  );
}

function App() {
  const pageRef = useRef(null);
  useScrollReveal(pageRef);
  const [active, setActive] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("rm-theme") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });
  const [filter, setFilter] = useState("Todos");
  const [project, setProject] = useState(null);
  const [copyState, setCopyState] = useState("idle");
  const [pdfState, setPdfState] = useState("idle");
  const copyTimer = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("rm-theme", theme);
    } catch {
      /* Storage can be disabled in private browsing. */
    }
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-18% 0px -58% 0px", threshold: 0 },
    );
    navigation.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("idle"), 3500);
  }

  async function handleDownload() {
    setPdfState("loading");
    try {
      await downloadResume();
      setPdfState("idle");
    } catch {
      setPdfState("error");
    }
  }

  const filteredProjects = projects.filter(
    (item) => filter === "Todos" || item.category === filter,
  );
  const pdfLabel =
    pdfState === "loading"
      ? "Gerando PDF..."
      : pdfState === "error"
        ? "Tentar novamente"
        : "Baixar curriculo";

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#inicio">
        Ir para o conteudo
      </a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Rafael Macedo, inicio">
          <img src="/logo.svg" alt="Monograma RM" width="56" height="40" />
          <span>Rafael Macedo</span>
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Navegacao">
          {navigation.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                setActive(id);
                setMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
            title={
              theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="icon-button menu-button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <h1 data-reveal="left">Da ideia ao produto. De ponta a ponta.</h1>
            <p data-reveal="up" style={{ "--reveal-delay": "100ms" }}>
              Sou Rafael Macedo, desenvolvedor full stack. Transformo ideias em experiencias digitais
              completas, conectando interfaces, dados e integracoes.
              Do primeiro desenho ao produto em producao.
            </p>
            <div className="hero-actions" data-reveal="up" style={{ "--reveal-delay": "180ms" }}>
              <a className="button primary" href="#projetos">
                Ver projetos <ArrowUpRight size={18} />
              </a>
              <button
                className="button secondary"
                onClick={handleDownload}
                disabled={pdfState === "loading"}
              >
                <ArrowDownToLine size={17} />
                {pdfLabel}
              </button>
            </div>
            {pdfState === "error" && (
              <p role="alert" className="feedback">
                Nao foi possivel gerar o PDF. Tente novamente.
              </p>
            )}
          </div>
          <BackendVisual />
        </section>

        <section id="metodo" className="section backend-section">
          <SectionTitle
            title="Cada parte conta. A entrega inteira tambem."
            text="Experiencia, regras de negocio, dados e operacao. Cuido de cada camada para que tudo funcione junto."
          />
          <div className="focus-grid">
            {focusAreas.map(({ title, text, icon: Icon }, index) => (
              <article className="focus-card" data-reveal={index % 2 ? "down" : "up"} style={{ "--reveal-delay": `${index * 60}ms` }} key={title}>
                <div className="focus-top">
                  <span>0{index + 1}</span>
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="section stack-section">
          <SectionTitle
            title="As ferramentas que uso."
            text="React na interface, Node.js nos servicos e MongoDB nos dados. Ferramentas que acompanham o produto da ideia a producao."
          />
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <article
                className="skill-card"
                key={skill.name}
                data-reveal={["up", "left", "down", "right"][index % 4]}
                style={{ "--reveal-delay": `${(index % 5) * 40}ms` }}
              >
                <img
                  className={`skill-icon skill-icon-${skill.icon}`}
                  src={`/tech/${skill.icon}.svg`}
                  alt="" width="36" height="36" loading="lazy"
                />
                <h3>{skill.name}</h3>
                <p>{stackGroups.find((group) => group.id === skill.group).title}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experiencia" className="section experience-section">
          <SectionTitle
            title="Pessoas, equipes e produtos."
            text="Uma trajetoria construindo experiencias digitais e acompanhando cada etapa da entrega."
          />
          <ExperienceShowcase />
        </section>

        <section id="projetos" className="section projects-section">
          <SectionTitle
            title="Produtos em movimento."
            text="Produtos open source que conectam experiencia, tecnologia e problemas reais."
          />
          <div
            className="project-filters"
            data-reveal="down"
            role="group"
            aria-label="Filtrar projetos"
          >
            {["Todos", "Web", "Aplicativos", "Sistemas"].map((value) => (
              <button
                key={value}
                aria-pressed={filter === value}
                className={filter === value ? "selected" : ""}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((item, index) => (
              <article
                className="project-card"
                key={item.id}
                data-reveal={index % 2 ? "right" : "left"}
                style={{ "--reveal-delay": `${(index % 2) * 80}ms` }}
                tabIndex={0}
                onClick={() => setProject(item)}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget || !["Enter", " "].includes(event.key)) return;
                  event.preventDefault();
                  setProject(item);
                }}
              >
                <div className="project-preview">
                  <ProjectMedia project={item} />
                  <button
                    className="preview-open icon-button"
                    aria-label={`Ver telas do projeto ${item.name}`}
                    title={`Ver projeto ${item.name}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setProject(item);
                    }}
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
                <div className="project-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button
                    className="project-link"
                    aria-label={`Ver projeto ${item.name}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setProject(item);
                    }}
                  >
                    Explorar projeto <ArrowUpRight size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contato" className="contact-section">
          <SectionTitle
            title="Vamos tirar sua ideia do improviso e colocar em producao."
            text="Conte o que precisa existir, quais dados entram no sistema, quais integracoes sao importantes e onde a operacao esta travando."
          />
          <div className="contact-panel" data-reveal="right">
            <div className="contact-icon">
              <Terminal size={24} />
              <Code2 size={24} />
            </div>
            <div className="contact-actions">
              <a href={`mailto:${email}`} className="email-link">
                <Mail size={20} />
                {email}
              </a>
              <button
                className="icon-button copy-button"
                onClick={copyEmail}
                aria-label="Copiar e-mail"
                title={
                  copyState === "copied" ? "E-mail copiado" : "Copiar e-mail"
                }
              >
                {copyState === "copied" ? (
                  <Check size={19} />
                ) : (
                  <Copy size={19} />
                )}
              </button>
            </div>
            <span className="copy-feedback" aria-live="polite">
              {copyState === "copied"
                ? "E-mail copiado."
                : copyState === "error"
                  ? `Nao foi possivel copiar. E-mail: ${email}`
                  : ""}
            </span>
          </div>
        </section>
      </main>

      <footer className="page-footer" data-reveal="up">
        <span>
          <img src="/logo.svg" width="32" height="24" alt="RM" />
          {currentYear} Rafael Macedo
        </span>
        <span>Da ideia ao produto. De ponta a ponta.</span>
      </footer>

      {project && (
        <ProjectDialog project={project} onClose={() => setProject(null)} />
      )}
    </div>
  );
}

export default App;
