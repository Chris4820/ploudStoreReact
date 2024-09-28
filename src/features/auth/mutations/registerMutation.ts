import { useMutation } from "@tanstack/react-query";
import { postRegisterUser } from "../api/req/auth";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";
import type { registerSchemaFormData } from "../schemas/RegisterSchema";





export const useRegisterUser = () => {


  return useMutation({
    mutationFn: (data: registerSchemaFormData) => postRegisterUser(data),
    onSuccess: (data) => {
      const message = data.message;
      toast(message)
    },
    onError: (response : AxiosResponse) => {
      const message = response.data.message;
      toast(message);
    }
  }
  )
}