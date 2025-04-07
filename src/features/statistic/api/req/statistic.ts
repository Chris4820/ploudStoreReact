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

export async function getCategoriesData(dateRange?: DateRange, page?: number | undefined): Promise<CategoryData []> {
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
        const response = await axiosStore.get<{products: CategoryData[]}>(`categoriesstat?${query}`); // Substitua 'categoriesstat' pela URL real

        // Retorne diretamente a resposta no formato esperado
        return response.data.products;
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


export async function getCustomersData(dateRange?: DateRange, page?: number | undefined): Promise<CustomersData[]> {
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
        const response = await axiosStore.get<{customers: CustomersData[]}>(`customersstat?${query}`); // Substitua 'categoriesstat' pela URL real

        // Retorne diretamente a resposta no formato esperado
        return response.data.customers;
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

export async function getCouponData(dateRange?: DateRange, page?: number | undefined): Promise<CouponData[]> {
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
        const response = await axiosStore.get<{coupons: CouponData[]}>(`couponsstat?${query}`); // Substitua 'categoriesstat' pela URL real

        // Retorne diretamente a resposta no formato esperado
        return response.data.coupons;
    } catch (error) {
        // Lide com erros de solicitação
        console.error('Error fetching categories data:', error);
        throw new Error('Failed to fetch categories data');
    }
}