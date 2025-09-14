# Copilot Instructions \- SpeedClip

## Contexto
- Produto: SpeedClip \(V1 → V2\). Domínios: `Videos`, `Cuts`, `Subtitles`, `Presets`, `Exports`, `Users`, `Plans/Usage`.
- Referência obrigatória: `../../docs/speedclip-context-app.md`.
- Escopo de escrita: `speedclip-web/src/**`, `speedclip-web/src/styles/**`, `docs/**`. Não alterar 
  nada fora do escopo.

## Prioridades
1. Economia de recursos \(backend, processamento de vídeo e IA\)
2. Performance \(lazy load, streaming eficiente, menos requests\)
3. Legibilidade/manutenção \(código limpo, modular, comentado\)
4. Boas práticas \(segurança, testes, DTOs validados, erros e logs\)
5. Sempre propor melhorias e trade\-offs

## Angular \(Web\)
- TypeScript estrito; SPA modular por feature; `ReactiveFormsModule`; RxJS.
- Preferir `ChangeDetectionStrategy.OnPush`, `trackBy`, `async` pipe e `inject\(\)`.
- Componentes claros e reutilizáveis; lazy routes; virtual scroll para listas grandes.
- Evitar libs pesadas; pedir aprovação antes de novas dependências.
- Testes unitários com Jest e Testing Library: casos feliz/erro com mocks simples.

## NestJS \(API\)
- Controllers finos; Services puros; DTOs com `class-validator`/`class-transformer`.
- Guards de auth e controle de planos/usage.
- Versionar API \(ex.: `/v1`\); contrato de erro padronizado `{ code, message, details }`.
- Cache \(ex.: Redis\); streaming; jobs com BullMQ \(idempotência, retries com backoff, timeout\).
- OpenAPI com `@nestjs/swagger`.

## Banco de Dados
- PostgreSQL com UUID e `created_at`/`updated_at`.
- Índices mínimos: `user_id`, `video_id`, `status`; `unique` quando aplicável.
- Migrations e seeds determinísticos.

## UI/Design
- Layout clean/minimalista. Tokens SCSS/TS; zero hardcode.
- Breakpoints: 320/768/1024/1200\+; Acessibilidade AA; Lighthouse ≥ 90.
- Temas `light`/`dark` via `data-theme` controlado por `ThemeService`.
- Glass somente no Topbar \(alpha 6–8\%, `backdrop-filter: blur(8–12px)`, borda 1px sutil\).
- `.glass-card` deve existir em `src/styles/components/cards.scss`, mas não ser utilizada.

## IA/Processamento
- Whisper/Gemini para transcrição/legendas com timeout e circuit breaker simples.
- Processar somente o necessário; cachear e reutilizar resultados.
- Jobs idempotentes, retries com backoff exponencial, timeouts e métricas.

## Segurança
- Validar variáveis de ambiente; CORS configurado; rate limit.
- Sanitizar HTML/legendas \(XSS\); limites de upload; verificação de MIME.
- Segredos só via `ENV`; nunca logar dados sensíveis.

## Observabilidade/Custos
- Logger estruturado \(pino\) com `requestId`; métricas Prometheus; tracing opcional \(OTel\); Sentry para erros.
- Medir custo por job/transcrição; registrar tempo, tokens e cache hits.

## Formato de resposta do Copilot
- Idioma: pt\-BR. Tom curto e impessoal.
- Para alterações de código: entregar `diff` por arquivo \+ justificativa breve \(≤ 3 linhas\).
- Ao gerar código: explicar brevemente e depois um único bloco de código com linguagem; nomes de arquivos e caminhos sempre entre aspas simples \(ex.: `'src/app/feature/x.ts'`\).
- Nunca modificar arquivos fora do escopo definido; solicitar aprovação para instalar dependências.
- Se faltar informação, fazer a menor suposição possível e marcar `TODO:`.

## Não fazer
- Glass fora do Topbar.
- Sombras fortes/gradientes chamativos.
- Criar tokens fora de `src/styles/abstracts/tokens.scss` e `src/app/shared/constants/design-tokens.ts`.
