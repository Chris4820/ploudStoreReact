import { useQuery } from "@tanstack/react-query";
import { getInvite, getInvites, getSubUsers } from "../req/subuser";



export function useGetSubUsers() {
    return useQuery({
      queryKey: ['subuser'],
      queryFn: getSubUsers,
    })
  }

  export function useGetInvites() {
    return useQuery({
      queryKey: ['invites'],
      queryFn: getInvites,
    })
  }

  export function useGetInvite(id: string) {
    return useQuery({
      queryKey: ['invite', id],
      queryFn: () => getInvite(id),
      enabled: !!id,
      retry: false,
    });
  }

