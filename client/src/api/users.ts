import { User, UserPayload } from "../domain/User";
import onError from "../utils/onError";
import client from "./client";

export const createUser = async (
  payload: UserPayload
): Promise<User | null> => {
  try {
    const response = await client.post<User>("/users", payload);
    return response.data;
  } catch (error) {
    onError(error);
    return null;
  }
};

export const findUsers = async (): Promise<Array<User>> => {
  try {
    const response = await client.get("/users");
    return response.data;
  } catch (error) {
    onError(error);
    return [];
  }
};

export const findUserById = async (id: string): Promise<User | null> => {
  try {
    const response = await client.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    onError(error);
    return null;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const response = await client.delete(`/users/${id}`);
    return response.data.deleted;
  } catch (error) {
    onError(error);
    return false;
  }
};
