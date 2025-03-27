import { PostRepository } from "../repositories/PostRepository";
import { Post } from "../entities/post.entities";
export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(authorId:string,data: Partial<Post>) {
    return this.postRepository.create({...data,authorId});
  }
  async editPost(postId: string, authorId:string,data: Partial<Post>) {
    const post = await this.postRepository.findById(postId);
    if(!post){
        throw new Error("Post not found");
    }
    if(post.authorId !== authorId ){
        throw new Error("You can only edit your own post")
    }
    return this.postRepository.update(postId, data);
  }
  async deletePost(postId: string,authorId:string) {
    const post = await this.postRepository.findById(postId);
    if(!post){
        throw new Error("Post not found");
    }
    if(post.authorId !== authorId ){
        throw new Error("You can only delete your own post")
    }
    return this.postRepository.delete(postId);
  }
  async getPostById(postId: string) {
    return this.postRepository.findByIdWithRelation(postId);
  }

  async getAllPosts() {
    return this.postRepository.findAllPublished();
  }
  async getAllPostOfAuthor(id: string) {
    return this.postRepository.findByAuthorId(id);
  }
  async getPostLikeCount(postId: string) {
    return this.postRepository.getLikesCount(postId);
  }
}
