# Regras de Negócio

## Cadastro de Livro

**RF**
- Deve ser possível cadastrar um novo livro.

**RN**
- Não deve ser possível cadastrar um livro com ISBN já existente.
- O livro deve ser cadastrado, por padrão, como disponível.
- O usuário responsável pelo cadastro de um livro deve ser um administrador.

## Listagem de Livros

**RF**
- Deve ser possível listar todos os livros disponíveis.
- Deve ser possível listar todos os livros disponíveis por categoria.
- Deve ser possível listar todos os livros disponíveis por autor.
- Deve ser possível listar todos os livros disponíveis pelo nome do livro.

**RN**
- O usuário deve estar logado no sistema.