


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCategorie } from "../../../api/req/store/categorie";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";
import { CategoryFormData } from "../schema/CategorySchema";

export const useCreateCategory = () => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CategoryFormData) => createCategorie(data),
    onSuccess: (data, variables) => {
      console.log("Sucesso");
      // Verifique se response e response.data existem antes de acessar response.data.category
      if (variables && data.id) {
        // Extrair o ID do cupom criado
        const newCategory = {
          id: data.id, // ID do novo cupom
          name: variables.name, // Código do cupom que foi enviado
          visible: variables.visible, // Data de expiração
        };

        queryClient.setQueryData(['categories', variables.parentId], (oldData: any) => {
          return oldData ? [newCategory, ...oldData] : [newCategory];
        });
      }
      toast.success("Categoria criada com sucesso!")
      if(variables.parentId) {
        return navigate(`/dashboard/categories/${variables.parentId}`)
      }
        return navigate(`/dashboard/categories`);
    },
  }
  )
}