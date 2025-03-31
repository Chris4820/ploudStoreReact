import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery"
import { deleteCustomPage, type CustomPageProps } from "../api/req";


export const useDeletePage = () => {

  return useMutation({
    mutationFn: (pageId: number) => deleteCustomPage(pageId),
    onSuccess: (_, pageId) => {
      // Atualização otimista do cache
      queryClient.setQueryData<CustomPageProps[]>(['page'], (oldData) => {
        if (!oldData) return undefined;
        return oldData.filter(page => page.id !== pageId);
      });
      // Remove o cache do servidor específico pelo ID
      queryClient.removeQueries({ queryKey: ['page', pageId.toString()] });
      toast('Página Eliminada com sucesso!!!');
    }
  }
  )
}