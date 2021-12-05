import { getRepository, Repository } from "typeorm";

import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { IBooksRepository } from "@modules/books/repositories/IBooksRepository";
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
    publishing_company,
    isbn,
    release_year
  }: ICreateBookDTO): Promise<Book> {
    const book = this.repository.create({
      book_name,
      author,
      category,
      photo_url,
      number_of_pages,
      publishing_company,
      isbn,
      release_year
    });

    await this.repository.save(book);

    return book;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.repository.findOne(id);

    return book;
  }

  async findByISBN(isbn: string): Promise<Book> {
    const book = await this.repository.findOne({ isbn });

    return book;
  }

  async listAllAvailableBooks(category?: string, isbn?: string, book_name?: string): Promise<Book[]> {
    const booksQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (category) {
      booksQuery.andWhere("category = :category", { category });
    }

    if (isbn) {
      booksQuery.andWhere("isbn = :isbn", { isbn });
    }

    if (book_name) {
      booksQuery.andWhere("book_name = :book_name", { book_name });
    }

    const allAvailableBooks = await booksQuery.getMany();

    return allAvailableBooks;
  }
}

export { BooksRepository };
