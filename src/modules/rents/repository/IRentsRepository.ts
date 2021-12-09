import { ICreateRentDTO } from "../dtos/ICreateRentDTO";
import { Rent } from "../infra/typeorm/entities/Rent";

interface IRentsRepository {
  findOpenRentByBook(book_id: string): Promise<Rent>;
  findOpenRentByUser(user_id: string): Promise<Rent>;
  create(data: ICreateRentDTO): Promise<Rent>;
  findById(id: string): Promise<Rent>;
  findByUser(user_id: string): Promise<Rent[]>;
}

export { IRentsRepository };