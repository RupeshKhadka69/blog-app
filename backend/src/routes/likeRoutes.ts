import { Router } from "express";
import { LikeController } from "../controller/LikeController";
import { auth } from "../middleware/authMiddleware";

export const likeRoutes = (likeController: LikeController): Router => {
  const router = Router();
  router.post("/post/:postId", auth, likeController.togglePostLike);
  router.post("/comment/:commentId", auth, likeController.toggleCommentLike);
  router.get("/post/:postId", likeController.getPostLike);
  router.get("/comment/:commentId", likeController.getCommentLike);

  return router;
};
