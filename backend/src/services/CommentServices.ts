import { CommentRepository } from "../repositories/CommentRepository";

export class CommentServices {
  private commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async getPostComment(postId: string) {
    return this.commentRepository.findPostById(postId);
  }
  async createComment(authorId: string, postId: string, content: string) {
    return this.commentRepository.create({ postId, authorId, content });
  }
  async updateComment(id: string, authorId: string, content: string) {
    const existingComment = await this.commentRepository.findById(id);
    if (!existingComment) {
      throw new Error("Comment not found");
    }
    if (existingComment.authorId !== authorId) {
      throw new Error(
        "Unauthorized: you are only allowed to edit your own comment"
      );
    }
    return this.commentRepository.update(id, { content });
  }
  async deleteComment(id: string, authorId: string) {
    const existingComment = await this.commentRepository.findById(id);
    if (!existingComment) {
      throw new Error("Comment not found to delete");
    }
    if (existingComment.authorId !== authorId) {
      throw new Error(
        "Unauthorized: you are only allowed to delete your own comment"
      );
    }
  }
}
