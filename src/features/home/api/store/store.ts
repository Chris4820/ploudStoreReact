import { useQuery } from "@tanstack/react-query";
import { getGraphDataLast7Days, getStoreNotifications, getStorePlan } from "../req/req";





export function useGetNotifications() {
  return useQuery({
  queryKey: ['notifications'],
  queryFn: () => getStoreNotifications(),
})
}


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

