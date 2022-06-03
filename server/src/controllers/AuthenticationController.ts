import validator from "validator";
import argon2 from "argon2";
import { Request, Response, Router } from "express";
import { generateToken } from "../utils/jwt";
import { IUser } from "../domain/User";
import UserService from "../services/UserService";
import authMiddleware from "../middleware/auth";
import { AuthorizedRequest } from "../domain/AuthorizedRequest";

interface LoginPayload {
  identifier: string;
  password: string;
}

export default class AuthenticationController {
  router: Router;

  constructor(private userService: UserService) {
    this.router = Router();

    this.router.post("/register", (req, res) => this.register(req, res));
    this.router.post("/login", (req, res) => this.login(req, res));
    this.router.get("/me", authMiddleware, (req, res) => this.getMe(req, res));
  }

  register(req: Request, res: Response): void {
    const user: IUser = req.body;

    this.userService
      .create(user)
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
  async login(req: Request, res: Response): Promise<void> {
    const credentials: Partial<LoginPayload> = req.body;

    if (!credentials.identifier || !credentials.password) {
      res.status(400).json({ error: "Missing credentials" });
      return;
    }

    let query = {};

    if (validator.isEmail(credentials.identifier)) {
      query = { email: credentials.identifier };
    } else {
      query = { username: credentials.identifier };
    }

    const [user] = await this.userService.find(query);

    if (!user) {
      res.status(404).send("User not found.");
      return;
    }

    const isValid = await argon2.verify(
      user.password,
      credentials.password as string
    );

    if (!isValid) {
      res.status(401).send("Invalid password.");
      return;
    }

    const token = generateToken(user);
    const expirationTimestamp = new Date(
      new Date().getTime() + 60 * 60 * 24 * 1000
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: expirationTimestamp,
      })
      .send(token);
  }
  async getMe(req: AuthorizedRequest, res: Response): Promise<void> {
    try {
      const user = await this.userService.findById(
        String((req.user as IUser)._id)
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
