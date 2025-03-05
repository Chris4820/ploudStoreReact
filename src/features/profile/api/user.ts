import axiosUser from "../../../lib/axios/axiosUser";
import type { UserSettingsFormData } from "../Schema/UserSettingsSchema";








export async function updateUserSettings(data: UserSettingsFormData) {
  const response = await axiosUser.put("", { data });
  return response;
}
