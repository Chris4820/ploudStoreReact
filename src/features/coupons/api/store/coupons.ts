import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCoupon, getCoupons, getTotalCoupons } from "../req/coupons";





export function useGetCoupons(page ?: number | undefined) {
  return useQuery({
  queryKey: ['coupons', page],
  queryFn: () => getCoupons(page),
  placeholderData: keepPreviousData,
  
})
}

export function useGetCoupon(couponId: string) {
  return useQuery({
  queryKey: ['coupon', couponId],
  queryFn: () => getCoupon(couponId),
})
}

export function useGetTotalCoupons() {
  return useQuery({
  queryKey: ['totalCoupons'],
  queryFn: () => getTotalCoupons(),
})
}


