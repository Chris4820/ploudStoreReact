import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../req/products";





export function useGetProducts(categoryId: string | undefined) {
    return useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => getProducts(categoryId),
})
}

export function useGetProduct(productId: string | undefined) {
    return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
})
}