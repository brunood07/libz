import { Router } from "express";
import { CreateBookController } from "../../../../modules/books/useCases/createBook/CreateBookController";

const booksRoutes = Router();

const createBookController = new CreateBookController();

booksRoutes.post("/", createBookController.handle);

export { booksRoutes };