# Plano B de Apresentacao

## Rota principal validada
- Producao: `https://ecotuca.vercel.app`.
- Demo: `https://ecotuca.vercel.app/demo`.
- Mobile: `https://ecotuca.vercel.app/demo-mobile`.
- Deploy validado: `dpl_Fxvu9q6Xbx5RkjDvkMjsuHg8GwQW`.

## Se localhost falhar
- Usar a producao em `https://ecotuca.vercel.app`.

## Se producao/internet falhar
- Rodar `npm run dev -- -p 3020`.
- Conferir a porta indicada no terminal.
- Se 3000 estiver ocupado, usar 3020.
- Reabrir `/demo`.

## Se Supabase falhar
- Continuar em modo de demonstracao.
- Explicar que o banco real esta preparado para a proxima etapa.
- Usar `/demo/status` somente se a conversa ficar tecnica.

## Se internet falhar
- Evitar depender de videos externos.
- Mostrar telas ja carregadas.
- Mostrar imagens e fluxo de navegacao.
- Focar na jornada do produto.

## Se o player nao carregar YouTube
- Mostrar card de progresso.
- Explicar que videos oficiais serao inseridos.
- Seguir para trilhas, certificados e admin.

## Se o formulario nao salvar
- Mostrar confirmacao local da apresentacao.
- Explicar o fluxo final de solicitacao de roteiro.

## Se o mobile mockup travar
- Abrir as rotas reais responsivas direto no navegador.
- Mostrar `/demo`, `/roteiros` e `/app/aluno` em largura mobile.

## Se perguntarem se esta em producao
Resposta sugerida:
"Sim. O MVP navegavel esta publicado na Vercel em `https://ecotuca.vercel.app`. Tambem existe plano B local para a reuniao, e a conexao completa ao Supabase fica para a etapa pos-reuniao com SQL e usuarios reais aprovados."
