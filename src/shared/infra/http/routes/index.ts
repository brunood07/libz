import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { booksRoutes } from "./books.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/books", booksRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };