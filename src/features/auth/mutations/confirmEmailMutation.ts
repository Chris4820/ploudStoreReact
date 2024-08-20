import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { confirmEmailUser } from "../../../api/req/auth";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";





export const useConfirmEmailUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (email: string) => confirmEmailUser(email),
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