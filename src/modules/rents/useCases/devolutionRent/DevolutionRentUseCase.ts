import { inject, injectable } from "tsyringe";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { IRentsRepository } from "@modules/rents/repository/IRentsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
  return_date?: Date;
}

@injectable()
class DevolutionRentUseCase {
  constructor(
    @inject("RentsRepository")
    private rentsRepository: IRentsRepository,

    @inject("BooksRepository")
    private booksRepository: IBooksRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ id, return_date }: IRequest) {
    const rent = await this.rentsRepository.findById(id);

    if (!rent) {
      throw new AppError("Rent does not exists!");
    }

    const minimumRentDays = 7;

    const book = await this.booksRepository.findById(rent.book_id);

    const dateNow = this.dateProvider.dateNow();

    let rentTime = this.dateProvider.compareInDays(
      rent.start_date,
      this.dateProvider.dateNow()
    );

    if (rentTime <= 0) {
      rentTime = minimumRentDays;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      return_date || rent.expected_return_date,
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine_amount = delay * 3;
      total = calculate_fine_amount;
    }

    rent.end_date = this.dateProvider.dateNow();
    rent.total = total;

    await this.rentsRepository.create(rent);

    await this.booksRepository.updateAvailable(book.id, true);

    return rent;
  }
}

export { DevolutionRentUseCase };