# VPS ECOTUCA e entrega pelo GitHub

Em 26/11/2026, a VPS passou a operar com Caddy, Next.js em Docker e Supabase autogerenciado. O Docker do Supabase usa a revisão fixada no bootstrap. A implantação inicial usou o endereço temporário da Hostinger com HTTPS e resposta não indexável.

- O GitHub Actions valida as alterações pelo PR e monta a revisão de `main` na VPS. O dado de verificação é o SHA em `/api/health`.
- O ensaio em PostgreSQL aplicou schema, políticas, buckets e revisão auditada. Auth por HTTPS, bloqueio de um aluno ao tentar aprovar, aprovação pela coordenação e isolamento de arquivo privado foram exercitados com dados descartáveis. Três contas de teste foram removidas ao final.
- O PostgreSQL, Studio e gateway de administração ficam em rede interna ou loopback. A conta de automação do GitHub aceita apenas o comando de release e não recebe sessão de terminal. O SSH de root foi validado com chave.
- Um backup foi gerado, os checksums conferidos e o dump restaurado em uma base descartável. A cópia externa cifrada e a restauração de uma pilha completa ainda precisam de um destino independente.
- O domínio definitivo, o SMTP e o cadastro aberto de usuários aguardam configuração e teste. O endereço temporário serve à homologação.

O procedimento para Treyar ou outro operador está em [DEPLOY.md](../../DEPLOY.md).
