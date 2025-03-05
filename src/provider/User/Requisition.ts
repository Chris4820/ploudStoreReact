import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UserInformationProps } from "../../globaldata/httpglobal";





export async function getUserInformation(): Promise< UserInformationProps | undefined> {
  const response = await axios.get<{ userInformation: UserInformationProps }>('user', {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
  return response.data.userInformation;
}

export function useGetUserInformation() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInformation(),
  })
}