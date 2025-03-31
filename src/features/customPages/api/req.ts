import axiosStore from "../../../lib/axios/axiosStore";
import type { CustomPageFormData } from "../schema/customPages";



export type CustomPageProps = {
  id: number,
  slug: string | undefined,
  title: string,
  menuName: string,
  isActive: boolean,
  createdAt: Date,
}

export async function getCustomPages(): Promise<CustomPageProps[]> {
  const response = await axiosStore.get<CustomPageProps[] | []>(`page`);
  return response.data; // Obtemos o primeiro item do array
}

export async function getCustomPage(customPageId: string) {
  const response = await axiosStore.get<CustomPageFormData | null>(`page/${customPageId}`);
  return response.data;
}


export async function createCustomPage(data: CustomPageFormData) {
  const response = await axiosStore.post(`page`, {data});
  return response.data;
}

export async function editCustomPage(customPageId: string, data: CustomPageFormData) {
  const response = await axiosStore.put(`page/${customPageId}`, {data});
  return response.data;
}

export async function deleteCustomPage(customPageId: number) {
  const response = await axiosStore.delete(`page/${customPageId}`);
  return response.data;
}



export async function orderPages(pages: number[]) {

  // Faça a requisição POST
  const response = await axiosStore.put("orderpages", {
      pages,
  });

  return response;
}


