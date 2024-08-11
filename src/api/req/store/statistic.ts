import axiosStore from "../../../lib/axios/axiosStore";


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

export async function getCategoriesData(page?: number | undefined): Promise<CategoryResponse> {
    try {
        let query = "";
        if (page) {
            query += `page=${page}&`;
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


export async function getCustomersData(page?: number | undefined): Promise<CustomersResponse> {
    try {
        let query = "";
        if (page) {
            query += `page=${page}&`;
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