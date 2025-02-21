


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import type { designFormData } from "../Schema/designSchema";
import { updateDesign } from "../api/req";

export const useUpdateDesign = () => {

  return useMutation({
    mutationFn: (data: designFormData) => updateDesign(data),
    onSuccess: (_, variables) => {
      const userDataCache = queryClient.getQueryData<designFormData>(['store']);
      if(userDataCache) {
        queryClient.setQueryData<designFormData>(['store'], {
          ...userDataCache,
          primaryColor: variables.primaryColor,
          secondaryColor: variables.secondaryColor,
          
        });
    }
        toast.success("Design atualizado");
    }
  }
  )
}