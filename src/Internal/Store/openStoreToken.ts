import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosUser from "../../lib/axios/axiosUser";
import queryClient from "../../lib/reactquery/reactquery";



export const useOpenStore = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: ({ storeId, isOwner }: { storeId: number; isOwner?: boolean }) => getTokenStore(storeId, isOwner),
    onMutate: () => {
      queryClient.removeQueries({ queryKey: ['store'] });
    },
    onSuccess: () => {
      // Automatically sets the token
      navigate('dashboard');
    },
  });
};

export async function getTokenStore(storeId: number, isOwner: boolean | undefined) {
    const response = await axiosUser.get(`openStore/${storeId}`, {
        params: {
            isOwner: isOwner,
        }
    })
    return response;
}