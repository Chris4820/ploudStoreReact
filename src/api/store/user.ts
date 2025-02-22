import { useQuery } from "@tanstack/react-query";
import { getInviteStores, getStores, getSubStores } from "../../features/stores/api/req/store";



  
export function useGetStores() {
  return useQuery({
      queryKey: ['stores'],
      queryFn: getStores,
    })
}

export function useGetSubStores() {
  return useQuery({
      queryKey: ['subStores'],
      queryFn: getSubStores,
    })
}

export function useGetInviteStores() {
  return useQuery({
      queryKey: ['inviteStores'],
      queryFn: getInviteStores,
    })
}

