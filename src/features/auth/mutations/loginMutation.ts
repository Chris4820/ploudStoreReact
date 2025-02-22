import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { postLoginUser } from "../api/req/auth";
import type { loginSchemaFormData } from "../schemas/LoginSchema";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";
import queryClient from "../../../lib/reactquery/reactquery";





export const useLoginUser = () => {
  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: loginSchemaFormData) => postLoginUser(data),
    onSuccess: async (data) => {
      const message = data.message;
      toast(message)
      // 🔹 Invalida a query "user" para forçar a recarga dos dados do utilizador
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (response : AxiosResponse) => {
      const message = response.data.message;
      toast(message);
    }
  }
  )
}