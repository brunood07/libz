import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    full_name,
    email,
    password,
    address,
    telephone,
    id_number,
    id
  }: ICreateUserDTO): Promise<void> {

    const user = this.repository.create({ full_name, email, password, address, telephone, id_number, id });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });

    return user;
  }

  async findByIdNumber(id_number: string): Promise<User> {
    const user = await this.repository.findOne({ id_number });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user
  }
}

export { UsersRepository };
