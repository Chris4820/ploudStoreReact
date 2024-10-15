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

type InviteProps = {
  id: number,
  role: {
    name: string,
  },
  user: {
    name: string,
  }
}

export async function getInvites() : Promise<InviteProps[]> {
  const response = await axiosStore.get<{invites: InviteProps[]}>('invite');
  return response.data.invites;
}

type InviteUniqueProps = {
  id: true,
  createdAt: string,
  user: {
    name: string,
    email: string,
    createdAt: string,
  },
    role: {
      name: string,
  }
}
export async function getInvite(id: string) : Promise<InviteUniqueProps> {
  const response = await axiosStore.get<{invite: InviteUniqueProps}>(`invite/${id}`);
  return response.data.invite;
}

export async function deleteInvite(id: string) {
  const response = await axiosStore.delete(`invite/${id}`);
  return response.data;
}



