import dayjs from "dayjs";

import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";
import { RentsRepositoryInMemory } from "@modules/rents/repository/in-memory/RentsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { DevolutionRentUseCase } from "./DevolutionRentUseCase";

let rentsRepositoryInMemory: RentsRepositoryInMemory;
let booksRepositoryInMemory: BooksRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let devolutionRentUseCase: DevolutionRentUseCase;

describe("Devolve a rent", () => {
  const add168Hours = dayjs().add(7, "day").toDate();

  const bookTest = {
    book_name: "Test Book Name",
    author: "Test Author",
    category: "Test Category",
    photo_url: "Test link",
    number_of_pages: "200",
    publishing_company: "Test publisher",
    isbn: "123456789",
    release_year: 2021
  };

  beforeEach(() => {
    rentsRepositoryInMemory = new RentsRepositoryInMemory();
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    devolutionRentUseCase = new DevolutionRentUseCase(
      rentsRepositoryInMemory,
      booksRepositoryInMemory,
      dateProvider
    );
  });

  it("Should be able to return a rent", async () => {
    const book = await booksRepositoryInMemory.create(bookTest);

    const rent = await rentsRepositoryInMemory.create({
      user_id: "123",
      book_id: book.id,
      expected_return_date: add168Hours
    });

    const devolution = await devolutionRentUseCase.execute({ id: rent.id })

    expect(devolution).toHaveProperty("end_date");
    expect(book.available).toBe(true);
  });

  it("Should not be able to return a non-existent rent", async () => {
    await expect(devolutionRentUseCase.execute({
      id: "invalid-id"
    })
    ).rejects.toEqual(new AppError("Rent does not exists!"));
  });

  it("Should be able to apply a fee for delaying a return", async () => {
    const book = await booksRepositoryInMemory.create(bookTest);

    const rent = await rentsRepositoryInMemory.create({
      user_id: "123",
      book_id: book.id,
      expected_return_date: dayjs().add(9, "days").toDate()
    });

    const devolution = await devolutionRentUseCase.execute({
      id: rent.id
    });

    expect(devolution).toHaveProperty("total");
    expect(devolution).toHaveProperty("end_date");
    expect(devolution.total).toBe(6);
    expect(book.available).toBe(true);
  });
});