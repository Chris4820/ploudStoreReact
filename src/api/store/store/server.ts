import { useQuery } from "@tanstack/react-query";
import { getServer, getServers } from "../../req/store/server";






export function useGetServers() {
  return useQuery({
  queryKey: ['server'],
  queryFn: () => getServers(),
})
}


export function useGetServer(id: number) {
  return useQuery({
  queryKey: ['server', id],
  queryFn: () => getServer(id),
})
}

