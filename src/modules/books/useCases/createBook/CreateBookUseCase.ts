import { inject, injectable } from "tsyringe";

import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  book_name: string;
  author: string;
  category: string;
  photo_url: string;
  number_of_pages: string;
  publishing_company: string;
  isbn: string;
  release_year: number;
}

@injectable()
class CreateBookUseCase {
  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) { }

  async execute({
    book_name,
    author,
    category,
    photo_url,
    number_of_pages,
    publishing_company,
    isbn,
    release_year
  }: IRequest) {
    const bookAlreadyExists = await this.booksRepository.findByISBN(
      isbn
    );

    if (bookAlreadyExists) {
      throw new AppError("ISBN already registered!");
    }

    const book = await this.booksRepository.create({
      book_name,
      author,
      category,
      photo_url,
      number_of_pages,
      publishing_company,
      isbn,
      release_year
    });

    return book;
  }
}

export { CreateBookUseCase };
