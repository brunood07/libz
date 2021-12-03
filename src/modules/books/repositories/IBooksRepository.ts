import { ICreateBookDTO } from "../dtos/ICreateBookDTO";
import { Book } from "../infra/typeorm/entities/Book";

interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  findById(id: string): Promise<Book>;
  findByBookName(book_name: string): Promise<Book>;
}

export { IBooksRepository };
