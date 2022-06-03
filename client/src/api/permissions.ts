import { Permission, PermissionPayload } from "../domain/Permission";
import onError from "../utils/onError";
import client from "./client";

export const createPermission = async (
  payload: PermissionPayload
): Promise<Permission | null> => {
  try {
    const response = await client.post<Permission>("/permissions", payload);
    return response.data;
  } catch (error) {
    onError(error);
    return null;
  }
};

export const findPermissions = async (): Promise<Array<Permission>> => {
  try {
    const response = await client.get("/permissions");
    return response.data;
  } catch (error) {
    onError(error);
    return [];
  }
};

export const findPermissionById = async (
  id: string
): Promise<Permission | null> => {
  try {
    const response = await client.get(`/permissions/${id}`);
    return response.data;
  } catch (error) {
    onError(error);
    return null;
  }
};

export const deletePermission = async (id: string): Promise<boolean> => {
  try {
    const response = await client.delete(`/permissions/${id}`);
    return response.data.deleted;
  } catch (error) {
    onError(error);
    return false;
  }
};
