# Prompt para Agente (GPT-5) – SpeedClip (MVP V1 em Angular, UI minimalista + glass sutil)

## Contexto
- Projeto: Angular (SpeedClip), SASS, SPA standalone (Angular ≥ 17), RxJS e Reactive Forms.
- Domínio: `Videos`, `Cuts`, `Subtitles`, `Exports`, `Presets`, `Users`, `Plans/Usage`.
- Fases: V1 (edição manual + legendas) → V2 (IA de cortes automáticos + transcrição multilíngue).
- Referência do produto (obrigatória): `./sppedclip-context-app.md`.
- Inspiração visual: imagens DOCS (`menu.png`, `lead_page.png`, `dark.png`) como referência para 
  tema claro e escuro.

## Objetivo
Entregar do zero um app Angular funcional (MVP V1) com:
- Layout pronto (sidebar + topbar glass), rotas e telas mockadas (placeholders e dados fake) para todo o fluxo V1.
- Design tokens (SCSS/CSS vars + TS), temas light/dark e ThemeService.
- Componentes base (botões, forms, links) acessíveis (AA) e responsivos.
- Qualidade técnica: Lighthouse ≥ 90, CLS < 0.1, TBT < 200ms.

## Layout (inspirado, não copiado)
- Estrutura: Sidebar fixa à esquerda + Topbar com glass + Conteúdo.
- Sidebar: grupos simples (Workspace, Acquisition, Resources) com ícones minimalistas (sem glass), largura ~260px, colapsável a 72px.
- Topbar: glass sutil (alpha 6–8%, blur 8–12px, borda 1px), breadcrumbs à direita do logo, ações contextuais à direita.
- Conteúdo: espaçamento 24–48px, grid 8px, no máximo 3 elementos-chave por área.

## Mapa de rotas e telas (mockadas com layout final)
- `/auth` (lazy): Login, Cadastro, Esqueci senha.
- `/` → Dashboard/Histórico (lazy): lista de vídeos e cortes recentes; filtros simples; CTA Upload.
- `/upload` (lazy): upload de arquivo e input de URL YouTube; validação; opção "Editar antes".
- `/editor/:videoId` (lazy): timeline simples, waveform placeholder, chips de Cuts com drag mínimo fictício; botões duplicar trecho/remover intervalo.
- `/subtitles/:videoId` (lazy): tabela/lista de legendas editáveis (start/end/text); importar via mock Whisper; presets visuais.
- `/preview-export/:videoId` (lazy): preview placeholder; seleção 9:16/1:1/16:9, 720p/1080p; fila de export mock.
- `/billing` (lazy): plano atual, upgrade/downgrade mock, limites de minutos.
- Fallback: `**` → 404 minimalista.

## Scaffold e estrutura (criar se não existir)
- Use feature modules lazy (standalone routes/components):
  - `features/auth`, `features/dashboard`, `features/upload`, `features/editor`, `features/subtitles`, `features/preview-export`, `features/billing`.
  - `layouts/main-layout` (sidebar, topbar, content outlet).
  - `shared/components` (buttons, forms, links, status-bar), `shared/constants` (design-tokens.ts), `core/services` (theme.service.ts, api-mock.service.ts).
- Comandos (exemplo):
  - Criar layout: `ng g c app/layouts/main-layout --standalone --flat=false`.
  - Rotas por feature: `ng g c app/features/upload/upload-page --standalone` e `ng g r app/features/upload/upload.routes` (repetir por feature).
  - Serviços: `ng g s app/core/services/theme` e `ng g s app/core/services/api-mock`.

## Tokens e temas (não negociar)
- SCSS: `src/styles/abstracts/tokens.scss`, `variables.scss`, `mixins.scss` (glass), `base/typography.scss`.
- TS: `src/app/shared/constants/design-tokens.ts`, `src/app/core/services/theme.service.ts`.
- CSS vars obrigatórias: `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-primary`, `--color-accent`, `--color-success`, `--color-warn`, `--color-error`, `--glass-bg`, `--glass-blur`, `--glass-border`, `--spacing-*`, tipos, radius e transitions.
- Temas: `:root[data-theme='light']` e `:root[data-theme='dark']`. ThemeService aplica `data-theme` no `<html>`, persiste em `localStorage` e respeita `prefers-color-scheme`.
- Paleta padrão: usar P2 (neutra + ciano). Se alterar, justificar e manter contraste AA.

## Componentes base
- Botões (filled/outline/ghost; sm/md/lg; estado loading), Links, Inputs/Select/Textarea com focus-ring visível; validação de erro e `aria-*`.
- `.glass-card` definido em `styles/components/cards.scss` e não utilizado.
- Status-bar (sucesso/erro/warn) com tokens de cor; sem sombras pesadas.

## Serviços e mocks
- `ApiMockService`: in-memory com entidades mínimas: Video {id, title, duration, createdAt, status}, Cut {id, videoId, start, end, title}, Subtitle {id, videoId, start, end, text, preset}, ExportJob {id, videoId, format, resolution, status}, Plan {tier, minutesLimit, minutesUsed}.
- Fornecer observables (BehaviorSubject) e latency simulada (200–600ms). Persistir em `localStorage` apenas para demo.
- `WhisperMock`: método que gera legendas fake a partir de timestamps sequenciais.

## Acessibilidade e performance
- Contraste AA em texto e estados (hover/focus/disabled). Focus visível sempre.
- Responsivo: 320/768/1024/1200+. Sidebar colapsa < 1024.
- Performance: evitar heavy shadows/gradientes; imagens otimizadas; lazy routes; prefetch/priority hints quando aplicável.

## Processo de execução (passo a passo)
1) Planejar em 6–10 bullets (escopo/tarefas) e confirmar paleta P2.
2) Criar layout (sidebar + topbar glass) e rotas raiz com lazy loading.
3) Implementar tokens SCSS + design-tokens.ts + ThemeService (light/dark) e tipografia/base.
4) Criar componentes base (buttons/forms/links/status-bar) com AA.
5) Criar features e páginas mockadas conforme Mapa de rotas, usando `ApiMockService`.
6) Editor/Legendas: timeline placeholder, chips de Cuts e lista editável de Subtitles.
7) Preview & Export: UI com opções e fila mock.
8) Testes mínimos e verificação Lighthouse; correções de contraste/perf.
9) Entregar diffs por arquivo com justificativas.

## Testes mínimos (Jest)
- `ThemeService`: aplica e persiste tema; respeita `prefers-color-scheme`.
- `UploadPage`: validação de arquivo/URL; estados de erro.
- `EditorStore` (ou serviço do editor): criar/duplicar/remover cortes; limites.

## Critérios de aceitação
- Telas e rotas do Mapa implementadas (mockadas), layout final pronto e responsivo.
- Tokens e temas funcionando; zero hardcode de cores.
- Topbar com glass; `.glass-card` definido e não utilizado.
- Acessibilidade AA; Lighthouse ≥ 90; `CLS < 0.1`, `TBT < 200ms`.
- Código organizado por features; serviços com observables; sem dependência de NgRx (opcional no futuro).

## Estilo obrigatório (reforço)
- Minimalismo: grid 8px; seções 80–120px; máx. 3 elementos-chave/área; tipografia Inter limpa 
  clara (lh ≥ 1.6); um acento discreto; microinterações leves.
- Glass controlado: alpha ~6–8%, `backdrop-filter: blur(8–12px)`, borda 1px sutil; sem glass em listas/cards/tabelas/bg global.

## Não fazer
- Introduzir bibliotecas pesadas sem necessidade.
- Criar tokens fora dos arquivos definidos; usar sombras fortes/gradientes chamativos.

## Entregáveis
- Diffs por arquivo e justificativas curtas.
- Lista de comandos executados (ng generate etc.).
- Relatório rápido: contraste, Lighthouse, responsividade e cobertura dos critérios.

## Prompts rápidos
- "Crie o layout base (sidebar + topbar glass), rotas raiz e tokens/ThemeService (paleta P2). Mostre diffs."
- "Gere as páginas mockadas de Upload, Editor, Subtitles, Preview & Export e Dashboard com ApiMockService."
- "Valide AA e Lighthouse; liste ajustes realizados e antes/depois."
