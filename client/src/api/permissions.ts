import { Permission, PermissionPayload } from "../domain/Permission";
import client from "./client";

export const createPermission = async (
  payload: PermissionPayload
): Promise<Permission> => {
  try {
    const response = await client.post<Permission>("/permissions", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findPermissions = async (): Promise<Array<Permission>> => {
  try {
    const response = await client.get("/permissions");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findPermissionById = async (
  id: string
): Promise<Permission | null> => {
  try {
    const response = await client.get(`/permissions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePermission = async (id: string): Promise<boolean> => {
  try {
    const response = await client.delete(`/permissions/${id}`);
    return response.data.deleted;
  } catch (error) {
    throw error;
  }
};
