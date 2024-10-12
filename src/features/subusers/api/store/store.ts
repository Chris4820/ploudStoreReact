import { useQuery } from "@tanstack/react-query";
import { getRoles, getSubUsers } from "../req/subuser";



export function useGetSubUsers() {
    return useQuery({
      queryKey: ['subuser'],
      queryFn: getSubUsers,
    })
  }


  export function useGetRoles() {
    return useQuery({
      queryKey: ['roles'],
      queryFn: getRoles,
    })
  }

