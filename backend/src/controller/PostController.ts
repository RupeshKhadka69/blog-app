import { PostService } from "../services/PostServices";
import { Post } from "../entities/post.entities";
import { Request, Response } from "express";

export class PostControrller {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }
  createPost = async (req: Request, res: Response) => {
    try {
      const postData = req.body;
      const authorId = (req as any).user.id;
      const createdPost = await this.postService.createPost(authorId, postData);
      res.status(200).json({ message: "success", data: createdPost });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "failed creating the post",
      });
    }
  };
  updatePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const authorId = (req as any).user.id;
      const postData: Partial<Post> = req.body;

      const updatePost = await this.postService.editPost(
        id,
        authorId,
        postData
      );
      res.status(200).json({ message: "success", data: updatePost });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "failed updating the post",
      });
    }
  };
  uploadImage = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        console.log("no file provided");
        return;
      }
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      res.status(200).json({ url: imageUrl });
    } catch (err: any) {
      res.status(500).json({ message: "error uploading file" });
    }
  };
  deletePost = async (req: Request, res: Response) => {
    try {
      const authorId = (req as any).user.id;
      const { id } = req.params;
      await this.postService.deletePost(id, authorId);
      res
        .status(200)
        .json({ message: "post deleted successfully", success: true });
    } catch (err: any) {
      res.status(err.message.includes("Unauthorized") ? 403 : 400).json({
        success: false,
        message: err.message || "Error deleting post",
      });
    }
  };
  getPostById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(id);
      if (!post) {
        res.status(404).json({
          success: false,
          message: "Post not found",
        });
        return;
      }

      res.status(200).json({ message: "success", data: post });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "failed getting all post",
      });
    }
  };

  getAllPosts = async (req: Request, res: Response) => {
    try {
      const getAllPosts = await this.postService.getAllPosts();
      if (!getAllPosts) {
        res.status(404).json({
          success: false,
          message: "Post not found",
        });
        return;
      }

      res.status(200).json({ message: "success", data: getAllPosts });
    } catch (err: any) {}
  };
  getAuthorPost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const getAuthorPost = await this.postService.getAllPostOfAuthor(id);
      res.status(200).json({ message: "success", data: getAuthorPost });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Error retrieving user posts",
      });
    }
  };
}
