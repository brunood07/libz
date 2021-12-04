import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListBooksUseCase } from "./ListBooksUseCase";

class ListBooksController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const listBooksUseCase = container.resolve(ListBooksUseCase);

    const book = await listBooksUseCase.execute(id);

    return res.status(200).json(book);
  }
}

export { ListBooksController };