import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCoupon, getCoupons } from "../req/coupons";





export function useGetCoupons(page ?: number | undefined) {
  return useQuery({
  queryKey: ['coupons', page],
  queryFn: () => getCoupons(page),
  placeholderData: keepPreviousData,
  
})
}

export function useGetCoupon(couponId: string) {
  return useQuery({
  queryKey: ['coupons', couponId],
  queryFn: () => getCoupon(couponId),
})
}


