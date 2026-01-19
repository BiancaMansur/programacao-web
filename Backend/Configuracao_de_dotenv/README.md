# Exemplo de Configuração com dotenv

Este projeto apresenta uma API simples desenvolvida com Express, com o objetivo de demonstrar o uso do dotenv para gerenciamento de configurações por ambienteem aplicações backend.

O exemplo mostra como utilizar variáveis de ambientepara manter informações sensíveis e configurações específicas fora do código-fonte, seguindo boas práticas de segurança e organização.


## Objetivo do Exemplo

O foco deste projeto é demonstrar como configurar uma aplicação para utilizar variáveis de ambiente, permitindo:

- Separação de configurações por ambiente
- Maior segurança no gerenciamento de dados sensíveis
- Facilidade para alternar entre desenvolvimento, teste e produção
- Padronização de configurações da aplicação

## Variáveis de Ambiente

As variáveis de ambiente são utilizadas para armazenar informações como:
- Porta da aplicação
- Credenciais de banco de dados
- Chaves secretas
- Configurações específicas de cada ambiente

Essas informações não devem ser versionadas junto ao código-fonte.

## Ambientes de Execução

O exemplo considera múltiplos ambientes de execução, como:
- Development
- Test
- Production

Cada ambiente pode possuir configurações diferentes, carregadas dinamicamente a partir das variáveis de ambiente.

## Configuração Segura

O uso do dotenv permite:
- Evitar exposição de dados sensíveis no repositório
- Reduzir riscos de segurança
- Facilitar o compartilhamento do código entre equipes
- Manter consistência entre ambientes

## Considerações Finais

O uso correto de variáveis de ambiente é uma prática essencial em projetos profissionais, especialmente em aplicações que evoluem ao longo do tempo e são executadas em diferentes ambientes.
