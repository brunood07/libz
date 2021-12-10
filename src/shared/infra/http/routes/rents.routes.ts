import { Router } from "express";

import { CreateRentController } from "@modules/rents/useCases/createRent/CreateRentController";
import { DevolutionRentController } from "@modules/rents/useCases/devolutionRent/DevolutionRentController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListRentsByUserController } from "@modules/rents/useCases/listRentsByUser/ListRentsByUserController";

const rentsRoutes = Router();

const createRentController = new CreateRentController();
const devolutionRentController = new DevolutionRentController();
const listRentsByUserController = new ListRentsByUserController();

rentsRoutes.post("/", ensureAuthenticated, createRentController.handle);
rentsRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentController.handle);
rentsRoutes.get("/user", ensureAuthenticated, listRentsByUserController.handle);

export { rentsRoutes };