import axiosStore from "../../../lib/axios/axiosStore";
import type { designFormData } from "../Schema/designSchema";







export async function updateDesign(data: designFormData) {
  const response = await axiosStore.put<{design: designFormData}>('design', { data });
  return response.data.design; // Obtemos o primeiro item do array
}