import type { ProductFormData } from "../../schema/ProductSchema";
import axiosStore from "../../../../lib/axios/axiosStore";



export type ProductsProps = {
    id: number,
    name: string,
    visible: boolean,
}



export async function getProducts(categoryId: string | undefined): Promise<ProductsProps[] | []> {

    let query = "";

    if(categoryId) {
        query = `?categoryId=${categoryId}`
    }
    const response = await axiosStore.get<{products: ProductsProps[] | []}>(`products${query}`);
    return response.data.products || []; 
}

export async function updateProduct(productId: number, data: ProductFormData) {
    const response = await axiosStore.put(`product/${productId}`, {
        data,
    })
    return response.data;
}

export async function createProduct(categoryId: string | undefined, data: ProductFormData) {
    const response = await axiosStore.post(`product?categoryId=${categoryId}`, {data});
    return response.data;
}

export async function orderProducts(products: number[]) {
    const response = await axiosStore.post("orderproduct", {
        products: products
    })
    return response;
}

export async function getProduct(productId: string | undefined) : Promise<ProductFormData> {
    const response = await axiosStore.get<{product: ProductFormData}>(`product/${productId}`);
    return response.data.product;
}


type DeleteProductProps = {
    id: number,
    categoryId: number,
}
export async function deleteProduct(productId: string | undefined) {
    const response = await axiosStore.delete<{product: DeleteProductProps}>(`product/${productId}`)
    return response.data.product;
}
