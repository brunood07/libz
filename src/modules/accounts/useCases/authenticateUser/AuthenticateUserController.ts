import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {

  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const { password, email } = req.body;

      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

      const authenticateInfo = await authenticateUserUseCase.execute({ password, email });

      return res.json(authenticateInfo);
    } catch (err) {
      next(err);
    }
  }
}

export { AuthenticateUserController };