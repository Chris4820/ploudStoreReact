


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SettingsFormData } from "../schema/SettingsSchema";
import { updateStoreSettings } from "../../stores/api/req/store";

export const useUpdateSettings = () => {

  return useMutation({
    mutationFn: (data: SettingsFormData) => updateStoreSettings(data),
    onSuccess: () => {
      toast.success("Definições atualizadas com sucesso!");
    }
  }
  )
}