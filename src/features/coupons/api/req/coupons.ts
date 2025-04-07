import { CouponFormData } from "../../schema/CouponsSchema";
import axiosStore from "../../../../lib/axios/axiosStore";
import type { MetaProps } from "../../../../components/ui/datatable";


export enum CouponType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_VALUE = "FIXED_VALUE"
}

export type CouponsProps = {
  id: number,
  code: string,
  expire_at: string | null,
  value: number,
  type: CouponType,
  usage: number,
  limit: number | null
}

export async function getCoupons(page?: number | undefined) {

        let query = "";
        if (page) {
            query += `?page=${page}&`;
        }

  const response = await axiosStore.get<{coupons: CouponsProps[]}>(`coupons${query}`);
  return response.data.coupons;
}


export async function getCoupon(id: string) {
  const response = await axiosStore.get<{coupon: CouponFormData}>(`coupons/${id}`);
  return response.data.coupon
}

export async function createCoupons(data: CouponFormData) {
  const response = await axiosStore.post('coupons', {data})
  return response.data;
}

export async function editCoupons(couponId: string, data: CouponFormData) {
  const response = await axiosStore.put(`coupons/${couponId}`, { data })
  return response.data;
}

export async function deleteCoupon(id: string | undefined) {
  const response = await axiosStore.delete(`coupon/${id}`)
  return response.data;
}

export async function getTotalCoupons() {
  const response = await axiosStore.get<{meta: MetaProps}>(`totalCoupons`);
  return response.data.meta;
}
