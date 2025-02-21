import { useQuery } from "@tanstack/react-query";
import { getUserInformation } from "../req/user";
import { getInviteStores, getStores, getSubStores } from "../../features/stores/api/req/store";



export function useGetUserInformation() {
    return useQuery({
      queryKey: ['user'],
      queryFn: getUserInformation,
    })
}

  
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

