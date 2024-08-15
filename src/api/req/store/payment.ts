import axiosStore from "../../../lib/axios/axiosStore";
import { MetaProps } from "./statistic";


export type PaymentProps = {
    id: number,
    clientName: string,
    clientEmail: string,
    value: number,
    status: "pending" | "success" | "failed"
    created_at: string,
    coupon?: CouponProps,
}

export type CouponProps = {
    id: number,
    name: string,
}

interface PaymentsResponse {
    payments: PaymentProps[];
    meta: MetaProps;
}

export async function getPayments(byEmail?: string, byFilter?: string, byStatus?: string, startDate?: string, endDate?: string, page: number = 0): Promise<PaymentsResponse> {
    let query = "";
    if (byEmail) {
        query += `email=${byEmail}&`;
    }
    if (byFilter) {
        query += `filter=${byFilter}&`;
    }
    if (byStatus) {
        query += `status=${byStatus}&`;
    }
    if (startDate) {
        query += `startdate=${startDate}&`;
    }
    if (endDate) {
        query += `enddate=${endDate}&`;
    }
    if (page) {
        query += `page=${page}&`;
    }
    const response = await axiosStore.get<PaymentsResponse>(`payments?${query}`);
    return response.data;
}