import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendPasswordEmailUseCase } from "./SendPasswordEmailUseCase";

class SendPasswordEmailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendPasswordEmailUseCase = container.resolve(SendPasswordEmailUseCase);

    await sendPasswordEmailUseCase.execute(email);

    return res.send();
  }
}

export { SendPasswordEmailController };