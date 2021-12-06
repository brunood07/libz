import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase"

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Create a new user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  // it("Should be able to create a new user", async () => {
  //   const user = await createUserUseCase.execute({
  //     full_name: "Test Name",
  //     email: "test@test.com",
  //     password: "passwordtest",
  //     address: "test address",
  //     telephone: "1199887766997",
  //     id_number: "89878764618"
  //   });

  //   expect(user).toHaveProperty("id");
  // });

  it("Should not be able to create a new user with an registered email", async () => {
    await createUserUseCase.execute({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    await expect(createUserUseCase.execute({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    })
    ).rejects.toEqual(new AppError("User already exists!"));
  });
});