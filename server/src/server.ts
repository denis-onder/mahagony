import express from "express";
import cors from "cors";
import config from "./config";
import * as bodyParser from "body-parser";
import AuthenticationController from "./controllers/AuthenticationController";
import { connect } from "./database";

class ExpressApplication {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  private applyMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  private configureRoutes(): void {
    const authController = new AuthenticationController();

    this.app.use("/auth", authController.router);
  }

  public async start(): Promise<void> {
    this.applyMiddleware();
    this.configureRoutes();

    await connect();
    console.log("Database connection established!");

    this.app.listen(config.port, () =>
      console.log(`Server running!\nhttp://localhost:${config.port}/`)
    );
  }
}

export default new ExpressApplication();
