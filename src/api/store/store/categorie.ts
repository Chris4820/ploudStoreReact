import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../req/store/categorie";



export function useGetCategorie() {
    return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
})
}