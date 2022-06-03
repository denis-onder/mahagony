import { UserPayload } from "../domain/User";
import onError from "../utils/onError";
import client from "./client";

export const login = async (identifier: string, password: string) => {
  try {
    const response = await client.post("/auth/login", { identifier, password });
    return response.data;
  } catch (error) {
    onError(error);
  }
};

export const register = async (payload: UserPayload) => {
  try {
    const response = await client.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    onError(error);
  }
};
