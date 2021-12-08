import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "./resetPasswordUseCase";

class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ token: String(token), password });

    return res.send();
  }
}

export { ResetPasswordController };