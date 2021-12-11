# Regras de Negócio

## Cadastro de Livro

**RF**
- Deve ser possível cadastrar um novo livro.

**RN**
- Não deve ser possível cadastrar um livro com ISBN já existente.
- O livro deve ser cadastrado, por padrão, como disponível.
- O usuário responsável pelo cadastro de um livro deve ser um usuário autenticado.

## Listagem de Livros

**RF**
- Deve ser possível listar todos os livros disponíveis.
- Deve ser possível listar todos os livros disponíveis por categoria.
- Deve ser possível listar todos os livros disponíveis por autor.
- Deve ser possível listar todos os livros disponíveis pelo nome do livro.

**RN**
- O usuário deve estar logado no sistema.

# Alguel

**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- O aluguel deve ter duração de 7 dias.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo livro.
- O usuário deve estar logado na aplicação para fazer um aluguel.
- Ao relizar um aluguel o status de um livro deverá ser alterado para indisponível.

# Devolução de livro

**RF**
- Deve ser possível realizar a devolução de um livro.

**RN**
- Ao realizar a devolução de um livro ele deverá ser liberado para outro aluguel.
- Ao realizar a devolução de um livro o usuário deverá ser liberado para outro aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- O usuário deve estar logado no sistema.

# Listagem de alugueis para o usuário

**RF**
- Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
- O usuário deve estar logado no sistema.

# Recuperar senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail.
- O usuário deve receber um e-mail com o passo a passo para a recuperação de senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**
- O usuário precisa informar uma nova senha.
- O link enviado para a recuperação de senha deve expirar em 3 horas.