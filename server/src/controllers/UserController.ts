import { AuthorizedRequest } from "../domain/AuthorizedRequest";
import { IUser } from "../domain/User";
import BaseController from "../domain/BaseController";
import { Router, Response } from "express";
import UserService from "../services/UserService";

export default class UserController implements BaseController<IUser> {
  router: Router;

  constructor(private userService: UserService) {
    this.router = Router();

    this.router.get("/", (req, res) => this.find(req, res));
    this.router.get("/:id", (req, res) => this.findById(req, res));
    this.router.post("/", (req, res) => this.create(req, res));
    this.router.put("/:id", (req, res) => this.update(req, res));
    this.router.delete("/:id", (req, res) => this.delete(req, res));
  }

  async create(req: AuthorizedRequest, res: Response): Promise<IUser | null> {
    try {
      const user = await this.userService.create(req.body);

      res.status(200).json(user);

      return user;
    } catch (error) {
      res.status(400).json({ error });

      return null;
    }
  }
  async find(req: AuthorizedRequest, res: Response): Promise<IUser[]> {
    try {
      const users = await this.userService.find(req.query);

      res.status(200).json(users);

      return users;
    } catch (error) {
      res.status(400).json({ error });

      return [];
    }
  }
  async findById(req: AuthorizedRequest, res: Response): Promise<IUser | null> {
    try {
      const user = await this.userService.findById(req.params.id);

      res.status(200).json(user);

      return user;
    } catch (error) {
      res.status(400).json({ error });

      return null;
    }
  }
  update(req: AuthorizedRequest, res: Response): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  async delete(req: AuthorizedRequest, res: Response): Promise<boolean> {
    const deleted = await this.userService.delete(req.params.id);

    if (deleted) {
      res.status(201).json({ deleted });

      return true;
    } else {
      res.status(404).json({ deleted });

      return false;
    }
  }
}
