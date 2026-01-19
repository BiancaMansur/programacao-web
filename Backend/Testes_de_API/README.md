# Exemplos de Testes em API

Este projeto apresenta dois exemplos práticos de uma API simples desenvolvida com Express, com o objetivo de demonstrar como realizar testes automatizados de endpoints em aplicações backend.

Os exemplos utilizam Jest e Supertest, duas ferramentas amplamente usadas no ecossistema Node.js para garantir a qualidade do código e o correto funcionamento das rotas da API.

## Objetivo do Exemplo

O foco deste projeto é demonstrar como utilizar testes automatizados para validar o comportamento de uma API REST, garantindo que:

- As rotas estejam funcionando corretamente
- Os dados retornados sejam os esperados
- Os códigos de status HTTP estejam corretos
- Alterações futuras não quebrem funcionalidades existentes

Os testes atuam como uma camada de segurança contra regressões no código.

## O que é Testado

Os exemplos validam principalmente:

- Respostas de endpoints (`GET`, `POST`, etc.)
- Estrutura e conteúdo do payload de resposta
- Códigos de status HTTP retornados
- Comportamento esperado em cenários válidos e inválidos

## Diferença entre os Exemplos

### Jest
- Demonstra testes automatizados utilizando apenas o Jest
- Foco em validação de funções, respostas e regras básicas
- Introduz conceitos de testes unitários e de integração simples

### Supertest
- Simula requisições HTTP reais contra a API
- Ideal para testes de endpoints REST
- Muito próximo do comportamento real da aplicação em produção