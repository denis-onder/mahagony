import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../domain/AuthorizedRequest";
import { decodeToken } from "../utils/jwt";
import { IUser, UserModel } from "../domain/User";

export default async function (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization;
  let user: IUser | null = null;

  try {
    if (token) {
      user = decodeToken(token);
    }

    if (!user || !user.status) {
      throw new Error();
    }

    req.user = (await UserModel.findById(user._id)) as IUser;

    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
}
