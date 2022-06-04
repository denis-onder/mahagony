import { Permission } from "./Permission";

export interface UserPayload {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export interface UserPaginationParams {
  page: number;
  limit: number;
}

export interface User extends UserPayload {
  _id: string;
  status: boolean;
  permissions: Array<Permission>;
}
