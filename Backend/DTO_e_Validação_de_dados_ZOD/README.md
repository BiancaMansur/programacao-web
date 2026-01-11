# API Simples em Camadas com DTO e Validação de Dados (Zod) – Exemplo Educacional

Este projeto é uma API simples desenvolvida com Express, criada para demonstrar a validação de dados de entrada utilizando DTOs (Data Transfer Objects) e a biblioteca Zod, em uma aplicação organizada em arquitetura em camadas.
Este exemplo possui o mesmo objetivo conceitual do projeto com Joi, mudando apenas a ferramenta de validação, permitindo a comparação entre abordagens diferentes para resolver o mesmo problema.

## Objetivo do Exemplo
O objetivo deste exemplo é ensinar:

- O conceito de DTO (Data Transfer Object)
- Como validar payloads de requisição
- Como aplicar validação antes da camada Service
- Como padronizar respostas de erro relacionadas a dados inválidos
- Como garantir contratos claros entre cliente e servidor

### DTO + Validação
Responsável por:
- Definir o contrato de entrada da API
- Validar os dados recebidos utilizando Zod
- Bloquear dados inválidos antes que atinjam as regras de negócio

## Validação de Dados com Zod
A validação é realizada por meio de schemas Zod, que definem:

- Tipos de dados
- Campos obrigatórios
- Regras de formato
- Restrições e refinamentos personalizados

O Zod permite:
- Inferência de tipos (especialmente útil com TypeScript)
- Schemas reutilizáveis
- Mensagens de erro mais controladas

## Tratamento de Erros de Validação
Quando um payload inválido é enviado, a API retorna erros padronizados, como:

- 400 – Bad Request  
  Payload mal formado ou inválido

- 422 – Unprocessable Entity  
  Dados corretos em formato, mas inválidos segundo as regras definidas
  
- 409 – Conflict  
  Conflito de dados, como tentativa de criação de um recurso já existente

Essas respostas tornam a API previsível e fácil de consumir.

## DTO como Contrato da API
Os DTOs funcionam como contratos formais da API, garantindo que:

- Apenas dados esperados sejam aceitos
- Mudanças internas não quebrem consumidores externos
- A validação esteja centralizada e bem definida