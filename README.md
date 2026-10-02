# Portifolio Rafael

Portfolio e curriculo demonstrativos de Rafael Macedo, desenvolvedor full stack com entrega de ponta a ponta e preferencia por MongoDB. Feito com Vite + React, com temas claro e escuro, hero tecnico sem retrato, skills em cards uniformes com logos das tecnologias, experiencia com selecao de empresas e suas logos, projetos com previas em video e curriculo em PDF. As informacoes profissionais e de contato sao ficticias. A selecao de produtos usa referencias open source reais, identificadas como trabalhos de terceiros.

## Rodar localmente

```bash
npm install
npm run dev
```

## Verificar

```bash
npm run lint
npm run build
```

## Midias

Os logos das skills ficam em `public/tech`, com fontes em `public/tech/SOURCES.md`.
A lista `skills` em `src/data.js` alimenta os cards e as tecnologias do PDF.

As fontes e a distincao entre animacoes oficiais e previas ilustrativas estao em `public/projects/SOURCES.md`. Os videos sao locais, silenciosos e em loop, carregados perto da viewport. A reproducao pausa fora da tela e respeita a preferencia de movimento reduzido. Cada previa tambem tem controle manual.

Para regenerar os videos com o Vite em execucao e Playwright disponivel no ambiente:

```bash
node scripts/generate-project-previews.mjs
```

A gravacao do Medusa usa o FFmpeg do cache do Playwright no Windows. Em outros
ambientes, defina `FFMPEG_PATH` com o caminho do executavel.

As experiencias em `src/data.js` ainda sao demonstrativas. Vercel, GitHub e
DigitalOcean foram escolhidas apenas como exemplos de empresas com logos reais.
Para personalizar, altere `company`, `logo` e `logoAlt` em cada experiencia.
Use `logoMonochrome: true` para logos escuras que devem ser invertidas no tema
escuro. As fontes das logos ficam em `public/companies/SOURCES.md`.

As experiencias, tecnologias e projetos ficam em `src/data.js`. O PDF e gerado em `src/resume.js`.

As capturas dos produtos ficam em `public/projects`. As fontes oficiais estao
registradas em `public/projects/SOURCES.md` e nos detalhes de cada produto.
