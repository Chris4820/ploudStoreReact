import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategories, getCategory, getProductsWithCategories } from "../req/categorie";



export function useGetCategorie(parentCategoryId: string | undefined) {
    return useQuery({
    queryKey: ['categories', parentCategoryId],
    queryFn: () => getCategories(parentCategoryId),
})
}

export function useGetCategory(categoryId: string | undefined) {
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

export function useGetProductsWithCategory() {
    return useQuery({
    queryKey: ['categorie/products'],
    queryFn: getProductsWithCategories,
})
}