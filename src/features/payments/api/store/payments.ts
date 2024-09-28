import { useQuery } from "@tanstack/react-query";
import { getPayments} from "../req/payment";



export function useGetPayments(byEmail?: string, byFilter?: string, byStatus?: string, startDate?: string, endDate?: string, page: number = 0) {
    return useQuery({
    queryKey: ['payments', byEmail, byFilter, byStatus, startDate, endDate, page],
    queryFn: () => getPayments(byEmail, byFilter, byStatus, startDate, endDate, page),
})
}