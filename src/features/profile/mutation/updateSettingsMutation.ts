import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import type { UserSettingsFormData } from "../Schema/UserSettingsSchema";
import { updateUserSettings } from "../api/user";
import type { UserInformationProps } from "../../../globaldata/httpglobal";


export const useUpdateUserSettings = () => {

  return useMutation({
    mutationFn: (data: UserSettingsFormData) => updateUserSettings(data),
    onSuccess: (_, variables) => {

      const userDataCache = queryClient.getQueryData<UserInformationProps>(['user']);
      if(userDataCache) {
         queryClient.setQueryData<UserInformationProps>(['user'], {
          ...userDataCache,
          name: variables.name,
          locale: variables.locale,
          language: variables.language,
          timezone: variables.timezone
        });
    } 
      toast.success("Definições atualizadas com sucesso!");
    }
  }
  )
}