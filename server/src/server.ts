import express from "express";
import cors from "cors";
import config from "./config";
import * as bodyParser from "body-parser";
import AuthenticationController from "./controllers/AuthenticationController";
import { connect } from "./database";
import UserService from "./services/UserService";
import UserController from "./controllers/UserController";
import authMiddleware from "./middleware/auth";
import PermissionService from "./services/PermissionService";
import PermissionController from "./controllers/PermissionController";

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
    const userService = new UserService();
    const permissionService = new PermissionService();

    const authController = new AuthenticationController();
    const userController = new UserController(userService);
    const permissionController = new PermissionController(permissionService);

    this.app.use("/auth", authController.router);
    this.app.use("/users", authMiddleware, userController.router);
    this.app.use("/permissions", authMiddleware, permissionController.router);
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
