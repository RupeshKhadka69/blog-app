import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { UserController } from "../controller/UserController";
import { postRouter } from "./postRoutes";
import { PostControrller } from "../controller/PostController";
export const createApiRouter = (
  userController: UserController,
  postController: PostControrller
): Router => {
  const router = Router();

  router.use("/user", userRoutes(userController));
  router.use("/post", postRouter(postController));
  return router;
};
