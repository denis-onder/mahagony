import { IPermission } from "./../domain/Permission";
import BaseController from "../domain/BaseController";
import { AuthorizedRequest } from "../domain/AuthorizedRequest";
import { Router, Response } from "express";
import PermissionService from "../services/PermissionService";

export default class PermissionController
  implements BaseController<IPermission>
{
  router: Router;

  constructor(private permissionService: PermissionService) {
    this.router = Router();

    this.router.get("/", (req, res) => this.find(req, res));
    this.router.get("/:id", (req, res) => this.findById(req, res));
    this.router.post("/", (req, res) => this.create(req, res));
    this.router.put("/:id", (req, res) => this.update(req, res));
    this.router.delete("/:id", (req, res) => this.delete(req, res));
  }

  async create(
    req: AuthorizedRequest,
    res: Response
  ): Promise<IPermission | null> {
    throw new Error("Method not implemented.");
  }
  async find(req: AuthorizedRequest, res: Response): Promise<IPermission[]> {
    throw new Error("Method not implemented.");
  }
  async findById(
    req: AuthorizedRequest,
    res: Response
  ): Promise<IPermission | null> {
    throw new Error("Method not implemented.");
  }
  async update(
    req: AuthorizedRequest,
    res: Response
  ): Promise<IPermission | null> {
    throw new Error("Method not implemented.");
  }
  async delete(req: AuthorizedRequest, res: Response): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
