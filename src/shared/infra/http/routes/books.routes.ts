import { Router } from "express";

import { CreateBookController } from "@modules/books/useCases/createBook/CreateBookController";
import { ListBooksController } from "@modules/books/useCases/listBooks/ListBooksController";

const booksRoutes = Router();

const createBookController = new CreateBookController();
const listBooksController = new ListBooksController();

booksRoutes.post("/", createBookController.handle);
booksRoutes.get("/", listBooksController.handle);

export { booksRoutes };