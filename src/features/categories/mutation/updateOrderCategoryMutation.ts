import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";
import { orderCategories } from "../api/req/categorie";





export const useUpdateOrderCategory = () => {
  return useMutation({
    mutationFn: (categoriesIds: number[]) => orderCategories(categoriesIds),
    onSuccess: () => {
      toast.success("Sucesso!");
    }
  }
  )
}