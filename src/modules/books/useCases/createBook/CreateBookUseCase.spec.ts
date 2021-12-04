import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateBookUseCase } from "./CreateBookUseCase"

let createBookUseCase: CreateBookUseCase;
let booksRepository: BooksRepositoryInMemory;

describe("Create a book", () => {

  beforeEach(() => {
    booksRepository = new BooksRepositoryInMemory();
    createBookUseCase = new CreateBookUseCase(booksRepository);
  })

  it("Should be able to create a new book!", async () => {
    const book = await createBookUseCase.execute({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    });

    expect(book).toHaveProperty("id");
  });

  it("Should not be able to create a book with a isbn that already exists!", async () => {
    await createBookUseCase.execute({
      book_name: "Test Book Name 1",
      author: "Test Author 1",
      category: "Test Category 1",
      photo_url: "Test link 1",
      number_of_pages: "200",
      publishing_company: "Test publisher 1",
      isbn: "123456789",
      release_year: 2021
    });

    await expect(
      createBookUseCase.execute({
        book_name: "Test Book Name 2",
        author: "Test Author 2",
        category: "Test Category 2",
        photo_url: "Test link 2",
        number_of_pages: "200",
        publishing_company: "Test publisher 2",
        isbn: "123456789",
        release_year: 2021
      })
    ).rejects.toEqual(new AppError("ISBN already registered!"));
  });
});