import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    full_name,
    email,
    password,
    address,
    telephone,
    id_number
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!")
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      full_name,
      email,
      password: passwordHash,
      address,
      telephone,
      id_number
    });
  }
}

export { CreateUserUseCase };