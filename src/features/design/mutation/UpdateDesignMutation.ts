


import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import queryClient from "../../../lib/reactquery/reactquery";
import type { designFormData } from "../Schema/designSchema";
import { updateDesign } from "../api/req";

export const useUpdateDesign = () => {

  return useMutation({
    mutationFn: (data: designFormData) => updateDesign(data),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['design']}); // Invalida todas as queries de cupons
        toast.success("Design atualizado com sucesso");
    }
  }
  )
}