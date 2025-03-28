import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { UserController } from "../controller/UserController";
import { likeRoutes } from "./likeRoutes";
import { LikeController } from "../controller/LikeController";
export const createApiRouter = (
  userController: UserController,
  likeController: LikeController
): Router => {
  const router = Router();

  router.use("/user", userRoutes(userController));
  router.use("/like", likeRoutes(likeController));

  return router;
};
