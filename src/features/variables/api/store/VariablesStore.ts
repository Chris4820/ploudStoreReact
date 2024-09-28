import { useQuery } from "@tanstack/react-query";
import { getVariable, getVariables } from "../req/variablesAPI";







export function useGetVariables() {
  return useQuery({
  queryKey: ['variables'],
  queryFn: () => getVariables(),
})
}

export function useGetVariable(variableId: number) {
  return useQuery({
  queryKey: ['variable', variableId],
  queryFn: () => getVariable(variableId),
})
}
