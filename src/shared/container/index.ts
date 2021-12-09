import { container } from "tsyringe";

import "@shared/container/providers";

import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { RentsRepository } from "@modules/rents/infra/typeorm/repositories/RentsRepository";
import { IRentsRepository } from "@modules/rents/repository/IRentsRepository";

container.registerSingleton<IBooksRepository>(
  "BooksRepository",
  BooksRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<IRentsRepository>(
  "RentsRepository",
  RentsRepository
);