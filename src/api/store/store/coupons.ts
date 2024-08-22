import { useQuery } from "@tanstack/react-query";
import { getCoupon, getCoupons } from "../../req/store/coupons";





export function useGetCoupons() {
  return useQuery({
  queryKey: ['coupons'],
  queryFn: () => getCoupons(),
})
}

export function useGetCoupon(couponId: string) {
  return useQuery({
  queryKey: ['coupons', couponId],
  queryFn: () => getCoupon(couponId),
})
}


