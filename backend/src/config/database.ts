import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path, { parse } from "path";

dotenv.config();

export class DbConfig {
  private static instance: DbConfig;
  private dataSource: DataSource;

  private constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "blog_app",
      entities: [path.join(__dirname, "../entities/**/*.{ts,js}")],
      synchronize: process.env.NODE_ENV !== "production", // Only in development
      logging: process.env.NODE_ENV !== "production",
    });
  }
  public static getInstance(): DbConfig {
    if (!DbConfig.instance) {
      DbConfig.instance = new DbConfig();
    }
    return DbConfig.instance;
  }

  public async initialize(): Promise<DataSource> {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
        console.log("database connection initialize successfully");
      }
      return this.dataSource;
    } catch (error) {
      console.log("error while connecting to the database", error);
      throw error;
    }
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }
}

export const getDataSource = async (): Promise<DataSource> => {
  return await DbConfig.getInstance().initialize();
};
