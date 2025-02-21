


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCustomDomain } from "../api/req/domain";
import queryClient from "../../../lib/reactquery/reactquery";
import type { CustomDomainFormData } from "../Schema/CustomDomainSchema";



export const useUpdateCustomDomain = () => {


  return useMutation({
    mutationFn: (data: CustomDomainFormData) => updateCustomDomain(data),
    onSuccess: (_, variables) => {
      const storeDataCache = queryClient.getQueryData<CustomDomainFormData>(['store']);
      if(storeDataCache) {
        queryClient.setQueryData<CustomDomainFormData>(['store'], {
          ...storeDataCache,
          domain: variables.domain,
        });
    }
    toast.success("Domínio atualizado!");
    }
  }
  )
}