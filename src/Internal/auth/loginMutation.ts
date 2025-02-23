import { useMutation } from "@tanstack/react-query";
import type { loginSchemaFormData } from "../../features/auth/schemas/LoginSchema";
import axiosAuth from "../../lib/axios/axiosAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import queryClient from "../../lib/reactquery/reactquery";
import type { AxiosResponse } from "axios";




export const useLoginUser = () => {
  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: loginSchemaFormData) => LoginUser(data),
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


export async function LoginUser(data : loginSchemaFormData) {
  try {
      const response = await axiosAuth.post('login', { data });
      return response.data;
  } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
      throw error;
  }
}