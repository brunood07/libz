import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Book } from "@modules/books/infra/typeorm/entities/Book";

@Entity("rents")
class Rent {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Book)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @Column()
  book_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rent };