import { CommentServices } from "../services/CommentServices";
import { Request, Response } from "express";

export class CommentController {
  private commentService: CommentServices;

  constructor(commentService: CommentServices) {
    this.commentService = commentService;
  }
  getCommentByPostId = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentService.getPostComment(postId);
      res.status(200).json({
        success: false,
        data: comments,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "failed getting comment",
      });
    }
  };
  createComment = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const authorId = (req as any).user.id;
      const { content } = req.body;
      const comment = await this.commentService.createComment(
        authorId,
        postId,
        content
      );
      res.status(200).json({ success: true, data: comment });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "failed creating comment",
      });
    }
  };
  updateComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const authorId = (req as any).user.id;
      const { content } = req.body;
      const comment = await this.commentService.updateComment(
        id,
        authorId,
        content
      );
      res.status(200).json({ success: true, data: comment });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "failed updating comment",
      });
    }
  };
  deleteComment = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const authorId = (req as any).user.id;
      await this.commentService.deleteComment(id, authorId);
      res
        .status(200)
        .json({ success: true, message: "Comment deleted successfully" });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "failed deleting comment",
      });
    }
  };
}
