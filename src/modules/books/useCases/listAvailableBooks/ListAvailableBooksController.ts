import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableBooksUseCase } from "./ListAvailableBooksUseCase";

class ListAvailableBooksController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { category, book_name, isbn } = req.query;

    const listBooksUseCase = container.resolve(ListAvailableBooksUseCase);

    const book = await listBooksUseCase.execute({
      category: category as string,
      book_name: book_name as string,
      isbn: isbn as string,
    });

    return res.status(200).json(book);
  }
}

export { ListAvailableBooksController };