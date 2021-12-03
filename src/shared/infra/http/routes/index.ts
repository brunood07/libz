import { Router } from "express";
import { booksRoutes } from "./books.routes";

const router = Router();

router.use("/books", booksRoutes);

export { router };