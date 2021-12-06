import { container } from "tsyringe";

import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

container.registerSingleton<IBooksRepository>(
  "BooksRepository",
  BooksRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);