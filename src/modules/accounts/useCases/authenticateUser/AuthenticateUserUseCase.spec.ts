import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate with an incorrect email", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        full_name: "Test Name",
        email: "test@test.com",
        password: "passwordtest",
        address: "test address",
        telephone: "1199887766997",
        id_number: "89878764618"
      }

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: "wrong@email.com",
        password: user.password
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("Should not be able to authenticate with an incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        full_name: "Test Name",
        email: "test@test.com",
        password: "passwordtest",
        address: "test address",
        telephone: "1199887766997",
        id_number: "89878764618"
      }

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrongpassword"
      });
    }).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
