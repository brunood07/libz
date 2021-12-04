import { inject, injectable } from "tsyringe";
import { Book } from "../../infra/typeorm/entities/Book";
import { IBooksRepository } from "../../repositories/IBooksRepository";

@injectable()
class ListBooksUseCase {

  constructor(
    @inject("BooksRepository")
    private booksRepository: IBooksRepository
  ) { }

  async execute(id: string): Promise<Book[]> {
    const allBooks = await this.booksRepository.listAllBooks();

    return allBooks;
  }
}

export { ListBooksUseCase };