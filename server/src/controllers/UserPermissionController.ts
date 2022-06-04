import { AuthorizedRequest } from "../domain/AuthorizedRequest";
import UserPermissionService from "../services/UserPermissionService";
import { Response, Router } from "express";

export default class UserPermissionController {
  public router: Router;

  constructor(private userPermissionService: UserPermissionService) {
    this.router = Router();

    this.router.post("/:userId/:permissionId", (req, res) =>
      this.assignPermission(req, res)
    );

    this.router.delete("/:userId/:permissionId", (req, res) =>
      this.revokePermission(req, res)
    );
  }

  async assignPermission(req: AuthorizedRequest, res: Response): Promise<void> {
    try {
      const { userId, permissionId } = req.params;
      const user = await this.userPermissionService.assignPermission(
        userId,
        permissionId
      );

      res.status(200).json({ message: "Permission assigned", user });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async revokePermission(req: AuthorizedRequest, res: Response): Promise<void> {
    try {
      const { userId, permissionId } = req.params;
      await this.userPermissionService.revokePermission(userId, permissionId);

      res.status(200).json({ message: "Permission revoked" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
