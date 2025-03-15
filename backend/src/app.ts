import express, { Express } from "express";
import cors from "cors"
import { DataSource } from "typeorm";


export class App {
    public app:Express;
    private dataSource:DataSource;

    constructor(dataSource:DataSource){
        this.app = express();
        this.dataSource = dataSource;
    }
}