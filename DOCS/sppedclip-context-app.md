🎬 SpeedClip – Resumo do App (Atualizado) SpeedClip é uma plataforma SaaS que transforma vídeos longos (upload direto ou URL do YouTube) em cortes curtos prontos para redes sociais, com legendas editáveis e exportação em diferentes formatos. O produto atende criadores de conteúdo, podcasters, youtubers e social media managers, oferecendo rapidez, flexibilidade e edição visual de vídeos.

V1 – MVP: Edição manual + legendas opcionais
Objetivo: Validar o produto, entregar valor imediato e reduzir custos sem IA.
Fluxo do usuário (atualizado com cortes embutidos do YouTube e legenda opcional):
1. Login/Cadastro
    * Dashboard com histórico de vídeos e cortes. 
    * Planos grátis (limite de minutos ou créditos) e pagos. 
2. Upload/Input
    * Upload de vídeo ou colar URL do YouTube. 
    * Validação de formato e tamanho. 
    * Editor embutido do YouTube:
        * O usuário marca cortes diretamente na barra de tempo (sem gerar vídeo ainda, custo quase zero). 
        * Permite múltiplos cortes, remoção de trechos indesejados. 
3. Legendas (opcional)
    * Botão “Gerar legenda” → chama IA (Whisper ou Gemini Pro Speech). 
    * Usuário revisa ou edita legendas no editor se quiser. 
    * Se não gerar legenda: vai direto para exportação/publicação. 
4. Preview & Exportação
    * Escolha de formato (9:16, 1:1, 16:9) e resolução (720p, 1080p). 
    * Exportação de cortes individuais ou em batch. 
    * Publicação direta nas redes sociais (Instagram/TikTok) quando disponível. 
Benefício dessa abordagem:
* MVP barato e escalável → cortes “virtually” via YouTube sem gastar processamento pesado. 
* O usuário tem controle sobre cortes e pode decidir se quer legenda ou não. 
* Legendas geram custo só quando realmente são processadas, mantendo lucro e escalabilidade. 

V2 – IA automática de cortes
Objetivo: Entregar experiência premium com cortes inteligentes baseados em áudio, vídeo e relevância do discurso.
Novidades em relação à V1:
* Processamento IA: identificação automática dos melhores trechos (picos de áudio, mudanças de cena, relevância do discurso). 
* Sugestão de múltiplos cortes curtos prontos para redes sociais. 
* Legendas multilíngues automáticas via Whisper ou Gemini Pro Speech. 
* Usuário ainda pode ajustar manualmente os cortes sugeridos pela IA. 
* Mantém presets de legendas e exportação múltipla. 

Stack tecnológica (V1 e V2)
* Frontend: Angular (SPA, Reactive Forms, RxJS, UI minimalista + glassmorphism) 
* Backend: Node.js + NestJS (Controllers → Services → Modules, DTOs, Guards) 
* Banco: PostgreSQL (migrations, preferir Supabase no MVP) 
* Processamento de vídeo: FFmpeg 
* IA: Whisper API / Gemini Pro Speech, heurísticas + IA para cortes automáticos (V2) 
* Infraestrutura: AWS ou GCP (armazenamento de vídeos, fila de processamento, Lambda/Fargate) 

Benefícios do fluxo em etapas (V1 → V2)
* Rápido e barato no início: MVP sem IA reduz custos e permite validar demanda. 
* Controle total para o usuário: duplicação de vídeos, cortes manuais e legenda opcional simulam comportamento da IA. 
* Escalável e futurista: V2 adiciona IA para cortes automáticos, aumentando valor percebido e potencial de monetização. 
* Experiência de usuário otimizada: fluxo claro — cortes primeiro, legenda opcional, depois exportação/publicação, evitando confusão. 
