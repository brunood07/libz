import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    full_name,
    email,
    password,
    address,
    telephone,
    id_number
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      full_name,
      email,
      password,
      address,
      telephone,
      id_number
    });

    this.users.push(user);
  }
  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }
  async findByIdNumber(id_number: string): Promise<User> {
    return this.users.find(user => user.id_number === id_number);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

}

export { UsersRepositoryInMemory }