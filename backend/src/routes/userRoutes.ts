import { Router } from "express";
import { UserController } from "../controller/UserController";
import { auth } from "../middleware/authMiddleware";

export const userRoutes = (userController: UserController): Router => {
  const router = Router();
  router.post("/register", userController.register);
  router.post("/login", userController.login);
  router.patch("/update-user", auth, userController.updateProfile);
  router.get("/user", auth, userController.getProfile);

  return router;
};
