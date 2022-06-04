import { Permission } from "./Permission";

export interface UserPayload {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  status: boolean;
}

export interface UserPaginationParams {
  page: number;
  limit: number;
}

export interface UserFilteringParams {
  name?: string;
  status?: boolean;
}

export interface UserQueryParams
  extends UserPaginationParams,
    UserFilteringParams {}

export interface User extends UserPayload {
  _id: string;
  permissions: Array<Permission>;
}
