import { Request, Response } from "express";
import { UserService } from "../services/UserServices";
import { User } from "../entities/user.entities";

export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: Partial<User> = req.body;
      const { user, token } = await this.userService.Register(userData);
      const { password, ...rest } = user;
      res.status(200).json({ message: "success", data: { rest, token } });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "Registration failed",
      });
    }
  };
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const { loginUser, token } = await this.userService.Login(
        password,
        email
      );
      const { password: _, ...rest } = loginUser;
      const options = {
        httpOnly: true,
        secure: false,
      };
      res
        .status(200)
        .cookie("token", token,options)
        .json({ message: "success", data: { ...rest, token } });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "Login failed",
      });
    }
  };

  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const user = await this.userService.getProfile(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      const { password, ...rest } = user;

      res.status(200).json({
        success: true,
        data: rest,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Error retrieving profile",
      });
    }
  };
  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.id;
      const userData: Partial<User> = req.body;

      const updatedUser = await this.userService.updateUser(userId, userData);

      if (!updatedUser) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }
      const { password, ...rest } = updatedUser;

      res.status(200).json({
        success: true,
        data: rest,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Error updating profile",
      });
    }
  };
}
