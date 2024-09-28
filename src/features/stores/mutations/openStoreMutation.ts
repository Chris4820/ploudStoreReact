


import { useMutation } from "@tanstack/react-query";
import { getTokenStore } from "../api/req/store";
import { useNavigate } from "react-router-dom";


export type OpenStoreProps = {
  storeId: number,
  isOwner: boolean,
}
export const useOpenStore = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: ( data: OpenStoreProps) => getTokenStore(data),
    onSuccess: () => {
      // Automatically sets the token
      navigate('dashboard');
    },
  });
};