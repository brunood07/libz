import { sign } from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

import auth from "@config/auth";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ResetPasswordUseCase } from "./resetPasswordUseCase";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let resetPasswordUseCase: ResetPasswordUseCase;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Reset password", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    resetPasswordUseCase = new ResetPasswordUseCase(
      usersTokensRepository,
      dateProvider,
      usersRepository
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider
    );
  });

  it("Should be able to reset user password", async () => {
    const user: ICreateUserDTO = {
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    };

    const deletePassword = jest.spyOn(usersTokensRepository, "deleteById");

    await createUserUseCase.execute(user);

    const { refresh_token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    await resetPasswordUseCase.execute({ token: refresh_token, password: user.password });

    expect(deletePassword).toHaveBeenCalled();
  });

  it("Should not be able to reset a password with an invalid token", async () => {
    const user: ICreateUserDTO = {
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    };

    await createUserUseCase.execute(user);

    const invalidToken = sign({}, auth.secret_refresh_token, {
      subject: uuidV4(),
      expiresIn: auth.expires_in_refresh_token
    });

    await expect(
      resetPasswordUseCase.execute({ token: invalidToken, password: user.password })
    ).rejects.toEqual(new AppError("Token expired!"));
  });

  it("Should not be able to reset a user password with an expired token", async () => {
    const user: ICreateUserDTO = {
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    };

    await createUserUseCase.execute(user);

    const { refresh_token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    await expect(
      resetPasswordUseCase.execute({ token: refresh_token, password: user.password, date_now: dateProvider.addDays(100) })
    ).rejects.toEqual(new AppError("Token expired!"));
  });
});