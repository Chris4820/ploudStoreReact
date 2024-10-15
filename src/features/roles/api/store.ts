import { useQuery } from "@tanstack/react-query";
import { getRoles } from "./req";



export function useGetRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  })
}