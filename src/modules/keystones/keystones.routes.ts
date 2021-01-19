import express from "express";
import { KeystonesController } from "./keystones.controller";

class KeystonesRoutes {
    public router: express.Router;
    public keystonesController: KeystonesController;

    constructor() {
        this.router = express.Router();
        this.keystonesController = new KeystonesController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router.get(
            "/:realmSlug/:characterName",
            this.keystonesController.get
        );
    }
}

export const keystonesRoutes = new KeystonesRoutes().router;
