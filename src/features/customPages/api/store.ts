import { useQuery } from "@tanstack/react-query";
import { getCustomPage, getCustomPages } from "./req";




export function useGetCustomPages() {
  return useQuery({
      queryKey: ['page'],
      queryFn: () => getCustomPages(),
  })
}

export function useGetCustomPage(customPageId: string) {
  return useQuery({
    queryKey: ['page', customPageId],
    queryFn: () => getCustomPage(customPageId),
  })
}