# STEP 11 - Round 2 Consolidation

## 1. O que foi melhorado desde a rodada anterior
- `/demo` virou central de apresentacao com cards explicativos, usuarios sugeridos, roteiro de 12 passos e tela cheia.
- `DemoUserSwitcher` mostra e-mail/senha, copia cada campo e salva o perfil no modo demo.
- Shells internos mostram perfil atual, role, status, modo `Demo` e logout.
- Area do aluno recebeu jornada visual, continue card, atividades recentes, mais aulas e certificado visual.
- Player salva progresso por usuario/aula em `localStorage`.
- Roteiros receberam busca, filtros, galeria e formulario de interesse com confirmacao.
- Admin ganhou mais metricas, graficos, CSV e aprovacao simulada.
- Professor, guia e turista ficaram mais apresentaveis.
- Supabase ganhou scripts e guia para Bruno.

## 2. O que agora esta mais pronto para reuniao
Demo guiada, mobile mockup, aluno, admin, roteiros e roteiro de fala.

## 3. O que foi conectado ao Supabase
Conexao foi testada com sucesso usando `NODE_OPTIONS=--use-system-ca npm run supabase:check`. Auth Admin e tabela `profiles` responderam. Nenhuma mutacao foi executada.

## 4. O que continua mockado
Auth frontend, reservas, progresso no banco, uploads, metricas e aprovacoes reais.

## 5. Usuarios Auth reais
Nao foram criados automaticamente. O script `npm run supabase:create-demo-users` esta pronto, mas deve ser executado depois do schema.

## 6. SQL
Nao foi aplicado automaticamente. Foi gerado `supabase/combined-apply.sql`.

## 7. Como testar a reuniao no Chrome
Rodar `npm run dev -- -p 3020` e abrir `http://localhost:3020/demo`.

## 8. Rota principal
`http://localhost:3020/demo`.

## 9. Usuarios e senhas
Todos usam `Demo@123456`: `admin@ecotuca.local`, `bruno@ecotuca.local`, `professora@ecotuca.local`, `aluno@ecotuca.local`, `pendente@ecotuca.local`, `guia@ecotuca.local`, `turista@ecotuca.local`.

## 10. Fluxo recomendado
Home -> Demo Mobile -> Roteiro -> Interesse -> Aluno -> Aula/video -> Professor -> Guia -> Admin -> Impacto/Supabase.

## 11. Testes executados
Lint, build, Supabase check, SQL prepare, browser routes, player resume.

## 12. Resultado de lint/build
`npm run lint` passou. `npm run build` passou com 34 rotas.

## 13. Bugs encontrados
Dev server precisou reiniciar apos build por cache de `.next`. Player foi ajustado para salvar progresso imediatamente ao iniciar.

## 14. Riscos
Vulnerabilidades moderadas em `next`/`postcss`; logos placeholders; videos placeholders; Supabase real ainda pendente.

## 15. Proximas acoes antes da reuniao
Trocar assets oficiais se enviados, abrir `/demo`, testar fluxo do aluno e confirmar tela cheia no Chrome.

## 16. Proximo prompt recomendado
Conectar Supabase Auth real, `lesson_progress` e `route_bookings`, preservando fallback mock.
