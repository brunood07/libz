import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateBookController } from "@modules/books/useCases/createBook/CreateBookController";
import { ListAvailableBooksController } from "@modules/books/useCases/listAvailableBooks/ListAvailableBooksController";

const booksRoutes = Router();

const createBookController = new CreateBookController();
const listAvailableBooksController = new ListAvailableBooksController();

booksRoutes.post("/", ensureAuthenticated, createBookController.handle);
booksRoutes.get("/available", ensureAuthenticated, listAvailableBooksController.handle);

export { booksRoutes };