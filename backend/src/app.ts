import express, { Express, urlencoded,Request,Response } from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import { ErrorHandler, notFound } from "./middleware/errorMiddleware";
import { createApiRouter } from "./routes";
import { UserRepository } from "./repositories/UserRepository";
import { User } from "./entities/user.entities";
import { UserService } from "./services/UserServices";
import { UserController } from "./controller/UserController";

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
  }
  private initializeRoutes() {
    // initializing the repository
    const userRepository = new UserRepository(this.dataSource.getRepository(User));

    // initializing the services
    const userService = new UserService(userRepository);

    // initializing the controller
    const userController = new UserController(userService);


    const apiRouter = createApiRouter(
        userController
    )
  
    this.app.use("/api",apiRouter);

  }

  private initializeErrorMiddleware(){
    this.app.use(notFound)
    this.app.use(ErrorHandler)
  }
}
