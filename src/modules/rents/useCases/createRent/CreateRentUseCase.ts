import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { IRentsRepository } from "@modules/rents/repository/IRentsRepository";
import { Rent } from "@modules/rents/infra/typeorm/entities/Rent";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  book_id: string;
  expected_return_date: Date;
  start_date?: Date
}

@injectable()
class CreateRentUseCase {
  constructor(
    @inject("RentsRepository")
    private rentsRepository: IRentsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) { }

  async execute({ user_id, book_id, expected_return_date, start_date }: IRequest): Promise<Rent> {
    const minimumHour = 168;

    const bookUnavailable = await this.rentsRepository.findOpenRentByBook(book_id);

    if (bookUnavailable) {
      throw new AppError("Book is unavailable!");
    }

    const rentOpenToUser = await this.rentsRepository.findOpenRentByUser(user_id);

    if (rentOpenToUser) {
      throw new AppError("There is a rent in progress for this user!");
    }

    const dateNow = start_date || this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHour) {
      throw new AppError("Invalid return time!");
    }

    const rent = await this.rentsRepository.create({
      user_id,
      book_id,
      expected_return_date,
      start_date,
    });

    await this.booksRepository.updateAvailable(book_id, false);

    return rent;
  }
}

export { CreateRentUseCase };