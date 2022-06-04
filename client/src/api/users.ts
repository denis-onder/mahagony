import { PaginatedResponse } from "../domain/PaginatedResponse";
import { User, UserPayload, UserPaginationParams } from "../domain/User";
import client from "./client";

export const createUser = async (payload: UserPayload): Promise<User> => {
  try {
    const response = await client.post<User>("/users", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findUsers = async (
  params: UserPaginationParams
): Promise<PaginatedResponse<User>> => {
  try {
    const response = await client.get("/users", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findUserById = async (id: string): Promise<User> => {
  try {
    const response = await client.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  try {
    const response = await client.delete(`/users/${id}`);
    return response.data.deleted;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  id: string,
  payload: UserPayload
): Promise<User> => {
  try {
    const response = await client.put(`/users/${id}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
