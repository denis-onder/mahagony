import { Permission } from "./Permission";

export interface UserPayload {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  permissions: Array<Permission>;
}

export interface User extends UserPayload {
  _id: string;
  status: boolean;
}
