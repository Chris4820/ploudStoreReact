import { useMutation } from "@tanstack/react-query"
import { orderPages } from "../api/req";





export const useUpdateOrderPages = () => {
  return useMutation({
    mutationFn: (pagesIds: number[]) => orderPages(pagesIds),
    onSuccess: () => {
    }
  }
  )
}