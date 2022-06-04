import { IUser } from "./User";
import { IPermission } from "./Permission";

export default interface UserPermissionPair {
  user: IUser;
  permission: IPermission;
}
