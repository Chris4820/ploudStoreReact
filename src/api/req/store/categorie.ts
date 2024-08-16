import axiosStore from "../../../lib/axios/axiosStore";


export type CategorieProps = {
    id: number,
    name: string,
    description: string,
    enable: boolean,
    slug: string
    imageUrl: string,
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

export async function getCategorie(categoryId : number): Promise<CategorieProps> {
    const response = await axiosStore.get<{categorie: CategorieProps}>(`category/${categoryId}`);
    return response.data.categorie; // Obtemos o primeiro item do array
}

// Função para criar a categoria
type CreateCategorieProps = {
    name: string,
    description: string,
    categoryParentId: number | null,
    slug: string,
    imageUrl?: string,
}

export async function createCategorie(data: CreateCategorieProps) {
    try {
        const response = await axiosStore.post("category", data);
        console.log("Response:", response);
        return response.data;
    } catch (error: any) {
        // Se o erro for devido à resposta da API (erro HTTP)
        if (error.response) {
            console.log("Erro na resposta da API:", error.response.data);
            // Você pode lançar o erro novamente para ser tratado na mutação
            throw new Error(error.response.data.message || 'Erro ao criar a categoria');
        } else {
            console.error("Erro desconhecido:", error);
            throw new Error('Erro desconhecido ao criar a categoria');
        }
    }
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

export async function updateCategory(data: CategorieProps) {
    const response = await axiosStore.put(`category/${data.id}`, {
        categoryId: data.id,
        name: data.name,
        description: data.description,
        slug: data.slug,
        enable: data.enable
    });
    return response;
}

export async function getAllCategories() {
    const response = await axiosStore.get<{categories: CategorieProps[]}>('categorie');
    return response.data.categories;
}

