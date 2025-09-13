🎬 SpeedClip – Resumo do App
SpeedClip é uma plataforma SaaS que transforma vídeos longos (upload direto ou URL do YouTube) em cortes curtos prontos para redes sociais, com legendas editáveis e exportação em diferentes formatos. O produto atende criadores de conteúdo, podcasters, youtubers e social media managers, oferecendo rapidez, flexibilidade e edição visual de vídeos.

V1 – MVP: Edição manual + legendas

Objetivo: Validar o produto, entregar valor imediato e reduzir custos sem IA.
Fluxo do usuário:
1. Login/Cadastro
    * Dashboard com histórico de vídeos e cortes.
    * Planos grátis (limite de minutos) e pagos.
2. Upload/Input
    * Upload de vídeo ou colar URL do YouTube.
    * Opção: Editar antes de processar.
    * Validação de formato e tamanho.
3. Edição manual de vídeos
    * Usuário pode duplicar vídeos para criar múltiplos cortes, ajustando início/fim de cada clone.
    * Remove trechos indesejados.
4. Legendas
    * Adição manual ou via API de transcrição (Whisper).
    * Aplicação de presets de estilo (TikTok, Instagram, Minimal).
5. Preview & Exportação
    * Escolha de formato (9:16, 1:1, 16:9) e resolução (720p, 1080p).
    * Exportação de cortes individuais ou em batch.

V2 – IA automática de cortes
Objetivo: Entregar experiência premium com cortes inteligentes baseados em áudio, vídeo e relevância do discurso.
Novidades em relação à V1:
* Processamento IA
    * Identificação automática dos melhores trechos (picos de áudio, mudanças de cena, relevância do discurso).
    * Sugestão de múltiplos cortes curtos prontos para redes sociais.
* Integração de legendas automáticas multilíngues
    * Whisper ou Gemini Pro Speech → gera legendas precisas e sincronizadas.
* Edição visual final
    * Usuário ainda pode ajustar manualmente os cortes sugeridos pela IA.
    * Mantém a opção de aplicar presets de legendas e exportar múltiplos formatos.

Stack tecnológica (V1 e V2)
* Frontend: Angular (SPA, Reactive Forms, RxJS, UI minimalista + glassmorphism)
* Backend: Node.js + NestJS (Controllers → Services → Modules, DTOs, Guards)
* Banco: PostgreSQL (migrations, preferir Supabase no MVP)
* Processamento de vídeo: FFmpeg
* IA: Whisper API / Gemini Pro Speech, heurísticas + IA para cortes automáticos (V2)
* Infraestrutura: AWS ou GCP (armazenamento de vídeos, fila de processamento, Lambda/Fargate)

Benefícios do fluxo em etapas (V1 → V2)
* Rápido e barato no início: MVP sem IA reduz custos e permite validar demanda.
* Controle total para o usuário: duplicação de vídeos e cortes manuais simulam comportamento da IA.
* Escalável e futurista: V2 adiciona IA para cortes automáticos, aumentando valor percebido e potencial de monetização.
