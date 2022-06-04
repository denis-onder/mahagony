import argon2 from "argon2";
import userValidator from "../validators/userValidator";
import { IUser, UserModel } from "../domain/User";
import BaseService from "../domain/BaseService";

export default class UserService implements BaseService<IUser> {
  async create(payload: IUser): Promise<IUser> {
    const validatorResponse = userValidator(payload);

    if (!validatorResponse.valid) {
      throw new Error(JSON.stringify(validatorResponse.errors));
    }

    const alreadyExists = await this.checkIfUserExists(
      payload.email,
      payload.username
    );

    if (alreadyExists) {
      throw new Error("This user already exists.");
    }

    payload.password = await argon2.hash(payload.password);

    const user = new UserModel(payload);
    return await user.save();
  }
  async find(query: object): Promise<Array<IUser>> {
    return await UserModel.find(query).select("-password");
  }
  async findById(id: string): Promise<IUser | null> {
    if (!id) {
      return Promise.resolve(null);
    }

    return await UserModel.findById(id)
      .populate("permissions")
      .select("-password");
  }
  update(id: string, payload: Partial<IUser>): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    if (!id) {
      return Promise.resolve(false);
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return false;
    }

    await user.delete();

    return true;
  }

  private async checkIfUserExists(
    email: string,
    username: string
  ): Promise<boolean> {
    const queryByEmail = await UserModel.findOne({ email });
    const queryByUsername = await UserModel.findOne({ username });

    return !!queryByEmail || !!queryByUsername;
  }
}
