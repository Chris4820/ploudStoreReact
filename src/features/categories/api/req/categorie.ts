import { CategoryFormData } from "../../schema/CategorySchema";
import axiosStore from "../../../../lib/axios/axiosStore";
import { ProductsProps } from "../../../products/api/req/products";


export type CategorieProps = {
    id: number,
    name: string,
    visible: boolean,
}

export type CategoryProps = {
    id: number,
    name: string,
    description: string,
    visible: boolean,
    slug: string
    parentId: number | undefined,
}

export type ProductProps = {
    id: number,
    name: string,
    description: string,
    price: number,
}

export async function getCategories(parentCategoryId: string | undefined): Promise<CategorieProps[] | []> {

    let query = "";
    if (parentCategoryId) {
        query += `parentCategoryId=${parentCategoryId}&`;
    }

    const response = await axiosStore.get<{categories: CategorieProps[] | []}>(`categories?${query}`);
    return response.data.categories || []; // Obtemos o primeiro item do array
}

export async function orderCategories(categories: number[], parentId?: number) {
    console.log(categories);
    // Construa a URL com o parentId, se fornecido
    let url = 'ordercategories';
    if (parentId !== undefined) {
        url += `?parentId=${parentId}`;
    }

    // Faça a requisição POST
    const response = await axiosStore.post(url, {
        categories,
    });

    return response;
}

export async function getCategorie(categoryId : string | undefined): Promise<CategoryProps> {
    const response = await axiosStore.get<{categorie: CategoryProps}>(`category/${categoryId}`);
    return response.data.categorie; // Obtemos o primeiro item do array
}


export async function createCategorie(data: CategoryFormData) {
    const response = await axiosStore.post("category", {data});
    return response.data;
}


export async function deleteCategory(categoryId: string | undefined) {
    const response = await axiosStore.delete(`category/${categoryId}`)
    return response;
}

export async function getProducts(categoryId: string | undefined): Promise<ProductProps[]> {
    const response = await axiosStore.get<{products: ProductProps[]}>(`product/${categoryId}`);
    return response.data.products; // Obtemos o primeiro item do array
}

export async function getCategory(categoryId: string | undefined) {
    const response = await axiosStore.get<{category: CategoryProps}>(`category/${categoryId}`);
    return response.data.category;
}

export async function updateCategory(data: CategoryFormData) {
    const response = await axiosStore.put(`category/${data.id}`, { data });
    return response;
}

export async function getAllCategories() {
    const response = await axiosStore.get<{categories: CategorieProps[]}>('categorie');
    return response.data.categories;
}

export type ProductsWithCategoryProps = {
    name: string,
    products: ProductsProps[]
}

export async function getProductsWithCategories() {
    const response = await axiosStore.get<{categories: ProductsWithCategoryProps[]}>('/categories/products');
    return response.data.categories;
}

