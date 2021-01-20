import express from "express";
import bodyparser from "body-parser";
import { charactersRoutes } from "./modules/characters/characters.routes";
import { keystonesRoutes } from "./modules/keystones/keystones.routes";
import cors from "cors";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.initRoutes();
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyparser.json());
    }

    private initRoutes(): void {
        this.app.use("/api/characters", charactersRoutes);
        this.app.use("/api/keystones", keystonesRoutes);
    }
}

export default new App().app;
