import { UserPayload } from "../domain/User";
import client from "./client";

export const login = async (identifier: string, password: string) => {
  try {
    const response = await client.post("/auth/login", { identifier, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (payload: UserPayload) => {
  try {
    const response = await client.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    const response = await client.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validate = async () => {
  try {
    const response = await client.get("/auth/validate");
    return response.data;
  } catch (error) {
    throw error;
  }
};
