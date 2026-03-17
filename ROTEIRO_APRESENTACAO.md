# Roteiro de Apresentação de Progresso: Plataforma Hart Ops (Staff & Ops)

Este roteiro foi criado para guiar sua apresentação aos gerentes de projeto, focando nas entregas realizadas nas plataformas Staff e Ops, com base no documento `TASKS.md` e no contexto das últimas chamadas com o cliente (Chris).

---

## 1. Introdução

- **Objetivo:** "Olá a todos. Hoje quero apresentar o progresso significativo que fizemos na plataforma Hart Ops, englobando as visões de _Staff_ e _Ops_. Focamos em resolver as principais dores levantadas pelo Chris nas últimas reuniões, principalmente trazendo mais profundidade para a criação de campanhas, estruturação de dados para BI, e melhorando a gestão de educadores."

## 2. Plataforma Staff: Profundidade de Campanhas e Eventos

_Guie a apresentação pela interface do Staff, mostrando a jornada de criação de campanhas e eventos._

- **Expansão das Campanhas:**
  - _Ação:_ Mostre a tela de detalhes de uma campanha.
  - _Fala:_ "O Chris mencionou que a criação de campanhas era muito superficial. Agora, expandimos os detalhes para incluir fornecedores, distribuidores, mercados-alvo, objetivos e canais. Toda essa informação agora serve como um 'guarda-chuva' para os eventos."
- **Herança de Dados nos Eventos:**
  - _Ação:_ Inicie a criação de um evento ligado a uma campanha.
  - _Fala:_ "Antes, criar um evento era um processo isolado. Agora, otimizamos o _wizard_ (que passou de 5 para 4 passos). O evento herda automaticamente os objetivos, produtos e tipos de local diretamente da campanha mãe, evitando trabalho duplicado." _(Nota: mencione brevemente que a atribuição de contas/accounts está aguardando a importação do banco de dados de staging)._
- **Preview de Impacto Projetado (O 'Wow Factor'):**
  - _Ação:_ Mostre a _sidebar_ de impacto projetado no passo 3 da criação do evento.
  - _Fala:_ "O Chris deixou muito claro que mostrar os 'outputs' antecipadamente vai mudar a perspectiva dos clientes. Colocamos o relatório de impacto projetado direto na criação do evento, permitindo que o cliente veja o valor/ROI da ação antes mesmo de finalizá-la."
- **Questionários Estruturados e Material da Marca:**
  - _Ação:_ Mostre a seção de questionários/ativos da marca.
  - _Fala:_ "Substituímos o campo de 'notas' genérico (que era um problema para coletar dados reais) por um sistema de questionário estruturado. Além disso, agora podemos anexar PDFs com instruções de serviço e guias da marca diretamente nas campanhas para os educadores."

## 3. Plataforma Staff: Fundações de Dados

_Demonstre como a plataforma está capturando dados valiosos que antes se perdiam._

- **Modelagem e Captura de Dados:**
  - _Ação:_ Mostre brevemente onde os dados são configurados/visualizados.
  - _Fala:_ "Estabelecemos duas fundações críticas de dados: o **Tracker de Vendas de Produtos** (que conta as unidades vendidas por SKU para calcular o ROI) e o **Perfil das Contas/Venues** (que mapeia características como displays e geladeiras do local de do evento). O banco de dados está preparado com chaves padrão da indústria para exportação para o PowerBI, que fará os relatórios avançados nesta fase."

## 4. Plataforma Ops: Gestão de Educadores

_Mude para a visão do Ops e foque na funcionalidade de gerenciamento de equipe._

- **Catálogo/Roster de Educadores:**
  - _Ação:_ Acesse `/ops/dashboard/educators` e mostre a lista.
  - _Fala:_ "A gestão de educadores é o coração das operações da Hart. Criamos uma página dedicada com métricas, busca, múltiplos filtros e paginação. O destaque aqui é o **Quality Score** (pontuação de qualidade) de cada educador. Lançamos a fundação visual dessa pontuação, que ajudará os gerentes a ver rapidamente o histórico de confiabilidade daquele profissional para facilitar as atribuições."
- **Account Master Visualização:**
  - _Fala:_ "Também já criamos as interfaces iniciais para o painel mestre de Contas (Account Master), que em breve estará integrado com o banco de dados oficial."

---

## 5. O Gancho (Conclusão e Próximos Passos)

_Finalize a apresentação com foco na entrega de valor imediato e na clareza do que virá a seguir._

- **Fala:**
  > "Bom, com todas essas fundações e fluxos principais rodando, **eu acredito que já temos o suficiente para apresentar essas interfaces e o fluxo de criação de campanhas para o cliente (Chris e liderança)** para validarmos essa nova visão e pegarmos feedback."
  >
  > "Enquanto fazemos essa validação com eles, eu já tenho mapeado o que vou trabalhar a seguir. Olhando nossa lista de tarefas, vou focar nos itens prioritários (P1) da **Plataforma Ops** que ainda faltam, especificamente:
  >
  > 1. **Calendário de Disponibilidade dos Educadores:** O Chris frisou que isso precisa ser o destaque principal.
  > 2. **Fluxo de Matching Geográfico e Ofertas de Trabalho:** O sistema de cruzar eventos com o CEP dos educadores, e o disparo de convites/ofertas no app.
  > 3. **Catálogo Mestre de Itens (Item Master):** Uma UI central para os Ops adicionarem novos produtos e vincularem aos distribuidores."

---

_Dica: Mantenha a apresentação focada no "Por quê" ("O Chris pediu isso na Call para resolver o problema X") ao invés de ficar apenas no "Como" técnico._

## 5. Changelog / Atualizações Recentes (Opcional para a Demo)

_Caso precisem repassar as atualizações mais recentes implementadas durante as últimas horas:_

- **Exportações para BI:** Agora a página de Reports gera dumps CSV completos e prontos para o PowerBI (Métricas de Campanha, Detalhes de Evento, Dataset Mesclado).
- **Gestão de Accounts:** Criamos o slide-over panel do perfil da 'Conta' (Venue) pro Ops Dashboard, já amarrado com os mocks do nosso novo modelo de Account (que inclui displays de gôndola, contatos e etc).
- **Gestão de Educadores:** A página de Roster dos Educadores foi entregue e já roteia para a página de Detalhe Individual (com overview, especialidades, e breakdown do Quality Score).
- **Ativos da Marca:** A gestão de PDFs de 'Brand Education' foi componentizada (upload simulado, filtros, busca e stats implementados na aba específica de Ativos da Marca).
