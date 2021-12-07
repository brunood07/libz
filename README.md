# LIBZ

Projeto criado com a intenção de colocar em prática o que foi aprendido durante as aulas do ignite da Rocketseat.
</br>
A aplicação Libz é um sistema de biblioteca pública, onde o usuário pode realizar o aluguel de um livro por vez a cada 7 dias e caso haja atraso deve ser pago uma multa.

## Tecnologias utilizadas

- NodeJS
- Express
- Typeorm
- Postgres
- Docker
- Jest
- Typescript

## Para rodar a aplicação é necessário:

Ter instalado:

- [NodeJS](https://nodejs.org/en/)
- [Docker](https://www.docker.com)
- [yarn](https://yarnpkg.com)

```bash
  # 1. Instalar as dependências necessárias
  yarn

  # 2. Criar o container no docker
  docker-compose up

  # 3. Checar se a aplicação está rodando
  docker logs -f libz
```

## Regras de Negócio

Estas são as [regras de negócio](https://github.com/brunood07/libz/blob/main/RegrasDeNegocio.md) da aplicação.