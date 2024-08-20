


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateStoreFormData } from "../schema/createStoreSchema";
import { createStore } from "../../../api/req/store";
import { useNavigate } from "react-router-dom";

export const useCreateStore = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: CreateStoreFormData) => createStore(data),
    onSuccess: () => {
      toast.success("Loja criada com sucesso!");
      return navigate('/');
    }
  }
  )
}