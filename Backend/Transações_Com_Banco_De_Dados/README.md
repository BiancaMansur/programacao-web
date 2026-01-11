# Exemplo de Transações com Banco de Dados
Este projeto contém três exemplos práticos de uma API simples desenvolvida com Express, com o objetivo de demonstrar o uso de transações em banco de dados em uma aplicação organizada em camadas.
Cada exemplo utiliza uma tecnologia diferente para acesso a dados, permitindo comparar abordagens e compreender como o conceito de transação é aplicado independentemente da ferramenta utilizada.

## Objetivo do Exemplo
O foco deste projeto é demonstrar como garantir a consistência dos dados em operações que envolvem múltiplas ações dependentes entre si, utilizando transações de banco de dados.

Essas operações são tratadas como uma única unidade de trabalho, onde:
- Todas as etapas precisam ser concluídas com sucesso
- Caso alguma etapa falhe, nenhuma alteração deve ser persistida

## O que São Transações
Uma transação permite agrupar várias operações de banco de dados em um único bloco lógico. Esse bloco garante que:

- Ou todas as operações são confirmadas (commit)
- Ou todas as operações são desfeitas (rollback)

Isso evita estados inconsistentes no banco de dados.

## Falha Parcial
O exemplo demonstra o cenário de falha parcial, onde:
- Algumas operações são executadas corretamente
- Uma operação intermediária ou final falha
- A transação é revertida automaticamente

Nesse caso, nenhuma alteração realizada anteriormente permanece no banco.

## Commit e Rollback
Durante a execução das operações:

- Commit
  - Executado quando todas as etapas da operação são concluídas com sucesso
  - Confirma definitivamente as alterações no banco de dados

- Rollback
  - Executado quando ocorre qualquer erro durante o processo
  - Desfaz todas as alterações realizadas dentro da transação

## Conceitos Abordados
- Transações em banco de dados
- Commit
- Rollback
- Falha parcial
- Consistência de dados