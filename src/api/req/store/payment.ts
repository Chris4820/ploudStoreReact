import axiosStore from "../../../lib/axios/axiosStore";


export type PaymentProps = {
    id: number,
    clientName: string,
    clientEmail: string,
    value: number,
    cupon: string | null,
    status: "pending" | "success" | "failed"
    created_at: string,
}


export async function getPayments(): Promise<PaymentProps[]> {
    const response = await axiosStore.get<{payments: PaymentProps[]}>('payments');
    return response.data.payments || [];
}