import axiosStore from "../../../lib/axios/axiosStore";







export type ServersProps = {
  id: number,
  name: string,
  createdAt: string,
}

export async function getServers(): Promise<ServersProps[] | []> {
  const response = await axiosStore.get<{servers: ServersProps[] | []}>(`server`);
  return response.data.servers || []; 
}

export type ServerProps = {
  id: number,
  name: string,
  token: string,
  createdAt: string,
}

export async function getServer(id: number): Promise<ServerProps> {
  const response = await axiosStore.get<{server: ServerProps}>(`server/${id}`);
  return response.data.server; 
}

export async function createServer(name: string) {
  const response = await axiosStore.post(`server`, {
    name: name,
  });
  return response.data;
}

export async function deleteServer(id: number) {
  const response = await axiosStore.delete<{server: ServersProps}>(`server/${id}`);
  return response.data.server;
}

export async function updateTokenServer(id: number) {
  const response = await axiosStore.put<{newToken: string}>(`servertoken/${id}`);
  return response.data.newToken;
}