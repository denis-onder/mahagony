import jwt from "jsonwebtoken";
import { IUser } from "../domain/User";
import config from "../config";

export function generateToken(user: IUser): string {
  return jwt.sign({ ...user }, config.secret, {
    expiresIn: "1h",
  });
}

export function decodeToken(token: string): IUser | null {
  const decoded = jwt.verify(token, config.secret);

  if (decoded) {
    return (decoded as jwt.JwtPayload)._doc as IUser;
  } else {
    return null;
  }
}
