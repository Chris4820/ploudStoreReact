import { useQuery } from "@tanstack/react-query";
import { getServer, getServers } from "../req/server";






export function useGetServers(serverType: string) {
  return useQuery({
  queryKey: ['server', serverType],
  queryFn: () => getServers(serverType),
})
}


export function useGetServer(id: number) {
  return useQuery({
  queryKey: ['server', id],
  queryFn: () => getServer(id),
})
}

