import type { ProductFormData } from "../../schema/ProductSchema";
import axiosStore from "../../../../lib/axios/axiosStore";



export type ProductsProps = {
    id: number,
    name: string,
    visible: boolean,
}


export type ProductProps = {
    id: number,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    visible: boolean,
    categoryId: number,
}


export async function getProducts(categoryId: number | undefined): Promise<ProductsProps[] | []> {

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
export async function createProduct(data: ProductFormData) {
    const response = await axiosStore.post("product", { data })
    return response.data;
}

export async function orderProducts(products: number[]) {
    const response = await axiosStore.post("orderproduct", {
        products: products
    })
    return response;
}

export async function getProduct(productId: number) : Promise<ProductFormData> {
    const response = await axiosStore.get<{product: ProductFormData}>(`product/${productId}`);
    return response.data.product;
}

export async function deleteProduct(productId: number) {
    const response = await axiosStore.delete(`product/${productId}`)
    return response;
}
