import axiosStore from "../../../../lib/axios/axiosStore";
import type { SubUserFormData } from "../../Schema/SubUserSchema";




export type SubUsersProps = {
  user: {
    name: string,
    email: string,
  },
  role: {
    name: string
  },
  createdAt: string,
}

export type SubUsersResponse = {
  subuser: SubUsersProps[],
  invitesCount: number,
  
}

export async function getSubUsers() : Promise<SubUsersResponse> {
    const response = await axiosStore.get<SubUsersResponse>('subuser');
    return response.data;
}

export async function createSubUser(data: SubUserFormData) {
  const response = await axiosStore.post('subuser', { data });
  return response.data;
}


type RoleProps = {
  id: number,
  name: string,
}

export async function getRoles() : Promise<RoleProps[]> {
  const response = await axiosStore.get<{roles: RoleProps[]}>('role');
  return response.data.roles;
}



