import { inject, injectable } from "tsyringe";
import { Book } from "../../infra/typeorm/entities/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

interface IRequest {
  category?: string;
  book_name?: string;
  isbn?: string;
}

@injectable()
class ListAvailableBooksUseCase {

  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) { }

  async execute({ category, book_name, isbn }: IRequest): Promise<Book[]> {
    const books = await this.booksRepository.listAllAvailableBooks(category, book_name, isbn);

    return books;
  }
}

export { ListAvailableBooksUseCase };