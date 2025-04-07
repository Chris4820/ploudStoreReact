import { useQuery } from "@tanstack/react-query";
import { getGraphDataLast7Days,  getStorePlan } from "../req/req";





export function useGetGraphData() {
  return useQuery({
  queryKey: ['graph'],
  queryFn: () => getGraphDataLast7Days(),
})
}

export function useGetPlan() {
  return useQuery({
  queryKey: ['plan'],
  queryFn: () => getStorePlan(),
})
}

