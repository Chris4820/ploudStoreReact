


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCustomDomain } from "../api/req/domain";
import type { StoreProps } from "../../stores/api/req/store";
import queryClient from "../../../lib/reactquery/reactquery";
import type { CustomDomainFormData } from "../Schema/CustomDomainSchema";

export const useUpdateCustomDomain = () => {


  return useMutation({
    mutationFn: (data: CustomDomainFormData) => updateCustomDomain(data),
    onSuccess: (_, variables) => {
      const storeDataCache = queryClient.getQueryData<StoreProps>(['store']);

      if(storeDataCache) {
        queryClient.setQueryData(['store'], {
          ...storeDataCache,
          domain: variables.domain, // Atualiza o subdomain
        });
      }
      toast.success("Domínio atualizado!");
    }
  }
  )
}