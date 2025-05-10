import { Repository } from "typeorm";
import { Like } from "../entities/likes.entities";
import { BaseRepository } from "./BaseRepository";

export class LikesRepository extends BaseRepository<Like> {
    constructor (repository: Repository<Like>){
        super(repository);
    }
    async findUserPostLike(userId:string,postId:string):Promise<Like | null>{
     return this.repository.findOne({
        where: {postId,userId}
     })
    }
    async findUserCommentLike(userId: string, commentId: string): Promise<Like | null> {
        return this.repository.findOne({
          where: { userId, commentId }
        });
      }
} 