import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBookUseCase } from "./CreateBookUseCase";

class CreateBookController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      book_name,
      author,
      category,
      photo_url,
      number_of_pages,
    } = req.body;

    const createBookUseCase = container.resolve(CreateBookUseCase);

    const book = await createBookUseCase.execute({
      book_name,
      author,
      category,
      photo_url,
      number_of_pages,
    });

    return res.status(201).json(book);
  }
}

export { CreateBookController };
