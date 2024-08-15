import axiosStore from "../../../lib/axios/axiosStore";




export type ProductProps = {
    id: number,
    name: string,
    description: string,
    price: number,
}

export type CreateProductProps = {
    name: string,
    description: string,
    price: number,
    categoryId: number,
}


export async function getProducts(categoryId: number): Promise<ProductProps[] | []> {
    const response = await axiosStore.get<{products: ProductProps[] | []}>(`products?categoryId=${categoryId}`);
    return response.data.products || []; 
}

export async function createProduct(data: CreateProductProps) {
    const response = await axiosStore.post("product", {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
    })
    return response;
}

export async function orderProducts(products: number[]) {
    const response = await axiosStore.post("orderproduct", {
        products: products
    })
    return response;
}

export async function getProduct(productId: number) {
    const response = await axiosStore.get<{product: ProductProps}>(`product/${productId}`);
    return response.data.product;
}

export async function deleteProduct(productId: number) {
    const response = await axiosStore.delete(`product/${productId}`)
    return response;
}
