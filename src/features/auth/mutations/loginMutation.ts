import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { postLoginUser } from "../../../api/req/auth";
import type { loginSchemaFormData } from "../schemas/LoginSchema";
import { toast } from "sonner";
import type { AxiosResponse } from "axios";





export const useLoginUser = () => {
  const navigate = useNavigate();


  return useMutation({
    mutationFn: (data: loginSchemaFormData) => postLoginUser(data),
    onSuccess: (data) => {
      const message = data.message;
      toast(message)
      navigate("/");
    },
    onError: (response : AxiosResponse) => {
      const message = response.data.message;
      toast(message);
    }
  }
  )
}