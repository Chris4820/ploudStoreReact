


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateSubDomain } from "../api/req/domain";
import type { StoreProps } from "../../stores/api/req/store";
import queryClient from "../../../lib/reactquery/reactquery";
import type { SubDomainFormData } from "../Schema/SubDomainSchema";

export const useUpdateSubDomain = () => {


  return useMutation({
    mutationFn: (data: SubDomainFormData) => updateSubDomain(data),
    onSuccess: (_, variables) => {
      const storeDataCache = queryClient.getQueryData<StoreProps>(['store']);

      if(storeDataCache) {
        queryClient.setQueryData(['store'], {
          ...storeDataCache,
          subdomain: variables.subdomain, // Atualiza o subdomain
        });
      }
      toast.success("Subdomínio atualizado!");
    }
  }
  )
}