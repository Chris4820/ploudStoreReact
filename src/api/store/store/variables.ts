import { useQuery } from "@tanstack/react-query";
import { getVariables } from "../../req/store/variable";




export function useGetVariables() {
    return useQuery({
    queryKey: ['variables'],
    queryFn: () => getVariables(),
})
}