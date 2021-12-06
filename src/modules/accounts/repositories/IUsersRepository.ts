import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<User>;
  findByIdNumber(id_number: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };