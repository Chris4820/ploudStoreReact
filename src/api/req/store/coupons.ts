import { CouponFormData } from "../../../features/coupons/schema/CouponsSchema";
import axiosStore from "../../../lib/axios/axiosStore";
import { MetaProps } from "./statistic";


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


interface CouponsResponse {
  coupons: CouponsProps[];
  meta: MetaProps;
}

export async function getCoupons(page?: number | undefined): Promise<CouponsResponse> {

        let query = "";
        if (page) {
            query += `?page=${page}&`;
        }

  const response = await axiosStore.get<CouponsResponse>(`coupons${query}`);
  return response.data; // Obtemos o primeiro item do array
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
  const response = await axiosStore.get<{coupon: CouponFormData}>(`coupons/${couponId}`);
  return response.data.coupon
}

export async function createCoupons(data: CouponFormData) {
  const response = await axiosStore.post('coupons', data)
  return response.data;
}

export async function editCoupons(data: CouponFormData) {
  const response = await axiosStore.put('coupons', { data })
  return response.data;
}
