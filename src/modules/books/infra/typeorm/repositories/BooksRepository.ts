import { getRepository, Repository } from "typeorm";

import { ICreateBookDTO } from "../../../dtos/ICreateBookDTO";
import { IBooksRepository } from "../../../repositories/IBooksRepository";
import { Book } from "../entities/Book";

class BooksRepository implements IBooksRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = getRepository(Book);
  }

  async create({
    book_name,
    author,
    category,
    photo_url,
    number_of_pages,
    id,
  }: ICreateBookDTO): Promise<Book> {
    const book = this.repository.create({
      book_name,
      author,
      category,
      photo_url,
      number_of_pages,
      id,
    });

    await this.repository.save(book);

    return book;
  }

  async findById(id?: string): Promise<Book> {
    const book = await this.repository.findOne(id);

    return book;
  }

  async findByBookName(book_name: string): Promise<Book> {
    const book = await this.repository.findOne(book_name);

    return book;
  }
}

export { BooksRepository };
