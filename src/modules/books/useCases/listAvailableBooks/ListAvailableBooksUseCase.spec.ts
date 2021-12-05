import { BooksRepositoryInMemory } from "@modules/books/repositories/in-memory/BooksRepositoryInMemory";
import { ListAvailableBooksUseCase } from "./ListAvailableBooksUseCase";

let booksRepository: BooksRepositoryInMemory;
let listAvailableBooksUseCase: ListAvailableBooksUseCase;

describe("List all available books", () => {

  beforeEach(() => {
    booksRepository = new BooksRepositoryInMemory();
    listAvailableBooksUseCase = new ListAvailableBooksUseCase(booksRepository);
  });

  it("Should be able to list all available books", async () => {
    const book = await booksRepository.create({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    });

    const books = await listAvailableBooksUseCase.execute({});

    expect(books).toEqual([book])
  });

  it("Should be able to list all available books by category", async () => {
    const book = await booksRepository.create({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    });

    const books = await listAvailableBooksUseCase.execute({ category: "Test Category" });

    expect(books).toEqual([book])
  });

  it("Should be able to list all available books by book name", async () => {
    const book = await booksRepository.create({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    });

    const books = await listAvailableBooksUseCase.execute({ book_name: "Test Book Name" });

    expect(books).toEqual([book])
  });

  it("Should be able to list all available books by isbn", async () => {
    const book = await booksRepository.create({
      book_name: "Test Book Name",
      author: "Test Author",
      category: "Test Category",
      photo_url: "Test link",
      number_of_pages: "200",
      publishing_company: "Test publisher",
      isbn: "123456789",
      release_year: 2021
    });

    const books = await listAvailableBooksUseCase.execute({ isbn: "123456789" });

    expect(books).toEqual([book])
  });
})