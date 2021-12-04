import { Book } from "../infra/typeorm/entities/Book";
import { ICreateBookDTO } from "../dtos/ICreateBookDTO";

interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  findById(id: string): Promise<Book>;
  findByISBN(isbn: string): Promise<Book>;
  listAllBooks(): Promise<Book[]>;
}

export { IBooksRepository };
