import { Router } from "express";
import { PostControrller } from "../controller/PostController";
import { auth } from "../middleware/authMiddleware";
export const postRouter = (postController: PostControrller): Router => {
  const router = Router();
  router.get("/", postController.getAllPosts);
  router.get("/author/:id", postController.getAuthorPost);
  router.post("/", auth, postController.createPost);
  router.patch("/:id", auth, postController.updatePost);
  router.delete("/:id", auth, postController.deletePost);

  router.get("/:id", postController.getPostById);

  return router;
};
