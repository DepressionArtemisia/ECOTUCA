# Redesign ECOTUCA e ensaio para VPS

Data de trabalho 24/11/2026

## Redesign aplicado

- Manual visual conferido nas 15 páginas. A direção reforça o Complexo do Alemão, a formação de jovens, o cuidado ambiental e as perspectivas de trabalho no turismo comunitário.
- Página inicial com composição editorial e foto documental creditada. Páginas institucionais, roteiros e inscrições explicam a jornada com linguagem voltada a quem vai participar.
- Identidade aplicada aos painéis de aluno, professor e coordenação. Navegação lateral em telas largas e menu do painel em telas menores. Temas claro e escuro compartilham espaçamento, componentes e hierarquia.
- Cartões, estados, campos, títulos, botões, gráficos, tabelas, áreas seguras, foco por teclado e movimento reduzido documentados em [Design system](../../DESIGN_SYSTEM.md).
- Texto em português revisado. Exemplos, inscrições registradas e confirmações locais são identificados no fluxo.
- Imagens do Complexo do Alemão e da Zona Norte vieram do acervo já creditado. Logos oficiais extraídos foram reutilizados. Archivo Black e DM Sans substituem temporariamente os arquivos de Troika e Lufga até existir licença de web.

## Falhas tratadas

- Menu interno ausente na coordenação em telas menores e navegação de perfis misturada em páginas compartilhadas.
- Links com botões aninhados, ações sem efeito no conteúdo de demonstração e confirmações que podiam sugerir gravação sem sucesso.
- Contraste de rótulos, duplicação visual, rascunho automático de dados pessoais, rotulagem de campos de grupo e títulos de trilha com largura maior que a tela.
- Login com perfil ausente era tratado como aluno aprovado. Supabase Auth agora exige perfil vinculado.
- Recuperação de senha ganhou solicitação e tela de redefinição. Aulas usam a posição do player em vez de contador fictício.
- Fila registra a decisão de inscrição ou perfil com permissão, histórico e proteção contra sobrescrita. CSV e impressão dos relatórios funcionam com os indicadores de exemplo.

## Verificação

- TypeScript, ESLint e build Next.js concluídos. Build com modo `enforce` iniciado em ambiente local isolado.
- Verificadas 71 instâncias de rota em 320 px. Telas-chave também passaram em 390 × 844, 412 × 915, 768 × 1.024, notebook, Full HD, 3.440 × 1.440 e 3.840 × 2.160. Chromium e WebKit com viewport de iPhone. A amostra avaliada por axe inclui home, cadastro, roteiros, contato e os três painéis.
- Validados tema persistente, menus, cadastro de aluno e professor, rascunho e limpeza, busca e simulação de roteiro, fila demonstrativa, CSV, painéis protegidos e rotas de demonstração desativadas em modo `enforce`. O ambiente sem provedor apresentou mensagem de indisponibilidade na recuperação e recusou o link sem sessão de recuperação.
- Ensaiados schema, RLS, Storage e auditoria em PostgreSQL isolado via PGlite. SQL de RLS e Storage reaplicado e transação de fixtures revertida. `combined-apply.sql` é gerado sem seed.

## Menu móvel

- O site público e as áreas internas usam um painel inferior com sombra suave, fundo atenuado, ícones, área de toque ampliada e destaque da seção atual. O site reúne contato, inscrição e entrada. Os painéis incluem as opções da conta e a ação de sair.
- A lista rola em telas baixas e preserva acesso ao botão de fechar. O menu fecha pelo botão, pelo fundo, pela tecla Esc e na navegação. Respeita a preferência de movimento reduzido.
- Na prévia local, verificados abertura, rolagem e retorno de foco no painel do aluno em 320 × 568, tema claro no site em 390 × 844, menus de professor e coordenação em 414 × 896 e fechamento ao passar para desktop.

## Homologação pendente

O checkout está pronto para revisão e ensaio na VPS. A pilha Supabase completa, os usuários Auth, a entrega SMTP, o armazenamento real e a restauração de backup aguardam homologação. A criação de conta após aceitar uma inscrição ainda é manual. Conteúdo pedagógico, turmas, devolutivas, certificados e métricas ainda incluem exemplos. A publicação externa e as escritas no banco ativo ficam para o ambiente autorizado.

Roteiro operacional em [Supabase na VPS e ensaio de acesso](../production-platform/VPS_SUPABASE_REHEARSAL.md).
