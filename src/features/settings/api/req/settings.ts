import axiosStore from "../../../../lib/axios/axiosStore";
import type { SettingsFormData } from "../../schema/SettingsSchema";





export async function getStoreSettings() {
  const response = await axiosStore.get<{ settings: SettingsFormData}>('storesettings');
  return response.data.settings;
}
export async function updateStoreSettings(data: SettingsFormData) {
  const response = await axiosStore.put("storesettings", { data });
  return response;
}
