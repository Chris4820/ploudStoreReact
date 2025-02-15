import type { DateRange } from "react-day-picker";
import axiosStore from "../../../../lib/axios/axiosStore";


export type RevenueSummaryProps = {
    dailySales: number,
    dailyRevenue: number,
    monthlySales: number,
    monthlyRevenue: number,
}


export async function getRevenueSummary(): Promise<RevenueSummaryProps> {
    const response = await axiosStore.get<{revenueSummary: RevenueSummaryProps}>('revenueSummary');
    return response.data.revenueSummary; // Obtemos o primeiro item do array
}

export type StoreSummaryProps = {
    totalSales: number;
    totalItemsSold: number;
    returnRate: number;
}

export async function getStoreStats(dateRange?: DateRange): Promise<StoreSummaryProps> {
    let query = "";
    if(dateRange && dateRange.from) {
        query += `startDate=${dateRange.from}&`
    }
    if(dateRange && dateRange.to) {
        query += `endDate=${dateRange.to}&`
    }

    const response = await axiosStore.get<{storeStat: StoreSummaryProps}>(`storestat?${query}`);
    return response.data.storeStat; // Obtemos o primeiro item do array
}

export type CategoryData = {
    name: string;
    totalSells: number;
    totalAmount: number;
}

export type MetaProps = {
    items: number,
    pages: number,
}

interface CategoryResponse {
    categories: CategoryData[];
    meta: MetaProps;
}

export async function getCategoriesData(dateRange?: DateRange, page?: number | undefined): Promise<CategoryResponse> {
    try {
        let query = "";
        if (page) {
            query += `page=${page}&`;
        }
        if(dateRange && dateRange.from) {
            query += `startDate=${dateRange.from}&`
        }
        if(dateRange && dateRange.to) {
            query += `endDate=${dateRange.to}&`
        }
        // Envie a solicitação GET para obter os dados das categorias
        const response = await axiosStore.get<CategoryResponse>(`categoriesstat?${query}`); // Substitua 'categoriesstat' pela URL real

        // Retorne diretamente a resposta no formato esperado
        return response.data;
    } catch (error) {
        // Lide com erros de solicitação
        console.error('Error fetching categories data:', error);
        throw new Error('Failed to fetch categories data');
    }
}

export type CustomersData = {
    name: string;
    totalSells: number;
    totalAmount: number;
}

interface CustomersResponse {
    customers: CustomersData[];
    meta: MetaProps;
}


export async function getCustomersData(dateRange?: DateRange, page?: number | undefined): Promise<CustomersResponse> {
    try {
        let query = "";
        if (page) {
            query += `page=${page}&`;
        }
        if(dateRange && dateRange.from) {
            query += `startDate=${dateRange.from}&`
        }
        if(dateRange && dateRange.to) {
            query += `endDate=${dateRange.to}&`
        }
        // Envie a solicitação GET para obter os dados das categorias
        const response = await axiosStore.get<CustomersResponse>(`customersstat?${query}`); // Substitua 'categoriesstat' pela URL real

        // Retorne diretamente a resposta no formato esperado
        return response.data;
    } catch (error) {
        // Lide com erros de solicitação
        console.error('Error fetching categories data:', error);
        throw new Error('Failed to fetch categories data');
    }
}

export type CouponData = {
    name: string;
    totalSells: number;
    totalAmount: number;
}

interface CouponResponse {
    coupons: CouponData[];
    meta: MetaProps;
}


export async function getCouponData(dateRange?: DateRange, page?: number | undefined): Promise<CouponResponse> {
    try {
        let query = "";
        if (page) {
            query += `page=${page}&`;
        }
        if(dateRange && dateRange.from) {
            query += `startDate=${dateRange.from}&`
        }
        if(dateRange && dateRange.to) {
            query += `endDate=${dateRange.to}&`
        }
        // Envie a solicitação GET para obter os dados das categorias
        const response = await axiosStore.get<CouponResponse>(`couponsstat?${query}`); // Substitua 'categoriesstat' pela URL real

        // Retorne diretamente a resposta no formato esperado
        return response.data;
    } catch (error) {
        // Lide com erros de solicitação
        console.error('Error fetching categories data:', error);
        throw new Error('Failed to fetch categories data');
    }
}