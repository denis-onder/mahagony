import { Request } from "express";
import { IUser } from "./User";

export interface AuthorizedRequest extends Request {
  user?: IUser;
}
