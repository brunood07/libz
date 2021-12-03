import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IBooksRepository } from "../../repositories/IBooksRepository";

interface IRequest {
  book_name: string;
  author: string;
  category: string;
  photo_url: string;
  number_of_pages: string;
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
  }: IRequest) {
    const bookAlreadyExists = await this.booksRepository.findByBookName(
      book_name
    );

    if (bookAlreadyExists) {
      throw new AppError("Book already exists!");
    }

    const book = await this.booksRepository.create({
      book_name,
      author,
      category,
      photo_url,
      number_of_pages,
    });

    return book;
  }
}

export { CreateBookUseCase };
