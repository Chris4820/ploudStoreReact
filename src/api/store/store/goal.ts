import { useQuery } from "@tanstack/react-query";
import { getGoalsHistory } from "../../req/store/goal";







export function useGetHistoryGoals(page ?: number | undefined) {
  return useQuery({
  queryKey: ['goals', page],
  queryFn: () => getGoalsHistory(),
})
}