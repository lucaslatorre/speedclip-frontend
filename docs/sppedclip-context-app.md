Objetivo:
Crie uma página de Upload (URL do YouTube apenas) para o projeto SpeedClip. Gere 4 arquivos: TypeScript, HTML, SCSS e spec (teste unitário). Siga o estilo do projeto e as restrições abaixo.

Requisitos gerais (obrigatórios)
- Linguagem: TypeScript + Angular (Standalone component).
- Use `ChangeDetectionStrategy.OnPush`.
- Componente standalone com imports mínimos: `CommonModule`, `ReactiveFormsModule`, `RouterModule` se necessário.
- Nome do componente / arquivos:
    - 'src/app/features/upload/upload-page.component.ts'
    - 'src/app/features/upload/upload-page.component.html'
    - 'src/app/features/upload/upload-page.component.scss'
    - 'src/app/features/upload/upload-page.component.spec.ts'
- Use o serviço mock já existente: `ApiMockService` com método `addVideoFromUrl(url: string, editBefore?: boolean)` que retorna `{ id: string }` via subscribe.
- Ao submeter com sucesso navegue para `['/editor', id]`. Se o formulário tem `editBefore` true, navegue com query param `?edit=true`.
- Formulário reativo: campo `url` (string) e `editBefore` (boolean). Validação:
    - Campo `url` required.
    - Validador custom para detectar URLs YouTube válidas (suportar domínios comuns: `youtu.be/ID`, `youtube.com/watch?v=ID`, `youtube.com/shorts/ID`). Extraia ID e valide tamanho 11 (quando aplicável).
    - Se o campo `url` é inválido, mostre mensagem de erro acessível.
- Estado visual:
    - Suporte a estados: idle / pending / success / error. Mostrar loader no botão quando pending.
    - Exibir mensagens acessíveis via `role="status"`/`aria-live="polite"`.
- Responsividade e layout:
    - Minimalista, moderno, clean.
    - Quando tela larga (>= 1200px) o formulário fica dentro de um card que ocupa largura total disponível com um max-width confortável (`--container-max` já existe) — instruir uso de `max-width: var(--container-max)` e `width: 100%`.
    - Em telas pequenas o card é centralizado com padding.
    - Use apenas um card (a tela tem só o botão + input). Não gerar múltiplos cards.
    - Use variáveis CSS do projeto: `--spacing-*`, `--radius-card`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--glass-bg`, `--glass-blur` etc.
    - Forneça classes utilitárias: `.glass-card` (usar glass effect sutil), `.muted`, `.actions`.
- Acessibilidade:
    - Labels vinculadas (`for` + `id`), `aria-describedby` para erros, `aria-invalid` quando inválido.
    - Botões com `aria-label` claros.
- Testes unitários:
    - Gerar spec simples usando TestBed compatível com projeto (Standalone component import).
    - Mocks para `Router` e `ApiMockService`.
    - Testes: validação de URL inválida aciona erro; submissão de URL válida chama `ApiMockService` e navega para `/editor/:id`.
- Boas práticas:
    - Evitar magic numbers no TS; extrair regex/constantes no topo do arquivo.
    - Comentários curtos explicando trechos.
    - Limpeza: unsubscribes via `takeUntil`/`destroyRef` ou `signal` se aplicável; mas aceitar `subscribe` simples no mock com cuidado (preferir `first()`/`take(1)`).
    - Não usar pacotes externos de UI.
    - Manter estilo visual alinhado com tokens.

Conteúdo dos arquivos (detalhes esperados):
1) 'src/app/features/upload/upload-page.component.ts'
- Component decorator com `standalone: true`, `imports: [CommonModule, ReactiveFormsModule, RouterModule]`.
- `changeDetection: ChangeDetectionStrategy.OnPush`.
- Reactive Form `form = this.fb.group({ url: ['', [Validators.required, youtubeUrlValidator]], editBefore: [false] })`.
- Função `submitUrl()` que:
    - valida form, marca erros quando inválido,
    - extrai videoId usando util `extractYoutubeId(url)`,
    - seta `status = { kind: 'pending' }`,
    - chama `this.api.addVideoFromUrl(url, editBefore).pipe(take(1)).subscribe(...)`,
    - em sucesso faz `router.navigate(['/editor', id], { queryParams: editBefore ? { edit: 'true' } : {} })` e seta status success,
    - em erro seta status error.
- Export útil: `youtubeUrlValidator` e `extractYoutubeId` para testes.

2) 'src/app/features/upload/upload-page.component.html'
- Estrutura:
    - `<section class="upload-page">` com container central.
    - `<form [formGroup]="form" (ngSubmit)="submitUrl()" aria-labelledby="upload-title">`
    - Título `<h1 id="upload-title">Enviar vídeo (YouTube URL)</h1>`
    - Campo input com placeholder, aria, ícone opcional (inline SVG), descrição `small` com classe `.muted`.
    - Checkbox `editBefore` com label.
    - Botão submit com estado `disabled` e loader (spinner CSS simples) quando pending.
    - Área de status com `role="status" aria-live="polite"` mostrando erros/sucesso.
- Use classes que serão estilizadas em SCSS: `.glass-card`, `.form-row`, `.input`, `.actions`, `.status`.

3) 'src/app/features/upload/upload-page.component.scss'
- Use CSS vars do projeto. Exemplo:
    - `.upload-page { padding-block: var(--spacing-48); display: flex; justify-content: center; }`
    - `.glass-card { width: 100%; max-width: var(--container-max); background: var(--glass-bg); backdrop-filter: blur(var(--glass-blur)); border-radius: var(--radius-card); padding: var(--spacing-24); box-shadow: var(--shadow-sm); border: 1px solid var(--glass-border); }`
    - `.form-row` com grid responsivo (`grid-template-columns: 1fr auto` em desktop; stack em mobile).
    - Estilos do botão com `--btn-bg`, `--btn-text` e `--btn-gradient-*`.
    - Spinner CSS pequeno (anim keyframes).
- Marcar no SCSS qualquer valor fixo que "deveria" ser variável com comentário (mas cumprir restrição de chumbar `radius-card`? A instrução pedía chumbar valores fixos em scss que poderiam ser variáveis — nesse caso mantenha uso de vars quando possível; se necessário chumbar um px usado isoladamente, documente).

4) 'src/app/features/upload/upload-page.component.spec.ts'
- TestBed que importa `UploadPageComponent` standalone, `ReactiveFormsModule`.
- Mocks:
    - RouterStub com `navigate = jasmine.createSpy('navigate')`.
    - ApiMockStub `addVideoFromUrl = (u: string) => of({ id: 'vid1' })` (usar `of()` do rxjs).
- Tests:
    - Validação: setValue('xxx') -> submit -> expect status kind 'error'.
    - Submissão: set a valid youtube url -> submit -> expect router.navigate called with ['/editor', 'vid1'] and queryParams when editBefore true.
- Garantir teardown e limpar spies.

Observações de UX e design (use no prompt para agent gerar UI):
- Minimalista: tipografia espaçada, contraste suave, espaços amplos.
- Um único card ocupa largura total em telas grandes com `max-width` — isso cria sensação de página ampla e moderna.
- Não gerar excesso de elementos; foco em single input + CTA.
- Inclusão de micro‑interações: hover no botão, foco visível (outline com `--color-accent`), transições curtas (`--transition-fast`).

Instrução final ao Agent:
- "Gere os quatro arquivos exatos acima com código pronto para colar no projeto SpeedClip. Use somente API mock e Router stub nos testes. Comente partes importantes. Não adicione dependências externas. Garanta ChangeDetectionStrategy.OnPush. Valide formatos YouTube. Use CSS vars existentes. Seja conciso, limpo e modular."
