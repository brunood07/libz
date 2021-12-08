import { inject, injectable } from "tsyringe";
import { resolve } from "path";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendPasswordEmailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) { }

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "email", "forgetPassword.hbs");

    if (!user) {
      throw new AppError("User not found!");
    }

    const token = uuidV4();

    const refreshToken = await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: this.dateProvider.addHours(3)
    });

    const variables = {
      name: user.full_name,
      link: `${process.env.FORGOT_MAIL_URL}${refreshToken.refresh_token}`
    }

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      templatePath
    );
  }
}

export { SendPasswordEmailUseCase };