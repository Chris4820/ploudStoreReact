import axiosStore from "../../../lib/axios/axiosStore";


export type CategorieProps = {
    categoryId: number,
    name: string,
    description: string,
    slug: string
    imageUrl: string,
}

export type ProductProps = {
    productId: number,
    name: string,
    description: string,
    price: number,
}

export async function getCategories(parentCategoryId: number | null): Promise<CategorieProps[] | []> {
    const response = await axiosStore.get<{categories: CategorieProps[] | []}>(`categories?parentCategoryId=${parentCategoryId}`);
    return response.data.categories || []; // Obtemos o primeiro item do array
}

export async function orderCategories(categories: number[]) {
    const response = await axiosStore.post("ordercategories", {
        categories: categories,
    })
    return response;
}

export async function getCategorie(categoryId : number): Promise<CategorieProps> {
    const response = await axiosStore.get<{categorie: CategorieProps}>(`category/${categoryId}`);
    return response.data.categorie; // Obtemos o primeiro item do array
}

type CreateCategorieProps = {
    name: string,
    description: string,
    categoryParentId: number | null,
    slug: string,
    imageUrl: string,
}
export async function createCategorie(data: CreateCategorieProps) {
    console.log(data.imageUrl);
    const response = await axiosStore.post("category", {
        name: data.name,
        description: data.description,
        categoryParentId: data.categoryParentId,
        slug: data.slug,
        imageUrl: data.imageUrl
    })
    return response;
}

export async function deleteCategorie(categoryId: number) {
    const response = await axiosStore.delete(`category/${categoryId}`)
    return response;
}

export async function getProducts(categoryId: number): Promise<ProductProps[]> {
    const response = await axiosStore.get<{products: ProductProps[]}>(`product/${categoryId}`);
    return response.data.products; // Obtemos o primeiro item do array
}

export async function getCategory(categoryId: number) {
    const response = await axiosStore.get<{category: CategorieProps}>(`category/${categoryId}`);
    return response.data.category;
}

type UpdateCategorieProps = {
    categoryId: number,
    name: string,
    description: string,
    slug: string,
}
export async function updateCategory(data: UpdateCategorieProps) {
    const response = await axiosStore.put(`category/${data.categoryId}`, {
        categoryId: data.categoryId,
        name: data.name,
        description: data.description,
        slug: data.slug,
    });
    return response;
}

export async function getAllCategories() {
    const response = await axiosStore.get<{categories: CategorieProps[]}>('categorie');
    return response.data.categories;
}

