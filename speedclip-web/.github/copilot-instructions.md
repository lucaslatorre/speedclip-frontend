# Objetivo
Padronizar respostas do Copilot para o projeto SpeedClip com boas práticas de Angular/NestJS.

## Contexto
- Produto: SpeedClip (V1 → V2). Domínio: `Videos`, `Cuts`, `Subtitles`, `Presets`, `Exports`, `Users`, `Plans/Usage`.
- Referências obrigatórias: `../../DOCS/sppedclip-context-app.md`.
- Escopo de escrita: `speedclip-web/src/**`, `speedclip-web/src/styles/**`, `DOCS/**`. Não alterar fora disso.

## Regras de código
- Sempre TypeScript. Angular SPA com módulos por feature, Reactive Forms, RxJS.
- NestJS com Controllers finos, Services puros, DTOs com `class-validator`, Guards de auth/planos.
- Testes com Jest (unit). Incluir cenários feliz/erro com mocks simples.
- Banco: UUID, `created_at`/`updated_at`, índices (`user_id`, `video_id`, `status`).

## UI/Design (não negociar)
- Tokens: SCSS/CSS vars + TS; zero hardcode de cores.
- Glass somente no Topbar. Não aplicar em cards/listas/tabelas.
- Acessibilidade AA, Lighthouse ≥ 90, breakpoints 320/768/1024/1200\+.
- Temas `light`/`dark` com `data-theme` aplicado pelo `ThemeService`.
- Estilo: layout clean e minimalista; glassmorphism sutil conforme o contexto do produto.
    +  - Parâmetros: alpha ~6–8\%, `backdrop-filter: blur(8–12px)`, borda 1px sutil.
    +  - `.glass-card` deve existir em `src/styles/components/cards.scss`, mas não ser utilizada.

## Processamento/IA
- Jobs idempotentes, retries com backoff exponencial, timeouts, métricas.
- Whisper/Gemini com timeout, circuit breaker simples e tratamento de erros.

## Saída esperada
- Quando alterar código: entregar diffs por arquivo + justificativa breve.
- Ao criar scaffold: comandos `ng`/`nest` + estrutura de pastas.
- Evitar conteúdo fora do escopo aprovado.

## Não fazer
- Glass fora do Topbar.
- Sombras fortes/gradientes chamativos.
- Criar tokens fora de `src/styles/abstracts/tokens.scss` e `src/app/shared/constants/design-tokens.ts`.
