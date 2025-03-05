import axiosStore from "../../../lib/axios/axiosStore"
import type { RoleFormData } from "../Schema/RoleSchema";





export type RolesProps = {
  id: number,
  name: string,
  createdAt: string,
  description: string,
}


export async function getRoles() : Promise<RolesProps[]> {
    const response = await axiosStore.get<{roles: RolesProps[]}>('role');
    return response.data.roles;
}

export async function createRole(data: RoleFormData) {
  const response = await axiosStore.post('role', {data});
  return response.data;
}

type RoleProps = {
    permission: string[];
    name?: string | undefined;
    description?: string | undefined;
}
export async function getRole(id: string) : Promise<RoleProps> {
  const response = await axiosStore.get<{role: RoleProps}>(`role/${id}`);
  return response.data.role;
}

export async function updateRole(id: string, data: RoleFormData) {
  const response = await axiosStore.put(`role/${id}`, {data});
  return response.data;
}

export async function deleteRole(id: string) {
  const response = await axiosStore.delete(`role/${id}`);
  return response.data;
}
