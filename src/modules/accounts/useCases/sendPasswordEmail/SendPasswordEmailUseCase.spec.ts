import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendPasswordEmailUseCase } from "./SendPasswordEmailUseCase";

let sendPasswordEmailUseCase: SendPasswordEmailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendPasswordEmailUseCase = new SendPasswordEmailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618"
    });

    await sendPasswordEmailUseCase.execute("test@test.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendPasswordEmailUseCase.execute("test2@test.com.br")
    ).rejects.toEqual(new AppError("User not found!"));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      full_name: "Test Name",
      email: "test@test.com",
      password: "passwordtest",
      address: "test address",
      telephone: "1199887766997",
      id_number: "89878764618",
    });

    await sendPasswordEmailUseCase.execute("test@test.com");

    expect(generateTokenMail).toBeCalled();
  });
})