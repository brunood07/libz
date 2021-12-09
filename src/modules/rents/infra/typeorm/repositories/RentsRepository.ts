import { getRepository, Repository } from "typeorm";

import { ICreateRentDTO } from "@modules/rents/dtos/ICreateRentDTO";
import { IRentsRepository } from "@modules/rents/repository/IRentsRepository";
import { Rent } from "../entities/Rent";

class RentsRepository implements IRentsRepository {
  private repository: Repository<Rent>

  constructor() {
    this.repository = getRepository(Rent);
  }

  async findOpenRentByBook(book_id: string): Promise<Rent> {
    const openByBook = await this.repository.findOne({
      where: { book_id, end_date: null }
    });

    return openByBook;
  }

  async findOpenRentByUser(user_id: string): Promise<Rent> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null }
    });

    return openByUser;
  }

  async create({
    book_id,
    user_id,
    id,
    end_date,
    expected_return_date,
    total
  }: ICreateRentDTO): Promise<Rent> {
    const rent = this.repository.create({
      book_id,
      user_id,
      id,
      end_date,
      expected_return_date,
      total
    });

    await this.repository.save(rent);

    return rent;
  }

  async findById(id: string): Promise<Rent> {
    const rent = await this.repository.findOne(id);

    return rent;
  }

  async findByUser(user_id: string): Promise<Rent[]> {
    const rents = await this.repository.find({
      where: { user_id },
      relations: ["book"]
    });

    return rents;
  }
}

export { RentsRepository };