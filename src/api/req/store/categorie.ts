import axiosStore from "../../../lib/axios/axiosStore";


export type CategorieProps = {
    categorieId: number,
    name: string,
    description: string,
}

export type ProductProps = {
    productId: number,
    name: string,
    description: string,
    price: number,
}

export async function getCategories(): Promise<CategorieProps[]> {
    const response = await axiosStore.get<{categories: CategorieProps[]}>('categorie');
    return response.data.categories; // Obtemos o primeiro item do array
}

type CreateCategorieProps = {
    name: string,
    description: string,
}
export async function createCategorie(data: CreateCategorieProps) {
    const response = await axiosStore.post("categorie", {
        name: data.name,
        desc: data.description,
    })
    return response;
}

export async function deleteCategorie(categoryId: number) {
    const response = await axiosStore.delete(`categorie/${categoryId}`)
    return response;
}

export async function getProducts(categoryId: string): Promise<ProductProps[]> {
    const response = await axiosStore.get<{products: ProductProps[]}>(`product/${categoryId}`);
    return response.data.products; // Obtemos o primeiro item do array
}