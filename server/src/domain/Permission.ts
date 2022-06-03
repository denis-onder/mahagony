import { model, Schema } from "mongoose";

export interface IPermission {
  _id: Schema.Types.ObjectId;
  code: string;
  description: string;
}

const PermissionSchema = new Schema<IPermission>({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const PermissionModel = model<IPermission>(
  "Permission",
  PermissionSchema
);
