import { useQuery } from "@tanstack/react-query";
import { getDesign } from "./req";



export function useGetDesign() {
  return useQuery({
  queryKey: ['design'],
  queryFn: () => getDesign(),
})
}