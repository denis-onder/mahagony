import { PermissionModel } from "./../domain/Permission";
import { UserModel } from "../domain/User";
import UserPermissionPair from "../domain/UserPermissionPair";

export default class UserPermissionService {
  async assignPermission(
    userId: string,
    permissionId: string
  ): Promise<UserPermissionPair> {
    const user = await UserModel.findById(userId);
    const permission = await PermissionModel.findById(permissionId);

    if (!user || !permission) {
      throw new Error("User or permission not found.");
    }

    user.permissions.push(permission._id);

    await user.save();

    return { user, permission };
  }

  async revokePermission(
    userId: string,
    permissionId: string
  ): Promise<UserPermissionPair> {
    const user = await UserModel.findById(userId);
    const permission = await PermissionModel.findById(permissionId);

    if (!user || !permission) {
      throw new Error("User or permission not found.");
    }

    user.permissions = user.permissions.filter(
      (p) => `${p}` !== `${permission._id}`
    );

    await user.save();

    return { user, permission };
  }
}
