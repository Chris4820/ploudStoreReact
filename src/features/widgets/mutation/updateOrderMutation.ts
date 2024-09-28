import { useMutation } from "@tanstack/react-query";
import { updateOrderWidgets } from "../api/req/widgets";







export const useUpdateOrderWidget = () => {
  return useMutation({
    mutationFn: (categoriesIds: number[]) => updateOrderWidgets(categoriesIds),
  }
  )
}