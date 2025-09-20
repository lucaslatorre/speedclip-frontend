Você é o Agent do GitHub Copilot. Projeto: SpeedClip (frontend Angular). Objetivo: gerar uma página de Upload onde o usuário cola SOMENTE a URL do YouTube. Gere código pronto para integrar ao repositório, respeitando o estilo, tokens e padrões do projeto.

Regras gerais
- Componentes Angular standalone, ChangeDetectionStrategy.OnPush.
- Injeções via `inject()` (não construtor).
- Usar RxJS com `take(1)` para subscribes.
- Seguir tokens CSS em `src/styles/abstracts/tokens.scss` (usar --color-*, --spacing-*, --radius-*, --transition-*, --btn-* etc).
- Nome dos arquivos a criar/alterar:
  - src/app/features/upload/upload-page.component.ts
  - src/app/features/upload/upload-page.component.html
  - src/app/features/upload/upload-page.component.scss
  - src/app/features/upload/upload-page.component.spec.ts
- Sugerir trecho de rota (não modificar arquivo global):
  - { path: 'upload', component: UploadPageComponent }

Funcionalidade esperada
1. Formulário reativo com:
  - input text `url` (placeholder exemplo: "https://youtu.be/...." / "https://www.youtube.com/watch?v=...").
  - checkbox `editBefore` (label: Editar antes).
  - botão primário `Enviar URL` (usa variáveis --btn-bg / --btn-text; desabilitado em loading).
2. Validação:
  - Validator custom robusto p/ YouTube: aceite youtube.com/watch?v=ID e youtu.be/ID; ID tem 11 chars.
  - Mensagem de erro inline e acessível (aria-describedby).
3. Fluxo submit:
  - Validar; se inválido mostrar erro sem chamar API.
  - Chamar ApiMockService.addVideoFromUrl(url). Usar `pipe(take(1))` e subscribe.
  - Mostre estado loading com role="status" (texto curto).
  - Em sucesso: navegar via Router (inject) para `/editor/:id` se editBefore=true, senão `/`.
  - Em erro: mostrar mensagem de erro inline.
4. Preview:
  - Quando URL válida, mostrar thumbnail pública: `https://img.youtube.com/vi/:id/hqdefault.jpg`.
  - Preview responsivo: em mobile full-width acima do form; em desktop lado a lado.
5. Acessibilidade:
  - Labels associados, aria-describedby para erro, aria-live ou role="status" para feedback.
  - Foco visível e indicação de erro para leitores de tela.
6. CSS/Design:
  - Minimalista, moderno, alinhado ao tema: usar variáveis CSS do projeto.
  - Layout mobile-first; grid responsivo (mobile: stack, desktop: duas colunas).
  - Botões com transições `--transition-normal`, hover usando `--btn-shadow-hover` e `--hover-opacity`.
  - Usar classes BEM-like: `.upload-page`, `.upload-page__form`, `.upload-page__preview`, etc.
  - Evitar inline styles; chumbar valores razoáveis quando necessário (ex.: largura máxima 720px).
8. Coding style:
  - Comentários sucintos explicando trechos-chave.
  - Evitar código morto.
  - Manter ChangeDetection OnPush e chamar `cdr.markForCheck()` quando alterar estado.
9. Segurança / validação:
  - Sanitizar input (trim) antes de validar; não executar ou inserir a URL em DOM sem escapamento.
  - Não usar APIs externas, usar a APIMOckService fornecida.

Extras (pequenos exemplos e detalhes internos que o Agent deve seguir)
- Regex recomendada para extrair videoId:
  - `/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i`
- Getter público `thumbnailUrl` que retorna `string | null`.
- Metodo público `isUrlValid(value?: string | null): boolean` usado no template.
- Usar `ChangeDetectorRef` via `inject()` e `markForCheck()` após mudanças de estado.
- Mostrar role="img" e alt na thumbnail (alt="Thumbnail do vídeo").
- Todos os textos em pt-BR.

Formato de entrega do Agent
- Inclusão completa dos 4 arquivos citados, cada um com comentários.
- Snippet sugerido de rota no final.
- Pequena seção de testes (o `.spec.ts` completo).
- Respeitar estruturas OnPush e tokens CSS.

Fim do prompt.
