import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import type { UserSettingsFormData } from "../Schema/UserSettingsSchema";
import { updateUserSettings } from "../api/user";

export const useUpdateUserSettings = () => {

  return useMutation({
    mutationFn: (data: UserSettingsFormData) => updateUserSettings(data),
    onSuccess: (_, variables) => {

      const storeDataCache = queryClient.getQueryData<UserSettingsFormData>(['user']);
      if(storeDataCache) {
        queryClient.setQueryData<UserSettingsFormData>(['user'], {
          ...storeDataCache,
          language: variables.language,
          locale: variables.locale,
          timezone: variables.timezone,
        });
    }
      toast.success("Definições atualizadas com sucesso!");
    }
  }
  )
}