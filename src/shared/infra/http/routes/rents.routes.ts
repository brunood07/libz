import { Router } from "express";

import { CreateRentController } from "@modules/rents/useCases/createRent/CreateRentController";
import { DevolutionRentController } from "@modules/rents/useCases/devolutionRent/DevolutionRentController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentsRoutes = Router();

const createRentController = new CreateRentController();
const devolutionRentController = new DevolutionRentController();

rentsRoutes.post("/", ensureAuthenticated, createRentController.handle);
rentsRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentController.handle);

export { rentsRoutes };