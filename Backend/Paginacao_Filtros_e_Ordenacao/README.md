# Exemplo de Paginação, Filtros e Ordenação

Este projeto apresenta três exemplos práticos de uma API simples desenvolvida com Express, com o objetivo de demonstrar a implementação de paginação, filtros e ordenação em endpoints REST.

Cada exemplo utiliza uma tecnologia diferente de acesso a dados, permitindo compreender como esses conceitos são aplicados de forma segura e eficiente em diferentes ferramentas do ecossistema Node.js.

## Objetivo do Exemplo

O foco deste projeto é permitir que o usuario controle a forma como os dados são retornados pela API, sem comprometer:

- A segurança da aplicação
- A performance das consultas
- A organização do código

Isso é feito por meio de parâmetros de consulta (`query params`) utilizados nos endpoints de listagem.

## Funcionalidades Demonstradas

Os exemplos demonstram como implementar:

- Paginação de resultados
- Aplicação de filtros dinâmicos
- Ordenação configurável

Todas as consultas são construídas dinamicamente na camada Repository, mantendo as responsabilidades bem definidas.

## Paginação

A paginação é realizada utilizando:

- `limit` → quantidade de registros por página
- `offset` → deslocamento baseado na página atual

Isso evita retornos muito grandes e melhora a performance da API.

## Filtros Dinâmicos

Os filtros permitem restringir os dados retornados com base em parâmetros enviados pelo cliente, como:
- Campos específicos
- Valores parciais ou exatos
- Combinação de múltiplos critérios

Os filtros são validados para evitar consultas inseguras.

## Ordenação Segura

A ordenação permite definir:
- Campo de ordenação
- Direção (`asc` ou `desc`)

A aplicação garante que apenas campos permitidos possam ser usados, evitando riscos como SQL Injection.

## Considerações Finais
A implementação correta de paginação, filtros e ordenação é essencial em sistemas reais, especialmente aqueles que trabalham com grandes volumes de dados e exigem respostas rápidas e seguras.