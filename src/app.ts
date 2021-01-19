import express from "express";
import bodyparser from "body-parser";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
    }

    private config(): void {
        this.app.use(bodyparser.json());
    }
}

export default new App().app;
