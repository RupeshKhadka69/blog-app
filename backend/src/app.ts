import express, { Express, urlencoded, Request, Response } from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import cookieParser from "cookie-parser";
import { ErrorHandler, notFound } from "./middleware/errorMiddleware";
import { createApiRouter } from "./routes";
import { UserRepository } from "./repositories/UserRepository";
import { User } from "./entities/user.entities";
import { UserService } from "./services/UserServices";
import { UserController } from "./controller/UserController";
import { LikesRepository } from "./repositories/LikesRepository";
import { Like } from "./entities/likes.entities";
import { LikeServices } from "./services/LikeServices";
import { LikeController } from "./controller/LikeController";
import { PostRepository } from "./repositories/PostRepository";
import { Post } from "./entities/post.entities";
import { PostService } from "./services/PostServices";
import { PostControrller } from "./controller/PostController";
import { CommentRepository } from "./repositories/CommentRepository";
import { Comment } from "./entities/comment.entities";
import { CommentServices } from "./services/CommentServices";
import { CommentController } from "./controller/CommentController";

export class App {
  public app: Express;
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.app = express();
    this.dataSource = dataSource;
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorMiddleware();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());
  }
  private initializeRoutes() {
    // initializing the repository
    const userRepository = new UserRepository(
      this.dataSource.getRepository(User)
    );
    const likeRepository = new LikesRepository(
      this.dataSource.getRepository(Like)
    );
    const postRepository = new PostRepository(
      this.dataSource.getRepository(Post)
    );
    const commentRepository = new CommentRepository(
      this.dataSource.getRepository(Comment)
    );

    // initializing the services
    const userService = new UserService(userRepository);
    const likeService = new LikeServices(likeRepository);
    const postService = new PostService(postRepository);
    const commentService = new CommentServices(commentRepository);
    // initializing the controller
    const userController = new UserController(userService);
    const likeController = new LikeController(likeService);
    const postController = new PostControrller(postService);
    const commentController = new CommentController(commentService);

    const apiRouter = createApiRouter(
      userController,
      postController,
      likeController,
      commentController
    );

    this.app.use("/api", apiRouter);
  }

  private initializeErrorMiddleware() {
    this.app.use(notFound);
    this.app.use(ErrorHandler);
  }
}
