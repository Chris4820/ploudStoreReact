import type { CreateProductFormData } from "../../../features/products/schema/CreateProductSchema";
import type { editProductFormData } from "../../../features/products/schema/EditProductSchema";
import axiosStore from "../../../lib/axios/axiosStore";



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


export async function getProducts(categoryId: number): Promise<ProductProps[] | []> {
    const response = await axiosStore.get<{products: ProductProps[] | []}>(`products?categoryId=${categoryId}`);
    return response.data.products || []; 
}

export async function updateProduct(data: editProductFormData) {
    const response = await axiosStore.put<{product: ProductProps}>('product', {
        data,
    })
    return response.data;
}
export async function createProduct(data: CreateProductFormData) {
    const response = await axiosStore.post("product", {
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        imageUrl: data.imageUrl,
    })
    return response.data;
}

export async function orderProducts(products: number[]) {
    const response = await axiosStore.post("orderproduct", {
        products: products
    })
    return response;
}

export async function getProduct(productId: number) : Promise<ProductProps> {
    const response = await axiosStore.get<{product: ProductProps}>(`product/${productId}`);
    return response.data.product;
}

export async function deleteProduct(productId: number) {
    const response = await axiosStore.delete(`product/${productId}`)
    return response;
}
