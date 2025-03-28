import { Router } from "express";
import { CommentController } from "../controller/CommentController";
import { auth } from "../middleware/authMiddleware";

export const CommentRouter = (commentController: CommentController) => {
  const router = Router();
  router.get("/post/:postId", commentController.getCommentByPostId);
  router.post("/post/:postId", auth, commentController.createComment);
  router.patch("/:id", auth, commentController.updateComment);
  router.delete("/:id", auth, commentController.deleteComment);
  return router;
};
