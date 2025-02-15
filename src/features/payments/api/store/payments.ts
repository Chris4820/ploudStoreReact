import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPayments} from "../req/payment";
import type { DateRange } from "react-day-picker";



export function useGetPayments(byEmail?: string, byFilter?: string, byStatus?: string, date?: DateRange, page: number = 0) {
    return useQuery({
    queryKey: ['payments', byEmail, byFilter, byStatus, date, page],
    queryFn: () => getPayments(byEmail, byFilter, byStatus, date, page),
    placeholderData: keepPreviousData,
})
}