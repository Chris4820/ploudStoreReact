import axiosStore from "../../../lib/axios/axiosStore"
import type { RoleFormData } from "../Schema/RoleSchema";





export type RoleProps = {
  id: number,
  name: string,
  createdAt: string,
  description: string,
}


export async function getRoles() : Promise<RoleProps[]> {
    const response = await axiosStore.get<{roles: RoleProps[]}>('role');
    return response.data.roles;
}

export async function createRole(data: RoleFormData) {
  const response = await axiosStore.post('role', {data});
  return response.data;
}
