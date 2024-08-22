import { CreateCouponFormData } from "../../../features/coupons/schema/CouponsSchema";
import axiosStore from "../../../lib/axios/axiosStore";


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
  usages: number,
  limit: number | null
}

export async function getCoupons(): Promise<CouponsProps[] | []> {
  const response = await axiosStore.get<{coupons: CouponsProps[] | []}>('coupons');
  return response.data.coupons || []; // Obtemos o primeiro item do array
}


export type CouponProps = {
  id: number;
  code: string;
  description: string | null;
  storeId: number;
  value: number;
  limit: number | null;
  type: "PERCENTAGE" | "VALUE";
  productIds: number[] | []
  expire_at: string | null,
  isUsableInAllStores: boolean,
}

export async function getCoupon(couponId: string) {
  const response = await axiosStore.get<{coupon: CreateCouponFormData}>(`coupons/${couponId}`);
  return response.data.coupon
}



export async function createCoupons(data: CreateCouponFormData) {
  const response = await axiosStore.post('coupons', data)
  return response.data;
}
