import axiosStore from "../../lib/axios/axiosStore";



export type RevenueSummaryProps = {
    dailySales: number,
    dailyRevenue: number,
    monthlySales: number,
    monthlyRevenue: number,
}

export async function getRevenueSummary(): Promise<RevenueSummaryProps> {
    const response = await axiosStore.get<{revenueSummary: RevenueSummaryProps[]}>('revenueSummary');
    return response.data.revenueSummary;
}