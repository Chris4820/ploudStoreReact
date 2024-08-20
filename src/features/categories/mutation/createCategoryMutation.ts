


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateCategoryFormData } from "../schema/CreateCategorySchema";
import { createCategorie, type CategorieProps } from "../../../api/req/store/categorie";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryClient from "../../../lib/reactquery/reactquery";

export const useCreateCategory = () => {

  const [searchParams] = useSearchParams();

  const parent = parseInt(searchParams.get("parent") as string) || null
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateCategoryFormData) => createCategorie(data),
    onSuccess: (data) => {
      console.log("Sucesso");
      // Verifique se response e response.data existem antes de acessar response.data.category
      if (!data) {
        console.error("Resposta inesperada da API:", data);
        toast.error("Resposta inesperada da API.");
        return;
      }

      const category = data.category;

      // Se a categoria não existir, invalide as queries
      if (!category) {
        console.log("2");
        queryClient.invalidateQueries({ queryKey: ['categories', parent] });
      } else {
        console.log(category)
        // Se a categoria existir, atualize o cache
        queryClient.setQueryData<CategorieProps[] | undefined>(['categories', parent], (oldData) => {
          const updatedData = oldData ? [...oldData, category] : [category];
          return updatedData;
        });
      }
      if(parent) {
        console.log("!«2");
        return navigate(`/dashboard/categories/${parent}`)
      }
      console.log("!«3");
        return navigate(`/dashboard/categories`);
    },
  }
  )
}