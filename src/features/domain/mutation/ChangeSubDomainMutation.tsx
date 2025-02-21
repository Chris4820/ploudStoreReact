


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSubDomain } from "../api/req/domain";
import queryClient from "../../../lib/reactquery/reactquery";
import type { SubDomainFormData } from "../Schema/SubDomainSchema";

export const useUpdateSubDomain = () => {

  return useMutation({
    mutationFn: (data: SubDomainFormData) => updateSubDomain(data),
    onSuccess: (_, variables) => {
      const storeDataCache = queryClient.getQueryData<SubDomainFormData>(['store']);
      if(storeDataCache) {
        queryClient.setQueryData<SubDomainFormData>(['store'], {
          ...storeDataCache,
          subdomain: variables.subdomain,
        });
    }
        toast.success("Sub-domínio atualizado!");
    }
  }
  )
}