import "reflect-metadata";
import dotenv from "dotenv";
import { getDataSource } from "./src/config/database";
import { App } from "./src/app";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const dataSource = await getDataSource();
    console.log("Database connection established");

    const app = new App(dataSource);
    app.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("error while starting the server", error);
    process.exit(1);
  }
};

startServer();

