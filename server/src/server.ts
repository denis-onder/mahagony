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
import cookieParser from "cookie-parser";

class ExpressApplication {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  private applyMiddleware(): void {
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    const whitelist = ["http://localhost:3000"];
    const corsOptions = {
      credentials: true, // This is important.
      origin: (origin: any, callback: any) => {
        if (whitelist.includes(origin)) return callback(null, true);

        callback(new Error("Not allowed by CORS"));
      },
    };

    this.app.use(cors(corsOptions));
  }

  private configureRoutes(): void {
    const userService = new UserService();
    const permissionService = new PermissionService();

    const authController = new AuthenticationController(userService);
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
