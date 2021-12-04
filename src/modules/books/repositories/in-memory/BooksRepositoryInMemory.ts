import { ICreateBookDTO } from "@modules/books/dtos/ICreateBookDTO";
import { Book } from "@modules/books/infra/typeorm/entities/Book";
import { IBooksRepository } from "../IBooksRepository";

class BooksRepositoryInMemory implements IBooksRepository {

  books: Book[] = [];

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
    const book = new Book();

    Object.assign(book, {
      book_name,
      author,
      category,
      photo_url,
      number_of_pages,
      publishing_company,
      isbn,
      release_year
    });

    this.books.push(book);

    return book;
  }

  async findById(id: string): Promise<Book> {
    return this.books.find(book => book.id === id);
  }

  async findByISBN(isbn: string): Promise<Book> {
    return this.books.find(book => book.isbn === isbn);
  }

  async listAllBooks(): Promise<Book[]> {
    const allBooks = this.books;

    return allBooks;
  }

}

export { BooksRepositoryInMemory };