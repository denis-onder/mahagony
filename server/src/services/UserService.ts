import argon2 from "argon2";
import userValidator from "../validators/userValidator";
import { IUser, UserModel } from "../domain/User";
import BaseService from "../domain/BaseService";

export default class UserService implements BaseService<IUser> {
  async create(payload: IUser): Promise<IUser> {
    const validatorResponse = userValidator(payload);

    if (!validatorResponse.valid) {
      const message = validatorResponse.errors?.join("\n");
      throw new Error(`Invalid Input:\n${message}`);
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
  async find(query: object): Promise<IUser | null> {
    if (Object.keys(query).length === 0) {
      return Promise.resolve(null);
    }

    const payload = await UserModel.findOne(query);

    return payload ? payload : null;
  }
  async findById(id: string): Promise<IUser | null> {
    if (!id) {
      return Promise.resolve(null);
    }

    const user = await UserModel.findById(id);

    return user || null;
  }
  update(id: string, payload: Partial<IUser>): Promise<IUser | null> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    await UserModel.findByIdAndDelete(id);

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
