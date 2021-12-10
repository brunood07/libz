import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


let refreshTokenUseCase: RefreshTokenUseCase;
let dateProvider: DayjsDateProvider;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepository: UsersRepositoryInMemory;

describe("Refresh token", () => {
  beforeEach(() => {
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    refreshTokenUseCase = new RefreshTokenUseCase(usersTokensRepository, dateProvider);
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to refresh a token", async () => {
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

    console.log(refresh_token)
    const result = await refreshTokenUseCase.execute(refresh_token);

    expect(result).toHaveProperty("token");
    expect(result).toHaveProperty("refresh_token");
  });

  it("Should not be able to refresh a token with an invalid refresh token", async () => {
    expect(async () => {
      const refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydW5vb2QwN0BnbWFpbC5jb20iLCJpYXQiOjE2Mzg4ODU4NjUsImV4cCI6MTY0MTQ3Nzg2NSwic3ViIjoiZDc1YzhmMmQtNjU4My00ZjFlLThiNWQtZTIyMTI2NjdhMDkwIn0.YYQnZUYLP84_uwH42DfUT7e5j1vKIwJSIII9lctr0hI";

      await refreshTokenUseCase.execute(refresh_token);

    }).rejects.toEqual(new AppError("Refresh token does not exists!"));
  })
})