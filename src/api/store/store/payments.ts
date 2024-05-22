import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../req/store/payment";





export function useGetPayments() {
    return useQuery({
    queryKey: ['payments'],
    queryFn: () => getPayments(),
})
}