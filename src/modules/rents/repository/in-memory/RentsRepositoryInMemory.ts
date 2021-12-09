import { ICreateRentDTO } from "@modules/rents/dtos/ICreateRentDTO";
import { Rent } from "@modules/rents/infra/typeorm/entities/Rent";
import { IRentsRepository } from "../IRentsRepository";

class RentsRepositoryInMemory implements IRentsRepository {
  rents: Rent[] = [];

  async findOpenRentByBook(book_id: string): Promise<Rent> {
    return this.rents.find((rent) => rent.book_id === book_id && !rent.end_date);
  }

  async findOpenRentByUser(user_id: string): Promise<Rent> {
    return this.rents.find((rent) => rent.user_id === user_id && !rent.end_date);
  }

  async create({
    book_id,
    user_id,
    expected_return_date
  }: ICreateRentDTO): Promise<Rent> {
    const rent = new Rent();

    Object.assign(rent, {
      book_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });

    this.rents.push(rent);

    return rent;
  }

  async findById(id: string): Promise<Rent> {
    return this.rents.find((rent) => rent.id === id);
  }

  async findByUser(user_id: string): Promise<Rent[]> {
    return this.rents.filter((rent) => rent.user_id === user_id);
  }
}

export { RentsRepositoryInMemory };