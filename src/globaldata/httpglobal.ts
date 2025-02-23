import axios from "axios";
import axiosStore from "../lib/axios/axiosStore";
import { useQuery } from "@tanstack/react-query";


export type UserInformationProps = {
  name: string,
  email: string,
  theme: string,
  language: string,
}


//Dados iniciais 
//Requisição para buscar dados iniciais do usuário
const baseURL = import.meta.env.VITE_URL ? import.meta.env.VITE_URL + "/api/user" : 'http://localhost:3000/api/user'; // Default fallback


//http://localhost:3000/api/userapi/user/user
export async function getUserInformation(): Promise<UserInformationProps | null> {
  const response = await axios.get<{ userInformation?: UserInformationProps | null }>(`${baseURL}/user`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data.userInformation ?? null; // Garantir que nunca é undefined
}



export function useGetUserInformation() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserInformation,
    refetchOnWindowFocus: false,
    // Evita refetch ao "re-montar" se ainda não estiver stale
    refetchOnMount: false,
    // Tempo que os dados ficam "frescos" antes de serem marcados stale
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}





/*

---- STORE-----

*/


export type StoreInformationProps = {
  name: string,
  description: string,
  shortame: string,
  gameType: 'MINECRAFT' | 'FIVEM',
  domain: string,
  subdomain: string,
  activeDomain: string,
  createdAt: string,
  terms: string,

  keywords: string,
  locale: string,
  currency: string,
  backgroundUrl: string | undefined,
  maintenance: boolean,
  minBasket: number,
  primaryColor: string,
  secondaryColor: string,

  //STORE PLAN
  StorePlan: {
      overdueDate: string,
      plan: string,
      status: string,
      period: string,
      extra_price: number,
  }
}

export async function getStoreInformation(): Promise<StoreInformationProps> {
    const response = await axiosStore.get<{store: StoreInformationProps}>('store');
    return response.data.store; // Obtemos o primeiro item do array
}


export function useGetStoreInformation() {
    return useQuery({
      queryKey: ['store'],
      queryFn: getStoreInformation,
    })
}



