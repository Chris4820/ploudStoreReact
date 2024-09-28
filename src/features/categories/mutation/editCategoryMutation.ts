


import { useMutation } from "@tanstack/react-query";
import { CategorieProps, updateCategory } from "../api/req/categorie";
import { useNavigate } from "react-router-dom";
import { CategoryFormData } from "../schema/CategorySchema";
import queryClient from "../../../lib/reactquery/reactquery";
import { toast } from "sonner";

export const useEditCategory = () => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CategoryFormData) => updateCategory(data),
    onSuccess: (_, variables) => {
      // Atualizando o cache da query 'categories'

      queryClient.setQueryData(['categories', variables.parentId], (oldData: CategorieProps[] | undefined) => {
        if(!oldData) return [];

        return oldData.map((category: CategorieProps) =>
          category.id === variables.id 
            ? {
                ...category,
                name: variables.name !== undefined ? variables.name : category.name,
                visible: variables.visible !== undefined ? variables.visible : category.visible,
              }
            : category
        );
      });
      //Invalida a categoria editada do cache
      queryClient.removeQueries({queryKey: ['category', variables.id]}); // Invalida todas as queries de cupons

      toast.success("Categoria editada com sucesso")
      if(variables.parentId) {
        return navigate(`/dashboard/categories/${variables.parentId}`)
      }
        return navigate(`/dashboard/categories`);
      
    }
  }
  )
}