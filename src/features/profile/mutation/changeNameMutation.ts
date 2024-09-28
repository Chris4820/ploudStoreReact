


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changeNameUser } from "../../../api/req/user";

export const useChangeNameUser = () => {


  return useMutation({
    mutationFn: (name: string) => changeNameUser(name),
    onSuccess: () => {
      toast.success("Clonado com sucesso");
    }
  }
  )
}