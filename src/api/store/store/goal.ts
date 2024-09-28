import { useQuery } from "@tanstack/react-query";
import { getActiveGoals, getGoalsHistory } from "../../req/store/goal";







export function useGetHistoryGoals(page ?: number | undefined) {
  return useQuery({
  queryKey: ['goals', page],
  queryFn: () => getGoalsHistory(),
})
}

export function useGetActiveGoals() {
  return useQuery({
    queryKey: ['goals', 'success'],
    queryFn: () => getActiveGoals(),
  })
}