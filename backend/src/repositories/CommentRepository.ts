import { Repository } from "typeorm";
import { Comment } from "../entities/comment.entities";
import { BaseRepository } from "./BaseRepository";

export class CommentRepository extends BaseRepository<Comment> {
  constructor(repository: Repository<Comment>) {
    super(repository);
  }
  async findPostById(postId: string): Promise<Comment[]> {
    return this.repository.find({
      where: { postId },
      relations: ["author", "likes"],
      order: { createdAt: "DESC" },
    });
  }
}
