import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import queryClient from "../../lib/reactquery/reactquery";
import axiosAuth from "../../lib/axios/axiosAuth";




export const useLogoutUser = () => {

  return useMutation({
    mutationFn: () => logout(),
    onMutate: () => {
      //Seta o user como null
      queryClient.setQueryData(["user"], null);
      //Seta a store como null
      queryClient.setQueryData(["store"], null);

      //O backend já retira as cookies do navegador, então não precisamos fazer nada aqui.

      toast.success("Deslogado com sucesso!");
    }
  });
}

export async function logout() {
  try {
      const response = await axiosAuth.get('logout');
      return response;
  } catch (error) {
      console.log('Erro');
      throw error;
  }
}