import { ValidatorResponse } from "../domain/ValidatorResponse";
import validator from "validator";
import { IPermission } from "../domain/Permission";

export default function (permission: IPermission): ValidatorResponse {
  const response: ValidatorResponse = {
    valid: false,
    errors: [],
  };

  if (validator.isEmpty(permission.code)) {
    response.errors.push({
      field: "code",
      message: "Code is required.",
    });
  }

  if (validator.isEmpty(permission.description)) {
    response.errors.push({
      field: "description",
      message: "Description is required.",
    });
  }

  if (response.errors.length === 0) {
    response.valid = true;
  }

  return response;
}
