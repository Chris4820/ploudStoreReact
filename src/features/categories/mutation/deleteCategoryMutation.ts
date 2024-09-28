


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteCategory, type CategorieProps } from "../api/req/categorie";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery"


export const useDeleteCategory = (parentId: number | null, categoryId : number) => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteCategory(categoryId),
    onSuccess: () => {
      // Remove a categoria do cache sem recarregar todos os dados
      queryClient.setQueryData(['categories', parentId], (oldCategories: CategorieProps[] | undefined) => {
          return oldCategories?.filter(cat => cat.id !== categoryId);
      });
      // Remove o cache do servidor específico pelo ID
      queryClient.removeQueries({ queryKey: ['category', categoryId] });
      toast('Categoria Eliminada com sucesso!!!');
      
      if(!parentId) {
          return navigate('/dashboard/categories')
      }
      return navigate(`/dashboard/categories/${parentId}`)
      }
  }
  )
}