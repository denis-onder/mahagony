import client from "./client";

export const assignPermission = async (
  userId: string,
  permissionId: string
): Promise<any> => {
  try {
    const response = await client.post(
      `/user-permissions/${userId}/${permissionId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const revokePermission = async (
  userId: string,
  permissionId: string
): Promise<any> => {
  try {
    const response = await client.delete(
      `/user-permissions/${userId}/${permissionId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
