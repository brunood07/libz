import { container } from "tsyringe";

import { BooksRepository } from "@modules/books/infra/typeorm/repositories/BooksRepository";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";

container.registerSingleton<IBooksRepository>(
  "BooksRepository",
  BooksRepository
);
