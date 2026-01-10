# API Simples em Camadas com Perfil e Permissão – Exemplo Educacional

Este projeto é uma API simples desenvolvida com Express, criada para demonstrar controle de acesso baseado em perfil e permissão em uma aplicação organizada em arquitetura em camadas.
O projeto dá continuidade ao exemplo de autenticação com JWT, introduzindo o conceito de autorização, onde diferentes tipos de usuários possuem permissões distintas dentro do sistema de gestão escolar.

## Objetivo do Exemplo

O objetivo deste exemplo é ensinar:

- A diferença entre autenticação e autorização
- Como utilizar perfil e permissão para controle de acesso
- Como restringir ações com base no tipo de usuário
- Como proteger rotas utilizando JWT e middlewares de autorização
- Como aplicar regras de acesso sem acoplar lógica de negócio às rotas

## Autenticação x Autorização

### Autenticação
- Verifica quem é o usuário
- Realizada por meio de login + JWT

### Autorização
- Verifica o que o usuário pode fazer
- Baseada em perfil e permissões associadas

Este projeto foca principalmente na autorização.

## Regras de Acesso Implementadas

Este exemplo implementa as seguintes regras de autorização:

- Apenas usuários com perfil `admin` podem:
  - Criar alunos
  - Criar cursos

- Apenas usuários com perfil `aluno` podem:
  - Se matricular em cursos

Essas regras são aplicadas antes da execução das regras de negócio, garantindo segurança e organização.

## Controle de Acesso com JWT

Após o login, o usuário recebe um token JWT, que deve ser enviado nas requisições protegidas: