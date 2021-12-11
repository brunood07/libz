import dayjs from "dayjs";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentUseCase } from "./CreateRentUseCase";

class CreateRentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { book_id } = req.body;
    const { id } = req.user;

    const createRentUseCase = container.resolve(CreateRentUseCase);

    const rent = await createRentUseCase.execute({
      book_id,
      expected_return_date: dayjs().add(7, "day").toDate(),
      user_id: id
    });

    return res.status(201).json(rent);
  }
}

export { CreateRentController };