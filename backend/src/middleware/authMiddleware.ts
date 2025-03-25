import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  email: string;
}

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as DecodedToken;

    (req as any).user = decoded;

    next();
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
