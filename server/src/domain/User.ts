import { model, Schema } from "mongoose";

export interface IUser {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  status: boolean;
  permissions: Array<string>;
}

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

export const UserModel = model<IUser>("User", UserSchema);
