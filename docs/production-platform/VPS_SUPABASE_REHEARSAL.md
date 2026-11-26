# Supabase na VPS e ensaio de acesso

## Instância em operação

A VPS ECOTUCA usa Supabase autogerenciado atrás do Caddy. O gateway fica em `127.0.0.1:8100` e a administração usa túnel SSH. Consulte [DEPLOY.md](../../DEPLOY.md) para o fluxo de Git e para o endereço temporário.

O script `deploy/smoke-vps.py` verifica Auth, Data API, aprovação auditada e isolamento de Storage com registros temporários. Ele deve ser executado na VPS por um operador e usa a configuração já provisionada. A entrega por SMTP e a recuperação de uma conta real são testes separados.

## Preparar o ambiente

1. Use uma instância Supabase separada para homologação, com PostgreSQL, Auth, Data API e Storage. A instalação na VPS pode seguir a [documentação oficial do Supabase com Docker](https://supabase.com/docs/guides/self-hosting/docker). Exponha o gateway por HTTPS e proteja a administração e o acesso direto ao PostgreSQL.
2. Configure as URLs HTTPS do site e do gateway, as chaves públicas e privadas, os segredos da pilha oficial e o SMTP do Auth. Inclua a URL exata do site com `/nova-senha` nas URLs de redirecionamento autorizadas. Configure também `ECOTUCA_CONTACT_EMAIL` com o endereço confirmado pela coordenação.
3. No repositório, execute `npm ci` e `npm run supabase:prepare-sql`. Revise `supabase/combined-apply.sql`, que reúne schema, RLS e Storage em uma transação. Aplique-o no banco isolado usando o editor SQL ou `psql -v ON_ERROR_STOP=1 -f supabase/combined-apply.sql` com uma conexão segura já configurada. Em um banco que já tenha regras, confira as policies instaladas e as permissões que possam ser somadas às deste projeto.
4. Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ACCESS_CONTROL_MODE=enforce` e `NEXT_PUBLIC_DISABLE_AUTH_FALLBACK=true` antes de `npm run build`. A chave `SUPABASE_SERVICE_ROLE_KEY` é de servidor. Mantenha `ENABLE_SUPABASE_SIGNUP_WRITES=false` até validar os textos institucionais, a operação e a proteção contra abuso de envios.
5. Inicie a aplicação com `npm run start` atrás do proxy HTTPS. Configure backup do PostgreSQL e do armazenamento de arquivos e ensaie a restauração no ambiente separado.

`seed.sql` e o script de contas de demonstração pertencem ao ambiente de teste. O SQL combinado da aplicação sai sem dados de exemplo.

## Ensaio do banco

Execute `supabase/rehearsal.sql` no ambiente descartável após o SQL combinado. O teste cria registros fictícios, alterna as identidades SQL e reverte a transação. Confere aula publicada, rascunho, status pendente, isolamento do progresso, escopo de Storage, permissão da coordenação, persistência da decisão, histórico de revisão e bloqueio de decisão repetida.

Neste checkout o ensaio passou em PostgreSQL via PGlite, com as funções de identidade e Storage compatíveis para o teste. Esse teste cobre as regras do banco. O ensaio na pilha Supabase completa precisa confirmar os serviços HTTP, tokens, envio de e-mail e persistência dos arquivos.

## Contas e roteiro de homologação

- Crie contas fictícias pelo Auth da instância isolada. Vincule cada `public.profiles.id` ao UUID da conta em `auth.users`. Use perfis `admin`, `teacher` e `student`, incluindo um aluno `pending`. O primeiro administrador deve ser provisionado pelo responsável pela instância. Usuários comuns só alteram campos pessoais permitidos.
- Entre como aluno pendente e confira a tela de situação. Com a conta administrativa, aprove o perfil, confira o registro em `access_review_events` e entre novamente como aluno para abrir seu painel. Confira que a conta não acessa a fila nem o painel da coordenação.
- Na homologação com SMTP, solicite recuperação, abra o e-mail no mesmo navegador e defina nova senha. Confirme que a senha nova funciona. Confira link expirado e reenvio.
- Em homologação isolada, habilite as escritas, envie uma inscrição fictícia e confira o protocolo e a fila. Aprove e confirme que a decisão fica registrada. Aprovar a inscrição e provisionar a conta Auth são operações separadas. Após a decisão, a coordenação cria/convida a conta correta no Auth e vincula o perfil. A interface não envia convite automático.
- Envie um PDF fictício na área de professor. Confira o arquivo no prefixo do UUID da conta, a leitura autorizada e a ausência de permissão em outro perfil. A interface recebe material para revisão. A publicação de aula e a associação do PDF à turma ainda precisam ser integradas.
- Confirme conteúdo próprio para as trilhas, vínculos de turma, entregas, certificados e métricas. Os painéis têm telas navegáveis e dados de exemplo para esses módulos.

## Limites do modo aplicado

`AppAccessGuard` é a proteção de navegação na interface. Os dados reais de perfil, inscrições, diretório, revisão e arquivos usam autorização por Auth, RLS e permissões do banco. Serviços futuros que busquem dados privados no servidor precisam validar a sessão e o papel antes de serializar a resposta.

O ensaio inicial de redesign foi local. A publicação e o estado da VPS são acompanhados pelo workflow e pelo runbook.
