import { PaginatedResponse } from "./PaginatedResponse";
import { Request, Response, Router } from "express";

export default interface BaseController<T> {
  router: Router;

  create(req: Request, res: Response): Promise<T | null>;
  find(req: Request, res: Response): Promise<Array<T> | PaginatedResponse<T>>;
  findById(req: Request, res: Response): Promise<T | null>;
  update(req: Request, res: Response): Promise<T | null>;
  delete(req: Request, res: Response): Promise<boolean>;
}
