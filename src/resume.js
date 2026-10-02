import { experiences, projects, stackGroups } from "./data.js";

const email = "rafael@macedo.dev";

export async function createResume() {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF();
  const left = 19;
  const width = 172;
  let y = 22;

  pdf.setProperties({
    title: "Rafael Macedo - Curriculo",
    author: "Rafael Macedo",
    subject: "Perfil profissional demonstrativo",
  });

  function text(value, size = 10, bold = false, color = [55, 61, 65]) {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    pdf.setTextColor(...color);
    const lines = pdf.splitTextToSize(value, width);
    const height = lines.length * size * 0.39;
    if (y + height > 270) {
      pdf.addPage();
      y = 22;
    }
    pdf.text(lines, left, y);
    y += height + 1.5;
  }

  function heading(value) {
    y += 4;
    if (y > 252) {
      pdf.addPage();
      y = 22;
    }
    pdf.setDrawColor(204, 211, 205);
    pdf.line(left, y - 3, 191, y - 3);
    text(value.toUpperCase(), 10, true, [46, 93, 44]);
    y += 1;
  }

  pdf.setFont("courier", "bold");
  pdf.setFontSize(22);
  pdf.setTextColor(70, 110, 31);
  pdf.text("{RM}", 191, 24, { align: "right" });
  text("RAFAEL MACEDO", 25, true, [22, 27, 23]);
  text("Full Stack Developer | Produtos de ponta a ponta", 12, true);
  text(`Belo Horizonte, Brasil | Remoto e hibrido | ${email}`, 9);

  heading("Perfil");
  text(
    "Desenvolvedor full stack que acompanha produtos da ideia a producao. Trabalha com interfaces React, APIs Node.js, MongoDB, integracoes, testes e deploy, conectando a experiencia do usuario as regras de negocio.",
  );

  heading("Stack");
  stackGroups.forEach((group) => {
    text(`${group.title}: ${group.items.join(" / ")}`, 9);
  });

  heading("Experiencia profissional");
  experiences.forEach((item) => {
    if (y > 221) {
      pdf.addPage();
      y = 22;
    }
    text(item.role, 11, true);
    text(`${item.company} | ${item.period} | ${item.location}`, 9);
    text(item.description, 9);
    text(item.tags.join(" / "), 8, false, [80, 95, 83]);
    y += 2;
  });

  heading("Referencias tecnicas");
  text(
    "Produtos de terceiros apresentados como referencias publicas; nao sao trabalhos de autoria de Rafael Macedo.",
    9,
  );
  projects.forEach((project) =>
    text(
      `${project.name}: ${project.description} Stack: ${project.tags.join(", ")}.`,
      9,
    ),
  );

  heading("Formacao e idiomas");
  text(
    "Sistemas de Informacao | Instituto Metropolitano de Tecnologia | 2012 - 2016",
    9,
  );
  text(
    "Pos-graduacao em Arquitetura de Software | Academia DevLab | 2023 - 2024",
    9,
  );
  text("Portugues: nativo | Ingles: avancado", 9);

  const pages = pdf.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    pdf.setPage(page);
    pdf.setFontSize(8);
    pdf.setTextColor(125, 125, 125);
    pdf.text(
      "Curriculo demonstrativo. As informacoes profissionais sao ficticias.",
      left,
      284,
    );
    pdf.text(`${page} / ${pages}`, 191, 284, { align: "right" });
  }
  return pdf;
}

export async function downloadResume() {
  const pdf = await createResume();
  pdf.save("Rafael-Macedo-Curriculo.pdf");
}
