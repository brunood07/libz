import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {

  async handle(req: Request, res: Response): Promise<Response> {
    const {
      full_name,
      email,
      password,
      address,
      telephone,
      id_number
    } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      full_name,
      email,
      password,
      address,
      telephone,
      id_number
    });

    return res.status(201).send(user);
  }
}

export { CreateUserController };