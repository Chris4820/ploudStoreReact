import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { recoveryPassword } from "../../../api/req/auth";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";
import type { recoveryPasswordSchemaFormData } from "../schemas/RecoveryPasswordSchema";





export const useRecoveryPassword = () => {
  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: recoveryPasswordSchemaFormData) => recoveryPassword(data),
    onSuccess: (data) => {
      const message = data.message;
      toast(message)
      navigate("/auth/login");
    },
    onError: (response : AxiosResponse) => {
      const message = response.data.message;
      toast(message);
    }
  }
  )
}