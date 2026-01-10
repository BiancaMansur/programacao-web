# API Simples em Camadas com Autenticação JWT – Exemplo Educacional

Este projeto é uma API simples desenvolvida com Express, criada para demonstrar o fluxo básico de autenticação em uma aplicação organizada em arquitetura em camadas, utilizando Knex.js para acesso a banco de dados, bcrypt para segurança de senhas e JWT (JSON Web Token) para controle de acesso às rotas.

## Objetivo do Exemplo

O objetivo deste exemplo é ensinar:

- Como criar e gerenciar usuários autenticáveis
- Como armazenar senhas de forma segura utilizando hash
- Como realizar o login de um usuário
- Como gerar e validar tokens JWT
- Como proteger rotas da API utilizando autenticação
- Como integrar autenticação com uma API organizada em camadas

Este projeto apresenta apenas o fluxo básico de autenticação.

## Autenticação e Segurança

### Entidade Usuário

A entidade Usuário é responsável pela autenticação da aplicação.  
Ela deve ser criada previamente para que seja possível realizar o login.

Principais responsabilidades:
- Armazenar credenciais de acesso
- Manter a senha de forma segura
- Permitir a autenticação do sistema

### Armazenamento Seguro de Senhas

As senhas são armazenadas utilizando bcrypt, garantindo que:
- Nenhuma senha seja salva em texto puro
- Mesmo em caso de vazamento, os dados estejam protegidos
- Boas práticas de segurança sejam seguidas

## Autenticação com JWT

Após o login bem-sucedido, a API retorna um token JWT, que deve ser enviado nas requisições protegidas.

O token:
- Representa a identidade do usuário autenticado
- Possui tempo de expiração
- É validado a cada requisição em rotas protegidas

As rotas protegidas exigem o envio do token no header.