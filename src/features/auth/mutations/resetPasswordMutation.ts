import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../api/req/auth";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";
import type { resetPasswordSchemaFormData } from "../schemas/ResetPasswordSchema";
import { useNavigate } from "react-router-dom";





export const useResetPasswordUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: resetPasswordSchemaFormData) => resetPassword(data),
    onSuccess: (data) => {
      const message = data.message;
      toast(message)
      navigate("/auth/login")
    },
    onError: (response : AxiosResponse) => {
      const message = response.data.message;
      toast(message);
    }
  }
  )
}