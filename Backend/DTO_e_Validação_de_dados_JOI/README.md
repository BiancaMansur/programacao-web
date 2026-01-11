# API Simples em Camadas com DTO e Validação de Dados (Joi) – Exemplo Educacional

Este projeto é uma API simples desenvolvida com Express, criada para demonstrar a validação de dados de entrada utilizando DTOs (Data Transfer Objects) e a biblioteca Joi, em uma aplicação organizada em arquitetura em camadas.
O foco deste exemplo é garantir que os dados recebidos nos endpoints estejam corretos, consistentes e válidos antes de serem processados pelas regras de negócio, evitando a propagação de dados inválidos dentro do sistema.

## Objetivo do Exemplo
O objetivo deste exemplo é ensinar:

- O conceito de DTO (Data Transfer Object)
- Como validar payloads de requisição
- Como aplicar validação antes da camada Service
- Como padronizar respostas de erro relacionadas a dados inválidos

### DTO + Validação
Responsável por:
- Definir o contrato de entrada da API
- Validar os dados recebidos utilizando Joi
- Impedir que dados inválidos avancem para as regras de negócio

## Validação de Dados com Joi
A validação é realizada por meio de schemas Joi, que definem:

- Campos obrigatórios
- Tipos de dados esperados
- Regras de formato
- Limites e restrições

Essa abordagem permite:
- Centralizar regras de validação
- Reduzir duplicação de código
- Tornar os endpoints mais previsíveis

## Tratamento de Erros de Validação
Quando um payload inválido é enviado, a API retorna erros padronizados, como:

- 400 – Bad Request  
  Payload mal formado ou inválido

- 422 – Unprocessable Entity  
  Dados com formato válido, mas que violam regras definidas

- 409 – Conflict  
  Conflito de dados (ex: recurso já existente)
  
Esses erros são tratados de forma consistente, facilitando o consumo da API.