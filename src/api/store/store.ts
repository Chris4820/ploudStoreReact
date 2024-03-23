import { useQuery } from "@tanstack/react-query";
import { getPayments, getRevenueSummary, getStoreInformation, getStoreWidgets } from "../req/store";



export function useGetRevenueSummary() {
    return useQuery({
      queryKey: ['revenueSummary'],
      queryFn: getRevenueSummary,
      staleTime: 1000*100*2, //2 minute
      refetchOnWindowFocus: false,
    })
  }

export function useGetStoreInformation() {
    return useQuery({
      queryKey: ['store'],
      queryFn: getStoreInformation,
      staleTime: 1000*100*2, //2 minute
      refetchOnWindowFocus: false,
    })
  }

  export function useGetStoreWidgets() {
    return useQuery({
      queryKey: ['widgets'],
      queryFn: getStoreWidgets,
      staleTime: 1000*100*2, //2 minute
      refetchOnWindowFocus: false,
    })
  }

  export function useGetPayments() {
    return useQuery({
      queryKey: ['paymentss'],
      queryFn: getPayments,
    })
  }
