import express from "express";
import { CharactersController } from "./characters.controller";

class CharactersRoute {
    public router: express.Router;
    public charactersController: CharactersController;

    constructor() {
        this.router = express.Router();
        this.charactersController = new CharactersController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get("/", this.charactersController.get);
        this.router.get(
            "/keystones",
            this.charactersController.getWithKeystones
        );
    }
}

export const charactersRoutes = new CharactersRoute().router;
