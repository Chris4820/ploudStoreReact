


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCategory } from "../../../api/req/store/categorie";
import { useNavigate } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";
import type { CategoryData } from "../../../api/req/store/statistic";
import type { EditCategoryFormData } from "../schema/EditCategorySchema";

export const useEditCategory = () => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: EditCategoryFormData) => updateCategory(data),
    onSuccess: (response) => {
      const category = response.data.category;
      if(!category) {
        queryClient.invalidateQueries({ queryKey: ['categories', parent] });
      }else {
        queryClient.setQueryData<CategoryData[] | undefined>(['categories', parent], (oldData) => {
          // Se oldData for undefined, inicialize como um array vazio
          const updatedData = oldData ? [...oldData, category] : [category];
          return updatedData;
        });
      }
      toast.success("Categoria Criada com sucesso");
      if(parent) {
        return navigate(`/dashboard/categories/${parent}`)
      }
      return navigate(`/dashboard/categories`);
      
    }
  }
  )
}