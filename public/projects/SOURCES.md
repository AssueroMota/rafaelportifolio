# Fontes das imagens

As interfaces pertencem aos respectivos produtos e comunidades. Estes produtos
sao referencias publicas, nao projetos de autoria de Rafael Macedo.

| Arquivo | Produto | Fonte oficial |
| --- | --- | --- |
| `plane.webp` | Plane | https://media.docs.plane.so/GitHub-readme/github-work-items.webp |
| `cal-diy.gif` | Cal.diy | https://github.com/calcom/cal.diy/assets/8019099/407e727e-ff19-4ca4-bcae-049dca05cf02 |
| `medusa.png` | Medusa Store | Captura da demo publica https://next.medusajs.com |
| `immich.png` | Immich | https://raw.githubusercontent.com/immich-app/immich/main/design/immich-screenshots.png |
| `firefly.png` | Firefly III | https://raw.githubusercontent.com/firefly-iii/firefly-iii/develop/.github/assets/img/imac-complete.png |
| `activepieces.png` | Activepieces | https://raw.githubusercontent.com/activepieces/activepieces/main/docs/resources/screenshots/branch.png |

Os links dos repositorios originais e das fontes tambem constam em `src/data.js`
e nos detalhes de cada produto. A demo capturada do Medusa corresponde ao starter
Next.js arquivado, disponivel em https://github.com/medusajs/nextjs-starter-medusa.

## Previas em video

Os seis arquivos `*-demo.webm` sao locais, silenciosos e em loop. Os arquivos
`*-poster.png` sao o primeiro frame de cada previa.

- Cal.diy: conversao dos frames da animacao GIF oficial ja listada acima.
- Activepieces: conversao dos frames da animacao oficial em
  https://raw.githubusercontent.com/activepieces/activepieces/main/docs/resources/visual-builder.gif.
- Plane: animacao ilustrativa de movimentacao de uma tarefa, criada sobre a
  imagem publica. Nao e uma gravacao do aplicativo.
- Immich: transicoes ilustrativas entre as telas da imagem publica. Nao e
  uma gravacao do aplicativo.
- Firefly III: animacao ilustrativa de consulta ao grafico sobre a imagem
  publica, com tooltip e valores demonstrativos. Nao e uma gravacao do aplicativo.
- Medusa: gravacao da loja demonstrativa publica, navegando pelas informacoes
  de produto e envio: https://next.medusajs.com/dk/products/hoodie.

Geracao: `scripts/generate-project-previews.mjs`, usando canvas e MediaRecorder
para as animacoes e Playwright + FFmpeg para a gravacao da loja Medusa.

## Logos de empresas

A experiencia usa apenas logos de empresas, com fontes em
`public/companies/SOURCES.md`. As fotografias ilustrativas anteriores nao sao
mais exibidas.
