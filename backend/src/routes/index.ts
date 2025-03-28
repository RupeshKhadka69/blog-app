import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { UserController } from "../controller/UserController";
import { likeRoutes } from "./likeRoutes";
import { LikeController } from "../controller/LikeController";
import { postRouter } from "./postRoutes";
import { PostControrller } from "../controller/PostController";

export const createApiRouter = (
  userController: UserController,
  postController: PostControrller,
  likeController: LikeController
): Router => {
  const router = Router();

  router.use("/user", userRoutes(userController));
  router.use("/like", likeRoutes(likeController));

  router.use("/post", postRouter(postController));
  return router;
};
