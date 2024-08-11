import { useQuery } from "@tanstack/react-query";
import { getCategoriesData, getCustomersData } from "../../req/store/statistic";




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