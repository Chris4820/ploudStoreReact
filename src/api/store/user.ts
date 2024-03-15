import { useQuery } from "@tanstack/react-query";
import { getUserInformation } from "../req/user";





export function useGetUserInformation() {
    return useQuery({
      queryKey: ['userInfo'],
      queryFn: getUserInformation,
      staleTime: 1000*100*2 //2 minute
    })
}