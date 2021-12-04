import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("books")
class Book {
  @PrimaryColumn()
  id: string;

  @Column()
  book_name: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column()
  photo_url: string;

  @Column()
  number_of_pages: string;

  @Column()
  publishing_company: string;

  @Column({ unique: true })
  isbn: string;

  @Column()
  release_year: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Book };
