import { Router } from "express";
import { booksRoutes } from "./books.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/books", booksRoutes);
router.use("/users", usersRoutes)

export { router };