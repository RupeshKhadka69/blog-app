import express, { Express, urlencoded,Request,Response } from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import cookieParser from "cookie-parser";
import { ErrorHandler, notFound } from "./middleware/errorMiddleware";
import { createApiRouter } from "./routes";
import { UserRepository } from "./repositories/UserRepository";
import { User } from "./entities/user.entities";
import { UserService } from "./services/UserServices";
import { UserController } from "./controller/UserController";
import { PostRepository } from "./repositories/PostRepository";
import { Post } from "./entities/post.entities";
import { PostService } from "./services/PostServices";
import { PostControrller } from "./controller/PostController";

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
    this.app.use(cookieParser())
  }
  private initializeRoutes() {
    // initializing the repository
    const userRepository = new UserRepository(this.dataSource.getRepository(User));
    const postRepository = new PostRepository(this.dataSource.getRepository(Post))

    // initializing the services
    const userService = new UserService(userRepository);
    const postService = new PostService(postRepository);

    // initializing the controller
    const userController = new UserController(userService);
    const postController = new PostControrller(postService);


    const apiRouter = createApiRouter(
        userController,
        postController
    )
  
    this.app.use("/api",apiRouter);

  }

  private initializeErrorMiddleware(){
    this.app.use(notFound)
    this.app.use(ErrorHandler)
  }
}
