import { Router } from "express";

import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/resetPasswordController";
import { SendPasswordEmailController } from "@modules/accounts/useCases/sendPasswordEmail/SendPasswordEmailController";

const passwordRoutes = Router();

const resetPasswordController = new ResetPasswordController();
const sendPasswordEmailController = new SendPasswordEmailController();

passwordRoutes.post("/forgot", sendPasswordEmailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export { passwordRoutes }