import { Repository } from "typeorm";
import { Post } from "../entities/post.entities";
import { BaseRepository } from "./BaseRepository";

export class PostRepository extends BaseRepository<Post> {
  constructor(repository: Repository<Post>) {
    super(repository);
  }

  async findAllPublished(): Promise<Post[]> {
    return this.repository.find({
        where:{published: true},
        relations:["author"],
        order:{createdAt: "DESC"}
    });
  }

  async findByIdWithRelation(id: string): Promise<Post | null> {
      return this.repository.findOne({
        where: {id},
        relations: ["author", "comments", "comments.author", "likes", "likes.user"]
      })
  }

  async findByAuthorId(authorId: string): Promise<Post[]> {
    return this.repository.find({
      where: { authorId },
      relations: ["author"],
      order: { createdAt: "DESC" }
    });
  }

  async getLikesCount(postId: string): Promise<number> {
    return this.repository
      .createQueryBuilder("post")
      .leftJoin("post.likes", "likes")
      .where("post.id = :postId", { postId })
      .getCount();
  }
}
