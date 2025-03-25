import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { UserController } from "../controller/UserController";

export const createApiRouter = (userController: UserController): Router => {
  const router = Router();

  router.use("/user", userRoutes(userController));

  return router;
};
