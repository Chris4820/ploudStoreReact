import { useQuery } from "@tanstack/react-query";
import { getRole, getRoles } from "./req";



export function useGetRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })
}

export function useGetRole(id: string) {
  return useQuery({
    queryKey: ['role', id],
    queryFn: () => getRole(id)
  })
}