import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { booksRoutes } from "./books.routes";
import { passwordRoutes } from "./password.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/books", booksRoutes);
router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes);

export { router };