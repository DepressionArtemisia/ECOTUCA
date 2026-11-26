# Operação do ECOTUCA

## Entrega de versões

O repositório é `DepressionArtemisia/ECOTUCA`. A VPS usa o endereço temporário `https://srv2201668.hstgr.cloud` até o domínio definitivo. A revisão pública pode ser conferida em `/api/health`.

1. Atualize `main` local com `git fetch origin`. Preserve alterações em andamento e crie uma branch a partir de `origin/main`.
2. Faça commits por assunto, rode `npm ci`, `npm run lint` e `npm run build`, e abra um pull request.
3. Confirme a execução de **Validar** antes de integrar. A entrada em `main` dispara a publicação na VPS.
4. Verifique o job **Publicar na VPS** e compare o campo `release` de `/api/health` com o SHA da execução. Teste a tela afetada.
5. Para repetir a publicação da `main` atual, use `gh workflow run deploy.yml --ref main --repo DepressionArtemisia/ECOTUCA` e acompanhe com `gh run watch`.

O workflow usa o ambiente GitHub `vps`, limitado à branch `main`. A chave está no secret `ECOTUCA_DEPLOY_SSH_KEY`. As variáveis `ECOTUCA_DEPLOY_HOST` e `ECOTUCA_DEPLOY_KNOWN_HOST` fixam o destino e a identidade SSH. A conta SSH da automação aceita apenas o comando de release. Revisões que ficaram para trás enquanto eram validadas são ignoradas. O servidor confere o arquivo recebido, monta uma imagem Next.js por commit, testa o próximo slot e só troca o tráfego quando o candidato responde. O deploy Git automático da Vercel está desativado para este repositório. O domínio anterior é independente da VPS.

Para o Treyar e outras IAs, o acesso normal é pelo Git e pelo GitHub Actions. O agente precisa de autorização no repositório para enviar mudanças ou disparar o workflow. Use `gh auth status` sem exibir tokens. Os arquivos e a operação diária dispensam acesso root.

## Operação da VPS

- Base da aplicação em `/opt/ecotuca`. Caddy recebe HTTPS e encaminha o tráfego ao slot ativo. O backend Supabase usa PostgreSQL 17, Auth, PostgREST e Storage. O gateway e os slots escutam apenas em loopback.
- Configuração administrativa fora do Git em `/opt/ecotuca/host.env`, `/opt/ecotuca/app-runtime.env` e `/opt/ecotuca/supabase/.env`. O acesso de operador nesta máquina usa a identidade SSH `~/.ssh/ecotuca_vps_admin_ed25519`. O SSH de root exige chave. Provisione uma chave para cada novo operador. Para Studio, abra o túnel `ssh -i ~/.ssh/ecotuca_vps_admin_ed25519 -N -L 8100:127.0.0.1:8100 root@187.77.40.205` e use `http://127.0.0.1:8100` com as credenciais do ambiente. O console do hPanel é o caminho de recuperação para perda de acesso por chave.
- Como operador autorizado na VPS, leia `/opt/ecotuca/current`, `/opt/ecotuca/previous` e `/opt/ecotuca/releases.log` para identificar os slots. `sudo /usr/local/sbin/ecotuca-release rollback` volta ao slot anterior disponível e testa a revisão pública. A reversão da aplicação não desfaz migrações de banco.
- O PostgreSQL/Storage segue o [roteiro de homologação](docs/production-platform/VPS_SUPABASE_REHEARSAL.md). O upstream Docker está fixado em `0ee83da5e5c5c406747ffc35d293c81c144ba61f` no bootstrap. Atualizações do stack e SQL seguem operação própria, com backup e verificação. O deploy da interface não executa migrações. Instalação ou atualização dos executáveis de operação em `/usr/local/sbin` e das units systemd é tarefa do operador na VPS.
- Backups locais em `/opt/ecotuca/backups`, com dump PostgreSQL, arquivo Storage, checksums e retenção de 14 dias. O timer `ecotuca-backup.timer` roda diariamente às 03h30 de Brasília. O dump foi restaurado em uma base descartável com o papel `supabase_admin`, que preserva os donos dos objetos. Para dados reais, configure cópia cifrada fora da VPS e valide a restauração dos arquivos e segredos em ambiente isolado.

## Domínio, contas e e-mail

A URL temporária usa HTTPS e marcação de não indexação. O modo da aplicação exige sessão e perfil aprovado. O registro público de contas Auth e o envio de inscrições reais estão desativados. Estudos, turmas e métricas ainda têm telas com dados de exemplo.

Com o domínio comprado, aponte o registro A para `187.77.40.205`. Atualize a configuração do Caddy, a URL pública e as URLs do Supabase Auth para o endereço definitivo. Recrie os serviços afetados e reconstrua o Next.js, pois as URLs públicas entram no build. Configure SMTP com remetente autorizado e confirme recuperação por `/nova-senha` antes da abertura de inscrições. Revise os termos e a proteção contra uso abusivo do formulário antes de ativar suas escritas.

Crie as contas operacionais no Supabase via acesso administrativo por túnel SSH. Vincule cada UUID de Auth ao seu perfil em `public.profiles` com o papel e status aprovados. Não integre contas de demonstração à base da VPS.

Referências oficiais do [Supabase autogerenciado](https://supabase.com/docs/guides/self-hosting/docker), do [HTTPS automático do Caddy](https://caddyserver.com/docs/automatic-https) e dos [ambientes do GitHub Actions](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments).
