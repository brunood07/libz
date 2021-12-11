import { Router } from "express";

import { CreateBookController } from "@modules/books/useCases/createBook/CreateBookController";
import { ListAvailableBooksController } from "@modules/books/useCases/listAvailableBooks/ListAvailableBooksController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const booksRoutes = Router();

const createBookController = new CreateBookController();
const listAvailableBooksController = new ListAvailableBooksController();

booksRoutes.post("/", ensureAuthenticated, createBookController.handle);
booksRoutes.get("/available", listAvailableBooksController.handle);

export { booksRoutes };