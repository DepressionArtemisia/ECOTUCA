# Design system ECOTUCA

## Direção visual e de voz

A ECOTUCA é a escola de ecoturismo do Complexo do Alemão. A Perifa Ecotour assina o trabalho territorial e as propostas de roteiro. A voz é de quem conhece o território e ensina com clareza. Use frases diretas e explique a próxima ação. Em avisos, diga o que aconteceu e o que a pessoa pode fazer. Em indicadores, informe se os dados são de exemplo.

O site público tem composição editorial, títulos de peso, fotografia documental e espaços de leitura amplos. Os painéis dão prioridade à tarefa de cada perfil. A interface usa as assinaturas oficiais extraídas do manual em `public/brand/official/from-manual/png/`, respeitando suas proporções. Fotos de acervo mantêm autoria e licença em `/creditos-imagens`.

## Paleta e estados

- Marrom `#3A1A16` sustenta a marca, texto sobre fundos quentes e áreas institucionais densas.
- Amarelo `#FCC224` identifica a ação principal, seleção atual e pontos de atenção. Use texto marrom sobre amarelo. Mantenha uma ação principal por grupo.
- Azul `#335595` identifica links e informação. O tema escuro usa azul claro para legibilidade.
- Menta `#2ACCB5` sinaliza progresso e confirmação. Coral `#E9635D` sinaliza correção, recusa ou alerta. Laranja `#FE9440` é um acento editorial e territorial. Para estados escritos, use o componente Badge com os pares de cor definidos.
- Tema claro com fundo `#FAF7F0`, superfície `#FFFDF8`, superfície secundária `#F2EBE0` e texto auxiliar `#69554F`.
- Tema escuro com fundo `#211714`, superfície `#2D201B`, superfície secundária `#392924` e texto auxiliar `#D3BFB4`.
- Tokens semânticos e valores de contraste em `app/globals.css`. Use `--foreground`, `--muted`, `--card`, `--surface-alt`, `--control-border`, `--link-text` e `--accent-text` ao estender a interface.

## Tipografia e densidade

- Título editorial em Archivo Black, com escala fluida e caixa normal. A home usa 46–116 px com espaçamento de letras próprio. Cabeçalhos internos usam peso de exibição somente em títulos principais.
- DM Sans Variable em texto, controles e dados. Corpo de 16–20 px, texto auxiliar de 14 px e rótulos curtos de 12–14 px. Campos mantêm 16 px no celular para evitar zoom ao digitar no iOS.
- Troika e Lufga são as direções do manual. O checkout usa alternativas locais distribuídas sob SIL OFL enquanto os arquivos licenciados para web estiverem pendentes.
- Parágrafos ficam em torno de 45–70 caracteres por linha. Use números tabulares nas tabelas e indicadores.

## Espaço, layout e movimento

- Espaçamento em incrementos de 4 e 8 px. Use 16–24 px de respiro interno para cartões e 24–40 px para áreas de trabalho.
- Site com largura máxima de 1.440 px e painéis com conteúdo limitado a 1.648 px. Margens e tipografia fluidas do celular ao ultrawide. Uma coluna em telas estreitas, duas ou três a partir de tablet e grades maiores quando o conteúdo pede.
- A barra lateral dos painéis aparece em 1.024 px. Abaixo disso, o menu abre em um painel inferior modal, com cabeçalho e ações fixos e rolagem reservada à lista de destinos. As linhas de navegação têm cerca de 54 px de altura. O foco entra no botão de fechar e retorna ao gatilho. Conteúdos largos, como tabelas, rolam dentro de regiões identificadas.
- Controles com altura mínima de 44 px. Cartões com raio de 16 px, controles com 10 px e estados compactos com raio de cápsula. Bordas discretas predominam sobre sombras.
- Tema inicial segue o sistema e a preferência manual é lembrada. Topo e rodapé consideram áreas seguras. Transições de 140 ms em controles, sem movimento obrigatório. Respeite `prefers-reduced-motion`.

## Componentes e linguagem de interface

- Use `Button` para uma ação e `EcoLink` ou `buttonVariants` para navegação. Use secundário contornado para alternativas. Desabilite durante envio, descreva erros e preserve o contexto até a confirmação.
- Use `Badge` para categoria ou situação, sempre com rótulo textual. Use `Progress` com valor e nome acessível. Link e campo devem mostrar foco ao navegar por teclado.
- Use `PublicShell`, `RichPageHeader` e `WorkspaceShell` como pontos de entrada de layout. Mantenha um título principal por página e hierarquia consistente.
- Formulários mostram rótulos visíveis, mensagens perto da ação e etapa atual. Salvar rascunho no navegador é opcional. Em confirmação, informe se houve envio à coordenação ou apenas simulação.
- A voz do aluno usa verbos concretos, como continuar, conferir e praticar. A do professor usa turma, entrega e devolutiva. A da coordenação nomeia a decisão e distingue inscrição aprovada de conta criada.
