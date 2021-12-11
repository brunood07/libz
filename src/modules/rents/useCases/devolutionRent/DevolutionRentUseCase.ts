import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { IRentsRepository } from "@modules/rents/repository/IRentsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rent } from "@modules/rents/infra/typeorm/entities/Rent";

interface IRequest {
  id: string;
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

  async execute({ id }: IRequest): Promise<Rent> {
    const rent = await this.rentsRepository.findById(id);

    if (!rent) {
      throw new AppError("Rent does not exists!");
    }

    const book = await this.booksRepository.findById(rent.book_id);

    const dateNow = this.dateProvider.dateNow();

    let rentTime = this.dateProvider.compareInDays(
      rent.start_date,
      this.dateProvider.dateNow()
    );

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rent.expected_return_date,
    );

    let total = 0;

    if (delay > 7) {
      const calculate_fine_amount = (delay - 7) * 3;
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