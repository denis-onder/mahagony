import { IPermission, PermissionModel } from "../domain/Permission";
import BaseService from "../domain/BaseService";
import permissionValidator from "../validators/permissionValidator";

export default class PermissionService implements BaseService<IPermission> {
  async create(payload: IPermission): Promise<IPermission | null> {
    const validatorResponse = permissionValidator(payload);

    if (!validatorResponse.valid) {
      throw new Error(JSON.stringify(validatorResponse.errors));
    }

    const alreadyExists = await this.checkIfPermissionExists(payload.code);

    if (alreadyExists) {
      throw new Error("This permission already exists.");
    }

    const permission = new PermissionModel(payload);
    return await permission.save();
  }
  async find(query: object): Promise<Array<IPermission>> {
    if (Object.keys(query).length === 0) {
      return Promise.resolve([]);
    }

    return await PermissionModel.find(query);
  }
  async findById(id: string): Promise<IPermission | null> {
    if (!id) {
      return Promise.resolve(null);
    }

    return await PermissionModel.findById(id);
  }
  update(
    id: string,
    payload: Partial<IPermission>
  ): Promise<IPermission | null> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    if (!id) {
      return Promise.resolve(false);
    }

    await PermissionModel.findByIdAndDelete(id);

    return true;
  }

  private async checkIfPermissionExists(code: string): Promise<boolean> {
    return !!(await PermissionModel.findOne({ code }));
  }
}
