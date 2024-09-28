import axiosStore from "../../../lib/axios/axiosStore";
import { MetaProps } from "../../../features/statistic/api/req/statistic";





export enum GoalStatus {
  COMPLETED,
  FAILED,
  CANCELLED,
  ACTIVE,
}

interface GoalsResponse {
  goals: GoalProps[];
  meta: MetaProps;
}


export async function getGoalsHistory(page?: number | undefined): Promise<GoalsResponse> {
  try {
      let query = "";
      if (page) {
          query += `page=${page}&`;
      }
      // Envie a solicitação GET para obter os dados das categorias
      const response = await axiosStore.get<GoalsResponse>(`goal?${query}`);
      // Retorne diretamente a resposta no formato esperado
      return response.data;
  } catch (error) {
      // Lide com erros de solicitação
      console.error('Error fetching categories data:', error);
      throw new Error('Failed to fetch categories data');
  }
}


export type GoalProps = {
  id: number,
  title: string;
  description: string;
  createdAt: string;
  completedAt: string;
  status: 'ACTIVE';
}

export async function getActiveGoals(): Promise<GoalProps[]> {
    const response = await axiosStore.get<{goals: GoalProps[]}>(`goal?status=ACTIVE`);
    return response.data.goals;
}