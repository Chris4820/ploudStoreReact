import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategoriesData, getCouponData, getCustomersData, getStoreStats } from "../req/statistic";
import type { DateRange } from "react-day-picker";





export function useStoreStat(dateRange?: DateRange) {
  return useQuery({
    queryKey: ['storestat', dateRange],
    queryFn: () => getStoreStats(dateRange),
    placeholderData: keepPreviousData, // Supondo que você tenha esse valor definido
  });
}

export function useGetCategoryData(dateRange?: DateRange, page?: number) {
  return useQuery({
    queryKey: ['categorystat', page, dateRange],
    queryFn: () => getCategoriesData(dateRange, page),
    placeholderData: keepPreviousData, // Supondo que você tenha esse valor definido
  });
}

export function useGetTopCustomersData(dateRange?: DateRange, page ?: number) {
  return useQuery({
  queryKey: ['customersstat', page, dateRange],
  queryFn: () => getCustomersData(dateRange, page),
  placeholderData: keepPreviousData,
})
}

export function useGetTopCouponData(dateRange?: DateRange, page ?: number) {
  return useQuery({
  queryKey: ['couponsstat', page, dateRange],
  queryFn: () => getCouponData(dateRange, page),
  placeholderData: keepPreviousData,
})
}