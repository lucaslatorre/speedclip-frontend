Você é o Agent do GitHub Copilot. Projeto: SpeedClip (frontend Angular standalone components). Objetivo: gerar uma página de Upload onde o usuário cola a URL do vídeo do YouTube. Gere código pronto para integrar ao repositório, respeitando estilo e tokens existentes.

Contexto do projeto:
- Angular standalone components, ChangeDetectionStrategy.OnPush.
- SCSS com CSS vars em `'src/styles/abstracts/tokens.scss'` (usar variáveis existentes: --color-bg, --color-text, --spacing-*, --radius-*, etc).
- Não usar bibliotecas externas de UI; apenas HTML/SCSS/TS nativo + Angular ReactiveForms.
- Padrões: acessibilidade (aria), responsivo, minimalista, foco em usabilidade mobile-first.
- Evitar inline styles, usar classes e variáveis. Chumbar valores fixos que a UX exigir (ex.: paddings específicos) conforme padrão do projeto.

Requisitos funcionais:
1. Campo de input para URL (type=text) com placeholder; validação para links YouTube (suportar youtube.com/watch?v= e youtu.be/). Mensagens de erro claras e acessíveis.
2. Checkbox `Editar antes` (como já existe) e botão `Enviar URL`. Botão desativa quando loading.
3. Ao submeter URL válida, chamar método de API (`ApiMockService.addVideoFromUrl(url)`) e navegar (`Router.navigate`) conforme `editBefore`. Mostrar estado loading e feedback (toast/inline).
4. Suportar upload de arquivo local (input file) como alternativa — integrar à mesma lógica (chamar `ApiMockService.addVideoFromFile`).
5. Mostrar preview simples do vídeo (thumbnail gerada a partir da URL do YouTube) antes de enviar, apenas quando URL válida.
6. escrever testes unitários (Jasmine/Karma) cobrindo validação e navegação.

Requisitos de UI:
- Layout clean, moderno, minimalista, alinhado ao style tokens.
- Component deve usar `ChangeDetectionStrategy.OnPush`.
- Grid responsivo: no mobile empilhar; em desktop mostrar campo + preview lado a lado.
- Botões com estados hover/focus/active usando variáveis (`--btn-bg`, `--btn-text`, `--btn-shadow`).
- Acessibilidade: labels vinculados, aria-describedby para erros, role="status" para loading.
- Micro-interações: transições usando `--transition-normal`.
- Evitar cores fortes exceto para `--color-accent` em pequenos toques (botão primário ou foco).

Arquivos a gerar/alterar (faça PR-ready):
- `'src/app/features/upload/upload-page.component.ts'` (com OnPush, ReactiveForms, injeção via `inject()`).
- `'src/app/features/upload/upload-page.component.html'` (marcação responsiva, aria, preview).
- `'src/app/features/upload/upload-page.component.scss'` (usar vars; manter coerência com tokens; chumbar valores quando necessário).
- `'src/app/features/upload/upload-page.component.spec.ts'` (tests: validação de URL inválida, envio e navegação, loading).
- Atualize `routes` se necessário (mostrar snippet), mas não altere global routing automaticamente — apenas sugira a rota `'upload'`.

Detalhes técnicos a incluir no código:
- Validator custom para YouTube (RegExp robusta, teste para https?://(www\.)?youtube\.com/watch\?v=... e youtu\.be/...).
- Extraia thumbnail de YouTube sem API (construir URL padrão `https://img.youtube.com/vi/:id/hqdefault.jpg`).
- Todas as interações com ApiMockService devem usar subscribe e lidar com unsubscribe quando necessário (use take(1) / first() ou completar).
- Não use concatenação de shell (não aplicável aqui).
- Evitar magic numbers: use tokens ou constants ao topo do TS/SCSS.

Padrões de qualidade:
- Código modular e comentado.
- Seguir princípios SOLID onde aplicável.
- Não introduzir dependências externas.
- Garantir que alterações CSS não quebrem outras áreas: use classes específicas `.upload-page`, nomes BEM-like.

Saída esperada do Agent (entregar código completo com comentários):
- Implementações finalizadas dos 4 arquivos acima.
- Incluir pequeno snippet sugerido para registrar rota:
    - `{ path: 'upload', component: UploadPageComponent }`
- Mensagens de commit/PR: "feat(upload): create upload page (url + file) — responsive, accessible, tests"

Priorize responsividade, acessibilidade e integração com o estilo do projeto. Seja conciso, gere código limpo e pronto para revisão.
