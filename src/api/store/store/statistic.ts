import { useQuery } from "@tanstack/react-query";
import { getCategoriesData, getCouponData, getCustomersData } from "../../req/store/statistic";




export function useGetCategoryData(page ?: number | undefined) {
  return useQuery({
  queryKey: ['categorystat', page],
  queryFn: () => getCategoriesData(page),
})
}

export function useGetTopCustomersData(page ?: number | undefined) {
  return useQuery({
  queryKey: ['customersstat', page],
  queryFn: () => getCustomersData(page),
})
}

export function useGetTopCouponData(page ?: number | undefined) {
  return useQuery({
  queryKey: ['couponsstat', page],
  queryFn: () => getCouponData(page),
})
}