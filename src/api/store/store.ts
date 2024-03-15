import { useQuery } from "@tanstack/react-query";
import { getRevenueSummary } from "../req/store";



export function useGetRevenueSummary() {
    return useQuery({
      queryKey: ['revenueSummary'],
      queryFn: getRevenueSummary,
      staleTime: 1000*100*2 //2 minute
    })
  }