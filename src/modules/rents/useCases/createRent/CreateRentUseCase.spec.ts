import dayjs from "dayjs";

import { CreateRentUseCase } from "./CreateRentUseCase";
import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";
import { RentsRepositoryInMemory } from "@modules/rents/repository/in-memory/RentsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentUseCase: CreateRentUseCase;
let rentsRepositoryInMemory: RentsRepositoryInMemory;
let booksRepositoryInMemory: BooksRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Create a rental", () => {
  const add168Hours = dayjs().add(7, "day").toDate();

  beforeEach(() => {
    rentsRepositoryInMemory = new RentsRepositoryInMemory();
    booksRepositoryInMemory = new BooksRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentUseCase = new CreateRentUseCase(
      rentsRepositoryInMemory,
      dateProvider,
      booksRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const book = await booksRepositoryInMemory.create({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    });

    const rental = await createRentUseCase.execute({
      user_id: "12345",
      book_id: book.id,
      expected_return_date: add168Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rent if there is another open to the same user", async () => {

    await rentsRepositoryInMemory.create({
      book_id: "1111",
      expected_return_date: add168Hours,
      user_id: "12345",
    });

    await expect(
      createRentUseCase.execute({
        user_id: "12345",
        book_id: "121212",
        expected_return_date: add168Hours,
      })
    ).rejects.toEqual(new AppError("There is a rent in progress for this user!"));
  });

  it("Should not be able to create a new rent if there is another open to the same book", async () => {

    await rentsRepositoryInMemory.create({
      book_id: "test",
      expected_return_date: add168Hours,
      user_id: "12345",
    });

    await expect(
      createRentUseCase.execute({
        user_id: "321",
        book_id: "test",
        expected_return_date: add168Hours,
      })
    ).rejects.toEqual(new AppError("Book is unavailable!"));
  });

  it("Should not be able to create a new rent with invalid return time", async () => {
    await expect(
      createRentUseCase.execute({
        user_id: "123",
        book_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});