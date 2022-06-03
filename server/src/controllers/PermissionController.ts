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
    try {
      const permission = await this.permissionService.create(req.body);

      res.status(200).json(permission);

      return permission;
    } catch (error) {
      res.status(400).json({ error });

      return null;
    }
  }
  async find(req: AuthorizedRequest, res: Response): Promise<IPermission[]> {
    try {
      const permissions = await this.permissionService.find(req.query);

      res.status(200).json(permissions);

      return permissions;
    } catch (error) {
      res.status(404).json({ error });

      return [];
    }
  }
  async findById(
    req: AuthorizedRequest,
    res: Response
  ): Promise<IPermission | null> {
    try {
      const permission = await this.permissionService.findById(req.params.id);

      if (!permission) {
        throw new Error("Not found.");
      }

      res.status(200).json(permission);

      return permission;
    } catch (error) {
      res.status(404).json({ error });

      return null;
    }
  }
  async update(
    req: AuthorizedRequest,
    res: Response
  ): Promise<IPermission | null> {
    throw new Error("Method not implemented.");
  }
  async delete(req: AuthorizedRequest, res: Response): Promise<boolean> {
    const deleted = await this.permissionService.delete(req.params.id);

    if (deleted) {
      res.status(201).json({ deleted });

      return true;
    } else {
      res.status(404).json({ deleted });

      return false;
    }
  }
}
