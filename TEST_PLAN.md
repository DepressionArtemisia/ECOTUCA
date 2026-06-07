# Test Plan

## Commands
- [x] `npm run lint`
- [x] `npm run build`
- [x] `npm run supabase:prepare-sql`
- [x] `NODE_OPTIONS=--use-system-ca npm run supabase:check`
- [x] `NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run`
- [x] Versionable secret scan with `rg`

## Round 4 Freeze Commands
- [x] `npm run lint`
- [x] `npm run build`
- [x] Versionable secret scan with `rg`

## Round 5 Premium Design Commands
- [x] `npm run lint`
- [x] `npm run build`
- [x] Browser responsive pass after design updates

## Browser Routes
- [x] `/`
- [x] `/demo`
- [x] `/demo/status`
- [x] `/demo-mobile`
- [x] `/login`
- [x] `/roteiros`
- [x] `/roteiros/serra-da-misericordia`
- [x] `/guias/rafael-silva`
- [x] `/app/aluno`
- [x] `/app/aluno/trilhas`
- [x] `/app/aluno/aulas/aula-guia-01`
- [x] `/app/admin`
- [x] `/app/admin/aprovacoes`
- [x] `/app/professor`
- [x] `/app/guia`
- [x] `/app/turista`
- [x] `/app/professor`
- [x] `/app/guia`
- [x] `/app/admin/aprovacoes`

## Mobile
- [x] Testar viewport 390x844.
- [x] Verificar sem overflow horizontal nas telas principais.
- [x] Conferir bottom nav em areas internas.
- [x] Conferir `PhoneMockup` e alternancia de telas.

## Round 5 Responsive Checklist
- [x] 320px sem overflow horizontal nas rotas criticas.
- [x] 390px sem overflow horizontal nas rotas criticas.
- [x] 768px com cards empilhando corretamente.
- [x] 1024px com sidebars/conteudo sem esmagamento.
- [x] 1440px com home/demo/roteiros usando bem o espaco.
- [x] Logo legivel em tema claro.
- [x] Logo legivel em tema escuro.
- [x] Demo mobile cabendo na tela compartilhada.
- [x] Formulario de roteiro com foco/contraste adequados.
- [x] Player com progresso e controles visiveis.

## Round 5 Browser Checks
- [x] Desktop 1440: `/`, `/demo`, `/demo/status`, `/demo-mobile`, `/login`, `/roteiros`, `/roteiros/serra-da-misericordia`, `/guias/rafael-silva`, `/app/aluno`, `/app/aluno/trilhas`, `/app/aluno/aulas/aula-guia-01`, `/app/professor`, `/app/professor/conteudos`, `/app/guia`, `/app/turista`, `/app/admin`, `/app/admin/aprovacoes`, `/app/admin/metricas`.
- [x] Mobile 390: rotas criticas sem overflow e sem imagens quebradas.
- [x] Mobile 320: rotas criticas sem overflow e sem imagens quebradas apos ajuste de logo/display/email.
- [x] Login apresentacao: `/login` redirecionou para `/app/aluno`.
- [x] Logout: botao `Sair` voltou para `/demo`.
- [x] Tema claro/escuro: botao `Alternar tema` alternou a classe `dark`.
- [x] Roteiro: `Enviar interesse` confirmou solicitacao.
- [x] Player: `Iniciar aula` mudou para `Continuar de onde parei`.

## Video Resume
1. Entrar em `/app/aluno/aulas/aula-guia-01`.
2. Clicar `Reiniciar`.
3. Clicar `Play`.
4. Sair para `/demo`.
5. Voltar para a aula.
6. Confirmar `Voce parou em 00:10` ou tempo salvo.
7. Confirmar botao `Continuar de onde parei`.

## Demo
- [x] Trocar usuario no `DemoUserSwitcher`.
- [x] Copiar e-mail.
- [x] Copiar senha.
- [x] Usar perfil no modo demo.
- [x] Ver indicador de perfil/role/status nas areas internas.

## Supabase
- [x] Variaveis presentes sem imprimir valores.
- [x] Auth Admin acessivel com CA do sistema.
- [x] `profiles` acessivel na checagem segura.
- [x] Script de usuarios testado em `--dry-run`.
- [x] Login frontend tenta Supabase Auth e cai para demo.
- [x] Video progress salva localStorage e tenta Supabase para IDs UUID reais.
- [x] Formulario de roteiro tenta Supabase e cai para localStorage.
- [x] Admin aprovacoes tenta Supabase e cai para simulacao.
- [x] Upload professor tenta Storage e cai para simulacao.
- [ ] SQL aplicado manualmente no Supabase.
- [ ] Auth users reais criados.

## Round 3 Manual Browser Checks
- [x] Abrir `/demo/status` e confirmar que nao mostra chaves.
- [x] Login demo aluno em `/login` deve ir para `/app/aluno`.
- [x] Login demo admin em `/login` deve ir para `/app/admin`.
- [x] Login demo pendente deve ir para `/app/aguardando-aprovacao`.
- [x] Logout deve limpar sessao real/demo e voltar para `/demo`.
- [x] Enviar interesse em `/roteiros/serra-da-misericordia` e confirmar badge Supabase/localStorage.
- [x] Abrir `/app/turista/reservas` e ver a reserva local ou mock.
- [x] Aprovar/rejeitar em `/app/admin/aprovacoes` sem quebrar a UI.
- [x] Viewport 390x844 sem overflow em `/demo`, `/demo/status`, `/app/aluno`, `/roteiros/serra-da-misericordia`, `/app/admin/aprovacoes` e `/demo-mobile`.

## Round 4 Freeze Checks
- [x] `/demo` mostra `Comece por aqui`.
- [x] `/demo` mostra `Roteiro recomendado`.
- [x] `/demo` mostra botao `Resetar demo`.
- [x] Reset local da apresentacao foi testado e exibiu confirmacao.
- [x] Formulario de roteiro confirmou `Solicitacao recebida` e `Salvo para apresentacao`.
- [x] `/demo-mobile` alternou para a tela `Guia`.
- [x] Textos visiveis principais nao mostram `Mock`, `LocalStorage`, `fallback` ou `upload mock` fora do painel tecnico.
- [x] Mobile 390x844 sem overflow em `/demo`, `/demo/status`, `/demo-mobile`, `/`, `/roteiros/serra-da-misericordia`, `/app/aluno`, `/app/aluno/aulas/aula-guia-01` e `/app/admin/aprovacoes`.

## Caveats
Persistencia 100% real ainda depende de SQL aplicado, usuarios Auth reais e IDs UUID reais de aulas/roteiros.
