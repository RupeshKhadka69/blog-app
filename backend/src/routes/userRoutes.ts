import { Router } from "express";
import { UserController } from "../controller/UserController";
import { auth } from "../middleware/authMiddleware";
import upload from "../middleware/multerMiddleware";
export const userRoutes = (userController: UserController): Router => {
  const router = Router();
  router.post("/register", userController.register);
  router.post("/login", userController.login);
  router.patch("/update-user", auth, userController.updateProfile);
  router.get("/", auth, userController.getProfile);

  return router;
};
