
Contexto do produto:
- SaaS que corta vídeos longos em clipes curtos, com legendas e exportação.
- Fluxo V1: upload/URL → editor de cortes → exportação (com/sem legendas) → histórico.
- Fluxo V2 futuro: cortes sugeridos por IA.
  Stack principal:
- Frontend: Angular SPA (Reactive Forms, RxJS, UI minimalista + glass).
- Backend: Node.js + NestJS.
- Banco: PostgreSQL.
- Processamento: FFmpeg.
- IA: Whisper/Gemini (futuro).
- Cloud: AWS/GCP com storage, filas, Lambda/Fargate.


Padrões de código:
- TypeScript/Angular: ChangeDetectionStrategy.OnPush; RxJS com `takeUntil`/`destroyRef`; `async` pipe; componentes e serviços coesos; formulários reativos; acessibilidade ARIA; temas via CSS variables.
- NestJS: módulos coesos; DTOs com class‑validator/class‑transformer; Guards/Interceptors para auth, rate limit, logging; serviços sem lógica em controllers; DI correta.
- PostgreSQL: migrations idempotentes; índices para filtros/ordenação; evitar N+1; transações e níveis de isolamento adequados.
- FFmpeg: construir comandos de forma segura (lista de args, sem shell concat); validar parâmetros; limitar codecs/presets suportados; timeouts e limites de CPU/memória; processar em workers/filas.
- Cloud: uploads com URL pré‑assinada; objetos versionados e políticas de ciclo de vida; CDN para vídeos; jobs assíncronos em fila; segredos no Secret Manager; IaC.

Segurança:
- Autenticação e autorização por recurso; princípio do menor privilégio.
- Validação/normalização de entrada; sanitização contra injeções (SQL, shell, path traversal).
- CORS restrito; CSRF onde aplicável; headers de segurança; `color-scheme` e temas sem anti‑padrões de contraste.
- Rate limiting, circuit breaker e backoff; limites no FFmpeg e storage.
- Logs estruturados sem PII sensível; trilhas de auditoria.

Performance:
- Streaming e chunked upload; pré‑visualização progressiva.
- Paginação, busca indexada; cache em nível de consulta/resposta; CDN.
- Processamento assíncrono e paralelismo controlado; evitar cópias de vídeo; reuso de artefatos.
- Frontend: lazy‑loading, code‑splitting, imagens responsivas, evitar trabalho desnecessário de change detection.

Custos:
- Processar apenas cortes selecionados; evitar transcodificar o vídeo inteiro.
- Policies de ciclo de vida no storage (glacier/nearline); limpeza de temporários.
- Egress mínimo (usar CDN e regions adequadas); compressão.
- Ajustar filas/compute sob demanda (Fargate/Lambda/Spot) e tamanhos de instância.


Qualidade e testes:
- Unit: Jest (NestJS) e TestBed (Angular).
- Integração: banco em container e filas falsas; contratos HTTP.
- E2E: Playwright para fluxos principais (upload → cortes → exportação).
- Monitoração: métricas e traces (OpenTelemetry), logs estruturados, alertas por SLO.

Restrições:
- Não usar código de terceiros sem licença compatível; cite referências.
- Evitar “magic numbers”; externalizar configs (.env/ConfigModule).
- Manter respostas curtas; sem perguntas a menos que absolutamente necessário.

