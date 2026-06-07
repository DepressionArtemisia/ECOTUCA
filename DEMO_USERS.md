# Demo Users

Senha para todos: `Demo@123456`.

| Nome | E-mail | Role | Status | Demonstrar |
| --- | --- | --- | --- | --- |
| Coordenacao ECOTUCA | admin@ecotuca.local | admin | approved | Aprovacoes, metricas, CSV e relatorios |
| Bruno Copque | bruno@ecotuca.local | super_admin | approved | Controle tecnico/operacional |
| Prof. Mariana Costa | professora@ecotuca.local | teacher | approved | Turmas, conteudos e forum |
| Lucas Oliveira | aluno@ecotuca.local | student | approved | Dashboard, trilhas, aula e certificados |
| Ana Beatriz Santos | pendente@ecotuca.local | student | pending | Estado de aprovacao pendente |
| Rafael Silva | guia@ecotuca.local | guide | approved | Perfil, roteiros e agenda |
| Camila Ferreira | turista@ecotuca.local | tourist | approved | Roteiros favoritos e reservas |

## Uso na reuniao
Abra `/demo`, use o `DemoUserSwitcher`, copie e-mail/senha quando precisar e clique em `Usar este perfil no modo demo`.

## Supabase
O frontend agora tenta Supabase Auth primeiro e cai para estes usuarios demo quando nao ha sessao real. O script `npm run supabase:create-demo-users` cria/atualiza Auth users reais depois que o schema estiver aplicado.

Fluxo seguro:

```bash
NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users -- --dry-run
NODE_OPTIONS=--use-system-ca npm run supabase:create-demo-users
```

O dry-run foi testado em 07/06/2026 e indicou que os 7 usuarios seriam criados. Nenhum usuario real foi criado nesta rodada.
