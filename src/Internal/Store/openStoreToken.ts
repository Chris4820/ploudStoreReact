import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosUser from "../../lib/axios/axiosUser";
import queryClient from "../../lib/reactquery/reactquery";



export const useOpenStore = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: ({ storeId }: { storeId: number }) => getTokenStore(storeId),
    onMutate: () => {
      queryClient.removeQueries({ queryKey: ['store'] });
    },
    onSuccess: () => {
      // Automatically sets the token
      navigate('dashboard');
    },
  });
};

export async function getTokenStore(storeId: number) {
    const response = await axiosUser.get(`openStore/${storeId}`);
    return response;
}