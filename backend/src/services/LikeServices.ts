import { LikesRepository } from "../repositories/LikesRepository";
import { Like } from "../entities/likes.entities";

export class LikeServices {
  private likeRepository: LikesRepository;
  constructor(likeRepository: LikesRepository) {
    this.likeRepository = likeRepository;
  }

  async togglePostLike(
    userId: string,
    postId: string
  ): Promise<{ liked: boolean }> {
    const existingPostLike = await this.likeRepository.findUserPostLike(
      userId,
      postId
    );
    if (existingPostLike) {
      await this.likeRepository.delete(existingPostLike.id);
      return { liked: false };
    } else {
      await this.likeRepository.create({ userId, postId });
      return { liked: true };
    }
  }

  async toggleCommentLike(
    userId: string,
    commentId: string
  ): Promise<{ liked: boolean }> {
    const existingCommentLike = await this.likeRepository.findUserCommentLike(
      userId,
      commentId
    );
    if (existingCommentLike) {
      await this.likeRepository.delete(existingCommentLike.id);
      return { liked: false };
    } else {
      await this.likeRepository.create({ userId, commentId });
      return { liked: true };
    }
  }

  async findPostLikes(postId:string): Promise<Like[]>{
    return this.likeRepository.find({
        where:{postId},
        relations:["user"]
    })
  }
  async findCommentLikes(commentId:string) :Promise<Like[]>{
    return this.likeRepository.find({
        where:{commentId},
        relations:["user"]
    })
  }
}
