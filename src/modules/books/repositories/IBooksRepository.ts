import { Book } from "../infra/typeorm/entities/Book";
import { ICreateBookDTO } from "../dtos/ICreateBookDTO";

interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  findById(id: string): Promise<Book>;
  findByISBN(isbn: string): Promise<Book>;
  listAllAvailableBooks(category?: string, isbn?: string, book_name?: string): Promise<Book[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { IBooksRepository };
