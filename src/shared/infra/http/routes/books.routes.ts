import { Router } from "express";

import { CreateBookController } from "@modules/books/useCases/createBook/CreateBookController";
import { ListAvailableBooksController } from "@modules/books/useCases/listAvailableBooks/ListAvailableBooksController";

const booksRoutes = Router();

const createBookController = new CreateBookController();
const listAvailableBooksController = new ListAvailableBooksController();

booksRoutes.post("/", createBookController.handle);
booksRoutes.get("/available", listAvailableBooksController.handle);

export { booksRoutes };