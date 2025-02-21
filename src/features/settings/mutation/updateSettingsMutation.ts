import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SettingsFormData } from "../schema/SettingsSchema";
import { updateStoreSettings } from "../api/req/settings";
import queryClient from "../../../lib/reactquery/reactquery";

export const useUpdateSettings = () => {

  return useMutation({
    mutationFn: (data: SettingsFormData) => updateStoreSettings(data),
    onSuccess: (_, variables) => {

      const storeDataCache = queryClient.getQueryData<SettingsFormData>(['store']);
      if(storeDataCache) {
        queryClient.setQueryData<SettingsFormData>(['store'], {
          ...storeDataCache,
          description: variables.description,
          keywords: variables.keywords,

          currency: variables.currency,
          locale: variables.locale,
          maintenance: variables.maintenance,
          minBasket: variables.minBasket,
          name: variables.name,
          terms: variables.terms,
        });
    }
      toast.success("Definições atualizadas com sucesso!");
    }
  }
  )
}