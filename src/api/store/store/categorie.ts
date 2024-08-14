import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategories, getCategory } from "../../req/store/categorie";



export function useGetCategorie(parentCategoryId: number | null) {
    return useQuery({
    queryKey: ['categories', parentCategoryId],
    queryFn: () => getCategories(parentCategoryId),
})
}

export function useGetCategory(categoryId: number) {
    return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategory(categoryId),
})
}

export function useGetAllCategorie() {
    return useQuery({
    queryKey: ['categorie'],
    queryFn: getAllCategories,
})
}