


import { useMutation } from "@tanstack/react-query";
import { getTokenStore } from "../api/req/store";
import { useNavigate } from "react-router-dom";


export const useOpenStore = () => {
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: ({ storeId, isOwner }: { storeId: number; isOwner?: boolean }) => getTokenStore(storeId, isOwner),
    onSuccess: () => {
      // Automatically sets the token
      navigate('dashboard');
    },
  });
};