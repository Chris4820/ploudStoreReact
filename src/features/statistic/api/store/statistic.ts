import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategoriesData, getCouponData, getCustomersData } from "../req/statistic";




export function useGetCategoryData(page ?: number | undefined) {
  return useQuery({
  queryKey: ['categorystat', page],
  queryFn: () => getCategoriesData(page),
  placeholderData: keepPreviousData,
})
}

export function useGetTopCustomersData(page ?: number | undefined) {
  return useQuery({
  queryKey: ['customersstat', page],
  queryFn: () => getCustomersData(page),
  placeholderData: keepPreviousData,
})
}

export function useGetTopCouponData(page ?: number | undefined) {
  return useQuery({
  queryKey: ['couponsstat', page],
  queryFn: () => getCouponData(page),
  placeholderData: keepPreviousData,
})
}