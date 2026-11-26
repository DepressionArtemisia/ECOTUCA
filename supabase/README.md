# Supabase ECOTUCA

Para instalação na VPS, configuração de chaves, contas e testes, use [o roteiro de homologação](../docs/production-platform/VPS_SUPABASE_REHEARSAL.md).

- `schema.sql` cria as tabelas e os índices da aplicação.
- `rls.sql` define as permissões por perfil, leitura do conteúdo publicado e as funções de revisão auditada.
- `storage.sql` prepara os buckets e o controle por papel e prefixo do usuário.
- `npm run supabase:prepare-sql` gera `combined-apply.sql` com os três arquivos, em uma transação.
- `rehearsal.sql` confere as regras com registros fictícios e rollback em homologação.
- `seed.sql` contém exemplos para um banco de demonstração. Depende dos IDs de Auth correspondentes e deve ser tratado separadamente.

A chave de serviço fica no servidor. Ao usar o modo de produção, configure também o redirecionamento do Auth para `/nova-senha` e teste SMTP antes de abrir inscrições.
