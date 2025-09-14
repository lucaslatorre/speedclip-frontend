🎬 SpeedClip – Contexto do App

# Resumo
SpeedClip é um SaaS que transforma vídeos longos (upload direto ou URL do YouTube) em cortes curtos prontos para redes sociais, com legendas editáveis e exportação múltipla.
Focado em criadores de conteúdo, podcasters, youtubers e social media managers.

# Entidades/Domínio
- Videos: Upload e ingestão de vídeos (arquivo ou URL)
- Cuts: Segmentos de vídeo gerados pelo usuário ou IA
- Subtitles: Legendas automáticas ou editáveis
- Presets: Estilos de legenda (TikTok, Instagram, Minimal, Colorful)
- Exports: Renderização final, formatos, resolução
- Users: Cadastro e planos
- Plans/Usage: Limites de minutos, créditos e histórico

# Fluxo V1 – MVP (Atual)
1. Tela Inicial – Upload / URL
   - Campo para colar URL ou upload
   - Botão grande: “Começar Edição”
   - Se URL: mostra preview embed (não cortável)
2. Tela de Edição (Editor próprio do app)
   - Player streaming do backend → play, pause, avançar, retroceder
   - Timeline interativa → miniaturas + barras de duração
   - Ferramentas de corte:
      - Adicionar/remover cortes
      - Ajustar início/fim
      - Marcadores de precisão (frames)
3. Exportação
   - Sem legenda → Exportar cortes (MP4), download ou publicação
   - Com legenda → “Adicionar legendas (X créditos)”, backend processa cortes selecionados
      - Revisão opcional no editor de legendas com presets de estilo
4. Histórico
   - Lista de vídeos enviados
   - Download de cortes exportados
   - Consumo de créditos/minutos

# Fluxo V2 – IA automática de cortes (Futuro)
- IA identifica melhores trechos (áudio, vídeo, relevância)
- Sugestão de múltiplos cortes curtos
- Legendas multilíngues automáticas
- Ajuste manual de cortes sugeridos
- Mantém presets e exportação múltipla

# Stack Tecnológica (V1 e V2)
- Frontend: Angular SPA (Reactive Forms, RxJS, UI minimalista + glass)
- Backend: Node.js + NestJS (Controllers → Services → Modules → DTOs → Guards)
- Banco: PostgreSQL (migrations, UUIDs, índices)
- Processamento vídeo: FFmpeg
- IA: Whisper/Gemini, heurísticas + IA para cortes automáticos (V2)
- Infraestrutura: AWS/GCP (armazenamento, fila, Lambda/Fargate)

# Benefícios
- MVP rápido, barato e escalável
- Controle total ao usuário → duplicação de vídeos, cortes manuais
- Fluxo claro → cortes → legenda opcional → exportação/publicação
- Preparado para V2 → IA aumenta valor e monetização
- Economia de créditos → processa somente legendas do que for usado
- Streaming → performance e UX otimizada
