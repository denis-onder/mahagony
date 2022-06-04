import { PaginatedResponse } from "./../domain/PaginatedResponse";
import {
  UserFilteringParams,
  UserModel,
  UserPaginationParams,
} from "./../domain/User";
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
  async find(
    req: AuthorizedRequest,
    res: Response
  ): Promise<PaginatedResponse<IUser>> {
    try {
      const pagingParams: UserPaginationParams = {
        limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
      };

      const filteringParams: UserFilteringParams = {
        name: req.query.name as string,
        status: req.query.status as string,
      };

      const params = {
        ...pagingParams,
        ...filteringParams,
      };

      const response = await this.userService.find(params);

      res.status(200).json(response);

      return response;
    } catch (error) {
      res.status(404).json({ error });

      return {
        count: 0,
        results: [],
        totalPages: 0,
        currentPage: 0,
      };
    }
  }
  async findById(req: AuthorizedRequest, res: Response): Promise<IUser | null> {
    try {
      const user = await this.userService.findById(req.params.id);

      if (!user) {
        throw new Error("Not found.");
      }

      res.status(200).json(user);

      return user;
    } catch (error) {
      res.status(404).json({ error });

      return null;
    }
  }
  async update(req: AuthorizedRequest, res: Response): Promise<IUser | null> {
    try {
      const updatedUser = await this.userService.update(
        req.params.id,
        req.body
      );

      res.status(200).json(updatedUser);

      return updatedUser;
    } catch (error) {
      res.status(404).json({ error });

      return null;
    }
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
