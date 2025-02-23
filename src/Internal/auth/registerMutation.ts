import { useMutation } from "@tanstack/react-query";
import type { registerSchemaFormData } from "../../features/auth/schemas/RegisterSchema";
import axiosAuth from "../../lib/axios/axiosAuth";
import { toast } from "sonner";





export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: registerSchemaFormData) => RegisterUser(data),
    onSuccess: (data) => {
      const message = data.message;
      toast(message)
    },
  }
  )
}



export async function RegisterUser(data : registerSchemaFormData) {
  try {
      const response = await axiosAuth.post('register', { data });
      return response.data;
  } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
      throw error;
  }
}