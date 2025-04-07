import type { DateRange } from "react-day-picker";
import axiosStore from "../../../../lib/axios/axiosStore";
import type { MetaProps } from "../../../../components/ui/datatable";


export type PaymentProps = {
    id: number,
    clientName: string,
    clientEmail: string,
    value: number,
    status: "pending" | "success" | "failed"
    createdAt: string,
}

export type CouponProps = {
    id: number,
    name: string,
}

interface PaymentsResponse {
    payments: PaymentProps[];
    meta: MetaProps;
}

export async function getPayments(byEmail?: string, byFilter?: string, byStatus?: string, dateRange?: DateRange, page: number = 0): Promise<PaymentsResponse> {
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
    if(dateRange && dateRange.from) {
        query += `startDate=${dateRange.from}&`
    }
    if(dateRange && dateRange.to) {
        query += `endDate=${dateRange.to}&`
    }
    if (page) {
        query += `page=${page}&`;
    }
    const response = await axiosStore.get<PaymentsResponse>(`payments?${query}`);
    return response.data;
}


type PaymentDetails = {
    id: number,
    createdAt: string,
    status: string,
    clientEmail: true,
    clientIdentifier: true,
    paymentItems: PaymentItensDetails[]
}

type PaymentItensDetails = {
    name: string,
    price: number,
    quantity: number
}

export async function getPaymentDetails(paymentId: string) : Promise<PaymentDetails> {
    const response = await axiosStore.get<{payment: PaymentDetails}>(`payments/details/${paymentId}`);
    return response.data.payment;
}