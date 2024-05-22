import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategories, getCategory } from "../../req/store/categorie";



export function useGetCategorie(parentCategoryId: number | null) {
    return useQuery({
    queryKey: ['categories', parentCategoryId],
    queryFn: () => getCategories(parentCategoryId),
})
}

export function useGetCategory(parentId: number) {
    return useQuery({
    queryKey: ['category', parentId],
    queryFn: () => getCategory(parentId),
})
}

export function useGetAllCategorie() {
    return useQuery({
    queryKey: ['categorie'],
    queryFn: getAllCategories,
})
}