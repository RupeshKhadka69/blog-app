import { LikeServices } from "../services/LikeServices";
import { Request, Response } from "express";

export class LikeController {
  private likeService: LikeServices;
  constructor(likeService: LikeServices) {
    this.likeService = likeService;
  }

  togglePostLike = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const userId = (req as any).user.id;
      const result = await this.likeService.togglePostLike(userId, postId);
      res.status(200).json({
        success:true,
        data:result
      })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Error toggling post like"
          });
    }
  };
  toggleCommentLike = async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const userId = (req as any).user.id;
      const result = await this.likeService.toggleCommentLike(userId, commentId);
      res.status(200).json({
        success:true,
        data:result
      })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Error toggling comment like"
          });
    }
  };
  getPostLike = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const likes = await this.likeService.findPostLikes(postId);
      res.status(200).json({
        success:true,
        data:likes
      })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Error getting post like"
          });
    }
  };
  getCommentLike = async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const likes = await this.likeService.findCommentLikes(commentId);
      res.status(200).json({
        success:true,
        data:likes
      })
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Error getting comment likes"
          });
    }
  };
}
