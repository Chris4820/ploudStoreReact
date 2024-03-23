import axios from "axios";
import axiosStore from "../../lib/axios/axiosStore";
import { useMutation } from "@tanstack/react-query";



export type RevenueSummaryProps = {
    dailySales: number,
    dailyRevenue: number,
    monthlySales: number,
    monthlyRevenue: number,
}

export type Widget = {
    bestClientShow: boolean;
    bestClientShowValue: boolean;
    showDiscord: boolean;
    discordId: string;
    lastPurchaseShow: boolean;
    lastPurchaseShowValue: boolean;
    topProductShow: boolean;
};

export type StoreInformationProps = {
    name: string,
    description: string,
    shortname: string,
    category: string,
    domain: string,
    subdomain: string,
    currency: string,
    locale: string,
    createdAt: string,
}

export type PaymentProps = {
    id: number,
    clientName: string,
    clientEmail: string,
    value: number,
    cupon: string | null,
    status: "pending" | "success" | "failed"
    created_at: string,
  }

export async function getRevenueSummary(): Promise<RevenueSummaryProps> {
    const response = await axiosStore.get<{revenueSummary: RevenueSummaryProps}>('revenueSummary');
    return response.data.revenueSummary; // Obtemos o primeiro item do array
}

export async function getStoreInformation(): Promise<StoreInformationProps> {
    const response = await axiosStore.get<{store: StoreInformationProps}>('store');
    return response.data.store; // Obtemos o primeiro item do array
}

export async function getStoreWidgets(): Promise<Widget> {
    const response = await axiosStore.get<{widgets: Widget}>('widgets');
    return response.data.widgets; // Obtemos o primeiro item do array
}

export async function getPayments(): Promise<PaymentProps> {
    const response = await axiosStore.get<{payments: PaymentProps}>('payments');
    return response.data.payments; // Obtemos o primeiro item do array
}