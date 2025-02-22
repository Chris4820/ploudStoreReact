import axios from "axios";
import type { UserInformationProps } from "../../api/req/user";
import { useQuery } from "@tanstack/react-query";



//Requisição para buscar dados iniciais do usuário~
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
  })
}
