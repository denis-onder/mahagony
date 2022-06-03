import { ValidatorResponse } from "../domain/ValidatorResponse";
import validator from "validator";
import { IUser } from "../domain/User";

export default function (user: IUser): ValidatorResponse {
  const response: ValidatorResponse = {
    valid: false,
    errors: [],
  };

  if (validator.isEmpty(user.firstName)) {
    response.errors?.push("Please provide a first name.");
  }
  if (validator.isEmpty(user.lastName)) {
    response.errors?.push("Please provide a first name.");
  }
  if (validator.isEmpty(user.username)) {
    response.errors?.push("Please provide a username.");
  }
  if (!validator.isEmail(user.email)) {
    response.errors?.push("Please provide a valid email address.");
  }
  if (validator.isEmpty(user.password)) {
    response.errors?.push("Please provide a valid password.");
  }
  if (user.password.length < 8) {
    response.errors?.push(
      "Your password has to be more than 8 characters long."
    );
  }

  if (response.errors && response.errors.length === 0) {
    response.valid = true;
    delete response.errors;
  }

  return response;
}
