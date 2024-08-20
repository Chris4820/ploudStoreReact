import type { CreateCategoryFormData } from "../../../features/categories/schema/CreateCategorySchema";
import type { EditCategoryFormData } from "../../../features/categories/schema/EditCategorySchema";
import axiosStore from "../../../lib/axios/axiosStore";


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
    parentId: number,
}

export type ProductProps = {
    id: number,
    name: string,
    description: string,
    price: number,
}

export async function getCategories(parentCategoryId: number | null): Promise<CategorieProps[] | []> {
    const response = await axiosStore.get<{categories: CategorieProps[] | []}>(`categories?parentCategoryId=${parentCategoryId}`);
    return response.data.categories || []; // Obtemos o primeiro item do array
}

export async function orderCategories(categories: number[], parentId?: number) {
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

export async function getCategorie(categoryId : number): Promise<CategoryProps> {
    const response = await axiosStore.get<{categorie: CategoryProps}>(`category/${categoryId}`);
    return response.data.categorie; // Obtemos o primeiro item do array
}



export async function createCategorie(data: CreateCategoryFormData) {
    console.log("Visible: " + data.visible)
    const response = await axiosStore.post("category", data);
    return response.data;
    
}


export async function deleteCategory(categoryId: number) {
    const response = await axiosStore.delete(`category/${categoryId}`)
    return response;
}

export async function getProducts(categoryId: number): Promise<ProductProps[]> {
    const response = await axiosStore.get<{products: ProductProps[]}>(`product/${categoryId}`);
    return response.data.products; // Obtemos o primeiro item do array
}

export async function getCategory(categoryId: number) {
    const response = await axiosStore.get<{category: CategoryProps}>(`category/${categoryId}`);
    return response.data.category;
}

export async function updateCategory(data: EditCategoryFormData) {
    console.log(data.visible);
    const response = await axiosStore.put(`category/${data.categoryId}`, {
        name: data.name,
        description: data.description,
        slug: data.slug,
        visible: data.visible
    });
    return response;
}

export async function getAllCategories() {
    const response = await axiosStore.get<{categories: CategorieProps[]}>('categorie');
    return response.data.categories;
}

