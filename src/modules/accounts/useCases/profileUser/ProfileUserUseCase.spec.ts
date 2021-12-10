import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let profileUserUseCase: ProfileUserUseCase;

describe("Profile user use case", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    profileUserUseCase = new ProfileUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to return user profile", async () => {
    const id = "654";

    await usersRepositoryInMemory.create({
      id: id,
      full_name: "Test Name",
      address: "test address",
      id_number: "123456",
      email: "test@test.com",
      password: "123456",
      telephone: "987456123",
    });

    const profile = await profileUserUseCase.execute(id);

    expect(typeof profile).toBe("object");
  });
})