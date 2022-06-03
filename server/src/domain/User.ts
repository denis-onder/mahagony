import { model, Schema } from "mongoose";

interface IUser {
  _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  status: boolean;
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
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export const User = model<IUser>("User", UserSchema);
