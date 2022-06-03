import { ValidatorResponse } from "../domain/ValidatorResponse";
import validator from "validator";
import { IUser } from "../domain/User";

export default function (user: IUser): ValidatorResponse {
  const response: ValidatorResponse = {
    valid: false,
    errors: [],
  };

  if (validator.isEmpty(user.firstName)) {
    response.errors.push({
      field: "firstName",
      message: "First name is required.",
    });
  }
  if (validator.isEmpty(user.lastName)) {
    response.errors.push({
      field: "lastName",
      message: "Last name is required.",
    });
  }
  if (validator.isEmpty(user.username)) {
    response.errors.push({
      field: "username",
      message: "Username is required.",
    });
  }
  if (!validator.isEmail(user.email)) {
    response.errors.push({
      field: "email",
      message: "Email is invalid.",
    });
  }
  if (validator.isEmpty(user.password)) {
    response.errors.push({
      field: "password",
      message: "Password is required.",
    });
  }
  if (user.password.length < 8) {
    response.errors.push({
      field: "password",
      message: "Password must be at least 8 characters long.",
    });
  }

  if (response.errors.length === 0) {
    response.valid = true;
  }

  return response;
}
